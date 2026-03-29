"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedText } from "@/components/AnimatedText";
import { PageTransition } from "@/components/PageTransition";
import { ProjectGalleryModal } from "@/components/ProjectGalleryModal";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  PORTFOLIO_PROJECTS,
  mediaItemToSrc,
  type PortfolioProject,
} from "@/data/portfolio-projects";

const CATEGORIES = ["All", "Hardscaping", "Turf", "Water Features"] as const;
type Category = (typeof CATEGORIES)[number];

function projectCoverThumb(project: PortfolioProject): {
  kind: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
} {
  const item = project.media[project.coverMediaIndex] ?? project.media[0];
  const m = mediaItemToSrc(item);
  if (m.type === "video") {
    return {
      kind: "video",
      src: m.src,
      poster: m.posterSrc,
      alt: m.alt,
    };
  }
  return { kind: "image", src: m.src, alt: m.alt };
}

export default function Portfolio() {
  const [filter, setFilter] = useState<Category>("All");
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);

  const filtered = useMemo(
    () =>
      filter === "All"
        ? PORTFOLIO_PROJECTS
        : PORTFOLIO_PROJECTS.filter((p) => p.category === filter),
    [filter]
  );

  return (
    <PageTransition>
      <section className="flex min-h-[40vh] flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-center text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-6xl">
          <AnimatedText text="Our Work" className="block w-full text-center" />
        </h1>
        <p className="mt-6 max-w-2xl text-center text-lg text-text-muted">
          A selection of premium outdoor spaces we&apos;ve brought to life.
        </p>
      </section>

      <ScrollReveal>
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
              {filtered.map((project) => {
                const thumb = projectCoverThumb(project);
                return (
                  <motion.button
                    key={project.id}
                    type="button"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-surface text-left"
                    onClick={() => setActiveProject(project)}
                    aria-label={`View project: ${project.title}`}
                  >
                    {thumb.kind === "image" ? (
                      <Image
                        src={thumb.src}
                        alt={thumb.alt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    ) : (
                      <div className="absolute inset-0">
                        {thumb.poster ? (
                          <Image
                            src={thumb.poster}
                            alt={thumb.alt}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          />
                        ) : (
                          <div className="h-full w-full bg-gradient-to-br from-surface via-accent/10 to-surface" />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                          <span className="rounded-full border border-white/30 bg-black/40 px-3 py-1 text-xs font-medium text-text">
                            Video
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-accent/0 transition-colors group-hover:bg-accent/10" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent p-3 opacity-100 md:opacity-0 md:transition-opacity md:group-hover:opacity-100">
                      <p className="truncate text-xs font-medium text-text">{project.title}</p>
                      <p className="text-xs text-text-muted">{project.category}</p>
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        </section>
      </ScrollReveal>

      <ProjectGalleryModal project={activeProject} onClose={() => setActiveProject(null)} />
    </PageTransition>
  );
}
