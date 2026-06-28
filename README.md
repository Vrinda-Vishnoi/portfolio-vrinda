# Vrinda Vishnoi — Portfolio ✏️

A hand-drawn, whiteboard-themed portfolio built with Next.js. The career path
literally **draws itself out** as you scroll — a wandering marker line that
threads through every milestone, from the first school dot to today.

## Run it

```bash
npm run dev      # start dev server → http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Editing your content

**Everything is in one file:** [`lib/data.ts`](lib/data.ts). No component edits
needed — change text there and the site updates.

- `profile` — name, title, tagline, location, email, socials, intro blurb
- `milestones` — the career path (`kind: "education" | "work"`), in order. The
  drawn line and dots are generated automatically from this list.
- `projects` — the sticky notes. Pick a `color`
  (`yellow | pink | blue | green | orange | purple`) and add `tags`.
- `skillGroups` — the toolbox clusters.
- `openSource` / `blogs` — extras. Add real URLs to `blogs[].link`.

## How the "drawing" works

- `components/CareerPath.tsx` measures the real position of each milestone card,
  builds a wavy SVG path through them, and ties the line's `pathLength` to scroll
  progress (Framer Motion). A marker "nib" rides the tip as it draws.
- `components/SketchDefs.tsx` defines an SVG turbulence filter; the `.sketch`
  class gives any stroke a hand-drawn wobble.
- `components/Doodles.tsx` holds reusable doodles (underlines, arrows, sparkles).
- Fonts: **Permanent Marker** (headings), **Kalam** (handwriting body),
  **Caveat** (accents) — loaded via `next/font` in `app/layout.tsx`.

## Theme

Whiteboard palette and tokens live in [`app/globals.css`](app/globals.css)
(`--color-marker-*`, sticky-note colors, the dot-grid board background).

---

Built with Next.js, Tailwind CSS v4, and Framer Motion.
# portfolio-vrinda
