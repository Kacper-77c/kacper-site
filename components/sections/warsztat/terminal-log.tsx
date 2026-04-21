"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TerminalLogProps {
  className?: string;
}

const LOG_LINES = [
  { type: "command", content: "$ kacper init" },
  { type: "step", time: "06.2020", text: "first website live (terrible, but alive)" },
  { type: "step", time: "2020-2023", text: "learning html, css, javascript, regrets" },
  { type: "step", time: "10.2023", text: "studia informatyki @ politechnika wrocławska" },
  { type: "step", time: "08.2024", text: "first paid gig: DUW wrocław" },
  { type: "step", time: "2024-2026", text: "freelance · 4 cafes, countless cursors, occasional sleep" },
  { type: "step", time: "04.2026", text: "pracownia online · wrocław" },
  { type: "empty" },
  { type: "status", content: "ready · still learning · " },
] as const;

export function TerminalLog({ className }: TerminalLogProps) {
  const [cycle, setCycle] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setCycle((c) => c + 1);
    }, 12000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <div
      className={cn(
        "w-full max-w-[580px] mx-auto",
        "rounded-lg overflow-hidden",
        "bg-[#0f1419] border border-paper/10",
        "shadow-2xl shadow-black/30",
        className
      )}
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-paper/10">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 text-center font-mono text-xs text-paper/40">~/pracownia — kacper init</div>
      </div>

      <div className="px-6 py-6 font-mono text-[13px] leading-relaxed min-h-[340px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={cycle}
            initial={prefersReducedMotion ? false : "hidden"}
            animate="visible"
            exit={prefersReducedMotion ? undefined : { opacity: 0, transition: { duration: 1 } }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: prefersReducedMotion ? 0 : 0.3,
                },
              },
            }}
          >
            {LOG_LINES.map((line, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
                className="min-h-[1.6em]"
              >
                {line.type === "command" && <span className="text-[#5FB878]">{line.content}</span>}
                {line.type === "step" && (
                  <span>
                    <span className="text-earth/60">[{line.time}]</span>{" "}
                    <span className="text-[#5FB878]">✓</span>{" "}
                    <span className="text-paper/85">{line.text}</span>
                  </span>
                )}
                {line.type === "empty" && <span>&nbsp;</span>}
                {line.type === "status" && (
                  <span className="text-paper/85">
                    {line.content}
                    <span className="inline-block w-[0.5em] h-[1em] bg-[#5FB878] animate-blink align-middle translate-y-[2px]" />
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
