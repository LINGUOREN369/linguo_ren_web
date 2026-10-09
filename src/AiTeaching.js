import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/EdGrantAI.css';
import './styles/AiTeaching.css';

const storageMap = `Department's shared folder (OneDrive)      Word docs and PDFs for each unit
        │   Claude reads them; I never edit the originals
        ▼
Obsidian vault  (~/Obsidian/Vault, Markdown)
  ├─ CLAUDE.md + _claude/       the instructions
  ├─ Source Material/           copies of the handouts as given
  ├─ PC/ and A2A/               planning sheets, lesson plans,
  │                             worksheets, homework, keys
  └─ tools/build.py             the PDF script
        │   backed up automatically to a private GitHub repo
        │
        │   python3 tools/build.py …
        ▼
~/Documents/Ren PC 26-27/Unit 2/Day 3/      one folder per teaching day
        │   synced by OneDrive (A2A also copied to Google Drive)
        ▼
printer`;

const loadChain = `I type  claude  in the terminal
  │
  ├─ loads ~/.claude/CLAUDE.md               (global: loads in any folder)
  │    └─ which pulls in  Vault/CLAUDE.md    (who I teach, the reading rule,
  │         │                                  the task table)
  │         └─ which pulls in  _claude/format.md   (how everything looks)
  │
I type a request
  │
  ├─ Claude matches it to a row in the task table
  ├─ reads _claude/tasks/<that task>.md
  ├─ tells me which files it read
  └─ then reads whatever the task file points to:
       planning sheet → that day's notes → the source file`;

const traces = [
  {
    id: 'key',
    request: 'Write the answer key for this quiz PDF',
    steps: [
      ['Loads', 'The instruction chain above, before it even reads my request'],
      ['Matches', '“answer key” → reads _claude/tasks/answer-key.md'],
      ['Tells me', '“Read: format.md, tasks/answer-key.md”'],
      ['Reads', 'The PDF. It pulls the text and the position of every problem with pdftotext, and renders the pages as images to see the layout.'],
      ['Looks up', 'The course, unit, and day in my planning sheet, so the file gets the right name'],
      ['Solves', 'Every problem, checking each answer by substituting it back in'],
      ['Writes', 'A key note in Unit N/Solutions/, with red work placed in the blank space under each problem on the original page'],
      ['Runs', 'build.py, which makes the PDF in that day’s folder'],
      ['Checks', 'Renders each page to an image and looks for overlaps before telling me where the file is'],
    ],
    preview: 'key',
  },
  {
    id: 'quiz',
    request: 'Make a 10-minute pop quiz for tomorrow',
    steps: [
      ['Loads', 'The instruction chain'],
      ['Matches', '“quiz” → reads _claude/tasks/assessment.md'],
      ['Reads', 'The planning sheet, to see what has actually been taught, and the unit’s real quiz and review sheet'],
      ['Writes', 'The quiz note in Worksheets/ (header, points table, no hints) and its key with a rubric in Solutions/'],
      ['Links', 'Both files into tomorrow’s lesson plan, under Attachments'],
      ['Runs', 'build.py --day N, which puts the PDFs in tomorrow’s folder'],
      ['Checks', 'The student copy for answer-key language'],
    ],
    preview: 'quiz',
  },
  {
    id: 'plan',
    request: 'Plan Day 4 of the quadratics unit',
    steps: [
      ['Loads', 'The instruction chain'],
      ['Matches', '“lesson plan” → reads _claude/tasks/lesson-plan.md'],
      ['Reads', 'The planning sheet rows for Day 3 and Day 4 (what’s due, what didn’t land), the Day 3 plan, the Day 4 source files, and the unit summary'],
      ['Writes', 'Lesson Plans/A2A 2 Day 4 - ….md, with time blocks that add up to 60 minutes'],
      ['Links', 'The planning sheet’s “In Class” cell to the new plan'],
    ],
    preview: 'plan',
  },
  {
    id: 'hw',
    request: 'Write tonight’s homework',
    steps: [
      ['Loads', 'The instruction chain'],
      ['Matches', '“homework” → reads _claude/tasks/homework.md'],
      ['Reads', 'Today’s lesson plan, especially the “watch for” column'],
      ['Solves', 'Every problem before it goes in'],
      ['Writes', 'Homework/… Day N Homework.md, ending with the odd answers, and … Homework Solutions (Instructor).md'],
      ['Links', 'Both into today’s lesson plan'],
    ],
    preview: 'hw',
  },
];

const folderTree = `Teaching/                    ← one Obsidian vault, opened in Claude Code
  CLAUDE.md                  ← read automatically at the start of every session
  _claude/
    format.md                ← how everything should look
    tasks/
      lesson-plan.md  homework.md  assessment.md
      answer-key.md   build-unit.md  build-pdfs.md
  Source Material/           ← the department's files, archived as given
  PC/
    PC Planning Sheet.md
    Unit 2 - Polynomial and Rational Equations/
      Lesson Plans/  Worksheets/  Homework/  Solutions/
  tools/
    build.py                 ← notes → PDFs
    header-doc.tex           ← page style for the PDFs`;

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

