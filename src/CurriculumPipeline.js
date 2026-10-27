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
  { step: 'Map the course first.', detail: 'Course goals, then the arc of each unit, then a goal for every day. Everything later is written against this map, not in isolation.' },
  { step: 'Write your guidelines.', detail: 'Short checklists for how you want materials built: what a good lesson looks like, how practice should build, what an assessment must and must not do. They describe your standards, not your lessons; your existing materials stay in your own folder.' },
  { step: 'Keep one home for everything.', detail: 'One folder of notes is the only place anything is edited. Printed copies are always made from it, so nothing drifts out of date.' },
];

const taskSteps = [
  { step: 'Describe what the students need.', detail: 'By skill, from what happened in class: how far the class got, which skills didn’t land, what the last quiz showed.' },
  { step: 'Ask for the material.', detail: 'A practice set, a review, a lesson plan, a quiz, or an answer key.' },
  { step: 'The assistant follows the guidelines.', detail: 'It checks them fresh each time and names the ones it used, so a skipped guideline is easy to spot.' },
  { step: 'It drafts new materials.', detail: 'Fresh problems fitted to the need. The student copy and the teacher copy come from the same draft, so they always match.' },
  { step: 'Everything is checked.', detail: 'Every answer is solved and substituted back, every page is looked at, and student copies are checked for answers.' },
  { step: 'The teacher decides.', detail: 'The teacher reviews the draft. What is taught, in what order, and how hard stays with the teacher.' },
];

