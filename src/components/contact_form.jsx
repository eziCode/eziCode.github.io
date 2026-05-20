import { useState } from "react";
import emailjs from "emailjs-com";

export default function ContactForm({ onClose }) {
  const [showThankYou, setShowThankYou] = useState(false);
  const [showInvalidEmail, setShowInvalidEmail] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [formValues, setFormValues] = useState({ name: "", email: "", message: "" });

  async function verifyEmailExists(email) {
    const res = await fetch(
      `https://emailvalidation.abstractapi.com/v1/?api_key=906c36552d45415a9fc4b6af455ce62c&email=${encodeURIComponent(email)}`
    );
    const data = await res.json();
    return data.deliverability === "DELIVERABLE";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    setFormValues({ name, email, message });
    if (!name || !email || !message) return;
    setCheckingEmail(true);
    const exists = await verifyEmailExists(email);
    if (!exists) { setShowInvalidEmail(true); setCheckingEmail(false); return; }
    setShowThankYou(true);
    emailjs.sendForm('service_0wysh5j', 'template_h9sydqm', form, 'zuhuIQYigjI5aytn4')
      .then(() => emailjs.send('service_0wysh5j', 'template_mfq1l17', { email, name }, 'zuhuIQYigjI5aytn4')
        .then(() => onClose()));
  }

  if (showThankYou) {
    return (
      <div style={{ padding: "48px 32px", textAlign: "center" }}>
        <div style={{
          width: 40, height: 40, border: "1px solid var(--accent)", borderRadius: 2,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px", color: "var(--accent)",
        }}>
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase",
          color: "var(--accent)", marginBottom: 8,
        }}>
          message sent
        </p>
        <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
          You'll be redirected shortly.
        </p>
      </div>
    );
  }

  if (showInvalidEmail) {
    return (
      <div style={{ padding: "48px 32px", textAlign: "center" }}>
        <div style={{
          width: 40, height: 40, border: "1px solid var(--border)", borderRadius: 2,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px", color: "var(--text-muted)",
        }}>
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase",
          color: "var(--text-muted)", marginBottom: 8,
        }}>
          invalid address
        </p>
        <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: 24 }}>
          That email address does not appear to be deliverable. Please re-enter.
        </p>
        <button className="btn-outline" onClick={() => setShowInvalidEmail(false)}>
          Return to Form
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "32px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase",
            color: "var(--text-faint)", marginBottom: 4,
          }}>
            send_message
          </p>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 500, color: "var(--text-primary)" }}>
            Get in Touch
          </h3>
        </div>
        <button
          onClick={onClose}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "var(--text-faint)", fontSize: "1.1rem", lineHeight: 1,
            padding: "2px 4px",
          }}
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <label style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase",
            color: "var(--text-faint)", display: "block", marginBottom: 5,
          }}>Name</label>
          <input
            name="name"
            placeholder="Your name"
            required
            className="field-input"
            value={formValues.name}
            onChange={e => setFormValues({ ...formValues, name: e.target.value })}
          />
        </div>

        <div>
          <label style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase",
            color: "var(--text-faint)", display: "block", marginBottom: 5,
          }}>Email</label>
          <input
            name="email"
            type="email"
            placeholder="your@email.com"
            required
            className="field-input"
            value={formValues.email}
            onChange={e => setFormValues({ ...formValues, email: e.target.value })}
          />
        </div>

        <div>
          <label style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase",
            color: "var(--text-faint)", display: "block", marginBottom: 5,
          }}>Message</label>
          <textarea
            name="message"
            placeholder="Your message..."
            required
            rows={5}
            className="field-input"
            style={{ resize: "vertical" }}
            value={formValues.message}
            onChange={e => setFormValues({ ...formValues, message: e.target.value })}
          />
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <button
            type="submit"
            disabled={checkingEmail}
            className="btn-outline"
            style={{
              flex: 1, textAlign: "center",
              opacity: checkingEmail ? 0.5 : 1,
              cursor: checkingEmail ? "not-allowed" : "pointer",
            }}
          >
            {checkingEmail ? "Verifying..." : "Send Message"}
          </button>
          <button type="button" onClick={onClose} className="btn-outline">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
