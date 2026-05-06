export const manifest = {
  id: "003-window-silt",
  title: "003 Window Silt",
  year: 2026,
  medium: "JavaScript, Canvas 2D, browser viewport resize",
  deterministic: true,
};

const MAX_STRATA = 44;

export function createSketch({ context, random }) {
  let animationFrame = 0;
  let width = 1;
  let height = 1;
  let previousSize = null;
  const strata = [];

  function resize(size) {
    width = size.width;
    height = size.height;
    context.fillStyle = "#11100d";
    context.fillRect(0, 0, width, height);

    addStratum(createResizeSilt({ previousSize, size, random }));
    previousSize = size;
  }

  function start() {
    animationFrame = window.requestAnimationFrame(draw);
  }

  function stop() {
    window.cancelAnimationFrame(animationFrame);
  }

  function draw(milliseconds) {
    const time = milliseconds * 0.001;

    context.fillStyle = "rgba(17, 16, 13, 0.045)";
    context.fillRect(0, 0, width, height);

    for (const stratum of strata) {
      drawStratum(context, stratum, width, height, time);
      stratum.age = Math.min(1, stratum.age + stratum.decay);
    }

    animationFrame = window.requestAnimationFrame(draw);
  }

  function addStratum(stratum) {
    strata.push(stratum);
    if (strata.length > MAX_STRATA) {
      strata.shift();
    }
  }

  return { resize, start, stop };
}

export function createResizeSilt({ previousSize, size, random }) {
  const widthDelta = previousSize ? Math.abs(size.width - previousSize.width) : size.width * 0.22;
  const heightDelta = previousSize ? Math.abs(size.height - previousSize.height) : size.height * 0.22;
  const orientation = widthDelta >= heightDelta ? "vertical" : "horizontal";
  const dominantDelta = Math.max(widthDelta, heightDelta, 1);
  const dominantSize = orientation === "vertical" ? Math.max(size.width, 1) : Math.max(size.height, 1);
  const pressure = Math.min(1, dominantDelta / dominantSize);

  return {
    orientation,
    position: 0.18 + random() * 0.64,
    thickness: 12 + pressure * 90 + random() * 18,
    offset: (random() - 0.5) * 0.12,
    crumble: 0.08 + random() * 0.2,
    phase: random() * Math.PI * 2,
    decay: 0.0015 + random() * 0.0025,
    age: 0,
  };
}

function drawStratum(context, stratum, width, height, time) {
  const alpha = 0.08 + (1 - stratum.age) * 0.14;
  const wobble = Math.sin(time * 0.55 + stratum.phase) * stratum.crumble;

  context.save();
  context.globalCompositeOperation = "lighter";
  context.fillStyle = `rgba(179, 143, 89, ${alpha})`;

  if (stratum.orientation === "vertical") {
    drawVerticalStratum(context, stratum, width, height, wobble);
  } else {
    drawHorizontalStratum(context, stratum, width, height, wobble);
  }

  context.restore();
}

function drawVerticalStratum(context, stratum, width, height, wobble) {
  const x = (stratum.position + stratum.offset * stratum.age + wobble * 0.02) * width;
  const thickness = stratum.thickness * (1 + stratum.age * 0.6);

  context.beginPath();
  context.moveTo(x - thickness * 0.5, 0);
  context.bezierCurveTo(
    x + thickness * 0.35,
    height * 0.28,
    x - thickness * 0.75,
    height * 0.68,
    x + thickness * 0.2,
    height,
  );
  context.lineTo(x + thickness * 1.1, height);
  context.bezierCurveTo(
    x + thickness * 0.2,
    height * 0.66,
    x + thickness * 1.15,
    height * 0.31,
    x + thickness * 0.65,
    0,
  );
  context.closePath();
  context.fill();
}

function drawHorizontalStratum(context, stratum, width, height, wobble) {
  const y = (stratum.position + stratum.offset * stratum.age + wobble * 0.02) * height;
  const thickness = stratum.thickness * (1 + stratum.age * 0.6);

  context.beginPath();
  context.moveTo(0, y - thickness * 0.55);
  context.bezierCurveTo(
    width * 0.26,
    y + thickness * 0.3,
    width * 0.65,
    y - thickness * 0.8,
    width,
    y + thickness * 0.15,
  );
  context.lineTo(width, y + thickness * 1.05);
  context.bezierCurveTo(
    width * 0.66,
    y + thickness * 0.25,
    width * 0.32,
    y + thickness * 1.1,
    0,
    y + thickness * 0.55,
  );
  context.closePath();
  context.fill();
}
