import assert from "node:assert/strict";
import test from "node:test";

import { createPointerBruise } from "../src/sketches/002-pointer-bruises/sketch.js";

test("createPointerBruise clamps coordinates and scales radius with pointer travel", () => {
  const slowBruise = createPointerBruise({
    point: { x: 0.4, y: 0.4 },
    previousPoint: { x: 0.39, y: 0.4 },
    random: fixedRandom,
  });
  const fastBruise = createPointerBruise({
    point: { x: 1.3, y: -0.2 },
    previousPoint: { x: 0.2, y: 0.8 },
    random: fixedRandom,
  });

  assert.equal(fastBruise.x, 1);
  assert.equal(fastBruise.y, 0);
  assert.equal(slowBruise.x, 0.4);
  assert.equal(slowBruise.y, 0.4);
  assert.ok(fastBruise.radius > slowBruise.radius);
  assert.deepEqual(
    createPointerBruise({
      point: { x: 0.5, y: 0.25 },
      previousPoint: { x: 0.2, y: 0.25 },
      random: fixedRandom,
    }),
    createPointerBruise({
      point: { x: 0.5, y: 0.25 },
      previousPoint: { x: 0.2, y: 0.25 },
      random: fixedRandom,
    }),
  );
});

function fixedRandom() {
  return 0.5;
}
