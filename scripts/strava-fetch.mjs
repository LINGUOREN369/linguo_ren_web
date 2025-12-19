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

  // 3) Aggregate totals including VirtualRide under Cycling and TrailRun under Running
  // Helper to iterate athlete activities with pagination
  async function aggregateActivities({ afterEpoch = undefined, beforeEpoch = undefined } = {}) {
    const perPage = 200;
    let page = 1;
    let done = false;
    const sums = {
      run: { distance: 0, moving: 0, elev: 0 },
      ride: { distance: 0, moving: 0, elev: 0 },
    };
    while (!done) {
      const params = new URLSearchParams();
      params.set('page', String(page));
      params.set('per_page', String(perPage));
      if (afterEpoch) params.set('after', String(afterEpoch));
      if (beforeEpoch) params.set('before', String(beforeEpoch));
      const url = `https://www.strava.com/api/v3/athlete/activities?${params.toString()}`;
      const res = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(`Activities fetch failed p${page}: ${res.status} ${t}`);
      }
      const arr = await res.json();
      if (!Array.isArray(arr) || arr.length === 0) { done = true; break; }

      for (const a of arr) {
        // Prefer sport_type if present, fallback to type
        const sport = (a.sport_type || a.type || '').trim();
        const dist = Number(a.distance || 0);
        const mov = Number(a.moving_time || 0);
        const elev = Number(a.total_elevation_gain || 0);
        // Running: include Run + TrailRun
        if (sport === 'Run' || sport === 'TrailRun') {
          sums.run.distance += dist; sums.run.moving += mov; sums.run.elev += elev;
        }
        // Cycling: include Ride + VirtualRide
        if (sport === 'Ride' || sport === 'VirtualRide') {
          sums.ride.distance += dist; sums.ride.moving += mov; sums.ride.elev += elev;
        }
      }

      page += 1;
      if (arr.length < perPage) { done = true; }
    }
    return sums;
  }

  // YTD: from Jan 1 00:00 UTC of current year
  const currentYear = new Date().getUTCFullYear();
  const jan1Current = new Date(Date.UTC(currentYear, 0, 1, 0, 0, 0));
  const ytd = await aggregateActivities({ afterEpoch: Math.floor(jan1Current.getTime() / 1000) });

  // Previous year: Jan 1 of previous year to Jan 1 of current year (exclusive)
  const jan1Prev = new Date(Date.UTC(currentYear - 1, 0, 1, 0, 0, 0));
  const prev = await aggregateActivities({
    afterEpoch: Math.floor(jan1Prev.getTime() / 1000),
    beforeEpoch: Math.floor(jan1Current.getTime() / 1000)
  });

  // All-time: iterate all pages
  const all = await aggregateActivities({});

  const toObj = (x) => ({ distance_m: Math.round(x.distance), moving_time_s: Math.round(x.moving), elevation_gain_m: Math.round(x.elev) });
  const out = {
    fetched_at: new Date().toISOString(),
    ytd_run: toObj(ytd.run),
    ytd_ride: toObj(ytd.ride),
    prev_year: currentYear - 1,
    prev_year_run: toObj(prev.run),
    prev_year_ride: toObj(prev.ride),
    all_run: toObj(all.run),
    all_ride: toObj(all.ride)
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
