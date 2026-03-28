import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { AnimatedText } from "@/components/AnimatedText";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Buddy Landscaping",
  description:
    "Ready to transform your outdoor space? Get in touch for a consultation. Premium hardscaping, design, and construction.",
};

export default function Contact() {
  return (
    <PageTransition>
      <section className="flex min-h-[40vh] flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-center text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-6xl">
          <AnimatedText text="Get In Touch" className="block w-full text-center" />
        </h1>
        <p className="mt-6 max-w-2xl text-center text-lg text-text-muted">
          Ready to transform your outdoor space? We&apos;d love to hear from you.
        </p>
      </section>

      <ScrollReveal>
        <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="lg:max-w-lg">
            <ContactForm />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-text">Direct Contact</h2>
            <p className="mt-1 text-lg font-medium text-text">Jack Fang - Owner</p>
            <ul className="mt-3 space-y-4 text-text-muted">
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-accent" aria-hidden />
                <span>(778) 386-1862</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-accent" aria-hidden />
                <span>jack7783861862@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      </ScrollReveal>
    </PageTransition>
  );
}
