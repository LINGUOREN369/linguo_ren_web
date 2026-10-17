# Format — source of truth

**Every rule about how a document looks or is named lives here and nowhere else.** Task files in
`_claude/tasks/` say *what to do* and point back here for *how it looks*. If another note
(a Reusable Workflow note, an old lesson plan, a memory) disagrees with this file, this file wins.
When Mr. Ren gives a new formatting preference, add it here (see `CLAUDE.md` → Keeping this current).

---

## 1. File and note naming

### Generated PDFs (build output)

```
<COURSE> <UNIT#> Day <N> <major concepts covered> <type>.pdf

A2A 1 Day 5 Factoring and Rational, Quadratic, and Radical Equations HW.pdf
PC 1 Day 1 Linear Equations Classnote.pdf
PC 1 Day 1 Linear Equations HW Solution (Instructor).pdf
A2A 1 Day 6 Quiz 1 v1.pdf
```

- Files live in a `Day <N>/` folder, and the filename still carries the day, so a PDF stays
  identifiable once printed or emailed.
- **"Major concepts" is the day's lesson title.** Exceptions:
  - A resource **shared by more than one day** is named for **itself**, generated **once**, and
    filed under the first day that references it.
  - A classnote or solution on a **different topic** than the day keeps its own name.
- Squeeze out redundancy: drop a `Day N` inside the concepts; don't repeat a type the concepts
  already state (`Quiz 1 Linear Equations`, never `Quiz 1 Linear Equations Quiz 1`).
- **Type vocabulary:** `Lesson Plan` · `Classnote` · `HW` · `HW Check` · `Quiz <n>` ·
  `Quiz Review`, each optionally followed by `Solution`. `HW (Original)` = a teacher's
  pre-existing homework kept for reference.
- **`Solution` and `(Instructor)` are load-bearing.** Never drop them.
- One PDF per source note. Never bundle a day into one PDF.

### Vault notes

| Kind | Pattern | Example |
|---|---|---|
| Lesson plan | `<COURSE> <unit> Day <N> - <Title>` | `PC 3 Day 3 - Inverse Functions` |
| Worksheet / wrapper | `<COURSE> <N.M> <Type>` | `PC 2.1 Polynomial Functions Worksheet` |
| Answer key | `<COURSE> Solutions <N.M> <Title>` | `PC Solutions 2.1 Polynomial Functions` |
| Homework | `<COURSE> <unit> Day <N> Homework` | `A2A 2 Day 3 Homework` |
| Homework key | `<COURSE> <unit> Day <N> Homework Solutions (Instructor)` | |
| Unit summary | `<COURSE> Unit <N> Summary` | beside the pacing dashboard |
| Course summary | `<COURSE> Course Summary` | one per course, beside the planning sheet |

- PC Units 1–2 lesson plans predate the rule and are named `PC Day N - …`; leave them. Every new
  unit uses the `<COURSE> <unit> Day N` prefix.
- **Note names must be unique across the whole vault** (wikilinks are vault-global).
- Use "and", never "&", in folder names. Avoid `#` in filenames (Obsidian reads it as a heading).

### One-off files made outside the vault (e.g. a key for a PDF in Downloads)

Still use the PDF naming pattern above when the course/unit/day is known
(`PC 1 Day 12 Quiz 2 Solution (Instructor).pdf`). If it is not known, ask or look it up in the
planning sheet. Never invent suffixes like `_KEY`.

---

## 2. Writing style (all documents)

- **No abbreviations** students might not know: write "least common denominator", not "LCD".
- **Key formulas get a worked example beside them**, not just the formula.
- Use Obsidian LaTeX: inline `$…$`, display `$$…$$`.
- Clearly mark extraneous solutions, domain restrictions, units, and approximate answers on
  **instructor** material. (On student assessments, see §5: no hints.)

---

## 3. Student handouts (worksheets, classnotes, homework)

- **Space to work between problems.** `build.py` adds `header-work.tex`, which opens `\itemsep`
  inside **numbered** lists only. The gap is `\workgap` in
  `7. Teaching/tools/header-work.tex` (currently **2.2 cm**). Change it there, never per note.
  Bulleted lists (rules, notes) stay tight; instructor documents get no extra space.
- Homework sets lay out their own space with a `<br><br><br><br>` line after each problem; the
  author's layout wins over `\workgap`. Fractions need more room. If a page looks cramped, add more.
- Write lettered sub-parts as a real list (`a. Point-slope form`), **not** bullets with a typed
  letter (`- a. …`), so pandoc spaces them.
- **No answers, hints, or pointers to a key** on a student document. Teacher-only bookkeeping goes
  under `## Instructor Notes` (dropped from the handout). A callout inside `## Source Document`
  is *not* dropped.

### Homework: `## Check Your Work`

Authored homework ends with exactly the heading `## Check Your Work`:
- final answers to **odd-numbered problems only** (PC and A2A); sub-parts follow their parent
  (`5a`–`5d` stay, `6a` goes);
- no steps; numbered to match; agreeing with the `(Instructor)` key;
- each line written `- **N.** answer` (a bare `N.` list renumbers).
- Never use a heading ending in "Answer(s)", starting with "Solutions", or containing
  "instructor"/"answer key". Those are dropped from student PDFs and trip the leak check.

### Practice sheet (one per lesson plan)

