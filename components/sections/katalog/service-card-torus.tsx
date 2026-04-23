"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AsciiRenderer } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { cn } from "@/lib/utils";

interface ServiceCardTorusProps {
  className?: string;
  rotation?: "classic" | "profile" | "topdown";
}

function TorusMesh({ rotation = "classic" }: { rotation?: "classic" | "profile" | "topdown" }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const initialRotation = {
    classic: { x: 0.3, y: 0, z: 0 },
    profile: { x: 0.3, y: 1.2, z: 0 },
    topdown: { x: 1.0, y: 0, z: 0.2 },
  }[rotation];

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.05;
    meshRef.current.rotation.y += delta * 0.07;
  });

  return (
    <mesh ref={meshRef} rotation={[initialRotation.x, initialRotation.y, initialRotation.z]}>
      <torusKnotGeometry args={[1, 0.4, 128, 32, 2, 3]} />
      <meshPhongMaterial color="#2D6A4F" shininess={80} specular={new THREE.Color("#ffffff")} />
    </mesh>
  );
}

export function ServiceCardTorus({ className, rotation = "classic" }: ServiceCardTorusProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={cn("h-28 w-28", className)} aria-hidden="true" />;
  }

  return (
    <div className={cn("h-28 w-28", className)}>
      <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={1.8} />
        <directionalLight position={[-4, -3, -2]} intensity={0.4} color="#2D6A4F" />
        <TorusMesh rotation={rotation} />
        <AsciiRenderer
          fgColor="#1C1814"
          bgColor="transparent"
          characters={' .`"^,:;Il!i+*=%@#'}
          resolution={0.25}
          invert={false}
        />
      </Canvas>
    </div>
  );
}
