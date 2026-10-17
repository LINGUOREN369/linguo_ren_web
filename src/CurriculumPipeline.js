import React from 'react';
import { Link } from 'react-router-dom';
import './styles/EdGrantAI.css';
import './styles/AiTeaching.css';
import PipelineDiagram from './PipelineDiagram';
import RuleFiles from './RuleFiles';





const claudeMd = `# Curriculum work in this vault

I teach Precalculus (PC) and Accelerated Algebra 2 (A2A), 9th–10th grade.
Every class is 60 minutes. Homework is sized to 25–40 minutes.

## Required: read the rules before every task
1. Identify the task type using the table below.
2. Read _claude/format.md and every task file for that type.
3. Say which files you read before starting.

| When asked to…                | Read                 |
|-------------------------------|----------------------|
| write or change a lesson plan | tasks/lesson-plan.md |
| write homework                | tasks/homework.md    |
| write a quiz or review sheet  | tasks/assessment.md  |
| write an answer key           | tasks/answer-key.md  |

## Safety (never break these)
- Student privacy: never ask for, accept, store, or write student
  names, grades, or student work. Describe class needs by topic.

@_claude/format.md`;

const folderTree = `Teaching/                    ← one Obsidian vault, opened in Claude Code
  CLAUDE.md                  ← read automatically at the start of every session
  _claude/
    format.md                ← how everything should look
    tasks/
      lesson-plan.md  homework.md  assessment.md
      answer-key.md   build-unit.md  build-pdfs.md
  Source Material/           ← the original class materials, as given
  PC/
    PC Planning Sheet.md
    Unit 2 - Polynomial and Rational Equations/
      Lesson Plans/  Worksheets/  Homework/  Solutions/
  tools/
    build.py                 ← notes → PDFs
    header-doc.tex           ← page style for the PDFs`;

const keyNote = `3. $x^2 - 6x + 5 = 0$

   > [!answer]
   > $x^2 - 6x + 9 = -5 + 9$
   > $(x - 3)^2 = 4$
   > $\\boxed{x = 1,\\ x = 5}$`;

const commands = `cd ~/Teaching
claude                      # start Claude Code in the vault

# build PDFs for a whole unit, or one day
python3 tools/build.py PC "Unit 2 - Polynomial and Rational Equations"
python3 tools/build.py PC "Unit 2 - Polynomial and Rational Equations" --day 3`;

const principles = [
  {
    area: 'Planning',
    rules: [
      { rule: 'Write goals as what students can do, not topics.', why: '“Solve any quadratic whose squared part can be isolated” tells you what to teach. “Square roots” doesn’t.' },
      { rule: 'Name the one block per unit that can’t be rushed.', why: 'When time runs short, you already know what to protect.' },
      { rule: 'Plan from what actually happened.', why: 'The next class and tonight’s homework start from how far the class got and what the last quiz showed.' },
    ],
  },
  {
    area: 'Daily lessons',
    rules: [
      { rule: 'Open with three questions on the last class.', why: 'Retrieval builds fluency, and it shows what didn’t stick before anything new starts.' },
      { rule: 'Give every problem a reason and a likely mistake.', why: 'The order is deliberate, and you know what to listen for at each board.' },
      { rule: 'Close with a question answered in words.', why: '“Why does this work?” builds connections that computing alone doesn’t.' },
    ],
  },
  {
    area: 'Practice and homework',
    rules: [
      { rule: 'Same skills, new numbers.', why: 'Eight sets of the same parts build fluency through varied repetition.' },
      { rule: 'Give answers to the odd problems only.', why: 'Students check themselves that night, and the even ones still show you the gaps.' },
      { rule: 'Include the edge cases on purpose.', why: 'No solution, an extraneous root, a sign flip: the cases students miss when practice is generic.' },
    ],
  },
  {
    area: 'Quizzes',
    rules: [
      { rule: 'Test each skill once per quiz.', why: 'Two problems on the same skill cost the same student twice and tell you nothing new.' },
      { rule: 'Only test what has been taught.', why: 'Check the planning record, not the plan.' },
      { rule: 'No hints on the student copy.', why: 'Don’t name the method or warn about the trap. Recognizing it is part of the skill.' },
      { rule: 'Give a low-stakes pop quiz the day before.', why: 'Feedback arrives while there is still time to act on it.' },
    ],
  },
  {
    area: 'Answer keys and accuracy',
    rules: [
      { rule: 'Mark up the original handout in red.', why: 'The key lines up with the page you and your students worked on.' },
      { rule: 'Solve every problem, then substitute back.', why: 'Every answer in a key is checked before anyone relies on it.' },
      { rule: 'Write for students, not for experts.', why: 'No unexplained abbreviations like “LCD,” and a worked example beside every key formula.' },
    ],
  },
];


