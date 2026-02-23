"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AUTO_ADVANCE_MS = 5000;

export type FeaturedSlide = {
  id: string;
  caption: string;
  imageSrc?: string;
};

const DEFAULT_SLIDES: FeaturedSlide[] = [
  { id: "1", caption: "Hardscaping" },
  { id: "2", caption: "Artificial turf" },
  { id: "3", caption: "Water feature" },
  { id: "4", caption: "Full remodel" },
];

type FeaturedCarouselProps = {
  slides?: FeaturedSlide[];
};

export function FeaturedCarousel({ slides = DEFAULT_SLIDES }: FeaturedCarouselProps) {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const count = slides.length;
  const goTo = useCallback(
    (next: number) => {
      setIndex((i) => (next < 0 ? count - 1 : next >= count ? 0 : next));
    },
    [count]
  );
  const goNext = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const goPrev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
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

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-label="A Glimpse of What We Do">
      <h2 className="text-center text-2xl font-bold tracking-tight text-text sm:text-3xl lg:text-4xl">
        A Glimpse of What We Do
      </h2>

      <div className="relative mt-10">
        <div className="overflow-hidden rounded-xl border border-white/10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-video w-full"
            >
              {slide.imageSrc ? (
                <Image
                  src={slide.imageSrc}
                  alt={slide.caption}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
              ) : (
                <div
                  className="absolute inset-0 bg-surface bg-gradient-to-br from-surface via-accent/5 to-surface flex items-center justify-center"
                  role="img"
                  aria-label={slide.caption}
                >
                  <span className="text-lg font-medium text-text-muted sm:text-xl">{slide.caption}</span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-surface/90 text-text-muted transition-colors hover:bg-surface hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:left-4"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-surface/90 text-text-muted transition-colors hover:bg-surface hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:right-4"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="mt-4 flex justify-center gap-2" role="tablist" aria-label="Slide navigation">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Slide ${i + 1}: ${s.caption}`}
                  onClick={() => handleDot(i)}
                  className={`h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
                    i === index ? "w-8 bg-accent" : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/portfolio"
          className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-accent/50 px-6 py-3 text-sm font-semibold text-accent transition-colors hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          View full portfolio
        </Link>
      </div>
    </section>
  );
}
