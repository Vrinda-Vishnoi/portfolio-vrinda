"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { playSound } from "@/lib/sound";

export function Polaroid({
  src,
  alt,
  caption,
}: {
  src?: string;
  alt: string;
  caption: string;
}) {
  return (
    <motion.div
      className="relative shrink-0"
      initial={{ opacity: 0, y: -20, rotate: -8 }}
      animate={{ opacity: 1, y: 0, rotate: -3 }}
      transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
      whileHover={{ rotate: 0, scale: 1.02 }}
      onHoverStart={() => playSound("pop")}
    >
      {/* the polaroid card */}
      <div className="relative bg-white p-3 pb-14 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)]">
        {/* tape strip */}
        <span className="tape" aria-hidden />

        <div className="relative aspect-[4/5] w-[220px] overflow-hidden bg-stone-100 sm:w-[250px]">
          {src ? (
            <Image
              src={src}
              alt={alt}
              fill
              priority
              sizes="250px"
              className="object-cover"
            />
          ) : (
            <PlaceholderAvatar />
          )}
        </div>

        <p className="absolute inset-x-0 bottom-3 text-center font-display text-2xl text-ink/80">
          {caption}
        </p>
      </div>
    </motion.div>
  );
}

/* A hand-drawn stand-in shown until a real photo is dropped in. */
function PlaceholderAvatar() {
  return (
    <svg
      viewBox="0 0 200 250"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <rect width="200" height="250" fill="#f5f5f4" />
      <g
        className="sketch"
        fill="none"
        stroke="var(--color-ink)"
        strokeOpacity="0.55"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <circle cx="100" cy="95" r="42" />
        <path d="M40 235c4-46 28-72 60-72s56 26 60 72" />
      </g>
      <text
        x="100"
        y="160"
        textAnchor="middle"
        className="font-hand"
        fontSize="15"
        fill="var(--color-ink)"
        fillOpacity="0.45"
      >
        drop your photo in
      </text>
      <text
        x="100"
        y="180"
        textAnchor="middle"
        className="font-hand"
        fontSize="13"
        fill="var(--color-ink)"
        fillOpacity="0.4"
      >
        /public
      </text>
    </svg>
  );
}
