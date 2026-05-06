# 003 Window Silt

`003-window-silt` is a browser-native study about viewport changes leaving sediment-like strata on the canvas.

The piece treats the browser window as pressure. The first load deposits an opening layer; later viewport changes add vertical or horizontal silt depending on the dominant resize direction. Larger changes leave denser strata.

Open it with:

```text
/?sketch=003-window-silt&seed=barcelo
```

Interaction:

- Resize the browser window to deposit new strata.
- Let the layers settle as the animation keeps repainting the surface.

Constraints:

- Canvas 2D only.
- No runtime dependencies.
- Strata are capped to avoid unbounded growth.