const failures = [
  {
    mode: 'Output that is correct but not usable',
    fix: 'Early lesson plans read like documents about a lesson. The task file now fixes the shape: problems in teaching order, the purpose of each, and the mistake to watch for.',
  },
  {
    mode: 'Preferences that evaporate between sessions',
    fix: 'The same layout corrections came up again and again. Every correction is now written into the format spec or a task file, never left in chat.',
  },
  {
    mode: 'Silent data loss on ingest',
    fix: 'A common .docx text extractor drops Word equations without any error. The ingest step now parses the document XML directly, including the math markup.',
  },
  {
    mode: 'Source errors “fixed” by guessing',
    fix: 'One source file said −92 where −9/2 was meant. The rule is to reread the raw source and flag it, never to quietly correct it.',
  },
  {
    mode: 'Two versions of the truth',
    fix: 'The same homework once existed in two folders with different contents. Now the vault is the only editable copy, and PDFs are always rebuilt, never edited.',
  },
  {
    mode: 'Rules that never loaded',
    fix: 'Starting the agent from a different folder skipped the vault’s rules entirely. A global CLAUDE.md now imports them, and the agent must list the files it read before it starts.',
  },
  {
    mode: 'Plausible but unsupported claims',
    fix: 'The agent fills gaps with confident prose. The first draft of this page did it. Its writing gets checked as carefully as its math.',
  },
];





const TOC = [
  ['glance', 'At a glance'],
  ['why', '1. Why I built it'],
  ['how', '2. How it works'],
  ['arc', '3. Seeing the whole course'],
  ['rules', '4. Rules worth borrowing'],
  ['checks', '5. Checks and privacy'],
  ['lessons', '6. What I learned'],
];

function InShort({ children }) {
  return (
    <p className="cp-inshort">
      <span className="cp-inshort-label">In short</span>
      {children}
    </p>
  );
}

