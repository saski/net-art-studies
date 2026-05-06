# Net Art Studies Agent Rules

## Purpose

This repository is a browser-native generative animation sketchbook. Treat JavaScript, Canvas, SVG, CSS, DOM behavior, URL state, browser timing, viewport size, and interaction as artistic material.

## Configuration Precedence

Use `~/.agents` as the primary agent configuration. The local `.agents/` folder extends those shared rules with project-specific guidance only. Do not treat local rules as a replacement for the global configuration.

## Working Principles

- Work in small vertical slices.
- Keep the first version of each study simple enough to understand in one sitting.
- Start functionality changes with one failing test when the behavior can be tested outside the browser.
- Prefer pure functions for deterministic logic and Canvas/DOM code only at the boundary.
- Keep all technical artifacts in English.
- Keep user-facing project text concise and artist-readable.

## Artistic Direction

- Do not optimize for a polished collectible look too early.
- Prefer stains, crude marks, unstable systems, painterly surfaces, browser-native behavior, and deliberate imperfection.
- Let each study answer one behavioral question.
- Avoid external image assets in early studies unless the user explicitly chooses otherwise.
- Treat video exports and marketplace publication as documentation or distribution, not the primary work.

## Repository Shape

- `src/core/`: reusable browser and deterministic logic.
- `src/sketches/<number-title>/`: one self-contained study per folder.
- `test/`: Node built-in tests for pure behavior.
- `docs/`: development notes and planning documents.
- `.agents/`: local rules and reusable skills for future agents.

## Verification

- Run `node --test` after testable code changes.
- Run `node tools/validate-sketches.mjs` once the validator exists.
- For visual changes, run the local server and inspect the browser manually or with browser automation when available.
