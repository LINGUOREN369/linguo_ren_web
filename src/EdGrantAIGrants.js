import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/EdGrantAI.css';
import './styles/EdGrantAIGrants.css';

const GRANTS_INDEX_URL =
  'https://api.github.com/repos/LINGUOREN369/EdGrantAI/contents/data/processed_grants?ref=main';

const formatGrantTitle = (filename) => {
  if (!filename || typeof filename !== 'string') return 'Grant profile';
  return filename
    .replace(/_profile\.json$/i, '')
    .replace(/\.json$/i, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

export default function EdGrantAIGrants() {
  const [grants, setGrants] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    const loadGrants = async () => {
      setStatus('loading');
      setError('');
      try {
        const response = await fetch(GRANTS_INDEX_URL);
        if (!response.ok) {
          throw new Error('Unable to load the current grant database.');
        }
        const data = await response.json();
        const files = Array.isArray(data) ? data : [];
        const mapped = files
          .filter((file) => file && file.type === 'file' && file.name && file.name.endsWith('.json'))
          .map((file) => ({
            name: formatGrantTitle(file.name),
            filename: file.name,
            downloadUrl: file.download_url,
            htmlUrl: file.html_url,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        if (isActive) {
          setGrants(mapped);
          setStatus('ready');
        }
      } catch (err) {
        if (isActive) {
          setError(err instanceof Error ? err.message : 'Unable to load the grant list.');
          setStatus('error');
        }
      }
    };

    loadGrants();

    return () => {
      isActive = false;
    };
  }, []);

  const totalCount = useMemo(() => grants.length, [grants.length]);

  return (
    <div className="container edg-container edg-grants">
      <header className="edg-grants-hero">
        <div>
          <span className="edg-eyebrow">Current grant database</span>
          <h1 className="edg-title">Processed Grant Profiles</h1>
          <p className="edg-grants-subtitle">
            This list shows every processed grant profile used by the recommendation engine. It is updated directly from the
            EdGrantAI repository and reflects the current NSF-focused dataset.
          </p>
          <div className="edg-pill-row">
            <span className="edg-pill">NSF-focused</span>
            <span className="edg-pill">{totalCount} processed grants</span>
          </div>
        </div>
        <div className="edg-grants-actions">
          <Link to="/edgrantai-chat" className="portfolio-button">
            Back to Live Recommendations
          </Link>
          <a
            className="portfolio-button portfolio-button--secondary"
            href="https://github.com/LINGUOREN369/EdGrantAI"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Repository
          </a>
          <Link to="/project" className="portfolio-button portfolio-button--secondary">
            Back to Projects
          </Link>
        </div>
      </header>

      <section className="edg-grants-panel edg-panel">
        <div className="edg-grants-panel-header">
          <h2 className="edg-h2">Grant profiles</h2>
          <p className="edg-intro">Open any grant to review the processed JSON profile used in matching.</p>
        </div>

        {status === 'loading' && (
          <div className="edg-grants-state">Loading the current grant database...</div>
        )}

        {status === 'error' && (
          <div className="edg-grants-state edg-grants-state--error">{error}</div>
        )}

        {status === 'ready' && grants.length === 0 && (
          <div className="edg-grants-state">No processed grants found yet.</div>
        )}

        {status === 'ready' && grants.length > 0 && (
          <ul className="edg-grants-grid">
            {grants.map((grant) => (
              <li key={grant.filename} className="edg-card edg-grants-item">
                <div>
                  <p className="edg-grants-name">{grant.name}</p>
                  <p className="edg-grants-file">{grant.filename}</p>
                </div>
                <div className="edg-grants-links">
                  <a
                    className="edg-grants-link"
                    href={grant.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open profile JSON
                  </a>
                  <a
                    className="edg-grants-link edg-grants-link--muted"
                    href={grant.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on GitHub
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
