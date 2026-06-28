"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { setSoundEnabled, loadSoundPref, resumeAudio } from "@/lib/sound";

const SoundCtx = createContext<{
  enabled: boolean;
  toggle: () => void;
}>({ enabled: true, toggle: () => {} });

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(true);

  // Read saved pref on mount (client-only)
  useEffect(() => {
    setEnabled(loadSoundPref());
  }, []);

  // Unlock the AudioContext on the first user interaction anywhere on the page
  useEffect(() => {
    const unlock = () => resumeAudio();
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      setSoundEnabled(!prev);
      return !prev;
    });
  }, []);

  return (
    <SoundCtx.Provider value={{ enabled, toggle }}>
      {children}
    </SoundCtx.Provider>
  );
}

export function useSoundEnabled() {
  return useContext(SoundCtx);
}
