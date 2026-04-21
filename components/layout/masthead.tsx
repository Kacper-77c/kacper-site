"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MastheadProps {
  className?: string;
  nextSlot?: string;
}

const navLinks = [
  { href: "#warsztat", label: "warsztat" },
  { href: "#realizacje", label: "realizacje" },
  { href: "#zamowienie", label: "zamówienie" },
];

export function Masthead({ className, nextSlot = "28.04.2026" }: MastheadProps) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }

      if (event.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;

        if (event.shiftKey && active === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const firstFocusable = panelRef.current?.querySelector<HTMLElement>("button, a[href]");
    firstFocusable?.focus();

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-paper/80 backdrop-blur-sm px-6 md:px-20 py-4 border-b border-earth/10",
        className
      )}
    >
      <div className="relative h-[50px] md:h-[60px] flex items-center justify-between">
      <a
        href="#"
        className={cn(
          "fraunces-display text-[18px] text-ink",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stamp focus-visible:ring-offset-2"
        )}
        style={{ fontVariationSettings: '"opsz" 24, "SOFT" 40, "WONK" 0' }}
      >
        Kacper Krawczyk
      </a>

      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-2 font-archivo text-xs uppercase tracking-[0.08em] text-earth">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-stamp opacity-60 animate-ping motion-reduce:animate-none" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-stamp" />
        </span>
        <span>{`W PRACOWNI · NASTĘPNY TERMIN: ${nextSlot}`}</span>
      </div>

      <nav className="hidden md:flex items-center gap-2 font-archivo text-[13px] text-earth">
        {navLinks.map((link, index) => (
          <span key={link.href} className="flex items-center gap-2">
            <a
              href={link.href}
              className="uppercase tracking-[0.08em] hover:text-stamp transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stamp focus-visible:ring-offset-2"
            >
              {link.label}
            </a>
            {index < navLinks.length - 1 ? <span>·</span> : null}
          </span>
        ))}
      </nav>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="md:hidden inline-flex items-center justify-center text-earth hover:text-stamp transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stamp focus-visible:ring-offset-2"
        aria-label="Otwórz menu"
      >
        <Menu size={24} />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-40 bg-ink/20 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={panelRef}
              className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-paper px-6 py-8 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Zamknij menu"
                className="self-end text-earth hover:text-stamp transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stamp focus-visible:ring-offset-2"
              >
                <X size={24} />
              </button>
              <div className="mt-12 flex-1 flex flex-col items-center justify-center gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="fraunces-display text-4xl text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stamp focus-visible:ring-offset-2"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      </div>
    </header>
  );
}
