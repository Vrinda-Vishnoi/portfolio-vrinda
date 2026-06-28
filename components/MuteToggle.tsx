"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSoundEnabled } from "./SoundProvider";
import { playSound } from "@/lib/sound";

export function MuteToggle() {
  const { enabled, toggle } = useSoundEnabled();

  function handleClick() {
    if (enabled) playSound("click");
    toggle();
  }

  return (
    <button
      onClick={handleClick}
      aria-label={enabled ? "Mute sounds" : "Unmute sounds"}
      title={enabled ? "Mute sounds" : "Unmute sounds"}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink/25 bg-white/60 transition-all hover:scale-110 hover:border-ink/60 active:scale-95"
    >
      <SketchSpeaker enabled={enabled} />
    </button>
  );
}

function SketchSpeaker({ enabled }: { enabled: boolean }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className="h-5 w-5 sketch"
      aria-hidden
    >
      {/* Speaker cone body — always visible */}
      <g
        stroke="var(--color-ink)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* box */}
        <path d="M5 12h4l6-5v18l-6-5H5V12z" />
        {/* cone flare */}
        <path d="M15 11c2 1.5 3 2.8 3 5s-1 3.5-3 5" />
      </g>

      {/* Sound waves — draw in when enabled, draw out when muted */}
      <AnimatePresence>
        {enabled && (
          <>
            <motion.path
              key="wave1"
              d="M19.5 13.5c1.5 1 2.5 1.8 2.5 2.5s-1 1.5-2.5 2.5"
              stroke="var(--color-marker-blue)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            <motion.path
              key="wave2"
              d="M22 11c2 1.6 3.2 3 3.2 5s-1.2 3.4-3.2 5"
              stroke="var(--color-marker-blue)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.35, delay: 0.08, ease: "easeOut" }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Mute X slash — draw in when muted */}
      <AnimatePresence>
        {!enabled && (
          <motion.path
            key="mute"
            d="M20 12.5L26 19.5M26 12.5L20 19.5"
            stroke="var(--color-marker-red)"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            exit={{ pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
    </svg>
  );
}
