// Cursor.jsx — engineering reticle cursor
import { useRef, useEffect } from 'react';

export default function Cursor() {
  const dotRef   = useRef();
  const ringRef  = useRef();
  const coordRef = useRef();
  const pos      = useRef({ x: -100, y: -100 });
  const ring     = useRef({ x: -100, y: -100 });
  const isHover  = useRef(false);

  useEffect(() => {
    let raf;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (coordRef.current) {
        coordRef.current.textContent = `${e.clientX.toString().padStart(4,'0')} · ${e.clientY.toString().padStart(4,'0')}`;
      }
    };

    const onEnter = () => { isHover.current = true; };
    const onLeave = () => { isHover.current = false; };

    document.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    const tick = () => {
      // Increased tracking speed (0.14 -> 0.45) for tighter follow
      ring.current.x += (pos.current.x - ring.current.x) * 0.45;
      ring.current.y += (pos.current.y - ring.current.y) * 0.45;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px,${pos.current.y}px)`;
      }
      if (ringRef.current) {
        const scale = isHover.current ? 0.65 : 1;
        ringRef.current.style.transform = `translate(${ring.current.x}px,${ring.current.y}px) scale(${scale})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const crossLen = 10;

  return (
    <>
      {/* Crosshair dot */}
      <div ref={dotRef} style={{
        position:'fixed', top:0, left:0, zIndex:9999, pointerEvents:'none',
        transform:'translate(-100px,-100px)',
        willChange:'transform',
      }}>
        {/* Center cross */}
        <div style={{ position:'absolute', top:-crossLen/2, left:-0.5, width:1, height:crossLen, background:'rgba(59,107,204,0.8)' }} />
        <div style={{ position:'absolute', top:-0.5, left:-crossLen/2, width:crossLen, height:1, background:'rgba(59,107,204,0.8)' }} />
      </div>

      {/* Lagging ring */}
      <div ref={ringRef} style={{
        position:'fixed', top:0, left:0, zIndex:9998, pointerEvents:'none',
        transform:'translate(-100px,-100px)',
        willChange:'transform',
        transition:'transform 0s, scale 0.18s ease',
      }}>
        <div style={{
          position:'absolute', top:-12, left:-12,
          width:24, height:24,
          border:'1px solid rgba(59,107,204,0.45)',
          borderRadius:'50%',
        }} />
        {/* Corner ticks */}
        {[[-12,-12,4,0],[-12,-12,0,4],[12,-12,-4,0],[12,-12,0,4],
          [-12,12,4,0],[-12,12,0,-4],[12,12,-4,0],[12,12,0,-4]].map(([x,y,w,h],i) => (
          <div key={i} style={{
            position:'absolute',
            top:y, left:x,
            width: w||1, height: h||1,
            background:'rgba(59,107,204,0.55)',
          }} />
        ))}

        {/* Coordinate readout */}
        <div ref={coordRef} style={{
          position:'absolute', top:16, left:16,
          fontFamily:"'JetBrains Mono', monospace",
          fontSize:'0.55rem', letterSpacing:'0.05em',
          color:'rgba(59,107,204,0.55)',
          whiteSpace:'nowrap',
        }} />
      </div>
    </>
  );
}
