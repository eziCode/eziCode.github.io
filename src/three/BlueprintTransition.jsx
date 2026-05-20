// BlueprintTransition.jsx — Phase 2 CSS crossfade from 3D to blueprint world
import { useRef, useEffect } from 'react';

export default function BlueprintTransition({ progress, phase, introDone }) {
  // phase2 progress: 0→1 as overall progress goes from 0.68→0.88
  const p2 = Math.max(0, Math.min((progress - 0.68) / 0.20, 1));

  // When the portfolio rises (introDone), the overlay fades to 0 behind it
  // The portfolio's own opacity transition is 0.8s; we match that timing.
  const overlayOpacity = introDone ? 0 : p2;

  // Grid scale: zooming into the blueprint
  const gridPx = 4 + p2 * 24; // 4px → 28px

  // Bracket draw progress (completes at 40% of p2)
  const bracketPct = Math.min(p2 * 2.5, 1);

  const style = {
    position: 'fixed', inset: 0, zIndex: 20,
    pointerEvents: 'none',
    opacity: overlayOpacity,
    transition: introDone ? 'opacity 0.65s cubic-bezier(0.16,1,0.3,1)' : 'none',
    background: '#f4f6f8',
    backgroundImage: `
      linear-gradient(rgba(100,130,180,0.18) 1px, transparent 1px),
      linear-gradient(90deg, rgba(100,130,180,0.18) 1px, transparent 1px)
    `,
    backgroundSize: `${gridPx}px ${gridPx}px`,
  };


  // SVG lines: construction diagonals + corner brackets
  const dim = 100; // viewBox units
  const bracketSize = 5;

  return (
    <div style={style}>
      <svg
        viewBox={`0 0 ${dim} ${dim}`}
        preserveAspectRatio="none"
        style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}
      >
        {/* Corner brackets — drawn via strokeDashoffset */}
        {[
          // top-left
          { d:`M ${bracketSize} 4 L 4 4 L 4 ${bracketSize}` },
          // top-right
          { d:`M ${dim-bracketSize} 4 L ${dim-4} 4 L ${dim-4} ${bracketSize}` },
          // bottom-left
          { d:`M ${bracketSize} ${dim-4} L 4 ${dim-4} L 4 ${dim-bracketSize}` },
          // bottom-right
          { d:`M ${dim-bracketSize} ${dim-4} L ${dim-4} ${dim-4} L ${dim-4} ${dim-bracketSize}` },
        ].map((br, i) => (
          <path
            key={i}
            d={br.d}
            fill="none"
            stroke="rgba(59,107,204,0.7)"
            strokeWidth="0.5"
            strokeDasharray="14"
            strokeDashoffset={14 * (1 - bracketPct)}
          />
        ))}

        {/* Horizontal construction line — traces across center */}
        <line
          x1="0" y1="50" x2={dim * Math.min(p2 * 2, 1)} y2="50"
          stroke="rgba(59,107,204,0.2)" strokeWidth="0.25"
        />
        <line
          x1={dim} y1="50" x2={dim - dim * Math.min(p2 * 2, 1)} y2="50"
          stroke="rgba(59,107,204,0.2)" strokeWidth="0.25"
        />

        {/* Vertical construction line */}
        <line
          x1="50" y1="0" x2="50" y2={dim * Math.min(p2 * 2, 1)}
          stroke="rgba(59,107,204,0.2)" strokeWidth="0.25"
        />

        {/* Crosshair center dot */}
        {p2 > 0.3 && (
          <circle cx="50" cy="50" r="0.8"
            fill="none" stroke="rgba(59,107,204,0.5)" strokeWidth="0.3"
            opacity={Math.min((p2-0.3)/0.2, 1)}
          />
        )}
      </svg>

      {/* Phase identifier fades in near end of transition */}
      {p2 > 0.6 && (
        <div style={{
          position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)',
          fontFamily:"'JetBrains Mono', monospace",
          fontSize:'0.6rem', letterSpacing:'0.18em', textTransform:'uppercase',
          color:'rgba(59,107,204,0.6)',
          opacity: Math.min((p2-0.6)/0.3, 1),
        }}>
          entering blueprint · unit_07
        </div>
      )}
    </div>
  );
}
