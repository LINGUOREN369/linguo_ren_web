import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/EdGrantAI.css';
import './styles/AiTeaching.css';

const stats = [
  { value: '2', label: 'courses: Precalculus and Accelerated Algebra 2' },
  { value: '6', label: 'units built out' },
  { value: '63', label: 'lesson plans' },
  { value: '88', label: 'homework sets' },
  { value: '73', label: 'answer keys' },
  { value: '312', label: 'printable PDFs' },
];

const timeGoesTo = [
  'Extra help and office hours',
  'Actually reading student work and writing feedback',
  'Advising and student activities',
  'Thinking about how to teach something, instead of how to format it',
];

const uses = [
  {
    title: 'Building out units',
    body: 'I give it the department’s files for a unit, and it drafts lesson plans, class notes, and homework for each day. Then I go through and change whatever doesn’t fit my class.',
  },
  {
    title: 'Quizzes and reviews',
    body: 'Quizzes, review sheets, exit tickets, and a short pop quiz the day before each quiz. I tell it the points and the minutes, and it includes a rubric.',
  },
  {
    title: 'Answer keys (just for me)',
    body: 'It writes the solutions in red right on the original handout, the way I’d mark up a copy myself. In Precalc it graphs every polynomial too. Students never see these.',
  },
  {
    title: 'Odd answers for students',
    body: 'Homework ends with the answers to the odd problems only, so students can check themselves at home. The even ones are on them.',
  },
  {
    title: 'Thinking out loud about teaching',
    body: 'Sometimes I just ask how to approach a topic, like how to build factoring up from the greatest common factor, before I decide how I’ll teach it.',
  },
];

const pipeline = [
  { step: 'The department’s files', body: 'Word docs, PDFs, and scans. I never edit the originals.' },
  { step: 'My notes', body: 'Everything I make lives in one Obsidian vault: planning sheets, lesson plans, worksheets, homework, and keys.' },
  { step: 'A rules folder', body: 'A few files that spell out how I want things to look and how each kind of task should go. The AI reads them before it starts.' },
  { step: 'PDFs', body: 'A script turns a unit into print-ready PDFs, one folder per day, and checks that no answers slipped into a student copy.' },
];

const corrections = [
  { said: '“Don’t use abbreviations like LCD.”', rule: 'No abbreviations students might not know.' },
  { said: '“Save time for homework review.”', rule: 'About 15 minutes of homework review after a homework night, and the times in a lesson plan have to add up to exactly 60 minutes.' },
  { said: '“Give them the answers so they get feedback right away.”', rule: 'Homework ends with answers to the odd problems only.' },
  { said: '“Keep the original format and write the answers in red.”', rule: 'Every key is a red-pen copy of the actual handout.' },
  { said: '“Graph every polynomial in Precalc.”', rule: 'Every Precalc key graphs each polynomial, with the vertex and intercepts marked.' },
  { said: '“Don’t tell them to check for extraneous solutions.”', rule: 'No hints on quizzes. Spotting the trap is part of the skill.' },
];

