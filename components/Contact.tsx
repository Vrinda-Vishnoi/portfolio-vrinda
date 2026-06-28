"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { Arrow, Sparkle } from "./Doodles";
import { playSound } from "@/lib/sound";

export function Contact() {
  return (
    <footer
      id="contact"
      className="relative mx-auto max-w-4xl px-5 pb-20 pt-10 text-center"
    >
      <Sparkle className="absolute left-[10%] top-2 h-7 w-7 rotate-12 opacity-70" />
      <Arrow
        className="absolute right-[12%] top-0 hidden h-14 w-14 rotate-[120deg] opacity-60 sm:block"
        color="var(--color-marker-purple)"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-marker text-4xl sm:text-5xl">Let&apos;s draw something together</h2>
        <p className="mx-auto mt-6 max-w-md font-hand text-lg text-ink/70">
          Got an idea worth sketching out? I&apos;m always up for a good
          AI problem, a collaboration, or just a chat.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-ink px-7 py-3 font-marker text-base text-board transition-transform hover:-translate-y-1 hover:rotate-[-1deg]"
            onMouseEnter={() => playSound("tick")}
            onClick={() => playSound("click")}
          >
            ✉ Email me
          </a>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border-2 border-ink px-7 py-3 font-marker text-base text-ink transition-transform hover:-translate-y-1 hover:rotate-[1deg]"
            onMouseEnter={() => playSound("tick")}
            onClick={() => playSound("click")}
          >
            GitHub
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border-2 border-ink px-7 py-3 font-marker text-base text-ink transition-transform hover:-translate-y-1 hover:rotate-[-1deg]"
            onMouseEnter={() => playSound("tick")}
            onClick={() => playSound("click")}
          >
            LinkedIn
          </a>
        </div>

        <div className="mt-10 flex flex-col items-center gap-1 font-hand text-ink/60">
          <span>{profile.email}</span>
          <span>{profile.phone} · {profile.location}</span>
        </div>

        <p className="mt-14 font-hand text-sm text-ink/40">
          ✏️ Hand-drawn with Next.js — {new Date().getFullYear()} {profile.name}
        </p>
      </motion.div>
    </footer>
  );
}
