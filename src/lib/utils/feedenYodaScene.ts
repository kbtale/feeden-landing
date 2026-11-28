import * as THREE from "three";

export interface MorphParameters {
  progress: number;
  rotationY: number;
  earScale: number;
  headphoneScale: number;
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
    earScale: smoothstep(0.22, 0.92, progress),
    headphoneScale: 1 - smoothstep(0.05, 0.52, progress),
    ringScale: smoothstep(0.32, 0.96, progress),
    eyeGlow: smoothstep(0.25, 0.88, progress),
    cloakLift: smoothstep(0.18, 0.85, progress),
  };
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
  camera.position.set(0, 0.06, 7.25);

  const ambientLight = new THREE.AmbientLight(0xe4f7eb, 1.05);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.9);
  keyLight.position.set(3.2, 4.6, 5.6);
  scene.add(keyLight);

  const rimLight = new THREE.PointLight(0x8bff2a, 4.2, 18);
  rimLight.position.set(-2.8, 1.9, -2.4);
  scene.add(rimLight);

  const emeraldFill = new THREE.PointLight(0x0d9f67, 2.8, 16);
  emeraldFill.position.set(3.0, -1.6, 2.6);
  scene.add(emeraldFill);

  const root = new THREE.Group();
  scene.add(root);

  const streamerSkinColor = new THREE.Color("#D4B297");
  const yodaObsidianColor = new THREE.Color("#0B111A");
  const streamerEyesColor = new THREE.Color("#11161C");
  const yodaLimeColor = new THREE.Color("#8BFF2A");
  const workingColor = new THREE.Color();

  const headMaterial = new THREE.MeshStandardMaterial({
    color: streamerSkinColor.clone(),
    roughness: 0.54,
    metalness: 0.06,
  });

  const headMesh = new THREE.Mesh(new THREE.SphereGeometry(1.04, 44, 36), headMaterial);
  headMesh.scale.set(1.0, 1.05, 0.96);
  headMesh.position.set(0, 0.28, 0);
  root.add(headMesh);

  const hairGroup = new THREE.Group();
  const hairMaterial = new THREE.MeshStandardMaterial({
    color: 0x161c22,
    roughness: 0.72,
    metalness: 0.05,
  });
  const hairCap = new THREE.Mesh(
    new THREE.SphereGeometry(1.09, 36, 24, 0, Math.PI * 2, 0, Math.PI * 0.42),
    hairMaterial,
  );
  hairCap.position.set(0, 0.34, -0.04);
  hairCap.rotation.x = -0.24;
  hairGroup.add(hairCap);

  const hairQuiff = new THREE.Mesh(new THREE.CapsuleGeometry(0.22, 0.62, 8, 16), hairMaterial);
  hairQuiff.rotation.set(0.18, 0.14, Math.PI * 0.44);
  hairQuiff.position.set(0.08, 1.18, 0.36);
  hairGroup.add(hairQuiff);
  root.add(hairGroup);

  const headphoneGroup = new THREE.Group();
  const hpShellMat = new THREE.MeshStandardMaterial({
    color: 0x192026,
    roughness: 0.34,
    metalness: 0.45,
  });
  const hpLimeMat = new THREE.MeshStandardMaterial({
    color: 0x8bff2a,
    emissive: 0x56f000,
    emissiveIntensity: 0.75,
    roughness: 0.24,
    metalness: 0.2,
  });

  const band = new THREE.Mesh(
    new THREE.TorusGeometry(1.22, 0.09, 16, 48, Math.PI * 1.04),
    hpShellMat,
  );
  band.rotation.z = -Math.PI * 0.02;
  band.position.set(0, 0.3, 0);
  headphoneGroup.add(band);

  for (const side of [-1, 1]) {
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.37, 0.22, 28), hpShellMat);
    cup.rotation.z = Math.PI / 2;
    cup.position.set(side * 1.14, 0.24, 0);
    headphoneGroup.add(cup);

    const cupRing = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.032, 12, 32), hpLimeMat);
    cupRing.rotation.y = Math.PI / 2;
    cupRing.position.set(side * 1.26, 0.24, 0);
    headphoneGroup.add(cupRing);
  }

  const micArm = new THREE.Mesh(new THREE.CapsuleGeometry(0.026, 0.68, 6, 12), hpShellMat);
  micArm.rotation.set(0.48, 0.22, -0.78);
  micArm.position.set(-0.76, -0.06, 0.62);
  headphoneGroup.add(micArm);

  const micTip = new THREE.Mesh(new THREE.SphereGeometry(0.06, 14, 14), hpLimeMat);
  micTip.position.set(-0.44, -0.24, 0.94);
  headphoneGroup.add(micTip);
  root.add(headphoneGroup);

  const streamerFaceGroup = new THREE.Group();
  const streamerEyeMat = new THREE.MeshStandardMaterial({
    color: streamerEyesColor,
    roughness: 0.16,
    metalness: 0.12,
  });
  const catchlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const mouthMat = new THREE.MeshStandardMaterial({
    color: 0x3b2a22,
    roughness: 0.65,
  });

  for (const side of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.115, 20, 20), streamerEyeMat);
    eye.scale.set(1.08, 1.0, 0.65);
    eye.position.set(side * 0.34, 0.27, 0.95);
    streamerFaceGroup.add(eye);

    const catchlight = new THREE.Mesh(new THREE.SphereGeometry(0.032, 10, 10), catchlightMat);
    catchlight.position.set(side * 0.34 + 0.035, 0.31, 1.02);
    streamerFaceGroup.add(catchlight);

    const brow = new THREE.Mesh(new THREE.CapsuleGeometry(0.035, 0.22, 6, 12), hairMaterial);
    brow.rotation.z = Math.PI / 2 + side * -0.1;
    brow.position.set(side * 0.34, 0.48, 0.94);
    streamerFaceGroup.add(brow);
  }

  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.065, 14, 14), headMaterial);
  nose.scale.set(0.9, 1.15, 0.9);
  nose.position.set(0, 0.11, 1.01);
  streamerFaceGroup.add(nose);

  const smile = new THREE.Mesh(
    new THREE.TorusGeometry(0.15, 0.022, 10, 24, Math.PI * 0.72),
    mouthMat,
  );
  smile.rotation.z = Math.PI * 1.14;
  smile.position.set(0, -0.02, 0.96);
  streamerFaceGroup.add(smile);

  root.add(streamerFaceGroup);

  const mascotEyesGroup = new THREE.Group();
  const mascotEyeMat = new THREE.MeshStandardMaterial({
    color: yodaLimeColor,
    emissive: 0x6bff12,
    emissiveIntensity: 1.5,
    roughness: 0.2,
    metalness: 0.1,
  });
  const eyeGeo = createMascotEyeGeometry();
  const leftMascotEye = new THREE.Mesh(eyeGeo, mascotEyeMat);
  leftMascotEye.position.set(-0.34, 0.3, 0.98);
  leftMascotEye.rotation.y = -0.22;
  mascotEyesGroup.add(leftMascotEye);

  const rightMascotEye = new THREE.Mesh(eyeGeo, mascotEyeMat);
  rightMascotEye.scale.x = -1;
  rightMascotEye.position.set(0.34, 0.3, 0.98);
  rightMascotEye.rotation.y = 0.22;
  mascotEyesGroup.add(rightMascotEye);
  root.add(mascotEyesGroup);

  const earsGroup = new THREE.Group();
  const outerEarMat = new THREE.MeshStandardMaterial({
    color: 0x0a111a,
    emissive: 0x164208,
    emissiveIntensity: 0.35,
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
  rightEarPivot.position.set(0.84, 0.28, -0.02);
  const rightEarMesh = new THREE.Mesh(earGeo, outerEarMat);
  const rightInnerEar = new THREE.Mesh(innerEarGeo, innerEarMat);
  rightInnerEar.position.set(0.02, 0, 0.105);
  rightEarPivot.add(rightEarMesh, rightInnerEar);

  const leftEarPivot = new THREE.Group();
  leftEarPivot.position.set(-0.84, 0.28, -0.02);
  leftEarPivot.scale.x = -1;
  const leftEarMesh = new THREE.Mesh(earGeo, outerEarMat);
  const leftInnerEar = new THREE.Mesh(innerEarGeo, innerEarMat);
  leftInnerEar.position.set(0.02, 0, 0.105);
  leftEarPivot.add(leftEarMesh, leftInnerEar);

  earsGroup.add(leftEarPivot, rightEarPivot);
  root.add(earsGroup);

  const cloakMaterial = new THREE.MeshStandardMaterial({
    color: 0x121922,
    roughness: 0.64,
    metalness: 0.12,
  });
  const shoulders = new THREE.Mesh(new THREE.CylinderGeometry(0.84, 1.28, 1.0, 36), cloakMaterial);
  shoulders.position.set(0, -1.12, -0.06);
  root.add(shoulders);

  const collarMesh = new THREE.Mesh(new THREE.TorusGeometry(0.84, 0.16, 18, 36), cloakMaterial);
  collarMesh.rotation.x = Math.PI * 0.45;
  collarMesh.position.set(0, -0.72, 0.04);
  root.add(collarMesh);

  const badgeTexture = createFdnBadgeTexture();
  const badgeMaterial = new THREE.MeshBasicMaterial({
    map: badgeTexture ?? undefined,
    color: badgeTexture ? 0xffffff : 0x8bff2a,
    transparent: true,
    opacity: 0,
  });
  const badgeMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.88, 0.44), badgeMaterial);
  badgeMesh.position.set(0, -1.04, 1.18);
  badgeMesh.rotation.x = -0.34;
  root.add(badgeMesh);

  const haloMaterial = new THREE.MeshStandardMaterial({
    color: 0x8bff2a,
    emissive: 0x56f000,
    emissiveIntensity: 1.1,
    roughness: 0.22,
    metalness: 0.18,
  });
  const haloRing = new THREE.Mesh(new THREE.TorusGeometry(1.74, 0.064, 20, 72), haloMaterial);
  haloRing.position.set(0, 0.1, -0.48);
  root.add(haloRing);

  let targetProgress = clamp01(initialProgress);
  let currentProgress = targetProgress;
  let pointerX = 0;
  let pointerY = 0;
  let frameId = 0;
  let disposed = false;

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

    const idleYaw = prefersReducedMotion ? 0 : Math.sin(timeSec * 0.7) * 0.12;
    const idleFloat = prefersReducedMotion ? 0 : Math.sin(timeSec * 1.4) * 0.05;

    root.rotation.y = state.rotationY + idleYaw + pointerX * 0.32;
    root.rotation.x = pointerY * 0.2 + Math.sin(state.progress * Math.PI) * 0.08;
    root.position.y = idleFloat;

    workingColor.copy(streamerSkinColor).lerp(yodaObsidianColor, state.eyeGlow);
    headMaterial.color.copy(workingColor);
    headMaterial.emissive.setHex(0x112b0b);
    headMaterial.emissiveIntensity = state.eyeGlow * 0.55;

    headMesh.scale.set(
      1 + state.earScale * 0.07,
      1.05 - state.earScale * 0.14,
      0.96 + state.earScale * 0.04,
    );

    const hpScale = Math.max(0.001, state.headphoneScale);
    headphoneGroup.visible = state.headphoneScale > 0.02;
    headphoneGroup.scale.setScalar(hpScale);
    headphoneGroup.position.y = (1 - state.headphoneScale) * 0.32;

    const hairScale = Math.max(0.001, 1 - smoothstep(0.1, 0.56, progress));
    hairGroup.visible = hairScale > 0.02;
    hairGroup.scale.setScalar(hairScale);

    const faceScale = Math.max(0.001, 1 - smoothstep(0.14, 0.52, progress));
    streamerFaceGroup.visible = faceScale > 0.02;
    streamerFaceGroup.scale.setScalar(faceScale);

    const mEyeScale = Math.max(0.001, state.eyeGlow);
    mascotEyesGroup.visible = state.eyeGlow > 0.02;
    mascotEyesGroup.scale.setScalar(mEyeScale);
    mascotEyeMat.emissiveIntensity = 0.65 + state.eyeGlow * 1.3;

    const earS = Math.max(0.001, state.earScale);
    earsGroup.visible = state.earScale > 0.02;
    leftEarPivot.scale.set(-earS, earS, earS);
    rightEarPivot.scale.set(earS, earS, earS);
    leftEarPivot.rotation.z = -0.32 + state.earScale * 0.36;
    rightEarPivot.rotation.z = 0.32 - state.earScale * 0.36;

    const rScale = Math.max(0.001, state.ringScale);
    haloRing.visible = state.ringScale > 0.02;
    haloRing.scale.setScalar(rScale);
    haloRing.rotation.x = (1 - state.ringScale) * 1.2;

    collarMesh.position.y = -0.72 + state.cloakLift * 0.12;
    collarMesh.scale.setScalar(1 + state.cloakLift * 0.05);
    badgeMaterial.opacity = state.ringScale;
    badgeMesh.visible = state.ringScale > 0.05;

    rimLight.intensity = 2.4 + state.eyeGlow * 5.0;
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

    applyMorph(currentProgress, (now - startMs) * 0.001);
    renderer.render(scene, camera);
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
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((mat) => mat.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      badgeTexture?.dispose();
      renderer.dispose();
    },
  };
}
