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

  const status = stats?.status;
  const statusMessage = stats?.message;
  const isPlaceholder = status === 'placeholder';
  const isErrored = status === 'error';

  const formatNumber = (value, digits) =>
    value.toLocaleString(undefined, { maximumFractionDigits: digits, minimumFractionDigits: digits });
  const formatMiles = (meters) => {
    const miles = metersToMiles(meters || 0);
    const digits = miles >= 1000 ? 0 : 1;
    return formatNumber(miles, digits);
  };
  const formatHours = (seconds) => {
    const hours = secondsToHours(seconds || 0);
    const digits = hours >= 100 ? 0 : 1;
    return formatNumber(hours, digits);
  };
  const formatFeet = (meters) => {
    const feet = Math.round(metersToFeet(meters || 0));
    if (feet >= 10000) {
      return `${Math.round(feet / 1000).toLocaleString()}k`;
    }
    return feet.toLocaleString();
  };

  const renderBlock = (label, obj) => (
    <div className="strava-block">
      <span className="strava-block-label">{label}</span>
      <span className="strava-block-main">{formatMiles(obj.distance_m || 0)} mi</span>
      <span className="strava-block-sub">
        {formatHours(obj.moving_time_s || 0)} h · {formatFeet(obj.elevation_gain_m || 0)} ft
      </span>
    </div>
  );

  return (
    <section className="strava-card" aria-label="Strava running, riding, and rowing stats">
      <div className="strava-header">
        <span className="strava-title">Strava Snapshot</span>
        {stats && stats.fetched_at && (
          <span className="strava-sub">
            Updated {new Date(stats.fetched_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        )}
      </div>
      {!stats && !error && <div className="strava-loading">Loading…</div>}
      {error && <div className="strava-error">Stats unavailable</div>}
      {stats && (isPlaceholder || isErrored) && (
        <div className={isErrored ? 'strava-error' : 'strava-loading'}>
          {statusMessage || (isErrored ? 'Stats unavailable' : 'Stats not configured yet')}
        </div>
      )}
      {stats && !(isPlaceholder || isErrored) && (
        <div className="strava-panels">
          <article className="strava-panel">
            <div className="strava-panel-title">
              <span className="strava-panel-icon" aria-hidden="true">🏃</span>
              <span>Running</span>
            </div>
            {renderBlock('YTD', stats.ytd_run || {})}
            <div className="strava-divider" aria-hidden="true" />
            {renderBlock('All-Time', stats.all_run || {})}
          </article>
          <article className="strava-panel">
            <div className="strava-panel-title">
              <span className="strava-panel-icon" aria-hidden="true">🚴</span>
              <span>Cycling</span>
            </div>
            {renderBlock('YTD', stats.ytd_ride || {})}
            <div className="strava-divider" aria-hidden="true" />
            {renderBlock('All-Time', stats.all_ride || {})}
          </article>
          <article className="strava-panel">
            <div className="strava-panel-title">
              <span className="strava-panel-icon" aria-hidden="true">🚣</span>
              <span>Rowing</span>
            </div>
            {renderBlock('YTD', stats.ytd_row || {})}
            <div className="strava-divider" aria-hidden="true" />
            {renderBlock('All-Time', stats.all_row || {})}
          </article>
        </div>
      )}
      <div className="strava-footer">
        <span className="strava-note">Auto‑updated daily</span>
      </div>
    </section>
  );
}
