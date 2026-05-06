import {
  createSketch as createMudField,
  manifest as mudFieldManifest,
} from "./sketches/001-mud-field/sketch.js";
import {
  createSketch as createPointerBruises,
  manifest as pointerBruisesManifest,
} from "./sketches/002-pointer-bruises/sketch.js";
import {
  createSketch as createWindowSilt,
  manifest as windowSiltManifest,
} from "./sketches/003-window-silt/sketch.js";
import {
  createSketch as createKeyEchoes,
  manifest as keyEchoesManifest,
} from "./sketches/004-key-echoes/sketch.js";
import {
  createSketch as createWheelRuts,
  manifest as wheelRutsManifest,
} from "./sketches/005-wheel-ruts/sketch.js";

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
  [
    windowSiltManifest.id,
    {
      createSketch: createWindowSilt,
      manifest: windowSiltManifest,
    },
  ],
  [
    keyEchoesManifest.id,
    {
      createSketch: createKeyEchoes,
      manifest: keyEchoesManifest,
    },
  ],
  [
    wheelRutsManifest.id,
    {
      createSketch: createWheelRuts,
      manifest: wheelRutsManifest,
    },
  ],
]);
