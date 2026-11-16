import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const recipient = "amreshchaurasiya.tech.edu@gmail.com";
const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim() || "";

export default function ContactForm() {
  const [status, setStatus] = useState({ message: "", state: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    if (!endpoint) {
      const query = new URLSearchParams({
        subject: `Portfolio inquiry: ${formData.get("inquiry_type")}`,
        body: [
          `Name: ${formData.get("name")}`,
          `Email: ${formData.get("_replyto")}`,
          `Inquiry: ${formData.get("inquiry_type")}`,
          "",
          String(formData.get("message") || ""),
        ].join("\n"),
      });
      setStatus({ message: "Form delivery is not configured yet. Your email app should open with this message.", state: "info" });
      window.location.href = `mailto:${recipient}?${query.toString()}`;
      return;
    }

    setIsSubmitting(true);
    setStatus({ message: "Sending your inquiry…", state: "info" });

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (!response.ok) {
        setStatus({ message: `The message could not be sent (HTTP ${response.status}). Please try emailing me directly.`, state: "error" });
        return;
      }

      form.reset();
      setStatus({ message: "Thanks — your inquiry has been sent.", state: "success" });
    } catch (error) {
      console.error("Formspree submission failed.", error);
      setStatus({ message: "The message could not be sent right now. Please try emailing me directly.", state: "error" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="contact-form"
      id="contact-form"
      action={endpoint}
      method="POST"
      aria-describedby="contact-form-note"
      onSubmit={handleSubmit}
    >
      <div className="contact-form-heading">
        <p className="eyebrow">Send an inquiry</p>
        <p>Share a little context and I’ll get back to you by email.</p>
      </div>
      <input type="hidden" name="_subject" value="Portfolio inquiry — Amresh Chaurasiya" />
      <input className="contact-honeypot" type="text" name="_gotcha" tabIndex="-1" autoComplete="off" aria-hidden="true" />
      <div className="contact-field-row">
        <label className="contact-field" htmlFor="contact-name">Name
          <input id="contact-name" type="text" name="name" autoComplete="name" minLength="2" maxLength="100" required />
        </label>
        <label className="contact-field" htmlFor="contact-email">Email
          <input id="contact-email" type="email" name="_replyto" autoComplete="email" maxLength="254" required />
        </label>
      </div>
      <label className="contact-field" htmlFor="contact-inquiry">Inquiry type
        <select id="contact-inquiry" name="inquiry_type" required defaultValue="">
          <option value="" disabled>Choose a topic</option>
          <optgroup label="Personal / professional">
            <option value="Internship opportunity">Internship opportunity</option>
            <option value="Professional collaboration">Professional collaboration</option>
          </optgroup>
          <optgroup label="Click Craft Studio">
            <option value="Video editing">Video editing</option>
            <option value="Social media management">Social media management</option>
            <option value="Graphic design">Graphic design</option>
            <option value="Motion graphics">Motion graphics</option>
          </optgroup>
        </select>
      </label>
      <label className="contact-field" htmlFor="contact-message">Message
        <textarea id="contact-message" name="message" rows="5" minLength="20" maxLength="2000" placeholder="Tell me what you're looking for (at least 20 characters)." required />
      </label>
      <div className="contact-form-footer">
        <p className="contact-form-note" id="contact-form-note">Please don’t include passwords or other sensitive information.</p>
        <button className="button button-white contact-submit" type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
          {isSubmitting ? "Sending…" : "Send inquiry"} <ArrowUpRight size={15} aria-hidden="true" />
        </button>
      </div>
      <p id="contact-form-status" className="contact-form-status" data-state={status.state} role="status" aria-live="polite">{status.message}</p>
    </form>
  );
}
