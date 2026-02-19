"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type ServiceCardProps = {
  title: string;
  description: string;
  icon?: LucideIcon;
  className?: string;
};

export function ServiceCard({ title, description, icon: Icon, className = "" }: ServiceCardProps) {
  return (
    <motion.article
      className={`rounded-xl border border-white/10 bg-surface p-6 transition-shadow hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] ${className}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {Icon && (
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
          <Icon className="h-5 w-5" aria-hidden />
        </div>
      )}
      <h3 className="text-lg font-semibold text-text">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">{description}</p>
    </motion.article>
  );
}
