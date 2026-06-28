"use client";

import { motion } from "framer-motion";
import { projects, type Project } from "@/lib/data";
import { ScribbleUnderline } from "./Doodles";
import { playSound } from "@/lib/sound";

const noteColor: Record<Project["color"], string> = {
  yellow: "#fef3c7",
  pink: "#fce7f3",
  blue: "#dbeafe",
  green: "#dcfce7",
  orange: "#ffedd5",
  purple: "#ede9fe",
};

const tilts = [-2.2, 1.6, -1.2, 2.4, -1.8, 1.1];

export function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-5 py-24">
      <div className="mb-16 text-center">
        <h2 className="relative inline-block font-marker text-4xl sm:text-5xl">
          Stuff I&apos;ve Built
          <ScribbleUnderline
            className="absolute -bottom-4 left-0 h-5 w-full"
            color="var(--color-marker-purple)"
          />
        </h2>
        <p className="mx-auto mt-8 max-w-lg font-hand text-lg text-ink/70">
          Sticky notes from the lab — voice agents, language models &amp;
          multimodal experiments.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <motion.article
            key={p.name}
            className="sticky-note rounded-[3px] p-6 cursor-pointer"
            style={{
              background: noteColor[p.color],
              rotate: `${tilts[i % tilts.length]}deg`,
            }}
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            whileInView={{
              opacity: 1,
              y: 0,
              rotate: tilts[i % tilts.length],
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
            onHoverStart={() => playSound("pop")}
            onTap={() => playSound("click")}
          >
            <span className="tape" aria-hidden />

            <div className="mb-2 flex items-start justify-between gap-2">
              <h3 className="font-marker text-lg leading-tight text-ink">
                {p.name}
              </h3>
              {p.repo && (
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`GitHub repo for ${p.name}`}
                  onClick={(e) => { e.stopPropagation(); playSound("click"); }}
                  onMouseEnter={() => playSound("tick")}
                  className="shrink-0 rounded-full border-2 border-ink/30 bg-white/50 px-2.5 py-1 font-hand text-xs font-bold text-ink/70 transition-all hover:border-ink hover:bg-white hover:text-ink"
                >
                  ⌥ GitHub ↗
                </a>
              )}
            </div>
            <p className="font-hand text-sm font-bold text-ink/55">{p.date}</p>

            <p className="mt-3 font-hand text-[15px] leading-snug text-ink/85">
              {p.blurb}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-ink/25 bg-white/40 px-2.5 py-0.5 font-hand text-xs font-bold text-ink/80"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
