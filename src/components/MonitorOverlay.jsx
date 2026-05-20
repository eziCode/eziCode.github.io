import { createPortal } from 'react-dom';
import MonitorBlueprint from './MonitorBlueprint';
import {
  BLUEPRINT_OVERLAY_START,
  MONITOR_FOCUS_THRESHOLD,
  MONITOR_INTERACTIVE_THRESHOLD,
  blueprintBackdropOpacity,
  portfolioReveal,
} from '@/three/scrollConstants';

export default function MonitorOverlay({ progress, children }) {
  if (progress < BLUEPRINT_OVERLAY_START) return null;

  const backdropOpacity = blueprintBackdropOpacity(progress);
  const reveal = portfolioReveal(progress);
  const showPortfolio = progress >= MONITOR_FOCUS_THRESHOLD;

  return createPortal(
    <div
      className="monitor-fullscreen-overlay"
      style={{
        background: '#f4f6f8',
        pointerEvents: progress >= MONITOR_INTERACTIVE_THRESHOLD ? 'auto' : 'none',
      }}
    >
      {/* Blueprint lines only — visible while zooming in, before portfolio focus */}
      {backdropOpacity > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: backdropOpacity,
            transition: showPortfolio ? 'opacity 0.35s ease' : 'none',
            pointerEvents: 'none',
          }}
        >
          <MonitorBlueprint progress={progress} />
        </div>
      )}

      {/* Portfolio — only after the monitor is fully in frame */}
      {showPortfolio && (
        <div
          className="monitor-portfolio-layer"
          style={{
            opacity: reveal,
            transition: 'opacity 0.45s ease',
          }}
        >
          {children}
        </div>
      )}
    </div>,
    document.body,
  );
}
