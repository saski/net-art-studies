# Net Art Studies

Browser-native generative animation studies in JavaScript.

This project explores the space between painting, naive figuration, unstable interfaces, and generative systems. The studies use Canvas, SVG, CSS, DOM behavior, URL state, viewport size, cursor movement, and browser timing as raw material rather than neutral display technology.

The goal is not to produce polished digital collectibles immediately. The first goal is to develop a visual language of stains, crude figures, gestures, accidents, responsive surfaces, and unstable browser-native behavior.

## Open Locally

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080/?sketch=001-mud-field&seed=barcelo
```

Change the `seed` value to generate another deterministic variation:

```text
http://localhost:8080/?sketch=001-mud-field&seed=devotion
```

## Studies

| Study | Title | Question | Interaction | Status |
| --- | --- | --- | --- | --- |
| 001 | Mud Field | What happens when the browser becomes a stained surface? | Time, viewport, seed | Started |
| 002 | Pointer Bruises | What happens when pointer movement bruises the stained browser surface? | Pointer, time, viewport, seed | Started |
| 003 | Window Silt | What happens when viewport changes deposit sediment? | Resize, time, viewport, seed | Started |
| 004 | Key Echoes | What happens when keystrokes crack the browser surface? | Keyboard, time, viewport, seed | Started |

## Method

- One study at a time.
- One primary behavior per study.
- JavaScript-first and browser-native.
- Deterministic seeds for reproducible variations.
- Canvas 2D first; SVG, DOM, CSS, WebGL, and shaders only when the study needs them.
- Video export, minting, and marketplace publication are secondary distribution choices.

## Development

See [docs/development.md](docs/development.md).
