export function readSketchRequest(searchParams) {
  return {
    sketchId: searchParams.get("sketch") || "001-mud-field",
    seed: searchParams.get("seed") || "default",
  };
}
