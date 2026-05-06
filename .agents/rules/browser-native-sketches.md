# Browser-Native Sketch Rules

## Sketch Contract

Each sketch should expose:

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

## Constraints

- Every study must be reproducible from a URL seed.
- Every study must handle viewport resize.
- Every animation loop must be stoppable.
- Avoid global mutable state outside the sketch lifecycle.
- Keep parameters serializable when possible.
- Cap per-frame work; avoid unbounded particle growth.
- Use `requestAnimationFrame` for animation.
- Use committed, documented assets only.

## First-Phase Material

Prefer:

- Canvas 2D
- SVG
- CSS filters and layout behavior
- DOM elements as visible material
- URL parameters
- pointer, resize, scroll, time, idle, and reload behavior

Delay:

- heavy frameworks
- runtime dependencies
- WebGL and shaders, unless the study clearly needs them
- marketplace integration
