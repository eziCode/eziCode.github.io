import { useRef, useEffect, useState } from 'react';
import { useScrollPhase } from '@/three/useScrollPhase';
import WorkstationScene from '@/three/WorkstationScene';
import Cursor from '@/components/Cursor';
import HeroSection from '@/components/HeroSection';
import ProjectCard from '@/components/ProjectCard';
import ContactForm from '@/components/contact_form';
import MonitorOverlay from '@/components/MonitorOverlay';
import { MONITOR_FOCUS_THRESHOLD } from '@/three/scrollConstants';

/* ── Data ── */
const projects = [
  {
    tag:'full-stack',
    title:'YouTube Creator Assistant',
    description:'AI-powered platform for analytics, comment management, automated Shorts generation, and thumbnail creation.',
    technologies:['React.js','MongoDB','GCP','Express','OpenAI API','ffmpeg'],
    githubLink:'https://github.com/eziCode/youtube-creator-assistant',
    demoLink:'https://www.engageaiatl.tech/',
  },
  {
    tag:'mobile',
    title:'Localite',
    description:'Location-aware event discovery app with smart filtering, real-time ranking, and secure group sharing.',
    technologies:['React Native','Expo','Supabase','PostgreSQL'],
    githubLink:'https://github.com/eziCode/Localite',
  },
  {
    tag:'ml / data',
    title:'John Deere Tractor Remaining Life Model',
    description:'XGBoost regression model (R² 0.93) predicting tractor RUL — integrated into a live operations dashboard.',
    technologies:['Python','XGBoost','Pandas','Scikit-learn'],
    githubLink:'https://github.com/eziCode/John-Deere-Tractor-Remaining-Life-ML-Model',
  },
  {
    tag:'cloud / voice',
    title:'Alexa Skill: Medical Tracker',
    description:'Voice-driven medical logging via Alexa with DynamoDB persistence and automated SES email delivery.',
    technologies:['AWS','JavaScript','DynamoDB','SES','Alexa Skills Kit'],
    githubLink:'https://github.com/eziCode/Medical-Activity-Tracker',
  },
  {
    tag:'algorithms',
    title:'Wolfram Summer Research 2024',
    description:'Recursive backtracking algorithm for maximal word-grid generation — Featured Contributor, 6k+ views.',
    technologies:['Wolfram Language','Algorithms','Computational Linguistics'],
    demoLink:'https://community.wolfram.com/groups/-/m/t/3214394',
  },
];

const experiences = [
  {
    title:'Research Assistant',
    company:'PAIR Lab',
    location:'Georgia Tech · On-site',
    period:'Nov 2025 – Present',
    description:'Building a computer vision pipeline that automatically segments and clusters objects in complex scenes using SAM, DINOv2, and depth estimation.',
    technologies:['Python','Computer Vision','SAM','DINOv2'],
  },
  {
    title:'Software Engineer Intern',
    company:'Cravr',
    location:'Atlanta, GA · Hybrid',
    period:'Oct 2025 – Present',
    description:'Developed interactive mini-games to support users during craving events, boosting the app to 10k+ downloads and 2.5k+ paid subscribers.',
    technologies:['Swift'],
  },
  {
    title:'Data Analyst Intern',
    company:'PowerWorld Corporation',
    location:'Champaign, IL · On-site',
    period:'May 2024 – Aug 2025',
    description:'Designed SQL database for ~100M power-system records; built a Natural Language → SQL interface and revamped technical documentation.',
    technologies:['Python','C++','SQL'],
  },
  {
    title:'Lead Programmer',
    company:'FRC Team 4096',
    location:'Champaign, IL',
    period:'Dec 2023 – May 2025',
    description:'Led a 3-person coding team for competitive robotics, overhauled onboarding documentation, and mentored newer students in Python.',
    technologies:['Python'],
  },
];

const skills = [
  'Python','Java','Swift','C++','SQL','React Native','Supabase','MongoDB',
  'PostgreSQL','DynamoDB','Amazon Web Services','Google Cloud Platform','Mathematica (Wolfram)',
];

const CURRENT_YEAR = new Date().getFullYear();

