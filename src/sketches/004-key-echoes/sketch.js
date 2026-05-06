export const manifest = {
  id: "004-key-echoes",
  title: "004 Key Echoes",
  year: 2026,
  medium: "JavaScript, Canvas 2D, keyboard events, browser viewport",
  deterministic: true,
};

const MAX_ECHOES = 72;

export function createSketch({ context, random }) {
  let animationFrame = 0;
  let width = 1;
  let height = 1;
  let pressIndex = 0;
  const echoes = [];

  function resize(size) {
    width = size.width;
    height = size.height;
    context.fillStyle = "#101215";
    context.fillRect(0, 0, width, height);
  }

  function start() {
    window.addEventListener("keydown", handleKeyDown);
    animationFrame = window.requestAnimationFrame(draw);
  }

  function stop() {
    window.removeEventListener("keydown", handleKeyDown);
    window.cancelAnimationFrame(animationFrame);
  }

  function handleKeyDown(event) {
    addEcho(createKeyEcho({ key: event.key, pressIndex, random }));
    pressIndex += 1;
  }

  function draw(milliseconds) {
    const time = milliseconds * 0.001;

    context.fillStyle = "rgba(16, 18, 21, 0.11)";
    context.fillRect(0, 0, width, height);

    for (const echo of echoes) {
      drawKeyEcho(context, echo, width, height, time);
      echo.age = Math.min(1, echo.age + echo.decay);
    }

    removeSpentEchoes(echoes);
    animationFrame = window.requestAnimationFrame(draw);
  }

  function addEcho(echo) {
    echoes.push(echo);
    if (echoes.length > MAX_ECHOES) {
      echoes.shift();
    }
  }

  return { resize, start, stop };
}

export function createKeyEcho({ key, pressIndex, random }) {
  const label = normalizeKeyLabel(key);
  const signature = hashText(label);
  const scatter = random() * 0.08;
  const weight = label.length === 1 ? 0.62 : 0.82;

  return {
    label,
    x: wrap01(signature * 0.0000031 + pressIndex * 0.173 + scatter),
    y: wrap01(signature * 0.0000053 + pressIndex * 0.119 + random() * 0.08),
    radius: 26 + weight * 30 + random() * 16,
    intensity: 0.18 + weight * 0.12 + random() * 0.08,
    rotation: (random() - 0.5) * 0.7,
    crack: 0.18 + random() * 0.42,
    decay: 0.006 + random() * 0.006,
    age: 0,
  };
}

function drawKeyEcho(context, echo, width, height, time) {
  const life = 1 - echo.age;
  if (life <= 0) {
    return;
  }

  const x = echo.x * width;
  const y = echo.y * height;
  const pulse = 1 + Math.sin(time * 1.4 + echo.radius) * 0.035;
  const radius = echo.radius * pulse * (0.72 + life * 0.45);
  const alpha = echo.intensity * life;

  context.save();
  context.translate(x, y);
  context.rotate(echo.rotation * life);
  context.globalCompositeOperation = "lighter";

  context.strokeStyle = `rgba(194, 88, 75, ${alpha * 0.55})`;
  context.lineWidth = Math.max(1, radius * 0.045);
  drawCracks(context, radius, echo.crack, life);

  context.fillStyle = `rgba(232, 211, 162, ${alpha})`;
  context.font = `${Math.max(18, radius * 0.62)}px Georgia, "Times New Roman", serif`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(echo.label, 0, 0);

  context.restore();
}

function drawCracks(context, radius, crack, life) {
  const count = 3 + Math.floor(crack * 5);

  for (let index = 0; index < count; index += 1) {
    const angle = (Math.PI * 2 * index) / count + crack;
    const inner = radius * (0.18 + crack * 0.18);
    const outer = radius * (0.62 + crack * 0.28) * life;

    context.beginPath();
    context.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner);
    context.lineTo(
      Math.cos(angle + crack * 0.2) * outer,
      Math.sin(angle + crack * 0.2) * outer,
    );
    context.stroke();
  }
}

function removeSpentEchoes(echoes) {
  while (echoes.length > 0 && echoes[0].age >= 1) {
    echoes.shift();
  }
}

function normalizeKeyLabel(key) {
  if (key.length === 1) {
    return key;
  }

  return key.replace(/^Arrow/, "");
}

function hashText(text) {
  let hash = 0;

  for (const char of text) {
    hash = Math.imul(hash ^ char.charCodeAt(0), 2654435761);
  }

  return hash >>> 0;
}

function wrap01(value) {
  return value - Math.floor(value);
}
