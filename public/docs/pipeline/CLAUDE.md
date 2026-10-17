# Curriculum work in this vault

Mr. Ren teaches **Precalculus (`PC`)** and **Accelerated
Algebra 2 (`A2A`)**, 9th–10th grade. **Every class is 60 minutes.** Homework is sized to
**25–40 minutes.**

## ⚠️ Required: read the rules before every task

**Before creating, editing, or generating any PC/A2A material (in this vault or anywhere else,
including PDFs in Downloads), you MUST:**

1. **Identify the task type** using the table below. A request can be several types (e.g. a quiz
   *and* its key). Read every file that applies.
2. **Read `_claude/format.md`** (loaded below) **and every task file** listed for that type, in
   full, before starting. Don't work from memory of an earlier session. The files change.
3. **Say which files you read** in one short line before starting the work
   (e.g. "Read: format.md, tasks/assessment.md, tasks/answer-key.md").
4. If no row fits, read `format.md` plus the closest task file, and ask if anything is unclear.

| When asked to…                                                                 | Read                                                                           |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| write or change a **lesson plan**, plan a class, reorder or merge days         | `tasks/lesson-plan.md`                                                         |
| write **homework** or practice                                                 | `tasks/homework.md`                                                            |
| write a **quiz**, mini/pop quiz, **review sheet**, exit ticket, rubric         | `tasks/assessment.md`                                                          |
| write a **solution / answer key** for anything (vault note, PDF, photo, eText) | `tasks/answer-key.md`                                                          |
| **process a new unit** from the source folder                                  | `tasks/build-unit.md` (+ the files it lists)                                   |
| **build / print PDFs**, mirror to Google Drive                                 | `tasks/build-pdfs.md`                                                          |
| quick math question, teaching advice, an email                                 | nothing required, but follow `format.md` §2 if you write anything for students |

**Rule priority:** `_claude/format.md` → `_claude/tasks/*` → this file → everything else. If an older
note (the Reusable Workflow notes, an old lesson plan) disagrees, the `_claude/` files win.

@_claude/format.md

## Keeping this current

When Mr. Ren states a new preference or correction ("from now on…", "I don't like…", "always…"):
1. Put it in **one** place: how something *looks* → `_claude/format.md`. How to *do* a task →
   the matching `_claude/tasks/` file. Facts about the course or classroom → this file.
2. Tell him in one line which file you changed. Never record the same rule in two places.
   Link to it instead.

## Classroom model (2026–27)

- **No note-taking.** Students focus on the whiteboards. **All notes are posted on Canvas.**
- **Group work at the whiteboards**, tables in the middle. Class time = groups solving **unseen
  problems**, not lecture, plus **mentoring** (fast students help students who are struggling).
- **Individual work happens at home.** Class is where students struggle and think with peers.
- **Homework at the board from scratch.** Students redo problems without notebooks.
- **Pop quiz the day before each real quiz**, announced the day before, for feedback.
- **Odd-only answers** at the end of homework, so students check themselves and Mr. Ren sees what they miss.

## Where things live

```
INTAKE ── the course materials folder for each course (Word and PDF)
  Curated, aligned with the school's goals for the course. NEVER deleted or renamed.
        │
        ▼
SOURCE OF TRUTH ── this vault, 7. Teaching/
  Planning sheets, lesson plans, worksheets, solutions, homework.
  2. Source Material/<COURSE> Unit N Attachments/ archives handouts as given.
        │
        ▼  7. Teaching/tools/build.py   (only when something needs printing)
BUILD OUTPUT ── ~/Documents/Ren <COURSE> 26-27/<Unit>/Day <N>/   (disposable, never hand-edit)
```

```
7. Teaching/
  tools/        build.py · answer_graph.py · answer-graphs/ · header-doc/lp/work.tex
  PC/  and  A2A/
    <COURSE> Planning Sheet.md        ← pacing record for the year
    <COURSE> Course Summary.md        (course goals, the year's unit arc, threads between units)
    <COURSE> Unit <N> Pacing Dashboard.md   (where are we?)
    <COURSE> Unit <N> Summary.md            (why is the unit shaped this way?)
    Unit <N> - <Title>/  Lesson Plans/  Worksheets/  Solutions/  Homework/
```

Work in Obsidian by default.

### Planning sheets
Columns: `| # | Date | Due before Class | In Class | Materials Covered | Notes | Content Gap |`
- **"Due before Class" = handed in at the START of that day** (assigned the class before).
- **Content Gap** = what didn't land. Fold it into the next day's first walkthrough problems and practice sheet.
- A **linked** In Class cell = lesson built. Plain text = not yet processed.
- PC's sheet merges the live xlsx rows with the rest of the year from
  the course planning guide. A2A's sheet is
  the only record.

## Safety (never break these)

- **Student privacy is the core rule of this workflow (school policy).** Never ask for, accept,
  store, or write student names, grades, or student work. If a file or message contains any, stop,
  don't save or quote it, and tell Mr. Ren. Class needs are described by topic ("the mini quiz
  showed completing the square needs work"), never by student.
- Never put an answer key, worked steps, or a pointer to a key on a student-facing document. The one
  exception is homework's `## Check Your Work` (odd final answers only; see `format.md` §3).
- `Solution` and `(Instructor)` stay in instructor filenames.
- Never delete or rename intake/source files. Never delete Mr. Ren's notes or edits.
- `build.py` checks every student PDF for leaked answers. Read its report.
- Verify every math answer by solving it.

## Related
- Reusable Workflow - Process a Complete Curriculum Unit (detailed procedure; `_claude/` wins on conflicts)
- Reusable Workflow - Export Unit Notes to Organized PDFs (build internals)
