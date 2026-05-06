import assert from "node:assert/strict";
import test from "node:test";

import { createResizeSilt } from "../src/sketches/003-window-silt/sketch.js";

test("createResizeSilt records the dominant viewport change as a deterministic stratum", () => {
  const widthShift = createResizeSilt({
    previousSize: { width: 320, height: 240 },
    size: { width: 640, height: 260 },
    random: fixedRandom,
  });
  const heightShift = createResizeSilt({
    previousSize: { width: 320, height: 240 },
    size: { width: 340, height: 520 },
    random: fixedRandom,
  });

  assert.equal(widthShift.orientation, "vertical");
  assert.equal(heightShift.orientation, "horizontal");
  assert.ok(widthShift.thickness > 0);
  assert.ok(heightShift.thickness > 0);
  assert.deepEqual(
    createResizeSilt({
      previousSize: { width: 320, height: 240 },
      size: { width: 640, height: 260 },
      random: fixedRandom,
    }),
    widthShift,
  );
});

test("createResizeSilt makes larger viewport changes denser", () => {
  const smallShift = createResizeSilt({
    previousSize: { width: 320, height: 240 },
    size: { width: 340, height: 245 },
    random: fixedRandom,
  });
  const largeShift = createResizeSilt({
    previousSize: { width: 320, height: 240 },
    size: { width: 800, height: 250 },
    random: fixedRandom,
  });

  assert.equal(smallShift.orientation, "vertical");
  assert.equal(largeShift.orientation, "vertical");
  assert.ok(largeShift.density > smallShift.density);
});

function fixedRandom() {
  return 0.5;
}
