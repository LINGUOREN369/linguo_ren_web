import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './styles/EdGrantAI.css';
import './styles/EdGrantAIAlgorithm.css';

const renderLatex = (node, formula, displayMode = true) => {
  if (!node) return false;
  if (typeof window === 'undefined') {
    node.textContent = formula;
    return false;
  }
  const katex = window.katex;
  if (katex && typeof katex.render === 'function') {
    katex.render(formula, node, { displayMode, throwOnError: false });
    return true;
  }
  node.textContent = formula;
  return false;
};

function LaTeXBlock({ formula }) {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      renderLatex(ref.current, formula, true);
      return undefined;
    }
    let timer = null;
    let attempts = 0;

    const tryRender = () => {
      const rendered = renderLatex(ref.current, formula, true);
      if (!rendered && attempts < 20) {
        attempts += 1;
        timer = window.setTimeout(tryRender, 200);
      }
    };

    tryRender();

    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [formula]);

  return <div className="edg-math-block" ref={ref} aria-label="Math formula" />;
}

function InlineLatex({ formula, label }) {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      renderLatex(ref.current, formula, false);
      return undefined;
    }
    let timer = null;
    let attempts = 0;

    const tryRender = () => {
      const rendered = renderLatex(ref.current, formula, false);
      if (!rendered && attempts < 20) {
        attempts += 1;
        timer = window.setTimeout(tryRender, 200);
      }
    };

    tryRender();

    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [formula]);

  return <span className="edg-math-inline" ref={ref} aria-label={label || formula} />;
}

const overlapFormula = String.raw`
\text{overlap}_{org \to grant} =
\frac{\sum_i c_i \cdot \max_j (s_{ij} \cdot g_j)}{\sum_i c_i}
`;

const bestMatchFormula = String.raw`
\text{best match for tag } i = \max_j (s_{ij} \cdot g_j)
`;

const symmetricFormula = String.raw`
\text{symmetric overlap} =
\frac{\text{overlap}_{org \to grant} + \text{overlap}_{grant \to org}}{2}
`;

const scoreFormula = String.raw`
\text{score} = w_{mission} O_{mission} + w_{population} O_{population} + w_{orgtype} O_{orgtype} + w_{geography} O_{geography}
`;

const penaltyFormula = String.raw`
\text{final score} = \text{score} \times penalty_{redflag}
`;

const penaltyValueFormula = String.raw`
penalty_{redflag} = 0.95
`;

const cosineFormula = String.raw`
\text{cosine}(a,b) = \frac{a \cdot b}{\|a\|\|b\|}
`;

const matchThresholdFormula = String.raw`
\text{count match if } s_{ij} \ge T_{match}
`;

const matchThresholdValueFormula = String.raw`
T_{match} = 0.50
`;

const weightFormula = String.raw`
w_{mission} = 0.50,\ w_{population} = 0.40,\ w_{orgtype} = 0.40,\ w_{geography} = 0.10
`;

const missionStepFormula = String.raw`
\begin{aligned}
\text{org} \to \text{grant} &= 1.1316 / 2.10 = 0.539 \\
\text{grant} \to \text{org} &= 0.9336 / 1.50 = 0.6224 \\
O_{mission} &= (0.539 + 0.6224)/2 = 0.5807
\end{aligned}
`;

const populationStepFormula = String.raw`
\begin{aligned}
\text{org} \to \text{grant} &= 0.80 / 1.80 = 0.444 \\
\text{grant} \to \text{org} &= 0.80 / 1.60 = 0.50 \\
O_{population} &= (0.444 + 0.50)/2 = 0.472
\end{aligned}
`;

const orgTypeStepFormula = String.raw`
\begin{aligned}
\text{org} \to \text{grant} &= 0.70 / 1.00 = 0.70 \\
\text{grant} \to \text{org} &= 0.70 / 1.20 = 0.5833 \\
O_{orgtype} &= (0.70 + 0.5833)/2 = 0.6417
\end{aligned}
`;

const geographyStepFormula = String.raw`
O_{geography} = 1.00 \quad (\text{grant is } us\_national)
`;

const finalScoreStepFormula = String.raw`
\begin{aligned}
\text{score} &= 0.50(0.5807) + 0.40(0.472) + 0.40(0.6417) + 0.10(1.00) \\
&= 0.83583
\end{aligned}
`;

