import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navigation } from "../data/portfolio.js";

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = navigation
      .map(({ href }) => document.querySelector(href))
      .filter(Boolean);

    if (!("IntersectionObserver" in window)) return undefined;

    const observer = new IntersectionObserver((entries) => {
      const activeEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (activeEntry) setActiveSection(activeEntry.target.id);
    }, { rootMargin: "-24% 0px -64% 0px", threshold: [0, 0.1, 0.3, 0.6] });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);
    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);

  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <>
      <div className="topline">
        <span>SOFTWARE · AI · CREATIVE ENTREPRENEURSHIP</span>
        <a href="#click-craft">Founder, Click Craft Studio <span aria-hidden="true">↗</span></a>
      </div>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Amresh Chaurasiya home">AC<span>.</span></a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls="primary-nav"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="menu-label">{isOpen ? "Close" : "Menu"}</span>
          {isOpen ? <X size={17} aria-hidden="true" /> : <Menu size={17} aria-hidden="true" />}
        </button>
        <nav
          className={`primary-nav${isOpen ? " is-open" : ""}`}
          id="primary-nav"
          aria-label="Main navigation"
          onClick={(event) => {
            if (event.target.closest('a[href^="#"]')) setIsOpen(false);
          }}
        >
          {navigation.map(({ label, href, cta }) => (
            <a
              className={cta ? "nav-cta" : undefined}
              href={href}
              key={href}
              aria-current={activeSection === href.slice(1) ? "location" : undefined}
            >
              {label}{cta && <span aria-hidden="true">↗</span>}
            </a>
          ))}
        </nav>
      </header>
    </>
  );
}
