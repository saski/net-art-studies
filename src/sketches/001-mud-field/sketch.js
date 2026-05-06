export const manifest = {
  id: "001-mud-field",
  title: "001 Mud Field",
  year: 2026,
  medium: "JavaScript, Canvas 2D, browser viewport",
  deterministic: true,
};

export function createSketch({ context, random }) {
  let animationFrame = 0;
  let width = 1;
  let height = 1;
  const stains = createStains(random);

  function resize(size) {
    width = size.width;
    height = size.height;
    context.fillStyle = "#16130f";
    context.fillRect(0, 0, width, height);
  }

  function start() {
    animationFrame = window.requestAnimationFrame(draw);
  }

  function stop() {
    window.cancelAnimationFrame(animationFrame);
  }

  function draw(milliseconds) {
    const time = milliseconds * 0.001;

    context.fillStyle = "rgba(22, 19, 15, 0.055)";
    context.fillRect(0, 0, width, height);

    for (const stain of stains) {
      drawStain(context, stain, width, height, time);
    }

    animationFrame = window.requestAnimationFrame(draw);
  }

  return { resize, start, stop };
}

function createStains(random) {
  return Array.from({ length: 48 }, () => ({
    x: random(),
    y: random(),
    radius: 28 + random() * 120,
    pulse: 0.22 + random() * 0.9,
    phase: random() * Math.PI * 2,
    wobble: 0.04 + random() * 0.15,
    color: pickColor(random),
  }));
}

function drawStain(context, stain, width, height, time) {
  const x = stain.x * width + Math.sin(time * stain.pulse + stain.phase) * width * stain.wobble;
  const y = stain.y * height + Math.cos(time * stain.pulse * 0.7 + stain.phase) * height * stain.wobble;
  const radius = stain.radius * (1 + Math.sin(time * stain.pulse + stain.phase) * 0.18);
  const gradient = context.createRadialGradient(x, y, 0, x, y, radius);

  gradient.addColorStop(0, stain.color.core);
  gradient.addColorStop(0.55, stain.color.skin);
  gradient.addColorStop(1, "rgba(22, 19, 15, 0)");

  context.fillStyle = gradient;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();
}

function pickColor(random) {
  const palette = [
    { core: "rgba(118, 40, 34, 0.32)", skin: "rgba(118, 40, 34, 0.08)" },
    { core: "rgba(183, 146, 80, 0.24)", skin: "rgba(183, 146, 80, 0.06)" },
    { core: "rgba(61, 87, 77, 0.30)", skin: "rgba(61, 87, 77, 0.06)" },
    { core: "rgba(226, 216, 187, 0.18)", skin: "rgba(226, 216, 187, 0.04)" },
  ];

  return palette[Math.floor(random() * palette.length)];
}
