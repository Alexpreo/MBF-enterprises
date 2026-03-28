"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { FloatingNav } from "@/components/FloatingNav";
import { LOGO_PUBLIC_PATH } from "@/lib/brand";

const SCROLL_TOP_THRESHOLD = 64;
const SCROLL_DELTA = 10;

const FADE_MS = 320;
const FADE_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

export function Navbar() {
  const lastScrollY = useRef(0);
  const [brandChromeVisible, setBrandChromeVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < SCROLL_TOP_THRESHOLD) {
        setBrandChromeVisible(true);
      } else {
        const delta = y - lastScrollY.current;
        if (delta > SCROLL_DELTA) setBrandChromeVisible(false);
        else if (delta < -SCROLL_DELTA) setBrandChromeVisible(true);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fadeStyle = reducedMotion
    ? undefined
    : ({ transition: `opacity ${FADE_MS}ms ${FADE_EASE}` } as CSSProperties);

  const brandVisibilityClass = brandChromeVisible
    ? "opacity-100"
    : "pointer-events-none opacity-0";

  return (
    <header
      className="pointer-events-none fixed inset-x-0 top-0 z-[60]"
      style={{
        paddingTop: "max(0.75rem, env(safe-area-inset-top, 0px))",
      }}
      role="banner"
    >
      <div className="relative mx-auto flex min-h-[4.25rem] max-w-7xl items-center px-3 sm:min-h-[4.75rem] sm:px-6 lg:px-8">
        <div
          className={`flex w-[min(12.5rem,36vw)] shrink-0 justify-start sm:w-[min(15rem,40vw)] ${brandVisibilityClass}`}
          style={fadeStyle}
          aria-hidden={!brandChromeVisible}
        >
          <Link
            href="/"
            tabIndex={brandChromeVisible ? undefined : -1}
            className="pointer-events-auto transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            <span className="relative block h-14 w-[min(204px,calc(100vw-11rem))] sm:h-16 sm:w-[min(244px,calc(100vw-13rem))] lg:h-[4.5rem] lg:w-[min(288px,calc(100vw-15rem))]">
              <Image
                src={LOGO_PUBLIC_PATH}
                alt="Buddy Landscaping"
                fill
                className="object-contain object-center"
                priority
                sizes="(max-width: 640px) 204px, (max-width: 1024px) 244px, 288px"
              />
            </span>
          </Link>
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-center">
          <FloatingNav reducedMotion={reducedMotion} className="pointer-events-auto z-[58]" />
        </div>

        <div
          className={`ml-auto flex w-[min(12.5rem,36vw)] shrink-0 justify-end sm:w-[min(15rem,40vw)] ${brandVisibilityClass}`}
          style={fadeStyle}
          aria-hidden={!brandChromeVisible}
        >
          <Link
            href="/contact"
            tabIndex={brandChromeVisible ? undefined : -1}
            className="pointer-events-auto inline-flex min-h-[44px] max-w-full items-center justify-center rounded-2xl bg-accent px-4 py-2.5 text-xs font-semibold text-bg shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-all hover:bg-accent-light hover:shadow-[0_0_24px_rgba(212,175,55,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:px-6 sm:py-3 sm:text-sm"
          >
            <span className="sm:hidden">Consult</span>
            <span className="hidden sm:inline">Request a Consultation</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
