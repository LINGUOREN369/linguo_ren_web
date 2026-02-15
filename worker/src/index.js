/**
 * EdGrantAI Edge Gateway
 *
 * Routes:
 *   POST /recommend       – proxy to Render backend (existing)
 *   POST /feedback         – store thumbs-up/down in D1
 *   GET  /feedback/stats   – aggregate feedback counts per grant
 *
 * Secrets (set via `wrangler secret put`):
 *   TURNSTILE_SECRET, EDGRANT_API_TOKEN, BACKEND_URL
 *
 * Bindings:
 *   DB – D1 database (edgrantai-feedback)
 */

const ALLOWED_ORIGINS = [
  'https://linguoren.com',
  'https://www.linguoren.com',
];

// --------------- helpers ---------------

function corsHeaders(request) {
  const origin = request.headers.get('Origin') || '';
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, CF-Turnstile-Token',
    'Access-Control-Max-Age': '86400',
  };
}

function json(body, status = 200, request) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(request) },
  });
}

async function verifyTurnstile(token, ip, secret) {
  if (!secret || !token) return false;
  const form = new URLSearchParams();
  form.append('secret', secret);
  form.append('response', token);
  if (ip) form.append('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: form,
  });
  const data = await res.json();
  return data.success === true;
}

/** Simple per-IP rate limit using a short-lived cache key. */
async function isRateLimited(ip, action, env) {
  // Skip if no KV namespace bound (graceful degradation)
  if (!env.RATE_LIMIT) return false;
  const key = `rl:${action}:${ip}`;
  const current = await env.RATE_LIMIT.get(key);
  const count = current ? parseInt(current, 10) : 0;
  const limit = action === 'feedback' ? 30 : 10; // per minute
  if (count >= limit) return true;
  await env.RATE_LIMIT.put(key, String(count + 1), { expirationTtl: 60 });
  return false;
}

/** Hash an IP for anonymous session tracking. */
async function hashIp(ip) {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip + ':edgrantai-feedback-salt');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('').slice(0, 16);
}

// --------------- route handlers ---------------

async function handleRecommend(request, env) {
  const ip = request.headers.get('CF-Connecting-IP') || '';

  // Origin check
  const origin = request.headers.get('Origin') || '';
  if (!ALLOWED_ORIGINS.includes(origin)) {
    return json({ error: 'Origin not allowed' }, 403, request);
  }

  // Turnstile
  const turnstileToken = request.headers.get('CF-Turnstile-Token') || '';
  if (env.TURNSTILE_SECRET) {
    const ok = await verifyTurnstile(turnstileToken, ip, env.TURNSTILE_SECRET);
    if (!ok) return json({ error: 'Security check failed' }, 403, request);
  }

  // Rate limit
  if (await isRateLimited(ip, 'recommend', env)) {
    return json({ error: 'Rate limit exceeded. Try again shortly.' }, 429, request);
  }

  // Proxy to backend
  const backendUrl = env.BACKEND_URL || 'https://edgrantai-api.onrender.com';
  const body = await request.text();
  const backendRes = await fetch(`${backendUrl}/recommend`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${env.EDGRANT_API_TOKEN || ''}`,
    },
    body,
  });

  const responseBody = await backendRes.text();
  return new Response(responseBody, {
    status: backendRes.status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(request),
    },
  });
}

async function handleFeedback(request, env) {
  const ip = request.headers.get('CF-Connecting-IP') || '';
  const origin = request.headers.get('Origin') || '';

  if (!ALLOWED_ORIGINS.includes(origin)) {
    return json({ error: 'Origin not allowed' }, 403, request);
  }

  // Turnstile (reuse same check)
  const turnstileToken = request.headers.get('CF-Turnstile-Token') || '';
  if (env.TURNSTILE_SECRET) {
    const ok = await verifyTurnstile(turnstileToken, ip, env.TURNSTILE_SECRET);
    if (!ok) return json({ error: 'Security check failed' }, 403, request);
  }

  // Rate limit (more generous for feedback)
  if (await isRateLimited(ip, 'feedback', env)) {
    return json({ error: 'Rate limit exceeded' }, 429, request);
  }

  // Parse and validate body
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400, request);
  }

  const { grant_id, score, bucket, signal } = body;

  if (!grant_id || typeof grant_id !== 'string') {
    return json({ error: 'grant_id is required' }, 400, request);
  }
  if (!signal || !['up', 'down'].includes(signal)) {
    return json({ error: 'signal must be "up" or "down"' }, 400, request);
  }

  const sessionHash = await hashIp(ip);

  // Deduplicate: one signal per grant per session
  const existing = await env.DB.prepare(
    'SELECT id FROM feedback WHERE grant_id = ? AND session_hash = ?'
  ).bind(grant_id, sessionHash).first();

  if (existing) {
    // Update existing feedback (user changed their mind)
    await env.DB.prepare(
      'UPDATE feedback SET signal = ?, score = ?, bucket = ?, created_at = datetime(\'now\') WHERE id = ?'
    ).bind(signal, score ?? null, bucket ?? null, existing.id).run();
    return json({ ok: true, updated: true }, 200, request);
  }

  // Insert new feedback
  await env.DB.prepare(
    'INSERT INTO feedback (grant_id, score, bucket, signal, session_hash) VALUES (?, ?, ?, ?, ?)'
  ).bind(grant_id, score ?? null, bucket ?? null, signal, sessionHash).run();

  return json({ ok: true }, 201, request);
}

async function handleFeedbackStats(request, env) {
  const origin = request.headers.get('Origin') || '';
  if (!ALLOWED_ORIGINS.includes(origin)) {
    return json({ error: 'Origin not allowed' }, 403, request);
  }

  const rows = await env.DB.prepare(`
    SELECT
      grant_id,
      SUM(CASE WHEN signal = 'up' THEN 1 ELSE 0 END)   AS thumbs_up,
      SUM(CASE WHEN signal = 'down' THEN 1 ELSE 0 END) AS thumbs_down,
      COUNT(*) AS total
    FROM feedback
    GROUP BY grant_id
    ORDER BY total DESC
    LIMIT 100
  `).all();

  return json({ stats: rows.results || [] }, 200, request);
}

// --------------- router ---------------

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname } = url;

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(request) });
    }

    // Route: POST /recommend
    if (request.method === 'POST' && pathname === '/recommend') {
      return handleRecommend(request, env);
    }

    // Route: POST /feedback
    if (request.method === 'POST' && pathname === '/feedback') {
      return handleFeedback(request, env);
    }

    // Route: GET /feedback/stats
    if (request.method === 'GET' && pathname === '/feedback/stats') {
      return handleFeedbackStats(request, env);
    }

    return json({ error: 'Not found' }, 404, request);
  },
};
