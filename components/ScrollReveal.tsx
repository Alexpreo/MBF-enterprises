"use client";

import { useRef, useEffect, useState } from "react";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Scroll-in reveal without Framer Motion `whileInView` (problematic on some mobile WebViews).
 * Uses IntersectionObserver + CSS transitions; fallback timer ensures content never stays stuck.
 */
export function ScrollReveal({ children, className = "" }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.02, rootMargin: "0px 0px 8% 0px" }
    );

    observer.observe(el);

    const fallback = window.setTimeout(() => {
      setRevealed(true);
      observer.disconnect();
    }, 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      data-scroll-reveal
      className={`${className} transition-[opacity,transform] duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        revealed ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
