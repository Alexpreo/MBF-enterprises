"use client";

const FLOATING_NAV_CLEARANCE =
  "pt-[max(5.75rem,calc(env(safe-area-inset-top,0px)+5rem))] md:pt-[max(6rem,calc(env(safe-area-inset-top,0px)+5.35rem))] lg:pt-[max(6.5rem,calc(env(safe-area-inset-top,0px)+5.85rem))]";

/**
 * Plain wrapper — no transform/animation on the page root.
 * Framer Motion transforms here break `position: fixed` for descendants (lightboxes, modals) on mobile Safari.
 */
type PageTransitionProps = {
  children: React.ReactNode;
  className?: string;
  /** When true, content starts flush under the fixed nav (e.g. home hero bleeding under chrome). */
  overlapFloatingNav?: boolean;
};

export function PageTransition({
  children,
  className = "",
  overlapFloatingNav = false,
}: PageTransitionProps) {
  return (
    <div className={`${overlapFloatingNav ? "" : FLOATING_NAV_CLEARANCE} ${className}`.trim()}>
      {children}
    </div>
  );
}
