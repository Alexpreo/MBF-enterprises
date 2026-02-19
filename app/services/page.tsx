import type { Metadata } from "next";
import { MessageCircle, PencilRuler, Hammer } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Services | MBF Enterprises",
  description:
    "Full design and remodels, retaining walls, water features, and premium artificial turf. High-end hardscaping and construction tailored to your vision.",
};

const SERVICES = [
  {
    title: "Full Design & Remodels",
    body: "A complete overhaul of your exterior space. We handle everything from the initial architectural drafting to the final stone laid, ensuring a cohesive, breathtaking result that seamlessly extends your living space into the outdoors.",
  },
  {
    title: "Retaining Walls & Structural Hardscaping",
    body: "Engineered for longevity and designed for beauty. Our retaining walls do more than just hold back earth—they create dynamic, multi-level terraces that maximize your usable space and add immense value to your property.",
  },
  {
    title: "Fountains & Water Features",
    body: "Introduce movement and tranquility to your landscape. We design and install custom water features, ranging from modern, minimalist spillways to naturalistic rock waterfalls, all built with commercial-grade pumps and filtration.",
  },
  {
    title: "Premium Artificial Grass",
    body: "Achieve the perfect lawn, all year round. We install ultra-realistic, high-drainage artificial turf that stands up to heavy use and extreme weather, eliminating the need for constant watering and maintenance.",
  },
];

export default function Services() {
  return (
    <PageTransition>
      <section className="flex min-h-[40vh] flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-center text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-6xl">
          Our Services
        </h1>
        <p className="mt-6 max-w-2xl text-center text-lg text-text-muted">
          High-end hardscaping, design, and construction tailored to your vision.
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
        {SERVICES.map((service, index) => (
          <ScrollReveal key={service.title}>
            <section className="grid gap-8 py-16 lg:grid-cols-2 lg:items-center lg:gap-16">
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
                  {service.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-text-muted">{service.body}</p>
              </div>
              <div
                className={`aspect-[4/3] w-full rounded-xl border border-white/10 bg-surface bg-gradient-to-br from-surface via-accent/5 to-surface ${
                  index % 2 === 1 ? "lg:order-1" : ""
                }`}
                role="img"
                aria-label="Image placeholder"
              />
            </section>
          </ScrollReveal>
        ))}
      </div>
    </PageTransition>
  );
}
