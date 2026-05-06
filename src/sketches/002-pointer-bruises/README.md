# 002 Pointer Bruises

`002-pointer-bruises` is a browser-native study about pointer contact and movement leaving soft bruises on a dark surface.

The piece is deterministic through the `seed` URL parameter for the same pointer path. The interaction is intentionally direct: move through the viewport and the surface keeps remembering the motion for a short time after contact leaves.

Open it with:

```text
/?sketch=002-pointer-bruises&seed=barcelo
```

Interaction:

- Press or touch the viewport to leave a first bruise.
- Move the pointer across the viewport to extend the bruise trail.
- Leave the viewport to break the current stroke.

Constraints:

- Canvas 2D only.
- No runtime dependencies.
- Marks are capped and decay over time.
