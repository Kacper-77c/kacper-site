"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { AsciiRenderer } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

interface AsciiTorusProps {
  className?: string;
}

function TorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.15 + mouse.y * delta * 0.5;
    meshRef.current.rotation.y += delta * 0.2 + mouse.x * delta * 0.5;
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.3, 128, 32, 2, 3]} />
      <meshPhongMaterial color="#2D6A4F" shininess={80} specular="#ffffff" />
    </mesh>
  );
}

function StaticAsciiFallback({ className }: { className?: string }) {
  return (
    <pre
      className={cn(
        "font-mono text-xs leading-[0.9] text-ink whitespace-pre text-center",
        className
      )}
    >{`          .:*+=:.           
       .=%@@@@%=.         
     :+@@%*+**%@@+:       
    +@@*.      .*@@+      
   %@#.          .#@%     
  +@*              *@+    
  @+     ..::.      +@    
  @     :%@@@@%:     @    
  @+     ::::.      +@    
  +@*              *@+    
   %@#.          .#@%     
    +@@*.      .*@@+      
     :+@@%*+**%@@+:       
       .=%@@@@%=.         
          .:*+=:.         `}</pre>
  );
}

export function AsciiTorus({ className }: AsciiTorusProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  if (prefersReducedMotion) {
    return <StaticAsciiFallback className={className} />;
  }

  return (
    <div aria-hidden="true" className={cn("w-full h-full aspect-square", className)}>
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.15} />
        <directionalLight position={[5, 5, 5]} intensity={1.8} />
        <directionalLight position={[-4, -3, -2]} intensity={0.4} color="#2D6A4F" />
        <TorusKnot />
        <AsciiRenderer
          fgColor="#1C1814"
          bgColor="#F7F4EF"
          characters={" .'`^\",:;Il!i+*=%@#"}
          resolution={isMobile ? 0.2 : 0.12}
          invert={false}
        />
      </Canvas>
    </div>
  );
}
