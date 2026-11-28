import * as THREE from "three";

export interface MorphParameters {
  progress: number;
  rotationY: number;
  headMorph: number;
  hairScale: number;
  micScale: number;
  earScale: number;
  ringScale: number;
  eyeGlow: number;
  cloakLift: number;
}

export function clamp01(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }
  return Math.min(1, Math.max(0, value));
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

export function computeMorphParameters(rawProgress: number): MorphParameters {
  const progress = clamp01(rawProgress);
  const eased = smoothstep(0, 1, progress);
  return {
    progress,
    rotationY: eased * Math.PI * 2,
    headMorph: smoothstep(0.26, 0.88, progress),
    hairScale: 1 - smoothstep(0.48, 0.74, progress),
    micScale: 1 - smoothstep(0.05, 0.44, progress),
    earScale: smoothstep(0.42, 0.94, progress),
    ringScale: smoothstep(0.56, 0.96, progress),
    eyeGlow: smoothstep(0.32, 0.8, progress),
    cloakLift: smoothstep(0.32, 0.86, progress),
  };
}

function gauss3(
  dx: number,
  dy: number,
  dz: number,
  sx: number,
  sy: number,
  sz: number,
): number {
  const ex = dx / sx;
  const ey = dy / sy;
  const ez = dz / sz;
  return Math.exp(-(ex * ex + ey * ey + ez * ez));
}

function sculptFeedenHeadPoint(nx: number, ny: number, nz: number): [number, number, number] {
  const lowerTaper = smoothstep(-0.08, -0.92, ny) * 0.14;
  let x = nx * (0.81 - lowerTaper);
  let y = ny * 1.04;
  let z = nz * 0.89;

  const templeFlatten =
    gauss3(Math.abs(nx) - 0.85, ny - 0.16, nz - 0.28, 0.24, 0.36, 0.42);
  x -= Math.sign(nx) * templeFlatten * 0.05;

  const cheekbone =
    gauss3(Math.abs(nx) - 0.56, ny + 0.04, nz - 0.62, 0.28, 0.22, 0.36);
  x += Math.sign(nx) * cheekbone * 0.032;
  z += cheekbone * 0.032;

  const jawDefine =
    gauss3(Math.abs(nx) - 0.46, ny + 0.46, nz - 0.34, 0.26, 0.22, 0.38);
  x += Math.sign(nx) * jawDefine * 0.022;

  const chinShape = gauss3(nx, ny + 0.76, nz - 0.54, 0.22, 0.22, 0.32);
  z += chinShape * 0.105;
  y -= chinShape * 0.085;

  const browTargetY = 0.23 + 0.06 * Math.min(1, Math.abs(nx) * 2.1);
  const browRidge = gauss3(nx, ny - browTargetY, nz - 0.86, 0.46, 0.095, 0.26);
  z += browRidge * 0.075;

  const glabellaDip = gauss3(nx, ny - 0.2, nz - 0.92, 0.075, 0.075, 0.18);
  z -= glabellaDip * 0.03;

  const eyeSocket =
    gauss3(nx - 0.3, ny - 0.11, nz - 0.88, 0.185, 0.13, 0.24) +
    gauss3(nx + 0.3, ny - 0.11, nz - 0.88, 0.185, 0.13, 0.24);
  z -= eyeSocket * 0.092;

  const noseBridge = gauss3(nx, ny - 0.01, nz - 0.96, 0.095, 0.21, 0.24);
  const noseTip = gauss3(nx, ny + 0.13, nz - 0.96, 0.095, 0.088, 0.22);
  const nostrils =
    gauss3(nx - 0.1, ny + 0.16, nz - 0.92, 0.065, 0.052, 0.18) +
    gauss3(nx + 0.1, ny + 0.16, nz - 0.92, 0.065, 0.052, 0.18);
  z += noseBridge * 0.085 + noseTip * 0.15 + nostrils * 0.048;
  y -= noseTip * 0.015;

  const upperLip = gauss3(nx, ny + 0.35, nz - 0.88, 0.175, 0.05, 0.18);
  const mouthLineY = -0.4 - 0.014 * Math.min(1, (nx / 0.21) * (nx / 0.21));
  const mouthCrease = gauss3(nx, ny - mouthLineY, nz - 0.88, 0.185, 0.025, 0.17);
  const lowerLip = gauss3(nx, ny + 0.44, nz - 0.86, 0.15, 0.054, 0.18);
  const chinFold = gauss3(nx, ny + 0.56, nz - 0.82, 0.16, 0.054, 0.18);
  z += upperLip * 0.052 - mouthCrease * 0.034 + lowerLip * 0.058 - chinFold * 0.036;

  return [x, y, z];
}

