// WorkstationScene.jsx — Three.js orbital workstation with monitor zoom
import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { createBlueprintTexture, createPCBTexture, createLabelTexture, createBlueprintScreenTexture } from './textures';
import { MONITOR_FOCUS_THRESHOLD } from './scrollConstants';

/* ─── Shared materials ─── */
const matDesk = new THREE.MeshStandardMaterial({ color: '#b8bec6', roughness: 0.88, metalness: 0.35 });
const matDark = new THREE.MeshStandardMaterial({ color: '#252a30', roughness: 0.92, metalness: 0.15 });
const matArm = new THREE.MeshStandardMaterial({ color: '#7a8a96', roughness: 0.55, metalness: 0.72 });
const matPencil = new THREE.MeshStandardMaterial({ color: '#c4af7a', roughness: 0.75, metalness: 0.0 });
const matTip = new THREE.MeshStandardMaterial({ color: '#282828', roughness: 0.6, metalness: 0.0 });
const matRuler = new THREE.MeshStandardMaterial({ color: '#c8cdd4', roughness: 0.4, metalness: 0.6 });
const matBezel = new THREE.MeshStandardMaterial({ color: '#1e2328', roughness: 0.88, metalness: 0.25 });

// Monitor screen center in world space (used for camera look-at target)
const SCREEN_POS = new THREE.Vector3(0, 0.78, -0.28);

/* ─── Camera rig — bidirectional, always scroll-driven ─── */
function CameraRig({ progressRef }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());
  const lookAtPt = useRef(new THREE.Vector3());

  useFrame(() => {
    const p = progressRef.current;
    let tx, ty, tz;
    let lx = 0, ly, lz;

    if (p <= 0.55) {
      const t = p / 0.55;
      const e = t * t * (3 - 2 * t);
      tz = 18 - e * 14;
      ty = 2.2 - e * 1.0;
      tx = 0;
      ly = 0.15;
      lz = 0;
    } else {
      const t = Math.min((p - 0.55) / 0.45, 1);
      const e = t * t * (3 - 2 * t);
      tz = 4 - e * 2.819;
      ty = 1.2 - e * (1.2 - SCREEN_POS.y);
      tx = 0;
      ly = 0.15 + e * (SCREEN_POS.y - 0.15);
      lz = e * SCREEN_POS.z;
    }

    // Snap to scroll progress — no lerp, so the screen never fills the viewport early
    target.current.set(tx, ty, tz);
    lookAtPt.current.set(lx, ly, lz);
    camera.position.copy(target.current);
    camera.lookAt(lookAtPt.current);
  });

  return null;
}

/* ─── Sparse stars ─── */
function Stars() {
  const { geom, mat } = useMemo(() => {
    const count = 280;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 35 + Math.random() * 60;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const m = new THREE.PointsMaterial({ color: '#9aafc0', size: 0.055, sizeAttenuation: true, transparent: true, opacity: 0.65 });
    return { geom: g, mat: m };
  }, []);
  return <points geometry={geom} material={mat} />;
}

/* ─── Haze ─── */
function Haze() {
  const mat = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#060a10', transparent: true, opacity: 0.18, side: THREE.DoubleSide, depthWrite: false,
  }), []);
  return (
    <>
      <mesh position={[0, 0, -8]} material={mat}><planeGeometry args={[60, 40]} /></mesh>
      <mesh position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]} material={mat}><planeGeometry args={[80, 80]} /></mesh>
    </>
  );
}

/* ─── Blueprint sheet ─── */
function Blueprint() {
  const tex = useMemo(() => createBlueprintTexture(), []);
  return (
    <mesh position={[0.45, 0.042, 0.2]} rotation={[-Math.PI / 2, 0, 0.12]} receiveShadow>
      <planeGeometry args={[2.2, 1.55]} />
      <meshStandardMaterial map={tex} roughness={0.92} metalness={0} color='#ffffff' />
    </mesh>
  );
}

