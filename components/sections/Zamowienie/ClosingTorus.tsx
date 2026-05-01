"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AsciiRenderer } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { cn } from "@/lib/utils";

interface ClosingTorusProps {
  scrollProgress: number;
  className?: string;
}

function easedProgress(raw: number): number {
  // slow start, dramatic end
  return raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2;
}

function getTorusKnotParams(progress: number) {
  const p = Math.max(0, Math.min(1, progress));
  const eased = easedProgress(p);
  return {
    radius: THREE.MathUtils.lerp(1.0, 0.15, eased),
    tube: THREE.MathUtils.lerp(0.4, 0.04, eased),
    tubularSegments: Math.floor(THREE.MathUtils.lerp(128, 32, eased)),
    radialSegments: Math.floor(THREE.MathUtils.lerp(32, 8, eased)),
  };
}

function TorusKnotMesh({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const lastRebuildProgress = useRef(0);
  const [currentParams, setCurrentParams] = useState(() => getTorusKnotParams(0));
  const geometryRef = useRef<THREE.TorusKnotGeometry | null>(null);

  useEffect(() => {
    const diff = Math.abs(scrollProgress - lastRebuildProgress.current);
    if (diff >= 0.02) {
      lastRebuildProgress.current = scrollProgress;
      setCurrentParams(getTorusKnotParams(scrollProgress));
    }
  }, [scrollProgress]);

  const geometry = useMemo(() => {
    if (geometryRef.current) {
      geometryRef.current.dispose();
    }
    const geo = new THREE.TorusKnotGeometry(
      currentParams.radius,
      currentParams.tube,
      currentParams.tubularSegments,
      currentParams.radialSegments,
      2,
      3
    );
    geometryRef.current = geo;
    return geo;
  }, [currentParams]);

  useEffect(() => {
    return () => {
      if (geometryRef.current) {
        geometryRef.current.dispose();
      }
    };
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.15;
    meshRef.current.rotation.y += delta * 0.2;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshPhongMaterial
        color="#2D6A4F"
        shininess={80}
        specular={new THREE.Color("#ffffff")}
      />
    </mesh>
  );
}

export function ClosingTorus({ scrollProgress, className }: ClosingTorusProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className={cn("w-full h-full flex items-center justify-center", className)}>
        <pre className="font-mono text-[0.6rem] leading-none text-paper/80">
{`     .::=**##%%@@##**=::.
   :=*#%@@@@@@@@@@@@@@%#*=:
 =#@@@@%#==-::::--==#%@@@@#=
#@@@%+.                  .+%@@@#
 =#@@@@%#==-::::--==#%@@@@#=
   :=*#%@@@@@@@@@@@@@@%#*=:
     .::=**##%%@@##**=::.     `}
        </pre>
      </div>
    );
  }

  return (
    <div className={cn("w-full h-full", className)}>
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 50 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
        }}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={1.8} />
        <directionalLight position={[-4, -3, -2]} intensity={0.4} color="#2D6A4F" />
        <TorusKnotMesh scrollProgress={scrollProgress} />
        <AsciiRenderer
          fgColor="#F7F4EF"
          bgColor="transparent"
          characters={' .`"^,:;Il!i+*=%@#'}
          resolution={0.18}
          invert={false}
        />
      </Canvas>
    </div>
  );
}

// Default export for backward compatibility (jeśli inne pliki importują default)
export default ClosingTorus;
