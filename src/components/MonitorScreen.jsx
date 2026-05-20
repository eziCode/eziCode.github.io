import MonitorBlueprint from './MonitorBlueprint';
import { MONITOR_FOCUS_THRESHOLD, portfolioReveal } from '@/three/scrollConstants';

export default function MonitorScreen({ progress, children }) {
  const focused = progress >= MONITOR_FOCUS_THRESHOLD;
  const reveal = portfolioReveal(progress);

  return (
    <div
      className="monitor-screen"
      onWheel={(e) => e.stopPropagation()}
    >
      <div
        className="monitor-screen-blueprint"
        style={{
          opacity: focused ? 0 : 1,
          transition: focused ? 'opacity 0.35s ease' : 'none',
        }}
      >
        <MonitorBlueprint progress={progress} />
      </div>

      {focused && (
        <div
          className="monitor-screen-content"
          style={{
            opacity: reveal,
            transition: 'opacity 0.4s ease',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
