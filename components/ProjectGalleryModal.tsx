"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  type PortfolioProject,
  mediaItemToSrc,
} from "@/data/portfolio-projects";
import { FORCE_MUTED_VIDEO_PROPS } from "@/lib/video";

type Props = {
  project: PortfolioProject | null;
  onClose: () => void;
};

type SlideshowImage = { src: string; alt: string };

function collectProjectImages(project: PortfolioProject): SlideshowImage[] {
  const out: SlideshowImage[] = [];
  for (const item of project.media) {
    const m = mediaItemToSrc(item);
    if (m.type === "image") out.push({ src: m.src, alt: m.alt });
  }
  return out;
}

function imageSlideshowIndexForMediaIndex(project: PortfolioProject, mediaIndex: number): number {
  let n = 0;
  for (let i = 0; i < mediaIndex; i++) {
    if (mediaItemToSrc(project.media[i]).type === "image") n += 1;
  }
  return mediaItemToSrc(project.media[mediaIndex]).type === "image" ? n : -1;
}

export function ProjectGalleryModal({ project, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const slideshowImages = useMemo(
    () => (project ? collectProjectImages(project) : []),
    [project]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setLightboxIndex(null);
  }, [project?.id]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goLightboxPrev = useCallback(() => {
    setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i));
  }, []);

  const goLightboxNext = useCallback(() => {
    setLightboxIndex((i) =>
      i !== null && i < slideshowImages.length - 1 ? i + 1 : i
    );
  }, [slideshowImages.length]);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === "Escape") {
          e.preventDefault();
          closeLightbox();
          return;
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          goLightboxPrev();
          return;
        }
        if (e.key === "ArrowRight") {
          e.preventDefault();
          goLightboxNext();
          return;
        }
        return;
      }
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [
    project,
    onClose,
    lightboxIndex,
    closeLightbox,
    goLightboxPrev,
    goLightboxNext,
  ]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            key="project-gallery-backdrop"
            role="presentation"
            className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            key="project-gallery-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-gallery-title"
            className="fixed inset-3 z-[121] flex max-h-[calc(100dvh-1.5rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-2xl sm:inset-6 md:inset-8 md:max-w-5xl md:left-1/2 md:max-h-[min(90dvh,56rem)] md:w-full md:-translate-x-1/2"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 px-4 py-4 sm:px-6">
              <div className="min-w-0">
                <h2
                  id="project-gallery-title"
                  className="font-display text-xl font-semibold tracking-tight text-text sm:text-2xl"
                >
                  {project.title}
                </h2>
                <p className="mt-1 text-sm text-text-muted">{project.summary}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-text-muted transition-colors hover:bg-white/10 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                aria-label="Close gallery"
              >
                <X className="h-6 w-6" aria-hidden />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {project.media.map((item, index) => {
                  const m = mediaItemToSrc(item);
                  if (m.type === "video") {
                    return (
                      <div
                        key={`${m.src}-${index}`}
                        className="overflow-hidden rounded-xl border border-white/10 bg-black/40"
                      >
                        <video
                          {...FORCE_MUTED_VIDEO_PROPS}
                          className="mx-auto max-h-[min(70vh,520px)] w-full object-contain"
                          controls
                          playsInline
                          preload="metadata"
                          poster={m.posterSrc}
                          aria-label={m.alt}
                        >
                          <source src={m.src} type="video/mp4" />
                        </video>
                        <p className="border-t border-white/10 px-3 py-2 text-xs text-text-muted">
                          {m.alt}
                        </p>
                      </div>
                    );
                  }
                  const slideIdx = imageSlideshowIndexForMediaIndex(project, index);
                  return (
                    <button
                      key={`${m.src}-${index}`}
                      type="button"
                      className="group relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-xl border border-white/10 bg-surface/50 text-left transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                      onClick={() => slideIdx >= 0 && setLightboxIndex(slideIdx)}
                      aria-label={`View full size: ${m.alt}`}
                    >
                      <Image
                        src={m.src}
                        alt={m.alt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                      <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10 group-focus-visible:bg-black/10" />
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            {lightboxIndex !== null &&
              slideshowImages.length > 0 &&
              lightboxIndex >= 0 &&
              lightboxIndex < slideshowImages.length && (
              <motion.div
                key="project-image-lightbox"
                role="dialog"
                aria-modal="true"
                aria-label="Full screen photo"
                className="fixed inset-0 z-[130] flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  type="button"
                  className="absolute inset-0 bg-black/92 backdrop-blur-sm"
                  aria-label="Close full screen photo"
                  onClick={closeLightbox}
                />
                <button
                  type="button"
                  disabled={lightboxIndex <= 0}
                  onClick={(e) => {
                    e.stopPropagation();
                    goLightboxPrev();
                  }}
                  className="absolute left-2 top-1/2 z-[132] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-text shadow-lg transition-colors hover:bg-black/70 disabled:pointer-events-none disabled:opacity-25 sm:left-4 sm:h-14 sm:w-14"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden />
                </button>
                <button
                  type="button"
                  disabled={lightboxIndex >= slideshowImages.length - 1}
                  onClick={(e) => {
                    e.stopPropagation();
                    goLightboxNext();
                  }}
                  className="absolute right-2 top-1/2 z-[132] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-text shadow-lg transition-colors hover:bg-black/70 disabled:pointer-events-none disabled:opacity-25 sm:right-4 sm:h-14 sm:w-14"
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeLightbox();
                  }}
                  className="absolute right-2 top-2 z-[132] flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-black/50 text-text-muted transition-colors hover:bg-black/70 hover:text-text sm:right-4 sm:top-4"
                  aria-label="Close full screen photo"
                >
                  <X className="h-6 w-6" aria-hidden />
                </button>
                <div
                  className="relative z-[131] mx-20 flex max-h-[min(90dvh,920px)] w-[min(92vw,1200px)] items-center justify-center sm:mx-28 md:mx-36"
                  onClick={(e) => e.stopPropagation()}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={slideshowImages[lightboxIndex].src}
                      className="relative h-[min(85dvh,880px)] w-full"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <Image
                        src={slideshowImages[lightboxIndex].src}
                        alt={slideshowImages[lightboxIndex].alt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 92vw, 1200px"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <p className="pointer-events-none absolute bottom-4 left-0 right-0 z-[131] px-4 text-center text-xs text-text-muted sm:bottom-6">
                  {lightboxIndex + 1} / {slideshowImages.length}
                </p>
              </motion.div>
              )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
