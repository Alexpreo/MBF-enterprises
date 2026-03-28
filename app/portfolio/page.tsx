"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";

const CATEGORIES = ["All", "Hardscaping", "Turf", "Water Features"] as const;
type Category = (typeof CATEGORIES)[number];

const PORTFOLIO_ITEMS: { id: number; category: Exclude<Category, "All">; caption: string }[] = [
  { id: 1, category: "Hardscaping", caption: "Custom retaining wall and patio" },
  { id: 2, category: "Turf", caption: "Premium artificial lawn installation" },
  { id: 3, category: "Water Features", caption: "Custom fountain and spillway" },
  { id: 4, category: "Hardscaping", caption: "Stone masonry and steps" },
  { id: 5, category: "Turf", caption: "Residential turf with drainage" },
  { id: 6, category: "Water Features", caption: "Naturalistic rock waterfall" },
  { id: 7, category: "Hardscaping", caption: "Full exterior remodel" },
  { id: 8, category: "Turf", caption: "Zero-maintenance backyard" },
  { id: 9, category: "Water Features", caption: "Minimalist water feature" },
];

export default function Portfolio() {
  const [filter, setFilter] = useState<Category>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    filter === "All"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === filter);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  return (
    <PageTransition>
      <section className="flex min-h-[40vh] flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-center text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-6xl">
          Our Work
        </h1>
        <p className="mt-6 max-w-2xl text-center text-lg text-text-muted">
          A selection of premium outdoor spaces we&apos;ve brought to life.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
                filter === cat
                  ? "bg-accent text-bg"
                  : "bg-surface text-text-muted hover:bg-white/10 hover:text-text"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          <AnimatePresence mode="sync">
            {filtered.map((item) => (
              <motion.button
                key={item.id}
                type="button"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-surface bg-gradient-to-br from-surface via-accent/5 to-surface text-left"
                onClick={() => setLightboxIndex(PORTFOLIO_ITEMS.findIndex((i) => i.id === item.id))}
                aria-label={`View project: ${item.caption}`}
              >
                <div className="absolute inset-0 bg-accent/0 transition-colors group-hover:bg-accent/10" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-100 md:opacity-0 md:transition-opacity md:group-hover:opacity-100">
                  <p className="truncate text-xs font-medium text-text">{item.caption}</p>
                  <p className="text-xs text-text-muted">{item.category}</p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <>
            <motion.div
              key="portfolio-lightbox-backdrop"
              role="presentation"
              className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setLightboxIndex(null)}
            />
            <motion.div
              key="portfolio-lightbox-dialog"
              role="dialog"
              aria-modal="true"
              aria-label="Project detail"
              className="fixed inset-4 z-[110] flex flex-col items-center justify-center sm:inset-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-white/10 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:right-4 sm:top-4"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>
              <div
                className="aspect-square w-full max-w-lg overflow-hidden rounded-xl border border-white/10 bg-surface bg-gradient-to-br from-surface via-accent/5 to-surface"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex h-full items-center justify-center p-8">
                  <p className="text-center text-sm text-text-muted">
                    {PORTFOLIO_ITEMS[lightboxIndex]?.caption}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm text-text-muted">
                {PORTFOLIO_ITEMS[lightboxIndex]?.category}
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
