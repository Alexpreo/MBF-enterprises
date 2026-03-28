"use client";

/**
 * Plain wrapper — no transform/animation on the page root.
 * Framer Motion transforms here break `position: fixed` for descendants (lightboxes, modals) on mobile Safari.
 */
type PageTransitionProps = {
  children: React.ReactNode;
  className?: string;
};

export function PageTransition({ children, className }: PageTransitionProps) {
  return <div className={className}>{children}</div>;
}