const demos = [
  {
    id: 'key',
    request: 'Write the answer key for this quiz PDF',
    task: 'Answer key',
    reads: ['format.md §1 Naming', 'format.md §4 Red pen on the original', 'tasks/answer-key.md'],
    rules: [
      'Keep the quiz exactly as printed and write the work in red under each problem',
      'Solve every problem and check by substituting the answer back in',
      'Precalculus: graph every quadratic and label the vertex and intercepts',
      'Render every page and confirm nothing overlaps the printed text',
      'Name the file … Quiz 2 Solution (Instructor).pdf',
    ],
    preview: 'key',
  },
  {
    id: 'quiz',
    request: 'Make a 10-minute pop quiz for tomorrow',
    task: 'Assessment',
    reads: ['format.md §5 Assessments', 'tasks/assessment.md', 'Planning sheet (what has been taught)'],
    rules: [
      'Only test what has already been taught',
      'Keep it on the simple side but challenging enough to give real feedback',
      'Points on every problem and a points table on page 1',
      'No hints on the student copy',
      'A rubric in the instructor key',
    ],
    preview: 'quiz',
  },
  {
    id: 'plan',
    request: 'Plan Day 4 of the quadratics unit',
    task: 'Lesson plan',
    reads: ['format.md §6 Lesson plan layout', 'tasks/lesson-plan.md', 'Planning sheet + Day 3 plan'],
    rules: [
      'Homework was due today, so the plan opens with 15 minutes of homework review',
      'Groups work through problems they haven’t seen at the whiteboards, not lecture',
      'Time blocks fill the 60 minutes with no gaps',
      'Fold last class’s “Content Gap” into the warm-up',
    ],
    preview: 'plan',
  },
  {
    id: 'hw',
    request: 'Write tonight’s homework',
    task: 'Homework',
    reads: ['format.md §3 Student handouts', 'tasks/homework.md', 'Today’s lesson plan'],
    rules: [
      'Built from what was taught today, not the textbook',
      'Include the tricky cases flagged in the lesson (no solution, extraneous root)',
      'Sized to 25–40 minutes for 9th and 10th graders',
      'Every problem solved before it goes in',
      'Ends with “Check Your Work”: odd-numbered answers only',
    ],
    preview: 'hw',
  },
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
  const [active, setActive] = useState(demos[0].id);
  const demo = demos.find((d) => d.id === active);

  return (
    <div className="container edg-container ait-container">
      <header className="edg-hero">
        <h1 className="edg-title">How I Use AI to Prep My Math Classes</h1>
        <p className="edg-subtitle">
          Notes from my first two months teaching Precalculus and Algebra 2 with an AI assistant: what I use it for,
          what I don’t, and what I’ve figured out so far.
        </p>
        <div className="edg-cta">
          <a href="#demo" className="portfolio-button edg-button-primary">Try the demo</a>
          <Link to="/project" className="portfolio-button portfolio-button--secondary" aria-label="Back to project list">
            Back to Projects
          </Link>
        </div>
      </header>

      <section className="edg-section">
        <article className="edg-card ait-lede">
          <p>
            This year I’m teaching Precalculus and Accelerated Algebra 2 to 9th and 10th graders. Since August, I’ve been
            using Claude Code, an AI tool that can work directly with the files on my laptop, to help with prep. It reads
            the department’s materials, writes into my notes in Obsidian, and makes the PDFs I print.
          </p>
          <p>
            I want to be upfront about what this is and isn’t. The AI makes documents. It doesn’t teach, and it doesn’t
            know my students. What it gives me is time back, and at a school where relationships come first, that matters.
          </p>
          <p>Eight weeks in, here’s what’s in the folder:</p>
        </article>
        <div className="ait-stats" role="list">
          {stats.map((s) => (
            <div className="ait-stat" role="listitem" key={s.label}>
              <span className="ait-stat-value">{s.value}</span>
              <span className="ait-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
        <p className="ait-footnote">That’s across about 200 requests, for both courses.</p>
      </section>

      <section className="edg-section">
        <h2 className="edg-h2">So where does the time go?</h2>
        <article className="edg-card ait-lede">
          <p>
            Prep happens outside class: nights, weekends, free periods. I still do plenty of it, but less of it is typing up
            answer keys and fixing the spacing on worksheets. That time goes to:
          </p>
          <ul>
            {timeGoesTo.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </article>
      </section>

      <section className="edg-section">
        <h2 className="edg-h2">What I actually use it for</h2>
        <div className="ait-grid">
          {uses.map((u) => (
            <article className="ait-tile" key={u.title}>
              <h3 className="edg-card-title">{u.title}</h3>
              <p>{u.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="edg-section">
        <h2 className="edg-h2">How it’s set up</h2>
        <ol className="ait-pipeline">
          {pipeline.map((p, i) => (
            <li className="ait-pipe-step" key={p.step}>
              <span className="edg-label">{i + 1}</span>
              <h3 className="edg-card-title">{p.step}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="edg-section">
        <h2 className="edg-h2">Writing the rules down</h2>
        <article className="edg-card ait-lede">
          <p>
            For the first few weeks I kept saying the same things: more room between problems, no answers on the student
            copy, keep my quiz format. The AI forgets all of that when a session ends. So I started writing it down.
          </p>
          <p>
            Now there’s one file for how things should look, one file for each kind of task, and a main file that tells the
            AI to read the right ones before it does anything, and to tell me which ones it read.
          </p>
        </article>
        <pre className="ait-tree" aria-label="Rules folder structure">{`CLAUDE.md            the main file, plus "read the rules first"
_claude/
  format.md          how everything should look
  tasks/
    lesson-plan.md   homework.md   assessment.md
    answer-key.md    build-unit.md build-pdfs.md`}</pre>
        <h3 className="edg-card-title ait-subhead">Things I kept saying, now written down</h3>
        <div className="ait-corrections">
          {corrections.map((c) => (
            <div className="ait-correction" key={c.rule}>
              <p className="ait-said">{c.said}</p>
              <p className="ait-rule">{c.rule}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="edg-section" id="demo">
        <h2 className="edg-h2">Try it: what happens when I ask for something</h2>
        <p className="ait-demo-intro">Pick a request. You’ll see which files it reads, which rules kick in, and a sample of what comes out.</p>
        <div className="ait-demo-tabs" role="tablist" aria-label="Sample requests">
          {demos.map((d) => (
            <button
              key={d.id}
              type="button"
              role="tab"
              aria-selected={active === d.id}
              className={`ait-demo-tab${active === d.id ? ' is-active' : ''}`}
              onClick={() => setActive(d.id)}
            >
              “{d.request}”
            </button>
          ))}
        </div>
        <div className="ait-demo-panel" role="tabpanel">
          <div className="ait-demo-col">
            <span className="edg-label">1 · What kind of task</span>
            <p className="ait-task">{demo.task}</p>
            <span className="edg-label">2 · Files it reads first</span>
            <ul className="ait-reads">
              {demo.reads.map((r) => <li key={r}><code>{r}</code></li>)}
            </ul>
            <span className="edg-label">3 · Rules that kick in</span>
            <ul className="ait-rules">
              {demo.rules.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </div>
          <div className="ait-demo-col">
            <span className="edg-label">4 · What comes out (sample)</span>
            <Preview kind={demo.preview} />
          </div>
        </div>
        <p className="ait-footnote">These are made-up problems. My real quizzes stay private.</p>
      </section>

      <section className="edg-section">
        <h2 className="edg-h2">What I don’t hand off</h2>
        <div className="ait-grid">
          <article className="ait-tile">
            <h3 className="edg-card-title">I work every problem first</h3>
            <p>Before an answer key or practice problem gets anywhere near students, I work it myself. The AI checks its answers by plugging them back in, but that doesn’t replace me doing it.</p>
          </article>
          <article className="ait-tile">
            <h3 className="edg-card-title">I decide what gets taught</h3>
            <p>The AI drafts. I decide what we cover, in what order, and how hard. That depends on knowing the kids in the room, and it doesn’t.</p>
          </article>
          <article className="ait-tile">
            <h3 className="edg-card-title">Keys stay with me</h3>
            <p>Anything with answers has “(Instructor)” in the file name, and the build script checks every student copy for answer-key language before it finishes.</p>
          </article>
          <article className="ait-tile">
            <h3 className="edg-card-title">No student records</h3>
            <p>It only works with curriculum materials: handouts, plans, and keys. Not student records.</p>
          </article>
        </div>
      </section>

      <section className="edg-section">
        <h2 className="edg-h2">What I’ve learned so far</h2>
        <article className="edg-card ait-lede">
          <ol className="ait-lessons">
            <li><strong>The first draft was never the hard part.</strong> Getting things consistent was. Most of my early feedback was about format, not math. Once I wrote it down, I stopped having to repeat it.</li>
            <li><strong>It gets easier.</strong> Every rule I add makes the next request go smoother. By the third unit I was asking for a whole unit for both classes at once.</li>
            <li><strong>It’s good at documents, not at knowing kids.</strong> So I let it do the documents and try to protect my time for the students.</li>
          </ol>
        </article>
      </section>

      <footer className="edg-footer">
        <Link to="/project" className="portfolio-button">Back to Projects</Link>
      </footer>
    </div>
  );
}
