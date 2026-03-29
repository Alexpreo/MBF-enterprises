"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { FloatingNav } from "@/components/FloatingNav";
import { LOGO_PUBLIC_PATH } from "@/lib/brand";
import { NAV_LINKS } from "@/lib/nav-links";

const SCROLL_TOP_THRESHOLD = 64;
const SCROLL_DELTA = 10;

const FADE_MS = 320;
const FADE_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

const MENU_PANEL_ID = "mobile-primary-menu";

const MOBILE_LINK_SLIDE_X = 44;
const MOBILE_LINK_STAGGER_S = 0.072;
const MOBILE_LINK_DELAY_BASE_S = 0.14;
const MOBILE_LINK_DURATION = 0.48;
const MOBILE_LINK_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  reducedMotion: boolean;
};

function MobileMenu({ open, onClose, reducedMotion }: MobileMenuProps) {
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (pathnameRef.current !== pathname) {
      pathnameRef.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const slide = reducedMotion
    ? { duration: 0.15 }
    : { type: "spring" as const, stiffness: 320, damping: 32, mass: 0.9 };

  const menuTree = (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="mobile-nav-backdrop"
            role="presentation"
            className="fixed inset-0 z-[100] bg-black/65 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.12 : 0.22 }}
            onClick={onClose}
          />
          <motion.aside
            key="mobile-nav-panel"
            id={MENU_PANEL_ID}
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
            className="fixed right-0 top-0 z-[101] flex h-full w-full max-w-[min(100vw,20rem)] flex-col border-l border-white/10 bg-surface/98 shadow-2xl backdrop-blur-xl md:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={slide}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 pt-[max(1rem,env(safe-area-inset-top,0px))]">
              <span className="font-display text-lg font-semibold tracking-tight text-text">
                Menu
              </span>
              <button
                type="button"
                onClick={onClose}
                className="flex h-11 w-11 items-center justify-center rounded-xl text-text-muted transition-colors hover:bg-white/5 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" aria-hidden />
              </button>
            </div>
            <nav aria-label="Primary" className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
              {NAV_LINKS.map(({ href, label }, i) => {
                const isActive =
                  pathname === href || (href !== "/" && pathname.startsWith(href));
                const fromLeft = i % 2 === 0;
                const slideFrom = reducedMotion ? 0 : fromLeft ? -MOBILE_LINK_SLIDE_X : MOBILE_LINK_SLIDE_X;
                return (
                  <motion.div
                    key={href}
                    initial={{ opacity: reducedMotion ? 1 : 0, x: slideFrom }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : {
                            delay: MOBILE_LINK_DELAY_BASE_S + MOBILE_LINK_STAGGER_S * i,
                            duration: MOBILE_LINK_DURATION,
                            ease: MOBILE_LINK_EASE,
                          }
                    }
                  >
                    <Link
                      href={href}
                      prefetch
                      onClick={onClose}
                      className={`flex w-full flex-col rounded-xl px-4 py-3.5 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${
                        isActive
                          ? "bg-accent/12 text-accent"
                          : "text-text-muted hover:bg-white/5 hover:text-text"
                      }`}
                    >
                      <span className="inline-flex min-w-0 flex-col self-start">
                        <span className="whitespace-nowrap">{label}</span>
                        {isActive && (
                          <span
                            className="mt-1 h-0.5 w-full rounded-full bg-accent"
                            aria-hidden
                          />
                        )}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
            <div className="border-t border-white/10 p-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))]">
              <Link
                href="/contact"
                prefetch
                onClick={onClose}
                className="flex min-h-[52px] w-full items-center justify-center rounded-2xl bg-accent text-base font-semibold text-bg shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-all hover:bg-accent-light hover:shadow-[0_0_24px_rgba(212,175,55,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                Request a consultation
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;
  return createPortal(menuTree, document.body);
}

export function Navbar() {
  const lastScrollY = useRef(0);
  const [brandChromeVisible, setBrandChromeVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

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
      <div className="pointer-events-none mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        {/* Mobile: one row — logo, consult, menu (menu stays usable when brand fades) */}
        <div className="pointer-events-auto flex items-center justify-between gap-2 pt-0.5 md:hidden">
          <div
            className={`min-w-0 shrink ${brandVisibilityClass}`}
            style={fadeStyle}
            aria-hidden={!brandChromeVisible}
          >
            <Link
              href="/"
              tabIndex={brandChromeVisible ? undefined : -1}
              className="block transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              <span className="relative block h-[4.25rem] w-[min(200px,52vw)] sm:h-[4.5rem] sm:w-[min(220px,54vw)]">
                <Image
                  src={LOGO_PUBLIC_PATH}
                  alt="Buddy Landscaping"
                  fill
                  className="object-contain object-left"
                  priority
                  sizes="(max-width: 640px) 200px, 220px"
                />
              </span>
            </Link>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <div className={brandVisibilityClass} style={fadeStyle} aria-hidden={!brandChromeVisible}>
              <Link
                href="/contact"
                tabIndex={brandChromeVisible ? undefined : -1}
                className="inline-flex min-h-[52px] min-w-[6.5rem] items-center justify-center rounded-2xl bg-accent px-5 py-3 text-base font-semibold text-bg shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-all hover:bg-accent-light hover:shadow-[0_0_24px_rgba(212,175,55,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                Consult
              </Link>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl border border-white/10 bg-surface/90 text-text shadow-md backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              aria-expanded={mobileMenuOpen}
              aria-controls={MENU_PANEL_ID}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" aria-hidden />
            </button>
          </div>
        </div>

        {/* Desktop: floating pill + logo + CTA */}
        <div className="pointer-events-auto hidden min-h-[4.75rem] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-4 md:grid">
          <div
            className={`justify-self-start ${brandVisibilityClass}`}
            style={fadeStyle}
            aria-hidden={!brandChromeVisible}
          >
            <Link
              href="/"
              tabIndex={brandChromeVisible ? undefined : -1}
              className="transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              <span className="relative block h-14 w-[min(204px,calc(100vw-13rem))] lg:h-[4.5rem] lg:w-[min(288px,calc(100vw-15rem))]">
                <Image
                  src={LOGO_PUBLIC_PATH}
                  alt="Buddy Landscaping"
                  fill
                  className="object-contain object-center"
                  priority
                  sizes="(max-width: 1024px) 204px, 288px"
                />
              </span>
            </Link>
          </div>

          <div className="flex min-w-0 justify-center justify-self-center px-2">
            <FloatingNav reducedMotion={reducedMotion} />
          </div>

          <div
            className={`justify-self-end ${brandVisibilityClass}`}
            style={fadeStyle}
            aria-hidden={!brandChromeVisible}
          >
            <Link
              href="/contact"
              tabIndex={brandChromeVisible ? undefined : -1}
              className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-accent px-6 py-3 text-base font-semibold text-bg shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-all hover:bg-accent-light hover:shadow-[0_0_24px_rgba(212,175,55,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              Request a Consultation
            </Link>
          </div>
        </div>
      </div>

      <MobileMenu open={mobileMenuOpen} onClose={closeMobileMenu} reducedMotion={reducedMotion} />
    </header>
  );
}
