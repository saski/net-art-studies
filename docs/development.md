# Development Guide

## Requirements

- Node.js for tests.
- Python 3 for the local static server.
- Git for version control.

This project intentionally has no runtime dependencies at the start.

## Commands

Run tests:

```bash
node --test
```

Validate registered sketches:

```bash
node tools/validate-sketches.mjs
```

Run all checks:

```bash
node --test && node tools/validate-sketches.mjs
```

Serve locally:

```bash
python3 -m http.server 8080
```

## Sketch Contract

Each sketch lives under `src/sketches/<number-title>/` and exports:

```js
export const manifest = {
  id: "001-example",
  title: "001 Example",
  year: 2026,
  medium: "JavaScript, Canvas 2D, browser viewport",
  deterministic: true,
};

export function createSketch({ canvas, context, random, seed }) {
  return {
    resize(size) {},
    start() {},
    stop() {},
  };
}
```

## First Ten Study Prompts

1. Mud Field: pigment-like blobs slowly spread, dry, and overwrite each other.
2. Face That Refuses Symmetry: unstable simple heads or masks with jittering eyes.
3. Dragging Paint With the Cursor: pointer movement smears existing pixels.
4. Browser Shrine: DOM elements behave as devotional scraps and unstable panels.
5. Rotten Grid: a clean grid sags, stains, bursts, or mutates.
6. Child Drawing Machine: shaky, overcorrected marks draw repeated facial features.
7. Glaze Layers: transparent color layers accumulate and occasionally scrape away.
8. Angry Pet / Soft Monster: a small character responds to cursor, resize, idle time, or clicks.
9. Ceramic Plate Generator: circular compositions with crude marks and symbolic figures.
10. Auction Lot From a Dream: a fake collectible page whose metadata and image decay.

## Agent Configuration

Use global configuration in `~/.agents` first. The local `.agents/` folder only adds project-specific rules and skills for this repository.
