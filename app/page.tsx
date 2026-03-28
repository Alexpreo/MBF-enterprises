"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { ServiceCard } from "@/components/ServiceCard";
import { AnimatedText } from "@/components/AnimatedText";
import { ScrollReveal } from "@/components/ScrollReveal";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { FEATURED_SERVICES, type FeaturedServiceId } from "@/data/services";
import type { LucideIcon } from "lucide-react";
import { Droplets, Flame, Hammer, LayoutGrid, Layers, Sprout } from "lucide-react";

const FEATURED_ICONS: Record<FeaturedServiceId, LucideIcon> = {
  "full-design-remodels": Hammer,
  "retaining-hardscape": Layers,
  "patios-paving": LayoutGrid,
  "water-features": Droplets,
  "outdoor-living": Flame,
  "planting-turf": Sprout,
};

export default function Home() {
  return (
    <PageTransition>
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <div
          className="absolute inset-0 bg-surface bg-gradient-to-b from-accent/5 via-transparent to-bg"
          role="img"
          aria-label="Hero background"
        />
        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
          <h1 className="w-full text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-6xl">
            <AnimatedText text="Elevating Your Outdoor Living Experience." className="block w-full text-center" />
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-text-muted sm:text-xl">
            Premium hardscaping, custom design, and flawless execution for properties that demand the best.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <motion.div whileTap={{ scale: 0.98 }}>
              <Link
                href="#project-story"
                className="inline-flex min-h-[44px] min-w-[200px] items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-bg shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-all hover:bg-accent-light hover:shadow-[0_0_24px_rgba(212,175,55,0.35)]"
              >
                Explore the story
              </Link>
            </motion.div>
            <div className="flex w-full max-w-md flex-col items-center justify-between gap-4 sm:flex-row">
              <motion.div whileTap={{ scale: 0.98 }}>
                <Link
                  href="/portfolio"
                  className="inline-flex min-h-[44px] min-w-[180px] items-center justify-center rounded-lg border border-white/15 bg-black/30 px-6 py-3 text-sm font-semibold text-text transition-colors hover:bg-black/45"
                >
                  View Our Portfolio
                </Link>
              </motion.div>
              <motion.div whileTap={{ scale: 0.98 }}>
                <Link
                  href="/contact"
                  className="inline-flex min-h-[44px] min-w-[180px] items-center justify-center rounded-lg border border-white/15 bg-black/30 px-6 py-3 text-sm font-semibold text-text transition-colors hover:bg-black/45"
                >
                  Request a Consultation
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <ScrollReveal>
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl lg:text-4xl">
              Craftsmanship Without Compromise.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-text-muted sm:text-lg">
              At Buddy Landscaping, we don&apos;t just build landscapes; we engineer outdoor sanctuaries. Specializing in high-end hardscaping and complete exterior transformations, we bring architectural precision and premium materials to every project. From custom retaining walls to lush artificial turf and elegant water features, your vision is our blueprint.
            </p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <FeaturedCarousel />
      </ScrollReveal>

      <ScrollReveal>
        <section className="border-y border-white/5 bg-surface/50 py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3 md:gap-12">
              <div className="text-center">
                <p className="text-3xl font-bold tabular-nums text-accent sm:text-4xl">15+</p>
                <p className="mt-1 text-sm font-medium uppercase tracking-wider text-text-muted">Years in business</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold tabular-nums text-accent sm:text-4xl">250+</p>
                <p className="mt-1 text-sm font-medium uppercase tracking-wider text-text-muted">Projects completed</p>
              </div>
              <div className="col-span-2 text-center md:col-span-1">
                <p className="text-3xl font-bold tabular-nums text-accent sm:text-4xl">Metro Vancouver</p>
                <p className="mt-1 text-sm font-medium uppercase tracking-wider text-text-muted">Service area</p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <section className="border-t border-white/5 bg-surface/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-center text-2xl font-bold tracking-tight text-text sm:text-3xl lg:text-4xl">
              Our Services
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_SERVICES.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.shortDescription}
                icon={FEATURED_ICONS[service.id]}
              />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-accent/50 px-6 py-3 text-sm font-semibold text-accent transition-colors hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              View all services
            </Link>
          </div>
        </div>
      </section>

      <ScrollReveal>
        <section className="border-t border-white/5 bg-surface/50 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-xl font-medium text-text sm:text-2xl">
              Ready to transform your outdoor space?
            </p>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-bg shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-all hover:bg-accent-light hover:shadow-[0_0_24px_rgba(212,175,55,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                Request a consultation
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </PageTransition>
  );
}
