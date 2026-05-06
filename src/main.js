import { fitCanvasToViewport } from "./core/canvas.js";
import { readSketchRequest } from "./core/params.js";
import { createRandom } from "./core/rng.js";
import { sketches } from "./sketch-registry.js";

const canvas = document.querySelector("#work-canvas");
const title = document.querySelector("#work-title");
const seedLabel = document.querySelector("#work-seed");

if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error("Expected #work-canvas to be a canvas element.");
}

const request = readSketchRequest(new URLSearchParams(window.location.search));
const sketchEntry = sketches.get(request.sketchId);

if (!sketchEntry) {
  throw new Error(`Unknown sketch: ${request.sketchId}`);
}

const { context, resize } = fitCanvasToViewport(canvas);
const sketch = sketchEntry.createSketch({
  canvas,
  context,
  random: createRandom(request.seed),
  seed: request.seed,
});

function resizeSketch() {
  const size = resize();
  sketch.resize(size);
}

title.textContent = sketchEntry.manifest.title;
seedLabel.textContent = `seed: ${request.seed}`;

window.addEventListener("resize", resizeSketch);
resizeSketch();
sketch.start();
