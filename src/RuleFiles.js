import React, { useState } from 'react';

const BASE = process.env.PUBLIC_URL + '/docs/pipeline/';

const GROUPS = [
  {
    title: 'The index and the format spec',
    files: [
      { path: 'CLAUDE.md', note: 'Loaded every session: who I teach, the reading rule, the routing table, the classroom model, and the safety rules.' },
      { path: 'format.md', note: 'The only place formatting rules live: naming, handouts, practice sheets, red-pen keys, quizzes, lesson plan layout.' },
    ],
  },
  {
    title: 'Task procedures',
    files: [
      { path: 'tasks/lesson-plan.md', note: 'Opening Questions, the problem walkthrough, Common Questions, Closing Questions, and a practice sheet.' },
      { path: 'tasks/homework.md', note: 'Built from what was actually covered and what the last quiz showed.' },
      { path: 'tasks/assessment.md', note: 'Quizzes, pop quizzes, review sheets, exit tickets.' },
      { path: 'tasks/answer-key.md', note: 'Red work on the original handout, every answer checked.' },
      { path: 'tasks/build-unit.md', note: 'Turning a unit’s class materials into notes, starting from the course summary.' },
      { path: 'tasks/build-pdfs.md', note: 'Running the build and checking the output.' },
    ],
  },
  {
    title: 'The planning layer',
    files: [
      { path: 'A2A Course Summary.md', note: 'Course goals, the semester’s unit arc, threads between units, and how it’s used day to day.' },
      { path: 'A2A Unit 2 Summary.md', note: 'One unit: its line, its arc, the block never to compress, and a goal for every day. (Excerpt.)' },
    ],
  },
];

function RuleFile({ path, note }) {
  const [text, setText] = useState(null);
  const [failed, setFailed] = useState(false);
  const url = BASE + path.split('/').map(encodeURIComponent).join('/');

  const onToggle = (e) => {
    if (!e.currentTarget.open || text !== null) return;
    fetch(url)
      .then((r) => (r.ok ? r.text() : Promise.reject()))
      .then(setText)
      .catch(() => setFailed(true));
  };

  return (
    <details className="rf-file" onToggle={onToggle}>
      <summary>
        <code className="rf-path">{path}</code>
        <span className="rf-note">{note}</span>
      </summary>
      <div className="rf-body">
        {failed ? (
          <p>Couldn’t load this file. <a href={url} target="_blank" rel="noopener noreferrer">Open it directly.</a></p>
        ) : text === null ? (
          <p className="rf-loading">Loading…</p>
        ) : (
          <>
            <pre>{text}</pre>
            <a className="rf-raw" href={url} target="_blank" rel="noopener noreferrer">Open the file</a>
          </>
        )}
      </div>
    </details>
  );
}

export default function RuleFiles() {
  return (
    <div className="rf">
      {GROUPS.map((g) => (
        <div className="rf-group" key={g.title}>
          <span className="edg-label">{g.title}</span>
          {g.files.map((f) => <RuleFile key={f.path} {...f} />)}
        </div>
      ))}
    </div>
  );
}
