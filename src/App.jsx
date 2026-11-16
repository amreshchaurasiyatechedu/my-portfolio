import { AboutSection, AchievementsSection, CertificationsSection, EducationSection, ExperienceSection, HeroSection, ProjectsSection, SkillsSection, StudioSection } from "./components/PortfolioSections.jsx";
import ContactSection from "./components/ContactSection.jsx";
import Footer from "./components/Footer.jsx";
import SiteHeader from "./components/SiteHeader.jsx";
import AmbientBackground from "./components/AmbientBackground.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";

export default function App() {
  return (
    <div className="portfolio-app min-h-screen">
      <AmbientBackground />
      <ScrollProgress />
      <a className="skip-link focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300" href="#main">Skip to content</a>
      <SiteHeader />
      <main id="main">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <StudioSection />
        <ExperienceSection />
        <EducationSection />
        <CertificationsSection />
        <AchievementsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
