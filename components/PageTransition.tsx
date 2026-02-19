"use client";

import { motion } from "framer-motion";

const DEFAULT_TRANSITION = { duration: 0.35 };

type PageTransitionProps = {
  children: React.ReactNode;
  className?: string;
};

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={DEFAULT_TRANSITION}
      className={className}
    >
      {children}
    </motion.div>
  );
}
