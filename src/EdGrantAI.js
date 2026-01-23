import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/EdGrantAI.css';

const navSections = [
  { id: 'overview', label: 'Executive overview' },
  { id: 'alignment', label: 'Alignment goals' },
  { id: 'system-structure', label: 'System structure' },
  { id: 'guardrails', label: 'Pipeline guardrails' },
  { id: 'security', label: 'API security' },
  { id: 'oversight', label: 'Human oversight' },
  { id: 'adoption', label: 'Adoption' },
  { id: 'summary', label: 'Summary' },
];

export default function EdGrantAI() {
  const structureImage = process.env.PUBLIC_URL + '/docs/edgrantai_structure.png';
  const workflowComparisonImage800 = process.env.PUBLIC_URL + '/docs/edgrant_traditional_genai_800.png';
  const workflowComparisonImage1600 = process.env.PUBLIC_URL + '/docs/edgrant_traditional_genai_1600.png';
  const workflowComparisonWebp800 = process.env.PUBLIC_URL + '/docs/edgrant_traditional_genai_800.webp';
  const workflowComparisonWebp1600 = process.env.PUBLIC_URL + '/docs/edgrant_traditional_genai_1600.webp';
  const [activeSection, setActiveSection] = useState(navSections[0]?.id || '');

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const sections = navSections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean);

    if (sections.length === 0) {
      return undefined;
    }

    if (!('IntersectionObserver' in window)) {
      setActiveSection(navSections[0]?.id || '');
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) {
          return;
        }
        const best = visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (best && best.target && best.target.id) {
          setActiveSection(best.target.id);
        }
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="container edg-container">
      <header className="edg-hero">
        <div className="edg-hero-grid">
          <div className="edg-hero-copy">
            <span className="edg-eyebrow">EdGantAI: Responsible AI Case Study</span>
            <h1 className="edg-title">EdGrantAI: Evidence-Bound AI for High-Stakes Nonprofit Decisions</h1>
            <p className="edg-subtitle">Evidence-gated decision support with guardrails, restraint, and human oversight</p>
            <div className="edg-cta">
              <a
                href="https://github.com/LINGUOREN369/EdGrantAI"
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-button edg-button-primary"
                aria-label="Open EdGrantAI on GitHub"
                title="View the EdGrantAI repository on GitHub"
              >
                <span className="github-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.701-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.607.069-.607 1.004.07 1.532 1.031 1.532 1.031.892 1.528 2.341 1.087 2.91.832.091-.647.35-1.087.636-1.337-2.22-.253-4.555-1.112-4.555-4.944 0-1.091.39-1.985 1.029-2.685-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.5.336c1.909-1.295 2.748-1.026 2.748-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.594 1.028 2.685 0 3.842-2.338 4.688-4.566 4.937.359.31.678.92.678 1.855 0 1.338-.012 2.417-.012 2.746 0 .267.18.579.688.48C19.138 20.162 22 16.417 22 12c0-5.523-4.477-10-10-10Z" clipRule="evenodd"/>
                  </svg>
                </span>
                <span>View on GitHub</span>
              </a>
              <Link
                to="/edgrantai-chat"
                className="portfolio-button portfolio-button--secondary"
                aria-label="Open EdGrantAI live recommendations chat"
              >
                Try Live Recommendations
              </Link>
              <Link
                to="/project"
                className="portfolio-button portfolio-button--secondary"
                aria-label="Back to project list"
              >
                Back to Projects
              </Link>
            </div>
            <div className="edg-pill-row">
              <span className="edg-pill">Evidence-bound</span>
              <span className="edg-pill">Transparent</span>
              <span className="edg-pill">Reproducible</span>
              <span className="edg-pill">Human oversight</span>
            </div>
          </div>

          <div className="edg-hero-panel edg-stagger">
            <div className="edg-card edg-card--accent edg-hero-card">
              <span className="edg-label">Executive snapshot</span>
              <p>
                For small education nonprofits, the grant landscape is often inequitable. Large institutions have dedicated teams to parse complex solicitation documents (RFPs), while smaller organizations rely on overworked staff who lose 10–100 hours on a single proposal depending on the size of the grant and often for grants they were never eligible for in the first place.
              </p>
              <p>
                EdGrantAI is a decision support system, not a one-click matcher. It acts as an evidence gate: it assigns tags only when the source text clearly supports them and stays silent when evidence is thin. The goal is to narrow scope so humans can focus.
              </p>
              <p>
                This case study shows how LLMs can be used responsibly when guardrails and explicit brakes prevent unexplainable hallucinations, making limits visible and keeping accountability with human decision-makers.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="edg-layout">
        <nav className="edg-side-nav" aria-label="EdGrantAI project overview">
          <div className="edg-side-title">Project overview</div>
          <ul className="edg-side-list">
            {navSections.map((section) => (
              <li key={section.id}>
                <a
                  className={`edg-side-link${activeSection === section.id ? ' is-active' : ''}`}
                  href={`#${section.id}`}
                  aria-current={activeSection === section.id ? 'location' : undefined}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="edg-main">
          <section className="edg-section edg-panel" id="overview">
            <div className="edg-section-header">
              <span className="edg-kicker">Executive overview</span>
              <h2 className="edg-h2">Case Study: Moving Beyond Generic Chatbots to Reliable Decision Support</h2>
            </div>
            <div className="edg-grid edg-grid-1 edg-stagger">
              <article className="edg-card">
                <p className="edg-label">The Inspiration: Why We Built This</p>
                <p>
                  Nonprofits exist in a high-stakes environment where time is the scarcest resource. Access to private funding is often relationship-driven
                  and invite-only. Public funding (for example, National Science Foundation) is open to all but buried under technical jargon, shifting
                  deadlines, and complex eligibility rules. Furthermore, federal agencies cannot legally recommend or rank grants for specific applicants.
                </p>
              </article>
            </div>
            <div className="edg-grid edg-grid-2 edg-stagger edg-overview-grid edg-overview-stack">
              <article className="edg-card">
                <p className="edg-label">We saw two major problems</p>
                <ol>
                  <li><strong>The Resource Gap:</strong> Small nonprofits cannot afford to manually scan thousands of pages of federal compliance documents.</li>
                  <li>
                    <strong>The AI Trap:</strong> When nonprofits turn to general AI tools (like standard ChatGPT) for help, the AI often hallucinates by
                    inventing grants that do not exist, misinterpreting deadlines, or providing generic advice that leads to rejection.
                  </li>
                </ol>
                <p className="edg-callout">
                  <strong>Our Vision:</strong> A decision-support tool that narrows the scope, shows its evidence, and leaves the final decision to people.
                </p>
              </article>
              <figure className="edg-card edg-comparison-figure">
                <p className="edg-label">Workflow comparison</p>
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`${workflowComparisonWebp800} 800w, ${workflowComparisonWebp1600} 1600w`}
                    sizes="(min-width: 900px) 46vw, 100vw"
                  />
                  <img
                    className="edg-comparison-image"
                    src={workflowComparisonImage800}
                    srcSet={`${workflowComparisonImage800} 800w, ${workflowComparisonImage1600} 1600w`}
                    sizes="(min-width: 900px) 46vw, 100vw"
                    width="800"
                    height="438"
                    alt="Workflow comparison showing traditional manual search, generic ChatGPT, and the structured EdGrantAI pipeline."
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </figure>
            </div>
          </section>

          <section className="edg-section" id="alignment">
            <div className="edg-section-header">
              <span className="edg-kicker">Alignment goals</span>
              <h2 className="edg-h2">Alignment Goals and Responsible AI Design</h2>
              <p className="edg-intro">
                Each goal maps directly to a design choice in the repo, so you can see how the evidence gate keeps the system conservative in practice.
              </p>
            </div>
            <div className="edg-pair-grid edg-stagger">
              <article className="edg-pair">
                <div className="edg-card">
                  <span className="edg-label">Alignment goal</span>
                  <h3 className="edg-card-title">Evidence-bound</h3>
                  <p>No invented facts or inferred eligibility.</p>
                </div>
                <div className="edg-pair-arrow" aria-hidden="true">-&gt;</div>
                <div className="edg-card">
                  <span className="edg-label">Design implementation</span>
                  <p>Evidence over creativity: tags appear only when they trace to extracted text and curated taxonomy terms.</p>
                </div>
              </article>
              <article className="edg-pair">
                <div className="edg-card">
                  <span className="edg-label">Alignment goal</span>
                  <h3 className="edg-card-title">Transparent and reproducible</h3>
                  <p>Outputs are traceable and repeatable across runs.</p>
                </div>
                <div className="edg-pair-arrow" aria-hidden="true">-&gt;</div>
                <div className="edg-card">
                  <span className="edg-label">Design implementation</span>
                  <p>Profiles include taxonomy version, confidence values, and evidence for every tag.</p>
                </div>
              </article>
              <article className="edg-pair">
                <div className="edg-card">
                  <span className="edg-label">Alignment goal</span>
                  <h3 className="edg-card-title">Conservative in ambiguity</h3>
                  <p>Prefer "unknown" over guess when evidence is thin.</p>
                </div>
                <div className="edg-pair-arrow" aria-hidden="true">-&gt;</div>
                <div className="edg-card">
                  <span className="edg-label">Design implementation</span>
                  <p>Strict thresholds and guarded embedding fallback keep weak matches from surfacing, so silence is the correct output when evidence is thin.</p>
                </div>
              </article>
              <article className="edg-pair">
                <div className="edg-card">
                  <span className="edg-label">Alignment goal</span>
                  <h3 className="edg-card-title">Data minimization</h3>
                  <p>Limit what the system stores and exposes.</p>
                </div>
                <div className="edg-pair-arrow" aria-hidden="true">-&gt;</div>
                <div className="edg-card">
                  <span className="edg-label">Design implementation</span>
                  <p>Raw embeddings are not stored in profiles; reports include only necessary metadata.</p>
                </div>
              </article>
              <article className="edg-pair">
                <div className="edg-card">
                  <span className="edg-label">Alignment goal</span>
                  <h3 className="edg-card-title">Human oversight</h3>
                  <p>Final decisions stay with people, not models.</p>
                </div>
                <div className="edg-pair-arrow" aria-hidden="true">-&gt;</div>
                <div className="edg-card">
                  <span className="edg-label">Design implementation</span>
                  <p>Humans curate taxonomy, synonyms, and thresholds, and decide whether to apply.</p>
                </div>
              </article>
            </div>
            <div className="edg-card edg-card--accent edg-card--spaced edg-stagger">
              <span className="edg-label edg-label--roomy">Responsible decision-support principle</span>
              <h3 className="edg-card-title">Decision support as an evidence gate</h3>
              <p>
                In a responsible AI context, the goal is not to label everything. EdGrantAI uses LLMs to assist, but the gate is strict:
                it assigns tags only when there is clear, traceable support in the source text and stays silent when evidence is thin or ambiguous.
              </p>
              <p>
                This restraint is intentional: each tag implies a judgment, and in high-stakes work that can shift
                accountability to the system. Sparse output is a design choice that makes limits visible, reduces automation bias,
                and keeps responsibility with people.
              </p>
            </div>
          </section>

          <section className="edg-section edg-panel" id="system-structure">
            <div className="edg-section-header">
              <span className="edg-kicker">System structure</span>
              <h2 className="edg-h2">System Structure</h2>
            </div>
            <div className="edg-structure-grid edg-stagger">
              <div className="edg-card edg-structure-copy">
                <p className="edg-label">How to read it</p>
                <p>
                  This structure is an evidence chain: every recommendation can be traced back to exact language in the source documents. It starts with
                  controlled keyphrase extraction to keep outputs verbatim, then normalizes wording through a shared taxonomy so different documents can
                  be compared consistently over time.
                </p>
                <p>
                  The profile builder stores only supported tags with their source snippets. The decision-support stage compares only those supported
                  tags and ignores anything below confidence thresholds. Explanations are optional and come last, only after the gate clears.
                </p>
                <p>
                  In short, the structure exists to prevent overreach, make uncertainty visible, and keep humans in control of final decisions.
                </p>
              </div>
              <figure className="edg-card edg-structure-figure">
                <img
                  className="edg-structure-image"
                  src={structureImage}
                  alt="EdGrantAI system structure from organization and grant text through keyphrase extraction, mapping, profiling, evidence-gated scoring, and recommendations."
                  loading="lazy"
                />
              </figure>
            </div>
          </section>

          <section className="edg-section edg-panel" id="guardrails">
            <div className="edg-section-header">
              <span className="edg-kicker">Pipeline guardrails</span>
              <h2 className="edg-h2">Guardrails and Ethics by Pipeline Stage</h2>
            </div>
            <div className="edg-timeline">
              <article className="edg-step">
                <div className="edg-step-index">1</div>
                <div className="edg-step-body edg-card">
                  <h3 className="edg-card-title">Extraction (Controlled Keyphrase Extractor)</h3>
                  <div className="edg-step-grid">
                    <div className="edg-step-block">
                      <span className="edg-label">Alignment choices</span>
                      <ul>
                        <li>Extracts verbatim phrases only; no summarization or paraphrase.</li>
                        <li>Output must be a strict JSON array; invalid output is rejected.</li>
                        <li>Deadlines and award amounts are handled by deterministic parsing, not the LLM.</li>
                      </ul>
                    </div>
                    <div className="edg-step-block">
                      <span className="edg-label">Guardrails</span>
                      <ul>
                        <li>Rejects outputs that are not valid JSON.</li>
                        <li>Only accepts phrases found in the source text.</li>
                        <li>Deterministic parsers override model guesses for dates and funding.</li>
                      </ul>
                    </div>
                    <div className="edg-step-block">
                      <span className="edg-label">Why it matters</span>
                      <ul>
                        <li>Prevents hallucinated facts or invented deadlines.</li>
                        <li>Keeps the system grounded in source evidence.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </article>

              <article className="edg-step">
                <div className="edg-step-index">2</div>
                <div className="edg-step-body edg-card">
                  <h3 className="edg-card-title">Mapping (Dictionary to Guardrails to Embeddings)</h3>
                  <div className="edg-step-grid">
                    <div className="edg-step-block">
                      <span className="edg-label">Alignment choices</span>
                      <ul>
                        <li>Dictionary-first mapping for high-precision terms and synonyms.</li>
                        <li>Embedding fallback is used only when dictionary mapping fails.</li>
                        <li>Section provenance restricts what can map to mission or red flags.</li>
                        <li>Guardrails prevent common failure modes.</li>
                      </ul>
                    </div>
                    <div className="edg-step-block">
                      <span className="edg-label">Guardrails</span>
                      <ul>
                        <li>Audience phrases cannot create organization type tags.</li>
                        <li>Red flags require gating terms and, for grants, the Eligibility section.</li>
                        <li>Mechanism acronyms (REU, CAREER, etc.) cannot become mission tags.</li>
                      </ul>
                    </div>
                    <div className="edg-step-block">
                      <span className="edg-label">Why it matters</span>
                      <ul>
                        <li>Avoids false eligibility claims.</li>
                        <li>Prevents misclassification that could waste staff time.</li>
                        <li>Constrains semantic similarity to safe, interpretable outcomes.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </article>

              <article className="edg-step">
                <div className="edg-step-index">3</div>
                <div className="edg-step-body edg-card">
                  <h3 className="edg-card-title">Profile Building</h3>
                  <div className="edg-step-grid">
                    <div className="edg-step-block">
                      <span className="edg-label">Alignment choices</span>
                      <ul>
                        <li>Profiles store evidence (source_text and sources) for every tag.</li>
                        <li>Raw embeddings are not stored (data minimization).</li>
                        <li>Taxonomy version and timestamps are recorded for auditability.</li>
                        <li>Organization profiles apply stricter rules for precision.</li>
                      </ul>
                    </div>
                    <div className="edg-step-block">
                      <span className="edg-label">Guardrails</span>
                      <ul>
                        <li>Geography must be explicit or derived from a named state.</li>
                        <li>Grade-band tags are not inferred from generic "K-12."</li>
                        <li>Red flags require multiple mentions and higher thresholds.</li>
                      </ul>
                    </div>
                    <div className="edg-step-block">
                      <span className="edg-label">Why it matters</span>
                      <ul>
                        <li>Maintains a clear audit trail.</li>
                        <li>Limits sensitive or unstable data in storage.</li>
                        <li>Reduces the chance of wrongful ineligibility or false positives.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </article>

              <article className="edg-step">
                <div className="edg-step-index">4</div>
                <div className="edg-step-body edg-card">
                  <h3 className="edg-card-title">Decision Support and Recommendations</h3>
                  <div className="edg-step-grid">
                    <div className="edg-step-block">
                      <span className="edg-label">Alignment choices</span>
                      <ul>
                        <li>Evidence-gated scoring runs only on supported tags; weak tags are dropped before scoring.</li>
                        <li>Confidence-weighted, symmetric overlap prevents over-tagging and tag-count bias.</li>
                        <li>Red flags can hard-block if eligibility is unmet.</li>
                        <li>Explanation generation is gated (top-K or minimum score).</li>
                        <li>Deadline and funding extraction are re-checked against source text.</li>
                        <li>Similarity scoring is restricted to mission/population; org type and geography require exact match.</li>
                      </ul>
                    </div>
                    <div className="edg-step-block">
                      <span className="edg-label">Guardrails</span>
                      <ul>
                        <li>Eligibility red flags can override otherwise strong matches.</li>
                        <li>Scores must cross a threshold before explanations appear.</li>
                        <li>Deterministic checks validate deadlines and amounts.</li>
                        <li>Confidence values are clamped; duplicates keep the highest score.</li>
                      </ul>
                    </div>
                    <div className="edg-step-block">
                      <span className="edg-label">Why it matters</span>
                      <ul>
                        <li>Prevents overconfident recommendations and keeps silence when evidence is weak.</li>
                        <li>Adds safety rails around eligibility and deadlines.</li>
                        <li>Keeps explanations concise and grounded.</li>
                        <li>Stops tag spam from inflating match scores.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </article>

            </div>
          </section>

          <section className="edg-section edg-panel" id="security">
            <div className="edg-section-header">
              <span className="edg-kicker">Security</span>
              <h2 className="edg-h2">API Security Overview</h2>
              <p className="edg-intro">
                This section explains how the EdGrantAI chat endpoint is protected end-to-end, from the browser to the decision-support backend.
              </p>
            </div>
            <div className="edg-security-grid edg-stagger">
              <article className="edg-card edg-card--accent edg-security-flow">
                <span className="edg-label">Request flow</span>
                <ol className="edg-flow-list">
                  <li>User submits a mission in the browser.</li>
                  <li>Turnstile runs in the browser and returns a short-lived token.</li>
                  <li>Browser sends mission + Turnstile token to the edge gateway.</li>
                  <li>Edge gateway validates origin, Turnstile token, and rate limits the client.</li>
                  <li>Edge gateway injects a server-side API token and forwards to the backend.</li>
                  <li>Backend validates the token and uses a server-only LLM API key for decision support.</li>
                  <li>Recommendations flow back to the browser.</li>
                </ol>
              </article>
              <article className="edg-card edg-card--soft">
                <span className="edg-label">Components</span>
                <ul className="edg-security-list">
                  <li>
                    <span className="edg-security-term">Frontend</span>
                    <span className="edg-security-detail">EdGrantAI Chat (browser)</span>
                  </li>
                  <li>
                    <span className="edg-security-term">Edge gateway</span>
                    <span className="edg-security-detail">Cloudflare Worker</span>
                  </li>
                  <li>
                    <span className="edg-security-term">Decision-support backend</span>
                    <span className="edg-security-detail">Render API</span>
                  </li>
                </ul>
              </article>
              <article className="edg-card edg-card--soft">
                <span className="edg-label">Secrets and where they live</span>
                <ul className="edg-security-list">
                  <li>
                    <span className="edg-security-term">LLM API key</span>
                    <span className="edg-security-detail">Backend only</span>
                  </li>
                  <li>
                    <span className="edg-security-term">Server-side API token</span>
                    <span className="edg-security-detail">Edge gateway + backend only</span>
                  </li>
                  <li>
                    <span className="edg-security-term">Turnstile secret key</span>
                    <span className="edg-security-detail">Edge gateway only</span>
                  </li>
                  <li>
                    <span className="edg-security-term">Turnstile site key</span>
                    <span className="edg-security-detail">Frontend (public by design)</span>
                  </li>
                </ul>
              </article>
              <article className="edg-card edg-card--soft">
                <span className="edg-label">Protections in place</span>
                <ul className="edg-check-list">
                  <li>Origin allowlist: only first-party domains are accepted.</li>
                  <li>Turnstile verification: blocks spoofed requests without a valid browser token.</li>
                  <li>Rate limiting: throttles abusive traffic per IP.</li>
                  <li>Backend auth: accepts only requests with a valid server-side token.</li>
                </ul>
              </article>
            </div>
          </section>

          <section className="edg-section edg-panel" id="oversight">
            <div className="edg-section-header">
              <span className="edg-kicker">Oversight</span>
              <h2 className="edg-h2">Human Role (Required, Not Optional)</h2>
              <p className="edg-intro">Oversight is structured into three human checkpoints: define, calibrate, and decide.</p>
            </div>
            <div className="edg-phase-grid edg-stagger">
              <article className="edg-card">
                <p className="edg-label">Define</p>
                <h3 className="edg-card-title">What the system knows</h3>
                <ul>
                  <li>Curate taxonomy content, synonyms, and red flags.</li>
                  <li>Select source documents and organization profiles.</li>
                  <li>Set scope boundaries for what the system can and cannot infer.</li>
                </ul>
              </article>
              <article className="edg-card">
                <p className="edg-label">Calibrate</p>
                <h3 className="edg-card-title">How the engine behaves</h3>
                <ul>
                  <li>Choose thresholds, weights, and stoplists.</li>
                  <li>Approve guardrails and explanation gating rules.</li>
                  <li>Tune for precision vs recall based on risk tolerance.</li>
                </ul>
              </article>
              <article className="edg-card">
                <p className="edg-label">Decide</p>
                <h3 className="edg-card-title">How outputs are used</h3>
                <ul>
                  <li>Make final Apply / Maybe / Avoid decisions.</li>
                  <li>Review high-stakes matches before submission.</li>
                  <li>Track outcomes and run error analysis.</li>
                </ul>
              </article>
            </div>
            <div className="edg-card edg-card--accent edg-card--centered edg-oversight-callout edg-stagger">
              <p className="edg-judgment">The system provides evidence and ranking, but does not replace judgment.</p>
            </div>

            <div className="edg-section-header edg-section-header--tight">
              <h2 className="edg-h2">Alignment, Ethics Risks, and Mitigations</h2>
            </div>
            <div className="edg-risk-grid edg-stagger">
              <article className="edg-card">
                <h3 className="edg-card-title">Potential Risk: False Eligibility Recommendation</h3>
                <span className="edg-label">Mitigations</span>
                <ul>
                  <li>Hard-block rules for eligibility red flags</li>
                  <li>Guardrails and strict thresholds</li>
                  <li>Manual review of high-stakes submissions</li>
                </ul>
              </article>
              <article className="edg-card">
                <h3 className="edg-card-title">Potential Risk: Biased or Incomplete Taxonomy</h3>
                <span className="edg-label">Mitigations</span>
                <ul>
                  <li>Human curation and change review</li>
                  <li>Versioning for reproducibility</li>
                  <li>Evaluation on real-world outcomes</li>
                </ul>
              </article>
              <article className="edg-card">
                <h3 className="edg-card-title">Potential Risk: Data Drift in Source Documents</h3>
                <span className="edg-label">Mitigations</span>
                <ul>
                  <li>CSV refresh pipeline and reprocessing</li>
                  <li>Explicit source URLs in profiles</li>
                </ul>
              </article>
              <article className="edg-card">
                <h3 className="edg-card-title">Potential Risk: Over-Reliance on AI Explanations</h3>
                <span className="edg-label">Mitigations</span>
                <ul>
                  <li>Explanation gating</li>
                  <li>Evidence linked to tags and reasons</li>
                  <li>Clear separation of explanation vs decision</li>
                </ul>
              </article>
            </div>
          </section>

          <section className="edg-section" id="adoption">
            <div className="edg-section-header">
              <span className="edg-kicker">Adoption</span>
              <h2 className="edg-h2">How This Can Inspire Other Nonprofits</h2>
              <p className="edg-intro">
                One set of lessons applies to any generative AI tool build. The second shows how teams can adapt this open-source pipeline to other
                funders beyond NSF.
              </p>
            </div>
            <div className="edg-grid edg-grid-2 edg-stagger">
              <article className="edg-card edg-card--soft">
                <h3 className="edg-card-title">General recommendations for AI-assisted tools</h3>
                <ol>
                  <li>Start with a narrow, high-impact workflow where time loss is measurable (e.g., grant triage).</li>
                  <li>Ground every output in evidence before any model reasoning or similarity.</li>
                  <li>Add guardrails early to block hallucinations and false eligibility.</li>
                  <li>Keep outputs auditable with a trace from evidence to tag to score.</li>
                  <li>Make human judgment the final checkpoint, not the model.</li>
                  <li>Measure real impact: time saved, reduced rejections, and quality of matches.</li>
                  <li>Protect AI endpoints like public APIs: keep keys server-side, enforce origin checks and rate limits, and require human verification to deter abuse.</li>
                </ol>
              </article>
              <article className="edg-card edg-card--soft">
                <h3 className="edg-card-title">Adapting EdGrantAI for other funders</h3>
                <ol>
                  <li>Swap in DOE, NIH, or foundation solicitations as source documents.</li>
                  <li>Extend the taxonomy with domain-specific mission and population tags.</li>
                  <li>Curate synonyms and red flags that reflect new eligibility rules.</li>
                  <li>Reweight scoring to match each funder’s priorities and risk profile.</li>
                  <li>Load your organization database so profiles reflect local context.</li>
                  <li>Validate on past awards before rolling into live decisions.</li>
                </ol>
              </article>
            </div>
          </section>
 
          <section className="edg-section" id="summary">
            <div className="edg-summary">
              <h2 className="edg-h2">Summary</h2>
              <p>
                EdGrantAI is not a general chatbot. It is a decision-support evidence gate that stays silent when support is weak, backed by explicit
                guardrails and human oversight. That combination makes it safer, more transparent, and more useful in nonprofit decision workflows.
              </p>
            </div>
          </section>
        </div>
      </div>

      <footer className="edg-footer">
        <Link to="/" className="portfolio-button" aria-label="Back to home">Back Home</Link>
        <Link to="/project" className="portfolio-button" aria-label="View portfolio projects">View Projects</Link>
        <a
          href="https://github.com/LINGUOREN369/EdGrantAI"
          target="_blank"
          rel="noopener noreferrer"
          className="portfolio-button"
          aria-label="Open EdGrantAI on GitHub"
        >
          GitHub Repo
        </a>
      </footer>
    </div>
  );
}
