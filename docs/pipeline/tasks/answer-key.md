# Task: write an answer key / solution

Read first: `_claude/format.md` §1 (naming) and §4 (red pen on the original).
For Precalculus, §4's "graph every polynomial" rule applies.

1. **Work out where the handout lives:**
   - a vault note → the key is a vault note with `> [!answer]` callouts;
   - an original PDF in `2. Source Material/` → a vault key note with `overlay:` frontmatter;
   - a PDF/image outside the vault (Downloads, OneDrive, a photo) → find its course, unit, and day in
     the planning sheet. If it belongs in the vault, archive the PDF in
     `2. Source Material/<COURSE> Unit N Attachments/` and build an overlay key note. Otherwise
     make an overlay PDF directly. Either way, name it per `format.md` §1. Ask if the day is unclear.
2. **Solve every problem.** Check by substitution or expanding back out. Mark extraneous roots,
   domain restrictions, and approximations. If a problem looks wrong, re-read the source before
   "fixing" it.
3. **Write the work in red under each problem** and box the final answer. For quizzes, include
   the rubric (`tasks/assessment.md`).
4. **Precalculus:** add a red graph for every polynomial/quadratic (vertex, intercepts, axis).
5. **Positions on a PDF:** `pdftotext -bbox` gives each problem label's location. Place the work
   in the blank space below it.
6. **Render and look at every page** (`pdftoppm`). Nothing overlaps printed text, nothing runs off a
   grid or page.
7. For homework, check the key agrees with that homework's `## Check Your Work`.
8. Report where the file was saved.
