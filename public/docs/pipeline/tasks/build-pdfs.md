# Task: build printable PDFs

Read first: `_claude/format.md` §1 (PDF naming), §3 (student handouts), §7 (PDF look).
Technical reference: `6. Zettelkasten/Reusable Workflow - Export Unit Notes to Organized PDFs`
(build internals, appendices).

Only build when something actually needs printing. **If a file can be rebuilt, it doesn't live in
the vault.** Never hand-edit build output.

```
python3 "7. Teaching/tools/build.py" PC "Unit 1 - Linear and Quadratic Equations and Functions"
python3 "7. Teaching/tools/build.py" A2A "Unit 1 - Algebra Review" --day 3 --dry-run

# A2A units are stored in both places:
python3 "7. Teaching/tools/build.py" A2A "Unit 2 - Quadratics" \
  --mirror "<cloud drive>/Ren A2A 26-27"
```

- Output: `~/Documents/Ren <COURSE> 26-27/<Unit>/Day <N>/`. `--out` overrides the folder.
- The manifest is the unit's pacing dashboard plus each lesson plan's `attachments:` frontmatter property (older plans: `## Attachments` section).
- The unit summary renders to `<COURSE> <N> Unit Summary (Instructor).pdf` at the unit root.
- Graph images: `python3 "7. Teaching/tools/answer_graph.py" <spec.json>`. Specs are in
  `7. Teaching/tools/answer-graphs/`.
- Needs `pandoc` and `xelatex`. `newunicodechar.sty` is not installed (the header uses XeTeX
  active characters).

## Check before reporting
1. Render every PDF (`pdftoppm -png -r 100`) and look at it.
2. `build.py`'s leak check passed: no student PDF contains "instructor", "answer key", or worked
   steps. `[!answer]` callouts are gone from student PDFs.
3. On quiz days, say which folders contain a quiz key so Mr. Ren pulls it before printing.
4. Report the folders, day count, PDF count, and anything that needed special handling.
