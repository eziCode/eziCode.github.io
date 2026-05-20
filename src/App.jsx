import { useState, useEffect } from "react";
import ContactForm from "@/components/contact_form";

/* ── Data ── */
const projects = [
  {
    tag: "full-stack",
    title: "YouTube Creator Assistant",
    description: "AI-powered platform for analytics, comment management, Shorts generation, and thumbnails.",
    technologies: ["React.js", "MongoDB", "GCP", "Express", "OpenAI API", "ffmpeg"],
    githubLink: "https://github.com/eziCode/youtube-creator-assistant",
    demoLink: "https://www.engageaiatl.tech/",
  },
  {
    tag: "mobile",
    title: "Localite",
    description: "Location-aware event discovery app with smart filtering, real-time ranking, and group sharing.",
    technologies: ["React Native", "Expo", "Supabase", "PostgreSQL"],
    githubLink: "https://github.com/eziCode/Localite",
  },
  {
    tag: "ml / data",
    title: "John Deere Tractor Remaining Life Model",
    description: "XGBoost regression model predicting tractor RUL; R² 0.93, integrated into a live dashboard.",
    technologies: ["Python", "XGBoost", "Pandas", "Scikit-learn"],
    githubLink: "https://github.com/eziCode/John-Deere-Tractor-Remaining-Life-ML-Model",
  },
  {
    tag: "cloud / voice",
    title: "Alexa Skill: Medical Tracker",
    description: "Voice-driven medical logging via Alexa with DynamoDB persistence and SES email delivery.",
    technologies: ["AWS", "JavaScript", "DynamoDB", "SES", "Alexa Skills Kit"],
    githubLink: "https://github.com/eziCode/Medical-Activity-Tracker",
  },
  {
    tag: "algorithms",
    title: "Wolfram Summer Research 2024",
    description: "Recursive backtracking algorithm for maximal word-grid generation; Featured Contributor, 6k+ views.",
    technologies: ["Wolfram Language", "Algorithms", "Computational Linguistics"],
    demoLink: "https://community.wolfram.com/groups/-/m/t/3214394",
  },
];

const experiences = [
  {
    title: "Research Assistant",
    company: "PAIR Lab",
    location: "Georgia Tech · On-site",
    period: "Nov 2025 – Present",
    description: "Built a CV pipeline that segments and clusters objects in complex scenes using SAM, DINOv2, and depth estimation.",
    technologies: ["Python", "Computer Vision", "SAM", "DINOv2"],
  },
  {
    title: "Software Engineer Intern",
    company: "Cravr",
    location: "Atlanta, GA · Hybrid",
    period: "Oct 2025 – Present",
    description: "Developed interactive mini-games for craving management; boosted app to 10k+ downloads and 2.5k+ paid subscribers.",
    technologies: ["Swift"],
  },
  {
    title: "Data Analyst Intern",
    company: "PowerWorld Corporation",
    location: "Champaign, IL · On-site",
    period: "May 2024 – Aug 2025",
    description: "Designed SQL database for ~100M power-system records; built NL→SQL interface and revamped technical documentation.",
    technologies: ["Python", "C++", "SQL"],
  },
  {
    title: "Lead Programmer",
    company: "FRC Team 4096",
    location: "Champaign, IL",
    period: "Dec 2023 – May 2025",
    description: "Led a 3-person coding team for competitive robotics; overhauled onboarding docs and mentored newer students.",
    technologies: ["Python"],
  },
];

const skills = [
  "Python", "JavaScript", "Swift", "C++", "SQL", "Kotlin",
  "React.js", "React Native", "Express", "Supabase", "MongoDB",
  "PostgreSQL", "DynamoDB", "XGBoost", "Scikit-learn",
  "SAM", "DINOv2", "AWS", "GCP", "ffmpeg", "Wolfram Language",
];

