"use client";

import { motion } from "framer-motion";
import { blogs } from "@/lib/data";
import { ScribbleUnderline } from "./Doodles";
import { playSound } from "@/lib/sound";

const TINTS = ["#fef9ec", "#f0f4ff", "#f0fdf4"];
const FOLD_COLORS = ["#fde68a", "#bfdbfe", "#bbf7d0"];

export function Extras() {
  return (
    <section className="relative mx-auto max-w-5xl px-5 py-20">

      {/* Header */}
      <motion.div
        className="mb-14 text-center"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <p className="mb-2 font-hand text-sm uppercase tracking-[0.2em] text-ink/40">
          from the notebook
        </p>
        <h2 className="relative inline-block font-marker text-4xl sm:text-5xl">
          Writing
          <ScribbleUnderline
            className="absolute -bottom-3 left-0 h-5 w-full"
            color="var(--color-marker-red)"
          />
        </h2>
      </motion.div>

      {/* Blog cards */}
      <div className="flex flex-col gap-8 sm:flex-row sm:flex-wrap sm:justify-center">
        {blogs.map((b, i) => (
          <BlogCard key={i} blog={b} index={i} tint={TINTS[i % TINTS.length]} foldColor={FOLD_COLORS[i % FOLD_COLORS.length]} />
        ))}
      </div>
    </section>
  );
}

function BlogCard({
  blog,
  index,
  tint,
  foldColor,
}: {
  blog: { title: string; link?: string };
  index: number;
  tint: string;
  foldColor: string;
}) {
  const tilt = index % 2 === 0 ? -1.2 : 1.4;

  return (
    <motion.a
      href={blog.link ?? "#"}
      target={blog.link && blog.link !== "#" ? "_blank" : undefined}
      rel="noreferrer"
      aria-label={blog.title}
      className="group relative block w-full sm:w-[320px]"
      style={{ rotate: `${tilt}deg` }}
      initial={{ opacity: 0, y: 28, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      whileHover={{ y: -6, rotate: 0, scale: 1.02 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45, delay: index * 0.1, type: "spring", stiffness: 260, damping: 22 }}
      onHoverStart={() => playSound("pop")}
      onClick={() => playSound("click")}
    >
      {/* Paper body */}
      <div
        className="relative overflow-hidden rounded-sm px-6 pb-8 pt-5 shadow-[0_6px_24px_-8px_rgba(0,0,0,0.22)]"
        style={{ background: tint }}
      >
        {/* Hand-drawn border via SVG overlay */}
        <svg
          className="sketch pointer-events-none absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          aria-hidden
        >
          <rect
            x="2" y="2" width="96%" height="96%"
            rx="2"
            fill="transparent"
            stroke="var(--color-ink)"
            strokeOpacity="0.2"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Ruled notebook lines */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          aria-hidden
        >
          {[38, 58, 78, 98, 118, 138, 158].map((y) => (
            <line
              key={y}
              x1="20" y1={`${y}%`} x2="96%" y2={`${y}%`}
              stroke="var(--color-ink)"
              strokeOpacity="0.07"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {/* red margin rule */}
          <line
            x1="18%" y1="0" x2="18%" y2="100%"
            stroke="#fca5a5"
            strokeOpacity="0.45"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Dog-ear fold — top-right corner */}
        <div
          className="absolute right-0 top-0 h-10 w-10 sketch"
          aria-hidden
        >
          <svg viewBox="0 0 40 40" className="h-full w-full">
            {/* folded flap */}
            <path d="M40 0 L40 40 L0 0 Z" fill={foldColor} opacity="0.7" />
            {/* crease line */}
            <line x1="0" y1="0" x2="40" y2="40"
              stroke="var(--color-ink)" strokeOpacity="0.18"
              strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* pencil icon */}
        <span className="mb-3 block font-hand text-xl text-ink/40" aria-hidden>✎</span>

        {/* Title */}
        <h3 className="relative z-10 font-marker text-xl leading-snug text-ink group-hover:text-ink sm:text-2xl">
          {blog.title}
        </h3>

        {/* Read more arrow — draws in on hover */}
        <div className="mt-5 flex items-center gap-2 font-hand text-sm text-ink/50 transition-colors group-hover:text-ink/80">
          <span>read it</span>
          <motion.span
            className="inline-block"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
          >
            →
          </motion.span>
        </div>
      </div>
    </motion.a>
  );
}
