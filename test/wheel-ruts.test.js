import assert from "node:assert/strict";
import test from "node:test";

import { createWheelRut } from "../src/sketches/005-wheel-ruts/sketch.js";

test("createWheelRut maps wheel delta to a deterministic rut", () => {
  const downwardRut = createWheelRut({
    deltaX: 0,
    deltaY: 120,
    point: { x: 0.25, y: 0.75 },
    random: fixedRandom,
  });
  const sidewaysRut = createWheelRut({
    deltaX: 90,
    deltaY: 10,
    point: { x: -0.2, y: 1.2 },
    random: fixedRandom,
  });

  assert.equal(downwardRut.direction, "vertical");
  assert.equal(sidewaysRut.direction, "horizontal");
  assert.equal(sidewaysRut.x, 0);
  assert.equal(sidewaysRut.y, 1);
  assert.ok(downwardRut.depth > 0);
  assert.deepEqual(
    createWheelRut({
      deltaX: 0,
      deltaY: 120,
      point: { x: 0.25, y: 0.75 },
      random: fixedRandom,
    }),
    downwardRut,
  );
});

function fixedRandom() {
  return 0.5;
}
