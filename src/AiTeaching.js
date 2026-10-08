import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/EdGrantAI.css';
import './styles/AiTeaching.css';

const stats = [
  { value: '2', label: 'courses: Precalculus and Accelerated Algebra 2' },
  { value: '6', label: 'units built end to end' },
  { value: '63', label: 'lesson plans' },
  { value: '88', label: 'homework sets' },
  { value: '73', label: 'answer keys' },
  { value: '312', label: 'printable PDFs' },
];

const uses = [
  {
    title: 'Lessons built from my actual class',
    body: 'Lesson plans, class notes, and homework built from what this class did today, not from a generic textbook sequence, with time set aside to go back over what didn’t land.',
  },
  {
    title: 'Feedback before it counts',
    body: 'Low-stakes pop quizzes the day before a quiz, review sheets with two practice problems for every quiz problem, and exit tickets, so students know where they stand while there is still time to act on it.',
  },
  {
    title: 'Answer keys that show thinking',
    body: 'Keys written in red on the original handout, with every step shown and every answer checked, so students can follow the reasoning and see exactly where theirs went differently.',
  },
  {
    title: 'More ways to explain it',
    body: 'When an explanation doesn’t land, I use AI to think through other ways in: a different representation, a counterexample, or the misconception behind a common mistake. That way I can meet each student with an approach that fits how they think.',
  },
  {
    title: 'A classroom built on each other',
    body: 'Planning a classroom built around group work at the whiteboards and peer mentoring, where students learn from each other and I can spend the period moving between groups and listening.',
  },
];

const relational = [
  {
    title: 'Time moves into the room',
    body: 'The hours I don’t spend typing keys and reformatting worksheets go to circulating during group work, listening to how students are thinking, and checking in with the ones who are quiet.',
  },
  {
    title: 'Start from where the class is',
    body: 'My planning sheet has a “Content Gap” column for what a class didn’t land. The next warm-up starts there, and homework is built from what that class actually did and sized for 9th and 10th graders.',
  },
  {
    title: 'Students can check themselves',
    body: 'Homework ends with answers to the odd-numbered problems only. Students get feedback the same night, and the even problems show me who needs a conversation the next day.',
  },
  {
    title: 'Ask, don’t tell',
    body: 'Every group problem comes with two or three hint questions, so I can meet a stuck student with a question that fits where they are instead of giving them the answer.',
  },
];

const pipeline = [
  {
    step: 'Intake',
    body: 'Department source files (Word documents, PDFs, scans). They are never edited or renamed.',
  },
  {
    step: 'Vault',
    body: 'An Obsidian vault is the single source of truth: planning sheets, lesson plans, worksheets, homework, and keys, all linked to each other.',
  },
  {
    step: 'Rules',
    body: 'A rules folder tells the AI how every document should look and how every task should be done. It is read before any work starts.',
  },
  {
    step: 'Build',
    body: 'A Python build script turns a unit into one folder of print-ready PDFs per teaching day, then checks every student copy for leaked answers.',
  },
];

