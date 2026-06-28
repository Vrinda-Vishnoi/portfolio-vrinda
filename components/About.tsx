"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { CircleScribble } from "./Doodles";

export function About() {
  return (
    <section className="relative mx-auto max-w-3xl px-5 py-16 text-center">
      <motion.p
        className="font-hand text-2xl leading-relaxed text-ink/85 sm:text-3xl"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
      >
        {profile.intro}
      </motion.p>

      <div className="relative mx-auto mt-6 inline-block">
        <span className="font-marker text-xl text-marker-orange">
          {profile.introCircle}
        </span>
        <CircleScribble
          className="absolute -inset-x-6 -inset-y-3 h-[calc(100%+1.5rem)] w-[calc(100%+3rem)]"
          color="var(--color-marker-orange)"
        />
      </div>
    </section>
  );
}
