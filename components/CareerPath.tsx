"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { milestones, type Milestone } from "@/lib/data";
import { ScribbleUnderline } from "./Doodles";
import { playSound } from "@/lib/sound";

type Pt = { x: number; y: number };

const kindStyle = {
  education: {
    color: "var(--color-marker-blue)",
    note: "#bfdbfe",
    icon: "🎓",
    label: "school",
  },
  work: {
    color: "var(--color-marker-orange)",
    note: "#fed7aa",
    icon: "💼",
    label: "work",
  },
} as const;

export function CareerPath() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLLIElement | null)[]>([]);
  const pathRef = useRef<SVGPathElement>(null);

  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [pts, setPts] = useState<Pt[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Measure node positions so the drawn line threads through the real cards.
  useEffect(() => {
    const measure = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const rect = wrap.getBoundingClientRect();
      const mobile = rect.width < 768;
      const cx = mobile ? Math.max(34, rect.width * 0.1) : rect.width / 2;
      const points = nodeRefs.current.map((el) => {
        if (!el) return { x: cx, y: 0 };
        const r = el.getBoundingClientRect();
        return { x: cx, y: r.top - rect.top + r.height / 2 };
      });
      setIsMobile(mobile);
      setDims({ w: rect.width, h: rect.height });
      setPts(points);
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Scroll-linked draw progress.
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start 0.8", "end 0.65"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // The wandering, hand-drawn line through every milestone point.
  const buildPath = () => {
    if (pts.length === 0 || dims.w === 0) return "";
    const cx = pts[0].x;
    const amp = isMobile ? 26 : Math.min(150, dims.w * 0.12);
    const lead = 26;
    const tail = 30;
    let d = `M ${cx} ${pts[0].y - lead} L ${cx} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const y1 = pts[i].y;
      const y2 = pts[i + 1].y;
      const dir = i % 2 === 0 ? 1 : -1;
      const bx = cx + dir * amp;
      const c1y = y1 + (y2 - y1) * 0.35;
      const c2y = y1 + (y2 - y1) * 0.65;
      d += ` C ${bx} ${c1y} ${bx} ${c2y} ${cx} ${y2}`;
    }
    d += ` L ${cx} ${pts[pts.length - 1].y + tail}`;
    return d;
  };
  const dPath = buildPath();
  const ready = dPath.length > 0;

  // The marker nib that rides along the line as it's drawn.
  const tipX = useMotionValue(0);
  const tipY = useMotionValue(0);
  const tipOpacity = useMotionValue(0);
  const wasDrawing = useRef(false);
  const lastDrawV = useRef(0);
  
  useMotionValueEvent(progress, "change", (v) => {
    const p = pathRef.current;
    if (!p) return;
    const len = p.getTotalLength();
    if (!len) return;
    const clamped = Math.max(0, Math.min(1, v));
    const pt = p.getPointAtLength(clamped * len);
    tipX.set(pt.x);
    tipY.set(pt.y);
    tipOpacity.set(clamped > 0.005 && clamped < 0.995 ? 1 : 0);
    
    // play a short "draw" squeak when the line moves
    const drawing = clamped > 0.01 && clamped < 0.99;
    
    if (drawing) {
      if (!wasDrawing.current || Math.abs(clamped - lastDrawV.current) > 0.04) {
        playSound("draw");
        lastDrawV.current = clamped;
      }
    }
    wasDrawing.current = drawing;
  });

  return (
    <section id="path" className="relative mx-auto max-w-6xl px-5 py-24">
      <div className="mb-16 text-center">
        <h2 className="relative inline-block font-marker text-4xl sm:text-5xl">
          The Career Path
          <ScribbleUnderline
            className="absolute -bottom-4 left-0 h-5 w-full"
            color="var(--color-marker-orange)"
          />
        </h2>
        <p className="mx-auto mt-8 max-w-lg font-hand text-lg text-ink/70">
          Pencils down — here&apos;s the line I&apos;ve been drawing, from the
          very first dot to where I&apos;m standing today.
        </p>
      </div>

      <div ref={wrapRef} className="relative">
        {/* The drawn line + dots, overlaid behind the cards */}
        {ready && (
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox={`0 0 ${dims.w} ${dims.h}`}
            preserveAspectRatio="none"
            aria-hidden
          >
            <g className="sketch">
              {/* faint full path so the route is hinted before drawing */}
              <path
                d={dPath}
                fill="none"
                stroke="var(--color-ink)"
                strokeOpacity="0.08"
                strokeWidth="3"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              {/* the animated, drawn line */}
              <motion.path
                ref={pathRef}
                d={dPath}
                fill="none"
                stroke="var(--color-ink)"
                strokeWidth="3.5"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                style={{ pathLength: progress }}
              />
            </g>

            {pts.map((p, i) => (
              <SpineDot
                key={i}
                x={p.x}
                y={p.y}
                threshold={dims.h ? p.y / dims.h : 0}
                progress={progress}
                color={kindStyle[milestones[i].kind].color}
              />
            ))}

            {/* marker nib riding the line */}
            <motion.circle
              cx={tipX}
              cy={tipY}
              r="7"
              fill="var(--color-marker-orange)"
              stroke="#fff"
              strokeWidth="2.5"
              style={{ opacity: tipOpacity }}
            />
          </svg>
        )}

        {/* The milestone cards */}
        <ol className="relative m-0 list-none p-0">
          {milestones.map((m, i) => {
            const side = i % 2 === 0 ? "right" : "left";
            return (
              <li
                key={i}
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                className="relative flex min-h-[240px] items-center md:min-h-[300px]"
              >
                <div
                  className={[
                    "w-full pl-16 md:w-[45%] md:pl-0",
                    side === "right" ? "md:ml-auto md:pl-12" : "md:mr-auto md:pr-12",
                  ].join(" ")}
                >
                  <MilestoneCard milestone={m} side={side} index={i} />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* A dot on the spine that pops in as the line reaches it. */
function SpineDot({
  x,
  y,
  threshold,
  progress,
  color,
}: {
  x: number;
  y: number;
  threshold: number;
  progress: MotionValue<number>;
  color: string;
}) {
  const scale = useTransform(
    progress,
    [threshold - 0.04, threshold + 0.02],
    [0, 1],
    { clamp: true },
  );
  const opacity = useTransform(
    progress,
    [threshold - 0.04, threshold],
    [0, 1],
    { clamp: true },
  );
  return (
    <motion.g style={{ opacity }}>
      <motion.circle
        cx={x}
        cy={y}
        r="11"
        fill="#fcfcf9"
        stroke={color}
        strokeWidth="4"
        className="sketch"
        style={{ scale, transformOrigin: `${x}px ${y}px` }}
      />
    </motion.g>
  );
}

/* A hand-drawn card for a single milestone. */
function MilestoneCard({
  milestone,
  side,
  index,
}: {
  milestone: Milestone;
  side: "left" | "right";
  index: number;
}) {
  const s = kindStyle[milestone.kind];
  return (
    <motion.div
      className="relative p-5 sm:p-6"
      initial={{ opacity: 0, x: side === "right" ? 40 : -40, y: 10 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      onAnimationComplete={() => playSound("chime")}
      viewport={{ once: true, amount: 0.55 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      style={{ rotate: index % 2 === 0 ? -0.6 : 0.6 }}
    >
      {/* hand-drawn box */}
      <svg
        className="sketch pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <rect
          x="2"
          y="2"
          width="96"
          height="96"
          rx="3"
          fill="#ffffff"
          stroke={s.color}
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="relative">
        <div
          className="mb-2 inline-flex items-center gap-2 rounded-full px-3 py-1 font-hand text-sm font-bold text-ink"
          style={{ background: s.note }}
        >
          <span aria-hidden>{s.icon}</span>
          {milestone.period}
        </div>

        <h3 className="font-marker text-xl leading-tight text-ink sm:text-2xl">
          {milestone.title}
        </h3>
        <p
          className="mt-1 font-hand text-base font-bold"
          style={{ color: s.color }}
        >
          {milestone.org}
        </p>
        <p className="mt-2 font-hand text-base text-ink/75">{milestone.detail}</p>

        {milestone.highlights && (
          <ul className="mt-3 space-y-1.5">
            {milestone.highlights.map((h, j) => (
              <li
                key={j}
                className="flex gap-2 font-hand text-[15px] leading-snug text-ink/80"
              >
                <span style={{ color: s.color }} aria-hidden>
                  ✦
                </span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}
