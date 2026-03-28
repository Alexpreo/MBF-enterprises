import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import { AnimatedText } from "@/components/AnimatedText";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "About | Buddy Landscaping",
  description:
    "Decades of combined experience in premium hardscaping and exterior construction. We focus on high-end, bespoke projects built to outlast the elements.",
};

export default function About() {
  const coreValues = [
    {
      title: "Structural Integrity",
      description:
        "Every base, wall, and grade decision is made for long-term durability under real weather and real use.",
    },
    {
      title: "Design-Led Craft",
      description:
        "Function comes first, but finishes, symmetry, and material transitions are refined to feel cohesive and elevated.",
    },
    {
      title: "Transparent Process",
      description:
        "Clear scope, realistic timelines, and communication at each stage keep projects smooth from concept to final walkthrough.",
    },
  ];

  const processSteps = [
    {
      title: "1) Discovery & Site Review",
      description:
        "We evaluate your goals, property conditions, drainage realities, and usage needs to define the right project scope.",
    },
    {
      title: "2) Concept & Material Direction",
      description:
        "Layout strategy, hardscape forms, and premium material selections are shaped into a clear design direction.",
    },
    {
      title: "3) Build Execution",
      description:
        "Our team executes with disciplined prep, grading, compaction, and installation standards built for longevity.",
    },
    {
      title: "4) Final Refinement",
      description:
        "Lighting, edging, finishing details, and cleanup are completed so the final result feels fully resolved.",
    },
  ];

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
              Buddy Landscaping was founded on a simple principle: outdoor construction should be built to outlast the elements and designed to inspire. We are a dedicated team of craftsmen, designers, and builders who treat every property as if it were our own.
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

      <ScrollReveal>
        <section className="border-y border-white/5 bg-surface/50 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl lg:text-4xl">
                What We&apos;re Known For
              </h2>
              <p className="mt-4 text-base leading-relaxed text-text-muted sm:text-lg">
                We specialize in complete exterior transformations where structure, drainage, and finish quality all matter
                equally.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {coreValues.map((value) => (
                <article
                  key={value.title}
                  className="rounded-xl border border-white/10 bg-surface/70 p-6"
                >
                  <h3 className="text-lg font-semibold text-text">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">{value.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl lg:text-4xl">
                Our Build Process
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-muted">
                A premium result is driven by process discipline. We keep each phase structured so quality is predictable and
                details are not left to chance.
              </p>

              <div className="mt-8 space-y-5">
                {processSteps.map((step) => (
                  <article key={step.title} className="rounded-xl border border-white/10 bg-surface/60 p-5 sm:p-6">
                    <h3 className="text-base font-semibold text-text sm:text-lg">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted sm:text-base">{step.description}</p>
                  </article>
                ))}
              </div>
            </div>

            <aside className="rounded-2xl border border-white/10 bg-gradient-to-b from-surface to-surface/60 p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-text">Why Homeowners Choose Buddy Landscaping</h3>
              <ul className="mt-5 space-y-4 text-sm leading-relaxed text-text-muted sm:text-base">
                <li>High-end hardscaping and exterior construction tailored to your property, not template packages.</li>
                <li>Clear project communication from quote through final walkthrough.</li>
                <li>Material and installation standards built for long-term performance.</li>
                <li>Craftsmanship-first execution with an emphasis on clean, architectural finishes.</li>
              </ul>
            </aside>
          </div>
        </section>
      </ScrollReveal>
    </PageTransition>
  );
}
