# Task: write or revise a lesson plan

Read first: `_claude/format.md` §1 (naming), §2 (style), §6 (lesson plan layout).

## Before writing
1. Find the day in `7. Teaching/<COURSE>/<COURSE> Planning Sheet.md`. Read the row before it too:
   - **"Due before Class"** = what students hand in at the *start* of this day (assigned the
     previous class). If there is one, the walkthrough opens with homework problems.
   - **Content Gap** on the previous row = what didn't land last time. Fold it into the first walkthrough problems and the practice sheet.
2. Read the previous day's lesson plan and the source material for this day
   (`2. Source Material/<COURSE> Unit N Attachments/` or the intake folder in `CLAUDE.md`).
3. Check the unit summary for this day's goal.

## Writing it
Layout is `format.md` §6 (since 2026-10-15: walkthrough, Common Questions, Homework; no
Attachments section, no Objectives, no timed blocks).
- **Built for Mr. Ren's classroom (see `CLAUDE.md` → Classroom model):** class time is groups
  working **unseen problems at the whiteboards**, not lecture, with fast students mentoring.
  The plan is the problem list the groups work through, not a minute-by-minute script.
- The **Problem Walkthrough table** is the core: one row per problem in the order the class will
  meet them, with the final answer, what it teaches, and the specific mistake to watch for. A
  teacher should be able to teach from this table alone. Mark the 1–2 **anchor** problems that
  deserve the most board time. If the day follows homework, the first rows are 1–2 homework
  problems to redo at the board from scratch.
- Put **1–2 hint questions** the teacher can ask instead of explaining in the Watch for cell.
- Avoid pure drill. If problems need little explanation, add one that makes students think.
- **Common Questions:** the **top 8** conceptual Q&As ("why does…", "how do I know which method…"),
  most important first.
- **Opening Questions:** exactly 3 short problems on the **core topic of the previous class**
  (after a quiz day, the quiz's core skills), each with a final answer and one line on what it
  checks. Fold in the previous row's Content Gap. Solve and verify each one.
- **Closing Questions:** 1–2 **big-idea** questions on today's topic that are answered in words,
  not by computing ("why does…", "what would happen if…", "how do you know…"), each followed by
  the idea a good answer contains.
- **Practice sheet (every lesson plan except quiz days):** write one with 8 sets per `format.md` §3
  → Practice sheet. Each set covers every skill in today's walkthrough (one lettered part per
  skill, same order every set), plus earlier unit skills when the day is mixed practice. Include
  the Watch-for edge cases across the sets (extraneous root, sign flip, no real solution…), not
  in every set. Write the instructor key per `tasks/answer-key.md`. **Solve every problem**
  (sympy or by hand) and check every `## Check Your Work` line against the key.
- Frontmatter `attachments:` lists every resource for the day (practice sheet, its key, any
  class notes, homework and its key). `build.py` reads it to know what to build.
- Add the `> **Planning sheet:**` and `> **Practice sheet:**` lines, the `At Home` assignment, and
  link the plan from the planning sheet's In Class cell.
- Homework for the day → `tasks/homework.md`. Keys → `tasks/answer-key.md`.

## Quiz day
No walkthrough, answers, Common Questions, Opening or Closing Questions, or practice sheet. Put the quiz and its key in the
`attachments:` property and give a short bullet list of skills covered. See
`tasks/assessment.md`.

## Check before finishing
- Every problem in the table and on the practice sheet solved and verified; build.py's leak
  check is clean on the practice sheet.
- Links resolve. The note name is unique in the vault.
