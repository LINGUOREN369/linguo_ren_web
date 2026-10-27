import React from 'react';
import { Link } from 'react-router-dom';
import './styles/EdGrantAI.css';
import './styles/AiTeaching.css';
import PipelineDiagram from './PipelineDiagram';





const indexFile = `# CLAUDE.md  (the assistant checks this first, every session)

## Required: read the rules before every task
1. Identify the task type using the table below.
2. Read format.md and every task file for that type.
3. Say which files you read before starting.

| When asked to…     | Read                 |
|--------------------|----------------------|
| plan a lesson      | tasks/lesson-plan.md |
| write practice     | tasks/homework.md    |
| write an assessment| tasks/assessment.md  |
| write a key        | tasks/answer-key.md  |

## Precedence
format.md → tasks/* → this file → everything else

## Invariants (never break these)
- No student names, grades, or work. Describe needs by topic.
- No answers on a student-facing document.

@format.md`;

const answerBlock = `<problem as the student sees it>

   > [!answer]
   > <worked steps, printed in red on the instructor copy>
   > <final answer, boxed>
   > <grading note: the mistake to watch for>`;

const setupSteps = [
  { step: 'Choose one editable home.', detail: 'A folder of plain-text notes under version control. Everything else (PDFs, exports, copies) is derived from it.' },
  { step: 'Write your guidelines.', detail: 'Short checklists for how you want materials built: what a good lesson looks like, how practice should build, what an assessment must and must not do. They describe your standards, not your lessons; your existing materials stay in your own folder.' },
  { step: 'Write the index.', detail: 'A short guide the assistant checks first every session: the routing table from request type to procedure, the precedence order, and the invariants.' },
  { step: 'Write the format spec.', detail: 'Every rule about naming, layout, and appearance, in one file. Procedures point to it instead of restating it.' },
  { step: 'Write one procedure per task type.', detail: 'Lesson plan, practice, assessment, answer key, build. Each says what to read, what to produce, and how to check it.' },
  { step: 'Build the planning layer before the daily layer.', detail: 'Course goals, then unit arcs, then daily goals. Daily materials are written against these, not in isolation.' },
];

const taskSteps = [
  { step: 'Classify the request.', detail: 'Match it to one or more rows of the routing table. A request can be several types at once.' },
  { step: 'Follow the guidelines.', detail: 'Check the style guide and every procedure that applies, fresh each time. Never from memory of an earlier session.' },
  { step: 'Name the guidelines used.', detail: 'List them in one line before starting. A missed rule becomes visible instead of silent.' },
  { step: 'Read what the students need.', detail: 'Start from the teacher’s record of what actually happened (how far the class got, which skills didn’t land, what the last assessment showed), not from the plan.' },
  { step: 'Draft new materials.', detail: 'Write fresh problems and notes into the teacher’s folder. Student and instructor versions come from the same note, never two hand-maintained copies.' },
  { step: 'Verify.', detail: 'Solve every problem independently and substitute back. Flag anything that looks wrong rather than quietly correcting it.' },
  { step: 'Build and inspect.', detail: 'Render the PDFs, scan student copies for leaked answers, and look at every page.' },
  { step: 'Hand off for review.', detail: 'The teacher reviews and decides. Scope, sequence, and difficulty stay human decisions.' },
];

const correctionSteps = [
  { step: 'Classify the correction.', detail: 'How something looks → format spec. How a task is done → that task’s procedure. A fact about the context → the index.' },
  { step: 'Write it in exactly one place.', detail: 'Never duplicate a rule. Elsewhere, link to it.' },
  { step: 'Report where it went.', detail: 'One line naming the file changed, so the rule base stays auditable.' },
  { step: 'Resolve conflicts by precedence.', detail: 'Older notes that disagree with a rule file lose. Update or retire them.' },
];

