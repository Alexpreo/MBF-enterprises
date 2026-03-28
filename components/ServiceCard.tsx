"use client";

import type { LucideIcon } from "lucide-react";

type ServiceCardProps = {
  title: string;
  description: string;
  icon?: LucideIcon;
  className?: string;
};

export function ServiceCard({ title, description, icon: Icon, className = "" }: ServiceCardProps) {
  return (
    <article
      className={`rounded-xl border border-white/10 bg-surface p-6 transition-all duration-200 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] md:hover:-translate-y-1 ${className}`}
    >
      {Icon && (
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
          <Icon className="h-5 w-5" aria-hidden />
        </div>
      )}
      <h3 className="text-xl font-semibold leading-snug text-text sm:text-2xl">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">{description}</p>
    </article>
  );
}