/* ─── Computer monitor ─── */
function Monitor({ progressRef }) {
  const { size } = useThree();
  const aspect = size.width / size.height;
  const screenMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#f4f6f8' }), []);
  const texRef = useRef(null);

  const sh = 0.564;
  const sw = sh * aspect;

  const lastP = useRef(-1);
  useFrame(() => {
    const p = progressRef.current;
    if (p >= MONITOR_FOCUS_THRESHOLD) {
      if (screenMat.map) {
        screenMat.map.dispose();
        screenMat.map = null;
      }
      screenMat.color.set('#f4f6f8');
      return;
    }
    const rounded = Math.round(p * 80) / 80;
    if (rounded === lastP.current) return;
    lastP.current = rounded;
    if (texRef.current) texRef.current.dispose();
    texRef.current = createBlueprintScreenTexture(p);
    screenMat.map = texRef.current;
    screenMat.color.set('#ffffff');
  });

  const bezel = 0.028;
  const frameW = sw + bezel * 2;
  const frameH = sh + bezel * 2;

  // Monitor geometry
  // Stand base at y=0.04 (desk top), screen center at SCREEN_POS
  return (
    <group position={[SCREEN_POS.x, 0.04, SCREEN_POS.z]}>
      {/* Stand base (pushed back) */}
      <mesh position={[0, 0.012, -0.12]} material={matBezel} castShadow>
        <boxGeometry args={[0.36, 0.022, 0.22]} />
      </mesh>
      {/* Stand neck (pushed back) */}
      <mesh position={[0, 0.32, -0.15]} material={matBezel} castShadow>
        <boxGeometry args={[0.038, 0.58, 0.038]} />
      </mesh>
      {/* Mounting arm (horizontal at top of neck, connecting neck to back of screen) */}
      <mesh position={[0, 0.62, -0.09]} material={matBezel} castShadow>
        <boxGeometry args={[0.12, 0.028, 0.12]} />
      </mesh>

      {/* Outer bezel frame (centered around Z=0 for the screen plane) */}
      <group position={[0, SCREEN_POS.y - 0.04, 0]}>
        {/* Top bar */}
        <mesh position={[0, sh / 2 + bezel / 2, 0]} material={matBezel} castShadow>
          <boxGeometry args={[frameW, bezel, 0.036]} />
        </mesh>
        {/* Bottom bar */}
        <mesh position={[0, -sh / 2 - bezel / 2, 0]} material={matBezel} castShadow>
          <boxGeometry args={[frameW, bezel, 0.036]} />
        </mesh>
        {/* Left bar */}
        <mesh position={[-sw / 2 - bezel / 2, 0, 0]} material={matBezel} castShadow>
          <boxGeometry args={[bezel, sh, 0.036]} />
        </mesh>
        {/* Right bar */}
        <mesh position={[sw / 2 + bezel / 2, 0, 0]} material={matBezel} castShadow>
          <boxGeometry args={[bezel, sh, 0.036]} />
        </mesh>
        {/* Back panel */}
        <mesh position={[0, 0, -0.018]} material={matBezel}>
          <boxGeometry args={[frameW, frameH, 0.008]} />
        </mesh>

        {/* Screen surface — blueprint texture during scroll, portfolio Html when focused */}
        <mesh position={[0, 0, 0.01]} material={screenMat}>
          <planeGeometry args={[sw, sh]} />
        </mesh>
        {/* Subtle screen glow */}
        <pointLight color='#c8d8f4' intensity={0.6} distance={1.8} decay={2} position={[0, 0, 0.15]} />
      </group>

      {/* Status LED on monitor base */}
      <mesh position={[0.42, SCREEN_POS.y - 0.04 - 0.30, 0.01]}>
        <sphereGeometry args={[0.006, 8, 8]} />
        <meshStandardMaterial color='#4a90d9' emissive='#2060b0' emissiveIntensity={1.4} />
      </mesh>
    </group>
  );
}

