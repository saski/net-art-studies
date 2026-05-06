import assert from "node:assert/strict";
import test from "node:test";

import { createRandom } from "../src/core/rng.js";

test("createRandom returns the same sequence for the same seed", () => {
  const first = createRandom("mud");
  const second = createRandom("mud");

  assert.deepEqual(
    [first(), first(), first()],
    [second(), second(), second()],
  );
});
