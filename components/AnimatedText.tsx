"use client";

import { motion } from "framer-motion";

type AnimatedTextProps = {
  text: string;
  className?: string;
  byWord?: boolean;
};

export function AnimatedText({ text, className = "", byWord = true }: AnimatedTextProps) {
  const items = byWord ? text.split(" ") : text.split("");

  return (
    <span className={`inline-block ${className}`}>
      {items.map((item, i) => (
        <motion.span
          key={`${item}-${i}`}
          className="inline-block"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.25,
            delay: 0.03 * i,
          }}
        >
          {item}
          {byWord && i < items.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </span>
  );
}
