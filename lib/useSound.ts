"use client";

import { useCallback } from "react";
import { playSound, type SoundName } from "./sound";

export function useSound(name: SoundName) {
  return useCallback(() => playSound(name), [name]);
}