function sculptYodaHeadPoint(nx: number, ny: number, nz: number): [number, number, number] {
  let x = nx * 1.07;
  let y = ny * 0.88;
  let z = nz * 0.97;

  const browTargetY = 0.22 + 0.08 * Math.min(1, Math.abs(nx) * 1.9);
  const fierceBrow = gauss3(nx, ny - browTargetY, nz - 0.86, 0.52, 0.12, 0.28);
  z += fierceBrow * 0.115;

  const cheekFlare = gauss3(Math.abs(nx) - 0.62, ny + 0.14, nz - 0.5, 0.34, 0.26, 0.38);
  x += Math.sign(nx) * cheekFlare * 0.085;

  const chinTaper = gauss3(nx, ny + 0.68, nz - 0.52, 0.32, 0.24, 0.36);
  z += chinTaper * 0.045;

  return [x, y, z];
}

function createMorphedHeadGeometry(): THREE.BufferGeometry {
  const geometry = new THREE.SphereGeometry(1, 96, 72, -Math.PI / 2, Math.PI * 2);
  const posAttr = geometry.attributes.position as THREE.BufferAttribute;
  const count = posAttr.count;
  const yodaPositions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const nx = posAttr.getX(i);
    const ny = posAttr.getY(i);
    const nz = posAttr.getZ(i);

    const [fx, fy, fz] = sculptFeedenHeadPoint(nx, ny, nz);
    posAttr.setXYZ(i, fx, fy, fz);

    const [yx, yy, yz] = sculptYodaHeadPoint(nx, ny, nz);
    yodaPositions[i * 3] = yx;
    yodaPositions[i * 3 + 1] = yy;
    yodaPositions[i * 3 + 2] = yz;
  }

  geometry.morphAttributes.position = [new THREE.BufferAttribute(yodaPositions, 3)];
  geometry.computeVertexNormals();
  return geometry;
}

function createBowlFringeHairGeometry(): THREE.BufferGeometry {
  const geometry = new THREE.SphereGeometry(
    1,
    96,
    64,
    -Math.PI / 2,
    Math.PI * 2,
    0,
    Math.PI * 0.78,
  );
  const posAttr = geometry.attributes.position as THREE.BufferAttribute;

  for (let i = 0; i < posAttr.count; i++) {
    const nx = posAttr.getX(i);
    const ny = posAttr.getY(i);
    const nz = posAttr.getZ(i);

    const az = Math.atan2(nx, nz);
    const frontWeight = smoothstep(0.15, 0.68, nz);
    const backWeight = smoothstep(-0.08, -0.62, nz);
    const sideWeight = 1 - Math.max(frontWeight, backWeight);

    const fringeNotch =
      Math.sin(az * 13 + 0.4) * 0.02 + Math.cos(az * 23 - 0.8) * 0.012;
    const frontEdgeY = 0.275 - nx * 0.055 + fringeNotch;
    const sideEdgeY = 0.2;
    const backEdgeY = -0.34;
    const edgeY =
      frontWeight * frontEdgeY + sideWeight * sideEdgeY + backWeight * backEdgeY;

    const crownBoost = 1.07 + smoothstep(0.15, 0.95, ny) * 0.085;
    const sideFull = 0.91 + sideWeight * smoothstep(0.1, 0.75, ny) * 0.05;
    const frontFull = 0.985 + frontWeight * smoothstep(0.15, 0.7, ny) * 0.065;
    const backFull = 0.995 + backWeight * smoothstep(-0.3, 0.6, ny) * 0.045;

    let y = ny * 1.12 + 0.04;
    if (y < edgeY) {
      y = edgeY;
    }

    const nearEdge = smoothstep(0.2, 0, y - edgeY);
    const strandRipple =
      (Math.sin(az * 28 + ny * 2.4) * 0.01 + Math.sin(az * 46) * 0.005) *
      (1 - smoothstep(0.7, 0.98, ny));

    const rx = (sideWeight * sideFull + (1 - sideWeight) * 0.9) * (1 - nearEdge * 0.04);
    const rz =
      (frontWeight * frontFull + backWeight * backFull + sideWeight * 0.97) *
      (1 - nearEdge * 0.032);

    const x = nx * rx * (1 + strandRipple);
    const z = nz * rz * (1 + strandRipple) + frontWeight * nearEdge * 0.028;

    if (ny > 0.7) {
      y = ny * crownBoost + 0.05;
    }

    posAttr.setXYZ(i, x, y, z);
  }

  geometry.computeVertexNormals();
  return geometry;
}