/* Portfolio UI shown on the monitor when scroll completes */
function PortfolioContent({ onBackToWorkstation }) {
  const [activeTab, setActiveTab] = useState('about');
  const [showContact, setShowContact] = useState(false);

  const tabs = ['about', 'projects', 'experience'];

  return (
    <div className="monitor-portfolio">
      <nav className="monitor-nav">
        <span className="monitor-nav-title">Ezra Akresh</span>
        <div className="monitor-nav-tabs">
          {tabs.map(t => (
            <button
              key={t}
              data-hover
              className={`nav-link${activeTab === t ? ' active' : ''}`}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </nav>

      <div className="monitor-body">
        {activeTab === 'about' && (
          <div className="monitor-about monitor-scroll anim-cascade">
            <HeroSection
              onContactClick={() => setShowContact(true)}
              compact
              fillHeight={false}
            />
            <div className="monitor-about-skills">
              <p className="section-label">Skills &amp; Tools</p>
              <div className="monitor-skills-inline">
                {skills.map(s => (
                  <span key={s} className="skill-pill">{s}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="monitor-tab monitor-scroll anim-cascade">
            <p className="section-label">Featured Projects</p>
            <div className="monitor-project-grid">
              {projects.map((p, i) => (
                <ProjectCard key={p.title} {...p} index={i} compact dense />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="monitor-tab monitor-scroll anim-cascade">
            <p className="section-label">Work Experience</p>
            <div className="monitor-exp-list">
              {experiences.map((e, i) => (
                <div key={i} className="exp-card monitor-exp-card">
                  <div className="monitor-exp-header">
                    <div>
                      <h3>{e.title}</h3>
                      <p className="monitor-exp-company">{e.company} · {e.location}</p>
                    </div>
                    <span className="monitor-exp-period">{e.period}</span>
                  </div>
                  <p className="monitor-exp-desc">{e.description}</p>
                  <div className="monitor-exp-techs">
                    {e.technologies.map(t => <span key={t} className="skill-pill">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="monitor-footer">
        <div className="monitor-footer-top">
          <button
            type="button"
            className="monitor-back-btn"
            data-hover
            onClick={onBackToWorkstation}
          >
            ← Back to workstation
          </button>
        </div>
        <div className="monitor-footer-inner">
          <div className="monitor-footer-status">
            <span className="pulse-dot" />
            <span>available for work</span>
          </div>
          <a href="mailto:ezraakresh@gatech.edu" data-hover>ezraakresh@gatech.edu</a>
        </div>
        <p className="monitor-footer-legal">
          © {CURRENT_YEAR} Ezra Akresh. All rights reserved. · Portfolio design and content owned by Ezra Akresh.
        </p>
      </footer>

      {showContact && (
        <div className="monitor-modal-backdrop" onClick={() => setShowContact(false)}>
          <div className="monitor-modal" onClick={e => e.stopPropagation()}>
            <ContactForm onClose={() => setShowContact(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Root App ──
   The entire experience lives inside the 3D scene.
   The scroll proxy (500vh) drives the camera bidirectionally.
   No Phase 3 DOM overlay — the portfolio is shown on the monitor screen.
*/
export default function App() {
  const { progress, snapToMonitor, snapToStart } = useScrollPhase();
  const progressRef  = useRef(progress);
  const [showHint, setShowHint] = useState(false);

  // Keep a mutable ref in sync for useFrame reads
  useEffect(() => { progressRef.current = progress; }, [progress]);

  // Show the "View Portfolio" button 2s after load
  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 2000);
    return () => clearTimeout(t);
  }, []);

  const zoomed = progress >= MONITOR_FOCUS_THRESHOLD;
  const hintVisible = progress < 0.01;

  return (
    <div style={{ cursor:'none' }}>
      <Cursor />

      {/* Scroll proxy — 500vh creates the scroll distance for the animation */}
      <div style={{ height:'500vh', pointerEvents:'none' }} aria-hidden />

      {/* Fixed 3D canvas */}
      <div style={{
        position:'fixed', inset:0, zIndex:10,
        opacity: progress >= MONITOR_FOCUS_THRESHOLD ? 0 : 1,
        transition: progress >= MONITOR_FOCUS_THRESHOLD ? 'opacity 0.4s ease' : 'none',
        pointerEvents: progress >= MONITOR_FOCUS_THRESHOLD ? 'none' : 'auto',
      }}>
        <WorkstationScene progressRef={progressRef} />
      </div>

      {!zoomed && (
        <div className={`workstation-scroll-hint${hintVisible ? ' workstation-scroll-hint--visible' : ' workstation-scroll-hint--hidden'}`}>
          <span className="workstation-scroll-hint__arrow" />
          Scroll down
        </div>
      )}

      {/* Portfolio fills the viewport when the monitor is in focus */}
      <MonitorOverlay progress={progress}>
        <PortfolioContent onBackToWorkstation={snapToStart} />
      </MonitorOverlay>

      {/* “View Portfolio” button — jumps to monitor zoom */}
      {showHint && !zoomed && (
        <button
          onClick={snapToMonitor}
          data-hover
          style={{
            position:'fixed', bottom:32, right:32, zIndex:100,
            background:'transparent',
            border:'1px solid rgba(160,180,210,0.35)',
            borderRadius:2, padding:'7px 16px',
            fontFamily:"'JetBrains Mono',monospace",
            fontSize:'0.62rem', letterSpacing:'0.12em', textTransform:'uppercase',
            color:'rgba(160,185,215,0.65)',
            cursor:'none',
            transition:'border-color 0.18s, color 0.18s, opacity 0.4s',
            opacity: showHint ? 1 : 0,
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(160,180,210,0.8)'; e.currentTarget.style.color='rgba(210,225,245,0.95)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(160,180,210,0.35)'; e.currentTarget.style.color='rgba(160,185,215,0.65)'; }}
        >
          View Portfolio →
        </button>
      )}

    </div>
  );
}
