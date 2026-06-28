"use client";

import { motion } from "framer-motion";

/* A wobbly underline that "draws" itself when scrolled into view. */
export function ScribbleUnderline({
  className = "",
  color = "var(--color-marker-blue)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 300 18"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
    >
      <motion.path
        d="M3 11C46 5 92 4 138 7c44 3 88 6 159 2"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      />
      <motion.path
        d="M14 15C70 12 150 13 286 11"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.55"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, delay: 0.12, ease: "easeInOut" }}
      />
    </svg>
  );
}

/* A small curvy arrow doodle. Rotate via className. */
export function Arrow({
  className = "",
  color = "var(--color-ink)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      className={`sketch ${className}`}
      viewBox="0 0 80 66"
      fill="none"
      aria-hidden
    >
      {/* body — curves from upper-left to right-centre */}
      <path
        d="M6 10C22 42 44 54 70 50"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* arrowhead upper arm — goes upper-left from tip */}
      <path
        d="M70 50C62 46 56 42 50 36"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* arrowhead lower arm — goes lower-left from tip (symmetric V) */}
      <path
        d="M70 50C62 54 56 57 50 60"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* A four-point sparkle/star doodle. */
export function Sparkle({
  className = "",
  color = "var(--color-marker-orange)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      className={`sketch ${className}`}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden
    >
      <path
        d="M20 3C21 13 27 19 37 20C27 21 21 27 20 37C19 27 13 21 3 20C13 19 19 13 20 3Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill={color}
        fillOpacity="0.12"
      />
    </svg>
  );
}

/* A loose hand-drawn circle, e.g. to ring a word. */
export function CircleScribble({
  className = "",
  color = "var(--color-marker-red)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 90"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
    >
      <motion.path
        d="M100 6C150 4 196 18 196 45C196 74 140 86 96 84C42 81 6 66 6 43C6 19 56 8 110 7"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      />
    </svg>
  );
}
