"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGroup, motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/nav-links";

const PILL_SPRING = { type: "spring" as const, stiffness: 420, damping: 34, mass: 0.85 };

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
      className={`flex max-w-[min(100vw-2rem,calc(100vw-13rem))] rounded-full border border-white/10 bg-surface/90 px-2 py-1.5 shadow-lg backdrop-blur-md sm:max-w-[min(100vw-2rem,30rem)] sm:px-3 sm:py-2 ${className}`}
      style={style}
    >
      <LayoutGroup id="floating-nav-pill">
        <div className="flex max-w-full flex-nowrap gap-1 overflow-x-auto overflow-y-hidden overscroll-x-contain [scrollbar-width:none] sm:gap-2 [&::-webkit-scrollbar]:hidden">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive =
              pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`relative z-0 inline-flex shrink-0 whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface sm:px-3 sm:text-sm ${
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
            );
          })}
        </div>
      </LayoutGroup>
    </nav>
  );
}
