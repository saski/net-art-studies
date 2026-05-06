---
name: net-art-sketch-author
description: Use this skill whenever the user asks to create, extend, or refine a browser-native generative animation sketch in this repository, especially Canvas, SVG, DOM, URL-seeded, responsive, interactive, or net art studies. It keeps work small, deterministic where possible, and aligned with the project's visual language.
---

# Net Art Sketch Author

## Goal

Create one small, browser-native study at a time. The output should feel like a web-native artwork, not a generic motion graphics demo or product feature.

## Workflow

1. Identify the study's single behavioral question.
2. Check `.agents/rules/project.md` and `.agents/rules/browser-native-sketches.md`.
3. If deterministic logic is needed, write one failing Node test first.
4. Implement the smallest sketch change that answers the behavioral question.
5. Keep Canvas, DOM, and browser APIs at the boundary; keep random and parameter logic testable.
6. Add or update the sketch README with intent, URL, interaction, and constraints.
7. Run `node --test`.
8. If visual output changed, run the local server and inspect the page.

## Sketch Requirements

- Export `manifest`.
- Export `createSketch`.
- Support `resize(size)`, `start()`, and `stop()`.
- Accept deterministic `random` from `src/core/rng.js`.
- Preserve URL reproducibility through `?sketch=<id>&seed=<seed>`.
- Keep global state inside the sketch lifecycle.

## Artistic Checks

Ask these before finishing:

- Does the study use the browser as material?
- Is there one primary behavior?
- Does the result have room for accident, instability, or painterly imperfection?
- Did the implementation avoid marketplace polish and decorative UI?
- Is the study documented as an artwork, not only as code?

## Output

When reporting back, include:

- the study changed or created
- the behavioral question it explores
- tests/checks run
- any visual inspection gap
