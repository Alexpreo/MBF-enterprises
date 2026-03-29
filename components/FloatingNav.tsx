"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGroup, motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/nav-links";

const PILL_SPRING = { type: "spring" as const, stiffness: 420, damping: 34, mass: 0.85 };

const SLIDE_X = 36;
const STAGGER_S = 0.065;
const SLIDE_DURATION = 0.52;
const SLIDE_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Props = {
  reducedMotion: boolean;
  className?: string;
  style?: CSSProperties;
};

export function FloatingNav({ reducedMotion, className = "", style }: Props) {
  const pathname = usePathname();
  const pillTransition = reducedMotion
    ? { type: "tween" as const, duration: 0, ease: "linear" as const }
    : PILL_SPRING;

  return (
    <nav
      aria-label="Primary"
      className={`inline-flex w-max max-w-[min(100vw-2rem,calc(100vw-13rem))] shrink-0 rounded-full border border-white/10 bg-surface/90 px-3 py-2 shadow-lg backdrop-blur-md lg:max-w-[min(100vw-2rem,30rem)] ${className}`}
      style={style}
    >
      <LayoutGroup id="floating-nav-pill">
        <div className="flex max-w-full flex-nowrap gap-1 overflow-x-auto overflow-y-hidden overscroll-x-contain [scrollbar-width:none] sm:gap-2 [&::-webkit-scrollbar]:hidden">
          {NAV_LINKS.map(({ href, label }, i) => {
            const isActive =
              pathname === href || (href !== "/" && pathname.startsWith(href));
            const fromLeft = i % 2 === 0;
            const slideFrom = reducedMotion ? 0 : fromLeft ? -SLIDE_X : SLIDE_X;

            return (
              <motion.span
                key={href}
                className="inline-flex shrink-0"
                initial={{ opacity: reducedMotion ? 1 : 0, x: slideFrom }}
                animate={{ opacity: 1, x: 0 }}
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : {
                        delay: STAGGER_S * i,
                        duration: SLIDE_DURATION,
                        ease: SLIDE_EASE,
                      }
                }
              >
                <Link
                  href={href}
                  className={`relative z-0 inline-flex shrink-0 items-center whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface sm:px-3 sm:text-sm ${
                    isActive
                      ? "text-accent"
                      : "text-text-muted hover:bg-white/5 hover:text-text"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="floating-nav-active-bg"
                      className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-accent/15"
                      transition={pillTransition}
                      aria-hidden
                    />
                  )}
                  {label}
                </Link>
              </motion.span>
            );
          })}
        </div>
      </LayoutGroup>
    </nav>
  );
}
