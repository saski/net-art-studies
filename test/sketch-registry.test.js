import assert from "node:assert/strict";
import test from "node:test";

import { sketches } from "../src/sketch-registry.js";

test("registered sketches expose the required public contract", () => {
  for (const [id, sketch] of sketches) {
    assert.equal(sketch.manifest.id, id);
    assert.equal(typeof sketch.manifest.title, "string");
    assert.equal(typeof sketch.manifest.deterministic, "boolean");
    assert.equal(typeof sketch.createSketch, "function");
  }
});
