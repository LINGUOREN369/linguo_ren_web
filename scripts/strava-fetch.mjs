#!/usr/bin/env node
/*
  Fetch Strava athlete stats and write to public/strava/stats.json
  Required env vars (GitHub Secrets):
    STRAVA_CLIENT_ID
    STRAVA_CLIENT_SECRET
    STRAVA_REFRESH_TOKEN
    STRAVA_ATHLETE_ID
*/
import fs from 'node:fs/promises';
import path from 'node:path';

const {
  STRAVA_CLIENT_ID,
  STRAVA_CLIENT_SECRET,
  STRAVA_REFRESH_TOKEN,
  STRAVA_ATHLETE_ID
} = process.env;

const outDir = path.join(process.cwd(), 'public', 'strava');
const outFile = path.join(outDir, 'stats.json');

async function main() {
  if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET || !STRAVA_REFRESH_TOKEN) {
    console.warn('Missing one or more Strava env vars; writing placeholder.');
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(outFile, JSON.stringify({
      status: 'placeholder',
      message: 'Missing Strava credentials; please set secrets and re-run.',
      fetched_at: null,
      ytd_run: { distance_m: 0, moving_time_s: 0, elevation_gain_m: 0 },
      ytd_ride: { distance_m: 0, moving_time_s: 0, elevation_gain_m: 0 },
      all_run: { distance_m: 0, moving_time_s: 0, elevation_gain_m: 0 },
      all_ride: { distance_m: 0, moving_time_s: 0, elevation_gain_m: 0 }
    }, null, 2));
    return;
  }

  // 1) Refresh token
  const tokenRes = await fetch('https://www.strava.com/api/v3/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVA_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: STRAVA_REFRESH_TOKEN
    })
  });
  if (!tokenRes.ok) {
    const t = await tokenRes.text();
    throw new Error(`Token refresh failed: ${tokenRes.status} ${t}`);
  }
  const tokenJson = await tokenRes.json();
  const accessToken = tokenJson.access_token;

  // 2) Resolve athlete ID if not provided
  let athleteId = STRAVA_ATHLETE_ID;
  if (!athleteId) {
    const meRes = await fetch('https://www.strava.com/api/v3/athlete', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (!meRes.ok) {
      const t = await meRes.text();
      throw new Error(`Athlete fetch failed: ${meRes.status} ${t}`);
    }
    const me = await meRes.json();
    athleteId = me?.id;
    if (!athleteId) throw new Error('Could not determine athlete ID');
  }

  // 3) Use Athlete Stats endpoint (does not require activity:read), which aggregates
  //    totals Strava-side. Virtual rides are included under Ride; Trail runs under Run.
  const statsUrl = `https://www.strava.com/api/v3/athletes/${encodeURIComponent(athleteId)}/stats`;
  const statsRes = await fetch(statsUrl, { headers: { Authorization: `Bearer ${accessToken}` } });
  if (!statsRes.ok) {
    const t = await statsRes.text();
    throw new Error(`Stats fetch failed: ${statsRes.status} ${t}`);
  }
  const s = await statsRes.json();

  const pick = (obj) => ({
    distance_m: obj?.distance ?? 0,
    moving_time_s: obj?.moving_time ?? 0,
    elevation_gain_m: obj?.elevation_gain ?? 0
  });

  const out = {
    fetched_at: new Date().toISOString(),
    ytd_run: pick(s.ytd_run_totals),
    ytd_ride: pick(s.ytd_ride_totals),
    all_run: pick(s.all_run_totals),
    all_ride: pick(s.all_ride_totals)
  };

  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(outFile, JSON.stringify(out, null, 2));
  console.log('Wrote', outFile);
}

main().catch(async (err) => {
  console.error('Strava fetch failed:', err.message);
  try {
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(outFile, JSON.stringify({
      status: 'error',
      message: String(err.message || err),
      fetched_at: new Date().toISOString()
    }, null, 2));
  } catch {}
  process.exitCode = 1;
});
