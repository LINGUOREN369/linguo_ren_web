import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/EdGrantAIChat.css';

const API_ENDPOINT = process.env.REACT_APP_EDGRANT_API_URL
  || 'https://edgrantai-proxy.lren-31b.workers.dev/recommend';
const TURNSTILE_SITE_KEY = process.env.REACT_APP_TURNSTILE_SITE_KEY
  || '0x4AAAAAACK9_1Q5N9HOGc3h';
const EXAMPLE_CASE_ORG = 'Utopia Math & Science Association (UMSA)';
const EXAMPLE_CASE_TEXT = `Utopia Math & Science Association -- Organizational Profile (For Grant-Matching Test)

The Utopia Math & Science Association (UMSA) is a nonprofit STEM education organization dedicated to improving how science, technology, engineering, and mathematics are taught and experienced by learners across diverse communities. Founded in 2004 with early support from regional education funders and national STEM initiatives, UMSA has grown into a recognized leader in designing innovative STEM learning models, strengthening educator capacity, and advancing research-informed improvements in STEM instruction.

Since its founding, UMSA has received more than $18 million in grants and philanthropic funding to support its work. The organization collaborates with K-12 schools, school districts, state and local agencies, higher education institutions, and national partners to expand access to high-quality STEM learning opportunities and to scale effective instructional practices.

UMSA's mission is to inspire meaningful and engaging STEM learning experiences so that all youth--regardless of background, geography, or circumstance--can become the innovators, problem-solvers, and contributors of tomorrow's workforce and civic life.

UMSA's work spans three interconnected strategic functions. First, the organization designs and delivers high-quality STEM professional development for educators, supporting teachers in implementing inquiry-based, student-centered instruction and building confidence and pedagogical skill across K-12 classrooms. Second, UMSA conducts research and evaluation focused on STEM learning experiences, assessing education initiatives to identify effective models and translating findings into actionable insights for educators, schools, and education systems. Third, UMSA prioritizes relationship and network building by fostering partnerships at the local, regional, and national levels, developing educator networks that sustain long-term STEM improvement, and supporting community-based and rural STEM engagement efforts.

UMSA was established as a 501(c)(3) nonprofit organization in 2004 and has steadily expanded its reach through multi-year professional learning initiatives, applied research projects, and cross-sector STEM collaborations. Over the past two decades, the organization has built a strong reputation for combining practical educator support with evidence-informed research and systems-level impact.

Equity and accessibility are central to UMSA's approach. The organization is committed to ensuring that all students--particularly those in rural, underserved, or historically marginalized communities--have meaningful opportunities to engage in high-quality STEM learning. UMSA integrates principles of diversity, equity, inclusion, and accessibility (DEIA) into its programs, partnerships, and organizational decision-making.

For grant-matching and testing purposes, UMSA seeks funding to scale educator training, expand STEM access in rural and underserved communities, and strengthen research and evaluation efforts that support systemic improvement in STEM education. Grant funding would enable the organization to develop new research-backed professional development programs, refine and evaluate STEM teaching models, expand regional and statewide educator networks, and disseminate tools, findings, and best practices.

In summary, UMSA requests funding to expand research-backed STEM professional development for K-12 educators, with a targeted focus on rural and underserved communities. Grant support will allow UMSA to design and deliver inquiry-based training, provide sustained coaching and evaluation, and strengthen educator networks that translate evidence-based practices into classroom implementation. By pairing high-quality professional learning with applied research and dissemination, this investment will increase educator capacity, improve STEM instruction at scale, and ensure that students--regardless of geography or background--gain equitable access to engaging, high-impact STEM learning experiences.`;

const formatGrantName = (rec) => {
  const raw = rec.title || rec.name || rec.program || rec.grant_profile || 'Grant';
  if (typeof raw !== 'string') return 'Grant';
  return raw.replace('_profile.json', '').replace(/_/g, ' ').trim();
};

