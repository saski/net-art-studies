import assert from "node:assert/strict";
import test from "node:test";

import { readSketchRequest } from "../src/core/params.js";

test("readSketchRequest reads sketch and seed from URL parameters", () => {
  const request = readSketchRequest(new URLSearchParams("sketch=001-mud-field&seed=barcelo"));

  assert.deepEqual(request, {
    sketchId: "001-mud-field",
    seed: "barcelo",
  });
});
