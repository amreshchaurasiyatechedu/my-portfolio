import Reveal from "./Reveal.jsx";

export default function SectionHeading({ number, eyebrow, title, highlight, description, className = "" }) {
  return (
    <Reveal className={`section-heading section-heading-row ${className}`.trim()}>
      <div>
        <p className="eyebrow">{number ? `${number} / ` : ""}{eyebrow}</p>
        <h2><span className="heading-mask-line">{title}</span><br /><span className="heading-mask-line heading-mask-accent" data-reveal-mask>{highlight}</span></h2>
      </div>
      {description && <p className="body-copy">{description}</p>}
    </Reveal>
  );
}
