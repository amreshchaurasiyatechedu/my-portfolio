import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Film,
  Palette,
  PanelsTopLeft,
  Sparkles,
} from "lucide-react";
import { FaInstagram, FaYoutube } from "react-icons/fa6";
import gsap from "gsap";
import {
  achievementGroups,
  certifications,
  educationHistory,
  experience,
  founderJourney,
  projectGroups,
  roles,
  skillPanels,
  studioConcepts,
  studioServices,
} from "../data/portfolio.js";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";

const serviceIcons = { Film, Instagram: FaInstagram, Youtube: FaYoutube, PanelsTopLeft, Sparkles, Palette };
const HeroScene = lazy(() => import("./HeroScene.jsx"));

function updateTilt(event, maxAngle = 8) {
  if (event.pointerType !== "mouse") return;

  const element = event.currentTarget;
  const bounds = element.getBoundingClientRect();
  const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
  const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));

  element.style.setProperty("--card-tilt-x", `${(0.5 - y) * maxAngle}deg`);
  element.style.setProperty("--card-tilt-y", `${(x - 0.5) * maxAngle}deg`);
  element.style.setProperty("--card-light-x", `${x * 100}%`);
  element.style.setProperty("--card-light-y", `${y * 100}%`);
}

function resetTilt(event) {
  const element = event.currentTarget;
  element.style.setProperty("--card-tilt-x", "0deg");
  element.style.setProperty("--card-tilt-y", "0deg");
  element.style.setProperty("--card-light-x", "50%");
  element.style.setProperty("--card-light-y", "50%");
}

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [sceneVisible, setSceneVisible] = useState(false);
  const reduceMotion = useReducedMotion();
  const heroRef = useRef(null);
  const visualRef = useRef(null);
  const scenePointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (reduceMotion || !heroRef.current) return undefined;

    let animationFrame = 0;
    let introTimeline;
    const context = gsap.context(() => {
      const select = gsap.utils.selector(heroRef);
      introTimeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
      introTimeline
        .fromTo(select(".hero-copy .eyebrow"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.55, clearProps: "transform,opacity,visibility" })
        .fromTo(select(".hero-heading-word"), { autoAlpha: 0, yPercent: 112 }, { autoAlpha: 1, yPercent: 0, duration: 0.82, stagger: 0.12, clearProps: "transform,opacity,visibility" }, "-=0.15")
        .fromTo(select(".hero-subtitle, .role-line, .hero-intro"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.48, stagger: 0.08, clearProps: "transform,opacity,visibility" }, "-=0.34")
        .fromTo(select(".hero-actions .button"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.07, clearProps: "transform,opacity,visibility" }, "-=0.2")
        .fromTo(select(".hero-footnote"), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.4, clearProps: "transform,opacity,visibility" }, "-=0.1")
        .fromTo(select(".portrait-frame"), { autoAlpha: 0, scale: 1.04, clipPath: "inset(10% 0 0 0 round 2px)" }, { autoAlpha: 1, scale: 1, clipPath: "inset(0% 0 0 0 round 2px)", duration: 0.95, clearProps: "transform,clipPath,opacity,visibility" }, 0.15)
        .fromTo(select(".hero-tech-icon"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.1, clearProps: "transform,opacity,visibility" }, "-=0.55");
    }, heroRef);

    animationFrame = window.requestAnimationFrame(() => introTimeline?.play());
    return () => {
      window.cancelAnimationFrame(animationFrame);
      context.revert();
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || !visualRef.current) {
      setSceneVisible(false);
      return undefined;
    }

    if (!("IntersectionObserver" in window)) {
      setSceneVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setSceneVisible(entry.isIntersecting);
    }, { threshold: 0.1 });

    observer.observe(visualRef.current);
    return () => observer.disconnect();
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || !visualRef.current) return undefined;
    const context = gsap.context(() => {
      gsap.to(".orbit-one", { rotation: 360, duration: 90, repeat: -1, ease: "none" });
      gsap.to(".orbit-two", { rotation: -360, duration: 110, repeat: -1, ease: "none" });
    }, visualRef);
    return () => context.revert();
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const interval = window.setInterval(() => {
      setRoleIndex((index) => (index + 1) % roles.length);
    }, 3200);
    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  const handleVisualPointerMove = (event) => {
    if (reduceMotion) return;
    const bounds = visualRef.current?.getBoundingClientRect();
    if (!bounds) return;

    const x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    const y = 1 - ((event.clientY - bounds.top) / bounds.height) * 2;
    scenePointerRef.current.x = x;
    scenePointerRef.current.y = y;
    visualRef.current?.style.setProperty("--parallax-x", `${x * -10}px`);
    visualRef.current?.style.setProperty("--parallax-y", `${y * -10}px`);
    visualRef.current?.style.setProperty("--parallax-x-slow", `${x * -5}px`);
    visualRef.current?.style.setProperty("--parallax-y-slow", `${y * -5}px`);
  };

  const resetVisualPointer = () => {
    scenePointerRef.current.x = 0;
    scenePointerRef.current.y = 0;
    visualRef.current?.style.setProperty("--parallax-x", "0px");
    visualRef.current?.style.setProperty("--parallax-y", "0px");
    visualRef.current?.style.setProperty("--parallax-x-slow", "0px");
    visualRef.current?.style.setProperty("--parallax-y-slow", "0px");
  };

  return (
    <>
      <section className="hero section-wrap" id="home" aria-labelledby="hero-title" ref={heroRef}>
        <Reveal className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> B.Sc. IT student · Ambernath, India</p>
          <h1 id="hero-title">
            <span className="hero-heading-line"><span className="hero-heading-word">Hi, I&apos;m Amresh</span></span>
            <span className="hero-heading-line"><span className="hero-heading-word hero-heading-accent">Chaurasiya.</span></span>
          </h1>
          <h2 className="hero-subtitle">Developer. Creator. Founder.</h2>
          <p className="role-line" aria-label="Professional focus: aspiring full stack developer, AI development enthusiast, software developer, and founder of Click Craft Studio.">
            <span className="role-prefix" aria-hidden="true">Currently</span>
            <span id="animated-role" aria-hidden="true">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={roles[roleIndex]}
                  initial={reduceMotion ? false : { opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -5 }}
                  transition={{ duration: reduceMotion ? 0 : 0.2 }}
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="role-caret" aria-hidden="true" />
          </p>
          <p className="hero-intro">
            I&apos;m a B.Sc. Information Technology student passionate about software development,
            artificial intelligence and creative digital experiences. Alongside my technical journey,
            I founded Click Craft Studio to bring creative ideas to life.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#projects">Explore My Work <ArrowDownRight size={15} aria-hidden="true" /></a>
            <a className="button button-outline" href="#click-craft">About Click Craft Studio <ArrowUpRight size={15} aria-hidden="true" /></a>
            <a className="button button-quiet" href="/assets/Amresh-Chaurasiya-Resume.pdf" download="Amresh-Chaurasiya-Resume.pdf">Download Resume <span aria-hidden="true">↓</span></a>
            <a className="button button-quiet" href="#contact">Contact Me <ArrowDownRight size={15} aria-hidden="true" /></a>
          </div>
          <div className="hero-footnote"><span className="tiny-rule" /> Building Digital Experiences Through Technology, Creativity &amp; Innovation.</div>
        </Reveal>

        <Reveal
          as="div"
          className="hero-visual"
          ref={visualRef}
          aria-label="Amresh Chaurasiya, software developer and founder"
          onPointerMove={handleVisualPointerMove}
          onPointerLeave={resetVisualPointer}
        >
          <div className="hero-scene-wrap" aria-hidden="true">
            {sceneVisible && !reduceMotion && (
              <Suspense fallback={null}>
                <HeroScene pointerRef={scenePointerRef} />
              </Suspense>
            )}
          </div>
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="tech-badge" aria-hidden="true"><span>&lt;/&gt;</span><b>AI / CODE</b></div>
          <div className="hero-tech-icon hero-tech-code" aria-hidden="true"><Code2 size={14} /><span>JS</span></div>
          <div className="hero-tech-icon hero-tech-ai" aria-hidden="true"><BrainCircuit size={14} /><span>AI</span></div>
          <div className="hero-tech-icon hero-tech-ui" aria-hidden="true"><PanelsTopLeft size={14} /><span>UI</span></div>
          <div className="portrait-frame">
            <img src="/assets/amresh-at-work.jpg" alt="Amresh working at a computer" fetchPriority="high" decoding="async" />
            <div className="portrait-shade" />
            <div className="portrait-caption"><span>AMRESH CHAURASIYA</span><b>Curious by nature.<br />Building by choice.</b></div>
          </div>
          <div className="hero-note note-student"><span className="note-icon">✳</span><span><b>B.Sc. Information Technology</b><small>Vedanta College · 2024—2027</small></span></div>
          <div className="hero-note note-founder"><span className="note-icon note-blue">✦</span><span><b>Founder</b><small>Click Craft Studio</small></span></div>
          <div className="visual-index">01 / 04</div>
        </Reveal>
      </section>
      <div className="ticker" aria-label="Software development, AI, creative direction, entrepreneurship">
        <div className="ticker-track" aria-hidden="true">
          {Array.from({ length: 2 }).flatMap((_, index) => [
            <span key={`${index}-software`}>SOFTWARE DEVELOPMENT <i>✳</i></span>,
            <span key={`${index}-ai`}>AI EXPLORATION <i>✳</i></span>,
            <span key={`${index}-creative`}>CREATIVE DIRECTION <i>✳</i></span>,
            <span key={`${index}-entrepreneurship`}>ENTREPRENEURSHIP <i>✳</i></span>,
          ])}
        </div>
      </div>
    </>
  );
}