const correctionSteps = [
  { step: 'Notice what’s off.', detail: 'A layout that doesn’t work, a problem that’s too easy, a step students need spelled out.' },
  { step: 'Write it down once.', detail: 'The correction goes into the one guideline it belongs to, never repeated in several places.' },
  { step: 'It holds from then on.', detail: 'The next draft already follows it. Nothing has to be said twice.' },
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
  ['problem', '1. The teaching problem'],
  ['planning', '2. Seeing the whole course'],
  ['pedagogy', '3. Teaching principles'],
  ['procedure', '4. How a teacher uses it'],
  ['verification', '5. Quality checks'],
  ['under-the-hood', '6. How it works under the hood'],
  ['lessons', '7. Lessons learned and limits'],
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
          How a teacher can give students practice fitted to what they actually need, without rewriting materials every
          week. The teacher sets the standards once; an AI assistant drafts supplemental materials that follow them, and
          the teacher has the final say.
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
                <p>A way for any teacher to respond to where their students are, with fresh practice and review each week.</p>
              </div>
              <div>
                <span className="edg-label">What it produces</span>
                <p>
                  Practice, review sheets, lesson plans, quizzes, and answer keys shaped to what students need, all agreeing
                  with each other. These are supplemental materials that sit alongside a school’s curriculum, not a
                  replacement for it.
                </p>
              </div>
              <div>
                <span className="edg-label">The core idea</span>
                <p>
                  The teacher writes down their standards once. Every correction becomes part of those standards, so nothing
                  has to be said twice.
                </p>
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
            <h2 className="ait-h2">1. The teaching problem</h2>
            <InShort>Students need practice fitted to them, but tailoring materials by hand every week doesn’t scale.</InShort>
            <div className="ait-prose">
              <p>
                Good teaching responds to the students in the room: more practice where a skill didn’t land, a harder version
                for a group that is ready, a review shaped by what the last quiz showed. Doing that by hand means rewriting
                materials every week, so most teachers fall back on one generic set.
              </p>
              <p>
                An AI assistant can draft tailored materials quickly, but only if it works to the teacher’s standards. Those
                materials still have to hold together:
              </p>
              <ul className="ait-prose-list">
                <li><strong>Consistency.</strong> Lessons, practice, quizzes, and keys agree with each other and look the same.</li>
                <li><strong>Correctness.</strong> Every answer is right, and nothing that looks wrong is quietly “fixed.”</li>
                <li><strong>Separation.</strong> Answers never appear on a student copy.</li>
                <li><strong>Responsiveness.</strong> Materials follow what students actually need, not the original plan.</li>
              </ul>
            </div>

            <div className="ait-prose">
              <h3 className="ait-h3">What “personalized” means here</h3>
              <p>
                The teacher’s standards stay fixed: how a lesson is shaped, what good practice looks like, how quizzes are
                built. What changes is the teacher’s read of where the students are. The same standards, applied to different
                needs, give different materials.
              </p>
              <div className="ait-table-wrap">
                <table className="ait-goals cp-uses">
                  <tbody>
                    <tr><td>Teacher observes</td><td>“The class can set up the problem but loses track of signs.”</td></tr>
                    <tr><td>Assistant adjusts</td><td>The next opening questions, practice sets, and review target that skill, with new numbers and harder variants for students who are ready.</td></tr>
                    <tr><td>Standards hold</td><td>Same format, answers checked, no answers on student copies, keys that match.</td></tr>
                  </tbody>
                </table>
              </div>
              <p>
                Needs are always described by skill, never by student. Personalization comes from what the teacher sees,
                not from student data.
              </p>
            </div>
          </section>

          {/* 2 */}
          <section className="cp-section" id="planning">
            <h2 className="ait-h2">2. Seeing the whole course</h2>
            <InShort>Daily materials come from unit goals, which come from course goals. Never the reverse.</InShort>
            <div className="ait-prose">
              <p>
                Personalizing well requires knowing what can bend and what can’t. The hardest part of teaching a course for
                the first time is seeing past the current topic: why it’s there, what it sets up, and what can’t be rushed.
                Without that view, it’s easy to just deliver content. This approach writes the view down at three levels,
                following backward design: decide what students should be able to do first, then plan instruction to get
                them there.
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

          {/* 3 */}
          <section className="cp-section" id="pedagogy">
            <h2 className="ait-h2">3. Teaching principles</h2>
            <InShort>The standards encode a small set of ideas from learning research. None of them depend on AI.</InShort>
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

          {/* 4 */}
          <section className="cp-section" id="procedure">
            <h2 className="ait-h2">4. How a teacher uses it</h2>
            <InShort>Set up once, then follow the same steps for every request, and fold every correction back into the standards.</InShort>
            <div className="ait-prose">
              <h3 className="ait-h3">A. Setup (once)</h3>
              <Steps items={setupSteps} />

              <h3 className="ait-h3">B. Every week</h3>
              <Steps items={taskSteps} />

              <h3 className="ait-h3">C. When something needs fixing</h3>
              <p>
                This is what makes the approach improve over time. Without it, the same correction has to be given again
                next week.
              </p>
              <Steps items={correctionSteps} />
            </div>
          </section>

          {/* 5 */}
          <section className="cp-section" id="verification">
            <h2 className="ait-h2">5. Quality checks</h2>
            <InShort>Checks are layered so that no single mistake reaches a student.</InShort>
            <div className="ait-table-wrap">
              <table className="ait-goals cp-uses">
                <tbody>
                  <tr><td>Correctness</td><td>Every problem is solved independently by the teacher and by the assistant, and every answer is substituted back.</td></tr>
                  <tr><td>Transparency</td><td>Anything that looks wrong is flagged for the teacher, never silently corrected.</td></tr>
                  <tr><td>Presentation</td><td>Every page is looked at before it’s handed out.</td></tr>
                  <tr><td>Separation</td><td>Student copies are checked for answers; teacher copies are clearly labeled.</td></tr>
                  <tr><td>Privacy</td><td>No student data is ever used. Needs are described by topic, never by person.</td></tr>
                  <tr><td>Authority</td><td>What is taught, in what order, and how hard, stays with the teacher.</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 6 */}
          <section className="cp-section" id="under-the-hood">
            <h2 className="ait-h2">6. How it works under the hood</h2>
            <InShort>For readers who want the technical detail: written standards guide the assistant, and one folder of notes feeds a print step.</InShort>
            <div className="ait-prose">
              <p>
                The setup shown here uses Claude Code as the assistant, an Obsidian vault (a folder of plain Markdown notes)
                as the one editable home, and a small script that turns notes into printable PDFs. Any similar tools would
                work.
              </p>
              <p>
                An AI assistant has no memory between sessions. Used through chat, each request starts from zero: formatting
                drifts, corrections are lost, and the teacher has to keep restating their standards. The fix is not a better
                prompt but better <em>context</em>: the standards live in short files the assistant checks every time.
              </p>
            </div>
            <PipelineDiagram />

            <div className="cp-parts">
              <div>
                <h3 className="ait-h3">Student needs</h3>
                <p>The teacher’s notes on which skills need work, described by topic, never by student.</p>
              </div>
              <div>
                <h3 className="ait-h3">Guidelines</h3>
                <p>The teacher’s standards as short checklists: an overview, a style guide, and one checklist per kind of material.</p>
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
              <h3 className="ait-h3">Design principles</h3>
            </div>
            <div className="ait-table-wrap">
              <table className="ait-goals cp-uses">
                <tbody>
                  <tr><td>Single source of truth</td><td>Every document is edited in exactly one place. Everything else is derived and disposable.</td></tr>
                  <tr><td>Guidelines as files</td><td>Standards are short written checklists the assistant follows every session, not instructions repeated in conversation.</td></tr>
                  <tr><td>One rule, one place</td><td>Rules are never duplicated, so they can’t quietly disagree.</td></tr>
                  <tr><td>Explicit precedence</td><td>When two rules conflict, a fixed order decides which wins.</td></tr>
                  <tr><td>Content separate from presentation</td><td>Notes hold content; a build step decides appearance. Student and instructor copies come from the same note.</td></tr>
                  <tr><td>Observable compliance</td><td>The assistant names the guidelines it followed, so a skipped one is visible.</td></tr>
                  <tr><td>Teacher ownership</td><td>The guidelines describe how a teacher works, not the lessons themselves, so finished materials never need to be shared to get started. Everything remains the teacher’s intellectual property: plain files in their own folder, portable to any system, and worked on through an AI account set not to train on their work.</td></tr>
                </tbody>
              </table>
            </div>

            <div className="ait-prose">
              <h3 className="ait-h3">The overview file</h3>
              <p>
                The guidelines describe <em>how</em>, not <em>what</em>: the shape of a good lesson, the standards for
                practice and keys, the lines never to cross. A short overview tells the assistant which checklist fits which
                request, which guideline wins in a conflict, and what must never happen.
              </p>
              <pre className="ait-tree ait-code">{indexFile}</pre>

              <h3 className="ait-h3">One note, two audiences</h3>
              <p>
                Teacher-only content sits in a marked block under each problem. The build prints those blocks in red on the
                teacher copy and removes them from the student copy, so the two can never drift apart.
              </p>
              <pre className="ait-tree ait-code">{answerBlock}</pre>
            </div>
          </section>

          {/* 7 */}
          <section className="cp-section" id="lessons">
            <h2 className="ait-h2">7. Lessons learned and limits</h2>
            <InShort>The first draft was never the hard part. Consistency was.</InShort>
            <div className="ait-prose">
              <p>
                Once corrections are written down, they stop being forgotten, and a single request can cover an entire unit.
                Each problem below is common when a teacher starts working this way, and each becomes a guideline.
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
                <li>Guidelines are written in plain language, so following them isn’t guaranteed. Naming the ones used makes misses visible, not impossible.</li>
                <li>A computer algebra check on every answer key would add a third, independent check.</li>
                <li>Some guidelines are mechanical and could be checked by a script rather than trusted to the assistant.</li>
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
