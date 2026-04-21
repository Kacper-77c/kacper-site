"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AsciiRenderer } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { cn } from "@/lib/utils";

interface TorusSealProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  dark?: boolean;
}

function TorusMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.05;
    meshRef.current.rotation.y += delta * 0.06;
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.4, 128, 32, 2, 3]} />
      <meshPhongMaterial color="#2D6A4F" shininess={80} specular={new THREE.Color("#ffffff")} />
    </mesh>
  );
}

export function TorusSeal({ className, size = "md", dark = false }: TorusSealProps) {
  const prefersReducedMotion = useReducedMotion();

  const sizeClasses = {
    sm: "w-32 h-32",
    md: "w-56 h-56",
    lg: "w-80 h-80",
  };

  const fg = dark ? "#F7F4EF" : "#1C1814";

  if (prefersReducedMotion) {
    return (
      <div className={cn(sizeClasses[size], className, "opacity-80")}>
        <pre
          className={cn(
            "font-mono text-[0.5rem] leading-none whitespace-pre",
            dark ? "text-paper" : "text-ink"
          )}
        >
{`    .:=*#%@@%*=:.    
  :+#@@@@@@@@@@@#+:  
 =%@@@#=-::-=%@@@%=  
:@@@*.        .*@@@: 
 =%@@@#=-::-=%@@@%=  
  :+#@@@@@@@@@@@#+:  
    .:=*#%@@%*=:.    `}
        </pre>
      </div>
    );
  }

  return (
    <div className={cn(sizeClasses[size], className)}>
      <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
        <ambientLight intensity={0.15} />
        <directionalLight position={[5, 5, 5]} intensity={1.8} />
        <directionalLight position={[-4, -3, -2]} intensity={0.4} color="#2D6A4F" />
        <TorusMesh />
        <AsciiRenderer
          fgColor={fg}
          bgColor="transparent"
          characters={' .`"^,:;Il!i+*=%@#'}
          resolution={0.22}
          invert={false}
        />
      </Canvas>
    </div>
  );
}