const formatScore = (score) => {
  if (typeof score !== 'number' || Number.isNaN(score)) return 'N/A';
  return `${Math.round(score * 100)}%`;
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
  const [submittedMission, setSubmittedMission] = useState('');
  const [submittedOrgName, setSubmittedOrgName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
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

  const buildOrgProfile = () => ({
    org_name: submittedOrgName || null,
    mission: submittedMission,
  });

  const buildMatchReport = () => ({
    generated_at: new Date().toISOString(),
    organization: buildOrgProfile(),
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
    const trimmed = mission.trim();
    if (!trimmed) {
      setError('Please enter a mission statement.');
      return;
    }
    if (!API_ENDPOINT) {
      setError('API endpoint not configured.');
      return;
    }
    setError('');
    setIsLoading(true);
    setRecommendations([]);
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setSubmittedMission(trimmed);
    setSubmittedOrgName(orgName.trim());
    setMission('');

    try {
      const payload = { mission: trimmed };
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
        throw new Error(text || 'Request failed');
      }

      const data = await response.json();
      const recs = data.recommendations || data.results || [];
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

  return (
    <div className="container edg-chat">
      <header className="edg-chat-hero">
        <div className="edg-chat-hero-content">
          <p className="edg-chat-kicker">EdGrantAI Live Matcher</p>
          <h1 className="edg-chat-title">Mission to Recommendations</h1>
          <p className="edg-chat-subtitle">
            Describe your mission in plain language. The matcher returns ranked grants, eligibility signals,
            and short explanations you can review with your team.
          </p>
          <div className="edg-chat-hero-actions">
            <Link to="/edgrantai" className="portfolio-button portfolio-button--secondary">
              View the case study
            </Link>
            <a
              className="portfolio-button"
              href="https://github.com/LINGUOREN369/EdGrantAI"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open the repo
            </a>
          </div>
        </div>
        <div className="edg-chat-hero-panel">
          <div className="edg-chat-hero-pill">Evidence-bound</div>
          <div className="edg-chat-hero-pill">Transparent scoring</div>
          <div className="edg-chat-hero-pill">Human-in-the-loop</div>
        </div>
      </header>

      <div className="edg-chat-grid">
        <section className="edg-chat-card" aria-labelledby="edg-chat-inputs">
          <h2 id="edg-chat-inputs" className="edg-chat-card-title">Enter your mission</h2>
          <p className="edg-chat-card-subtitle">Add an organization name if you want it echoed in the response.</p>
          <form onSubmit={submitMission} className="edg-chat-form">
            <label className="edg-chat-label" htmlFor="org-name">Organization name (optional)</label>
            <input
              id="org-name"
              type="text"
              className="edg-chat-input"
              placeholder="Utopia Math & Science Association"
              value={orgName}
              onChange={(event) => setOrgName(event.target.value)}
            />

            <label className="edg-chat-label" htmlFor="mission">Mission statement</label>
            <textarea
              id="mission"
              className="edg-chat-textarea"
              rows="6"
              placeholder="The Utopia Math & Science Association (UMSA) is a nonprofit STEM education organization dedicated to improving how science, technology, engineering, and mathematics are taught and experienced by learners across diverse communities..."
              value={mission}
              onChange={(event) => setMission(event.target.value)}
            />

            <div className="edg-chat-actions">
              <button type="submit" className="portfolio-button" disabled={isLoading}>
                {isLoading ? 'Matching...' : 'Generate recommendations'}
              </button>
            </div>

            <div className="edg-chat-example edg-chat-advanced">
              <div className="edg-chat-example-header">
                <div>
                  <p className="edg-chat-example-title">Example case: Utopia Math & Science Association</p>
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

            {error && <div className="edg-chat-error">{error}</div>}
            <p className="edg-chat-note">
              This page only sends your mission text to the EdGrantAI matcher. It does not store keys in the browser.
            </p>
          </form>
        </section>

        <section className="edg-chat-card edg-chat-feed" aria-live="polite">
          <div className="edg-chat-feed-header">
            <h2 className="edg-chat-card-title">Conversation</h2>
            <span className="edg-chat-status">{isLoading ? 'Analyzing' : 'Ready'}</span>
          </div>
          <div className="edg-chat-feed-body" ref={feedRef}>
            {messages.map((msg, idx) => (
              <div key={`${msg.role}-${idx}`} className={`edg-chat-bubble edg-chat-bubble--${msg.role}`}>
                <p>{msg.text}</p>
              </div>
            ))}
            {isLoading && (
              <div className="edg-chat-bubble edg-chat-bubble--assistant">
                <p>Working on the match... this usually takes a few seconds.</p>
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
                      onClick={() => openJsonTab(buildOrgProfile())}
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
                {recommendations.map((rec, idx) => (
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
                      {rec.deadline && <div><span>Deadline:</span> {rec.deadline}</div>}
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
                    {rec.explanation && <p className="edg-rec-explanation">{rec.explanation}</p>}
                    <div className="edg-rec-actions">
                      {rec.url && (
                        <a
                          href={rec.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="edg-rec-action"
                        >
                          Grant Info...
                        </a>
                      )}
                      <button
                        type="button"
                        className="edg-rec-action"
                        onClick={() => openJsonTab(rec)}
                      >
                        Grant Profile (JSON)
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
