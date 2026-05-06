import { createSketch, manifest } from "./sketches/001-mud-field/sketch.js";

export const sketches = new Map([
  [
    manifest.id,
    {
      createSketch,
      manifest,
    },
  ],
]);
