import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/EdGrantAI.css';
import './styles/AiTeaching.css';
import PipelineDiagram from './PipelineDiagram';





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

const corrections = [
  { said: '“Don’t use abbreviations like LCD.”', rule: 'No abbreviations students might not know.' },
  { said: '“Save time for homework review.”', rule: 'About 15 minutes of homework review after a homework night, and the times in a lesson plan have to add up to exactly 60 minutes.' },
  { said: '“Give them the answers so they get feedback right away.”', rule: 'Homework ends with answers to the odd problems only.' },
  { said: '“Keep the original format and write the answers in red.”', rule: 'Every key is a red-pen copy of the actual handout.' },
  { said: '“Graph every polynomial in Precalc.”', rule: 'Every Precalc key graphs each polynomial, with the vertex and intercepts marked.' },
  { said: '“Don’t tell them to check for extraneous solutions.”', rule: 'No hints on quizzes. Spotting the trap is part of the skill.' },
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


const course = {
  name: 'Accelerated Algebra 2',
  goals: [
    'Manipulate and solve equations fluently and strategically, and know when an answer is valid',
    'Treat functions as objects to read, combine, and invert across graphs, equations, and tables',
    'Recognize the major families of functions and how they behave',
    'Use them to model and reason about real situations',
  ],
  next: 'Precalculus picks up from Unit 6: polynomial and rational functions, then composition, inverses, and transformations.',
  units: [
    {
      id: 'u1',
      label: 'Unit 1',
      title: 'Algebra Review',
      days: 6,
      goals: [1],
      note: 'Built before I started writing unit summaries: solving equations and inequalities, absolute value, interval notation, factoring, and rational and radical equations.',
    },
    {
      id: 'u2',
      label: 'Unit 2',
      title: 'Quadratics',
      days: 6,
      goals: [1, 3],
      oneLine: 'Every quadratic can be solved. Build the full toolkit, then learn to pick the cheapest tool from the shape of the equation.',
      keyBlock: { day: 3, text: 'Deriving the quadratic formula from ax² + bx + c = 0. It is the only place the formula stops being a magic string, and it explains what “no real solution” means. Never compress it.' },
      stages: [
        { name: 'Build the method', days: [1, 2, 3] },
        { name: 'Choose the method', days: [3] },
        { name: 'Extend and consolidate', days: [4, 5] },
      ],
      dayList: [
        { n: 1, title: 'Square roots and completing the square', goal: 'Solve any quadratic whose squared quantity can be isolated, keeping both roots, and produce the constant that completes the square.' },
        { n: 2, title: 'Completing the square practice', goal: 'Solve any x² + bx + c = 0 by completing the square, including odd b and equations that must be rearranged first.' },
        { n: 3, title: 'Quadratic formula and choosing a method', goal: 'Complete the square when a ≠ 1, derive the quadratic formula, and pick the cheapest of five methods from an equation’s structure.' },
        { n: 4, title: 'Systems and mixed practice', goal: 'Solve a system where at least one equation is quadratic, and choose a solving method without being told.' },
        { n: 5, title: 'Partner problem set', goal: 'Apply each method once under a constraint, and recognize when the only candidate root is extraneous.' },
        { n: 6, title: 'Quiz 2', goal: 'Assessment.' },
      ],
    },
    {
      id: 'u3',
      label: 'Unit 3',
      title: 'Systems and Functions',
      days: 10,
      goals: [1, 2],
      oneLine: 'Read a function from its graph or its formula: what it accepts, what it outputs, where it rises and falls, and how functions combine.',
      keyBlock: { day: 1, text: 'Telling “where” (x) from “what” (y), with open and closed endpoints. Every later graph question fails without it.' },
      stages: [
        { name: 'Read a function', days: [1, 2, 3] },
        { name: 'Lines, systems, and Quiz 3', days: [4, 5, 6] },
        { name: 'Work with functions', days: [7, 8, 9, 10] },
      ],
      dayList: [
        { n: 1, title: 'Introduction to functions', goal: 'State where a graph increases, decreases, or is constant, and separate local from absolute extrema, endpoints included.' },
        { n: 2, title: 'Function notation and graph stations', goal: 'Decide function-or-not from a set, table, or graph, and read f(a) and f(x) = k off a graph.' },
        { n: 3, title: 'Domain from equations', goal: 'Find a domain from denominators and even roots, and count solutions of f(x) = k with a horizontal line.' },
        { n: 4, title: 'Counting solutions and lines', goal: 'Say whether a system has 0, 1, 2, or infinitely many solutions without solving, and write a line in point-slope or slope-intercept form.' },
        { n: 5, title: 'Perpendicular bisectors and spiral review', goal: 'Write a perpendicular bisector, and solve radical and polynomial equations without losing or keeping the wrong roots.' },
        { n: 6, title: 'Quiz 3', goal: 'Assessment.' },
        { n: 7, title: 'Domain, range, and inputs from outputs', goal: 'Solve f(x) = k algebraically and from a graph, and use the range to predict when no input exists.' },
        { n: 8, title: 'Operations and composition', goal: 'Add, subtract, multiply, divide, and compose functions, and show f(g(x)) ≠ g(f(x)).' },
        { n: 9, title: 'Even and odd symmetry', goal: 'Test even and odd symmetry algebraically and from a graph.' },
        { n: 10, title: 'Functions review', goal: 'Do every Day 7–9 skill unprompted, including the domain of a composition.' },
      ],
    },
    {
      id: 'u4',
      label: 'Unit 4',
      title: 'Transformations',
      upcoming: true,
      goals: [2, 3],
      topics: 'Parent functions and transformations of their graphs.',
    },
    {
      id: 'u5',
      label: 'Unit 5',
      title: 'Quadratic Graphs + Word Problems',
      upcoming: true,
      goals: [1, 3, 4],
      topics: 'Complex numbers, graphing quadratics, and quadratic word problems, ending with the semester test.',
    },
    {
      id: 'u6',
      label: 'Unit 6',
      title: 'Polynomials',
      upcoming: true,
      goals: [2, 3],
      topics: 'Graphing polynomials and writing their equations.',
    },
  ],
  threads: [
    { text: 'Unit 2 ends some equations at “no real solution.” Unit 5 gives those same equations complex solutions.', units: ['u2', 'u5'] },
    { text: 'Unit 3 learns to read one function. Unit 4 moves whole families of them with transformations.', units: ['u3', 'u4'] },
    { text: 'Extraneous roots start in Unit 1, come back on Unit 2 Day 5, and return in Unit 3’s spiral review.', units: ['u1', 'u2', 'u3'] },
    { text: 'Quadratics in Units 2 and 5 grow into polynomials in Unit 6, which is where Precalculus picks up.', units: ['u2', 'u5', 'u6'] },
  ],
};

function ArcDemo() {
  const [unitId, setUnitId] = useState('u2');
  const [goal, setGoal] = useState(null);
  const [stageIdx, setStageIdx] = useState(null);
  const [dayN, setDayN] = useState(null);
  const [thread, setThread] = useState(null);
  const unit = course.units.find((u) => u.id === unitId);
  const threadUnits = thread !== null ? course.threads[thread].units : null;
  const lit = stageIdx !== null && unit.stages ? unit.stages[stageIdx].days : [];
  const day = unit.dayList && dayN ? unit.dayList.find((d) => d.n === dayN) : null;

  const pickUnit = (id) => { setUnitId(id); setStageIdx(null); setDayN(null); };

  return (
    <div className="ait-arc">
      <span className="edg-label">The course · {course.name} · click a goal</span>
      <ol className="ait-arc-goals">
        {course.goals.map((g, i) => (
          <li key={g}>
            <button
              type="button"
              className={`ait-arc-goal${goal === i + 1 ? ' is-active' : ''}`}
              onClick={() => setGoal(goal === i + 1 ? null : i + 1)}
            >
              <span className="ait-arc-goal-n">{i + 1}</span>
              <span>{g}</span>
            </button>
          </li>
        ))}
      </ol>

      <span className="edg-label">The units · first semester</span>
      <div className="ait-arc-course" role="tablist" aria-label="Units">
        {course.units.map((u) => (
          <button
            key={u.id}
            type="button"
            role="tab"
            aria-selected={unitId === u.id}
            className={[
              'ait-arc-unit',
              unitId === u.id ? 'is-active' : '',
              u.upcoming ? 'is-upcoming' : '',
              !u.dayList && !u.upcoming ? 'is-muted' : '',
              (goal && !u.goals.includes(goal)) || (threadUnits && !threadUnits.includes(u.id)) ? 'is-dim' : '',
              threadUnits && threadUnits.includes(u.id) ? 'is-thread' : '',
            ].join(' ')}
            onClick={() => pickUnit(u.id)}
          >
            <span className="ait-arc-unit-label">{u.label}{u.days ? ` · ${u.days} days` : ' · coming up'}</span>
            <span className="ait-arc-unit-title">{u.title}</span>
            <span className="ait-arc-unit-goals">Goals {u.goals.join(', ')}</span>
          </button>
        ))}
      </div>
      <p className="ait-arc-next">→ {course.next}</p>
      <span className="edg-label">Threads across units · hover or tap one</span>
      <ul className="ait-arc-threads">
        {course.threads.map((t, i) => (
          <li key={t.text}>
            <button
              type="button"
              className={`ait-arc-thread${thread === i ? ' is-active' : ''}`}
              onMouseEnter={() => setThread(i)}
              onMouseLeave={() => setThread(null)}
              onFocus={() => setThread(i)}
              onBlur={() => setThread(null)}
              onClick={() => setThread(thread === i ? null : i)}
            >
              {t.text}
            </button>
          </li>
        ))}
      </ul>

      <div className="ait-arc-unitview">
        {unit.upcoming ? (
          <>
            <span className="edg-label">Not built yet · from the course materials</span>
            <p className="ait-arc-oneline">{unit.topics}</p>
          </>
        ) : !unit.dayList ? (
          <p className="ait-arc-note">{unit.note}</p>
        ) : (
          <>
            <span className="edg-label">The unit in one line</span>
            <p className="ait-arc-oneline">{unit.oneLine}</p>

            <span className="edg-label">The arc · click a stage</span>
            <div className="ait-arc-stages">
              {unit.stages.map((st, i) => (
                <button
                  key={st.name}
                  type="button"
                  className={`ait-arc-stage${stageIdx === i ? ' is-active' : ''}`}
                  onClick={() => setStageIdx(stageIdx === i ? null : i)}
                >
                  <span className="ait-arc-stage-days">
                    {st.days.length > 1 ? `Days ${st.days[0]}–${st.days[st.days.length - 1]}` : `Day ${st.days[0]}`}
                  </span>
                  <span>{st.name}</span>
                </button>
              ))}
            </div>

            <span className="edg-label">Day by day · click a day</span>
            <div className="ait-arc-days">
              {unit.dayList.map((d) => (
                <button
                  key={d.n}
                  type="button"
                  className={[
                    'ait-arc-day',
                    lit.includes(d.n) ? 'is-lit' : '',
                    dayN === d.n ? 'is-active' : '',
                    unit.keyBlock.day === d.n ? 'is-key' : '',
                  ].join(' ')}
                  onClick={() => setDayN(dayN === d.n ? null : d.n)}
                  aria-label={`Day ${d.n}: ${d.title}`}
                >
                  <span className="ait-arc-day-n">{d.n}</span>
                  <span className="ait-arc-day-title">{d.title}</span>
                </button>
              ))}
            </div>

            <div className="ait-arc-detail">
              {day ? (
                <>
                  <span className="edg-label">Day {day.n} goal: what a student can do by the end</span>
                  <p>{day.goal}</p>
                </>
              ) : (
                <>
                  <span className="edg-label">★ Never compress · Day {unit.keyBlock.day}</span>
                  <p>{unit.keyBlock.text}</p>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}


export default function CurriculumPipeline() {
  return (
    <div className="container edg-container ait-container">
      <header className="edg-hero">
        <h1 className="edg-title">Curriculum Pipeline</h1>
        <p className="edg-subtitle">
          A rule-driven system that turns course materials into lesson plans, assessments, and verified answer keys for two
          high school math courses, built on Claude Code, an Obsidian vault, and a pandoc and XeLaTeX build.
        </p>
        <div className="edg-cta">
          <a href="#architecture" className="portfolio-button edg-button-primary">See the architecture</a>
          <a href="#arc" className="portfolio-button portfolio-button--secondary">See the course arc</a>
          <Link to="/project" className="portfolio-button portfolio-button--secondary" aria-label="Back to project list">
            Back to Projects
          </Link>
        </div>
      </header>

      <article className="ait-prose">
        <h2 className="ait-h2">The problem</h2>
        <p>
          I teach Precalculus and Accelerated Algebra 2. Every class day needs a set of documents that depend on each
          other: a lesson plan, class notes, homework, an answer key, and around each quiz, a review sheet, a pop quiz, and
          rubrics. They have to agree with each other, follow the same format, be mathematically correct, and never leak
          answers into a student copy. They also have to change when a class doesn’t get through what was planned.
        </p>
        <p>
          Asking a chat assistant for each document doesn’t hold up. Context is lost between sessions, formatting drifts,
          and nothing guarantees that a correction made on Monday still applies on Friday. So I built a pipeline around an
          agent instead, where the instructions, the materials, and the outputs all live as files.
        </p>
        <p>The design goals:</p>
        <ul className="ait-prose-list">
          <li><strong>One source of truth.</strong> Everything authored lives once, in a Markdown vault under version control.</li>
          <li><strong>Instructions as files, not prompts.</strong> Rules are versioned, loaded every session, and grow from corrections.</li>
          <li><strong>Verifiable outputs.</strong> Every answer is checked, every PDF is inspected, and student copies are scanned.</li>
          <li><strong>Privacy by construction.</strong> No student names, grades, or work ever enter the system. It’s school policy and the core rule.</li>
          <li><strong>Reproducible builds.</strong> PDFs are disposable and rebuilt from the vault, never edited by hand.</li>
        </ul>
        <p>
          Eight weeks in, it has produced six units across both courses: 63 lesson plans, 88 homework sets, 73 answer keys,
          and a little over 300 PDFs, from about 200 requests.
        </p>

        <h2 className="ait-h2" id="architecture">Architecture</h2>
        <p>
          Data moves in one direction. Source materials are read-only. The vault is the only place anything is edited.
          The build turns the vault into PDFs, which are treated as disposable output. The whole system fits in one picture:
        </p>
      </article>
      <PipelineDiagram />
      <article className="ait-prose">
        <p>
          The agent is Claude Code, running in a terminal with the vault as its working directory. It reads and writes files
          directly and runs shell tools: <code>pdftotext</code> to pull text and coordinates from PDFs,{' '}
          <code>pdftoppm</code> to render pages for visual checks, and the build script itself. Lesson plans link their
          resources in an Attachments section, and a pacing dashboard per unit lists the days in order. Together those act
          as the build manifest.
        </p>

        <h2 className="ait-h2">Context loading and task routing</h2>
        <p>
          The agent keeps no memory between sessions on its own, so all durable context is in files it loads at startup.
          A global <code>CLAUDE.md</code> imports the vault’s <code>CLAUDE.md</code>, which imports the format spec. The
          vault’s file is short. It holds the fixed facts (courses, class length, homework budget), the safety rules, and a
          routing table that maps each kind of request to a procedure file.
        </p>
        <p>A trimmed version of the index:</p>
        <pre className="ait-tree ait-code">{claudeMd}</pre>
        <p>A few design choices matter here:</p>
        <ul className="ait-prose-list">
          <li>
            <strong>Format and procedure are separate.</strong> <code>format.md</code> is the only place a formatting rule
            may live. Task files describe steps and point back to it, so no rule is ever stated in two places that can drift apart.
          </li>
          <li>
            <strong>The agent has to attest.</strong> Before starting, it must name the rule files it read. That turns
            missing context into something I can see, instead of a silent failure.
          </li>
          <li>
            <strong>Precedence is explicit.</strong> The format spec beats the task files, which beat the index, which beats
            older notes. Older workflow notes carry a banner saying so.
          </li>
          <li>
            <strong>Corrections become rules.</strong> When I correct something, the agent records it in exactly one file
            and tells me which one.
          </li>
        </ul>
        <p>Every rule in the format spec started as a correction:</p>
      </article>
      <div className="ait-corrections ait-narrow">
        {corrections.map((c) => (
          <div className="ait-correction" key={c.rule}>
            <p className="ait-said">{c.said}</p>
            <p className="ait-rule">{c.rule}</p>
          </div>
        ))}
      </div>


      <article className="ait-prose">
        <h2 className="ait-h2" id="arc">The planning layer: course, unit, day</h2>
        <p>
          The most useful artifact isn’t a worksheet. When the agent builds a unit, it also writes a unit summary: the unit
          in one line, the two or three stages it moves through, the one block that must never be compressed, and a goal
          for every day, written as what a student should be able to do by the end. Those summaries sit under the course
          goals, so the structure is course goal → unit → day.
        </p>
        <p>
          Because the agent can read the course materials for the whole year, not just the current unit, the planning layer
          also shows what is coming. Threads between units become visible before I teach them. When “no real solution”
          comes up in Unit 2, I already know Unit 5 brings in complex numbers. And because I also teach Precalculus, I can
          see where Algebra 2 has to leave students. This is the Algebra 2 course as it stands now:
        </p>
      </article>
      <section className="edg-section ait-arc-section">
        <ArcDemo />
      </section>

      <article className="ait-prose">
        <h2 className="ait-h2">Build and output</h2>
        <p>
          The vault layout is what the build reads. Authored notes are Markdown with LaTeX math. Answer work sits in an{' '}
          <code>[!answer]</code> callout under each problem:
        </p>
        <pre className="ait-tree ait-code">{keyNote}</pre>
        <p>
          <code>build.py</code> (about 640 lines of Python) reads each unit’s pacing dashboard as its manifest, collects
          each day’s attachments, and converts them with pandoc and XeLaTeX. On instructor copies, callouts are printed in
          red. On student copies, they are removed. When the handout is an original PDF instead of a note, the key note
          stores a page and coordinates for each callout, taken from <code>pdftotext -bbox</code>, and the build draws the
          red work onto the original pages with TikZ. Graphs for Precalculus keys come from a small script that renders each
          function with its vertex and intercepts marked. Output goes to one folder per teaching day, named so a printed
          file still says what it is.
        </p>
        <pre className="ait-tree ait-code">{folderTree}</pre>
        <pre className="ait-tree ait-code">{commands}</pre>

        <h2 className="ait-h2">Verification and guardrails</h2>
        <ul className="ait-prose-list">
          <li>
            <strong>Math.</strong> I solve every problem and homework set myself, then compare with the agent’s key. The key
            catches my mistakes, and it doesn’t replace my work. Separately, the procedure makes the agent solve each problem and
            substitute the answer back in.
          </li>
          <li>
            <strong>Source fidelity.</strong> If a value looks wrong, the agent rereads the raw source and flags it rather
            than correcting it.
          </li>
          <li>
            <strong>Layout.</strong> Before handing over a PDF, the agent renders every page and checks for overlaps or
            clipped content.
          </li>
          <li>
            <strong>Leak check.</strong> The build scans every student PDF for answer-key language. Instructor files carry
            “(Instructor)” in the name.
          </li>
          <li>
            <strong>Privacy.</strong> No student names, grades, or work, by policy and by rule. Class needs are described by
            topic (“the mini quiz showed completing the square needs work”), never by student.
          </li>
          <li>
            <strong>Human decisions.</strong> What is taught, in what order, and how hard stays with me.
          </li>
        </ul>

        <h2 className="ait-h2">Failure modes and fixes</h2>
      </article>
      <div className="ait-corrections ait-narrow">
        {failures.map((f) => (
          <div className="ait-correction" key={f.mode}>
            <p className="ait-said">{f.mode}</p>
            <p className="ait-rule">{f.fix}</p>
          </div>
        ))}
      </div>

      <article className="ait-prose">
        <h2 className="ait-h2">Limitations and open problems</h2>
        <ul className="ait-prose-list">
          <li>
            <strong>Rules are natural language.</strong> Compliance isn’t guaranteed. Attestation makes skipped rules
            visible, but doesn’t prevent them.
          </li>
          <li>
            <strong>Correctness depends on two solvers:</strong> me and the model. A computer algebra check on every answer
            would be a stronger third.
          </li>
          <li>
            <strong>Some structural rules could be checked mechanically</strong> instead of trusted. Examples: time blocks
            summing to 60, odd answers matching the key, unique note names.
          </li>
          <li>
            <strong>Course goals live outside the files.</strong> The planning layer starts at the unit. A course summary
            note would let the agent tie every unit back to the course goals on its own.
          </li>
        </ul>
        <p>
          The main lesson: the first draft was never the hard part. Consistency was. Once corrections became files, the
          system stopped forgetting them, and by the third unit a request could cover a whole unit for both courses at once.
        </p>
      </article>

      <footer className="edg-footer">
        <Link to="/project" className="portfolio-button">Back to Projects</Link>
      </footer>
    </div>
  );
}
