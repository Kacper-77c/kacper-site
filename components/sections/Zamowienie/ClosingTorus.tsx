"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { MutableRefObject } from "react";

interface ClosingTorusProps {
  progressRef: MutableRefObject<{ value: number }>;
}

const PROGRESS_THROTTLE = 0.02;
const SPHERE_THRESHOLD = 0.96;
const SPHERE_START_R = 0.10;
const SPHERE_END_R = 0.05;

function easedProgress(raw: number): number {
  return raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2;
}

function TorusInner({ progressRef }: ClosingTorusProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const lastProgressRef = useRef(-1);
  const initialGeometry = useMemo(
    () => new THREE.TorusGeometry(1.0, 0.4, 32, 100),
    []
  );

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    const rawProgress = progressRef.current.value;
    const clampedProgress = THREE.MathUtils.clamp(rawProgress, 0, 1);
    const throttledProgress =
      Math.floor(clampedProgress / PROGRESS_THROTTLE) * PROGRESS_THROTTLE;

    if (
      Math.abs(throttledProgress - lastProgressRef.current) >= PROGRESS_THROTTLE
    ) {
      lastProgressRef.current = throttledProgress;

      meshRef.current.geometry.dispose();

      if (throttledProgress >= SPHERE_THRESHOLD) {
        // Sphere phase — lerp from matched-torus size to final dot
        const sphereProgress =
          (throttledProgress - SPHERE_THRESHOLD) / (1 - SPHERE_THRESHOLD);
        const sphereR = THREE.MathUtils.lerp(
          SPHERE_START_R,
          SPHERE_END_R,
          sphereProgress
        );
        meshRef.current.geometry = new THREE.SphereGeometry(sphereR, 32, 32);
      } else {
        // Torus phase — shrinking morph
        const eased = easedProgress(throttledProgress);
        const majorR = THREE.MathUtils.lerp(1.0, 0.05, eased);
        const minorR = THREE.MathUtils.lerp(0.4, 0.05, eased);
        meshRef.current.geometry = new THREE.TorusGeometry(majorR, minorR, 32, 100);
      }
    }

    meshRef.current.rotation.x += delta * 0.15;
    meshRef.current.rotation.y += delta * 0.2;
  });

  const rootStyles =
    typeof window !== "undefined" ? getComputedStyle(document.documentElement) : null;
  const paperColor =
    rootStyles?.getPropertyValue("--color-paper").trim() || "white";

  return (
    <mesh ref={meshRef} geometry={initialGeometry}>
      <meshStandardMaterial
        color={paperColor}
        roughness={0.4}
        metalness={0.1}
        emissive={paperColor}
        emissiveIntensity={0.05}
      />
    </mesh>
  );
}

export default function ClosingTorus({ progressRef }: ClosingTorusProps) {
  const rootStyles =
    typeof window !== "undefined" ? getComputedStyle(document.documentElement) : null;
  const scenicColor =
    rootStyles?.getPropertyValue("--color-scenic").trim() || "slateblue";

  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-3, -2, -3]} intensity={0.3} color={scenicColor} />
      <TorusInner progressRef={progressRef} />
    </Canvas>
  );
}
