import React, { useEffect, useState } from 'react';
import './styles/Strava.css';

const STATS_URL = process.env.PUBLIC_URL + '/strava/stats.json';

function metersToMiles(m) { return (m / 1609.344); }
function metersToFeet(m) { return (m * 3.28084); }
function secondsToHours(s) { return (s / 3600); }

export default function StravaWidget() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(STATS_URL, { cache: 'no-store' })
      .then(r => r.ok ? r.json() : Promise.reject(new Error('Failed to load stats')))
      .then(json => { if (!cancelled) setStats(json); })
      .catch(e => { if (!cancelled) setError(String(e)); });
    return () => { cancelled = true; };
  }, []);

  const fmt = (n, digits = 1) => n.toLocaleString(undefined, { maximumFractionDigits: digits, minimumFractionDigits: digits });

  const renderTotals = (label, obj) => (
    <div className="strava-row">
      <div className="strava-label">{label}</div>
      <div className="strava-values">
        <span className="strava-chip">{fmt(metersToMiles(obj.distance_m || 0))} mi</span>
        <span className="strava-chip">{fmt(secondsToHours(obj.moving_time_s || 0))} h</span>
        <span className="strava-chip">{fmt(metersToFeet(obj.elevation_gain_m || 0))} ft</span>
      </div>
    </div>
  );

  return (
    <section className="strava-card" aria-label="Strava running and riding stats">
      <div className="strava-header">
        <span className="strava-title">Strava Summary</span>
        {stats && stats.fetched_at && (
          <span className="strava-sub">Updated {new Date(stats.fetched_at).toLocaleDateString()}</span>
        )}
      </div>
      {!stats && !error && <div className="strava-loading">Loading…</div>}
      {error && <div className="strava-error">Stats unavailable</div>}
      {stats && (
        <div className="strava-body">
          <div className="strava-section">
            <div className="strava-section-title">Year to Date</div>
            {renderTotals('Running', stats.ytd_run || {})}
            {renderTotals('Cycling', stats.ytd_ride || {})}
          </div>
          <div className="strava-section">
            <div className="strava-section-title">All‑Time</div>
            {renderTotals('Running', stats.all_run || {})}
            {renderTotals('Cycling', stats.all_ride || {})}
          </div>
        </div>
      )}
      <div className="strava-footer">
        <span className="strava-note">Auto‑updated daily</span>
      </div>
    </section>
  );
}
