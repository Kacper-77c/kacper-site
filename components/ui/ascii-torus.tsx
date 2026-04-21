"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AsciiRenderer } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

interface AsciiTorusProps {
  className?: string;
}

function TorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterialParameters | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const mouseState = useRef({
    point: new THREE.Vector3(),
    distortion: 0,
    targetDistortion: 0,
  });
  const { camera, scene } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const pointer = useRef(new THREE.Vector2());

  const material = useMemo(() => {
    const mat = new THREE.MeshPhongMaterial({
      color: "#2D6A4F",
      shininess: 80,
      specular: new THREE.Color("#ffffff"),
    });

    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uMouse = { value: new THREE.Vector3(0, 0, 0) };
      shader.uniforms.uDistortion = { value: 0 };
      shader.uniforms.uTime = { value: 0 };

      shader.vertexShader = shader.vertexShader
        .replace(
          "#include <common>",
          `
           #include <common>
           uniform vec3 uMouse;
           uniform float uDistortion;
           uniform float uTime;
           `
        )
        .replace(
          "#include <begin_vertex>",
          `
           #include <begin_vertex>
           vec4 worldPosition = modelMatrix * vec4(transformed, 1.0);
           float dist = distance(worldPosition.xyz, uMouse);
           float influence = smoothstep(1.2, 0.0, dist) * uDistortion;
           
           float noise = sin(position.x * 15.0 + uTime * 3.0) * 
                         cos(position.y * 15.0 + uTime * 2.0) * 
                         sin(position.z * 15.0 + uTime * 4.0);
           
           transformed += normal * influence * 0.12;
           transformed += normal * noise * influence * 0.08;
           `
        );

      materialRef.current = shader as any;
    };

    return mat;
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
      mouseState.current.targetDistortion = 1.0;
      setMouse({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      });
    };
    const handleMouseLeave = () => {
      mouseState.current.targetDistortion = 0;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    if (!scene) return;

    meshRef.current.rotation.x += delta * 0.08 + mouse.y * delta * 0.3;
    meshRef.current.rotation.y += delta * 0.1 + mouse.x * delta * 0.3;

    raycaster.current.setFromCamera(pointer.current, camera);
    const intersects = raycaster.current.intersectObject(meshRef.current);
    if (intersects.length > 0) {
      mouseState.current.point.copy(intersects[0].point);
    }

    const decay =
      mouseState.current.targetDistortion > mouseState.current.distortion ? 0.15 : 0.04;
    mouseState.current.distortion +=
      (mouseState.current.targetDistortion - mouseState.current.distortion) * decay;
    mouseState.current.targetDistortion *= 0.92;

    const shader = materialRef.current as any;
    if (shader?.uniforms) {
      shader.uniforms.uMouse.value.copy(mouseState.current.point);
      shader.uniforms.uDistortion.value = mouseState.current.distortion;
      shader.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} material={material}>
      <torusKnotGeometry args={[1, 0.4, 200, 48, 2, 3]} />
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
      <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
        <ambientLight intensity={0.15} />
        <directionalLight position={[5, 5, 5]} intensity={1.8} />
        <directionalLight position={[-4, -3, -2]} intensity={0.4} color="#2D6A4F" />
        <TorusKnot />
        <AsciiRenderer
          fgColor="#1C1814"
          bgColor="#F7F4EF"
          characters={" .'`^\",:;Il!i+*=%@#"}
          resolution={isMobile ? 0.2 : 0.18}
          invert={false}
        />
      </Canvas>
    </div>
  );
}