Model to copy: `A2A 2.4 Choosing a Solving Method Practice Sets` (Unit 2 Worksheets).
- Note name `<COURSE> <N.M> <Title> Practice Sets`; key `<COURSE> Solutions <N.M> <Title> Practice Sets`.
- **8 sets**, each the same lettered parts in the same order with new numbers. One double-sided
  page: front = the sets, two columns, 0.4in side margins, 8.8pt (copy the model's LaTeX block);
  back = **every** answer (not odd-only) under `## Check Your Work`, one line per set, fractions
  written on one line like `x(x+3)/[(3x−1)(x−2)]`. No steps, no method names in the answers.
- **Review days** (and any review sheet): the same format. Each set has one lettered part per
  problem type on the upcoming quiz or test, in quiz order. **Sets 1, 3, 5, 7 are the easier
  version; Sets 2, 4, 6, 8 the harder one** (bigger or fractional coefficients, irrational answers,
  an extraneous root, an extra step). The sets are not labeled easy/hard on the student copy.

---

## 4. Answer keys: red pen on the original

**Every key keeps the student handout's exact format, with the work written in red under each
problem**, like a teacher's marked-up copy. Never a separately typeset document. This applies
to every key in both courses: worksheets, homework, quizzes, reviews, class notes.

- **Final answers boxed** (`\boxed{}`).
- Keep short *grading notes* (the specific mistake to watch for) inside the red work.
- **Precalculus: graph every polynomial/quadratic function** on the key, even when the problem
  only asks for an equation. Draw a red curve marking the vertex, intercepts, given points, and
  axis of symmetry where relevant. Problems that ask for a graph obviously get one. Use
  `7. Teaching/tools/answer_graph.py` for vault notes (embed the PNG), or TikZ on an overlay.
- **Handout is a vault note:** the key reproduces the student note verbatim and adds a
  `> [!answer]` callout under each problem, indented to the item's content column (3 spaces under
  `1.`, 6 under a nested `a.`). Drop the student note's `<br>` runs and its `## Check Your Work`.
  Keep a top line: `> [!danger] Instructor only — answer key for <student note>`.
- **Handout is an original PDF:** set `overlay: "<file>.pdf"` in frontmatter, and give each callout
  its position: `> [!answer] p<page> x<left> y<top> w<width>` (PDF points from the top-left; get
  positions from `pdftotext -bbox`). Keep every block inside the blank space below its problem.

---

## 5. Assessments (quizzes, mini/pop quizzes, reviews)

Model to copy: `7. Teaching/PC/Unit 1 - …/Worksheets/PC 1.4 Quiz 1 v2 (30 pt).md` and the A2A Unit 1 quiz.

- **Running header on every page:** `Ren <Precalculus|Algebra 2 Accelerated> Quiz <n>`, set with
  the `\fancyhead` block at the top of the note (see `header-doc.tex`).
- **Name and Date only on the first page.**
- **First page has a points summary table:** Problem | Topic | Points, with a Total row.
- State **points and minutes** at the top. Show points on every problem.
- Every quiz comes with a **rubric** (partial-credit breakdown per problem) in the instructor key.
- **No hints** on the student copy. Don't say "check for extraneous solutions" or name the method.
  The student has to recognize it.
- Intercepts must be written as points, `(0, y)` / `(x, 0)`. A bare number gets partial credit.
  Say so in one line in the instructions.
- **Reference page** (if any): only what was asked for, organized with headings and space, not
  stacked together.
- No graphs on a quiz unless the problem asks for one.
- Line breaks / horizontal rules between problems: don't use them.

Sizes Mr. Ren has used:

| Kind | Points | Time |
|---|---|---|
| Unit quiz | 30 (A2A/PC regular) | 30–45 min |
| Mini quiz | 8 | 10–15 min |
| Pop quiz (day before a quiz) | small, simple side but real enough to give feedback | 10 min |
| Review sheet | 8 practice sets, one part per quiz problem type, odd sets easier / even harder (§3) | ~40 min |

---

## 6. Lesson plans (layout)

The steps for writing one are in `tasks/lesson-plan.md`. This is the layout.

Since 2026-10-15 (new plans only; older plans keep their layout):

```
---
attachments:                                every resource for the day (build.py reads this);
  - "<practice sheet>"                  a frontmatter property, NOT a body section
  - "<practice sheet key>"
  - "<homework>" …
---
# Unit <N> Day <N>: <Title>
> **Unit:** … · **Duration:** 60 min · **Planning sheet:** <COURSE> Planning Sheet
> **Practice sheet:** <practice sheet> · key <practice sheet key>

## Opening Questions                        3, on the core topic of the previous class
| # | Question | Answer | What it checks |
## Problem Walkthrough — Go Through in This Order
| # | Problem | Answer | Emphasis — what this problem teaches | Watch for |
## Common Questions                         the top 8 conceptual Q&As
## Closing Questions                        1–2 big-idea questions, each with the idea to hear
## Homework                                 + "At Home" assignment
## Notes                                    optional, teacher bookkeeping
```

- **No `## Attachments` section, no Objectives, and no timed class-structure blocks** (Opening,
  HW Review, Warm-Up, Wrap-Up, `(0–5 min)` headings). Opening and Closing Questions are question
  lists, not timed blocks.
- Answers in the walkthrough table are **final answers only**.
- Lesson plans PDFs use `header-lp.tex` (smaller table text so the 5-column table fits).
- **Assessment days:** no walkthrough table, no Answer column, no Common Questions (they would
  sit next to the quiz in the vault), no practice sheet, and no Opening or Closing Questions.

---

## 7. PDF look (build output)

- Page number bottom center (`header-doc.tex`); running headers off unless a note turns them on.
- Before shipping, render every PDF (`pdftoppm`) and **look at it**: math renders, tables aren't
  clipped, no `wikilinks`, visible writing space, red work doesn't overlap printed text.
