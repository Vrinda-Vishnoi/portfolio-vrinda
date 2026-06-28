// ============================================================================
//  Tiny synthesized sound engine (Web Audio API) — no audio files needed.
//  Each effect is generated on the fly, so it's lightweight and easy to tweak.
//  Sounds stay silent until the first user gesture (browser autoplay policy).
// ============================================================================

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let noiseBuffer: AudioBuffer | null = null;
let enabled = true;
let lastHover = 0;

const PREF_KEY = "portfolio-sound-enabled";

export type SoundName = "tick" | "pop" | "click" | "draw" | "chime";

function ensure(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.3;
    master.connect(ctx.destination);

    // a short white-noise buffer reused for paper/marker textures
    const len = Math.floor(ctx.sampleRate * 0.4);
    noiseBuffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  }
  return ctx;
}

/** Call from a real user gesture (click/keydown/touch) to unlock audio. */
export function resumeAudio() {
  const c = ensure();
  if (c && c.state === "suspended") void c.resume();
}

export function setSoundEnabled(b: boolean) {
  enabled = b;
  try {
    localStorage.setItem(PREF_KEY, b ? "1" : "0");
  } catch {
    /* ignore */
  }
}

export function loadSoundPref(): boolean {
  try {
    const v = localStorage.getItem(PREF_KEY);
    if (v !== null) enabled = v === "1";
  } catch {
    /* ignore */
  }
  return enabled;
}

function envelope(
  g: GainNode,
  t0: number,
  peak: number,
  attack: number,
  decay: number,
) {
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(peak, t0 + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + attack + decay);
}

export function playSound(name: SoundName) {
  if (!enabled) return;
  const c = ensure();
  if (!c || !master) return;
  if (c.state === "suspended") return; // not unlocked yet
  const t = c.currentTime;

  // throttle the rapid-fire hover sounds
  if (name === "tick" || name === "pop") {
    const now = performance.now();
    if (now - lastHover < 45) return;
    lastHover = now;
  }

  switch (name) {
    case "tick": {
      // soft pen tap for hovering links/chips
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = "triangle";
      o.frequency.setValueAtTime(1500, t);
      o.frequency.exponentialRampToValueAtTime(1050, t + 0.03);
      envelope(g, t, 0.1, 0.004, 0.04);
      o.connect(g).connect(master);
      o.start(t);
      o.stop(t + 0.07);
      break;
    }
    case "pop": {
      // paper "lift" for sticky notes / polaroid
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(540, t);
      o.frequency.exponentialRampToValueAtTime(220, t + 0.09);
      envelope(g, t, 0.18, 0.004, 0.09);
      o.connect(g).connect(master);
      o.start(t);
      o.stop(t + 0.13);
      break;
    }
    case "click": {
      // marker cap click for buttons
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = "square";
      o.frequency.setValueAtTime(440, t);
      o.frequency.exponentialRampToValueAtTime(170, t + 0.05);
      envelope(g, t, 0.14, 0.002, 0.06);
      o.connect(g).connect(master);
      o.start(t);
      o.stop(t + 0.09);

      const n = c.createBufferSource();
      n.buffer = noiseBuffer;
      const nf = c.createBiquadFilter();
      nf.type = "bandpass";
      nf.frequency.value = 1900;
      const ng = c.createGain();
      envelope(ng, t, 0.07, 0.001, 0.03);
      n.connect(nf).connect(ng).connect(master);
      n.start(t);
      n.stop(t + 0.05);
      break;
    }
    case "draw": {
      // marker squeak — bandpassed noise that sweeps up
      const n = c.createBufferSource();
      n.buffer = noiseBuffer;
      n.loop = true;
      const f = c.createBiquadFilter();
      f.type = "bandpass";
      f.Q.value = 6;
      f.frequency.setValueAtTime(2100, t);
      f.frequency.linearRampToValueAtTime(3100, t + 0.18);
      const g = c.createGain();
      envelope(g, t, 0.08, 0.02, 0.22);
      n.connect(f).connect(g).connect(master);
      n.start(t);
      n.stop(t + 0.26);
      break;
    }
    case "chime": {
      if (!master) break;
      // gentle two-note ding when a milestone is drawn in
      const m = master;
      [880, 1320].forEach((freq, i) => {
        const o = c.createOscillator();
        const g = c.createGain();
        o.type = "sine";
        o.frequency.value = freq;
        const tt = t + i * 0.05;
        envelope(g, tt, 0.1, 0.005, 0.25);
        o.connect(g).connect(m);
        o.start(tt);
        o.stop(tt + 0.32);
      });
      break;
    }
  }
}
