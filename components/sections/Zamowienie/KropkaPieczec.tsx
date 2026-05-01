"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function KropkaInner() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.3;
    meshRef.current.rotation.y += delta * 0.4;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.05, 32, 32]} />
      <meshStandardMaterial
        color="#F7F4EF"
        roughness={0.4}
        metalness={0.1}
        emissive="#F7F4EF"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

export default function KropkaPieczec() {
  return (
    <div className="w-16 h-16">
      <Canvas camera={{ position: [0, 0, 0.3], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <KropkaInner />
      </Canvas>
    </div>
  );
}
