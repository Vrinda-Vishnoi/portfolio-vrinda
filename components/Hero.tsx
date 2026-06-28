"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { Arrow, ScribbleUnderline, Sparkle } from "./Doodles";
import { Polaroid } from "./Polaroid";

export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[88vh] max-w-6xl items-center px-5 py-16"
    >
      {/* floating doodles */}
      <Sparkle className="absolute left-[6%] top-[16%] h-9 w-9 rotate-6 opacity-80" />
      <Sparkle
        className="absolute right-[10%] top-[20%] h-6 w-6 -rotate-12 opacity-70"
        color="var(--color-marker-purple)"
      />
      <Arrow
        className="absolute right-[8%] bottom-[16%] hidden h-16 w-16 -rotate-12 opacity-60 lg:block"
        color="var(--color-marker-green)"
      />

      <div className="mx-auto flex w-full flex-col items-center gap-10 text-center md:flex-row md:justify-center md:gap-14 md:text-left">
        {/* Photo */}
        <Polaroid
          src={profile.photo || undefined}
          alt={`Photo of ${profile.name}`}
          caption={profile.photoCaption}
        />

        {/* Text block */}
        <div className="flex flex-col items-center md:items-start">
          <motion.p
            className="mb-3 font-hand text-lg text-ink/70"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            ✎ this is me, sketched out —
          </motion.p>

          {/* The name, revealed left-to-right like it's being written */}
          <div className="relative inline-block">
            <motion.h1
              className="font-marker text-5xl leading-none text-ink sm:text-6xl lg:text-7xl"
              initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
              animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
              transition={{ duration: 1.1, ease: "easeInOut", delay: 0.2 }}
            >
              {profile.name}
            </motion.h1>
            <ScribbleUnderline className="absolute -bottom-3 left-0 h-5 w-full" />
          </div>

          <motion.h2
            className="mt-8 font-marker text-2xl sm:text-3xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <span
              className="highlight"
              style={{ "--hl": "#bfdbfe" } as React.CSSProperties}
            >
              {profile.title}
            </span>
          </motion.h2>

          <motion.p
            className="mt-6 max-w-md font-hand text-xl text-ink/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.45 }}
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            className="mt-6 flex items-center gap-2 font-hand text-base text-ink/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            <span aria-hidden>📍</span>
            {profile.location}
          </motion.div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#path"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 font-hand text-ink/60 hover:text-ink sm:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 7, 0] }}
        transition={{
          opacity: { delay: 2, duration: 0.6 },
          y: { delay: 2.2, duration: 1.6, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        let me draw my journey
        <span className="text-2xl leading-none" aria-hidden>
          ↓
        </span>
      </motion.a>
    </section>
  );
}
