// ProjectCard.jsx — project card with diagnostic hover overlay
import { useState } from 'react';

export default function ProjectCard({ tag, title, description, technologies, githubLink, demoLink, index, compact = false, dense = false }) {
  const [hovered, setHovered] = useState(false);
  // Stable "coordinates" per card
  const cx = (index * 173 % 800).toFixed(1);
  const cy = (index * 251 % 600).toFixed(1);

  return (
    <div
      className={`project-card${dense ? ' project-card-dense' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-hover
      style={{
        padding: dense ? '8px 10px 10px' : compact ? '12px 14px 14px' : '20px 20px 22px',
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column',
        height: compact && !dense ? '100%' : undefined,
      }}
    >
      {/* Category tag */}
      <span className="tag-pill" style={{ display:'inline-block', marginBottom: dense ? 4 : compact ? 6 : 12 }}>
        {tag}
      </span>

      {/* Diagnostic overlay — appears on hover */}
      {hovered && (
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:2 }}>
          {/* Reticle corners */}
          {[
            { top:6, left:6, borderWidth:'1px 0 0 1px' },
            { top:6, right:6, borderWidth:'1px 1px 0 0' },
            { bottom:6, left:6, borderWidth:'0 0 1px 1px' },
            { bottom:6, right:6, borderWidth:'0 1px 1px 0' },
          ].map((s,i) => (
            <div key={i} style={{
              position:'absolute', width:10, height:10,
              borderStyle:'solid', borderColor:'var(--accent)',
              borderRadius:0, opacity:0.75,
              ...s,
            }} />
          ))}
          {/* Coordinate readout */}
          <div style={{
            position:'absolute', top:8, right:16,
            fontFamily:"'JetBrains Mono',monospace",
            fontSize:'0.52rem', letterSpacing:'0.08em',
            color:'rgba(59,107,204,0.55)',
          }}>
            x:{cx} · y:{cy}
          </div>
          {/* Measurement tick — bottom */}
          <div style={{
            position:'absolute', bottom:0, left:0, right:0, height:1,
            background:'linear-gradient(90deg, transparent, var(--accent) 30%, var(--accent) 70%, transparent)',
            opacity:0.5,
          }} />
        </div>
      )}

      {/* Title */}
      <h3 style={{
        fontSize: dense ? '0.72rem' : compact ? 'clamp(0.85rem, 1.5vmin, 1rem)' : '0.92rem',
        fontWeight:500, color:'var(--text-primary)',
        marginBottom: dense ? 3 : compact ? 4 : 7, lineHeight:1.35, position:'relative', zIndex:1,
        transition:'color 0.15s ease',
        ...(hovered ? { color:'var(--accent-dim)' } : {}),
      }}>
        {title}
      </h3>

      {/* Description */}
      <p style={{
        fontSize: dense ? '0.62rem' : compact ? 'clamp(0.72rem, 1.25vmin, 0.85rem)' : '0.78rem',
        color:'var(--text-muted)',
        lineHeight:1.45, marginBottom: dense ? 6 : compact ? 8 : 16, position:'relative', zIndex:1,
        flex: compact && !dense ? 1 : undefined,
        overflow: (compact || dense) ? 'hidden' : undefined,
        display: (compact || dense) ? '-webkit-box' : undefined,
        WebkitLineClamp: dense ? 2 : compact ? 3 : undefined,
        WebkitBoxOrient: (compact || dense) ? 'vertical' : undefined,
      }}>
        {description}
      </p>

      {/* Tech pills */}
      <div style={{ display:'flex', flexWrap:'wrap', gap: dense ? 3 : 4, marginBottom: dense ? 6 : compact ? 8 : 18, position:'relative', zIndex:1 }}>
        {technologies.map(t => (
          <span key={t} className="skill-pill">{t}</span>
        ))}
      </div>

      {/* Links */}
      {(githubLink || demoLink) && (
        <div style={{ display:'flex', gap: dense ? 4 : 8, position:'relative', zIndex:1, flexWrap:'wrap' }}>
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={dense ? 'btn-outline btn-outline-sm' : 'btn-outline'}
              data-hover
            >
              GitHub ↗
            </a>
          )}
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className={dense ? 'btn-outline btn-outline-sm' : 'btn-outline'}
              data-hover
            >
              Demo ↗
            </a>
          )}
        </div>
      )}
    </div>
  );
}