const finalScorePenaltyFormula = String.raw`
\text{final score} = 0.83583 \times 0.95 = 0.794
`;

export default function EdGrantAIAlgorithm() {
  return (
    <div className="container edg-container edg-algorithm">
      <header className="edg-hero">
        <div className="edg-hero-grid">
          <div className="edg-hero-copy">
            <span className="edg-eyebrow">Matching algorithm</span>
            <h1 className="edg-title">How EdGrantAI Scores a Match</h1>
            <p className="edg-subtitle">
              This page is a single, step-by-step story from raw text to final score. It keeps each definition and formula
              right next to the step that uses it.
            </p>
            <div className="edg-cta">
              <Link to="/edgrantai-chat" className="portfolio-button">
                Back to Live Recommendations
              </Link>
              <a
                className="portfolio-button portfolio-button--secondary"
                href="https://github.com/LINGUOREN369/EdGrantAI/blob/main/docs/03_matching_algorithm_and_formula.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                Source doc (matching algorithm)
              </a>
              <Link to="/project" className="portfolio-button portfolio-button--secondary">
                Back to Projects
              </Link>
            </div>
          </div>

          <div className="edg-hero-panel edg-stagger">
            <div className="edg-card edg-card--accent">
              <span className="edg-label">Big idea</span>
              <ul className="edg-check-list">
                <li>Turn messy text into clean tags.</li>
                <li>Compare tags only within the same category.</li>
                <li>Combine overlaps into one score.</li>
                <li>Return ranked results with evidence.</li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <section className="edg-section edg-panel">
        <div className="edg-section-header">
          <span className="edg-kicker">Algorithm</span>
          <h2 className="edg-h2">Step-by-step algorithm</h2>
          <p className="edg-intro">
            Follow the numbered steps in order. Each step lists why it exists, what it outputs, and how it feeds the next.
          </p>
        </div>
        <div className="edg-timeline edg-stagger">
          <article className="edg-step">
            <div className="edg-step-index">1</div>
            <div className="edg-step-body edg-card">
              <h3 className="edg-card-title">Extract phrases</h3>
              <p>
                The system reads the organization text and the grant text and pulls short phrases verbatim.
              </p>
              <p className="edg-algorithm-note"><strong>Why:</strong> Short phrases are easier to map than full paragraphs.</p>
              <p className="edg-algorithm-note"><strong>Output:</strong> A list of phrases per document.</p>
              <p className="edg-algorithm-note"><strong>Next:</strong> Map phrases to taxonomy tags.</p>
            </div>
          </article>

          <article className="edg-step">
            <div className="edg-step-index">2</div>
            <div className="edg-step-body edg-card">
              <h3 className="edg-card-title">Map phrases to taxonomy tags</h3>
              <p>
                Each phrase is matched to a tag from a taxonomy (a curated tag list). The phrase must meet a strict
                similarity threshold to be kept; if it fails, the system retries that phrase with a looser threshold
                (geography and red flags stay strict).
              </p>
              <p>
                Similarity here is computed with embeddings + cosine, and the score becomes the tag confidence.
              </p>
              <p className="edg-algorithm-note"><strong>Why:</strong> Standard tags make org and grant profiles comparable.</p>
              <p className="edg-algorithm-note"><strong>Output:</strong> Candidate tags with confidence scores.</p>
              <p className="edg-algorithm-note"><strong>Next:</strong> Keep the best confidence per tag.</p>
              <div className="edg-step-grid">
                <div className="edg-step-block">
                  <span className="edg-label">Strict thresholds</span>
                  <ul>
                    <li>Mission: 0.60</li>
                    <li>Population: 0.65</li>
                    <li>Org type: 0.75</li>
                    <li>Geography: 0.85</li>
                    <li>Red flags: 0.80</li>
                  </ul>
                </div>
                <div className="edg-step-block">
                  <span className="edg-label">Loose fallback</span>
                  <ul>
                    <li>Mission: 0.55</li>
                    <li>Population: 0.60</li>
                    <li>Org type: 0.70</li>
                    <li>Geography: 0.85</li>
                    <li>Red flags: 0.80</li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

          <article className="edg-step">
            <div className="edg-step-index">3</div>
            <div className="edg-step-body edg-card">
              <h3 className="edg-card-title">Build canonical tag lists</h3>
              <p>
                For each taxonomy, keep the best match per tag and store its confidence (0 to 1). Duplicates keep the
                highest confidence.
              </p>
              <p className="edg-algorithm-note"><strong>Why:</strong> Prevents double-counting and noisy tags.</p>
              <p className="edg-algorithm-note"><strong>Output:</strong> Canonical tag lists with confidences.</p>
              <p className="edg-algorithm-note"><strong>Next:</strong> Compare org tags to grant tags.</p>
            </div>
          </article>

          <article className="edg-step">
            <div className="edg-step-index">4</div>
            <div className="edg-step-body edg-card">
              <h3 className="edg-card-title">Compute tag similarity (org vs grant)</h3>
              <p>
                Tags compare only within the same taxonomy: mission to mission, population to population, org type to org
                type, and geography to geography. For a given taxonomy, each org tag is compared to all grant tags in that
                same taxonomy to get <InlineLatex formula="s_{ij}" label="s sub i j" /> values.
              </p>
              <p>
                Mission and population use embeddings + cosine similarity. Org type and geography use exact match
                (geography also accepts us_national). Similarities below <InlineLatex formula="T_{match}" label="T match" /> are ignored.
              </p>
              <LaTeXBlock formula={cosineFormula} />
              <LaTeXBlock formula={matchThresholdFormula} />
              <LaTeXBlock formula={matchThresholdValueFormula} />
              <p className="edg-algorithm-note"><strong>Why:</strong> Produces per-tag similarity scores for overlap.</p>
              <p className="edg-algorithm-note"><strong>Output:</strong> Similarity scores between tag pairs.</p>
              <p className="edg-algorithm-note"><strong>Next:</strong> Convert similarities into overlap values.</p>
            </div>
          </article>

          <article className="edg-step">
            <div className="edg-step-index">5</div>
            <div className="edg-step-body edg-card">
              <h3 className="edg-card-title">Compute overlap per taxonomy</h3>
              <p>
                Overlap is computed in both directions (org to grant and grant to org) and then averaged.
              </p>
              <LaTeXBlock formula={overlapFormula} />
              <LaTeXBlock formula={bestMatchFormula} />
              <LaTeXBlock formula={symmetricFormula} />
              <ul>
                <li><InlineLatex formula="c_i" label="c sub i" /> = org tag confidence</li>
                <li><InlineLatex formula="g_j" label="g sub j" /> = grant tag confidence</li>
                <li><InlineLatex formula="s_{ij}" label="s sub i j" /> = similarity between tags</li>
                <li>
                  <InlineLatex formula="O_{mission}" label="O mission" />, <InlineLatex formula="O_{population}" label="O population" />,
                  <InlineLatex formula="O_{orgtype}" label="O orgtype" />, <InlineLatex formula="O_{geography}" label="O geography" />
                  = overlaps
                </li>
              </ul>
              <p className="edg-algorithm-note"><strong>Mini example (mission):</strong></p>
              <p className="edg-algorithm-note">
                Org tags: STEM education (c=1.00), teacher professional learning (c=0.70), informal STEM learning (c=0.40).
                Grant tags: science education (g=0.90), teacher development (g=0.60).
              </p>
              <p className="edg-algorithm-note">
                Best matches (<InlineLatex formula="s_{ij}" label="s sub i j" /> * <InlineLatex formula="g_j" label="g sub j" />):
                STEM education -> 0.72*0.90=0.648, teacher prof learning -> 0.68*0.60=0.408, informal STEM -> 0.55*0.90=0.495.
              </p>
              <p className="edg-algorithm-note">
                Org->grant overlap = (1.00*0.648 + 0.70*0.408 + 0.40*0.495) / (1.00+0.70+0.40) = 1.1316 / 2.10 = 0.539.
              </p>
              <p className="edg-algorithm-note">
                Do the same grant->org, then average the two to get the final mission overlap{' '}
                <InlineLatex formula="O_{mission}" label="O mission" />.
              </p>
              <p className="edg-algorithm-note"><strong>Why:</strong> Compresses many tag pairs into one score per taxonomy.</p>
              <p className="edg-algorithm-note"><strong>Output:</strong> Four overlap values (mission, population, org type, geography).</p>
              <p className="edg-algorithm-note"><strong>Next:</strong> Combine overlaps into a final score.</p>
            </div>
          </article>

          <article className="edg-step">
            <div className="edg-step-index">6</div>
            <div className="edg-step-body edg-card">
              <h3 className="edg-card-title">Compute final score and bucket</h3>
              <p>
                Overlaps are multiplied by weights and added together. Red flags can apply a penalty or force the score to 0.
              </p>
              <LaTeXBlock formula={scoreFormula} />
              <LaTeXBlock formula={weightFormula} />
              <LaTeXBlock formula={penaltyFormula} />
              <LaTeXBlock formula={penaltyValueFormula} />
              <p className="edg-algorithm-note">
                <strong>Why these numbers:</strong> Mission is most important, population and org type are close behind
                because they affect eligibility, and geography is a lighter filter. The weights are relative, so they do
                not need to add up to 1. (If you want them to add to 1, divide each by 1.40.)
              </p>
              <ul>
                <li>
                  <InlineLatex formula="w_{mission}" label="w mission" />, <InlineLatex formula="w_{population}" label="w population" />,
                  <InlineLatex formula="w_{orgtype}" label="w orgtype" />, <InlineLatex formula="w_{geography}" label="w geography" />
                  are the weights.
                </li>
                <li>
                  <InlineLatex formula="penalty_{redflag}" label="penalty red flag" /> is the red-flag penalty multiplier.
                </li>
              </ul>
              <ul>
                <li>Apply if score &gt;= 0.60</li>
                <li>Maybe if score &gt;= 0.40</li>
                <li>Avoid if score &lt; 0.40</li>
                <li>Hard red-flag rule violated: score = 0</li>
              </ul>
              <p className="edg-algorithm-note"><strong>Why:</strong> One score makes ranking easy.</p>
              <p className="edg-algorithm-note"><strong>Output:</strong> Final score + bucket.</p>
              <p className="edg-algorithm-note"><strong>Next:</strong> Rank and return results.</p>
            </div>
          </article>

          <article className="edg-step">
            <div className="edg-step-index">7</div>
            <div className="edg-step-body edg-card">
              <h3 className="edg-card-title">Return results</h3>
              <ul>
                <li>Final score and bucket (Apply, Maybe, Avoid).</li>
                <li>Overlap reasons and matching tags.</li>
                <li>Grant URL and profile JSON for transparency.</li>
                <li>Deadlines, funding amounts, and synopsis when available.</li>
              </ul>
              <p className="edg-algorithm-note"><strong>Why:</strong> The output is designed for human review.</p>
              <p className="edg-algorithm-note"><strong>Output:</strong> Ranked recommendations with evidence.</p>
              <p className="edg-algorithm-note"><strong>Next:</strong> The frontend displays cards and exports JSON.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="edg-section edg-panel">
        <div className="edg-section-header">
          <span className="edg-kicker">Worked example</span>
          <h2 className="edg-h2">Worked example from the docs</h2>
          <p className="edg-intro">
            Same algorithm, now with the exact example values from the EdGrantAI documentation.
          </p>
        </div>
        <div className="edg-timeline edg-stagger">
          <article className="edg-step">
            <div className="edg-step-index">1</div>
            <div className="edg-step-body edg-card">
              <h3 className="edg-card-title">Example tags (after thresholds)</h3>
              <div className="edg-step-grid">
                <div className="edg-step-block">
                  <span className="edg-label">Organization tags</span>
                  <ul>
                    <li>Mission: STEM education (1.00), teacher professional learning (0.70), informal STEM learning (0.40)</li>
                    <li>Population: K-12 students (1.00), K-12 teachers (0.80)</li>
                    <li>Org type: nonprofit_501c3 (1.00)</li>
                    <li>Geography: Maine (1.00)</li>
                  </ul>
                </div>
                <div className="edg-step-block">
                  <span className="edg-label">Grant tags</span>
                  <ul>
                    <li>Mission: science education (0.90), teacher development (0.60)</li>
                    <li>Population: K-12 teachers (1.00), undergraduate students (0.60)</li>
                    <li>Org type: nonprofit_501c3 (0.70), higher_education_institution (0.50)</li>
                    <li>Geography: us_national (1.00)</li>
                  </ul>
                </div>
              </div>
              <p className="edg-algorithm-note"><strong>Why:</strong> These are the exact inputs to matching.</p>
              <p className="edg-algorithm-note"><strong>Output:</strong> Two tag lists.</p>
              <p className="edg-algorithm-note"><strong>Next:</strong> Compute mission similarity.</p>
            </div>
          </article>

          <article className="edg-step">
            <div className="edg-step-index">2</div>
            <div className="edg-step-body edg-card">
              <h3 className="edg-card-title">Mission similarity scores</h3>
              <ul>
                <li>STEM education and science education = 0.72</li>
                <li>Teacher professional learning and teacher development = 0.68</li>
                <li>Informal STEM learning and science education = 0.55</li>
                <li>
                  All other pairs are below <InlineLatex formula="T_{match}" label="T match" /> = 0.50, so they do not count.
                </li>
              </ul>
              <LaTeXBlock formula={cosineFormula} />
              <LaTeXBlock formula={matchThresholdFormula} />
              <LaTeXBlock formula={matchThresholdValueFormula} />
              <ol className="edg-flow-list">
                <li>Pick a pair of mission tags to compare.</li>
                <li>Look up their vectors in the mission embeddings file.</li>
                <li>Compute cosine similarity between the two vectors.</li>
                <li>Round for reporting (0.72, 0.68, 0.55).</li>
                <li>Drop pairs below <InlineLatex formula="T_{match}" label="T match" /> = 0.50.</li>
              </ol>
              <p className="edg-algorithm-note">
                If the embedding model or taxonomy embeddings are updated, these similarity numbers can change.
              </p>
              <p className="edg-algorithm-note"><strong>Why:</strong> Similarity tells how close the mission tags are.</p>
              <p className="edg-algorithm-note"><strong>Output:</strong> Mission similarity list.</p>
              <p className="edg-algorithm-note"><strong>Next:</strong> Compute mission overlap.</p>
            </div>
          </article>

          <article className="edg-step">
            <div className="edg-step-index">3</div>
            <div className="edg-step-body edg-card">
              <h3 className="edg-card-title">Mission overlap</h3>
              <LaTeXBlock formula={missionStepFormula} />
              <p className="edg-algorithm-note"><strong>Why:</strong> Mission overlap is the biggest weight.</p>
              <p className="edg-algorithm-note">
                <strong>Output:</strong> <InlineLatex formula="O_{mission}" label="O mission" />.
              </p>
              <p className="edg-algorithm-note"><strong>Next:</strong> Compute population overlap.</p>
            </div>
          </article>

          <article className="edg-step">
            <div className="edg-step-index">4</div>
            <div className="edg-step-body edg-card">
              <h3 className="edg-card-title">Population overlap</h3>
              <LaTeXBlock formula={populationStepFormula} />
              <p className="edg-algorithm-note"><strong>Why:</strong> Population alignment is critical for eligibility.</p>
              <p className="edg-algorithm-note">
                <strong>Output:</strong> <InlineLatex formula="O_{population}" label="O population" />.
              </p>
              <p className="edg-algorithm-note"><strong>Next:</strong> Compute org type and geography overlap.</p>
            </div>
          </article>

          <article className="edg-step">
            <div className="edg-step-index">5</div>
            <div className="edg-step-body edg-card">
              <h3 className="edg-card-title">Org type and geography overlap</h3>
              <LaTeXBlock formula={orgTypeStepFormula} />
              <LaTeXBlock formula={geographyStepFormula} />
              <p className="edg-algorithm-note"><strong>Why:</strong> These can enforce eligibility constraints.</p>
              <p className="edg-algorithm-note">
                <strong>Output:</strong> <InlineLatex formula="O_{orgtype}" label="O orgtype" /> and{' '}
                <InlineLatex formula="O_{geography}" label="O geography" />.
              </p>
              <p className="edg-algorithm-note"><strong>Next:</strong> Combine all overlaps into the final score.</p>
            </div>
          </article>

          <article className="edg-step">
            <div className="edg-step-index">6</div>
            <div className="edg-step-body edg-card">
              <h3 className="edg-card-title">Final score and bucket</h3>
              <LaTeXBlock formula={finalScoreStepFormula} />
              <LaTeXBlock formula={finalScorePenaltyFormula} />
              <p>
                With no red flags, the score is 0.83583, which lands in the Apply bucket (score &gt;= 0.60).
              </p>
              <p className="edg-algorithm-note"><strong>Why:</strong> One score makes ranking easy.</p>
              <p className="edg-algorithm-note"><strong>Output:</strong> Final score + bucket.</p>
              <p className="edg-algorithm-note"><strong>Next:</strong> Rank against other grants.</p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
