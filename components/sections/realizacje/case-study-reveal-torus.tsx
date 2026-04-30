"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AsciiRenderer } from "@react-three/drei";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

function FastRotatingTorus() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.35;
    meshRef.current.rotation.y += delta * 0.45;
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.4, 128, 32, 2, 3]} />
      <meshPhongMaterial color="#2D6A4F" shininess={80} specular={new THREE.Color("#ffffff")} />
    </mesh>
  );
}

export function CaseStudyRevealTorus() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.8]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[120vh] w-full items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      <motion.div style={{ opacity, scale }} className="relative aspect-square w-full max-w-[600px]">
        {prefersReducedMotion ? (
          <div className="flex h-full w-full items-center justify-center">
            <pre className="font-mono text-[0.7rem] leading-none text-paper/80">
              {`     .::=**##%%@@##**=::.
   :=*#%@@@@@@@@@@@@@@%#*=:
 =#@@@@%#==-::::--==#%@@@@#=
#@@@%+.                  .+%@@@#
 =#@@@@%#==-::::--==#%@@@@#=
   :=*#%@@@@@@@@@@@@@@%#*=:
     .::=**##%%@@##**=::.     `}
            </pre>
          </div>
        ) : (
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
            <FastRotatingTorus />
            <AsciiRenderer
              fgColor="#F7F4EF"
              bgColor="transparent"
              characters={' .`"^,:;Il!i+*=%@#'}
              resolution={0.16}
              invert={false}
            />
          </Canvas>
        )}
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-[15vh] left-0 right-0 text-center"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-earth/60">
          pauza między dziełami
        </p>
      </motion.div>
    </div>
  );
}
