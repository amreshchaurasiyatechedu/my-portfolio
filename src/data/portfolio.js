export const navigation = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Click Craft Studio", href: "#click-craft" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Certifications", href: "#certifications" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact", cta: true },
];

export const roles = [
  "Aspiring Full Stack Developer",
  "AI Development Enthusiast",
  "Software Developer",
  "Founder of Click Craft Studio",
];

export const skillPanels = [
  {
    label: "Working knowledge",
    title: "Used in projects & coursework",
    categories: [
      { title: "Programming", skills: ["Java", "Python", "JavaScript"] },
      { title: "Frontend", skills: ["HTML", "CSS", "React"] },
      { title: "Backend", skills: ["Node.js", "Express.js"] },
      { title: "Databases", skills: ["MySQL", "MongoDB"] },
      { title: "Tools", skills: ["Git", "GitHub", "VS Code"], wide: true },
    ],
  },
  {
    label: "Currently learning",
    title: "AI & development",
    description: "Building familiarity with AI-powered applications and the ideas behind modern information tools.",
    skills: ["Gemini API", "AI Application Development", "RAG Concepts"],
    note: "These are active learning areas, not claims of production expertise.",
  },
];

export const projectGroups = [
  {
    eyebrow: "Built & learning projects",
    title: "From coursework to the web.",
    range: "01 — 05",
    projects: [
      {
        image: "/assets/project-yaari-product.jpg",
        alt: "Plaid shirt product image used by the YAARI FITS clothing store",
        status: "FULL-STACK BUILD · NO HOSTED DEMO",
        statusClass: "status-work",
        type: "E-COMMERCE · FULL STACK",
        title: "YAARI FITS — Clothing E-Commerce",
        summary: "A full-stack men’s clothing store. The project documentation describes catalog, account, cart, checkout and admin workflows; it has no verified public deployment.",
        technology: "React · Vite · Node.js · Express · MongoDB",
        featureLabel: "Features",
        features: ["Product catalog with clothing variants", "Cart, wishlist and order flows", "Admin product and order management"],
        links: [
          { label: "Private GitHub repo", href: "https://github.com/amreshchaurasiyatechedu/clothing-ecommerce-website" },
          { note: "No live demo verified" },
        ],
      },
      {
        image: "/assets/project-storefront-product.png",
        alt: "Yellow shirt product image from the clothing storefront project",
        status: "LIVE STOREFRONT PROTOTYPE",
        statusClass: "status-live",
        type: "WEB · STOREFRONT",
        title: "Clothing Storefront",
        summary: "A separate HTML, CSS and JavaScript storefront prototype with local browser storage. The current live URL opens at its sign-in screen.",
        technology: "HTML · CSS · JavaScript · LocalStorage",
        featureLabel: "Features",
        features: ["Product catalog and shopping cart", "Sign-in, profile and order screens", "Admin product and order views"],
        links: [
          { label: "Public GitHub repo", href: "https://github.com/amreshchaurasiyatechedu/Clothing-Web" },
          { label: "Live demo", href: "https://clothing-web-omega.vercel.app/" },
        ],
      },
      {
        image: "/assets/project-student.svg",
        alt: "Illustrative cover art for the student management project, not an application screenshot",
        status: "BETA · LEARNING PROJECT",
        statusClass: "status-learning",
        type: "EDUCATION · DJANGO",
        title: "Student Management System",
        summary: "A customized Django learning project for managing student and academic workflows. The source README describes it as a beta project.",
        technology: "Python · Django",
        featureLabel: "Features",
        features: ["Administrator, staff and student roles", "Student, course and subject management", "Attendance, results and leave workflows"],
        links: [
          { note: "GitHub repository unavailable" },
          { label: "YouTube demo", href: "https://www.youtube.com/watch?v=kArCR96m7uo" },
        ],
      },
      {
        image: "/assets/project-calculator.svg",
        alt: "Illustrative calculator project cover, not an application screenshot",
        status: "PUBLIC REPOSITORY",
        statusClass: "status-work",
        type: "WEB APP · PWA",
        title: "Modern Scientific Calculator",
        summary: "A responsive browser calculator with standard and scientific operations, keyboard input and installable offline support.",
        technology: "HTML · CSS · JavaScript · math.js",
        featureLabel: "Features",
        features: ["Scientific calculations and memory", "History, themes and keyboard controls", "Progressive web app with offline support"],
        links: [
          { label: "GitHub repository", href: "https://github.com/amreshchaurasiyatechedu/Modern-Scientific-Calculator" },
          { note: "No live demo verified" },
        ],
      },
      {
        image: "/assets/project-portfolio.svg",
        alt: "Illustrative cover art for the personal portfolio redesign, not a live-site screenshot",
        status: "REDESIGN IN PROGRESS",
        statusClass: "status-work",
        type: "PERSONAL BRAND · WEB",
        title: "Personal Portfolio Website",
        summary: "This workspace contains the current portfolio redesign. The linked public repository is the existing site source; this redesign has not been published there yet.",
        technology: "React · Vite · Tailwind CSS · Framer Motion · GSAP · Lucide React · React Icons",
        featureLabel: "Features",
        features: ["Responsive personal brand website", "Developer, AI learner and founder profiles", "Project and Click Craft Studio showcases"],
        links: [
          { label: "Existing GitHub repo", href: "https://github.com/amreshchaurasiyatechedu/amreshchaurasiyatechedu.github.io" },
          { note: "Redesign not yet published" },
        ],
      },
    ],
  },
  {
    eyebrow: "AI projects & explorations",
    title: "Experiments, prototypes & plans.",
    range: "06 — 08",
    projects: [
      {
        image: "/assets/project-truthlens.svg",
        alt: "Illustrative cover art for the TruthLens AI research prototype, not an application screenshot",
        status: "RESEARCH PROTOTYPE",
        statusClass: "status-prototype",
        type: "AI · EVIDENCE REVIEW",
        title: "TruthLens AI",
        summary: "A prototype for evidence-first claim investigation that retrieves sources and separates evidence from optional AI interpretation.",
        technology: "React · TypeScript · Node.js · Express · MongoDB",
        featureLabel: "Features",
        features: ["Claim and article URL investigation", "Source retrieval and evidence-linked results", "Optional AI analysis requires provider setup"],
        links: [
          { label: "Private GitHub repo", href: "https://github.com/amreshchaurasiyatechedu/truthlens-ai" },
          { note: "No live demo verified" },
        ],
      },
      {
        image: "/assets/project-dreamer.svg",
        alt: "Illustrative cover art for Dreamer AI, not a screenshot of the working application",
        status: "WORKING APP · NOT HOSTED",
        statusClass: "status-prototype",
        type: "AI · VIDEO CAPTIONING",
        title: "Dreamer AI",
        summary: "A working video-captioning application in development. Its README documents local transcription and export workflows; it is not a hosted production SaaS.",
        technology: "React · TypeScript · Python · FastAPI · Faster-Whisper · FFmpeg",
        featureLabel: "Features",
        features: ["Video transcription and timed caption editing", "Caption styling with synchronized preview", "SRT and MP4 export"],
        links: [
          { label: "Private GitHub repo", href: "https://github.com/amreshchaurasiyatechedu/Dreamer-AI" },
          { note: "No live demo verified" },
        ],
      },
      {
        image: "/assets/project-rag.svg",
        alt: "Illustrative concept cover for a planned enterprise RAG platform, not a product screenshot",
        status: "PLANNED · NOT BUILT",
        statusClass: "status-planned",
        type: "AI · FUTURE EXPLORATION",
        title: "Enterprise RAG Intelligence Platform",
        summary: "A planned exploration of retrieval-augmented generation for enterprise knowledge workflows. This is an idea, not a completed or active product.",
        technology: "Not selected",
        featureLabel: "Planned focus",
        features: ["Enterprise knowledge retrieval", "Grounded responses with source context", "Scope and implementation still to be defined"],
        links: [{ note: "No repository published" }, { note: "No demo available" }],
      },
    ],
  },
];

