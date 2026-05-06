import assert from "node:assert/strict";
import test from "node:test";

import { createKeyEcho } from "../src/sketches/004-key-echoes/sketch.js";

test("createKeyEcho maps a key and press index to a deterministic mark", () => {
  const firstEcho = createKeyEcho({
    key: "a",
    pressIndex: 0,
    random: fixedRandom,
  });
  const nextEcho = createKeyEcho({
    key: "a",
    pressIndex: 1,
    random: fixedRandom,
  });

  assert.equal(firstEcho.label, "a");
  assert.ok(firstEcho.x >= 0 && firstEcho.x <= 1);
  assert.ok(firstEcho.y >= 0 && firstEcho.y <= 1);
  assert.notEqual(firstEcho.x, nextEcho.x);
  assert.deepEqual(
    createKeyEcho({
      key: "a",
      pressIndex: 0,
      random: fixedRandom,
    }),
    firstEcho,
  );
});

function fixedRandom() {
  return 0.5;
}
