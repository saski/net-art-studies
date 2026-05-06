export const manifest = {
  id: "002-pointer-bruises",
  title: "002 Pointer Bruises",
  year: 2026,
  medium: "JavaScript, Canvas 2D, pointer events, browser viewport",
  deterministic: true,
};

const MAX_BRUISES = 96;

export function createSketch({ canvas, context, random }) {
  let animationFrame = 0;
  let width = 1;
  let height = 1;
  let previousPoint = null;
  const bruises = [];

  function resize(size) {
    width = size.width;
    height = size.height;
    context.fillStyle = "#0e0d11";
    context.fillRect(0, 0, width, height);
  }

  function start() {
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", clearPreviousPoint);
    animationFrame = window.requestAnimationFrame(draw);
  }

  function stop() {
    canvas.removeEventListener("pointerdown", handlePointerDown);
    canvas.removeEventListener("pointermove", handlePointerMove);
    canvas.removeEventListener("pointerleave", clearPreviousPoint);
    window.cancelAnimationFrame(animationFrame);
  }

  function handlePointerDown(event) {
    const point = readPointerPoint(canvas, event);

    addBruise(createContactBruise({ point, random }));
    previousPoint = point;
  }

  function handlePointerMove(event) {
    const point = readPointerPoint(canvas, event);

    if (previousPoint) {
      addBruise(createPointerBruise({ point, previousPoint, random }));
    }

    previousPoint = point;
  }

  function clearPreviousPoint() {
    previousPoint = null;
  }

  function draw(milliseconds) {
    const time = milliseconds * 0.001;

    context.fillStyle = "rgba(14, 13, 17, 0.13)";
    context.fillRect(0, 0, width, height);

    for (const bruise of bruises) {
      drawBruise(context, bruise, width, height, time);
      bruise.age += bruise.decay;
    }

    removeSpentBruises(bruises);
    animationFrame = window.requestAnimationFrame(draw);
  }

  function addBruise(bruise) {
    bruises.push(bruise);
    if (bruises.length > MAX_BRUISES) {
      bruises.shift();
    }
  }

  return { resize, start, stop };
}

export function createContactBruise({ point, random }) {
  return {
    x: clamp01(point.x),
    y: clamp01(point.y),
    radius: 34 + random() * 20,
    intensity: 0.24 + random() * 0.1,
    decay: 0.005 + random() * 0.005,
    phase: random() * Math.PI * 2,
    driftX: (random() - 0.5) * 0.04,
    driftY: (random() - 0.5) * 0.04,
    age: 0,
  };
}

export function createPointerBruise({ point, previousPoint, random }) {
  const travel = Math.hypot(point.x - previousPoint.x, point.y - previousPoint.y);

  return {
    x: clamp01(point.x),
    y: clamp01(point.y),
    radius: 22 + Math.min(travel * 150, 92) + random() * 18,
    intensity: 0.2 + Math.min(travel * 0.7, 0.36) + random() * 0.08,
    decay: 0.004 + random() * 0.006,
    phase: random() * Math.PI * 2,
    driftX: (random() - 0.5) * 0.075,
    driftY: (random() - 0.5) * 0.075,
    age: 0,
  };
}

function readPointerPoint(canvas, event) {
  const bounds = canvas.getBoundingClientRect();

  return {
    x: (event.clientX - bounds.left) / bounds.width,
    y: (event.clientY - bounds.top) / bounds.height,
  };
}

function drawBruise(context, bruise, width, height, time) {
  const life = Math.max(0, 1 - bruise.age);
  if (life <= 0) {
    return;
  }

  const x = (bruise.x + Math.sin(time * 0.8 + bruise.phase) * bruise.driftX * life) * width;
  const y = (bruise.y + Math.cos(time * 0.6 + bruise.phase) * bruise.driftY * life) * height;
  const radius = bruise.radius * (0.55 + life * 0.75);
  const opacity = bruise.intensity * life;
  const gradient = context.createRadialGradient(x, y, 0, x, y, radius);

  gradient.addColorStop(0, `rgba(78, 38, 74, ${opacity})`);
  gradient.addColorStop(0.38, `rgba(128, 41, 54, ${opacity * 0.45})`);
  gradient.addColorStop(0.72, `rgba(32, 70, 76, ${opacity * 0.18})`);
  gradient.addColorStop(1, "rgba(14, 13, 17, 0)");

  context.fillStyle = gradient;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();
}

function removeSpentBruises(bruises) {
  while (bruises.length > 0 && bruises[0].age >= 1) {
    bruises.shift();
  }
}

function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}
