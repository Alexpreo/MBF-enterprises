"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FORCE_MUTED_VIDEO_PROPS } from "@/lib/video";

const AUTO_ADVANCE_MS = 5000;
const STORY_SECTION_ID = "project-story";
const __DEV__ = process.env.NODE_ENV !== "production";

export type FeaturedSlide = {
  id: string;
  title: string;
  caption: string;
  phase: "Hook" | "Design" | "Plans" | "Build" | "Finish" | "Reveal";
  imageSrc?: string;
  videoSrc?: string;
  posterSrc?: string;
};

const DEFAULT_SLIDES: FeaturedSlide[] = [
  {
    id: "hook",
    phase: "Hook",
    title: "Vision Aligned",
    caption: "We begin by mapping your space and identifying the highest-impact focal moments.",
  },
  {
    id: "design",
    phase: "Design",
    title: "Architectural Planning",
    caption: "Materials, elevations, and pathways are orchestrated into one cohesive outdoor flow.",
  },
  {
    id: "build",
    phase: "Build",
    title: "Precision Build",
    caption: "Hardscape structure is installed with exact grading, drainage, and long-term performance in mind.",
  },
  {
    id: "finish",
    phase: "Finish",
    title: "Premium Finish",
    caption: "Lighting, textures, and greenery are tuned to elevate day and evening ambiance.",
  },
  {
    id: "reveal",
    phase: "Reveal",
    title: "Signature Reveal",
    caption: "The completed transformation delivers a space designed to be lived in and remembered.",
  },
];

type FeaturedCarouselProps = {
  slides?: FeaturedSlide[];
};

export function FeaturedCarousel({ slides = DEFAULT_SLIDES }: FeaturedCarouselProps) {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const count = slides.length;
  const goNext = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const goPrev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
    const legacy = mq as MediaQueryList & {
      addListener: (cb: () => void) => void;
      removeListener: (cb: () => void) => void;
    };
    legacy.addListener(handler);
    return () => legacy.removeListener(handler);
  }, []);

  const scheduleNext = useCallback(() => {
    if (reducedMotion || count <= 1) return;
    intervalRef.current = setInterval(goNext, AUTO_ADVANCE_MS);
  }, [reducedMotion, count, goNext]);

  useEffect(() => {
    scheduleNext();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [scheduleNext]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      } else if (!document.hidden && !reducedMotion && count > 1) {
        scheduleNext();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [reducedMotion, count, scheduleNext]);

  useEffect(() => {
    if (!__DEV__) return;
    const activeSlide = slides[index];
    console.debug("[HomepageStoryRail] state", {
      sectionId: STORY_SECTION_ID,
      totalPanels: count,
      activeIndex: index,
      activeId: activeSlide?.id,
      activePhase: activeSlide?.phase,
      reducedMotion,
      autoAdvanceMs: reducedMotion ? null : AUTO_ADVANCE_MS,
    });
  }, [slides, index, count, reducedMotion]);

  const resetAutoAdvance = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    scheduleNext();
  }, [scheduleNext]);

  const handlePrev = () => {
    goPrev();
    resetAutoAdvance();
  };
  const handleNext = () => {
    goNext();
    resetAutoAdvance();
  };
  const handleDot = (i: number) => {
    setIndex(i);
    resetAutoAdvance();
  };

  const slide = slides[index];
  const hasVideo = Boolean(slide.videoSrc);

  return (
    <section
      id={STORY_SECTION_ID}
      className="scroll-mt-24 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
      aria-label="Project story rail"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent/90">Cinematic Story Rail</p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-text sm:text-3xl lg:text-4xl">
          How We Build Signature Outdoor Spaces
        </h2>
        <p className="mt-4 text-base text-text-muted sm:text-lg">
          From first design moves through plans and build to the finished entry — a real project, step by step.
        </p>
      </div>

      <div className="relative mt-10 overflow-hidden rounded-2xl border border-white/10 bg-surface/60">
        <div className="grid items-stretch gap-0 lg:grid-cols-[1.35fr_1fr]">
          <div className="relative flex w-full flex-col bg-gradient-to-b from-black/35 via-surface/90 to-black/45 aspect-[3/4] sm:aspect-[5/6] lg:aspect-auto lg:min-h-[min(72vh,560px)]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={slide.id}
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: reducedMotion ? 0.15 : 0.4, ease: "easeOut" }}
                className="absolute inset-0 p-3 sm:p-5 lg:p-6"
              >
                {hasVideo ? (
                  <video
                    {...FORCE_MUTED_VIDEO_PROPS}
                    key={slide.id}
                    className="h-full w-full object-contain object-center"
                    autoPlay={!reducedMotion}
                    loop={!reducedMotion}
                    playsInline
                    preload="metadata"
                    poster={slide.posterSrc}
                    aria-label={slide.title}
                  >
                    <source src={slide.videoSrc} type="video/mp4" />
                  </video>
                ) : slide.imageSrc ? (
                  <div className="relative h-full min-h-[220px] w-full">
                    <Image
                      src={slide.imageSrc}
                      alt={slide.title}
                      fill
                      className="object-contain object-center"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      loading={index === 0 ? "eager" : "lazy"}
                      priority={index === 0}
                    />
                  </div>
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-surface via-accent/10 to-surface"
                    role="img"
                    aria-label={slide.title}
                  >
                    <div className="mx-auto flex max-w-sm flex-col items-center px-6 text-center">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent/80">
                        {slide.phase}
                      </span>
                      <h3 className="mt-2 text-2xl font-semibold text-text sm:text-3xl">{slide.title}</h3>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col justify-between p-6 sm:p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent/80">
                Step {index + 1} of {count} - {slide.phase}
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-text sm:text-3xl">{slide.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-text-muted">{slide.caption}</p>
            </div>

            <div className="mt-8">
              <div className="mb-5" role="tablist" aria-label="Story rail progress">
                <div className="mb-3 flex items-center justify-between text-xs font-medium uppercase tracking-wider text-text-muted">
                  <span>Progress</span>
                  <span>{Math.round(((index + 1) / count) * 100)}%</span>
                </div>
                <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}>
                  {slides.map((s, i) => (
                    <button
                      key={s.id}
                      type="button"
                      role="tab"
                      aria-selected={i === index}
                      aria-label={`Go to ${s.phase}: ${s.title}`}
                      onClick={() => handleDot(i)}
                      className={`h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
                        i === index ? "bg-accent" : "bg-white/20 hover:bg-white/35"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {count > 1 && (
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-surface text-text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                    aria-label="Previous story panel"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-surface text-text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                    aria-label="Next story panel"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-4 text-center sm:flex-row">
        <Link
          href="/portfolio"
          className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-bg shadow-[0_0_20px_rgba(212,175,55,0.22)] transition-all hover:bg-accent-light hover:shadow-[0_0_24px_rgba(212,175,55,0.34)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          View full portfolio
        </Link>
        <Link
          href="/contact"
          className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-accent/50 px-6 py-3 text-sm font-semibold text-accent transition-colors hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          Start your project
        </Link>
      </div>
    </section>
  );
}
