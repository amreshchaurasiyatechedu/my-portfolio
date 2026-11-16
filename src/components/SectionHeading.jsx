import Reveal from "./Reveal.jsx";

export default function SectionHeading({ number, eyebrow, title, highlight, description, className = "" }) {
  return (
    <Reveal className={`section-heading section-heading-row ${className}`.trim()}>
      <div>
        <p className="eyebrow">{number ? `${number} / ` : ""}{eyebrow}</p>
        <h2>{title}<br /><span>{highlight}</span></h2>
      </div>
      {description && <p className="body-copy">{description}</p>}
    </Reveal>
  );
}
