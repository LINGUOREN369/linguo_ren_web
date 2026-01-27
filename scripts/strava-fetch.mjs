#!/usr/bin/env node
/*
  Fetch Strava activities and aggregate stats into public/strava/stats.json
  Required env vars (GitHub Secrets):
    STRAVA_CLIENT_ID
    STRAVA_CLIENT_SECRET
    STRAVA_REFRESH_TOKEN
  Notes:
    - Private activities require scope: activity:read_all
*/
import fs from 'node:fs/promises';
import path from 'node:path';

const {
  STRAVA_CLIENT_ID,
  STRAVA_CLIENT_SECRET,
  STRAVA_REFRESH_TOKEN
} = process.env;

const outDir = path.join(process.cwd(), 'public', 'strava');
const outFile = path.join(outDir, 'stats.json');

const RUN_TYPES = new Set([
  'Run',
  'RaceRun',
  'TrailRun',
  'VirtualRun',
  'Walk',
  'Hike'
]);

const RIDE_TYPES = new Set([
  'Ride',
  'VirtualRide',
  'MountainBikeRide',
  'GravelRide',
  'EBikeRide',
  'EMountainBikeRide',
  'Handcycle',
  'Velomobile'
]);

const ROW_TYPES = new Set([
  'Rowing',
  'VirtualRow',
  'IndoorRowing'
]);

const blankTotals = () => ({
  distance_m: 0,
  moving_time_s: 0,
  elevation_gain_m: 0
});

const addActivityTotals = (totals, activity) => {
  totals.distance_m += Number(activity?.distance) || 0;
  totals.moving_time_s += Number(activity?.moving_time) || 0;
  totals.elevation_gain_m += Number(activity?.total_elevation_gain) || 0;
};

const getActivityType = (activity) => activity?.sport_type || activity?.type;

async function fetchAndAggregateActivities(accessToken, ytdStartMs) {
  const ytd_run = blankTotals();
  const ytd_ride = blankTotals();
  const ytd_row = blankTotals();
  const all_run = blankTotals();
  const all_ride = blankTotals();
  const all_row = blankTotals();
  const perPage = 200;
  let page = 1;

  while (true) {
    const url = new URL('https://www.strava.com/api/v3/athlete/activities');
    url.searchParams.set('page', String(page));
    url.searchParams.set('per_page', String(perPage));

    const res = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
    if (!res.ok) {
      const t = await res.text();
      throw new Error(`Activities fetch failed: ${res.status} ${t}`);
    }
    const activities = await res.json();
    if (!Array.isArray(activities) || activities.length === 0) break;

    for (const activity of activities) {
      const type = getActivityType(activity);
      const isRun = RUN_TYPES.has(type);
      const isRide = RIDE_TYPES.has(type);
      const isRow = ROW_TYPES.has(type);
      if (!isRun && !isRide && !isRow) continue;

      const startedAt = activity?.start_date || activity?.start_date_local;
      const startMs = startedAt ? Date.parse(startedAt) : NaN;
      const isYtd = Number.isFinite(startMs) && startMs >= ytdStartMs;

      if (isRun) {
        addActivityTotals(all_run, activity);
        if (isYtd) addActivityTotals(ytd_run, activity);
      }
      if (isRide) {
        addActivityTotals(all_ride, activity);
        if (isYtd) addActivityTotals(ytd_ride, activity);
      }
      if (isRow) {
        addActivityTotals(all_row, activity);
        if (isYtd) addActivityTotals(ytd_row, activity);
      }
    }

    if (activities.length < perPage) break;
    page += 1;
  }

  return { ytd_run, ytd_ride, ytd_row, all_run, all_ride, all_row };
}

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
      ytd_row: { distance_m: 0, moving_time_s: 0, elevation_gain_m: 0 },
      all_run: { distance_m: 0, moving_time_s: 0, elevation_gain_m: 0 },
      all_ride: { distance_m: 0, moving_time_s: 0, elevation_gain_m: 0 },
      all_row: { distance_m: 0, moving_time_s: 0, elevation_gain_m: 0 }
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
  const scope = tokenJson?.scope || '';
  const scopeSet = new Set(scope.split(',').map(s => s.trim()).filter(Boolean));
  const hasPrivateScope = scopeSet.has('activity:read_all');
  let warning = null;
  if (!hasPrivateScope) {
    warning = 'Token scope missing activity:read_all; private activities are excluded from totals.';
    console.warn('Strava scope warning:', warning);
  }

  const now = new Date();
  const ytdStartMs = Date.UTC(now.getUTCFullYear(), 0, 1);
  const totals = await fetchAndAggregateActivities(accessToken, ytdStartMs);

  const out = {
    fetched_at: new Date().toISOString(),
    ytd_run: totals.ytd_run,
    ytd_ride: totals.ytd_ride,
    ytd_row: totals.ytd_row,
    all_run: totals.all_run,
    all_ride: totals.all_ride,
    all_row: totals.all_row
  };
  if (warning) out.warning = warning;

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
