"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type MotionProps = { children: ReactNode; className?: string; delay?: number };

/** A restrained entrance used for page-level content. Honors the visitor's reduced-motion preference. */
export function PageEnter({ children, className }: Omit<MotionProps, "delay">) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Reveals a section once as it enters the viewport; avoids perpetual scroll animation. */
export function Reveal({ children, className, delay = 0 }: MotionProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
