import { sketches } from "../src/sketch-registry.js";

const errors = [];

for (const [id, sketch] of sketches) {
  if (sketch.manifest.id !== id) {
    errors.push(`${id}: manifest id does not match registry key.`);
  }

  if (!sketch.manifest.title) {
    errors.push(`${id}: manifest title is required.`);
  }

  if (typeof sketch.manifest.deterministic !== "boolean") {
    errors.push(`${id}: manifest deterministic flag must be boolean.`);
  }

  if (typeof sketch.createSketch !== "function") {
    errors.push(`${id}: createSketch export is required.`);
  }
}

if (errors.length > 0) {
  for (const error of errors) {
    console.error(error);
  }

  process.exitCode = 1;
} else {
  console.log(`Validated ${sketches.size} sketch.`);
}