/* ── Component ── */
export default function HomePage() {
  const [activeTab, setActiveTab] = useState("projects");
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showContact ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showContact]);

  const tabs = [
    { id: "projects",    label: "Projects" },
    { id: "experience",  label: "Experience" },
    { id: "skills",      label: "Skills" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text-primary)" }}>

      {/* ── Nav ── */}
      <nav style={{
        borderBottom: "1px solid var(--border)",
        background: "var(--bg)",
        position: "sticky", top: 0, zIndex: 40,
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between", height: 52 }}>
          {/* Name */}
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.72rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--text-primary)",
            fontWeight: 500,
          }}>
            Ezra Akresh
          </span>
          {/* Links */}
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {tabs.map(t => (
              <button
                key={t.id}
                className={`nav-link${activeTab === t.id ? " active" : ""}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.label}
              </button>
            ))}
            <button
              className="nav-link"
              onClick={() => setShowContact(true)}
            >
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ position: "relative", overflow: "hidden", borderBottom: "1px solid var(--border)" }}>
        {/* grid */}
        <div className="blueprint-grid" style={{
          position: "absolute", inset: 0, opacity: 0.5, pointerEvents: "none",
        }} />
        {/* brackets */}
        <div className="corner-bracket corner-bracket-tl" />
        <div className="corner-bracket corner-bracket-tr" />
        <div className="corner-bracket corner-bracket-bl" />
        <div className="corner-bracket corner-bracket-br" />

        <div style={{ maxWidth: 960, margin: "0 auto", padding: "72px 24px 64px", position: "relative" }}>
          {/* unit label */}
          <p className="animate-fade-up" style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: 20,
          }}>
            unit_07 · online
          </p>

          {/* Name */}
          <h1 className="animate-fade-up delay-100" style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 300,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            lineHeight: 1.2,
            marginBottom: 14,
          }}>
            Ezra Akresh
          </h1>

          {/* Disciplines */}
          <p className="animate-fade-up delay-200" style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.8rem",
            color: "var(--text-muted)",
            marginBottom: 20,
            letterSpacing: "0.01em",
          }}>
            <span style={{ color: "var(--accent)", marginRight: 6 }}>//</span>
            software engineering · machine learning · robotics · mobile dev
          </p>

          {/* Bio */}
          <p className="animate-fade-up delay-300" style={{
            fontSize: "0.9rem",
            color: "var(--text-muted)",
            maxWidth: 560,
            lineHeight: 1.75,
            marginBottom: 32,
          }}>
            CS student at Georgia Tech building systems at the intersection of applied ML,
            full-stack engineering, and computer vision. Currently researching robotic manipulation
            at the PAIR Lab.
          </p>

          {/* CTA */}
          <div className="animate-fade-up delay-300" style={{ display: "flex", gap: 12 }}>
            <a href="/ezra_akresh_resume.pdf" download className="btn-outline">
              Download Résumé
            </a>
            <button className="btn-outline" onClick={() => setShowContact(true)}>
              Get in Touch
            </button>
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <main style={{ maxWidth: 960, margin: "0 auto", padding: "56px 24px 80px" }}>

        {/* Projects */}
        {activeTab === "projects" && (
          <div>
            <p className="section-label">Featured Projects</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
              {projects.map((p, i) => (
                <div key={i} className="project-card" style={{ padding: "20px 20px 22px" }}>
                  {/* tag */}
                  <span className="tag-pill" style={{ marginBottom: 12, display: "inline-block" }}>
                    {p.tag}
                  </span>
                  {/* title */}
                  <h3 style={{
                    fontSize: "0.92rem",
                    fontWeight: 500,
                    color: "var(--text-primary)",
                    marginBottom: 6,
                    lineHeight: 1.35,
                  }}>
                    {p.title}
                  </h3>
                  {/* description */}
                  <p style={{
                    fontSize: "0.78rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.6,
                    marginBottom: 16,
                  }}>
                    {p.description}
                  </p>
                  {/* tech row */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 18 }}>
                    {p.technologies.map(t => (
                      <span key={t} className="skill-pill">{t}</span>
                    ))}
                  </div>
                  {/* links */}
                  <div style={{ display: "flex", gap: 8 }}>
                    {p.githubLink && (
                      <a href={p.githubLink} target="_blank" rel="noopener noreferrer" className="btn-outline">
                        GitHub ↗
                      </a>
                    )}
                    {p.demoLink && (
                      <a href={p.demoLink} target="_blank" rel="noopener noreferrer" className="btn-outline">
                        Demo ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {activeTab === "experience" && (
          <div>
            <p className="section-label">Work Experience</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {experiences.map((e, i) => (
                <div key={i} className="exp-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
                    <div>
                      <h3 style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--text-primary)", marginBottom: 2 }}>
                        {e.title}
                      </h3>
                      <p style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.72rem",
                        color: "var(--accent)",
                        letterSpacing: "0.04em",
                      }}>
                        {e.company} · {e.location}
                      </p>
                    </div>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.65rem",
                      color: "var(--text-faint)",
                      letterSpacing: "0.05em",
                      whiteSpace: "nowrap",
                    }}>
                      {e.period}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.65, marginBottom: 12 }}>
                    {e.description}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {e.technologies.map(t => (
                      <span key={t} className="skill-pill">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {activeTab === "skills" && (
          <div>
            <p className="section-label">Skills &amp; Tools</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {skills.map(s => (
                <span key={s} className="skill-pill">{s}</span>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer style={{
        borderTop: "1px solid var(--border)",
        background: "var(--surface)",
        padding: "14px 24px",
      }}>
        <div style={{
          maxWidth: 960, margin: "0 auto",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 8,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="pulse-dot" />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
              color: "var(--text-muted)",
            }}>
              available for work
            </span>
          </div>
          <a
            href="mailto:ezraakresh@gatech.edu"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.05em",
              color: "var(--text-muted)",
              textDecoration: "none",
            }}
          >
            ezraakresh@gatech.edu
          </a>
        </div>
      </footer>

      {/* ── Contact Modal ── */}
      {showContact && (
        <div
          style={{
            position: "fixed", inset: 0,
            background: "rgba(26,32,48,0.45)",
            backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 50, padding: 24,
          }}
          onClick={() => setShowContact(false)}
        >
          <div
            style={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: 3,
              maxWidth: 480,
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            onClick={e => e.stopPropagation()}
          >
            <ContactForm onClose={() => setShowContact(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
