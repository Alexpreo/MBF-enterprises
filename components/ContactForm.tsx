"use client";

import { useForm } from "@formspree/react";
import { motion } from "framer-motion";

const FORMSPREE_FORM_ID = "xjgeodgl";

export function ContactForm() {
  const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID);

  if (state.succeeded) {
    return (
      <p className="rounded-lg bg-accent/10 p-6 text-center text-text">
        Thank you. We&apos;ll be in touch soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text">
          Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          required
          className="mt-2 block w-full rounded-lg border border-white/10 bg-surface px-4 py-3 text-text placeholder-text-muted focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className="mt-2 block w-full rounded-lg border border-white/10 bg-surface px-4 py-3 text-text placeholder-text-muted focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-text">
          Phone
        </label>
        <input
          id="phone"
          type="tel"
          name="phone"
          className="mt-2 block w-full rounded-lg border border-white/10 bg-surface px-4 py-3 text-text placeholder-text-muted focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
          placeholder="(555) 000-0000"
        />
      </div>
      <div>
        <label htmlFor="details" className="block text-sm font-medium text-text">
          Project Details
        </label>
        <textarea
          id="details"
          name="message"
          rows={5}
          required
          className="mt-2 block w-full resize-y rounded-lg border border-white/10 bg-surface px-4 py-3 text-text placeholder-text-muted focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
          placeholder="Tell us about your project..."
        />
      </div>
      <motion.button
        type="submit"
        disabled={state.submitting}
        className="w-full rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-bg transition-shadow hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] disabled:opacity-70"
        whileTap={{ scale: 0.98 }}
      >
        {state.submitting ? "Sending..." : "Submit"}
      </motion.button>
      {state.errors && (
        <p className="text-sm text-red-400">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
