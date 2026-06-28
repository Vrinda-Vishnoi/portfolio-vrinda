// ============================================================================
//  Portfolio content — everything here is editable. Change text, add items,
//  reorder things, and the site updates automatically. No component edits needed.
// ============================================================================

export const profile = {
  nickname: "vrinda",
  name: "Vrinda Vishnoi",
  title: "Software Engineer",
  tagline: "Building scalable backend systems and dynamic full-stack applications.",
  location: "Kanpur, India",
  // Path to your photo in /public (e.g. "/profile.jpg"). Empty = sketch placeholder.
  photo: "/profile.jpg",
  photoCaption: "Vrinda Vishnoi",
  email: "vrindavishnoi2003@gmail.com",
  phone: "+91-9650323983",
  socials: {
    github: "https://github.com/Vrinda-Vishnoi",
    linkedin: "https://linkedin.com/in/vrinda-vishnoi",
  },
  // A short, hand-written intro shown near the top of the page.
  intro:
    "Hey — I'm Vrinda. I specialize in building robust backend architectures, scalable full-stack platforms, and performance-optimized frontends. I love solving complex engineering problems from first principles, optimizing databases, and engineering seamless user experiences.",
  
  introCircle:"Let's build !",
};

// ----------------------------------------------------------------------------
//  Career path — the milestones, drawn out in order (earliest → now).
//  `kind` controls the color/icon: "education" | "work".
// ----------------------------------------------------------------------------

export type Milestone = {
  kind: "education" | "work";
  period: string;
  title: string;
  org: string;
  detail: string;
  highlights?: string[];
};

export const milestones: Milestone[] = [
  {
    kind: "education",
    period: "2021",
    title: "Intermediate (12th, CBSE)",
    org: "Jain International School, Kanpur",
    detail: "Percentage: 79%",
  },
  {
    kind: "education",
    period: "2021 — 2025",
    title: "B.Tech in Computer Science (AI)",
    org: "PSIT (AKTU), Kanpur",
    detail: "Percentage: 70%",
  },
  {
    kind: "work",
    period: "Feb 2024 — Apr 2024",
    title: "Data Science Intern",
    org: "Devtern",
    detail: "Built automated data pipelines and data processing workflows.",
    highlights: [
      "Engineered automated data pipelines and robust processing workflows using Python.",
      "Optimized data infrastructure for visualization and exploratory analysis."
    ],
  },
  {
    kind: "work",
    period: "Dec 2024",
    title: "Freelance Developer",
    org: "Freelance",
    detail: "Designed optimized system prompts for model alignment.",
    highlights: [
      "Engineered and optimized prompts to improve human-AI alignment and system response reliability."
    ],
  },
  {
    kind: "work",
    period: "Apr 2025 — Present",
    title: "Program Analyst Trainee",
    org: "Cognizant",
    detail: "Developing and deploying enterprise client applications.",
    highlights: [
      "Collaborating on enterprise client applications in an agile delivery model, driving development and deployment cycles.",
      "Building robust testing frameworks for API validation and UI automation to ensure system reliability."
    ],
  },
];

// ----------------------------------------------------------------------------
//  Projects — rendered as sticky notes on the board.
//  `color` picks a sticky-note color: yellow | pink | blue | green | orange | purple
// ----------------------------------------------------------------------------

export type Project = {
  name: string;
  date: string;
  blurb: string;
  tags: string[];
  color: "yellow" | "pink" | "blue" | "green" | "orange" | "purple";
  // Replace "#" with the real GitHub URL, e.g. "https://github.com/Vrinda-Vishnoi/repo"
  repo?: string;
  link?: string;
};

export const projects: Project[] = [
  {
    name: "ReconcileFlow – Payment Reconciliation Engine",
    date: "Recent",
    blurb:
      "Built a reconciliation engine with Stripe web-hook idempotency (Redis + Postgres), BullMQ async processing with dead-letter queue recovery, append-only audit logging via Postgres triggers, and a real-time Socket.IO dashboard with chaos-mode fault injection.",
    tags: ["Node.js", "TypeScript", "PostgreSQL", "Redis", "React"],
    color: "blue",
    repo: "#",
    link: "",
  },
  {
    name: "Skyward – 3D Satellite Tracking Physics Engine",
    date: "Recent",
    blurb:
      "Engineered a 60 FPS 3D visualization engine tracking 500+ live satellites by bypassing React reconciliation for direct WebGL memory mutation. Architected an O(1) backend geospatial caching system utilizing Geohash bucketing and MongoDB TTL indexes.",
    tags: ["React", "Three.js", "WebGL", "Node.js", "MongoDB"],
    color: "green",
    repo: "#",
  },
  {
    name: "ConvoConnect – Intelligent Recruitment Platform",
    date: "Recent",
    blurb:
      "Developed a full-stack recruitment platform with an automated candidate scoring system. Integrated NLP APIs for resume parsing and cultural-fit evaluation to streamline the hiring workflow.",
    tags: ["Full Stack", "NLP Integration", "System Design"],
    color: "purple",
    repo: "#",
  }
];

// ----------------------------------------------------------------------------
//  Skills — grouped, rendered as marker-circled clusters.
// ----------------------------------------------------------------------------

export const skillGroups: { label: string; items: string[] }[] = [
  {
    label: "Backend & Systems",
    items: ["Node.js", "Express.js", "webGI", "REST APIs", "System Architecture"],
  },
  {
    label: "Frontend",
    items: ["JavaScript (ES6+)", "TypeScript", "React.js", "HTML5", "CSS3", "Three.js", "Responsive Design"],
  },
  {
    label: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Geohash Bucketing"],
  },
  {
    label: "Programming Languages",
    items: ["JavaScript", "TypeScript", "Python", "Java", "C++", "C", "SQL"],
  },
  {
    label: "Tools & Practices",
    items: ["Git", "GitHub", "Figma", "Postman", "Agile Methodology", "Playwright", "Selenium"],
  },
  {
    label: "AI Integration",
    items: ["OpenAI APIs", "Prompt Engineering", "Agentic AI Concepts", "NLP Basics"],
  },
];

// ----------------------------------------------------------------------------
//  Open source + writing (Using Achievements)
// ----------------------------------------------------------------------------

export const openSource = [
  "The Ultimate MySQL Bootcamp - Udemy",
  "Book Chapter: 'IoT Integrated Cloud and Data Solutions' - CRC Press, Taylor & Francis",
];

export const blogs: { title: string; link?: string }[] = [];
