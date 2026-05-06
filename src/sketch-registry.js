import {
  createSketch as createMudField,
  manifest as mudFieldManifest,
} from "./sketches/001-mud-field/sketch.js";
import {
  createSketch as createPointerBruises,
  manifest as pointerBruisesManifest,
} from "./sketches/002-pointer-bruises/sketch.js";

export const sketches = new Map([
  [
    mudFieldManifest.id,
    {
      createSketch: createMudField,
      manifest: mudFieldManifest,
    },
  ],
  [
    pointerBruisesManifest.id,
    {
      createSketch: createPointerBruises,
      manifest: pointerBruisesManifest,
    },
  ],
]);