export function AboutSection() {
  return (
    <section className="about section-wrap section-space" id="about">
      <Reveal className="about-visual">
        <div className="about-photo-glow" />
        <div className="about-photo-frame" data-reveal-image>
          <img src="/assets/amresh-profile.png" alt="Portrait of Amresh Chaurasiya" loading="lazy" decoding="async" />
          <div className="about-photo-caption"><span>AMRESH CHAURASIYA</span><b>Technology, with a<br />creative point of view.</b></div>
        </div>
        <span className="about-photo-index">PROFILE / 01</span>
        <span className="about-photo-mark" aria-hidden="true">AC<span>.</span></span>
      </Reveal>
      <Reveal className="about-content">
        <p className="eyebrow">01 / About me</p>
        <h2 className="about-title">Two sides.<br /><span>One point of view.</span></h2>
        <p className="about-lede">B.Sc. IT student. Aspiring Full Stack Developer. AI enthusiast. Founder of Click Craft Studio.</p>
        <p className="body-copy">
          I&apos;m pursuing a B.Sc. in Information Technology at Vedanta College, affiliated with the
          University of Mumbai. Coursework and personal projects are helping me build a strong
          foundation as I work toward becoming a Full Stack Developer.
        </p>
        <p className="body-copy">
          I&apos;m an AI enthusiast interested in how emerging technologies can support useful digital
          experiences. I also founded Click Craft Studio, a creative services studio focused on
          video editing and social media management. I continue to grow the studio while developing
          my technical and creative skills.
        </p>
        <div className="about-facts">
          <div><span>01</span><b>Education</b><small>B.Sc. Information Technology</small></div>
          <div><span>02</span><b>Technology</b><small>Software, AI &amp; emerging tech</small></div>
          <div><span>03</span><b>Entrepreneurship</b><small>Founder, Click Craft Studio</small></div>
        </div>
        <div className="about-actions">
          <a className="button button-quiet" href="/assets/Amresh-Chaurasiya-Resume.pdf" download="Amresh-Chaurasiya-Resume.pdf">
            Download Resume <span aria-hidden="true">↓</span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}

export function SkillsSection() {
  const [working, learning] = skillPanels;

  return (
    <section className="skills-section section-wrap section-space" id="skills">
      <SectionHeading
        number="02"
        eyebrow="Technical toolkit"
        title="Curiosity, meet"
        highlight="craft."
        description="A growing toolkit shaped by my IT studies and project work. I separate technologies I have used from the AI topics I am currently exploring."
      />
      <div className="skills-panels">
        <Reveal as="article" className="skills-panel">
          <div className="skills-panel-heading"><div><p className="eyebrow">{working.label}</p><h3>{working.title}</h3></div><span className="skills-panel-index">01</span></div>
          <div className="skills-category-grid">
            {working.categories.map(({ title, skills, wide }) => (
              <section className={`skill-category${wide ? " skill-category-wide" : ""}`} key={title}>
                <h4>{title}</h4>
                <div className="skill-tags">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
              </section>
            ))}
          </div>
        </Reveal>
        <Reveal as="article" className="skills-panel skills-panel-learning">
          <div className="skills-panel-heading"><div><p className="eyebrow">{learning.label}</p><h3>{learning.title}</h3></div><span className="skills-panel-index">02</span></div>
          <p className="skills-learning-copy">{learning.description}</p>
          <div className="skill-tags skill-tags-learning">{learning.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
          <div className="skills-learning-note"><span className="blue-dot" /><p>{learning.note}</p></div>
        </Reveal>
      </div>
    </section>
  );
}

function ProjectCard({ project, delay = 0 }) {
  const reduceMotion = useReducedMotion();

  return (
    <Reveal
      as="article"
      className="project-card"
      delay={delay}
      onPointerMove={(event) => {
        if (!reduceMotion) updateTilt(event, 8);
      }}
      onPointerLeave={resetTilt}
    >
      <div className="project-media">
        <img src={project.image} alt={project.alt} loading="lazy" decoding="async" />
        <span className={`project-status ${project.statusClass}`}>{project.status}</span>
      </div>
      <div className="project-content">
        <p className="project-type">{project.type}</p>
        <h3>{project.title}</h3>
        <p className="project-summary">{project.summary}</p>
        <div className="project-detail"><span>Technology</span><p>{project.technology}</p></div>
        <div className="project-detail">
          <span>{project.featureLabel}</span>
          <ul className="project-features">{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
        </div>
        <div className="project-actions">
          {project.links.map((link, index) => link.href ? (
            <a className="project-link" href={link.href} key={link.href} target="_blank" rel="noopener noreferrer">
              {link.label} <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          ) : <span className="project-link-note" key={`${project.title}-note-${index}`}>{link.note}</span>)}
        </div>
      </div>
    </Reveal>
  );
}

export function ProjectsSection() {
  return (
    <section className="projects section-wrap section-space" id="projects">
      <SectionHeading
        number="03"
        eyebrow="Selected projects"
        title="Learning by"
        highlight="making things."
        description="A candid look at what I have built, what is still in progress, and where a public demo or repository is not available."
      />
      {projectGroups.map((group) => (
        <div className={`project-group${group.eyebrow.startsWith("AI") ? " ai-project-group" : ""}`} key={group.eyebrow}>
          <Reveal className="project-group-heading">
            <div><p className="eyebrow">{group.eyebrow}</p><h3>{group.title}</h3></div><span>{group.range}</span>
          </Reveal>
          <div className="project-grid">{group.projects.map((project, index) => <ProjectCard key={project.title} project={project} delay={index * 0.08} />)}</div>
        </div>
      ))}
      <Reveal as="p" className="project-note">
        Project images marked as illustrative are original cover art, not screenshots. Links and completion status are shown only where verified.
      </Reveal>
    </section>
  );
}

function ConceptArtwork({ type }) {
  if (type === "reels") {
    return (
      <div className="reel-shape"><div className="reel-inner"><span>YOUR<br />NEXT<br /><i>BIG IDEA</i></span><b>▶</b><small>01 / REELS STUDY</small></div></div>
    );
  }
  if (type === "motion") {
    return (
      <div className="motion-art"><div className="motion-ring" /><div className="motion-type">MOVE<br /><i>WITH</i><br />MEANING.</div><span className="motion-coordinate">MOTION STUDY / 002</span></div>
    );
  }
  return (
    <div className="social-art"><div className="social-brand">GOOD<br />THINGS<br /><i>TAKE SHAPE.</i></div><span className="social-tag">A SOCIAL CAMPAIGN STUDY</span><div className="social-circle">CCS<br />✳</div></div>
  );
}

function StudioConceptCard({ concept, reduceMotion }) {
  return (
    <article
      className={`concept-card concept-${concept.type}`}
      onPointerMove={(event) => {
        if (!reduceMotion) updateTilt(event, 5);
      }}
      onPointerLeave={resetTilt}
    >
      <span className="concept-stamp">ILLUSTRATIVE CONCEPT</span>
      <ConceptArtwork type={concept.type} />
      <div className="concept-caption"><b>{concept.title}</b><span>{concept.subtitle}</span></div>
    </article>
  );
}

export function StudioSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="studio" id="click-craft">
      <div className="studio-glow" />
      <div className="studio-inner section-wrap">
        <Reveal className="studio-topline"><p className="eyebrow"><span className="blue-dot" /> 04 / The creative side of my journey</p><span className="studio-location">INDEPENDENT CREATIVE STUDIO · AMBERNATH</span></Reveal>
        <Reveal className="studio-heading">
          <div><p className="studio-overline">Founder identity</p><h2>Click Craft<br /><span>Studio.</span></h2></div>
          <div className="studio-intro">
            <div className="studio-brand-stage">
              <div className="studio-brand-orbit studio-brand-orbit-one" aria-hidden="true" />
              <div className="studio-brand-orbit studio-brand-orbit-two" aria-hidden="true" />
              <div className="studio-creative-object studio-object-film" aria-hidden="true"><Film size={19} /><span>EDIT</span></div>
              <div className="studio-creative-object studio-object-design" aria-hidden="true"><Palette size={18} /><span>DESIGN</span></div>
              <div className="studio-creative-object studio-object-motion" aria-hidden="true"><Sparkles size={17} /><span>MOTION</span></div>
              <div className="studio-logo-frame">
                <img src="/assets/click-craft-studio-brand.webp" alt="Click Craft Studio logo and Crafting Content That Clicks tagline" loading="lazy" />
                <span className="studio-logo-shine" aria-hidden="true" />
              </div>
              <div className="studio-edit-timeline" aria-hidden="true">
                <div className="studio-timeline-heading"><span>EDITING TIMELINE</span><span>MOTION STUDY · CONCEPT</span></div>
                <div className="studio-track-row"><span>V1</span><div className="studio-track studio-track-video"><i /><i /><i /></div></div>
                <div className="studio-track-row"><span>A1</span><div className="studio-track studio-track-audio"><i /><i /><i /><i /></div></div>
              </div>
            </div>
            <p>I founded Click Craft Studio to turn creative ideas into digital experiences — helping brands, creators and businesses build a stronger online presence through engaging content and thoughtful creative services.</p>
            <p className="founder-line"><b>Amresh Chaurasiya</b><span>Founder — Click Craft Studio</span></p>
          </div>
        </Reveal>
        <Reveal className="studio-quote">“Turning Creative Ideas<br />Into Digital Experiences.”<span>— THE STUDIO PROMISE</span></Reveal>
        <Reveal className="service-heading"><div><p className="eyebrow">Creative services</p><h3>Ideas, shaped for the feed.</h3></div><p>Creative support for brands, creators and businesses looking to show up with intention.</p></Reveal>
        <div className="service-grid">
          {studioServices.map(({ number, icon, title, description }, index) => {
            const Icon = serviceIcons[icon];
            return (
              <Reveal as="article" className="service-card" key={title} delay={index * 0.07}>
                <span>{number} <i><ArrowUpRight size={13} aria-hidden="true" /></i></span>
                <div className="service-icon"><Icon size={23} strokeWidth={1.6} aria-hidden="true" /></div>
                <h4>{title}</h4><p>{description}</p>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="creative-work">
          <div className="creative-work-heading">
            <div><p className="eyebrow">The creative playground</p><h3>Concepts, not client claims.</h3></div>
            <p>The studio’s live portfolio currently features illustrative placeholders. These visual explorations are labelled concepts—not completed client projects.</p>
          </div>
          <div className="concept-grid">
            {studioConcepts.map((concept) => (
              <StudioConceptCard key={concept.type} concept={concept} reduceMotion={reduceMotion} />
            ))}
          </div>
        </Reveal>
        <Reveal className="studio-cta">
          <div><p className="eyebrow">Have a good idea?</p><h3>Let’s make it<br /><span>click.</span></h3></div>
          <div className="studio-cta-actions">
            <a className="button button-blue" href="https://click-craft-studio.netlify.app/" target="_blank" rel="noopener noreferrer">Explore Click Craft Studio <ArrowUpRight size={15} aria-hidden="true" /></a>
            <a className="button button-studio-outline" href="#contact">Discuss a project <ArrowDownRight size={15} aria-hidden="true" /></a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ExperienceSection() {
  return (
    <section className="journey section-wrap section-space" id="experience">
      <SectionHeading number="05" eyebrow="Experience" title="Building as" highlight="I learn." description="A creative media role at Deva Media alongside my independent founder role at Click Craft Studio." />
      <div className="timeline experience-timeline">
        {experience.map((item) => (
          <Reveal as="article" className="timeline-item experience-timeline-item" key={item.title}>
            <div className="experience-time"><span className="timeline-year">{item.year}</span><span className="experience-duration">{item.duration}</span></div>
            <div className="experience-content">
              <p className="experience-label">{item.label}</p><h3>{item.title}</h3>
              {item.company && <p className="experience-company">{item.company}</p>}
              {item.responsibilities && <div className="experience-responsibilities"><span>Responsibilities</span><ul>{item.responsibilities.map((task) => <li key={task}>{task}</li>)}</ul></div>}
              {item.description && <p className="experience-role-description">{item.description}</p>}
              {item.link && <a className="experience-link" href={item.link.href} target="_blank" rel="noopener noreferrer">{item.link.label} <ArrowUpRight size={13} aria-hidden="true" /></a>}
            </div>
            <span className="timeline-mark" aria-hidden="true">{item.company ? "✳" : "↗"}</span>
          </Reveal>
        ))}
      </div>
      <Reveal className="journey-heading"><p className="eyebrow">The founder journey</p><h3>Small steps, real progress.</h3></Reveal>
      <div className="timeline">
        {founderJourney.map((item, index) => (
          <Reveal as="article" className="timeline-item" key={item.number}>
            <span className="timeline-year">{item.number}</span>
            <div><h3>{item.title}</h3><p>{item.description}</p></div>
            <span className="timeline-mark" aria-hidden="true">{index === founderJourney.length - 1 ? "↗" : "✳"}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function EducationSection() {
  return (
    <section className="education section-wrap section-space" id="education">
      <SectionHeading number="06" eyebrow="Education" title="Grounded in" highlight="learning." description="Building a strong foundation in information technology while exploring where software, AI and creative work can meet." />
      <Reveal as="article" className="education-card">
        <div className="education-mark">EDU<span>.</span></div>
        <div className="education-copy"><p className="eyebrow">2024–2027 · Pursuing</p><h2>B.Sc. Information Technology</h2><p>Vedanta College <span>·</span> Affiliated with the University of Mumbai</p></div>
        <span className="education-status"><i /> Pursuing</span>
      </Reveal>
      <div className="education-history-grid">
        {educationHistory.map((item) => (
          <Reveal as="article" className="education-history-card" key={item.year}>
            <div className="education-history-year">{item.year}</div>
            <div className="education-history-copy"><p className="eyebrow">{item.eyebrow}</p><h3>{item.title}</h3></div>
            <span className="education-score">{item.score}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function CertificationsSection() {
  return (
    <section className="certifications section-wrap section-space" id="certifications">
      <SectionHeading number="07" eyebrow="Certifications" title="Credentials," highlight="earned & verified." description="Deloitte (Forage), TCS and Hunarho credentials shared for display. Certificate images and public verification links were not available in the workspace." />
      <div className="certification-grid">
        {certifications.map(({ provider, kind, monogram, title, tags }) => (
          <Reveal as="article" className="certification-card" key={provider}>
            <div className="certification-card-top"><span className="credential-provider">{provider}</span><span className="credential-kind">{kind}</span></div>
            <span className="credential-monogram" aria-hidden="true">{monogram}</span>
            <h3>{title}</h3>
            {tags && <div className="credential-tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>}
          </Reveal>
        ))}
      </div>
      <p className="credential-note">Credential names are shown as supplied; no certificate files or verification URLs were available to link.</p>
    </section>
  );
}

export function AchievementsSection() {
  return (
    <section className="achievements section-wrap section-space" id="achievements">
      <SectionHeading number="08" eyebrow="Achievements" title="Progress, made" highlight="practical." description="Academic progress, verified project work and an early entrepreneurial milestone — without invented awards or rankings." />
      <div className="achievement-grid">
        {achievementGroups.map(({ label, title, items }) => (
          <Reveal as="article" className="achievement-group" key={label}>
            <div className="achievement-group-heading"><span>{label}</span><h3>{title}</h3></div>
            <div className="achievement-list">
              {items.map((item) => (
                <div className="achievement-item" key={item.title}>
                  <span className={item.date ? "achievement-date" : "achievement-marker"}>{item.date || item.marker}</span>
                  <div>
                    <h4>{item.title}</h4><p>{item.description}</p>
                    {item.link && <a href={item.link.href} target="_blank" rel="noopener noreferrer">{item.link.label} <ArrowUpRight size={12} aria-hidden="true" /></a>}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