export const studioServices = [
  { number: "01", icon: "Film", title: "Video Editing", description: "Thoughtful edits that bring the footage, story and details together." },
  { number: "02", icon: "Instagram", title: "Instagram Reels Editing", description: "Short-form storytelling designed to feel at home in the scroll." },
  { number: "03", icon: "Youtube", title: "YouTube Video Editing", description: "Long-form video editing shaped around your message and audience." },
  { number: "04", icon: "PanelsTopLeft", title: "Social Media Management", description: "Practical creative support for a thoughtful, consistent presence." },
  { number: "05", icon: "Sparkles", title: "Motion Graphics", description: "Titles, transitions and movement that add character to your content." },
  { number: "06", icon: "Palette", title: "Graphic Design", description: "Social-first visual assets with clarity, character and purpose." },
];

export const studioConcepts = [
  { type: "reels", title: "Short-form story", subtitle: "Reels editing · Concept" },
  { type: "motion", title: "Motion in focus", subtitle: "Motion graphics · Concept" },
  { type: "social", title: "Social-first visual", subtitle: "Graphic design · Concept" },
];

export const experience = [
  {
    year: "2026",
    duration: "2 months",
    label: "PROFESSIONAL EXPERIENCE",
    title: "Graphics Designer & Video Editor",
    company: "Deva Media",
    responsibilities: ["Graphic design", "Video editing"],
  },
  {
    year: "2026–Present",
    duration: "Founder",
    label: "CREATIVE ENTREPRENEURSHIP · INDEPENDENT",
    title: "Founder — Click Craft Studio",
    description: "Founded Click Craft Studio, a creative digital services initiative focused on video editing, social media management, motion graphics and graphic design.",
    link: { label: "Explore the studio", href: "https://click-craft-studio.netlify.app/" },
  },
];

