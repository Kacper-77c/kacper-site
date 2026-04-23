"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AsciiRenderer } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { cn } from "@/lib/utils";

interface GrowingTorusProps {
  scrollProgress: number;
  className?: string;
}

function getTorusParams(progress: number) {
  const p = Math.max(0, Math.min(1, progress));
  const tube = 0.08 + (0.4 - 0.08) * p;
  const tubularSegments = Math.floor(16 + (128 - 16) * p);
  const radialSegments = Math.floor(4 + (32 - 4) * p);
  return { tube, tubularSegments, radialSegments };
}

function TorusMesh({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const lastRebuildProgress = useRef(0);
  const [currentParams, setCurrentParams] = useState(() => getTorusParams(0));
  const geometryRef = useRef<THREE.TorusKnotGeometry | null>(null);

  useEffect(() => {
    const diff = Math.abs(scrollProgress - lastRebuildProgress.current);
    if (diff >= 0.02) {
      lastRebuildProgress.current = scrollProgress;
      setCurrentParams(getTorusParams(scrollProgress));
    }
  }, [scrollProgress]);

  const geometry = useMemo(() => {
    if (geometryRef.current) {
      geometryRef.current.dispose();
    }

    const geo = new THREE.TorusKnotGeometry(
      1,
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
      <meshPhongMaterial color="#2D6A4F" shininess={80} specular={new THREE.Color("#ffffff")} />
    </mesh>
  );
}

export function GrowingTorus({ scrollProgress, className }: GrowingTorusProps) {
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
        <TorusMesh scrollProgress={scrollProgress} />
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
