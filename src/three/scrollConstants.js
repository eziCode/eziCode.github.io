// Shared scroll thresholds for the workstation → monitor → portfolio flow
export const MONITOR_ZOOM_START = 0.55;
export const BLUEPRINT_OVERLAY_START = 0.88;
export const MONITOR_FOCUS_THRESHOLD = 0.98;
export const MONITOR_INTERACTIVE_THRESHOLD = 0.99;

/** Fade-in for portfolio content after the monitor is in focus (0 → 1). */
export function portfolioReveal(progress) {
  if (progress < MONITOR_FOCUS_THRESHOLD) return 0;
  return Math.min((progress - MONITOR_FOCUS_THRESHOLD) / (1 - MONITOR_FOCUS_THRESHOLD), 1);
}

/** Opacity for the fullscreen blueprint backdrop during late zoom (0 → 1). */
export function blueprintBackdropOpacity(progress) {
  if (progress < BLUEPRINT_OVERLAY_START) return 0;
  if (progress >= MONITOR_FOCUS_THRESHOLD) return 0;
  return Math.min((progress - BLUEPRINT_OVERLAY_START) / (MONITOR_FOCUS_THRESHOLD - BLUEPRINT_OVERLAY_START), 1);
}