function createSculptedTorsoGeometry(): THREE.BufferGeometry {
  const geometry = new THREE.SphereGeometry(
    1,
    72,
    48,
    -Math.PI / 2,
    Math.PI * 2,
    Math.PI * 0.14,
    Math.PI * 0.78,
  );
  const posAttr = geometry.attributes.position as THREE.BufferAttribute;

  for (let i = 0; i < posAttr.count; i++) {
    const nx = posAttr.getX(i);
    const ny = posAttr.getY(i);
    const nz = posAttr.getZ(i);

    const neckTaper = smoothstep(0.54, 0.92, ny);
    const shoulderBand = gauss3(Math.abs(nx) - 0.88, ny - 0.24, nz, 0.34, 0.36, 0.56);
    const chestFull = gauss3(nx, ny - 0.08, nz - 0.75, 0.62, 0.42, 0.42);
    const sleeveDrop = smoothstep(0.35, -0.5, ny) * smoothstep(0.68, 0.98, Math.abs(nx));

    const rx = 1.44 * (1 - neckTaper * 0.7) + shoulderBand * 0.11 - sleeveDrop * 0.14;
    const ry = 0.86;
    const rz = 0.64 * (1 - neckTaper * 0.4) + chestFull * 0.11;

    const x = nx * rx;
    let y = ny * ry - 1.18;
    const z = nz * rz - 0.08;

    if (ny < -0.58) {
      y = -1.68;
    }

    posAttr.setXYZ(i, x, y, z);
  }

  geometry.computeVertexNormals();
  return geometry;
}

function createFeedenFaceTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") {
    return null;
  }
  const width = 1024;
  const height = 512;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return null;
  }

  const baseGrad = ctx.createLinearGradient(0, 0, 0, height);
  baseGrad.addColorStop(0, "#BE896E");
  baseGrad.addColorStop(0.45, "#CB967A");
  baseGrad.addColorStop(0.76, "#C28B6F");
  baseGrad.addColorStop(1, "#A67158");
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, width, height);

  const napeFade = ctx.createLinearGradient(0, height * 0.28, 0, height * 0.66);
  napeFade.addColorStop(0, "rgba(18, 20, 24, 0.58)");
  napeFade.addColorStop(0.65, "rgba(28, 26, 26, 0.25)");
  napeFade.addColorStop(1, "rgba(28, 26, 26, 0)");
  ctx.fillStyle = napeFade;
  ctx.fillRect(0, height * 0.28, width * 0.28, height * 0.38);
  ctx.fillRect(width * 0.72, height * 0.28, width * 0.28, height * 0.38);

  const cx = width * 0.5;
  const foreheadShadow = ctx.createLinearGradient(0, height * 0.24, 0, height * 0.4);
  foreheadShadow.addColorStop(0, "rgba(38, 24, 18, 0.42)");
  foreheadShadow.addColorStop(1, "rgba(38, 24, 18, 0)");
  ctx.fillStyle = foreheadShadow;
  ctx.fillRect(cx - 170, height * 0.24, 340, height * 0.16);

  for (const dir of [-1, 1]) {
    const ex = cx + dir * 48;
    const ey = height * 0.46;
    const socket = ctx.createRadialGradient(ex, ey, 6, ex, ey, 40);
    socket.addColorStop(0, "rgba(74, 42, 32, 0.32)");
    socket.addColorStop(1, "rgba(74, 42, 32, 0)");
    ctx.fillStyle = socket;
    ctx.beginPath();
    ctx.ellipse(ex, ey, 38, 23, 0, 0, Math.PI * 2);
    ctx.fill();

    const jawShadowX = cx + dir * 92;
    const jawShadowY = height * 0.62;
    const jawShade = ctx.createRadialGradient(jawShadowX, jawShadowY, 4, jawShadowX, jawShadowY, 48);
    jawShade.addColorStop(0, "rgba(122, 74, 56, 0.18)");
    jawShade.addColorStop(1, "rgba(122, 74, 56, 0)");
    ctx.fillStyle = jawShade;
    ctx.beginPath();
    ctx.arc(jawShadowX, jawShadowY, 48, 0, Math.PI * 2);
    ctx.fill();
  }

  const noseShadow = ctx.createRadialGradient(cx, height * 0.565, 4, cx, height * 0.565, 26);
  noseShadow.addColorStop(0, "rgba(96, 56, 44, 0.32)");
  noseShadow.addColorStop(1, "rgba(96, 56, 44, 0)");
  ctx.fillStyle = noseShadow;
  ctx.beginPath();
  ctx.ellipse(cx, height * 0.565, 23, 12, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(76, 44, 34, 0.4)";
  ctx.beginPath();
  ctx.ellipse(cx - 9, height * 0.564, 4.6, 2.4, 0.15, 0, Math.PI * 2);
  ctx.ellipse(cx + 9, height * 0.564, 4.6, 2.4, -0.15, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(154, 96, 84, 0.54)";
  ctx.beginPath();
  ctx.ellipse(cx, height * 0.632, 32, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(88, 48, 40, 0.78)";
  ctx.lineWidth = 2.6;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(cx - 31, height * 0.634);
  ctx.quadraticCurveTo(cx, height * 0.629, cx + 31, height * 0.634);
  ctx.stroke();

  const lowerLipHighlight = ctx.createRadialGradient(cx, height * 0.642, 1, cx, height * 0.642, 16);
  lowerLipHighlight.addColorStop(0, "rgba(222, 174, 156, 0.25)");
  lowerLipHighlight.addColorStop(1, "rgba(222, 174, 156, 0)");
  ctx.fillStyle = lowerLipHighlight;
  ctx.beginPath();
  ctx.ellipse(cx, height * 0.642, 16, 4.6, 0, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function createEyeTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") {
    return null;
  }
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return null;
  }

  ctx.fillStyle = "#F2ECE6";
  ctx.fillRect(0, 0, 256, 128);

  const cx = 128;
  const cy = 64;

  const irisGrad = ctx.createRadialGradient(cx, cy, 4, cx, cy, 27);
  irisGrad.addColorStop(0, "#1A100A");
  irisGrad.addColorStop(0.58, "#3B2216");
  irisGrad.addColorStop(0.92, "#1A100A");
  irisGrad.addColorStop(1, "#120B07");
  ctx.fillStyle = irisGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, 27, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#060505";
  ctx.beginPath();
  ctx.arc(cx, cy, 13, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.arc(cx + 8, cy - 8, 5.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.beginPath();
  ctx.arc(cx - 6, cy + 6, 2.4, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function createNavyTeeTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") {
    return null;
  }
  const width = 1024;
  const height = 512;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return null;
  }

  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, "#162A4C");
  grad.addColorStop(0.5, "#132341");
  grad.addColorStop(1, "#0E1B33");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "rgba(255, 255, 255, 0.022)";
  for (let y = 0; y < height; y += 5) {
    ctx.fillRect(0, y, width, 1);
  }

  ctx.fillStyle = "#0E1A30";
  ctx.fillRect(0, 0, width, 34);

  const cx = width * 0.5;
  const boxW = 244;
  const boxH = 108;
  const boxX = cx - boxW / 2;
  const boxY = 178;

  ctx.fillStyle = "#101E38";
  ctx.fillRect(boxX - 3, boxY - 3, boxW + 6, boxH + 6);

  const barCount = 58;
  const barStep = boxW / barCount;
  for (let i = 0; i < barCount; i++) {
    const x = boxX + i * barStep;
    const isLight = i % 2 === 0;
    ctx.fillStyle = isLight ? "#CBD6E4" : "#1F3356";
    ctx.fillRect(x, boxY, Math.max(1.5, barStep * 0.58), 48);
    ctx.fillRect(x + barStep * 0.14, boxY + 55, Math.max(1.5, barStep * 0.58), 51);
  }

  ctx.fillStyle = "#142544";
  ctx.fillRect(boxX, boxY + 48, boxW, 7);

  ctx.fillStyle = "#C6D2E0";
  ctx.fillRect(boxX + boxW - 28, boxY + boxH + 9, 26, 5);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function createMicMeshTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") {
    return null;
  }
  const width = 256;
  const height = 256;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return null;
  }

  ctx.fillStyle = "#0C1520";
  ctx.fillRect(0, 0, width, height);

  const cols = 20;
  const rows = 20;
  const stepX = width / cols;
  const stepY = height / rows;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const offset = row % 2 === 0 ? 0 : stepX * 0.5;
      const x = (col * stepX + offset) % width;
      const y = row * stepY + stepY * 0.5;
      const t = row / rows;
      ctx.fillStyle = t < 0.5 ? "#54F0FF" : "#24B8F0";
      ctx.beginPath();
      ctx.arc(x, y, 3.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;
  return texture;
}