export const founderJourney = [
  {
    number: "01",
    title: "Building the foundation",
    description: "Started developing technical and creative skills, with a curiosity for how digital things are made.",
  },
  {
    number: "02",
    title: "Finding a creative rhythm",
    description: "Developed an interest in video editing and digital content — a different way to tell stories and communicate ideas.",
  },
  {
    number: "03",
    title: "Starting Click Craft Studio",
    description: "Founded a creative digital services studio to help brands, creators and businesses with their online presence.",
  },
  {
    number: "NOW",
    title: "Growing, one project at a time",
    description: "Working on growing the studio while continuing to develop my technical and professional skills.",
  },
];

export const educationHistory = [
  { year: "2024", eyebrow: "Higher Secondary Certificate", title: "HSC — Commerce", score: "64%" },
  { year: "2022", eyebrow: "Secondary School Certificate", title: "SSC", score: "86%" },
];

export const certifications = [
  { provider: "Deloitte · Forage", kind: "Job simulation", monogram: "DA", title: "Data Analytics Job Simulation" },
  { provider: "TCS", kind: "Skills training", monogram: "TCS", title: "Soft Skills, Communication & Interview Skills" },
  { provider: "Hunarho", kind: "Learning certificates", monogram: "H", title: "Completed learning areas", tags: ["NLP", "Git & GitHub", "DevOps", "Data Science Basics"] },
];

export const achievementGroups = [
  {
    label: "01 / EDUCATION",
    title: "Academic milestones",
    items: [
      { date: "2022", title: "SSC completed", description: "86%" },
      { date: "2024", title: "HSC · Commerce", description: "64%" },
      { date: "IN PROGRESS", title: "B.Sc. Information Technology", description: "Vedanta College · 2024–2027" },
    ],
  },
  {
    label: "02 / TECHNICAL PROJECTS",
    title: "Built & explored",
    items: [
      { marker: "01", title: "Modern Scientific Calculator", description: "Public project repository", link: { label: "View repository", href: "https://github.com/amreshchaurasiyatechedu/Modern-Scientific-Calculator" } },
      { marker: "02", title: "Student Management System", description: "Django learning project · demo video available", link: { label: "Watch demo", href: "https://www.youtube.com/watch?v=kArCR96m7uo" } },
      { marker: "03", title: "Dreamer AI", description: "Working captioning app prototype · not hosted" },
    ],
  },
  {
    label: "03 / ENTREPRENEURSHIP",
    title: "Starting Click Craft Studio",
    items: [
      { date: "2026", title: "Founded Click Craft Studio", description: "An independent creative digital services initiative." },
      { marker: "FOCUS", title: "Defined the studio’s service focus", description: "Video editing, social media management, motion graphics and graphic design.", link: { label: "Explore the studio", href: "https://click-craft-studio.netlify.app/" } },
    ],
  },
];