/* ─── Keyboard ─── */
function Keyboard() {
  return (
    <group position={[0.05, 0.042, 0.55]}>
      <mesh material={matBezel} castShadow>
        <boxGeometry args={[0.72, 0.012, 0.24]} />
      </mesh>
      {/* Key rows (simplified) */}
      {[0, 1, 2, 3].map(row => (
        <mesh key={row} position={[0, 0.01, -0.08 + row * 0.055]} material={
          new THREE.MeshStandardMaterial({ color: '#1a1e24', roughness: 0.95, metalness: 0.05 })}>
          <boxGeometry args={[0.70, 0.004, 0.042]} />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Pencils ─── */
function Pencil({ pos, rot = 0 }) {
  return (
    <group position={pos} rotation={[0, rot, 0]}>
      <mesh material={matPencil} castShadow><cylinderGeometry args={[0.011, 0.011, 0.38, 6]} /></mesh>
      <mesh position={[0, -0.2, 0]} material={matTip} castShadow><coneGeometry args={[0.011, 0.032, 6]} /></mesh>
    </group>
  );
}

/* ─── PCB boards ─── */
function PCBBoard({ pos, rot = 0 }) {
  const tex = useMemo(() => createPCBTexture(), []);
  return (
    <group position={pos} rotation={[0, rot, 0]}>
      <mesh receiveShadow castShadow>
        <boxGeometry args={[0.32, 0.012, 0.22]} />
        <meshStandardMaterial color='#2b3c44' roughness={0.85} metalness={0.12} />
      </mesh>
      <mesh position={[0, 0.007, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.32, 0.22]} />
        <meshStandardMaterial map={tex} roughness={0.9} metalness={0} transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

/* ─── Status LEDs ─── */
function StatusLEDs() {
  const refs = [useRef(), useRef(), useRef(), useRef()];
  useFrame(() => {
    const t = Date.now();
    refs.forEach((r, i) => { if (r.current) r.current.intensity = 0.35 + 0.25 * Math.sin(t * 0.0022 + i * 1.3); });
  });
  return (
    <>
      {[[-1.6, 0.048, 0.72], [-1.5, 0.048, 0.72], [1.4, 0.048, 0.72], [1.46, 0.048, 0.72]].map((p, i) => (
        <group key={i} position={p}>
          <mesh><sphereGeometry args={[0.009, 8, 8]} />
            <meshStandardMaterial color='#4a90d9' emissive='#2060b0' emissiveIntensity={1.2} roughness={0.2} metalness={0.1} />
          </mesh>
          <pointLight ref={refs[i]} color='#4a90d9' intensity={0.4} distance={0.35} decay={2} />
        </group>
      ))}
    </>
  );
}

/* ─── Lamp ─── */
function Lamp() {
  const lightRef = useRef();
  useFrame(() => {
    if (lightRef.current) lightRef.current.intensity = 1.4 * (0.92 + 0.08 * Math.sin(Date.now() * 0.0011));
  });
  return (
    <group position={[1.72, 0.04, -0.5]}>
      <mesh position={[0, 0.38, 0]} material={matDark} castShadow><boxGeometry args={[0.036, 0.72, 0.036]} /></mesh>
      <mesh position={[-0.28, 0.76, 0]} rotation={[0, 0, Math.PI / 10]} material={matDark} castShadow><boxGeometry args={[0.6, 0.030, 0.030]} /></mesh>
      <mesh position={[-0.58, 0.68, 0]} material={matDark} castShadow><boxGeometry args={[0.2, 0.065, 0.12]} /></mesh>
      <pointLight ref={lightRef} color='#c8d8f0' intensity={1.4} distance={3.5} decay={2} position={[-0.58, 0.63, 0]} />
    </group>
  );
}

/* ─── Robotic arm ─── */
function RoboticArm() {
  return (
    <group position={[-1.55, 0.04, -0.3]} rotation={[0, 0.3, 0]}>
      <mesh material={matArm} castShadow><cylinderGeometry args={[0.085, 0.095, 0.045, 16]} /></mesh>
      <group position={[0, 0.022, 0]} rotation={[0, 0, -0.3]}>
        <mesh position={[0, 0.18, 0]} material={matArm} castShadow><cylinderGeometry args={[0.032, 0.038, 0.34, 10]} /></mesh>
        <group position={[0.09, 0.36, 0]}>
          <mesh material={matDesk} castShadow><cylinderGeometry args={[0.042, 0.042, 0.058, 12]} rotation={[Math.PI / 2, 0, 0]} /></mesh>
          <group rotation={[0, 0, 0.5]}>
            <mesh position={[0, 0.15, 0]} material={matArm} castShadow><cylinderGeometry args={[0.024, 0.030, 0.26, 10]} /></mesh>
            <group position={[0, 0.27, 0]}>
              <mesh material={matDark} castShadow><cylinderGeometry args={[0.022, 0.022, 0.035, 10]} /></mesh>
              <mesh position={[0.018, 0.028, 0]} rotation={[0, 0, -0.2]} material={matArm}><boxGeometry args={[0.008, 0.042, 0.016]} /></mesh>
              <mesh position={[-0.018, 0.028, 0]} rotation={[0, 0, 0.2]} material={matArm}><boxGeometry args={[0.008, 0.042, 0.016]} /></mesh>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

/* ─── Surface label ─── */
function SurfaceLabel({ text, pos, rotY = 0 }) {
  const tex = useMemo(() => createLabelTexture(text), [text]);
  return (
    <mesh position={pos} rotation={[-Math.PI / 2, 0, rotY]}>
      <planeGeometry args={[0.28, 0.052]} />
      <meshStandardMaterial map={tex} transparent alphaTest={0.05} roughness={1} metalness={0} depthWrite={false} />
    </mesh>
  );
}

/* ─── Full desk ─── */
function Desk({ progressRef }) {
  const legPos = [[-1.85, -0.64, -1.22], [1.85, -0.64, -1.22], [-1.85, -0.64, 1.22], [1.85, -0.64, 1.22]];
  return (
    <group>
      <mesh position={[0, 0, 0]} receiveShadow castShadow material={matDesk}><boxGeometry args={[4.0, 0.08, 2.55]} /></mesh>
      {legPos.map((p, i) => <mesh key={i} position={p} material={matDesk} castShadow><boxGeometry args={[0.065, 1.2, 0.065]} /></mesh>)}
      <mesh position={[0, -0.82, 0]} material={matDesk} receiveShadow><boxGeometry args={[3.6, 0.04, 1.8]} /></mesh>

      <Monitor progressRef={progressRef} />
      <Keyboard />
      <Blueprint />
      <Pencil pos={[1.2, 0.085, 0.7]} rot={0.12} />
      <Pencil pos={[1.32, 0.085, 0.74]} rot={-0.08} />
      <mesh position={[1.4, 0.046, 0.55]} rotation={[0, 0.08, 0]} material={matRuler} castShadow><boxGeometry args={[0.95, 0.007, 0.038]} /></mesh>
      <RoboticArm />
      <PCBBoard pos={[-0.82, 0.048, 0.62]} rot={0.15} />
      <PCBBoard pos={[1.55, 0.048, 0.72]} rot={-0.08} />
      <StatusLEDs />
      <Lamp />
      <mesh position={[-1.3, 0.058, 0.3]} rotation={[0, 0.25, 0]}
        material={new THREE.MeshStandardMaterial({ color: '#d8e2ea', roughness: 0.95, metalness: 0 })}>
        <boxGeometry args={[0.45, 0.02, 0.36]} />
      </mesh>
      <SurfaceLabel text="unit_07" pos={[0.5, 0.043, 1.1]} />
      <SurfaceLabel text="vision_module" pos={[-1.2, 0.043, -0.2]} rotY={0.3} />
    </group>
  );
}

/* ─── Background dome ─── */
function Background() {
  const texture = useMemo(() => {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createRadialGradient(
      size * 0.5,
      size * 0.4,
      size * 0.08,
      size * 0.5,
      size * 0.5,
      size * 0.6,
    );
    gradient.addColorStop(0, 'rgba(110, 155, 205, 0.25)');
    gradient.addColorStop(0.4, 'rgba(20, 32, 50, 0.8)');
    gradient.addColorStop(1, 'rgba(6, 12, 22, 1.0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  return (
    <mesh position={[0, 0.5, -20]} rotation={[0, 0, 0]}>
      <sphereGeometry args={[70, 32, 32]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} toneMapped={false} />
    </mesh>
  );
}

/* ─── Scene environment ─── */
function Environment() {
  const { scene } = useThree();
  useEffect(() => {
    scene.fog = new THREE.FogExp2('#081320', 0.028);
    scene.background = new THREE.Color('#081320');
  }, [scene]);
  return (
    <>
      <ambientLight color='#16223a' intensity={0.55} />
      <hemisphereLight skyColor='#2a3c58' groundColor='#071217' intensity={0.95} />
      <directionalLight color='#c8dbea' intensity={1.3} position={[3.5, 7, 3]} castShadow shadow-mapSize={[1024, 1024]} shadow-camera-far={30} />
      <directionalLight color='#8090a8' intensity={0.4} position={[-4, 3, -2]} />
      <directionalLight color='#3050a0' intensity={0.18} position={[0, -2, -5]} />
    </>
  );
}

/* ─── Export ─── */
export default function WorkstationScene({ progressRef }) {
  return (
    <Canvas
      camera={{ position: [0, 2.2, 18], fov: 22, near: 0.05, far: 200 }}
      shadows
      gl={{ antialias: true, alpha: false }}
      style={{ width: '100%', height: '100%' }}
    >
      <Background />
      <Environment />
      <Stars />
      <Haze />
      <Desk progressRef={progressRef} />
      <CameraRig progressRef={progressRef} />
    </Canvas>
  );
}