function createYodaEarGeometry(): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0.22);
  shape.quadraticCurveTo(0.6, 0.32, 1.28, 0.38);
  shape.quadraticCurveTo(0.76, -0.14, 0, -0.24);
  shape.closePath();

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.13,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.035,
    bevelThickness: 0.035,
  });
  geometry.center();
  geometry.translate(0.6, 0, 0);
  return geometry;
}

function createInnerEarGeometry(): THREE.ShapeGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0.08, 0.1);
  shape.quadraticCurveTo(0.56, 0.18, 1.08, 0.24);
  shape.quadraticCurveTo(0.64, -0.06, 0.08, -0.11);
  shape.closePath();
  return new THREE.ShapeGeometry(shape);
}

function createMascotEyeGeometry(): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(-0.28, 0.14);
  shape.quadraticCurveTo(-0.02, 0.05, 0.25, -0.07);
  shape.quadraticCurveTo(0.02, -0.19, -0.22, -0.06);
  shape.quadraticCurveTo(-0.31, 0.03, -0.28, 0.14);
  shape.closePath();

  return new THREE.ExtrudeGeometry(shape, {
    depth: 0.06,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.015,
    bevelThickness: 0.015,
  });
}

function createFdnBadgeTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") {
    return null;
  }
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return null;
  }
  ctx.clearRect(0, 0, 256, 128);
  ctx.fillStyle = "#090E15";
  ctx.fillRect(14, 16, 228, 96);
  ctx.strokeStyle = "#8BFF2A";
  ctx.lineWidth = 4;
  ctx.strokeRect(16, 18, 224, 92);
  ctx.fillStyle = "#8BFF2A";
  ctx.font = "700 62px 'Space Grotesk', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("FDN", 128, 66);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

