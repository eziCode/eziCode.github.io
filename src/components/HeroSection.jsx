// HeroSection.jsx — Phase 3 hero with animated brackets, construction lines, sequential labels
import { useEffect, useRef } from 'react';

export default function HeroSection({ onContactClick, onResumeClick, compact = false, fillHeight = true }) {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
  }, []);

  return (
    <section style={{
      position:'relative', overflow:'hidden',
      borderBottom: compact ? 'none' : '1px solid var(--border)',
      height: compact && fillHeight ? '100%' : undefined,
    }}>
      {/* Faint blueprint grid */}
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none',
        backgroundImage:`
          linear-gradient(var(--border-faint) 1px, transparent 1px),
          linear-gradient(90deg, var(--border-faint) 1px, transparent 1px)
        `,
        backgroundSize:'28px 28px',
        opacity:0.55,
        animation:'grid-drift 12s linear infinite',
      }} />

      {/* Subtle scan sweep */}
      <div className="scan-sweep" style={{ position:'absolute', inset:0, pointerEvents:'none' }} />

      {/* SVG corner brackets */}
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', overflow:'visible' }}>
        {/* TL */}
        <path d="M 22 8 L 8 8 L 8 22" fill="none" stroke="rgba(59,107,204,0.65)" strokeWidth="1.2"
          strokeDasharray="25" className="bracket-draw" />
        {/* TR */}
        <path d="M calc(100% - 22px) 8 L calc(100% - 8px) 8 L calc(100% - 8px) 22" fill="none" stroke="rgba(59,107,204,0.65)" strokeWidth="1.2"
          strokeDasharray="25" className="bracket-draw" style={{ animationDelay:'0.1s' }} />
        {/* BL */}
        <path d="M 22 calc(100% - 8px) L 8 calc(100% - 8px) L 8 calc(100% - 22px)" fill="none" stroke="rgba(59,107,204,0.65)" strokeWidth="1.2"
          strokeDasharray="25" className="bracket-draw" style={{ animationDelay:'0.2s' }} />
        {/* BR */}
        <path d="M calc(100% - 22px) calc(100% - 8px) L calc(100% - 8px) calc(100% - 8px) L calc(100% - 8px) calc(100% - 22px)" fill="none" stroke="rgba(59,107,204,0.65)" strokeWidth="1.2"
          strokeDasharray="25" className="bracket-draw" style={{ animationDelay:'0.3s' }} />

        {/* Horizontal construction line */}
        <line x1="0" y1="50%" x2="100%" y2="50%"
          stroke="rgba(59,107,204,0.08)" strokeWidth="0.5" className="line-trace" />
      </svg>

      {/* Content */}
      <div style={{
        maxWidth: compact ? '100%' : 960,
        width: compact ? '100%' : undefined,
        margin:'0 auto',
        padding: compact
          ? (fillHeight ? 'clamp(24px, 4vh, 48px) clamp(24px, 4vw, 48px)' : 'clamp(12px, 2vh, 20px) clamp(20px, 3vw, 40px) 0')
          : '72px 24px 64px',
        position:'relative',
        height: compact && fillHeight ? '100%' : undefined,
        display: compact ? 'flex' : undefined,
        flexDirection: compact ? 'column' : undefined,
        justifyContent: compact && fillHeight ? 'center' : undefined,
        flex: compact && fillHeight ? 1 : undefined,
      }}>
        {/* System ID */}
        <p className="anim-cascade" style={{
          fontFamily:"'JetBrains Mono',monospace",
          fontSize: compact ? 'clamp(0.7rem, 1.2vmin, 0.85rem)' : '0.62rem',
          letterSpacing:'0.16em', textTransform:'uppercase',
          color:'var(--accent)', marginBottom: compact ? 'clamp(16px, 2.5vh, 24px)' : 20,
          animationDelay:'0.1s',
        }}>
          unit_07 · online
        </p>

        {/* Name */}
        <h1 className="anim-cascade" style={{
          fontFamily:"'Inter',sans-serif",
          fontSize: compact
            ? (fillHeight ? 'clamp(2.2rem, 6vmin, 3.6rem)' : 'clamp(1.6rem, 4.5vmin, 2.4rem)')
            : 'clamp(2rem,5vw,3.2rem)',
          fontWeight:300,
          letterSpacing:'-0.02em', color:'var(--text-primary)',
          lineHeight:1.15, marginBottom: compact ? 'clamp(12px, 2vh, 20px)' : 16,
          animationDelay:'0.22s',
        }}>
          Ezra Akresh
        </h1>

        {/* Disciplines */}
        <p className="anim-cascade" style={{
          fontFamily:"'JetBrains Mono',monospace",
          fontSize: compact ? 'clamp(0.95rem, 1.8vmin, 1.15rem)' : '0.95rem',
          color:'var(--text-muted)',
          marginBottom: compact ? 'clamp(16px, 2.5vh, 24px)' : 22,
          letterSpacing:'0.02em',
          animationDelay:'0.34s',
        }}>
          <span style={{ color:'var(--accent)', marginRight:7 }}>//</span>
          software engineering · machine learning · robotics · mobile dev
        </p>

        {/* Bio */}
        <p className="anim-cascade" style={{
          fontSize: compact ? 'clamp(0.95rem, 1.8vmin, 1.15rem)' : '0.88rem',
          color:'var(--text-muted)',
          maxWidth: compact ? 'min(720px, 90%)' : 560,
          lineHeight:1.8,
          marginBottom: compact ? 'clamp(24px, 4vh, 40px)' : 36,
          animationDelay:'0.46s',
        }}>
          CS student at Georgia Tech building systems at the intersection of applied ML,
          full-stack engineering, and computer vision. Currently researching robotic
          manipulation pipelines at the PAIR Lab.
        </p>

        {/* CTAs */}
        <div className="anim-cascade" style={{ display:'flex', gap:12, flexWrap:'wrap', animationDelay:'0.58s' }}>
          <a href="/ezra_akresh_resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline" data-hover>
            View Résumé
          </a>
          <button className="btn-outline" onClick={onContactClick} data-hover>
            Get in Touch
          </button>
        </div>

        {/* Dimension label — inline when skills section follows below */}
        <p style={{
          fontFamily:"'JetBrains Mono',monospace",
          fontSize: compact ? '0.58rem' : '0.56rem',
          letterSpacing:'0.12em',
          color:'rgba(59,107,204,0.35)',
          userSelect:'none',
          marginTop: compact && !fillHeight ? 16 : 0,
          ...(compact && fillHeight ? {
            position:'absolute', bottom:12, right:24, marginTop:0,
          } : {}),
        }}>
          georgia institute of technology · cs · 2028
        </p>
      </div>
    </section>
  );
}
