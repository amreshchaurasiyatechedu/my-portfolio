import { ArrowUpRight } from "lucide-react";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import ContactForm from "./ContactForm.jsx";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";

const personalLinks = [
  { label: "Email", value: "amreshchaurasiya.tech.edu@gmail.com", href: "mailto:amreshchaurasiya.tech.edu@gmail.com", Icon: FaEnvelope },
  { label: "GitHub", value: "amreshchaurasiyatechedu", href: "https://github.com/amreshchaurasiyatechedu", Icon: FaGithub },
  { label: "LinkedIn", value: "View profile", href: "https://www.linkedin.com/in/amresh-chaurasiya", Icon: FaLinkedin },
];

const businessServices = ["Video editing", "Social media management", "Graphic design", "Motion graphics"];

export default function ContactSection() {
  return (
    <section className="contact section-wrap" id="contact">
      <SectionHeading
        number="09"
        eyebrow="Contact"
        title="Good things start"
        highlight="with a hello."
        description="Choose the right path for a professional conversation or a Click Craft Studio business inquiry."
        className="contact-heading"
      />
      <div className="contact-layout">
        <div className="contact-pathways">
          <Reveal as="article" className="contact-pathway contact-personal">
            <div className="contact-pathway-heading"><p className="eyebrow">Personal / Professional</p><span>01</span></div>
            <h3>Opportunities &amp; collaboration.</h3>
            <p className="contact-pathway-copy">For internship opportunities, technical collaborations and professional conversations.</p>
            <ul className="contact-channel-list">
              {personalLinks.map(({ label, value, href, Icon }) => (
                <li key={label}>
                  <span>{label}</span>
                  <a className="inline-flex min-w-0 items-center gap-2" href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}>
                    <Icon className="shrink-0" size={13} aria-hidden="true" /><span className="min-w-0">{value}</span>
                    {!href.startsWith("mailto:") && <ArrowUpRight className="contact-arrow" size={12} aria-hidden="true" />}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal as="article" className="contact-pathway contact-business">
            <div className="contact-pathway-heading"><p className="eyebrow">Click Craft Studio · Business</p><span>02</span></div>
            <h3>Creative work, made to connect.</h3>
            <p className="contact-pathway-copy">For project inquiries about:</p>
            <ul className="contact-service-list">{businessServices.map((service) => <li key={service}>{service}</li>)}</ul>
            <a className="contact-pathway-link" href="#contact-form">Start a business inquiry <span aria-hidden="true">↘</span></a>
          </Reveal>
        </div>
        <Reveal className="contact-form-reveal">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
