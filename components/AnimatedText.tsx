"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type AnimatedTextProps = {
  text: string;
  className?: string;
  byWord?: boolean;
};

export function AnimatedText({ text, className = "", byWord = true }: AnimatedTextProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const items = byWord ? text.split(" ") : text.split("");

  if (!mounted) {
    return <span className={`inline-block ${className}`}>{text}</span>;
  }

  return (
    <span className={`inline-block ${className}`}>
      {items.map((item, i) => (
        <motion.span
          key={`${item}-${i}`}
          className="inline-block"
          initial={{ opacity: 1, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.28,
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
