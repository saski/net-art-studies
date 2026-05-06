# 005 Wheel Ruts

`005-wheel-ruts` is a browser-native study about wheel motion leaving ruts on a page that does not scroll.

The piece treats inert scrolling as abrasion. Wheel direction decides whether marks drag horizontally or vertically, while wheel magnitude changes the length and depth of each rut.

Open it with:

```text
/?sketch=005-wheel-ruts&seed=barcelo
```

Interaction:

- Use a trackpad or mouse wheel over the viewport.
- Try vertical and horizontal wheel gestures.

Constraints:

- Canvas 2D only.
- No runtime dependencies.
- Ruts are capped and decay over time.
