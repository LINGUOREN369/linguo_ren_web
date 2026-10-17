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

const corrections = [
  { said: '“Don’t use abbreviations like LCD.”', rule: 'No abbreviations students might not know.' },
  { said: '“Have them redo the homework at the board.”', rule: 'After a homework night, the walkthrough opens with one or two homework problems, redone at the board from scratch.' },
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
          <a href="#rules" className="portfolio-button portfolio-button--secondary">Read the rule files</a>
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
        <h2 className="ait-h2" id="arc">The planning layer: course → unit → day</h2>
        <p>
          The most useful thing the system produces isn’t a worksheet. It’s a written plan of what the course is for, and how
          each unit and each day serves that. This is the hardest part of teaching for a new teacher, or for anyone teaching
          a course for the first time: you can see this week’s topic, but not why it’s there, what it sets up, or which part
          you can’t afford to rush. Without that, it’s easy to just deliver content. With it, every day can build fluency and
          make the connections visible.
        </p>
        <p>
          Because the agent can read a whole year of course materials, not just the current unit, it can write this down
          before I teach any of it. There are three levels, each a short file:
        </p>
      </article>

      <div className="ait-levels">
        <div className="ait-level">
          <span className="edg-label">Course summary · one per course</span>
          <h3 className="ait-h3">What the course is for</h3>
          <ul>
            <li>Four course goals, written as what students can do</li>
            <li>Every unit in the year, with the goals it serves</li>
            <li>Threads that connect units, and where the course leads</li>
          </ul>
        </div>
        <div className="ait-level-arrow" aria-hidden="true">↓</div>
        <div className="ait-level">
          <span className="edg-label">Unit summary · one per unit</span>
          <h3 className="ait-h3">How the unit gets there</h3>
          <ul>
            <li>The unit in one line</li>
            <li>Its two or three stages, and the one block never to compress</li>
            <li>A goal for every day, written as a capability</li>
          </ul>
        </div>
        <div className="ait-level-arrow" aria-hidden="true">↓</div>
        <div className="ait-level">
          <span className="edg-label">Lesson plan · one per day</span>
          <h3 className="ait-h3">What happens in class</h3>
          <ul>
            <li>Opening Questions on the last class’s core topic</li>
            <li>Problems in teaching order: what each teaches, what to watch for</li>
            <li>Closing Questions on the big idea, answered in words</li>
            <li>A practice sheet: the same skills across 8 sets</li>
          </ul>
        </div>
      </div>

      <article className="ait-prose">
        <h3 className="ait-h3">A real example: Accelerated Algebra 2</h3>
        <p><strong>Course goals.</strong> By the end of the course, students can:</p>
        <ol className="ait-prose-list">
          <li>manipulate and solve equations fluently and strategically, and know when an answer is valid;</li>
          <li>treat functions as objects to read, combine, and invert across graphs, equations, and tables;</li>
          <li>recognize the major families of functions and how they behave;</li>
          <li>use them to model and reason about real situations.</li>
        </ol>
        <p><strong>Unit 2, Quadratics (serves goals 1 and 3).</strong> In one line:</p>
        <blockquote className="ait-quote">
          Every quadratic can be solved. Build the full toolkit, then learn to pick the cheapest tool from the shape of the
          equation.
        </blockquote>
        <p>
          It moves through three stages: build the method (Days 1–3), choose the method (Day 3), then extend and consolidate
          (Days 4–5). The block never to compress is Day 3’s derivation of the quadratic formula, because it is the only place
          the formula stops being a magic string, and it explains what “no real solution” means.
        </p>
        <div className="ait-table-wrap">
          <table className="ait-goals">
            <thead>
              <tr><th>Day</th><th>Goal: what a student can do by the end</th></tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>Solve any quadratic whose squared quantity can be isolated, keeping both roots</td></tr>
              <tr><td>2</td><td>Complete the square for any x² + bx + c = 0, including odd b</td></tr>
              <tr><td>3</td><td>Derive the quadratic formula, and pick the cheapest of five methods from an equation’s structure</td></tr>
              <tr><td>4</td><td>Solve a system where one equation is quadratic, choosing the method without being told</td></tr>
              <tr><td>5</td><td>Apply each method under a constraint, and recognize when the only candidate root is extraneous</td></tr>
              <tr><td>6</td><td>Quiz</td></tr>
            </tbody>
          </table>
        </div>
        <p><strong>Threads the course summary names</strong>, so they get said out loud when the earlier end comes up:</p>
        <ul className="ait-prose-list">
          <li>Unit 2 ends some equations at “no real solution.” Unit 5 gives those same equations complex solutions.</li>
          <li>Extraneous roots start in Unit 1, come back on Unit 2 Day 5, and return in Unit 3’s spiral review.</li>
          <li>Quadratics in Units 2 and 5 grow into polynomials in Unit 6, which is where Precalculus starts.</li>
        </ul>

        <h3 className="ait-h3">How it shows up every day</h3>
        <ul className="ait-prose-list">
          <li><strong>Fluency through retrieval.</strong> Each class opens with three questions on the previous class’s core topic.</li>
          <li><strong>Fluency through varied repetition.</strong> The practice sheet repeats the same skills across 8 sets with new numbers.</li>
          <li><strong>Connections, not procedures.</strong> Each class closes with a big-idea question answered in words, like “why does completing the square always work?”</li>
          <li><strong>Focus when time is short.</strong> The unit summary says which block can’t be rushed, so that’s the last thing to cut.</li>
          <li><strong>The course as one story.</strong> When a thread comes up, I can say where it goes next.</li>
        </ul>
      </article>

      <article className="ait-prose">
        <h2 className="ait-h2" id="rules">Read the rule files</h2>
        <p>
          These are the actual files the agent reads, published as they stood on October 16, 2026. File paths and names are
          generalized, and the unit summary is an excerpt. Click any file to read it.
        </p>
      </article>
      <RuleFiles />

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
            <strong>Correctness depends on two solvers:</strong> me and the model. Practice sheets can already be checked
            with a computer algebra system (sympy); doing that for every key would add a third.
          </li>
          <li>
            <strong>Some structural rules could be checked mechanically</strong> instead of trusted. Examples: odd answers
            matching the key, 8 practice sets with the same parts, unique note names.
          </li>
          <li>
            <strong>Only one course summary so far.</strong> Algebra 2 has one; Precalculus doesn’t yet.
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