export interface FeedenYodaController {
  setTargetProgress: (progress: number) => void;
  setPointer: (x: number, y: number) => void;
  dispose: () => void;
}

export function mountFeedenYodaScene(
  canvas: HTMLCanvasElement,
  initialProgress = 0,
  onReady?: () => void,
): FeedenYodaController | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
  } catch {
    return null;
  }

  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.18;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, -0.02, 7.45);

  const ambientLight = new THREE.AmbientLight(0xeef4f8, 1.05);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xfff4ea, 1.95);
  keyLight.position.set(2.8, 3.8, 5.4);
  scene.add(keyLight);

  const coolHairRim = new THREE.DirectionalLight(0xb0d0f8, 1.55);
  coolHairRim.position.set(-3.2, 4.2, -3.4);
  scene.add(coolHairRim);

  const limeRimLight = new THREE.PointLight(0x8bff2a, 1.4, 18);
  limeRimLight.position.set(-2.9, 1.8, -2.2);
  scene.add(limeRimLight);

  const emeraldFill = new THREE.PointLight(0x0d9f67, 1.5, 16);
  emeraldFill.position.set(3.2, -1.5, 2.4);
  scene.add(emeraldFill);

  const yodaFrontFill = new THREE.PointLight(0x4ade80, 0, 14);
  yodaFrontFill.position.set(0, 1.4, 3.8);
  scene.add(yodaFrontFill);

  const root = new THREE.Group();
  scene.add(root);

  const headAnchor = new THREE.Group();
  headAnchor.position.set(0, 0.42, 0);
  root.add(headAnchor);

  const neutralWhite = new THREE.Color("#FFFFFF");
  const yodaHeadTint = new THREE.Color("#1A3022");
  const skinSolidColor = new THREE.Color("#C79175");
  const yodaObsidianColor = new THREE.Color("#0D1913");
  const yodaLimeColor = new THREE.Color("#8BFF2A");
  const workingColor = new THREE.Color();

  const faceTexture = createFeedenFaceTexture();
  const headGeometry = createMorphedHeadGeometry();
  const headMaterial = new THREE.MeshStandardMaterial({
    color: neutralWhite.clone(),
    map: faceTexture ?? undefined,
    roughness: 0.62,
    metalness: 0.04,
  });

  const headMesh = new THREE.Mesh(headGeometry, headMaterial);
  headMesh.morphTargetInfluences = [0];
  headAnchor.add(headMesh);

  const hairGroup = new THREE.Group();
  const hairMaterial = new THREE.MeshStandardMaterial({
    color: 0x111419,
    roughness: 0.78,
    metalness: 0.02,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1,
  });

  const bowlHairMesh = new THREE.Mesh(createBowlFringeHairGeometry(), hairMaterial);
  bowlHairMesh.position.set(0, 0.01, -0.01);
  hairGroup.add(bowlHairMesh);
  headAnchor.add(hairGroup);

  const humanEarsGroup = new THREE.Group();
  const skinSolidMat = new THREE.MeshStandardMaterial({
    color: skinSolidColor.clone(),
    roughness: 0.64,
    metalness: 0.03,
  });
  const earInnerShadowMat = new THREE.MeshStandardMaterial({
    color: 0x9b6851,
    roughness: 0.72,
  });

  for (const side of [-1, 1]) {
    const earOuter = new THREE.Mesh(new THREE.SphereGeometry(0.175, 20, 18), skinSolidMat);
    earOuter.scale.set(0.38, 1.02, 0.7);
    earOuter.position.set(side * 0.81, -0.01, -0.04);
    earOuter.rotation.y = side * -0.22;
    earOuter.rotation.z = side * -0.1;
    humanEarsGroup.add(earOuter);

    const earInner = new THREE.Mesh(new THREE.SphereGeometry(0.098, 14, 14), earInnerShadowMat);
    earInner.scale.set(0.3, 0.8, 0.52);
    earInner.position.set(side * 0.825, -0.02, -0.01);
    humanEarsGroup.add(earInner);
  }
  headAnchor.add(humanEarsGroup);

  const streamerFaceGroup = new THREE.Group();
  const eyeTexture = createEyeTexture();
  const eyeBallMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: eyeTexture ?? undefined,
    roughness: 0.12,
    metalness: 0.08,
  });
  const eyelidMat = new THREE.MeshStandardMaterial({
    color: 0xb98267,
    roughness: 0.64,
  });
  const browMat = new THREE.MeshStandardMaterial({
    color: 0x101216,
    roughness: 0.76,
  });

  for (const side of [-1, 1]) {
    const eyeball = new THREE.Mesh(
      new THREE.SphereGeometry(0.114, 24, 24, -Math.PI / 2, Math.PI * 2),
      eyeBallMat,
    );
    eyeball.position.set(side * 0.265, 0.115, 0.79);
    eyeball.rotation.y = -0.05;
    streamerFaceGroup.add(eyeball);

    const upperLid = new THREE.Mesh(
      new THREE.SphereGeometry(0.124, 22, 16, -Math.PI / 2, Math.PI * 2, 0, Math.PI * 0.37),
      eyelidMat,
    );
    upperLid.position.set(side * 0.265, 0.128, 0.79);
    upperLid.rotation.x = 0.2;
    upperLid.rotation.z = side * -0.14;
    streamerFaceGroup.add(upperLid);

    const brow = new THREE.Mesh(new THREE.CapsuleGeometry(0.03, 0.25, 6, 12), browMat);
    brow.position.set(side * 0.27, 0.245, 0.855);
    brow.rotation.z = Math.PI / 2 + side * -0.19;
    brow.rotation.y = side * -0.24;
    streamerFaceGroup.add(brow);
  }
  headAnchor.add(streamerFaceGroup);

  const mascotEyesGroup = new THREE.Group();
  const mascotEyeMat = new THREE.MeshStandardMaterial({
    color: yodaLimeColor,
    emissive: 0x6bff12,
    emissiveIntensity: 1.5,
    roughness: 0.2,
    metalness: 0.1,
  });
  const mascotEyeGeo = createMascotEyeGeometry();
  const leftMascotEye = new THREE.Mesh(mascotEyeGeo, mascotEyeMat);
  leftMascotEye.position.set(-0.34, 0.16, 0.94);
  leftMascotEye.rotation.y = -0.22;
  mascotEyesGroup.add(leftMascotEye);

  const rightMascotEye = new THREE.Mesh(mascotEyeGeo, mascotEyeMat);
  rightMascotEye.scale.x = -1;
  rightMascotEye.position.set(0.34, 0.16, 0.94);
  rightMascotEye.rotation.y = 0.22;
  mascotEyesGroup.add(rightMascotEye);
  headAnchor.add(mascotEyesGroup);

  const yodaEarsGroup = new THREE.Group();
  const outerEarMat = new THREE.MeshStandardMaterial({
    color: 0x0a1312,
    emissive: 0x164208,
    emissiveIntensity: 0.4,
    roughness: 0.42,
    metalness: 0.15,
  });
  const innerEarMat = new THREE.MeshStandardMaterial({
    color: 0x8bff2a,
    emissive: 0x56f000,
    emissiveIntensity: 1.15,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });
  const earGeo = createYodaEarGeometry();
  const innerEarGeo = createInnerEarGeometry();

  const rightEarPivot = new THREE.Group();
  rightEarPivot.position.set(0.86, 0.08, -0.02);
  const rightEarMesh = new THREE.Mesh(earGeo, outerEarMat);
  const rightInnerEar = new THREE.Mesh(innerEarGeo, innerEarMat);
  rightInnerEar.position.set(0.02, 0, 0.105);
  rightEarPivot.add(rightEarMesh, rightInnerEar);

  const leftEarPivot = new THREE.Group();
  leftEarPivot.position.set(-0.86, 0.08, -0.02);
  leftEarPivot.scale.x = -1;
  const leftEarMesh = new THREE.Mesh(earGeo, outerEarMat);
  const leftInnerEar = new THREE.Mesh(innerEarGeo, innerEarMat);
  leftInnerEar.position.set(0.02, 0, 0.105);
  leftEarPivot.add(leftEarMesh, leftInnerEar);

  yodaEarsGroup.add(leftEarPivot, rightEarPivot);
  headAnchor.add(yodaEarsGroup);

  const neckMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.33, 0.39, 0.56, 32), skinSolidMat);
  neckMesh.position.set(0, -0.5, -0.07);
  neckMesh.rotation.x = 0.08;
  root.add(neckMesh);

  const torsoGeo = createSculptedTorsoGeometry();
  const shirtTexture = createNavyTeeTexture();
  const torsoMaterial = new THREE.MeshStandardMaterial({
    color: neutralWhite.clone(),
    map: shirtTexture ?? undefined,
    roughness: 0.78,
    metalness: 0.04,
  });
  const torsoMesh = new THREE.Mesh(torsoGeo, torsoMaterial);
  root.add(torsoMesh);

  const cloakShellMaterial = new THREE.MeshStandardMaterial({
    color: 0x0d141c,
    roughness: 0.62,
    metalness: 0.12,
    transparent: true,
    opacity: 0,
  });
  const cloakShellMesh = new THREE.Mesh(torsoGeo, cloakShellMaterial);
  cloakShellMesh.scale.setScalar(1.012);
  root.add(cloakShellMesh);

  const crewNeckMat = new THREE.MeshStandardMaterial({
    color: 0x101d35,
    roughness: 0.78,
  });
  const crewNeckRim = new THREE.Mesh(new THREE.TorusGeometry(0.43, 0.056, 14, 36), crewNeckMat);
  crewNeckRim.rotation.x = Math.PI * 0.48;
  crewNeckRim.position.set(0, -0.66, -0.04);
  root.add(crewNeckRim);

  const cloakCollarMat = new THREE.MeshStandardMaterial({
    color: 0x101822,
    roughness: 0.62,
    metalness: 0.14,
  });
  const cloakCollar = new THREE.Mesh(new THREE.TorusGeometry(0.82, 0.16, 18, 36), cloakCollarMat);
  cloakCollar.rotation.x = Math.PI * 0.45;
  cloakCollar.position.set(0, -0.78, 0.02);
  root.add(cloakCollar);

  const badgeTexture = createFdnBadgeTexture();
  const badgeMaterial = new THREE.MeshBasicMaterial({
    map: badgeTexture ?? undefined,
    color: badgeTexture ? 0xffffff : 0x8bff2a,
    transparent: true,
    opacity: 0,
  });
  const badgeMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.84, 0.42), badgeMaterial);
  badgeMesh.position.set(0, -1.12, 0.78);
  badgeMesh.rotation.x = -0.14;
  root.add(badgeMesh);

  const micGroup = new THREE.Group();
  micGroup.position.set(-1.08, -1.18, 0.92);
  micGroup.rotation.set(0.08, 0.25, -0.14);

  const micCapMat = new THREE.MeshStandardMaterial({
    color: 0x141920,
    roughness: 0.4,
    metalness: 0.35,
  });
  const micTexture = createMicMeshTexture();
  const micBodyMat = new THREE.MeshStandardMaterial({
    color: 0x9cf5ff,
    map: micTexture ?? undefined,
    emissive: 0x1cc8eb,
    emissiveMap: micTexture ?? undefined,
    emissiveIntensity: 0.9,
    roughness: 0.36,
    metalness: 0.24,
  });

  const micCap = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.25, 0.16, 28), micCapMat);
  micCap.position.set(0, 0.36, 0);
  micGroup.add(micCap);

  const micBody = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.22, 0.64, 28), micBodyMat);
  micBody.position.set(0, -0.02, 0);
  micGroup.add(micBody);

  const micBase = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.2, 0.12, 28), micCapMat);
  micBase.position.set(0, -0.38, 0);
  micGroup.add(micBase);
  root.add(micGroup);

  const haloMaterial = new THREE.MeshStandardMaterial({
    color: 0x8bff2a,
    emissive: 0x56f000,
    emissiveIntensity: 1.1,
    roughness: 0.22,
    metalness: 0.18,
  });
  const haloRing = new THREE.Mesh(new THREE.TorusGeometry(1.76, 0.06, 20, 72), haloMaterial);
  haloRing.position.set(0, 0.16, -0.82);
  root.add(haloRing);

  let targetProgress = clamp01(initialProgress);
  let currentProgress = targetProgress;
  let pointerX = 0;
  let pointerY = 0;
  let frameId = 0;
  let disposed = false;
  let readyNotified = false;

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function resize() {
    if (disposed) {
      return;
    }
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width || 480));
    const height = Math.max(1, Math.round(rect.height || 480));
    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function applyMorph(progress: number, timeSec: number) {
    const state = computeMorphParameters(progress);

    const introRaw = prefersReducedMotion ? 1 : clamp01(timeSec / 1.05);
    const introEase = 1 - Math.pow(1 - introRaw, 3);
    const introYaw = (1 - introEase) * -0.78;
    const introLift = (1 - introEase) * -0.32;
    const introScale = 0.86 + introEase * 0.14;

    const idleYaw = prefersReducedMotion ? 0 : Math.sin(timeSec * 0.65) * 0.08 * introEase;
    const idleFloat = prefersReducedMotion ? 0 : Math.sin(timeSec * 1.35) * 0.04 * introEase;
    const streamerTurnOffset = (1 - state.headMorph) * -0.12;

    root.rotation.y = state.rotationY + streamerTurnOffset + introYaw + idleYaw + pointerX * 0.28;
    root.rotation.x = pointerY * 0.16 + Math.sin(state.progress * Math.PI) * 0.06;
    root.position.y = idleFloat + introLift;
    root.scale.setScalar(introScale);

    if (headMesh.morphTargetInfluences) {
      headMesh.morphTargetInfluences[0] = state.headMorph;
    }

    workingColor.copy(neutralWhite).lerp(yodaHeadTint, state.eyeGlow);
    headMaterial.color.copy(workingColor);
    headMaterial.emissive.setHex(0x163c14);
    headMaterial.emissiveIntensity = state.eyeGlow * 0.65;
    headMaterial.roughness = 0.62 - state.eyeGlow * 0.2;

    workingColor.copy(skinSolidColor).lerp(yodaObsidianColor, state.eyeGlow);
    skinSolidMat.color.copy(workingColor);

    const cloakFade = smoothstep(0.32, 0.72, progress);
    cloakShellMaterial.opacity = cloakFade;
    cloakShellMesh.visible = cloakFade > 0.02;
    torsoMesh.visible = cloakFade < 0.98;

    const hairVisible = state.hairScale > 0.02;
    hairGroup.visible = hairVisible;
    hairGroup.scale.setScalar(0.985 + state.hairScale * 0.015);
    hairMaterial.opacity = state.hairScale;
    hairMaterial.depthWrite = state.hairScale > 0.5;

    const humanEarS = Math.max(0.001, 1 - smoothstep(0.24, 0.56, progress));
    humanEarsGroup.visible = humanEarS > 0.02;
    humanEarsGroup.scale.setScalar(humanEarS);

    const faceScale = Math.max(0.001, 1 - smoothstep(0.22, 0.56, progress));
    streamerFaceGroup.visible = faceScale > 0.02;
    streamerFaceGroup.scale.setScalar(faceScale);

    const mEyeScale = Math.max(0.001, state.eyeGlow);
    mascotEyesGroup.visible = state.eyeGlow > 0.02;
    mascotEyesGroup.scale.setScalar(mEyeScale);
    mascotEyeMat.emissiveIntensity = 0.65 + state.eyeGlow * 1.3;

    const earS = Math.max(0.001, state.earScale);
    yodaEarsGroup.visible = state.earScale > 0.02;
    leftEarPivot.scale.set(-earS, earS, earS);
    rightEarPivot.scale.set(earS, earS, earS);
    leftEarPivot.rotation.z = -0.28 + state.earScale * 0.32;
    rightEarPivot.rotation.z = 0.28 - state.earScale * 0.32;

    const mScale = Math.max(0.001, state.micScale);
    micGroup.visible = state.micScale > 0.02;
    micGroup.scale.setScalar(mScale);
    micGroup.position.y = -1.18 - (1 - state.micScale) * 0.75;

    const rScale = Math.max(0.001, state.ringScale);
    haloRing.visible = state.ringScale > 0.02;
    haloRing.scale.setScalar(rScale);

    const collarScale = Math.max(0.001, state.cloakLift);
    cloakCollar.visible = state.cloakLift > 0.03;
    cloakCollar.scale.setScalar(collarScale);
    cloakCollar.position.y = -0.88 + state.cloakLift * 0.24;

    crewNeckRim.visible = state.cloakLift < 0.5;
    badgeMaterial.opacity = state.ringScale;
    badgeMesh.visible = state.ringScale > 0.05;

    const introLightBoost = 0.6 + introEase * 0.4;
    keyLight.intensity = 1.95 * introLightBoost;
    limeRimLight.intensity = (1.4 + (1 - introEase) * 2.8) + state.eyeGlow * 5.2;
    coolHairRim.intensity = 1.55 - state.eyeGlow * 0.9;
    yodaFrontFill.intensity = state.eyeGlow * 2.4;
  }

  resize();
  const resizeObserver =
    typeof ResizeObserver === "function" ? new ResizeObserver(resize) : null;
  resizeObserver?.observe(canvas);

  const startMs = typeof performance !== "undefined" ? performance.now() : 0;

  function renderFrame(now: number) {
    if (disposed) {
      return;
    }
    const damping = prefersReducedMotion ? 1 : 0.12;
    currentProgress += (targetProgress - currentProgress) * damping;
    if (Math.abs(targetProgress - currentProgress) < 0.0008) {
      currentProgress = targetProgress;
    }

    applyMorph(currentProgress, Math.max(0, (now - startMs) * 0.001));
    renderer.render(scene, camera);
    if (!readyNotified) {
      readyNotified = true;
      onReady?.();
    }
    frameId = requestAnimationFrame(renderFrame);
  }

  frameId = requestAnimationFrame(renderFrame);

  return {
    setTargetProgress(next: number) {
      targetProgress = clamp01(next);
    },
    setPointer(x: number, y: number) {
      pointerX = Math.min(1, Math.max(-1, x));
      pointerY = Math.min(1, Math.max(-1, y));
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frameId);
      resizeObserver?.disconnect();
      const disposedGeos = new Set<THREE.BufferGeometry>();
      const disposedMats = new Set<THREE.Material>();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          if (!disposedGeos.has(obj.geometry)) {
            disposedGeos.add(obj.geometry);
            obj.geometry.dispose();
          }
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          for (const mat of mats) {
            if (!disposedMats.has(mat)) {
              disposedMats.add(mat);
              mat.dispose();
            }
          }
        }
      });
      faceTexture?.dispose();
      eyeTexture?.dispose();
      shirtTexture?.dispose();
      micTexture?.dispose();
      badgeTexture?.dispose();
      renderer.dispose();
    },
  };
}
