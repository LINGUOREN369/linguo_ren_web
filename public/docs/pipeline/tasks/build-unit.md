# Task: process a new unit (source folder → vault notes)

Read first: `_claude/format.md` (all of it), then `tasks/lesson-plan.md`, `tasks/homework.md`,
`tasks/answer-key.md`, and `tasks/assessment.md` for quiz days.
The detailed procedure is in `6. Zettelkasten/Reusable Workflow - Process a Complete Curriculum Unit`.
Its phases still apply, but **where it disagrees with `format.md`, `format.md` wins** (e.g. it
predates red-pen keys and Check Your Work).

Work in plan mode first for a whole unit, and process **one day at a time**, verifying each batch.

## Steps
0. **Read the course summary** (`<COURSE> Course Summary`): the course goals, where this unit
   sits in the arc, and the threads it carries in or sets up.
1. **Inventory** every file in the intake folder (see `CLAUDE.md`). Read each completely.
2. **Archive** the handouts as given in `2. Source Material/<COURSE> Unit N Attachments/`.
   Never delete or rename the intake files.
3. **Map to days** using the planning sheet. Guide day numbers don't map 1:1 to vault days, so link
   by worksheet number (`1.4`), never by row index.
4. For each day: wrapper notes (only when they reproduce content as text), lesson plan, homework,
   and keys.
5. **Pacing dashboard** `<COURSE> Unit <N> Pacing Dashboard` (Day | Lesson | Planned date |
   Status | Notes / where to continue). **Unit summary** `<COURSE> Unit <N> Summary`, written
   during the build, not after: the unit in one line; the arc and the one block never to compress; a
   day-by-day table with a **goal written as a capability** ("solve any quadratic whose squared
   quantity can be isolated, keeping both roots", not "square roots"); what the assessment turns
   on, ranked; and every flag from the source material. The summary also names **which course goals
   the unit serves** and **which threads** it picks up from earlier units or sets up for later ones.
   Then update the unit's row in the course summary.
6. Link the planning sheet's In Class cells to the built lessons.
7. Build PDFs only if asked → `tasks/build-pdfs.md`.

## Gotchas
- **`textutil` deletes every Word equation.** Unzip the `.docx` and parse `word/document.xml`,
  rendering `<w:t>` and `<m:oMath>` (`m:f`, `m:sSup`/`m:sSub`, `m:rad`; read delimiters from
  `m:dPr`, because absolute-value bars use the same element as parentheses).
- Verify every problem by solving it. A source really contained `-92` where `-9/2` was meant, so
  check the raw XML before "fixing".
- **PC `1.8` names two worksheets** (Solving Quadratics Day 2 and Regressions). Disambiguate by title.
- A2A intake uses the **dashed** folders ("Unit 2- Quadratics"). The underscore folders are a
  different 24–25 sequence.
- The "Source file is a `.docx` … reproduced below rather than embedded." sentence must sit on
  **one line** (the strip regex doesn't span line breaks).