const principles = [
  {
    area: 'Alignment',
    theory: 'Backward design and constructive alignment',
    rules: [
      { rule: 'Write goals as observable actions, not topics.', why: 'A goal phrased as something a student can do defines both what to teach and what evidence would show it was learned.' },
      { rule: 'Plan top-down, adapt bottom-up.', why: 'Course goals constrain units, units constrain days; what actually happened in class feeds back into the next day.' },
      { rule: 'Assess only what was taught.', why: 'Check the record of what happened, not the plan. An assessment outside instruction measures exposure, not learning.' },
    ],
  },
  {
    area: 'Practice',
    theory: 'Retrieval practice and variation',
    rules: [
      { rule: 'Open with retrieval of the previous session.', why: 'Recalling recent material strengthens it and surfaces what didn’t stick before new material builds on it.' },
      { rule: 'Repeat the skill, vary the surface.', why: 'Parallel sets with new values build fluency without letting students memorize answers.' },
      { rule: 'Include boundary cases on purpose.', why: 'Degenerate, invalid, and sign-sensitive cases are where generic practice leaves gaps.' },
    ],
  },
  {
    area: 'Assessment',
    theory: 'Formative feedback and validity',
    rules: [
      { rule: 'One item per skill.', why: 'Redundant items penalize the same gap twice and add no information.' },
      { rule: 'No cues on the student copy.', why: 'Recognizing which method applies is part of the skill being measured.' },
      { rule: 'Give low-stakes feedback before high-stakes measurement.', why: 'Feedback is only useful while there is still time to act on it.' },
    ],
  },
  {
    area: 'Explanation',
    theory: 'Making structure visible',
    rules: [
      { rule: 'Give every problem a purpose and a predicted error.', why: 'Sequence becomes deliberate, and the teacher knows what to listen for.' },
      { rule: 'Close with a question answered in words.', why: 'Explaining why a method works builds connections that procedure alone doesn’t.' },
      { rule: 'Pair every formula with a worked example; avoid unexplained abbreviations.', why: 'Write for the learner, not for the expert who already knows.' },
    ],
  },
];

const failures = [
  {
    mode: 'Correct but not usable',
    fix: 'Output that describes a lesson instead of enabling one. Fix: the procedure fixes the shape of the output, not just its content.',
  },
  {
    mode: 'Preferences that evaporate',
    fix: 'Corrections given in conversation vanish with the session. Fix: every correction is persisted as a rule in a file.',
  },
  {
    mode: 'Generic instead of personal',
    fix: 'Without a clear description of what students need, the agent defaults to textbook-average material. Fix: every request starts from the teacher’s notes on which skills need work.',
  },
  {
    mode: 'Errors “fixed” by guessing',
    fix: 'A model will quietly repair a value that looks wrong. Fix: flag the discrepancy for the teacher; never correct silently.',
  },
  {
    mode: 'Two versions of the truth',
    fix: 'Parallel editable copies drift apart. Fix: one editable source; every other copy is rebuilt from it.',
  },
  {
    mode: 'Guidelines that were skipped',
    fix: 'Starting from the wrong folder skips the guidelines entirely. Fix: a global entry point points to them, and the assistant must name the ones it used.',
  },
  {
    mode: 'Plausible but unsupported claims',
    fix: 'The model fills gaps with confident prose. Fix: its writing is checked as carefully as its math.',
  },
];





const TOC = [
  ['glance', 'At a glance'],
  ['problem', '1. The problem'],
  ['principles', '2. Design principles'],
  ['architecture', '3. Architecture'],
  ['procedure', '4. Procedure'],
  ['planning', '5. The planning hierarchy'],
  ['pedagogy', '6. Pedagogical principles'],
  ['verification', '7. Verification'],
  ['lessons', '8. Failure modes and limits'],
];

function InShort({ children }) {
  return (
    <p className="cp-inshort">
      <span className="cp-inshort-label">In short</span>
      {children}
    </p>
  );
}

function Steps({ items }) {
  return (
    <ol className="ait-prose-list">
      {items.map((s) => (
        <li key={s.step}><strong>{s.step}</strong> {s.detail}</li>
      ))}
    </ol>
  );
}

