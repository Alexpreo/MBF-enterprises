"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

/** Seconds between each word (stagger). */
const WORD_STAGGER_S = 0.11;
/** Seconds between each character when `byWord` is false. */
const CHAR_STAGGER_S = 0.028;
/** Per-segment motion length — slower for a weightier feel. */
const SEGMENT_DURATION_S = 0.72;
/** Vertical travel (px) — more distance reads as more impact. */
const INITIAL_Y_OFFSET_PX = 36;
/** Ease-out curve: strong deceleration at the end. */
const EASE_IMPACT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const IN_VIEW_FALLBACK_MS = 2800;

type AnimatedTextProps = {
  text: string;
  className?: string;
  byWord?: boolean;
  /** When true, the word animation starts when this block enters the viewport (for below-fold headings). */
  whenInView?: boolean;
};

export function AnimatedText({
  text,
  className = "",
  byWord = true,
  whenInView = false,
}: AnimatedTextProps) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!whenInView) {
      setMounted(true);
      return;
    }
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    observer.observe(el);
    const fallback = window.setTimeout(() => {
      setMounted(true);
      observer.disconnect();
    }, IN_VIEW_FALLBACK_MS);
    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [whenInView]);

  const items = byWord ? text.split(" ") : text.split("");
  const stagger = byWord ? WORD_STAGGER_S : CHAR_STAGGER_S;

  if (!mounted) {
    return (
      <span ref={whenInView ? containerRef : undefined} className={`inline-block ${className}`}>
        {text}
      </span>
    );
  }

  return (
    <span ref={whenInView ? containerRef : undefined} className={`inline-block ${className}`}>
      {items.map((item, i) => (
        <motion.span
          key={`${item}-${i}`}
          className="inline-block"
          initial={{ opacity: 0, y: INITIAL_Y_OFFSET_PX }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: SEGMENT_DURATION_S,
            delay: stagger * i,
            ease: EASE_IMPACT,
          }}
        >
          {item}
          {byWord && i < items.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </span>
  );
}
