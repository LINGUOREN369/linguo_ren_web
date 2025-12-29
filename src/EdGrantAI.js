import React from 'react';
import { Link } from 'react-router-dom';
import './styles/EdGrantAI.css';

export default function EdGrantAI() {
  return (
    <div className="container edg-container">
      <header className="edg-hero">
        <h1 className="edg-title">EdGrantAI</h1>
        <p className="edg-subtitle">Evidence‑aware grant decisions, not black‑box recommendations</p>
        <div className="edg-cta">
          <a
            href="https://github.com/LINGUOREN369/EdGrantAI"
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio-button"
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
      </header>

      <section className="edg-section">
        <h2 className="edg-h2">Why EdGrantAI</h2>
        <p>
          Many nonprofits operate with shrinking staff and tighter funding cycles while making high‑stakes grant decisions under significant capacity constraints.
        </p>
        <p>
          The central risk is not a lack of information; rather, decision‑support tools that appear authoritative can inadvertently mislead, with real consequences.
        </p>
        <p>
          EdGrantAI prioritizes making evidence boundaries and constraints explicit over optimizing recommendations, so practitioners maintain clarity when capacity is already stretched.
        </p>
      </section>

      {/* Section navigation removed per request */}

      <section id="overview" className="edg-section">
        <h2 className="edg-h2">Overview</h2>
        <p>
          EdGrantAI helps small education nonprofits quickly identify which grants fit their mission,
          which they are truly eligible for, and which to avoid—along with clear, explainable rationale.
          Instead of a generic list, it makes evidence boundaries and constraints explicit, provides eligibility checks,
          taxonomy‑driven tagging, curated grants, red‑flag warnings, and concise Grant Fit Reports.
        </p>
        <div className="edg-features">
          <div className="edg-feature">
            <span className="edg-feature-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm1 15h-2v-6h2Zm0-8h-2V7h2Z"/>
              </svg>
            </span>
            <span>Evidence boundaries</span>
          </div>
          <div className="edg-feature">
            <span className="edg-feature-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm-1 15-4-4 1.414-1.414L11 13.172l5.586-5.586L18 9Z"/>
              </svg>
            </span>
            <span>Eligibility analysis</span>
          </div>
          <div className="edg-feature">
            <span className="edg-feature-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 7h10v10H7z" opacity=".2"/>
                <path d="M20 6h-4.586l-2-2H10.59l-2 2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Zm0 12H4V8h16Z"/>
              </svg>
            </span>
            <span>Taxonomy‑driven tags</span>
          </div>
          <div className="edg-feature">
            <span className="edg-feature-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 2h9a2 2 0 0 1 2 2v16l-6-3-6 3V4a2 2 0 0 1 2-2Z"/>
              </svg>
            </span>
            <span>Curated education grants</span>
          </div>
          <div className="edg-feature">
            <span className="edg-feature-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2 1 21h22Zm0 4.84L19.53 19H4.47ZM11 10h2v5h-2Zm0 6h2v2h-2Z"/>
              </svg>
            </span>
            <span>Red‑flag warnings</span>
          </div>
          <div className="edg-feature">
            <span className="edg-feature-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 2h9a2 2 0 0 1 2 2v3H6Zm0 5h11v13a2 2 0 0 1-2 2H6Zm2 3h7v2H8Zm0 4h7v2H8Z"/>
              </svg>
            </span>
            <span>Clear Fit Reports</span>
          </div>
        </div>
      </section>

      <section className="edg-section">
        <h2 className="edg-h2">Why NSF and Why Now</h2>
        <ul>
          <li>NSF still distributes billions, including education and workforce programs.</li>
          <li>Competition is rising; misaligned proposals waste 40–80+ hours.</li>
          <li>Common blockers: eligibility, missing partners, or scope mismatch.</li>
        </ul>
        <p className="edg-note">NSF cannot recommend or rank grants for applicants—EdGrantAI fills this legal and practical gap.</p>
      </section>

      <section id="why-it-works" className="edg-section">
        <h2 className="edg-h2">How It Works</h2>
        <div className="edg-split">
          <div className="edg-split-col">
            <ul>
              <li><strong>Real RFPs → Structured Signals</strong>: extracts programs, eligibility, geography, partners, and mission cues from actual solicitations (not generic lists).</li>
              <li><strong>Taxonomy + Synonyms + Guardrails</strong>: maps phrases to curated education tags with dictionary‑first mapping and safe fallback to embeddings.</li>
              <li><strong>Evidence‑bounded scoring</strong>: transparent weights for mission alignment, eligibility fit, and geography fit; shows rationale and red flags.</li>
              <li><strong>Competition‑aware filtering</strong>: flags time‑wasting misalignment early (e.g., university‑only, required district partner).</li>
            </ul>
          </div>
          <div className="edg-figure">
            <img
              src={process.env.PUBLIC_URL + '/docs/edgrantai_structure.png'}
              alt="High-level structure of EdGrantAI components and data flow"
              className="edg-illustration img-fluid"
              loading="lazy"
            />
            <div className="edg-caption">System structure — profiles, taxonomy mapping, scoring, and reports</div>
          </div>
        </div>
      </section>

      <section id="design-logic" className="edg-section">
        <h2 className="edg-h2">Traditional vs ChatGPT‑Only vs EdGrantAI</h2>
        <div className="edg-figure">
          <img
            src={process.env.PUBLIC_URL + '/docs/edgrantai_workflow.png'}
            alt="End‑to‑end workflow from RFP ingestion to fit reports"
            className="edg-illustration img-fluid"
            loading="lazy"
          />
          <div className="edg-caption">End‑to‑end workflow — from RFP ingestion to Apply/Maybe/Avoid recommendations</div>
        </div>

        <div className="edg-compare-grid">
          <div className="edg-compare-card">
            <h3 className="edg-compare-title">Traditional Approach</h3>
            <ul>
              <li>Manual search across PDFs and websites</li>
              <li>Low precision/recall; eligibility often unclear</li>
              <li>Time‑intensive; hard to keep current</li>
              <li>Little to no rationale documented</li>
            </ul>
          </div>
          <div className="edg-compare-card">
            <h3 className="edg-compare-title">ChatGPT‑Only</h3>
            <ul>
              <li>One‑off lists can be outdated or hallucinated</li>
              <li>No eligibility validation or red‑flag checks</li>
              <li>General suggestions; limited transparency</li>
              <li>Inconsistent, not reproducible</li>
            </ul>
          </div>
          <div className="edg-compare-card">
            <h3 className="edg-compare-title">EdGrantAI</h3>
            <ul>
              <li>Real RFPs → structured profiles</li>
              <li>Taxonomy + synonyms + guardrails</li>
              <li>Evidence boundaries + eligibility checks</li>
              <li>Clear Apply / Maybe / Avoid with rationale</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="guardrails" className="edg-section">
        <h2 className="edg-h2">Guardrails, Hallucination Prevention, and Transparency</h2>
        <h3 className="edg-h3">Hallucination Prevention</h3>
        <ul>
          <li>Verbatim‑only extraction: pull short phrases directly from source documents; no guessing or summaries. Invalid outputs are rejected.</li>
          <li>Dictionary‑first mapping: a curated glossary and synonyms map terms with full confidence; embeddings run only when the glossary has no match.</li>
          <li>Per‑topic thresholds: some tags are strict while others are optional; geography and red flags always use strict rules to avoid false matches.</li>
          <li>No free‑form generation: the model is used only for extraction and brief explanations, with explicit “do not invent” guidance.</li>
        </ul>

        <h3 className="edg-h3">Guardrails</h3>
        <ul>
          <li>Red‑flag gating: a red flag is marked only when trigger words like “only,” “required,” or “eligibility” appear near the concept.</li>
          <li>Role clarity: audience words like “students” or “teachers” never become organization types.</li>
          <li>Sensitive tags need explicit proof: computing requires clear signals like “computing,” “CS,” or “coding”; “English learners” must include “English.”</li>
          <li>Tighter org profiles: multiple mentions and higher confidence are required before asserting strong claims; geography stays coarse and explicit.</li>
          <li>Hard eligibility blocks: if a must‑have criterion fails (e.g., “universities only”), the match is set to Avoid regardless of other scores.</li>
        </ul>

        <h3 className="edg-h3">Auditability & Transparency</h3>
        <ul>
          <li>Evidence per tag: the exact phrases and sources that led to each tag are retained, along with a confidence score.</li>
          <li>Reproducible profiles: profiles include a taxonomy version, timestamps, and source path/URL; raw vector data is not stored.</li>
          <li>Consistency checks: routine checks keep the taxonomy and embeddings aligned over time.</li>
        </ul>

        <h3 className="edg-h3">What’s Not in the Current Repo (In Progress)</h3>
        <ul>
          <li>No retrieval‑augmented citations yet: the input text is cited directly; there is no external document store.</li>
          <li>No formal JSON‑schema validation or PII redaction yet: prompts discourage PII, but a sanitizer is not wired in.</li>
          <li>Temperature hardening: planned change to fix extraction jobs to temperature 0 for additional determinism.</li>
      </ul>
      </section>

      

      {/* Implementation details intentionally omitted to emphasize theory and approach */}

      

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
