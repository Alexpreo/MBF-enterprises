import type { Metadata } from "next";
import { MessageCircle, PencilRuler, Hammer } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SERVICE_CATEGORIES } from "@/data/services";

export const metadata: Metadata = {
  title: "Services | Buddy Landscaping",
  description:
    "Hardscaping, outdoor living, water features, planting, premium turf, and full exterior design. Retaining walls, patios, fountains, koi ponds, kitchens, fire features, and phased remodels across Metro Vancouver.",
};

export default function Services() {
  return (
    <PageTransition>
      <section className="flex min-h-[40vh] flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-center text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-6xl">
          Our Services
        </h1>
        <p className="mt-6 max-w-2xl text-center text-lg text-text-muted">
          High-end hardscaping, water, planting, and outdoor living—designed and built as one system.
        </p>
      </section>

      <ScrollReveal>
        <section className="border-y border-white/5 bg-surface/30 py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-xl font-bold tracking-tight text-text sm:text-2xl">
              How we work
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-12">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                  <MessageCircle className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-text">Consult</h3>
                <p className="mt-1 text-sm text-text-muted">
                  We discuss your vision, site, and budget to align on scope.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                  <PencilRuler className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-text">Design</h3>
                <p className="mt-1 text-sm text-text-muted">
                  Custom plans and material selection tailored to your property.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                  <Hammer className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-text">Build</h3>
                <p className="mt-1 text-sm text-text-muted">
                  Flawless execution with premium materials and craftsmanship.
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        {SERVICE_CATEGORIES.map((category, index) => (
          <ScrollReveal key={category.id}>
            <section
              id={category.id}
              className="grid gap-8 py-16 lg:grid-cols-2 lg:items-start lg:gap-16"
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">{category.title}</h2>
                <p className="mt-4 text-base leading-relaxed text-text-muted">{category.intro}</p>
                <ul className="mt-6 list-disc space-y-2 pl-5 text-sm leading-relaxed text-text-muted sm:text-base">
                  {category.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div
                className={`aspect-[4/3] w-full shrink-0 rounded-xl border border-white/10 bg-surface bg-gradient-to-br from-surface via-accent/5 to-surface ${
                  index % 2 === 1 ? "lg:order-1" : ""
                }`}
                role="img"
                aria-label={`${category.title} image placeholder`}
              />
            </section>
          </ScrollReveal>
        ))}
      </div>
    </PageTransition>
  );
}
