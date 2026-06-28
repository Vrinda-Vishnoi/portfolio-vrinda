"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/data";

/* Each pill gets its own hand-drawn SVG rect — no CSS border. */
function SketchPill({ label }: { label: string }) {
  return (
    <motion.span
      className="relative inline-flex cursor-default px-3 py-1"
      whileHover={{ scale: 1.06 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
    >
      {/* wobbly border drawn as an SVG overlay */}
      <svg
        className="sketch pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        preserveAspectRatio="none"
        aria-hidden
      >
        <rect
          x="1.5"
          y="1.5"
          width="calc(100% - 3px)"
          height="calc(100% - 3px)"
          rx="3"
          ry="3"
          fill="transparent"
          stroke="var(--color-ink)"
          strokeOpacity="0.35"
          strokeWidth="1.8"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span className="relative font-hand text-[15px] text-ink/80 group-hover:text-ink">
        {label}
      </span>
    </motion.span>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-5xl px-5 py-24">

      {/* Section header */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <p className="mb-2 font-hand text-sm uppercase tracking-[0.2em] text-ink/40">
          the toolkit
        </p>
        <h2 className="font-marker text-4xl text-ink sm:text-5xl">Skills</h2>
        <div className="mt-5 h-px w-full bg-ink/12" />
      </motion.div>

      {/* Skill rows */}
      <div className="divide-y divide-ink/10">
        {skillGroups.map((group, i) => (
          <motion.div
            key={group.label}
            className="grid grid-cols-1 gap-4 py-7 sm:grid-cols-[200px_1fr] sm:gap-8 sm:py-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <p className="font-hand text-sm font-bold uppercase tracking-widest text-ink/40 sm:pt-1">
              {group.label}
            </p>

            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <SketchPill key={item} label={item} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="h-px w-full bg-ink/12" />
    </section>
  );
}
