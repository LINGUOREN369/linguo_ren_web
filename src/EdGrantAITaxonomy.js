import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/EdGrantAI.css';
import './styles/EdGrantAIGrants.css';

const TAXONOMY_INDEX_URL =
  'https://api.github.com/repos/LINGUOREN369/EdGrantAI/contents/data/taxonomy?ref=main';

const TAXONOMY_TITLE_MAP = {
  'geography_tags.json': 'Geography tags',
  'mission_tags.json': 'Mission tags',
  'nsf_programs.json': 'NSF programs',
  'org_types.json': 'Organization types',
  'population_tags.json': 'Population tags',
  'red_flag_tags.json': 'Red flag tags',
  'schema_version.json': 'Schema version',
};

const TAXONOMY_DIR_TITLE_MAP = {
  embeddings: 'Embeddings',
  synonyms: 'Synonyms',
};

const formatTaxonomyTitle = (filename) => {
  if (!filename || typeof filename !== 'string') return 'Taxonomy file';
  const lower = filename.toLowerCase();
  if (TAXONOMY_TITLE_MAP[lower]) return TAXONOMY_TITLE_MAP[lower];
  return filename
    .replace(/\.json$/i, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const formatUpdatedDate = (value) => {
  if (!value || typeof value !== 'string') return '';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const formatTaxonomyDirTitle = (dirname) => {
  if (!dirname || typeof dirname !== 'string') return 'Taxonomy directory';
  const lower = dirname.toLowerCase();
  if (TAXONOMY_DIR_TITLE_MAP[lower]) return TAXONOMY_DIR_TITLE_MAP[lower];
  return dirname
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

export default function EdGrantAITaxonomy() {
  const [taxonomyFiles, setTaxonomyFiles] = useState([]);
  const [taxonomyDirs, setTaxonomyDirs] = useState([]);
  const [schemaMeta, setSchemaMeta] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    const loadTaxonomy = async () => {
      setStatus('loading');
      setError('');
      try {
        const response = await fetch(TAXONOMY_INDEX_URL);
        if (!response.ok) {
          throw new Error('Unable to load the current taxonomy.');
        }
        const data = await response.json();
        const files = Array.isArray(data) ? data : [];
        const jsonFiles = files.filter(
          (file) => file && file.type === 'file' && file.name && file.name.endsWith('.json')
        );
        const directories = files.filter((file) => file && file.type === 'dir' && file.name);
        const mapped = jsonFiles
          .map((file) => ({
            name: formatTaxonomyTitle(file.name),
            filename: file.name,
            downloadUrl: file.download_url,
            htmlUrl: file.html_url,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        const mappedDirs = directories
          .map((dir) => ({
            name: formatTaxonomyDirTitle(dir.name),
            dirname: dir.name,
            htmlUrl: dir.html_url,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        if (isActive) {
          setTaxonomyFiles(mapped);
          setTaxonomyDirs(mappedDirs);
          setStatus('ready');
        }

        const schemaFile = jsonFiles.find((file) => file.name === 'schema_version.json');
        if (schemaFile && schemaFile.download_url) {
          try {
            const schemaResponse = await fetch(schemaFile.download_url);
            if (schemaResponse.ok) {
              const schema = await schemaResponse.json();
              if (isActive) {
                setSchemaMeta(schema);
              }
            }
          } catch {
            if (isActive) {
              setSchemaMeta(null);
            }
          }
        }
      } catch (err) {
        if (isActive) {
          setError(err instanceof Error ? err.message : 'Unable to load the taxonomy list.');
          setStatus('error');
        }
      }
    };

    loadTaxonomy();

    return () => {
      isActive = false;
    };
  }, []);

  const totalCount = useMemo(() => taxonomyFiles.length, [taxonomyFiles.length]);
  const dirCount = useMemo(() => taxonomyDirs.length, [taxonomyDirs.length]);
  const taxonomyVersion =
    schemaMeta && typeof schemaMeta === 'object' ? schemaMeta.taxonomy_version : '';
  const taxonomyUpdated =
    schemaMeta && typeof schemaMeta === 'object' ? schemaMeta.last_updated : '';
  const formattedUpdated = formatUpdatedDate(taxonomyUpdated);

  return (
    <div className="container edg-container edg-grants edg-taxonomy">
      <header className="edg-grants-hero">
        <div>
          <span className="edg-eyebrow">Current taxonomy</span>
          <h1 className="edg-title">Taxonomy Tags & Schemas</h1>
          <p className="edg-grants-subtitle">
            This list shows the taxonomy JSON files used to normalize mission text, grant profiles, and eligibility signals
            inside EdGrantAI.
          </p>
          <div className="edg-pill-row">
            <span className="edg-pill">Curated tags</span>
            {taxonomyVersion && <span className="edg-pill">Taxonomy v{taxonomyVersion}</span>}
            {formattedUpdated && <span className="edg-pill">Updated {formattedUpdated}</span>}
            <span className="edg-pill">{totalCount} taxonomy files</span>
            {dirCount > 0 && <span className="edg-pill">{dirCount} directories</span>}
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
          <h2 className="edg-h2">Taxonomy files</h2>
          <p className="edg-intro">Open any file to review the tags and schema used by the matching pipeline.</p>
        </div>

        {status === 'loading' && (
          <div className="edg-grants-state">Loading the current taxonomy...</div>
        )}

        {status === 'error' && (
          <div className="edg-grants-state edg-grants-state--error">{error}</div>
        )}

        {status === 'ready' && taxonomyFiles.length === 0 && (
          <div className="edg-grants-state">No taxonomy files found yet.</div>
        )}

        {status === 'ready' && taxonomyFiles.length > 0 && (
          <ul className="edg-grants-grid">
            {taxonomyFiles.map((taxonomy) => (
              <li key={taxonomy.filename} className="edg-card edg-grants-item">
                <div>
                  <p className="edg-grants-name">{taxonomy.name}</p>
                  <p className="edg-grants-file">{taxonomy.filename}</p>
                </div>
                <div className="edg-grants-links">
                  <a
                    className="edg-grants-link"
                    href={taxonomy.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open taxonomy JSON
                  </a>
                  <a
                    className="edg-grants-link edg-grants-link--muted"
                    href={taxonomy.htmlUrl}
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

      <section className="edg-grants-panel edg-panel">
        <div className="edg-grants-panel-header">
          <h2 className="edg-h2">Taxonomy directories</h2>
          <p className="edg-intro">Browse supporting reference folders such as synonyms and embeddings.</p>
        </div>

        {status === 'loading' && (
          <div className="edg-grants-state">Loading taxonomy directories...</div>
        )}

        {status === 'error' && (
          <div className="edg-grants-state edg-grants-state--error">{error}</div>
        )}

        {status === 'ready' && taxonomyDirs.length === 0 && (
          <div className="edg-grants-state">No taxonomy directories found yet.</div>
        )}

        {status === 'ready' && taxonomyDirs.length > 0 && (
          <ul className="edg-grants-grid">
            {taxonomyDirs.map((dir) => (
              <li key={dir.dirname} className="edg-card edg-grants-item">
                <div>
                  <p className="edg-grants-name">{dir.name}</p>
                  <p className="edg-grants-file">{dir.dirname}</p>
                </div>
                <div className="edg-grants-links">
                  <a
                    className="edg-grants-link"
                    href={dir.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View directory on GitHub
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
