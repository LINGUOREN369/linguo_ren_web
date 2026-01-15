import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/EdGrantAIChat.css';

const API_ENDPOINT = process.env.REACT_APP_EDGRANT_API_URL
  || 'https://edgrantai-proxy.lren-31b.workers.dev/recommend';
const TURNSTILE_SITE_KEY = process.env.REACT_APP_TURNSTILE_SITE_KEY
  || '0x4AAAAAACK9_1Q5N9HOGc3h';
const PROCESSED_GRANT_BASE_URL = 'https://raw.githubusercontent.com/LINGUOREN369/EdGrantAI/main/data/processed_grants';
const EXAMPLE_CASE_ORG = 'Applied Learning & Teaching Lab (ALTL)';
const EXAMPLE_CASE_TEXT = `Core Program Areas

1. Teacher Professional Learning
- Designs and delivers sustained professional learning for K-12 STEM teachers
- Focus on math and science instructional practices aligned with state standards
- Coaching, workshops, and online learning communities

2. Research-Practice Partnerships (RPPs)
- Collaborates with university researchers and school districts
- Conducts implementation and efficacy studies of STEM instructional interventions
- Emphasis on continuous improvement and classroom applicability

3. Curriculum & Instructional Materials
- Develops open-access STEM curriculum modules and assessments
- Supports districts in adapting materials for local contexts
- Integrates computational thinking and data literacy

4. Broadening Participation
- Works with Title I schools and rural districts
- Supports teachers serving historically underrepresented student populations
- Focus on inclusive instructional design and access

Populations Served
- K-12 students
- K-12 STEM teachers
- School and district instructional leaders

Organizational Type
- 501(c)(3) nonprofit organization
- Does not award degrees
- Functions as an intermediary and implementation partner

Evidence & Capacity
- Experience managing multi-year federally funded projects
- Prior NSF-style evaluation activities (logic models, formative evaluation)
- Data collection on teacher practice and student learning outcomes
- Partnerships with higher education institutions`;
const MAX_MESSAGE_PREVIEW = 240;
const MAX_MISSION_TOKENS = 10000;
const CHARS_PER_TOKEN = 4;
const WORDS_PER_TOKEN = 0.75;
const MAX_MISSION_WORDS = Math.floor(MAX_MISSION_TOKENS * WORDS_PER_TOKEN);

const formatGrantName = (rec) => {
  const raw = rec.title || rec.name || rec.program || rec.grant_profile || 'Grant';
  if (typeof raw !== 'string') return 'Grant';
  return raw.replace('_profile.json', '').replace(/_/g, ' ').trim();
};

const formatScore = (score) => {
  if (typeof score !== 'number' || Number.isNaN(score)) return 'N/A';
  return `${Math.round(score * 100)}%`;
};

const grantProfileUrl = (rec) => {
  const raw = rec?.grant_profile
    || rec?.profile
    || rec?.grant_profile_file
    || rec?.profile_file
    || rec?.grant_profile_path
    || rec?.profile_path;
  if (!raw || typeof raw !== 'string') return null;
  let filename = raw.split('/').pop();
  if (!filename) return null;
  filename = filename.split('?')[0].split('#')[0].trim();
  if (!filename) return null;
  if (!filename.endsWith('.json')) {
    filename = `${filename}.json`;
  }
  const lower = filename.toLowerCase();
  if (!lower.includes('profile') && lower.endsWith('.json')) {
    filename = filename.replace(/\.json$/i, '_profile.json');
  }
  return `${PROCESSED_GRANT_BASE_URL}/${encodeURIComponent(filename)}`;
};

const normalizeOrgProfileFilename = (orgProfile) => {
  if (!orgProfile || typeof orgProfile !== 'string') return null;
  let filename = orgProfile.split('/').pop();
  if (!filename) return null;
  filename = filename.split('?')[0].split('#')[0].trim();
  if (!filename) return null;
  if (!filename.endsWith('.json')) {
    filename = filename.endsWith('_profile') ? `${filename}.json` : `${filename}_profile.json`;
  }
  const lower = filename.toLowerCase();
  if (!lower.includes('profile') && lower.endsWith('.json')) {
    filename = filename.replace(/\.json$/i, '_profile.json');
  }
  return filename;
};

