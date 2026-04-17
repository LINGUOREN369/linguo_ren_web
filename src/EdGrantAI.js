import React from 'react';
import { Link } from 'react-router-dom';
import './styles/EdGrantAI.css';

export default function EdGrantAI() {
  return (
    <div className="container edg-container">
      <header className="edg-hero">
        <h1 className="edg-title">Evidence-Bound AI for High-Stakes Nonprofit Decision-Making</h1>
        <p className="edg-subtitle">Evidence-gated decision support with guardrails, restraint, and human oversight</p>

        <div className="edg-cta">
          <a
            href="https://github.com/LINGUOREN369/EdGrantAI"
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio-button"
            aria-label="Open EdGrantAI on GitHub"
          >
            <span className="github-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.701-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.607.069-.607 1.004.07 1.532 1.031 1.532 1.031.892 1.528 2.341 1.087 2.91.832.091-.647.35-1.087.636-1.337-2.22-.253-4.555-1.112-4.555-4.944 0-1.091.39-1.985 1.029-2.685-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.5.336c1.909-1.295 2.748-1.026 2.748-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.594 1.028 2.685 0 3.842-2.338 4.688-4.566 4.937.359.31.678.92.678 1.855 0 1.338-.012 2.417-.012 2.746 0 .267.18.579.688.48C19.138 20.162 22 16.417 22 12c0-5.523-4.477-10-10-10Z" clipRule="evenodd"/>
              </svg>
            </span>
            <span>View on GitHub</span>
          </a>
          <Link to="/edgrantai-chat" className="portfolio-button portfolio-button--secondary">
            Live Demo
          </Link>
          <Link to="/project" className="portfolio-button portfolio-button--secondary">
            Back to Projects
          </Link>
        </div>

        <div className="edg-hero-panel">
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
      </header>

      <div className="edg-layout">
        <nav className="edg-toc" aria-label="Table of contents">
          <div className="edg-toc-title">Contents</div>
          <ol className="edg-toc-list">
            <li><a href="#overview" className="edg-toc-link">Case Study</a></li>
            <li><a href="#alignment" className="edg-toc-link">Alignment Goals</a></li>
            <li><a href="#guardrails" className="edg-toc-link">Guardrails & Ethics</a></li>
            <li><a href="#security" className="edg-toc-link">API Security</a></li>
            <li><a href="#oversight" className="edg-toc-link">Human Role</a></li>
            <li><a href="#adoption" className="edg-toc-link">Inspiring Nonprofits</a></li>
            <li><a href="#summary" className="edg-toc-link">Summary</a></li>
          </ol>
        </nav>

        <div className="edg-main">
        <section className="edg-section" id="overview">
          <h2 className="edg-h2">Case Study: Moving Beyond Generic Chatbots to Reliable Decision Support</h2>

          <p>
            Nonprofits exist in a high-stakes environment where time is the scarcest resource. Access to private funding is often relationship-driven
            and invite-only. Public funding (for example, National Science Foundation) is open to all but buried under technical jargon, shifting
            deadlines, and complex eligibility rules. Furthermore, federal agencies cannot legally recommend or rank grants for specific applicants.
          </p>

          <h3 className="edg-card-title">We saw two major problems</h3>
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
        </section>

        <section className="edg-section" id="alignment">
          <h2 className="edg-h2">Alignment Goals and Responsible AI Design</h2>

          <div className="edg-pair-grid">
            <div className="edg-pair">
              <h3 className="edg-card-title">Evidence-bound</h3>
              <p>No invented facts or inferred eligibility. Tags appear only when they trace to extracted text and curated taxonomy terms.</p>
            </div>

            <div className="edg-pair">
              <h3 className="edg-card-title">Transparent and reproducible</h3>
              <p>Outputs are traceable and repeatable across runs. Profiles include taxonomy version, confidence values, and evidence for every tag.</p>
            </div>

            <div className="edg-pair">
              <h3 className="edg-card-title">Conservative in ambiguity</h3>
              <p>Prefer "unknown" over guess when evidence is thin. Strict thresholds and guarded embedding fallback keep weak matches from surfacing.</p>
            </div>

            <div className="edg-pair">
              <h3 className="edg-card-title">Data minimization</h3>
              <p>Limit what the system stores and exposes. Raw embeddings are not stored in profiles; reports include only necessary metadata.</p>
            </div>

            <div className="edg-pair">
              <h3 className="edg-card-title">Human oversight</h3>
              <p>Final decisions stay with people, not models. Humans curate taxonomy, synonyms, and thresholds, and decide whether to apply.</p>
            </div>
          </div>

          <div className="edg-callout">
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

        <section className="edg-section" id="guardrails">
          <h2 className="edg-h2">Guardrails and Ethics by Pipeline Stage</h2>

          <div className="edg-timeline">
            <div className="edg-step">
              <h3 className="edg-card-title">Extraction (Controlled Keyphrase Extractor)</h3>
              <ul className="edg-check-list">
                <li>Extracts verbatim phrases only; no summarization or paraphrase.</li>
                <li>Output must be a strict JSON array; invalid output is rejected.</li>
                <li>Deadlines and award amounts are handled by deterministic parsing, not the LLM.</li>
                <li>Prevents hallucinated facts or invented deadlines.</li>
              </ul>
            </div>

            <div className="edg-step">
              <h3 className="edg-card-title">Mapping (Dictionary to Guardrails to Embeddings)</h3>
              <ul className="edg-check-list">
                <li>Dictionary-first mapping for high-precision terms and synonyms.</li>
                <li>Embedding fallback is used only when dictionary mapping fails.</li>
                <li>Audience phrases cannot create organization type tags.</li>
                <li>Red flags require gating terms and, for grants, the Eligibility section.</li>
                <li>Avoids false eligibility claims and misclassification.</li>
              </ul>
            </div>

            <div className="edg-step">
              <h3 className="edg-card-title">Profile Building</h3>
              <ul className="edg-check-list">
                <li>Profiles store evidence (source_text and sources) for every tag.</li>
                <li>Raw embeddings are not stored (data minimization).</li>
                <li>Geography must be explicit or derived from a named state.</li>
                <li>Red flags require multiple mentions and higher thresholds.</li>
                <li>Maintains a clear audit trail.</li>
              </ul>
            </div>

            <div className="edg-step">
              <h3 className="edg-card-title">Decision Support and Recommendations</h3>
              <ul className="edg-check-list">
                <li>Evidence-gated scoring runs only on supported tags; weak tags are dropped before scoring.</li>
                <li>Red flags can hard-block if eligibility is unmet.</li>
                <li>Scores must cross a threshold before explanations appear.</li>
                <li>Prevents overconfident recommendations and keeps silence when evidence is weak.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="edg-section" id="security">
          <h2 className="edg-h2">API Security Overview</h2>
    
          <h3 className="edg-card-title">Request flow</h3>
          <ul className="edg-check-list">
            <li>User submits a mission in the browser.</li>
            <li>Turnstile runs in the browser and returns a short-lived token.</li>
            <li>Browser sends mission + Turnstile token to the edge gateway.</li>
            <li>Edge gateway validates origin, Turnstile token, and rate limits the client.</li>
            <li>Edge gateway injects a server-side API token and forwards to the backend.</li>
            <li>Backend validates the token and uses a server-only LLM API key for decision support.</li>
            <li>Recommendations flow back to the browser.</li>
          </ul>

          <h3 className="edg-card-title">Protections in place</h3>
          <ul className="edg-check-list">
            <li>Origin allowlist: only first-party domains are accepted.</li>
            <li>Turnstile verification: blocks spoofed requests without a valid browser token.</li>
            <li>Rate limiting: throttles abusive traffic per IP.</li>
            <li>Backend auth: accepts only requests with a valid server-side token.</li>
          </ul>
        </section>

        <section className="edg-section" id="oversight">
          <h2 className="edg-h2">Human Role (Not Optional)</h2>

          <div className="edg-phase-grid">
            <div>
              <h3 className="edg-card-title">Define: What the system knows</h3>
              <ul className="edg-check-list">
                <li>Curate taxonomy content, synonyms, and red flags.</li>
                <li>Select source documents and organization profiles.</li>
                <li>Set scope boundaries for what the system can and cannot infer.</li>
              </ul>
            </div>

            <div>
              <h3 className="edg-card-title">Calibrate: How the engine behaves</h3>
              <ul className="edg-check-list">
                <li>Choose thresholds, weights, and stoplists.</li>
                <li>Approve guardrails and explanation gating rules.</li>
                <li>Tune for precision vs recall based on risk tolerance.</li>
              </ul>
            </div>

            <div>
              <h3 className="edg-card-title">Decide: How outputs are used</h3>
              <ul className="edg-check-list">
                <li>Make final Apply / Maybe / Avoid decisions.</li>
                <li>Review high-stakes matches before submission.</li>
                <li>Track outcomes and run error analysis.</li>
              </ul>
            </div>
          </div>

          <p className="edg-judgment">The system provides evidence and ranking, but does not replace judgment.</p>

          <h2 className="edg-h2">Risks and Mitigations</h2>
          <div className="edg-risk-grid">
            <div>
              <h3 className="edg-card-title">Risk: False Eligibility Recommendation</h3>
              <ul className="edg-check-list">
                <li>Hard-block rules for eligibility red flags</li>
                <li>Guardrails and strict thresholds</li>
                <li>Manual review of high-stakes submissions</li>
              </ul>
            </div>

            <div>
              <h3 className="edg-card-title">Risk: Biased or Incomplete Taxonomy</h3>
              <ul className="edg-check-list">
                <li>Human curation and change review</li>
                <li>Versioning for reproducibility</li>
                <li>Evaluation on real-world outcomes</li>
              </ul>
            </div>

            <div>
              <h3 className="edg-card-title">Risk: Over-Reliance on AI Explanations</h3>
              <ul className="edg-check-list">
                <li>Explanation gating</li>
                <li>Evidence linked to tags and reasons</li>
                <li>Clear separation of explanation vs decision</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="edg-section" id="adoption">
          <h2 className="edg-h2">How This Can Inspire Other Nonprofits</h2>

          <h3 className="edg-card-title">General recommendations for AI-assisted tools</h3>
          <ul className="edg-check-list">
            <li>Start with a narrow, high-impact workflow where time loss is measurable.</li>
            <li>Ground every output in evidence before any model reasoning or similarity.</li>
            <li>Add guardrails early to block hallucinations and false eligibility.</li>
            <li>Keep outputs auditable with a trace from evidence to tag to score.</li>
            <li>Make human judgment the final checkpoint, not the model.</li>
            <li>Measure real impact: time saved, reduced rejections, and quality of matches.</li>
          </ul>

          <h3 className="edg-card-title">Adapting EdGrantAI for other funders</h3>
          <ul className="edg-check-list">
            <li>Swap in DOE, NIH, or foundation solicitations as source documents.</li>
            <li>Extend the taxonomy with domain-specific mission and population tags.</li>
            <li>Curate synonyms and red flags that reflect new eligibility rules.</li>
            <li>Reweight scoring to match each funder's priorities and risk profile.</li>
            <li>Load your organization database so profiles reflect local context.</li>
            <li>Validate on past awards before rolling into live decisions.</li>
          </ul>
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
        <Link to="/project" className="portfolio-button">Back to Projects</Link>
        <a
          href="https://github.com/LINGUOREN369/EdGrantAI"
          target="_blank"
          rel="noopener noreferrer"
          className="portfolio-button"
          aria-label="Open EdGrantAI on GitHub"
        >
          <span className="github-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.701-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.607.069-.607 1.004.07 1.532 1.031 1.532 1.031.892 1.528 2.341 1.087 2.91.832.091-.647.35-1.087.636-1.337-2.22-.253-4.555-1.112-4.555-4.944 0-1.091.39-1.985 1.029-2.685-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.5.336c1.909-1.295 2.748-1.026 2.748-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.594 1.028 2.685 0 3.842-2.338 4.688-4.566 4.937.359.31.678.92.678 1.855 0 1.338-.012 2.417-.012 2.746 0 .267.18.579.688.48C19.138 20.162 22 16.417 22 12c0-5.523-4.477-10-10-10Z" clipRule="evenodd"/>
            </svg>
          </span>
          <span>View on GitHub</span>
        </a>
      </footer>
    </div>
  );
}
