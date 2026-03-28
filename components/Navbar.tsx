"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className="sticky top-0 z-[60] border-b border-white/5 bg-surface/80 backdrop-blur-md"
        role="banner"
      >
        <nav
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-text transition-colors hover:text-accent"
          >
            Buddy Landscaping
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`group relative text-sm font-medium transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
                      isActive ? "text-accent" : "text-text-muted"
                    }`}
                  >
                    {label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-200 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                      aria-hidden
                    />
                  </Link>
                </li>
              );
            })}
            <li className="hidden md:block">
              <Link
                href="/contact"
                className="inline-flex min-h-[40px] items-center justify-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-bg shadow-[0_0_16px_rgba(212,175,55,0.2)] transition-all hover:bg-accent-light hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                Request a Consultation
              </Link>
            </li>
          </ul>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-white/5 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="mobile-menu-backdrop"
              role="presentation"
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={() => setMobileOpen(false)}
              onKeyDown={(e) => e.key === "Escape" && setMobileOpen(false)}
            />
            <motion.aside
              key="mobile-menu-drawer"
              role="dialog"
              aria-label="Mobile menu"
              className="fixed right-0 top-0 z-[100] flex h-full w-full max-w-sm flex-col border-l border-white/5 bg-surface shadow-xl md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 220, damping: 26, mass: 0.95 }}
            >
              <div className="flex h-16 items-center justify-between px-4">
                <span className="text-lg font-semibold text-text">Menu</span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-white/5 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <ul className="flex flex-col gap-1 px-4 py-6">
                {NAV_LINKS.map(({ href, label }, i) => (
                  <motion.li
                    key={href}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.07 * i, duration: 0.28, ease: "easeOut" }}
                  >
                    <Link
                      href={href}
                      className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${
                        pathname === href || (href !== "/" && pathname.startsWith(href))
                          ? "bg-accent/10 text-accent"
                          : "text-text-muted hover:bg-white/5 hover:text-text"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {label}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.32, duration: 0.28, ease: "easeOut" }}
                  className="mt-4"
                >
                  <Link
                    href="/contact"
                    className="block rounded-lg bg-accent px-4 py-3 text-center text-base font-semibold text-bg transition-colors hover:bg-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                    onClick={() => setMobileOpen(false)}
                  >
                    Request a Consultation
                  </Link>
                </motion.li>
              </ul>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