const corrections = [
  { said: '“Don’t use abbreviations like LCD.”', rule: 'No unexplained abbreviations in any student document.' },
  { said: '“Save time for homework review.”', rule: 'About 15 minutes of homework review after every homework day. Time blocks must fill the 60-minute class exactly.' },
  { said: '“Give students the answers so they get feedback right away.”', rule: 'Homework ends with answers to the odd-numbered problems only. The even ones show me what students are missing.' },
  { said: '“Keep the original format and write the answers in red.”', rule: 'Every key is a red-pen copy of the actual handout, never a separately typed document.' },
  { said: '“Graph every polynomial in Precalc.”', rule: 'Every Precalculus key graphs each polynomial, marking the vertex, the intercepts, and the axis of symmetry.' },
  { said: '“Don’t tell them to check for extraneous solutions.”', rule: 'No hints on quizzes. Recognizing the trap is part of the skill.' },
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
      '2–3 hint questions per problem so the teacher guides without explaining',
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
        <h1 className="edg-title">AI in My Math Classroom</h1>
        <p className="edg-subtitle">
          How I use an AI assistant to take on the paperwork of teaching math, so more of my time and attention
          goes to students: knowing them, noticing where they are, and meeting them there.
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
            I teach Precalculus and Accelerated Algebra 2 to 9th and 10th graders, in 60-minute classes. Since August 2026
            I have used Claude Code, an AI agent that works directly with files on my computer, as a curriculum
            collaborator. It reads my source materials, writes into my Obsidian notes, and builds the PDFs I print.
          </p>
          <p>
            I teach at a school where relationships come first. So the question was never whether AI could write a
            worksheet. It was whether it could <strong>give me back time and attention for students</strong> without
            coming between us. The answer depended on keeping AI on the materials and keeping the people work human.
          </p>
        </article>
        <div className="ait-stats" role="list">
          {stats.map((s) => (
            <div className="ait-stat" role="listitem" key={s.label}>
              <span className="ait-stat-value">{s.value}</span>
              <span className="ait-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
        <p className="ait-footnote">Materials built for the 2026–27 school year in the first eight weeks, across about 200 requests.</p>
      </section>

      <section className="edg-section">
        <h2 className="edg-h2">More time with students, not less</h2>
        <div className="ait-grid">
          {relational.map((r) => (
            <article className="ait-tile" key={r.title}>
              <h3 className="edg-card-title">{r.title}</h3>
              <p>{r.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="edg-section">
        <h2 className="edg-h2">Where AI helps</h2>
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
        <h2 className="edg-h2">How it works</h2>
        <ol className="ait-pipeline">
          {pipeline.map((p, i) => (
            <li className="ait-pipe-step" key={p.step}>
              <span className="edg-label">Step {i + 1}</span>
              <h3 className="edg-card-title">{p.step}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="edg-section">
        <h2 className="edg-h2">Rules, not prompts</h2>
        <article className="edg-card ait-lede">
          <p>
            Early on I gave the same feedback again and again: more space between problems, no answers on the student
            copy, keep my quiz format. A prompt is forgotten when the session ends. A rule file isn’t. So the vault has
            one file for <strong>how things look</strong>, one file per <strong>task</strong> describing how to do it,
            and an index that <strong>requires the AI to read the relevant files before every task</strong> and name
            them before it starts.
          </p>
        </article>
        <pre className="ait-tree" aria-label="Rules folder structure">{`CLAUDE.md            index, plus the required reading rule
_claude/
  format.md          the only place formatting rules live
  tasks/
    lesson-plan.md   homework.md   assessment.md
    answer-key.md    build-unit.md build-pdfs.md`}</pre>
        <h3 className="edg-card-title ait-subhead">Every correction becomes a rule</h3>
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
        <h2 className="edg-h2">Demo: one request, step by step</h2>
        <p className="ait-demo-intro">Pick a request to see which rule files the assistant reads, what it applies, and a sample of what it produces.</p>
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
            <span className="edg-label">1 · Identify the task</span>
            <p className="ait-task">{demo.task}</p>
            <span className="edg-label">2 · Read before starting</span>
            <ul className="ait-reads">
              {demo.reads.map((r) => <li key={r}><code>{r}</code></li>)}
            </ul>
            <span className="edg-label">3 · Rules applied</span>
            <ul className="ait-rules">
              {demo.rules.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </div>
          <div className="ait-demo-col">
            <span className="edg-label">4 · Output (sample)</span>
            <Preview kind={demo.preview} />
          </div>
        </div>
        <p className="ait-footnote">The samples use made-up problems. Real assessments stay private.</p>
      </section>

      <section className="edg-section">
        <h2 className="edg-h2">What stays human</h2>
        <div className="ait-grid">
          <article className="ait-tile">
            <h3 className="edg-card-title">Conversations are mine</h3>
            <p>Checking in, encouraging, and working through a hard moment with a student happen face to face, not through AI.</p>
          </article>
          <article className="ait-tile">
            <h3 className="edg-card-title">Student information stays out</h3>
            <p>AI works from curriculum materials: handouts, plans, and keys, not student records.</p>
          </article>
          <article className="ait-tile">
            <h3 className="edg-card-title">I stay the teacher</h3>
            <p>AI drafts. I review everything before students see it, and I decide what is taught, in what order, and how hard it is, based on what I know about the students in front of me.</p>
          </article>
          <article className="ait-tile">
            <h3 className="edg-card-title">Students still do the thinking</h3>
            <p>Class time goes to problems students haven’t seen, worked out together at the whiteboards, with peers mentoring peers.</p>
          </article>
          <article className="ait-tile">
            <h3 className="edg-card-title">I work every problem first</h3>
            <p>Before any answer key or practice problem reaches students, I work through it myself. AI also checks each answer by solving it and substituting back in, because a wrong key costs a student’s trust.</p>
          </article>
          <article className="ait-tile">
            <h3 className="edg-card-title">Keys never reach students by accident</h3>
            <p>Instructor files carry “(Instructor)” in their names, and the build script scans every student copy for answer-key language.</p>
          </article>
        </div>
      </section>

      <section className="edg-section">
        <h2 className="edg-h2">What I’ve learned</h2>
        <article className="edg-card ait-lede">
          <ol className="ait-lessons">
            <li><strong>Writing the first draft is rarely the hard part. Consistency is.</strong> Most of my feedback was about format and structure, not the math. Once that feedback was written into rule files, it stopped coming up.</li>
            <li><strong>Corrections add up.</strong> Each rule makes the next request easier. By the third unit, I was asking for a whole unit for both courses at once instead of building it file by file.</li>
            <li><strong>The best use of AI is giving back attention.</strong> It doesn’t replace knowing students. It clears enough of the paperwork that I have room to notice where each one is.</li>
          </ol>
        </article>
      </section>

      <footer className="edg-footer">
        <Link to="/project" className="portfolio-button">Back to Projects</Link>
      </footer>
    </div>
  );
}
