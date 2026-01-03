import React from 'react';
import { Link } from 'react-router-dom';
import './styles/EdGrantAI.css';

export default function EdGrantAI() {
  return (
    <div className="container edg-container">
      <header className="edg-hero">
        <div className="edg-hero-grid">
          <div className="edg-hero-copy">
            <span className="edg-eyebrow">EdGantAI: Responsible AI Case Study</span>
            <h1 className="edg-title">EdGantAI: Responsible AI, Alignment, and Human Oversight</h1>
            <p className="edg-subtitle">Moving Beyond Generic Chatbots to Reliable Decision Support</p>
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
                EdGrantAI was built to solve this specific problem. It is an evidence-bound decision engine that converts complex NSF solicitations into clear, actionable intelligence. This case study illustrates how nonprofits can move beyond "playing with ChatGPT" to building specialized, transparent tools that solve mission-critical problems.
              </p>
              <div className="edg-stat">
                <span className="edg-stat-value">10-100</span>
                <span className="edg-stat-label">hours lost on a single proposal for small nonprofits</span>
              </div>
            </div>
          </div>
        </div>
      </header>

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
            <div className="edg-divider"></div>
            <p className="edg-label">We saw two major problems</p>
            <ol>
              <li><strong>The Resource Gap:</strong> Small nonprofits cannot afford to manually scan thousands of pages of federal compliance documents.</li>
              <li>
                <strong>The AI Trap:</strong> When nonprofits turn to general AI tools (like standard ChatGPT) for help, the AI often hallucinates by
                inventing grants that do not exist, misinterpreting deadlines, or providing generic advice that leads to rejection.
              </li>
            </ol>
            <p className="edg-callout">
              <strong>Our Vision:</strong> A tool that acts as a digital "Grant Officer" - one that does not sleep, does not guess, and shows its work for
              every recommendation.
            </p>
          </article>
        </div>
      </section>

      <section className="edg-section" id="alignment">
        <div className="edg-section-header">
          <span className="edg-kicker">Alignment goals</span>
          <h2 className="edg-h2">Alignment Goals (System Level)</h2>
          <p className="edg-intro">These goals show up as concrete controls in extraction, mapping, profile building, and matching.</p>
        </div>
        <ul className="edg-pillar-grid edg-stagger">
          <li className="edg-card edg-pillar">Evidence-bound (no invented facts)</li>
          <li className="edg-card edg-pillar">Transparent (traceable outputs and clear scoring)</li>
          <li className="edg-card edg-pillar">Reproducible (versioned taxonomy and deterministic parsing)</li>
          <li className="edg-card edg-pillar">Conservative in ambiguity (prefers "unknown" over guess)</li>
        </ul>
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
                    <li>Deadlines are handled by deterministic parsing, not the LLM.</li>
                  </ul>
                </div>
                <div className="edg-step-block">
                  <span className="edg-label">Why it matters</span>
                  <ul>
                    <li>Prevents hallucinated facts or invented deadlines.</li>
                    <li>Keeps the system grounded in source evidence.</li>
                  </ul>
                </div>
                <div className="edg-step-block">
                  <span className="edg-label">Code references</span>
                  <ul className="edg-code-list">
                    <li><code>extraction/cke.py</code></li>
                    <li><code>extraction/deadline_extractor.py</code></li>
                    <li><code>extraction/section_utils.py</code></li>
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
                    <li>Embedding fallback is used only when dictionary matching fails.</li>
                    <li>Section provenance restricts what can map to mission or red flags.</li>
                    <li>Guardrails prevent common failure modes.</li>
                  </ul>
                </div>
                <div className="edg-step-block">
                  <span className="edg-label">Guardrails include</span>
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
                <div className="edg-step-block">
                  <span className="edg-label">Code references</span>
                  <ul className="edg-code-list">
                    <li><code>mapping/canonical_mapper.py</code></li>
                    <li><code>mapping/embedding_matcher.py</code></li>
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
                  <span className="edg-label">Organization profile rules</span>
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
                <div className="edg-step-block">
                  <span className="edg-label">Code references</span>
                  <ul className="edg-code-list">
                    <li><code>mapping/grant_profile_builder.py</code></li>
                    <li><code>mapping/org_profile_builder.py</code></li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

          <article className="edg-step">
            <div className="edg-step-index">4</div>
            <div className="edg-step-body edg-card">
              <h3 className="edg-card-title">Matching and Recommendations</h3>
              <div className="edg-step-grid">
                <div className="edg-step-block">
                  <span className="edg-label">Alignment choices</span>
                  <ul>
                    <li>Confidence-weighted, symmetric overlap avoids bias from tag count.</li>
                    <li>Red flags can hard-block if eligibility is unmet.</li>
                    <li>Explanation generation is gated (top-K or minimum score).</li>
                    <li>Deadline and funding extraction are re-checked against source text.</li>
                  </ul>
                </div>
                <div className="edg-step-block">
                  <span className="edg-label">Why it matters</span>
                  <ul>
                    <li>Prevents overconfident recommendations.</li>
                    <li>Adds safety rails around eligibility and deadlines.</li>
                    <li>Keeps explanations concise and grounded.</li>
                  </ul>
                </div>
                <div className="edg-step-block">
                  <span className="edg-label">Code references</span>
                  <ul className="edg-code-list">
                    <li><code>matching/matching_engine.py</code></li>
                  </ul>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="edg-section" id="principles">
        <div className="edg-section-header">
          <span className="edg-kicker">Responsible AI</span>
          <h2 className="edg-h2">Responsible AI Design Principles in This Repo</h2>
        </div>
        <ol className="edg-principles edg-stagger">
          <li className="edg-card edg-principle">
            Evidence over creativity: everything traces to extracted text and curated taxonomy tags.
          </li>
          <li className="edg-card edg-principle">
            Transparency and reproducibility: profiles include taxonomy version, confidence values, and evidence.
          </li>
          <li className="edg-card edg-principle">
            Conservative defaults: strict thresholds and guarded embedding fallback; "unknown" is acceptable when evidence is missing.
          </li>
          <li className="edg-card edg-principle">
            Data minimization: raw embeddings are not stored in profiles; reports include only necessary metadata.
          </li>
          <li className="edg-card edg-principle">
            Human-in-the-loop control: humans curate the taxonomy, synonyms, and thresholds, and decide whether to apply.
          </li>
        </ol>
      </section>

      <section className="edg-section edg-panel" id="oversight">
        <div className="edg-section-header">
          <span className="edg-kicker">Oversight</span>
          <h2 className="edg-h2">Human Role (Required, Not Optional)</h2>
        </div>
        <div className="edg-grid edg-grid-2 edg-stagger">
          <div className="edg-card">
            <p className="edg-label">Humans control</p>
            <ul className="edg-two-col-list">
              <li>Taxonomy content and synonyms (precision and scope)</li>
              <li>Thresholds, weights, and stoplists</li>
              <li>Source data quality and refresh cadence</li>
              <li>Final "Apply / Maybe / Avoid" decisions</li>
              <li>Evaluation and error analysis</li>
            </ul>
          </div>
          <div className="edg-card edg-card--accent edg-card--centered">
            <p className="edg-judgment">The system provides evidence and ranking, but does not replace judgment.</p>
          </div>
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
        </div>
        <div className="edg-card edg-card--soft">
          <p className="edg-label">Key takeaways for production tools</p>
          <ol>
            <li>Start with a narrow, high-impact workflow - pick one task where time loss is measurable (e.g., grant triage).</li>
            <li>Build an evidence-first pipeline - extract verbatim evidence before using embeddings or LLMs.</li>
            <li>Add guardrails early - prevent common errors before they reach users.</li>
            <li>Make outputs auditable - show the chain from evidence to tag to score to recommendation.</li>
            <li>Keep humans in control - the tool should surface options, not decide outcomes.</li>
            <li>Measure real impact - track time saved, reduction in wasted proposals, and quality of matches.</li>
          </ol>
        </div>
      </section>

      <section className="edg-section edg-panel" id="adoption-path">
        <div className="edg-section-header">
          <span className="edg-kicker">Implementation path</span>
          <h2 className="edg-h2">Practical Adoption Path for Nonprofits</h2>
        </div>
        <div className="edg-phase-grid edg-stagger">
          <article className="edg-card">
            <h3 className="edg-card-title">Phase 1</h3>
            <ul>
              <li>Ingest CSV or static documents.</li>
              <li>Build profiles and run baseline matching.</li>
              <li>Review outputs manually to tune taxonomy and thresholds.</li>
            </ul>
          </article>
          <article className="edg-card">
            <h3 className="edg-card-title">Phase 2</h3>
            <ul>
              <li>Add guardrails based on observed errors.</li>
              <li>Introduce explanation gating and reason strings.</li>
              <li>Formalize evaluation with a small labeled set.</li>
            </ul>
          </article>
          <article className="edg-card">
            <h3 className="edg-card-title">Phase 3</h3>
            <ul>
              <li>Integrate into workflows (CRM, calendar, intake forms).</li>
              <li>Track time saved and acceptance rates.</li>
              <li>Expand taxonomy and sources only when quality remains stable.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="edg-section">
        <div className="edg-summary">
          <h2 className="edg-h2">Summary</h2>
          <p>
            EdGrantAI is not a general chatbot. It is a constrained, evidence-driven system with explicit guardrails and human oversight. That
            combination makes it safer, more transparent, and more useful in nonprofit decision workflows.
          </p>
        </div>
      </section>

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