export default function CurriculumPipeline() {
  return (
    <div className="container edg-container ait-container">
      <header className="edg-hero">
        <h1 className="edg-title">Supplemental Materials</h1>
        <p className="edg-subtitle">
          A teaching idea: teachers write down how they teach once, as rules, and an AI agent uses those rules to design
          materials fitted to what their students need right now. Every lesson, practice set, and assessment stays
          consistent and checked. Shown here with Claude Code, an Obsidian vault, and a small PDF build script.
        </p>
        <div className="edg-cta">
          <a href="#glance" className="portfolio-button edg-button-primary">Start reading</a>
          <Link to="/project" className="portfolio-button portfolio-button--secondary" aria-label="Back to project list">
            Back to Projects
          </Link>
        </div>
      </header>

      <div className="cp-layout">
        <nav className="cp-toc" aria-label="On this page">
          <span className="edg-label">On this page</span>
          <ol>
            {TOC.map(([id, label]) => (
              <li key={id}><a href={`#${id}`}>{label}</a></li>
            ))}
          </ol>
        </nav>

        <main className="cp-main">
          {/* At a glance */}
          <section className="cp-section" id="glance">
            <h2 className="ait-h2 cp-first">At a glance</h2>
            <div className="cp-glance">
              <div>
                <span className="edg-label">What it is</span>
                <p>A way for any teacher to set guidelines that an AI assistant follows when drafting new materials for their students.</p>
              </div>
              <div>
                <span className="edg-label">What it produces</span>
                <p>
                  Lesson plans, practice, assessments, and answer keys shaped to where the students are, all agreeing with
                  each other. These are supplemental materials that sit alongside a school’s curriculum, not a replacement
                  for it.
                </p>
              </div>
              <div>
                <span className="edg-label">The core idea</span>
                <p>Instructions live in files, not in chat. Every correction becomes a rule, so nothing has to be said twice.</p>
              </div>
              <div>
                <span className="edg-label">What stays with the teacher</span>
                <p>
                  The teaching approach and everything built from it are the teacher’s intellectual property, kept in their
                  own folder as plain files they can open, edit, and take anywhere. No student names, grades, or work ever go
                  in.
                </p>
              </div>
            </div>
          </section>

          {/* 1 */}
          <section className="cp-section" id="problem">
            <h2 className="ait-h2">1. The problem</h2>
            <InShort>Students need materials fitted to them, but tailoring by hand doesn’t scale, and a chat assistant forgets the teacher’s standards.</InShort>
            <div className="ait-prose">
              <p>
                Good teaching responds to the students in the room: more practice where a skill didn’t land, a harder version
                for a group that is ready, a review shaped by what the last quiz showed. Doing that by hand means rewriting
                materials every week, so most teachers fall back on one generic set. An AI agent can draft tailored materials
                quickly, but only if it knows the teacher’s standards. Personalized materials are still a system of
                interdependent documents, held to four constraints:
              </p>
              <ul className="ait-prose-list">
                <li><strong>Consistency.</strong> Plans, practice, assessments, and keys must agree with each other and follow one format.</li>
                <li><strong>Correctness.</strong> Every answer must be right, and nothing that looks wrong is quietly “fixed.”</li>
                <li><strong>Separation.</strong> Student-facing and instructor-facing material must never leak into each other.</li>
                <li><strong>Adaptivity.</strong> The materials must respond to what students actually need, not to the original plan.</li>
              </ul>
              <p>
                A language model has no memory between sessions. Used through chat, each request starts from zero: formatting
                drifts, corrections are lost, and the teacher has to keep restating their standards. The idea here is that the
                fix is not a better prompt but a better <em>context</em>. The teacher writes a short set of guidelines once,
                describing how they want things done rather than handing over their lessons. After that, they only have to
                describe what their students need, and the assistant drafts new materials to fit.
              </p>
            </div>

            <div className="ait-prose">
              <h3 className="ait-h3">What “personalized” means here</h3>
              <p>
                The teacher’s rules stay fixed: how a lesson is shaped, what good practice looks like, how assessments are
                built. What changes is the input, meaning the teacher’s read of where the students are. The same rules,
                applied to different needs, give different materials.
              </p>
              <div className="ait-table-wrap">
                <table className="ait-goals cp-uses">
                  <tbody>
                    <tr><td>Teacher observes</td><td>“The class can set up the problem but loses track of signs.”</td></tr>
                    <tr><td>Agent adjusts</td><td>The next opening questions, practice sets, and review target that skill, with new numbers and harder variants for students who are ready.</td></tr>
                    <tr><td>Guidelines guarantee</td><td>Same format, answers checked, no answers on student copies, keys that match.</td></tr>
                  </tbody>
                </table>
              </div>
              <p>
                Needs are always described by skill, never by student. Personalization comes from what the teacher sees,
                not from student data handed to the agent.
              </p>
            </div>
          </section>

          {/* 2 */}
          <section className="cp-section" id="principles">
            <h2 className="ait-h2">2. Design principles</h2>
            <InShort>Borrowed from software engineering: one source of truth, normalized rules, derived outputs, explicit precedence.</InShort>
            <div className="ait-table-wrap">
              <table className="ait-goals cp-uses">
                <tbody>
                  <tr><td>Single source of truth</td><td>Every artifact is edited in exactly one place. Everything else is derived and disposable.</td></tr>
                  <tr><td>Guidelines as files</td><td>Standards are short written checklists the assistant follows every session, not instructions repeated in conversation.</td></tr>
                  <tr><td>One rule, one place</td><td>Rules are normalized like a database: never duplicated, so they can’t quietly disagree.</td></tr>
                  <tr><td>Explicit precedence</td><td>When two rules conflict, a fixed order decides which wins. Ambiguity is resolved by structure, not judgment.</td></tr>
                  <tr><td>Content separate from presentation</td><td>Notes hold content; a build step decides appearance. Student and instructor copies come from the same note.</td></tr>
                  <tr><td>Observable compliance</td><td>The assistant names the guidelines it followed, so a skipped one is visible.</td></tr>
                  <tr><td>Verify, don’t trust</td><td>Every output is checked independently of the process that produced it.</td></tr>
                  <tr><td>Teacher ownership</td><td>The guidelines describe how a teacher works, not the lessons themselves, so finished materials never need to be shared to get started. Everything remains the teacher’s intellectual property: plain files in their own folder, portable to any system, and worked on through an AI account set not to train on their work.</td></tr>
                  <tr><td>Human authority</td><td>The agent drafts; the teacher decides scope, sequence, and difficulty.</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 3 */}
          <section className="cp-section" id="architecture">
            <h2 className="ait-h2">3. Architecture</h2>
            <InShort>The teacher supplies two things: how they teach, and what their students need. The agent drafts new materials into one vault, and a build step turns them into documents.</InShort>
            <PipelineDiagram />

            <div className="cp-parts">
              <div>
                <h3 className="ait-h3">Student needs</h3>
                <p>The teacher’s notes on which skills need work, described by topic, never by student.</p>
              </div>
              <div>
                <h3 className="ait-h3">Guidelines</h3>
                <p>The teacher’s standards as short checklists: an index, a style guide, and one procedure per task type.</p>
              </div>
              <div>
                <h3 className="ait-h3">Vault</h3>
                <p>The teacher’s own folder of plain Markdown notes, with full version history. The only place anything is edited.</p>
              </div>
              <div>
                <h3 className="ait-h3">Build</h3>
                <p>A script that renders notes to PDFs with pandoc and LaTeX. Output is derived, never hand-edited.</p>
              </div>
            </div>

            <div className="ait-prose">
              <h3 className="ait-h3">The rule layer</h3>
              <p>
                The assistant keeps no memory between sessions, so the guidelines sit in short files it checks each time. They
                describe <em>how</em>, not <em>what</em>: the shape of a good lesson, the standards for practice and keys, the
                lines never to cross. The index is deliberately small: which procedure fits which request, which guideline wins
                in a conflict, and the invariants.
              </p>
              <pre className="ait-tree ait-code">{indexFile}</pre>

              <h3 className="ait-h3">One note, two audiences</h3>
              <p>
                Instructor-only content sits in a marked block under each problem. The build renders those blocks in red on the
                instructor copy and strips them from the student copy, so the two can never drift apart.
              </p>
              <pre className="ait-tree ait-code">{answerBlock}</pre>
            </div>
          </section>

          {/* 4 */}
          <section className="cp-section" id="procedure">
            <h2 className="ait-h2">4. Procedure</h2>
            <InShort>Set up once, then run the same loop for every request, and feed every correction back into the rules.</InShort>
            <div className="ait-prose">
              <h3 className="ait-h3">A. Setup (once)</h3>
              <Steps items={setupSteps} />

              <h3 className="ait-h3">B. The task loop (every request)</h3>
              <Steps items={taskSteps} />

              <h3 className="ait-h3">C. The correction loop</h3>
              <p>
                This loop is what makes the system improve. Without it, the same correction has to be given again next week.
              </p>
              <Steps items={correctionSteps} />
            </div>
          </section>

          {/* 5 */}
          <section className="cp-section" id="planning">
            <h2 className="ait-h2">5. The planning hierarchy</h2>
            <InShort>Daily materials are derived from unit goals, which are derived from course goals. Never the reverse.</InShort>
            <div className="ait-prose">
              <p>
                Personalizing well requires knowing what can bend and what can’t. The hardest part of teaching a course for
                the first time is seeing past the current topic: why it’s there, what
                it sets up, and what can’t be rushed. Without that view, it’s easy to just deliver content. The pipeline makes
                the view explicit by writing it down at three levels, following backward design: decide the evidence of
                learning first, then plan instruction to produce it.
              </p>
            </div>

            <div className="cp-levels">
              <div className="ait-level">
                <span className="edg-label">Course summary</span>
                <h3 className="ait-h3">What the course is for</h3>
                <ul>
                  <li>Goals, as what students can do</li>
                  <li>Each unit, mapped to the goals it serves</li>
                  <li>Threads that connect units</li>
                </ul>
              </div>
              <div className="cp-level-arrow" aria-hidden="true">→</div>
              <div className="ait-level">
                <span className="edg-label">Unit summary</span>
                <h3 className="ait-h3">How the unit gets there</h3>
                <ul>
                  <li>The unit in one sentence</li>
                  <li>Its stages, and the one block never to compress</li>
                  <li>A goal for every day</li>
                </ul>
              </div>
              <div className="cp-level-arrow" aria-hidden="true">→</div>
              <div className="ait-level">
                <span className="edg-label">Lesson plan</span>
                <h3 className="ait-h3">What happens in class</h3>
                <ul>
                  <li>Retrieval questions on last session</li>
                  <li>Problems in order, each with a purpose</li>
                  <li>A closing big-idea question</li>
                  <li>Parallel practice</li>
                </ul>
              </div>
            </div>

            <div className="ait-prose">
              <h3 className="ait-h3">Why three levels</h3>
              <ul className="ait-prose-list">
                <li><strong>Focus under constraint.</strong> When time runs short, the unit summary already names what to protect.</li>
                <li><strong>Connections.</strong> Threads between units are written down, so they get named aloud when they recur.</li>
                <li><strong>Feedback.</strong> A planning record logs what actually happened each day, and the next day starts from it.</li>
              </ul>
            </div>
          </section>

          {/* 6 */}
          <section className="cp-section" id="pedagogy">
            <h2 className="ait-h2">6. Pedagogical principles</h2>
            <InShort>The rules encode a small set of ideas from learning research. None of them depend on AI.</InShort>
            <div className="ait-principles">
              {principles.map((g) => (
                <section className="ait-principle-group" key={g.area}>
                  <h3 className="ait-h3">{g.area}</h3>
                  <span className="edg-label">{g.theory}</span>
                  <ul>
                    {g.rules.map((r) => (
                      <li key={r.rule}>
                        <strong>{r.rule}</strong>
                        <span>{r.why}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </section>

          {/* 7 */}
          <section className="cp-section" id="verification">
            <h2 className="ait-h2">7. Verification</h2>
            <InShort>Checks are layered so that no single failure reaches a student.</InShort>
            <div className="ait-table-wrap">
              <table className="ait-goals cp-uses">
                <tbody>
                  <tr><td>Correctness</td><td>Every problem is solved independently by the teacher and by the agent, and every answer is substituted back.</td></tr>
                  <tr><td>Transparency</td><td>Anything that looks wrong is flagged for the teacher, never silently corrected.</td></tr>
                  <tr><td>Presentation</td><td>Every page is rendered and inspected before hand-off.</td></tr>
                  <tr><td>Separation</td><td>Student copies are scanned for answer-key content; instructor files are marked as such in their names.</td></tr>
                  <tr><td>Privacy</td><td>No student data enters the system. Needs are described by topic, never by person.</td></tr>
                  <tr><td>Authority</td><td>What is taught, in what order, and how hard, stays with the teacher.</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 8 */}
          <section className="cp-section" id="lessons">
            <h2 className="ait-h2">8. Failure modes and limits</h2>
            <InShort>The first draft was never the hard part. Consistency was.</InShort>
            <div className="ait-prose">
              <p>
                Once corrections become files, the system stops forgetting them, and a single request can cover an entire
                unit. Each failure below is common when a teacher starts working this way, and each becomes a rule.
              </p>
            </div>
            <div className="ait-corrections ait-narrow">
              {failures.map((f) => (
                <div className="ait-correction" key={f.mode}>
                  <p className="ait-said">{f.mode}</p>
                  <p className="ait-rule">{f.fix}</p>
                </div>
              ))}
            </div>
            <div className="ait-prose">
              <h3 className="ait-h3">Open problems</h3>
              <ul className="ait-prose-list">
                <li>Rules are natural language, so compliance isn’t guaranteed. Naming the guidelines used makes misses visible, not impossible.</li>
                <li>A computer algebra check on every key would add a third, independent verifier.</li>
                <li>Some rules are mechanical and could be enforced by a script rather than trusted to the agent.</li>
              </ul>
            </div>
          </section>
        </main>
      </div>

      <footer className="edg-footer">
        <Link to="/project" className="portfolio-button">Back to Projects</Link>
      </footer>
    </div>
  );
}