const bucketClass = (bucket) => {
  switch ((bucket || '').toLowerCase()) {
    case 'apply':
      return 'edg-badge edg-badge--apply';
    case 'maybe':
      return 'edg-badge edg-badge--maybe';
    case 'avoid':
      return 'edg-badge edg-badge--avoid';
    default:
      return 'edg-badge';
  }
};

export default function EdGrantAIChat() {
  const [mission, setMission] = useState('');
  const [orgName, setOrgName] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Paste your mission and I will return ranked grant recommendations with clear reasons.'
    }
  ]);
  const [recommendations, setRecommendations] = useState([]);
  const [orgProfileFile, setOrgProfileFile] = useState('');
  const [processedOrgProfileJson, setProcessedOrgProfileJson] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const trimmedMission = mission.trim();
  const missionCharCount = trimmedMission.length;
  const missionTokenEstimate = Math.ceil(missionCharCount / CHARS_PER_TOKEN);
  const missionWordCount = trimmedMission ? trimmedMission.split(/\s+/).length : 0;
  const missionOverLimit = missionTokenEstimate > MAX_MISSION_TOKENS;
  const missionTokenOverage = missionOverLimit ? (missionTokenEstimate - MAX_MISSION_TOKENS) : 0;
  const missionWordOverage = missionWordCount > MAX_MISSION_WORDS ? (missionWordCount - MAX_MISSION_WORDS) : 0;
  const feedRef = useRef(null);
  const turnstileRef = useRef(null);
  const turnstileWidgetRef = useRef(null);
  const turnstileTokenRef = useRef('');
  const turnstilePendingRef = useRef(null);
  const loadExampleCase = () => {
    setOrgName(EXAMPLE_CASE_ORG);
    setMission(EXAMPLE_CASE_TEXT);
    setError('');
  };

  const openJsonTab = (payload) => {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank', 'noopener');
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const openUrl = (url) => {
    if (!url) return;
    window.open(url, '_blank', 'noopener');
  };

  const buildMatchReport = () => ({
    generated_at: new Date().toISOString(),
    org_profile: orgProfileFile || null,
    organization_profile: processedOrgProfileJson || null,
    recommendations: recommendations.map((rec, idx) => ({
      rank: idx + 1,
      ...rec,
    })),
  });

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return undefined;
    let timerId = null;
    let mounted = true;

    const renderWidget = () => {
      if (!mounted || turnstileWidgetRef.current || !turnstileRef.current) return;
      if (!window.turnstile || typeof window.turnstile.render !== 'function') {
        timerId = window.setTimeout(renderWidget, 200);
        return;
      }
      turnstileWidgetRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        size: 'invisible',
        callback: (token) => {
          turnstileTokenRef.current = token;
          const pending = turnstilePendingRef.current;
          if (pending) {
            pending.resolve(token);
          }
        },
        'expired-callback': () => {
          turnstileTokenRef.current = '';
        },
        'error-callback': () => {
          const pending = turnstilePendingRef.current;
          if (pending) {
            pending.reject(new Error('Security check failed. Please try again.'));
          }
        },
      });
    };

    renderWidget();

    return () => {
      mounted = false;
      if (timerId) window.clearTimeout(timerId);
      if (window.turnstile && turnstileWidgetRef.current) {
        try {
          window.turnstile.remove(turnstileWidgetRef.current);
        } catch (err) {
          // Ignore cleanup errors for third-party script.
        }
      }
      turnstileWidgetRef.current = null;
    };
  }, []);

  const getTurnstileToken = async () => {
    if (!TURNSTILE_SITE_KEY) return null;
    const turnstile = window.turnstile;
    const widgetId = turnstileWidgetRef.current;
    if (!turnstile || widgetId === null) {
      throw new Error('Security check is still loading. Please try again.');
    }
    const existing = turnstile.getResponse(widgetId);
    if (existing) return existing;
    const pending = turnstilePendingRef.current;
    if (pending && pending.promise) {
      return pending.promise;
    }
    let resolveRef;
    let rejectRef;
    const promise = new Promise((resolve, reject) => {
      resolveRef = resolve;
      rejectRef = reject;
    });
    const timeoutId = window.setTimeout(() => {
      turnstilePendingRef.current = null;
      rejectRef(new Error('Security check timed out. Please try again.'));
    }, 8000);
    turnstilePendingRef.current = {
      promise,
      resolve: (token) => {
        window.clearTimeout(timeoutId);
        turnstilePendingRef.current = null;
        resolveRef(token);
      },
      reject: (err) => {
        window.clearTimeout(timeoutId);
        turnstilePendingRef.current = null;
        rejectRef(err);
      },
    };
    try {
      turnstile.reset(widgetId);
      turnstile.execute(widgetId);
    } catch (err) {
      turnstilePendingRef.current = null;
      throw new Error('Security check could not start. Please reload and try again.');
    }
    return promise;
  };

  const submitMission = async (event) => {
    event.preventDefault();
    const trimmed = trimmedMission;
    if (!trimmed) {
      setError('Please enter a mission statement.');
      return;
    }
    if (missionTokenEstimate > MAX_MISSION_TOKENS) {
      setError(`Mission statement is too long (${missionTokenEstimate} tokens est). Limit is ${MAX_MISSION_TOKENS} tokens (~${MAX_MISSION_WORDS} words).`);
      return;
    }
    if (!API_ENDPOINT) {
      setError('API endpoint not configured.');
      return;
    }
    setError('');
    setIsLoading(true);
    setRecommendations([]);
    setOrgProfileFile('');
    setProcessedOrgProfileJson(null);
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);

    try {
      const payload = { mission: trimmed, explain: true };
      if (orgName.trim()) payload.org_name = orgName.trim();

      let token = null;
      if (TURNSTILE_SITE_KEY) {
        token = await getTurnstileToken();
      }

      const headers = { 'Content-Type': 'application/json' };
      if (token) {
        headers['CF-Turnstile-Token'] = token;
      }

      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        let message = text || 'Request failed';
        try {
          const parsed = JSON.parse(text);
          if (parsed && typeof parsed.error === 'string') {
            message = parsed.error;
          }
        } catch (parseError) {
          // Fallback to raw text.
        }
        throw new Error(message);
      }

      const data = await response.json();
      const recs = data.recommendations || data.results || [];
      const orgProfileFile = data.org_profile_file
        || data.org_profile_path
        || (typeof data.org_profile === 'string' ? data.org_profile : null);
      if (typeof orgProfileFile === 'string') {
        setOrgProfileFile(normalizeOrgProfileFilename(orgProfileFile) || '');
      }
      const orgProfileJson = data.organization_profile
        || data.processed_org_profile
        || data.org_profile_json
        || (data.org_profile && typeof data.org_profile === 'object' ? data.org_profile : null);
      if (orgProfileJson && typeof orgProfileJson === 'object') {
        setProcessedOrgProfileJson(orgProfileJson);
      }
      setRecommendations(recs);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: recs.length ? 'Here are the top matches based on your mission.' : 'No matches were returned. Try a more detailed mission statement.',
        }
      ]);
    } catch (err) {
      setError(err?.message || 'Failed to fetch recommendations.');
    } finally {
      if (TURNSTILE_SITE_KEY && window.turnstile && turnstileWidgetRef.current) {
        try {
          window.turnstile.reset(turnstileWidgetRef.current);
          turnstileTokenRef.current = '';
        } catch (err) {
          // Ignore reset errors.
        }
      }
      setIsLoading(false);
    }
  };

  const hasOrgProfile = Boolean(processedOrgProfileJson);

  return (
    <div className="container edg-chat">
      {error && (
        <div className="edg-error-overlay" role="alert" aria-live="assertive">
          <div className="edg-error-card">
            <p className="edg-error-title">Action needed</p>
            <p className="edg-error-message">{error}</p>
            <button type="button" className="edg-error-dismiss" onClick={() => setError('')}>
              Dismiss
            </button>
          </div>
        </div>
      )}
      <header className="edg-chat-hero">
        <div className="edg-chat-hero-content">
          <p className="edg-chat-kicker">EdGrantAI Live Recommendations</p>
          <h1 className="edg-chat-title">Mission to Recommendations</h1>
          <p className="edg-chat-subtitle">
            Describe your mission in plain language. This live demo currently targets NSF solicitations and related nonprofit
            STEM education work. The recommendation engine returns ranked grants, eligibility signals, and short explanations
            you can review with your team.
          </p>
          <div className="edg-chat-hero-actions">
            <Link to="/edgrantai" className="portfolio-button portfolio-button--secondary">
             Project Overview & Case Study
            </Link>
            <a
              className="portfolio-button portfolio-button--secondary"
              href="https://github.com/LINGUOREN369/EdGrantAI"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
            <Link to="/edgrantai-grants" className="portfolio-button portfolio-button--secondary">
              Current Grant Database
            </Link>
            <Link to="/edgrantai-taxonomy" className="portfolio-button portfolio-button--secondary">
              Current Taxonomy
            </Link>
            <Link to="/edgrantai-algorithm" className="portfolio-button portfolio-button--secondary">
              Matching Algorithm
            </Link>
          </div>
        </div>

      </header>

      <div className="edg-chat-grid">
        <section className="edg-chat-card" aria-labelledby="edg-chat-inputs">
          <h2 id="edg-chat-inputs" className="edg-chat-card-title">How to use this tool</h2>
          <ol className="edg-chat-steps">
            <li>Paste your organization profile or mission statement into the Mission statement field. (If you want an example, click Load example case.)</li>
            <li>Add an organization name so results are labeled clearly.</li>
            <li>Click Generate recommendations and wait a minute.</li>
            <li>After results load, review the ranked grants.</li>
            <li>JSON exports explain the output: Organization (JSON) shows the processed org profile (extracted phrases and tags), Match Report (JSON) shows scores, reasons, and the full ranked list. Each grant also links to Grant Info page and Grant Profile (JSON) (processed grant profile).</li>
          </ol>
          <form onSubmit={submitMission} className="edg-chat-form">
            <label className="edg-chat-label" htmlFor="org-name">Organization name</label>
            <input
              id="org-name"
              type="text"
              className="edg-chat-input"
              placeholder="Applied Learning & Teaching Lab (ALTL)"
              value={orgName}
              onChange={(event) => setOrgName(event.target.value)}
            />

            <label className="edg-chat-label" htmlFor="mission">Mission statement</label>
            <textarea
              id="mission"
              className="edg-chat-textarea"
              rows="6"
              placeholder="Core Program Areas: Teacher Professional Learning, Research-Practice Partnerships (RPPs), Curriculum & Instructional Materials, Broadening Participation..."
              value={mission}
              onChange={(event) => setMission(event.target.value)}
            />
            <div className={`edg-chat-counter${missionOverLimit ? ' edg-chat-counter--warn' : ''}`}>
              <span>
                {missionOverLimit
                  ? `Over limit by ${missionTokenOverage} tokens (~${missionWordOverage} words).`
                  : `Token cap: ${MAX_MISSION_TOKENS} (~${MAX_MISSION_WORDS} words). Token estimate uses ~${CHARS_PER_TOKEN} chars/token.`}
              </span>
              <span>{missionTokenEstimate}/{MAX_MISSION_TOKENS} tokens est | {missionWordCount}/{MAX_MISSION_WORDS} words</span>
            </div>

            <div className="edg-chat-actions">
              <button type="submit" className="portfolio-button" disabled={isLoading}>
                {isLoading ? 'Matching...' : 'Generate recommendations'}
              </button>
            </div>

            <div className="edg-chat-example edg-chat-advanced">
              <div className="edg-chat-example-header">
                <div>
                  <p className="edg-chat-example-title">Example case: Applied Learning & Teaching Lab (ALTL)</p>
                  <p className="edg-chat-example-subtitle">Use this organizational profile to test grant matching.</p>
                </div>
                <button
                  type="button"
                  className="portfolio-button portfolio-button--secondary"
                  onClick={loadExampleCase}
                >
                  Load example case
                </button>
              </div>
              <details className="edg-chat-example-details">
                <summary>View full profile text</summary>
                <pre className="edg-chat-example-text">{EXAMPLE_CASE_TEXT}</pre>
              </details>
            </div>

            {TURNSTILE_SITE_KEY && (
              <div className="edg-chat-turnstile">
                <div ref={turnstileRef} />
                <p className="edg-chat-hint">Protected by Cloudflare Turnstile.</p>
              </div>
            )}

          </form>
        </section>

        <section className="edg-chat-card edg-chat-feed" aria-live="polite">
          <div className="edg-chat-feed-header">
            <h2 className="edg-chat-card-title">Conversation</h2>
            <span className="edg-chat-status">{isLoading ? 'Analyzing' : 'Ready'}</span>
          </div>
          {recommendations.length > 0 && (
            <p className="edg-rec-note">
              JSON exports open raw data used by the recommendation engine: the processed organization profile and the full match report.
            </p>
          )}
          <div className="edg-chat-feed-body" ref={feedRef}>
            {messages.map((msg, idx) => (
              <div key={`${msg.role}-${idx}`} className={`edg-chat-bubble edg-chat-bubble--${msg.role}`}>
                {msg.role === 'user' && typeof msg.text === 'string' && msg.text.length > MAX_MESSAGE_PREVIEW ? (
                  <>
                    <p>{`${msg.text.slice(0, MAX_MESSAGE_PREVIEW).trim()}...`}</p>
                    <details className="edg-chat-message-details">
                      <summary>View full mission</summary>
                      <pre className="edg-chat-message-full">{msg.text}</pre>
                    </details>
                  </>
                ) : (
                  <p>{msg.text}</p>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="edg-chat-bubble edg-chat-bubble--assistant">
                <p>Working on the match... this usually takes 1-2 minutes.</p>
              </div>
            )}
            {recommendations.length > 0 && (
              <div className="edg-chat-recs">
                <div className="edg-rec-tools">
                  <div>
                    <p className="edg-rec-tools-title">JSON exports</p>
                    <p className="edg-rec-tools-subtitle">Organization profile and full match report.</p>
                  </div>
                  <div className="edg-rec-tools-actions">
                    <button
                      type="button"
                      className="edg-rec-action"
                      onClick={() => openJsonTab(processedOrgProfileJson)}
                      disabled={!hasOrgProfile}
                    >
                      Organization (JSON)
                    </button>
                    <button
                      type="button"
                      className="edg-rec-action"
                      onClick={() => openJsonTab(buildMatchReport())}
                    >
                      Match Report (JSON)
                    </button>
                  </div>
                </div>
                {recommendations.map((rec, idx) => {
                  const profileUrl = grantProfileUrl(rec);
                  const score = typeof rec.score === 'number' ? rec.score : null;
                  const showExplanation = idx < 3 || (score !== null && score >= 0.6);
                  return (
                    <article key={`${rec.grant_profile || rec.title}-${idx}`} className="edg-rec-card">
                      <header className="edg-rec-header">
                        <div>
                          <h3 className="edg-rec-title">{formatGrantName(rec)}</h3>
                          {rec.synopsis && <p className="edg-rec-synopsis">{rec.synopsis}</p>}
                        </div>
                        <div className="edg-rec-meta">
                          <span className={bucketClass(rec.bucket)}>{rec.bucket || 'Match'}</span>
                          <span className="edg-rec-score">{formatScore(rec.score)}</span>
                        </div>
                      </header>
                      <div className="edg-rec-details">
                        {rec.deadline ? (
                          <div><span>Deadline:</span> {rec.deadline}</div>
                        ) : (
                          <div><span>Deadline:</span> Needs human review</div>
                        )}
                        {rec.anticipated_funding_amount && (
                          <div><span>Funding:</span> {rec.anticipated_funding_amount}</div>
                        )}
                      </div>
                      {rec.reasons && Array.isArray(rec.reasons) && rec.reasons.length > 0 && (
                        <ul className="edg-rec-reasons">
                          {rec.reasons.map((reason, i) => (
                            <li key={`${reason}-${i}`}>{reason}</li>
                          ))}
                        </ul>
                      )}
                      {showExplanation && rec.explanation && (
                        <p className="edg-rec-explanation">{rec.explanation}</p>
                      )}
                      <div className="edg-rec-actions">
                        {rec.url && (
                          <a
                            href={rec.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="edg-rec-action"
                          >
                            Grant Info (NSF Site)
                          </a>
                        )}
                        <button
                          type="button"
                          className="edg-rec-action"
                          onClick={() => openUrl(profileUrl)}
                          disabled={!profileUrl}
                        >
                          Grant Profile (JSON)
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
