import { MONITOR_ZOOM_START } from '@/three/scrollConstants';

// Blueprint placeholder shown on the monitor during scroll (before portfolio focus)
export default function MonitorBlueprint({ progress }) {
  const p2 = Math.max(0, Math.min((progress - MONITOR_ZOOM_START) / (1 - MONITOR_ZOOM_START), 1));
  const bracketPct = Math.min(p2 * 2.5, 1);
  const gridPx = 4 + p2 * 20;

  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#f4f6f8',
      backgroundImage: `
        linear-gradient(rgba(100,130,180,0.18) 1px, transparent 1px),
        linear-gradient(90deg, rgba(100,130,180,0.18) 1px, transparent 1px)
      `,
      backgroundSize: `${gridPx}px ${gridPx}px`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        {[
          { d: 'M 5 4 L 4 4 L 4 5' },
          { d: 'M 95 4 L 96 4 L 96 5' },
          { d: 'M 5 96 L 4 96 L 4 95' },
          { d: 'M 95 96 L 96 96 L 96 95' },
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
        <line
          x1="0" y1="50" x2={100 * Math.min(p2 * 2, 1)} y2="50"
          stroke="rgba(59,107,204,0.2)" strokeWidth="0.25"
        />
        <line
          x1="100" y1="50" x2={100 - 100 * Math.min(p2 * 2, 1)} y2="50"
          stroke="rgba(59,107,204,0.2)" strokeWidth="0.25"
        />
        <line
          x1="50" y1="0" x2="50" y2={100 * Math.min(p2 * 2, 1)}
          stroke="rgba(59,107,204,0.2)" strokeWidth="0.25"
        />
        {p2 > 0.3 && (
          <circle
            cx="50" cy="50" r="0.8"
            fill="none" stroke="rgba(59,107,204,0.5)" strokeWidth="0.3"
            opacity={Math.min((p2 - 0.3) / 0.2, 1)}
          />
        )}
      </svg>

      {p2 > 0.5 && (
        <div style={{
          position: 'absolute', bottom: '8%', left: '50%', transform: 'translateX(-50%)',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 'clamp(0.45rem, 1.2vw, 0.6rem)',
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'rgba(59,107,204,0.55)',
          opacity: Math.min((p2 - 0.5) / 0.35, 1),
          whiteSpace: 'nowrap',
        }}>
          calibrating viewport · unit_07
        </div>
      )}
    </div>
  );
}
