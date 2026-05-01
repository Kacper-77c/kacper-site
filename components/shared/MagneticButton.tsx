"use client";

import { useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface MagneticButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  magneticRadius?: number;
}

export default function MagneticButton({
  href,
  onClick,
  children,
  magneticRadius = 30,
}: MagneticButtonProps) {
  const anchorRef = useRef<HTMLAnchorElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const updateMagneticTransform = (event: MouseEvent<HTMLElement>) => {
    if (!isDesktop) {
      return;
    }

    const element = href ? anchorRef.current : buttonRef.current;
    if (!element) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const activationDistance = magneticRadius * 3;

    if (distance < activationDistance) {
      const strength = 1 - distance / activationDistance;
      setTransform({
        x: deltaX * strength * 0.4,
        y: deltaY * strength * 0.4,
      });
      return;
    }

    setTransform({ x: 0, y: 0 });
  };

  const handleMouseLeave = () => {
    setTransform({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const className = [
    "inline-flex items-center justify-center",
    "font-mono text-sm tracking-widest uppercase",
    "px-12 py-5 border border-paper relative",
    "transition-[background-color,color] duration-300",
    isHovered ? "bg-paper text-matchbox-navy" : "bg-transparent text-paper",
  ].join(" ");

  const style = {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    transition:
      isHovered || transform.x !== 0 || transform.y !== 0
        ? "transform 0.3s cubic-bezier(0.2, 0.9, 0.3, 1)"
        : "transform 0.6s cubic-bezier(0.2, 0.9, 0.3, 1)",
    willChange: "transform" as const,
  };

  if (href) {
    return (
      <a
        ref={anchorRef}
        href={href}
        className={className}
        onMouseMove={updateMagneticTransform}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={style}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      className={className}
      onMouseMove={updateMagneticTransform}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={style}
    >
      {children}
    </button>
  );
}
