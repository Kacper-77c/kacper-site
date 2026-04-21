"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AsciiRenderer } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import * as THREE from "three";
import { DeskSVG } from "./desk-svg";

interface DeskSceneProps {
  className?: string;
}

function MonitorTorus() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.08;
    meshRef.current.rotation.y += delta * 0.1;
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.4, 128, 32, 2, 3]} />
      <meshPhongMaterial color="#2D6A4F" shininess={80} specular={new THREE.Color("#ffffff")} />
    </mesh>
  );
}

export function DeskScene({ className }: DeskSceneProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={cn("relative w-full aspect-[4/3] max-w-[640px] mx-auto", className)}
      aria-label="Ilustracja biurka Kacpra: monitor z obracającym się torusem, klawiatura, kubek z kawą, notes, kropla rozlewającej się kawy"
    >
      <DeskSVG />

      <div
        className="absolute pointer-events-none"
        style={{
          left: "57.5%",
          top: "23.3%",
          width: "28.75%",
          height: "28.3%",
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 3.5], fov: 50 }}
          style={{ background: "#0a0a0a" }}
          gl={{
            alpha: false,
            antialias: true,
            powerPreference: "low-power",
          }}
        >
          <ambientLight intensity={0.2} />
          <directionalLight position={[3, 3, 3]} intensity={1.5} />
          <directionalLight position={[-2, -1, -1]} intensity={0.3} color="#2D6A4F" />
          <MonitorTorus />
          <AsciiRenderer
            fgColor="#5FB878"
            bgColor="#0a0a0a"
            characters={' .`"^,:;Il!i+*=%@#'}
            resolution={0.18}
            invert={false}
          />
        </Canvas>

        {!prefersReducedMotion ? <TerminalCursor /> : null}
      </div>
    </div>
  );
}

function TerminalCursor() {
  return (
    <div
      className="absolute bottom-2 right-2 w-2 h-3 bg-[#5FB878] animate-blink"
      aria-hidden="true"
    />
  );
}