@_claude/format.md`;

const formatMd = `## Homework: Check Your Work
Authored homework ends with the heading "## Check Your Work":
- final answers to odd-numbered problems only (5a–5d stay, 6a goes)
- no steps, written as "- **N.** answer"

## Answer keys: red pen on the original
Every key keeps the student handout's exact format, with the work
in red under each problem. Final answers boxed.
Precalculus: graph every polynomial on the key.

## Assessments
- Header on every page; name and date on page 1 only
- Points table on page 1; points on every problem
- No hints on the student copy
- A rubric in the instructor key`;

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

const prompts = [
  'Process the Unit 3 folder for Precalc. Plan it first, then build one day at a time.',
  'Write the answer key for this quiz PDF.',
  'Make an 8-point, 10-minute pop quiz for tomorrow on completing the square.',
  'Day 4 should start with homework review. Fix the times so they still add up to 60.',
  'From now on, homework ends with odd answers only. Add that to the rules.',
];

const corrections = [
  { said: '“Don’t use abbreviations like LCD.”', rule: 'No abbreviations students might not know.' },
  { said: '“Save time for homework review.”', rule: 'About 15 minutes of homework review after a homework night, and the times in a lesson plan have to add up to exactly 60 minutes.' },
  { said: '“Give them the answers so they get feedback right away.”', rule: 'Homework ends with answers to the odd problems only.' },
  { said: '“Keep the original format and write the answers in red.”', rule: 'Every key is a red-pen copy of the actual handout.' },
  { said: '“Graph every polynomial in Precalc.”', rule: 'Every Precalc key graphs each polynomial, with the vertex and intercepts marked.' },
  { said: '“Don’t tell them to check for extraneous solutions.”', rule: 'No hints on quizzes. Spotting the trap is part of the skill.' },
];

function Preview({ kind }) {
  if (kind === 'key') {
    return (
      <div className="ait-paper" aria-label="Sample answer key">
        <p className="ait-paper-q"><strong>3.</strong> Solve by completing the square: x² − 6x + 5 = 0</p>
        <div className="ait-red">
          <p>x² − 6x = −5</p>
          <p>x² − 6x + 9 = −5 + 9</p>
          <p>(x − 3)² = 4</p>
          <p>x − 3 = ±2</p>
          <p><span className="ait-boxed">x = 1, x = 5</span></p>
          <p className="ait-red-note">Grading note: watch for students who forget ±. They get only x = 5.</p>
        </div>
      </div>
    );
  }
  if (kind === 'quiz') {
    return (
      <div className="ait-paper" aria-label="Sample pop quiz">
        <p className="ait-paper-head">Ren Algebra 2 Accelerated · Pop Quiz</p>
        <table className="ait-table">
          <thead>
            <tr><th>Problem</th><th>Topic</th><th>Points</th></tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>Solve by factoring</td><td>2</td></tr>
            <tr><td>2</td><td>Complete the square</td><td>3</td></tr>
            <tr><td>3</td><td>Radical equation</td><td>3</td></tr>
            <tr><td></td><td><strong>Total</strong></td><td><strong>8</strong></td></tr>
          </tbody>
        </table>
        <p className="ait-paper-q"><strong>3.</strong> (3 pts) Solve: √(x + 7) = x + 1</p>
      </div>
    );
  }
  if (kind === 'plan') {
    const blocks = [
      ['0–15', 'Homework review: self-check, then only the 1–2 problems most students missed'],
      ['15–22', 'Warm-up: last class’s content gap'],
      ['22–45', 'Groups at the whiteboards: three problems they haven’t seen'],
      ['45–55', 'Mentoring: students who finish help the ones who are stuck'],
      ['55–60', 'Wrap-up: one group shares its approach, then homework is assigned'],
    ];
    return (
      <div className="ait-paper" aria-label="Sample lesson plan timeline">
        <p className="ait-paper-head">Day 4 · Completing the Square · 60 min</p>
        <ol className="ait-timeline">
          {blocks.map(([t, d]) => (
            <li key={t}><span className="ait-time">{t}</span><span>{d}</span></li>
          ))}
        </ol>
      </div>
    );
  }
  return (
    <div className="ait-paper" aria-label="Sample homework">
      <p className="ait-paper-q"><strong>1.</strong> x² + 8x + 7 = 0</p>
      <p className="ait-paper-q"><strong>2.</strong> x² − 10x = 11</p>
      <p className="ait-paper-q"><strong>3.</strong> √(2x + 3) = x</p>
      <p className="ait-paper-q"><strong>4.</strong> x² + 4x + 13 = 0</p>
      <div className="ait-check">
        <p className="ait-paper-head">Check Your Work</p>
        <p><strong>1.</strong> x = −1, −7</p>
        <p><strong>3.</strong> x = 3 (x = −1 is extraneous)</p>
      </div>
    </div>
  );
}


export default function AiTeaching() {
  const [active, setActive] = useState(traces[0].id);
  const trace = traces.find((t) => t.id === active);

  return (
    <div className="container edg-container ait-container">
      <header className="edg-hero">
        <h1 className="edg-title">How I Use AI to Prep My Math Classes</h1>
        <p className="edg-subtitle">
          A teacher’s notes on the setup: where everything lives, what happens when I ask for something, and why I built
          it this way.
        </p>
        <div className="edg-cta">
          <a href="#trace" className="portfolio-button edg-button-primary">See a request traced</a>
          <Link to="/project" className="portfolio-button portfolio-button--secondary" aria-label="Back to project list">
            Back to Projects
          </Link>
        </div>
      </header>

      <article className="ait-prose">
        <p>
          This year I’m teaching Precalculus and Accelerated Algebra 2 to 9th and 10th graders. Since August I’ve used
          Claude Code, an AI tool that works directly with the files on my laptop, to help with prep. I’m writing this for
          other teachers who are curious but don’t know where to start, so I’ll be specific about how it actually works.
        </p>
        <p>
          First, what it is and isn’t. The AI makes documents: lesson plans, homework, quizzes, answer keys. It doesn’t
          teach, and it doesn’t know my students. What it gives me is time back. Prep happens outside class, and less of
          that time now goes to typing answer keys and fixing spacing on worksheets. More of it goes to extra help, reading
          student work, advising, and thinking about how to teach something instead of how to format it.
        </p>
        <p>
          Eight weeks in, it has helped me build six units: 63 lesson plans, 88 homework sets, 73 answer keys, and a little
          over 300 printable PDFs.
        </p>

        <h2 className="ait-h2">Where everything lives</h2>
        <p>
          Everything moves in one direction: from the department’s files, into my notes, out to paper. The department
          shares each unit as Word documents and PDFs in OneDrive. Claude reads those, but nothing ever edits them. Copies
          of the handouts go into my Obsidian vault, which is just a folder of Markdown files on my laptop. That vault is
          the only place I keep anything I make: planning sheets, lesson plans, worksheets, homework, and keys. If I want to
          change something, I change it there.
        </p>
        <p>
          When I need paper, a Python script reads the vault and writes PDFs into a separate folder, one per teaching day.
          That folder is disposable. I never edit it, and I can rebuild it any time. It syncs through OneDrive.
        </p>
        <pre className="ait-tree ait-code">{storageMap}</pre>

        <h2 className="ait-h2">Where Claude finds its instructions</h2>
        <p>
          This is the part that made the biggest difference. Claude Code doesn’t remember anything between sessions on its
          own. What it does do is read a file called <code>CLAUDE.md</code> every time it starts. I have one in my home
          folder that just points to the one in my vault, so it loads no matter where I start Claude. The vault’s{' '}
          <code>CLAUDE.md</code> says who I teach and how long classes are, and it has a table: if you’re asked to write a
          lesson plan, read this file; homework, this file; a quiz, this one. It also pulls in <code>format.md</code>,
          which has every rule about how things should look.
        </p>
        <p>
          So when I ask for something, Claude already has my formatting rules loaded. It matches my request to a row in the
          table, reads that task’s file, tells me which files it read, and only then starts. The task file tells it where
          to look next: usually the planning sheet, then that day’s notes, then the source file.
        </p>
        <pre className="ait-tree ait-code">{loadChain}</pre>
        <p>
          It works with files using the same kinds of tools I would: it reads files, runs commands like{' '}
          <code>pdftotext</code> or my build script, and writes Markdown notes. Claude Code can be set to ask before it runs commands or changes files.
        </p>
      </article>

      <section className="edg-section" id="trace">
        <h2 className="edg-h2">What happens when I ask for something</h2>
        <p className="ait-demo-intro">Pick a request to see each step: what it reads, what it writes, and where things end up.</p>
        <div className="ait-demo-tabs" role="tablist" aria-label="Sample requests">
          {traces.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active === t.id}
              className={`ait-demo-tab${active === t.id ? ' is-active' : ''}`}
              onClick={() => setActive(t.id)}
            >
              “{t.request}”
            </button>
          ))}
        </div>
        <div className="ait-demo-panel" role="tabpanel">
          <div className="ait-demo-col">
            <ol className="ait-trace">
              {trace.steps.map(([verb, what], i) => (
                <li key={i}>
                  <span className="ait-trace-verb">{verb}</span>
                  <span>{what}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="ait-demo-col">
            <span className="edg-label">What comes out (sample)</span>
            <Preview kind={trace.preview} />
          </div>
        </div>
        <p className="ait-footnote">The samples use made-up problems. My real quizzes stay private.</p>
      </section>

      <article className="ait-prose">
        <h2 className="ait-h2">How the rules got there</h2>
        <p>
          I didn’t write any of this up front. For the first few weeks I kept saying the same things: more room between
          problems, no answers on the student copy, keep my quiz format. Each time I caught myself repeating something, I
          had Claude add it to the rules. Now <code>format.md</code> holds everything about how things look, and each file
          in <code>tasks/</code> holds the steps for one kind of job. A few of them, and what I originally said:
        </p>
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
        <h2 className="ait-h2">The choices behind it</h2>
        <h3 className="ait-h3">Lesson plans I can teach from</h3>
        <p>
          The first drafts read like documents about a lesson. I wanted something I could have open in class, so each plan
          is the day’s problems in the order I’ll use them, what each one is for, and the mistake to watch for. Days after
          homework start with about 15 minutes of homework review.
        </p>
        <h3 className="ait-h3">Homework from class, not the textbook</h3>
        <p>
          Textbook sets didn’t match what we actually covered. Now homework comes from what we did that day, including the
          tricky cases, and it’s sized to 25–40 minutes.
        </p>
        <h3 className="ait-h3">Odd answers only</h3>
        <p>
          Homework ends with answers to the odd problems. Students can check themselves that night, and the even ones still
          show me what they’re missing.
        </p>
        <h3 className="ait-h3">A pop quiz before the quiz</h3>
        <p>
          A short, low-stakes quiz the day before, announced ahead of time. Students get feedback before it counts, and I
          see what to go over.
        </p>
        <h3 className="ait-h3">Keys in red on the original</h3>
        <p>
          I do every problem and the homework myself first. The AI’s key is just there to catch my mistakes, the way any
          answer key is for a teacher. Having it in red on the same page I worked on makes that check quick. In Precalc it
          also graphs every polynomial.
        </p>

        <h2 className="ait-h2">Setting it up yourself</h2>
        <p>
          You need <strong>Claude Code</strong> (Anthropic’s AI agent; it runs in the terminal and needs a paid Claude
          plan) and <strong>Obsidian</strong> (free) for notes. The PDF part is optional and needs Python 3, pandoc, and a
          TeX install with XeLaTeX. I use BasicTeX on a Mac.
        </p>
        <p>Start with one folder for everything. Mine looks roughly like this:</p>
        <pre className="ait-tree ait-code">{folderTree}</pre>
        <p>
          Then write a short <code>CLAUDE.md</code> at the top of that folder. Mine is barely more than this. The{' '}
          <code>@</code> line at the bottom pulls another file in.
        </p>
        <pre className="ait-tree ait-code">{claudeMd}</pre>
        <p>
          Your <code>format.md</code> will start almost empty and grow every time you correct something. Here’s part of
          mine:
        </p>
        <pre className="ait-tree ait-code">{formatMd}</pre>
        <p>
          After that, open the folder in a terminal, type <code>claude</code>, and ask the way you’d ask a colleague. Some
          real requests from my first two months:
        </p>
        <ul className="ait-prompts">
          {prompts.map((t) => <li key={t}>“{t}”</li>)}
        </ul>
        <pre className="ait-tree ait-code">{commands}</pre>
        <p>
          The PDF script is the most technical piece. For each day on a unit’s pacing list, it collects that day’s notes,
          converts them with pandoc and XeLaTeX, and saves them in a folder for that day. Answer work in a note sits in an{' '}
          <code>[!answer]</code> callout under each problem. The script prints those in red on my copy and strips them from
          the student copy, then scans every student PDF for words like “answer key” before it finishes.
        </p>
        <pre className="ait-tree ait-code">{keyNote}</pre>

        <h2 className="ait-h2">What I don’t hand off</h2>
        <p>
          I do every problem myself before students see it. I decide what we cover, in what order, and how hard, because
          that depends on knowing the kids in the room. Anything with answers has “(Instructor)” in the file name. And the
          AI only works with curriculum materials, not student records.
        </p>

        <h2 className="ait-h2">What I’ve learned so far</h2>
        <p>
          The first draft was never the hard part. Getting things consistent was, and most of my early feedback was about
          format, not math. Once I started writing it down, I stopped having to repeat it, and each rule made the next
          request go smoother. By the third unit I was asking for a whole unit for both classes at once.
        </p>
        <p>
          If you try this, start with the one task you’re most tired of doing. For me that was answer keys. And keep the
          split clear: the AI is good at documents and has no idea who your students are.
        </p>
      </article>

      <footer className="edg-footer">
        <Link to="/project" className="portfolio-button">Back to Projects</Link>
      </footer>
    </div>
  );
}