export default function CurriculumPipeline() {
  return (
    <div className="container edg-container ait-container">
      <header className="edg-hero">
        <h1 className="edg-title">Curriculum Pipeline</h1>
        <p className="edg-subtitle">
          A rule-driven system that turns course materials into lesson plans, practice, quizzes, and checked answer keys for
          two high school math courses. Built with Claude Code, an Obsidian vault, and a small PDF build script.
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
                <p>An AI agent that follows written rules to prepare my Precalculus and Algebra 2 classes.</p>
              </div>
              <div>
                <span className="edg-label">What it makes</span>
                <p>Six units in eight weeks: 63 lesson plans, 88 homework sets, 73 answer keys, and 300+ printable PDFs.</p>
              </div>
              <div>
                <span className="edg-label">The key idea</span>
                <p>Instructions live in files, not in chat. Every correction becomes a rule, so nothing has to be said twice.</p>
              </div>
              <div>
                <span className="edg-label">The rule that never bends</span>
                <p>No student names, grades, or work ever go in. It’s school policy and the core of the design.</p>
              </div>
            </div>
          </section>

          {/* 1 */}
          <section className="cp-section" id="why">
            <h2 className="ait-h2">1. Why I built it</h2>
            <InShort>Prep is dozens of documents that must agree with each other. A chat assistant forgets; files don’t.</InShort>
            <div className="ait-prose">
              <p>
                Every class day needs a lesson plan, practice, homework, and an answer key, plus a review sheet, pop quiz, and
                rubric around each quiz. They have to match each other, follow one format, be mathematically correct, never
                leak answers to students, and change when a class doesn’t get through the plan.
              </p>
              <p>
                Asking a chat assistant for each one doesn’t hold up: it forgets between sessions, formatting drifts, and a
                correction on Monday is gone by Friday. So I built the system around four design goals:
              </p>
              <ul className="ait-prose-list">
                <li><strong>One source of truth.</strong> Everything I make lives once, in a folder of Markdown notes with version history.</li>
                <li><strong>Instructions as files.</strong> Rules load every session and grow from my corrections.</li>
                <li><strong>Checked outputs.</strong> Every answer is verified, every PDF is looked at, and student copies are scanned for answers.</li>
                <li><strong>Privacy by design.</strong> Student information never enters the system.</li>
              </ul>
            </div>
          </section>

          {/* 2 */}
          <section className="cp-section" id="how">
            <h2 className="ait-h2">2. How it works</h2>
            <InShort>
              Class materials and my rules go in. Claude Code writes notes into one vault. A script turns the vault into PDFs.
            </InShort>
            <PipelineDiagram />

            <div className="cp-parts">
              <div>
                <h3 className="ait-h3">Class materials</h3>
                <p>Curated materials for each unit, aligned with the school’s goals for the course. Read-only: nothing edits them.</p>
              </div>
              <div>
                <h3 className="ait-h3">Claude Code</h3>
                <p>An AI agent that runs in the terminal, reads and writes files, and runs tools like <code>pdftotext</code>.</p>
              </div>
              <div>
                <h3 className="ait-h3">Vault</h3>
                <p>An Obsidian folder of Markdown notes. The only place anything is edited, backed up with git.</p>
              </div>
              <div>
                <h3 className="ait-h3">build.py</h3>
                <p>Turns a unit’s notes into PDFs with pandoc and LaTeX, one folder per teaching day.</p>
              </div>
            </div>

            <div className="ait-prose">
              <h3 className="ait-h3">How the agent knows what to do</h3>
              <p>
                The agent has no memory between sessions, so everything it needs is in files that load at startup. A short index,{' '}
                <code>CLAUDE.md</code>, has the basics and a table that says which instruction file to read for each kind of
                request. It also pulls in <code>format.md</code>, which holds every rule about how things look.
              </p>
              <pre className="ait-tree ait-code">{claudeMd}</pre>
              <p>Four habits keep it reliable:</p>
              <ol className="ait-prose-list">
                <li><strong>Each rule lives in one place,</strong> so nothing is written twice and nothing can quietly disagree.</li>
                <li><strong>It says what it read</strong> before starting, so a missed file is easy to spot.</li>
                <li><strong>The rule files win</strong> over any older note that disagrees.</li>
                <li><strong>Corrections become rules.</strong> When I correct something, it goes into the right file, and I’m told which.</li>
              </ol>

              <h3 className="ait-h3">From notes to paper</h3>
              <p>
                Answer work sits in a marked block under each problem. The build prints those blocks in red on my copy and
                removes them from the student copy. For an original PDF, the agent records where each problem sits on the page,
                and the build draws the red work right onto it.
              </p>
              <pre className="ait-tree ait-code">{keyNote}</pre>
              <details className="cp-more">
                <summary>Folder layout and commands</summary>
                <pre className="ait-tree ait-code">{folderTree}</pre>
                <pre className="ait-tree ait-code">{commands}</pre>
              </details>
            </div>
          </section>

          {/* 3 */}
          <section className="cp-section" id="arc">
            <h2 className="ait-h2">3. Seeing the whole course</h2>
            <InShort>
              Before I teach a unit, I can see what the course is for, how the unit serves it, and what each day is for.
            </InShort>
            <div className="ait-prose">
              <p>
                This is the hardest part of teaching for a new teacher, or anyone teaching a course for the first time: you can
                see this week’s topic, but not why it’s there, what it sets up, or what you can’t afford to rush. Without that,
                it’s easy to just deliver content. With it, every day can build fluency and make connections visible. Because
                the agent can read a whole year of materials, it writes this down at three levels:
              </p>
            </div>

            <div className="cp-levels">
              <div className="ait-level">
                <span className="edg-label">Course summary</span>
                <h3 className="ait-h3">What the course is for</h3>
                <ul>
                  <li>Course goals, as what students can do</li>
                  <li>Every unit, with the goals it serves</li>
                  <li>Threads between units</li>
                </ul>
              </div>
              <div className="cp-level-arrow" aria-hidden="true">→</div>
              <div className="ait-level">
                <span className="edg-label">Unit summary</span>
                <h3 className="ait-h3">How the unit gets there</h3>
                <ul>
                  <li>The unit in one line</li>
                  <li>Its stages, and the one block never to rush</li>
                  <li>A goal for every day</li>
                </ul>
              </div>
              <div className="cp-level-arrow" aria-hidden="true">→</div>
              <div className="ait-level">
                <span className="edg-label">Lesson plan</span>
                <h3 className="ait-h3">What happens in class</h3>
                <ul>
                  <li>Opening questions on last class</li>
                  <li>Problems, each with a purpose</li>
                  <li>A closing big-idea question</li>
                  <li>A practice sheet</li>
                </ul>
              </div>
            </div>

            <div className="ait-prose">
              <h3 className="ait-h3">Example: Accelerated Algebra 2, Unit 2</h3>
              <p><strong>Course goals.</strong> By the end of the course, students can:</p>
              <ol className="ait-prose-list">
                <li>solve equations fluently and strategically, and know when an answer is valid;</li>
                <li>treat functions as objects to read, combine, and invert;</li>
                <li>recognize the major families of functions and how they behave;</li>
                <li>use them to model real situations.</li>
              </ol>
              <p><strong>Unit 2, Quadratics</strong> serves goals 1 and 3. In one line:</p>
              <blockquote className="ait-quote">
                Every quadratic can be solved. Build the full toolkit, then learn to pick the cheapest tool from the shape of the
                equation.
              </blockquote>
              <p>
                <strong>Never rush:</strong> Day 3’s derivation of the quadratic formula. It’s the only place the formula stops
                being a magic string, and it explains what “no real solution” means.
              </p>
              <div className="ait-table-wrap">
                <table className="ait-goals">
                  <thead>
                    <tr><th>Day</th><th>Goal: what a student can do by the end</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>1</td><td>Solve any quadratic whose squared part can be isolated, keeping both roots</td></tr>
                    <tr><td>2</td><td>Complete the square for any x² + bx + c = 0, including odd b</td></tr>
                    <tr><td>3</td><td>Derive the quadratic formula, and pick the cheapest method from an equation’s structure</td></tr>
                    <tr><td>4</td><td>Solve a system where one equation is quadratic, choosing the method without being told</td></tr>
                    <tr><td>5</td><td>Use each method under a constraint, and spot when the only candidate root is extraneous</td></tr>
                    <tr><td>6</td><td>Quiz</td></tr>
                  </tbody>
                </table>
              </div>
              <p><strong>Threads to name out loud</strong> when they come up:</p>
              <ul className="ait-prose-list">
                <li>“No real solution” in Unit 2 becomes complex solutions in Unit 5.</li>
                <li>Extraneous roots appear in Unit 1, return on Unit 2 Day 5, and again in Unit 3.</li>
                <li>Quadratics grow into polynomials in Unit 6, which is where Precalculus starts.</li>
              </ul>

              <h3 className="ait-h3">How it shows up in class</h3>
              <div className="ait-table-wrap">
                <table className="ait-goals cp-uses">
                  <tbody>
                    <tr><td>Fluency</td><td>Every class opens with three questions on the last one, and practice repeats the same skills with new numbers.</td></tr>
                    <tr><td>Connections</td><td>Every class closes with a question answered in words, and threads get named when they appear.</td></tr>
                    <tr><td>Focus</td><td>When time is short, the unit summary says what not to cut.</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 4 */}
          <section className="cp-section" id="rules">
            <h2 className="ait-h2">4. Rules worth borrowing</h2>
            <InShort>Sixteen rules I apply to every unit. None of them depend on AI.</InShort>
            <div className="ait-principles">
              {principles.map((g) => (
                <section className="ait-principle-group" key={g.area}>
                  <h3 className="ait-h3">{g.area}</h3>
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
            <details className="cp-more">
              <summary>Read the full rule files</summary>
              <p className="cp-more-note">
                The actual files the agent reads, as of October 16, 2026. Paths and names are generalized; the unit summary is
                an excerpt.
              </p>
              <RuleFiles />
            </details>
          </section>

          {/* 5 */}
          <section className="cp-section" id="checks">
            <h2 className="ait-h2">5. Checks and privacy</h2>
            <InShort>I solve every problem myself, the agent checks its own work, and student data never goes in.</InShort>
            <div className="ait-table-wrap">
              <table className="ait-goals cp-uses">
                <tbody>
                  <tr><td>Math</td><td>I solve every problem myself first, then compare with the key. The agent also substitutes every answer back in.</td></tr>
                  <tr><td>Sources</td><td>If a value in the materials looks wrong, the agent flags it instead of quietly fixing it.</td></tr>
                  <tr><td>Layout</td><td>Every PDF page is rendered and looked at before it’s handed over.</td></tr>
                  <tr><td>Answer leaks</td><td>Student copies are scanned for answer-key language; files with answers say “(Instructor)” in the name.</td></tr>
                  <tr><td>Privacy</td><td>No student names, grades, or work. Class needs are described by topic, never by student.</td></tr>
                  <tr><td>Decisions</td><td>What is taught, in what order, and how hard stays with me.</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 6 */}
          <section className="cp-section" id="lessons">
            <h2 className="ait-h2">6. What I learned</h2>
            <InShort>The first draft was never the hard part. Consistency was.</InShort>
            <div className="ait-prose">
              <p>
                Once corrections became files, the system stopped forgetting them. By the third unit, one request could cover a
                whole unit for both courses.
              </p>
              <h3 className="ait-h3">What went wrong, and the fix</h3>
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
              <h3 className="ait-h3">What it can’t do yet</h3>
              <ul className="ait-prose-list">
                <li>Rules are written in plain language, so following them isn’t guaranteed. Listing the files it read makes misses visible, not impossible.</li>
                <li>A computer algebra check on every key would add a third check after me and the model.</li>
                <li>Some rules could be checked by a script instead of trusted, like odd answers matching the key.</li>
                <li>Only Algebra 2 has a course summary so far.</li>
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
