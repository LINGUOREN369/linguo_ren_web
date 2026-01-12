import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './styles/EdGrantAI.css';
import './styles/EdGrantAIAlgorithm.css';

const renderLatex = (node, formula) => {
  if (!node) return false;
  if (typeof window === 'undefined') {
    node.textContent = formula;
    return false;
  }
  const katex = window.katex;
  if (katex && typeof katex.render === 'function') {
    katex.render(formula, node, { displayMode: true, throwOnError: false });
    return true;
  }
  node.textContent = formula;
  return false;
};

function LaTeXBlock({ formula }) {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      renderLatex(ref.current, formula);
      return undefined;
    }
    let timer = null;
    let attempts = 0;

    const tryRender = () => {
      const rendered = renderLatex(ref.current, formula);
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
\text{score} = w_m O_m + w_p O_p + w_o O_o + w_g O_g
`;

const penaltyFormula = String.raw`
\text{final score} = \text{score} \times p_{red}
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
w_m = 0.50,\ w_p = 0.40,\ w_o = 0.40,\ w_g = 0.10
`;

const missionStepFormula = String.raw`
\begin{aligned}
\text{org} \to \text{grant} &= 1.1316 / 2.10 = 0.539 \\
\text{grant} \to \text{org} &= 0.9336 / 1.50 = 0.6224 \\
O_m &= (0.539 + 0.6224)/2 = 0.5807
\end{aligned}
`;

const populationStepFormula = String.raw`
\begin{aligned}
\text{org} \to \text{grant} &= 0.80 / 1.80 = 0.444 \\
\text{grant} \to \text{org} &= 0.80 / 1.60 = 0.50 \\
O_p &= (0.444 + 0.50)/2 = 0.472
\end{aligned}
`;

const orgTypeStepFormula = String.raw`
\begin{aligned}
\text{org} \to \text{grant} &= 0.70 / 1.00 = 0.70 \\
\text{grant} \to \text{org} &= 0.70 / 1.20 = 0.5833 \\
O_o &= (0.70 + 0.5833)/2 = 0.6417
\end{aligned}
`;

const geographyStepFormula = String.raw`
O_g = 1.00 \quad (\text{grant is } us\_national)
`;

const finalScoreStepFormula = String.raw`
\begin{aligned}
\text{score} &= 0.50(0.5807) + 0.40(0.472) + 0.40(0.6417) + 0.10(1.00) \\
&= 0.83583
\end{aligned}
`;

const finalScorePenaltyFormula = String.raw`
\text{final score} = 0.83583 \times 0.85 = 0.710
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
              This page is a single, step-by-step story from raw text to final score. It keeps every definition and number
              close to the step where it is used.
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
            </div>
            <div className="edg-pill-row">
              <span className="edg-pill">Mission weight 0.50</span>
              <span className="edg-pill">Population weight 0.40</span>
              <span className="edg-pill">Org type weight 0.40</span>
              <span className="edg-pill">Geography weight 0.10</span>
            </div>
          </div>

          <div className="edg-hero-panel edg-stagger">
            <div className="edg-card edg-card--accent">
              <span className="edg-label">Big idea</span>
              <ul className="edg-check-list">
                <li>Tags are labels like "STEM education" or "K-12 teachers."</li>
                <li>Each tag has a confidence from 0 to 1 (how sure we are).</li>
                <li>We compare tags, then average overlap both directions.</li>
                <li>Weights and red flags turn overlap into a final score.</li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <section className="edg-section edg-panel">
        <div className="edg-section-header">
          <span className="edg-kicker">Algorithm</span>
          <h2 className="edg-h2">Step-by-step algorithm (plain English + math)</h2>
          <p className="edg-intro">
            Follow the numbered steps in order. Every formula appears right next to the step that uses it.
          </p>
        </div>
        <div className="edg-timeline edg-stagger">
          <article className="edg-step">
            <div className="edg-step-index">1</div>
            <div className="edg-step-body edg-card">
              <h3 className="edg-card-title">Extract phrases</h3>
              <p>
                The system reads the organization text and the grant text. It extracts key phrases and keeps them verbatim.
                These phrases are the raw inputs for tagging.
              </p>
              <p className="edg-algorithm-note"><strong>Why:</strong> Short phrases are easier to map to clean tags than full paragraphs.</p>
              <p className="edg-algorithm-note"><strong>Output:</strong> A list of verbatim phrases with their source text.</p>
              <p className="edg-algorithm-note"><strong>Next:</strong> Map each phrase to a taxonomy tag.</p>
            </div>
          </article>

          <article className="edg-step">
            <div className="edg-step-index">2</div>
            <div className="edg-step-body edg-card">
              <h3 className="edg-card-title">Map phrases to taxonomy tags</h3>
              <p>
                Each phrase is matched to a taxonomy tag. A phrase must meet a strict threshold to be kept. If it fails,
                the system retries that phrase with the loose threshold (geography and red flags stay strict).
              </p>
              <p className="edg-algorithm-note">
                A taxonomy is just the curated list of tags the system is allowed to use.
              </p>
              <p className="edg-algorithm-note">
                A threshold is the minimum similarity score needed for a phrase to map to a tag.
              </p>
              <p className="edg-algorithm-note">
                This step uses embeddings + cosine similarity to turn phrase text into tag confidence. It is still profile
                building, not org-vs-grant matching.
              </p>
              <p className="edg-algorithm-note"><strong>Why:</strong> Standard tags make org and grant profiles comparable.</p>
              <p className="edg-algorithm-note"><strong>Output:</strong> Candidate tags with confidence scores.</p>
              <p className="edg-algorithm-note"><strong>Next:</strong> Keep the best confidence per tag to build canonical lists.</p>
              <div className="edg-step-grid">
                <div className="edg-step-block">
                  <span className="edg-label">Strict thresholds</span>
                  <ul>
                    <li>Mission: 0.60</li>
                    <li>Population: 0.65</li>
                    <li>Org type: 0.75</li>
                    <li>Geography: 0.85</li>
                    <li>Red flags: 0.80</li>
                    <li>Default: 0.70</li>
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
                    <li>Default: 0.65</li>
                  </ul>
                </div>
              </div>
              <p className="edg-callout">
                <strong>Cosine happens twice:</strong> first here (phrase -&gt; tag, to get confidence). Then again in Step 4
                (org tag -&gt; grant tag, to get match similarity).
              </p>
            </div>
          </article>

          <article className="edg-step">
            <div className="edg-step-index">3</div>
            <div className="edg-step-body edg-card">
              <h3 className="edg-card-title">Build tag lists with confidence</h3>
              <p>
                For each taxonomy, the system keeps the best match per tag and stores its confidence (0 to 1). Duplicate
                tags keep the highest confidence. This becomes the canonical tag list.
              </p>
              <p className="edg-algorithm-note"><strong>Why:</strong> A clean tag list avoids double counting and noise.</p>
              <p className="edg-algorithm-note"><strong>Output:</strong> Canonical tag lists with confidence per taxonomy.</p>
              <p className="edg-algorithm-note"><strong>Next:</strong> Compare org tags to grant tags to measure similarity.</p>
            </div>
          </article>

          <article className="edg-step">
            <div className="edg-step-index">4</div>
            <div className="edg-step-body edg-card">
              <h3 className="edg-card-title">Compute tag similarity</h3>
              <p>
                This is the org-vs-grant matching step. Mission and population tags use embeddings and cosine similarity.
                Org type and geography use exact match (geography also accepts us_national). Similarities below
                <code>{'T_{match}'}</code> are ignored. The results are the <code>{'s_{ij}'}</code> values used later.
              </p>
              <LaTeXBlock formula={cosineFormula} />
              <LaTeXBlock formula={matchThresholdFormula} />
              <LaTeXBlock formula={matchThresholdValueFormula} />
              <p className="edg-algorithm-note">
                This is the second cosine. The first cosine was in Step 2 during profile building.
              </p>
              <p className="edg-algorithm-note"><strong>Why:</strong> Similarity scores tell how close the org and grant tags are.</p>
              <p className="edg-algorithm-note"><strong>Output:</strong> A set of tag-pair similarities (or exact matches).</p>
              <p className="edg-algorithm-note"><strong>Next:</strong> Turn those similarities into overlap scores per taxonomy.</p>
            </div>
          </article>

          <article className="edg-step">
            <div className="edg-step-index">5</div>
            <div className="edg-step-body edg-card">
              <h3 className="edg-card-title">Compute overlap per taxonomy</h3>
              <p>
                Overlap is computed in both directions (org to grant and grant to org), then averaged.
              </p>
              <LaTeXBlock formula={overlapFormula} />
              <LaTeXBlock formula={bestMatchFormula} />
              <LaTeXBlock formula={symmetricFormula} />
              <ul>
                <li><code>c_i</code> = org tag confidence</li>
                <li><code>g_j</code> = grant tag confidence</li>
                <li><code>{'s_{ij}'}</code> = similarity between tags</li>
                <li><code>O_m</code>, <code>O_p</code>, <code>O_o</code>, <code>O_g</code> = overlaps</li>
              </ul>
              <p className="edg-algorithm-note"><strong>Why:</strong> Overlap compresses many tag pairs into one score per taxonomy.</p>
              <p className="edg-algorithm-note"><strong>Output:</strong> Four overlap values: mission, population, org type, geography.</p>
              <p className="edg-algorithm-note"><strong>Next:</strong> Combine overlaps with weights to get one final score.</p>
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
              <ul>
                <li><code>w_m</code>, <code>w_p</code>, <code>w_o</code>, <code>w_g</code> are the weights.</li>
                <li><code>{'p_{red}'}</code> is the red-flag penalty multiplier.</li>
              </ul>
              <ul>
                <li>Apply if score &gt;= 0.60</li>
                <li>Maybe if score &gt;= 0.40</li>
                <li>Avoid if score &lt; 0.40</li>
                <li>Hard red-flag rule violated: score = 0</li>
              </ul>
              <p className="edg-algorithm-note"><strong>Why:</strong> One score makes it easy to rank many grants.</p>
              <p className="edg-algorithm-note"><strong>Output:</strong> Final score plus bucket (Apply/Maybe/Avoid).</p>
              <p className="edg-algorithm-note"><strong>Next:</strong> Sort results and return them to the UI.</p>
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
              <p className="edg-algorithm-note"><strong>Why:</strong> The output is designed for human review, not automation.</p>
              <p className="edg-algorithm-note"><strong>Output:</strong> Ranked recommendations with evidence and context.</p>
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
              <p className="edg-algorithm-note">
                <strong>Why:</strong> These are the exact inputs to matching. <strong>Output:</strong> Two tag lists.
                <strong>Next:</strong> Compute mission tag similarities.
              </p>
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
                <li>All other pairs are below 0.50, so they do not count.</li>
              </ul>
              <LaTeXBlock formula={cosineFormula} />
              <LaTeXBlock formula={matchThresholdFormula} />
              <LaTeXBlock formula={matchThresholdValueFormula} />
              <ol className="edg-flow-list">
                <li>Pick a pair of mission tags to compare.</li>
                <li>Look up their vectors in the mission embeddings file.</li>
                <li>Compute cosine similarity between the two vectors.</li>
                <li>Round for reporting (0.72, 0.68, 0.55).</li>
                <li>Drop pairs below <code>{'T_{match}'}</code> = 0.50.</li>
              </ol>
              <p className="edg-algorithm-note">
                If the embedding model or taxonomy embeddings are updated, these similarity numbers can change.
              </p>
              <p className="edg-algorithm-note">
                <strong>Why:</strong> Similarity tells how close the mission tags are. <strong>Output:</strong> The
                mission similarity list. <strong>Next:</strong> Compute mission overlap.
              </p>
            </div>
          </article>

          <article className="edg-step">
            <div className="edg-step-index">3</div>
            <div className="edg-step-body edg-card">
              <h3 className="edg-card-title">Mission overlap</h3>
              <LaTeXBlock formula={missionStepFormula} />
              <p className="edg-algorithm-note">
                <strong>Why:</strong> Mission overlap is the biggest weight. <strong>Output:</strong> <code>O_m</code>.
                <strong>Next:</strong> Compute population overlap.
              </p>
            </div>
          </article>

          <article className="edg-step">
            <div className="edg-step-index">4</div>
            <div className="edg-step-body edg-card">
              <h3 className="edg-card-title">Population overlap</h3>
              <LaTeXBlock formula={populationStepFormula} />
              <p className="edg-algorithm-note">
                <strong>Why:</strong> Population alignment is critical for eligibility. <strong>Output:</strong>
                <code>O_p</code>. <strong>Next:</strong> Compute org type and geography overlap.
              </p>
            </div>
          </article>

          <article className="edg-step">
            <div className="edg-step-index">5</div>
            <div className="edg-step-body edg-card">
              <h3 className="edg-card-title">Org type and geography overlap</h3>
              <LaTeXBlock formula={orgTypeStepFormula} />
              <LaTeXBlock formula={geographyStepFormula} />
              <p className="edg-algorithm-note">
                <strong>Why:</strong> These can enforce eligibility constraints. <strong>Output:</strong> <code>O_o</code>
                and <code>O_g</code>. <strong>Next:</strong> Combine all overlaps into the final score.
              </p>
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
              <p className="edg-algorithm-note">
                <strong>Why:</strong> One score makes ranking easy. <strong>Output:</strong> Final score + bucket.
                <strong>Next:</strong> Rank against other grants.
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
