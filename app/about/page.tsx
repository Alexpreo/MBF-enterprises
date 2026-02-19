import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import { AnimatedText } from "@/components/AnimatedText";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "About | MBF Enterprises",
  description:
    "Decades of combined experience in premium hardscaping and exterior construction. We focus on high-end, bespoke projects built to outlast the elements.",
};

export default function About() {
  return (
    <PageTransition>
      <section className="flex min-h-[40vh] flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-center text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-6xl">
          <AnimatedText text="The Foundation of Excellence." />
        </h1>
        <p className="mt-6 max-w-2xl text-center text-lg text-text-muted">
          Decades of combined experience, built on trust, precision, and structural integrity.
        </p>
      </section>

      <ScrollReveal>
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl lg:text-4xl">
                Redefining the Standard of Construction.
              </h2>
            <p className="mt-6 text-base leading-relaxed text-text-muted">
              MBF Enterprises was founded on a simple principle: outdoor construction should be built to outlast the elements and designed to inspire. We are a dedicated team of craftsmen, designers, and builders who treat every property as if it were our own.
            </p>
            <p className="mt-4 text-base leading-relaxed text-text-muted">
              We step away from the &quot;volume-first&quot; approach of typical landscaping companies. Instead, we focus on high-end, bespoke projects where attention to detail is paramount. Whether it&apos;s engineering a complex retaining wall or designing a tranquil custom fountain, we combine heavy-duty construction techniques with refined aesthetic design.
            </p>
          </div>
            <div
              className="aspect-[4/3] w-full rounded-xl border border-white/10 bg-surface bg-gradient-to-br from-surface via-accent/5 to-surface"
              role="img"
              aria-label="Image placeholder"
            />
          </div>
        </section>
      </ScrollReveal>
    </PageTransition>
  );
}
