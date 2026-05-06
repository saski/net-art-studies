export const manifest = {
  id: "005-wheel-ruts",
  title: "005 Wheel Ruts",
  year: 2026,
  medium: "JavaScript, Canvas 2D, wheel events, browser viewport",
  deterministic: true,
};

const MAX_RUTS = 84;

export function createSketch({ canvas, context, random }) {
  let animationFrame = 0;
  let width = 1;
  let height = 1;
  const ruts = [];

  function resize(size) {
    width = size.width;
    height = size.height;
    context.fillStyle = "#14100f";
    context.fillRect(0, 0, width, height);
  }

  function start() {
    canvas.addEventListener("wheel", handleWheel, { passive: false });
    animationFrame = window.requestAnimationFrame(draw);
  }

  function stop() {
    canvas.removeEventListener("wheel", handleWheel);
    window.cancelAnimationFrame(animationFrame);
  }

  function handleWheel(event) {
    event.preventDefault();

    const point = readWheelPoint(canvas, event);
    ruts.push(createWheelRut({
      deltaX: event.deltaX,
      deltaY: event.deltaY,
      point,
      random,
    }));

    if (ruts.length > MAX_RUTS) {
      ruts.shift();
    }
  }

  function draw(milliseconds) {
    const time = milliseconds * 0.001;

    context.fillStyle = "rgba(20, 16, 15, 0.08)";
    context.fillRect(0, 0, width, height);

    for (const rut of ruts) {
      drawRut(context, rut, width, height, time);
      rut.age = Math.min(1, rut.age + rut.decay);
    }

    removeSpentRuts(ruts);
    animationFrame = window.requestAnimationFrame(draw);
  }

  return { resize, start, stop };
}

export function createWheelRut({ deltaX, deltaY, point, random }) {
  const magnitude = Math.min(1, Math.hypot(deltaX, deltaY) / 260);
  const direction = Math.abs(deltaX) > Math.abs(deltaY) ? "horizontal" : "vertical";

  return {
    direction,
    x: clamp01(point.x),
    y: clamp01(point.y),
    length: 42 + magnitude * 170 + random() * 28,
    depth: 0.14 + magnitude * 0.28 + random() * 0.08,
    width: 5 + magnitude * 18 + random() * 8,
    roughness: 0.12 + random() * 0.32,
    drift: (random() - 0.5) * 0.08,
    decay: 0.003 + random() * 0.004,
    age: 0,
  };
}

function readWheelPoint(canvas, event) {
  const bounds = canvas.getBoundingClientRect();

  return {
    x: (event.clientX - bounds.left) / bounds.width,
    y: (event.clientY - bounds.top) / bounds.height,
  };
}

function drawRut(context, rut, width, height, time) {
  const life = 1 - rut.age;
  if (life <= 0) {
    return;
  }

  const x = rut.x * width;
  const y = rut.y * height;
  const wobble = Math.sin(time * 0.9 + rut.length) * rut.roughness * 16;
  const halfLength = rut.length * (0.45 + life * 0.4);
  const rutWidth = rut.width * (0.8 + rut.age * 0.7);
  const alpha = rut.depth * life;

  context.save();
  context.globalCompositeOperation = "lighter";
  context.strokeStyle = `rgba(205, 151, 92, ${alpha})`;
  context.lineWidth = Math.max(1, rutWidth);
  context.lineCap = "round";

  context.beginPath();
  if (rut.direction === "horizontal") {
    context.moveTo(x - halfLength, y + rut.drift * height + wobble);
    context.quadraticCurveTo(
      x,
      y - wobble * 0.65,
      x + halfLength,
      y + wobble * 0.35,
    );
  } else {
    context.moveTo(x + rut.drift * width + wobble, y - halfLength);
    context.quadraticCurveTo(
      x - wobble * 0.55,
      y,
      x + wobble * 0.35,
      y + halfLength,
    );
  }
  context.stroke();

  context.restore();
}

function removeSpentRuts(ruts) {
  while (ruts.length > 0 && ruts[0].age >= 1) {
    ruts.shift();
  }
}

function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}
