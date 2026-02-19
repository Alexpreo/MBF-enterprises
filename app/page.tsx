"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { ServiceCard } from "@/components/ServiceCard";
import { AnimatedText } from "@/components/AnimatedText";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Hammer, Layers, Sprout } from "lucide-react";

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
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.div whileTap={{ scale: 0.98 }}>
              <Link
                href="/portfolio"
                className="inline-flex min-h-[44px] min-w-[180px] items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-bg shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-all hover:bg-accent-light hover:shadow-[0_0_24px_rgba(212,175,55,0.35)]"
              >
                View Our Portfolio
              </Link>
            </motion.div>
            <motion.div whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                className="inline-flex min-h-[44px] min-w-[180px] items-center justify-center rounded-lg border border-accent/50 px-6 py-3 text-sm font-semibold text-accent transition-colors hover:bg-accent/10"
              >
                Request a Consultation
              </Link>
            </motion.div>
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
              At MBF Enterprises, we don&apos;t just build landscapes; we engineer outdoor sanctuaries. Specializing in high-end hardscaping and complete exterior transformations, we bring architectural precision and premium materials to every project. From custom retaining walls to lush artificial turf and elegant water features, your vision is our blueprint.
            </p>
          </div>
        </section>
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
                <p className="text-3xl font-bold tabular-nums text-accent sm:text-4xl">500+</p>
                <p className="mt-1 text-sm font-medium uppercase tracking-wider text-text-muted">Projects completed</p>
              </div>
              <div className="col-span-2 text-center md:col-span-1">
                <p className="text-3xl font-bold tabular-nums text-accent sm:text-4xl">Local</p>
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
            <ServiceCard
              title="Full-Scale Remodels"
              description="Comprehensive exterior design and construction to completely redefine your property."
              icon={Hammer}
            />
            <ServiceCard
              title="Architectural Hardscaping"
              description="Structural elegance including custom retaining walls, patios, and stone masonry."
              icon={Layers}
            />
            <ServiceCard
              title="Premium Artificial Turf"
              description="Flawless, zero-maintenance greenery installed with precision drainage systems."
              icon={Sprout}
            />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
