"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ScrollTrigger, useGSAP } from "@/lib/gsap-config";
import { DeviceFrame } from "./device-frame";

interface CaseStudyData {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  role: string;
  stack: string[];
  screens: {
    desktop: string;
    tablet: string;
    phone: string;
  };
  placeholders?: {
    desktop: { text: string; gradient: string };
    tablet: { text: string; gradient: string };
    phone: { text: string; gradient: string };
  };
}

interface CaseStudyPinProps {
  data: CaseStudyData;
}

export function CaseStudyPin({ data }: CaseStudyPinProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useGSAP(
    () => {
      if (!containerRef.current || !pinTargetRef.current) return;

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%",
        pin: pinTargetRef.current,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.5,
        invalidateOnRefresh: true,
        id: `case-study-${data.slug}`,
        onUpdate: (self) => {
          setProgress(self.progress);
        },
      });

      return () => {
        st.kill();
      };
    },
    {
      scope: containerRef,
    }
  );

  const captionOpacity = progress < 0.15 ? 1 : Math.max(0, 1 - (progress - 0.15) * 10);
  const captionY = progress < 0.15 ? 0 : -(progress - 0.15) * 100;

  const desktopProgress = Math.max(0, Math.min(1, (progress - 0.15) / 0.25));
  const desktopOpacity = desktopProgress;
  const desktopScale = 0.85 + desktopProgress * 0.15;
  const desktopBlur = (1 - desktopProgress) * 8;
  const desktopY = (1 - desktopProgress) * 60;

  const tabletProgress = Math.max(0, Math.min(1, (progress - 0.4) / 0.25));
  const tabletOpacity = tabletProgress;
  const tabletX = -200 + tabletProgress * 200;
  const tabletBlur = (1 - tabletProgress) * 6;

  const phoneProgress = Math.max(0, Math.min(1, (progress - 0.65) / 0.25));
  const phoneOpacity = phoneProgress;
  const phoneX = 200 - phoneProgress * 200;
  const phoneBlur = (1 - phoneProgress) * 6;

  const ctaOpacity = progress > 0.9 ? (progress - 0.9) * 10 : 0;

  return (
    <>
      <div ref={containerRef} className="relative hidden lg:block" style={{ height: "400vh" }}>
        <div
          ref={pinTargetRef}
          className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden"
        >
          <div
            className="absolute left-0 right-0 top-[8vh] z-20 px-6 text-center md:px-20"
            style={{
              opacity: captionOpacity,
              transform: `translateY(${captionY}px)`,
            }}
          >
            <div className="mb-4 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-earth/80">
              <span>REALIZACJA · {data.year}</span>
              <span>·</span>
              <span>{data.role}</span>
            </div>
            <h3 className="fraunces-display mb-4 text-[clamp(56px,9vw,140px)] leading-[0.92] text-paper">
              {data.title}
            </h3>
            <p className="fraunces-body mx-auto max-w-2xl text-lg text-paper/70 md:text-xl">
              {data.subtitle}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {data.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-earth/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-earth/70"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <Link
            href={`/portfolio/${data.slug}`}
            className="absolute inset-0 flex items-center justify-center"
            aria-label={`Zobacz pełne case study: ${data.title}`}
          >
            <div className="relative flex h-full w-full max-w-[1200px] items-center justify-center">
              <div
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `translate(-50%, -50%) scale(${desktopScale}) translateY(${desktopY}px)`,
                  opacity: desktopOpacity,
                  filter: `blur(${desktopBlur}px)`,
                  willChange: "transform, opacity, filter",
                }}
              >
                <DeviceFrame
                  type="desktop"
                  src={data.screens.desktop}
                  alt={`${data.title} — widok desktop`}
                  placeholderText={data.placeholders?.desktop.text}
                  placeholderGradient={data.placeholders?.desktop.gradient}
                />
              </div>

              <div
                className="absolute left-[5%] top-1/2 md:left-[12%]"
                style={{
                  transform: `translate(${tabletX}px, -50%)`,
                  opacity: tabletOpacity,
                  filter: `blur(${tabletBlur}px)`,
                  willChange: "transform, opacity, filter",
                }}
              >
                <DeviceFrame
                  type="tablet"
                  src={data.screens.tablet}
                  alt={`${data.title} — widok tablet`}
                  placeholderText={data.placeholders?.tablet.text}
                  placeholderGradient={data.placeholders?.tablet.gradient}
                />
              </div>

              <div
                className="absolute right-[5%] top-1/2 md:right-[12%]"
                style={{
                  transform: `translate(${phoneX}px, -50%)`,
                  opacity: phoneOpacity,
                  filter: `blur(${phoneBlur}px)`,
                  willChange: "transform, opacity, filter",
                }}
              >
                <DeviceFrame
                  type="phone"
                  src={data.screens.phone}
                  alt={`${data.title} — widok mobile`}
                  placeholderText={data.placeholders?.phone.text}
                  placeholderGradient={data.placeholders?.phone.gradient}
                />
              </div>
            </div>
          </Link>

          <div
            className="absolute bottom-[8vh] left-0 right-0 z-20 text-center"
            style={{ opacity: ctaOpacity }}
          >
            <Link
              href={`/portfolio/${data.slug}`}
              className="inline-flex items-center gap-2 border-b border-paper/30 pb-1 font-archivo text-sm uppercase tracking-[0.14em] text-paper/80 transition-colors hover:border-stamp hover:text-stamp"
            >
              zobacz pełne case study
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full px-6 py-16 lg:hidden">
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-earth/80">
            <span>REALIZACJA · {data.year}</span>
          </div>
          <h3 className="fraunces-display mb-4 text-[clamp(48px,10vw,88px)] leading-[0.92] text-paper">
            {data.title}
          </h3>
          <p className="fraunces-body mx-auto mb-4 max-w-xl text-lg text-paper/70">{data.subtitle}</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {data.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-earth/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-earth/70"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <Link href={`/portfolio/${data.slug}`} className="block space-y-6">
          <div className="flex justify-center">
            <DeviceFrame
              type="desktop"
              src={data.screens.desktop}
              alt={`${data.title} desktop`}
              placeholderText={data.placeholders?.desktop.text}
              placeholderGradient={data.placeholders?.desktop.gradient}
            />
          </div>
          <div className="flex justify-center gap-4">
            <DeviceFrame
              type="tablet"
              src={data.screens.tablet}
              alt={`${data.title} tablet`}
              placeholderText={data.placeholders?.tablet.text}
              placeholderGradient={data.placeholders?.tablet.gradient}
            />
            <DeviceFrame
              type="phone"
              src={data.screens.phone}
              alt={`${data.title} phone`}
              placeholderText={data.placeholders?.phone.text}
              placeholderGradient={data.placeholders?.phone.gradient}
            />
          </div>
        </Link>

        <div className="mt-8 text-center">
          <Link
            href={`/portfolio/${data.slug}`}
            className="inline-flex items-center gap-2 border-b border-paper/30 pb-1 font-archivo text-sm uppercase tracking-[0.14em] text-paper/80 transition-colors hover:border-stamp hover:text-stamp"
          >
            zobacz pełne case study
            <span>→</span>
          </Link>
        </div>
      </div>
    </>
  );
}
