// textures.js — generates all canvas-based textures for the 3D scene
import * as THREE from 'three';

/* ── Blueprint sheet ── */
export function createBlueprintTexture() {
  const W = 1024, H = 724;
  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d');

  // Paper base
  ctx.fillStyle = '#e6ecf3';
  ctx.fillRect(0, 0, W, H);

  // Fine grid
  const drawGrid = (step, color, lw) => {
    ctx.strokeStyle = color; ctx.lineWidth = lw;
    for (let x = 0; x < W; x += step) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
    for (let y = 0; y < H; y += step) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
  };
  drawGrid(20, 'rgba(90,120,175,0.22)', 0.5);
  drawGrid(100,'rgba(70,100,160,0.38)', 0.8);

  // Helper
  const line = (x1,y1,x2,y2) => { ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke(); };

  // ── Robotic arm schematic ──
  ctx.strokeStyle = 'rgba(35,75,150,0.85)';
  ctx.lineWidth = 1.4;
  const ox = 390, oy = 340;

  // Base
  ctx.beginPath(); ctx.arc(ox, oy, 38, 0, Math.PI*2); ctx.stroke();
  ctx.beginPath(); ctx.arc(ox, oy, 14, 0, Math.PI*2); ctx.stroke();
  line(ox-38,oy-4, ox-55,oy-4); line(ox-38,oy+4, ox-55,oy+4);

  // Segment 1
  ctx.beginPath();
  ctx.moveTo(ox+38,oy-6); ctx.lineTo(ox+155,oy-28);
  ctx.lineTo(ox+155,oy-14); ctx.lineTo(ox+38,oy+6);
  ctx.closePath(); ctx.stroke();
  ctx.beginPath(); ctx.arc(ox+155,oy-21, 17, 0, Math.PI*2); ctx.stroke();
  ctx.beginPath(); ctx.arc(ox+155,oy-21, 6, 0, Math.PI*2); ctx.stroke();

  // Segment 2
  ctx.beginPath();
  ctx.moveTo(ox+172,oy-28); ctx.lineTo(ox+275,oy-58);
  ctx.lineTo(ox+275,oy-46); ctx.lineTo(ox+172,oy-14);
  ctx.closePath(); ctx.stroke();
  ctx.beginPath(); ctx.arc(ox+275,oy-52, 12, 0, Math.PI*2); ctx.stroke();

  // Gripper
  line(ox+287,oy-58, ox+308,oy-66);
  line(ox+287,oy-46, ox+308,oy-38);
  ctx.beginPath(); ctx.arc(ox+287,oy-52, 4, 0, Math.PI*2); ctx.stroke();

  // ── Dimension lines ──
  ctx.strokeStyle = 'rgba(50,90,170,0.5)';
  ctx.lineWidth = 0.8;
  ctx.setLineDash([4,4]);
  line(ox, oy+68, ox+275, oy+68);
  ctx.setLineDash([]);
  line(ox,   oy+63, ox,   oy+73);
  line(ox+275,oy+63,ox+275,oy+73);
  line(ox-3, oy-38, ox-3, oy+68);

  // Callout labels
  ctx.fillStyle = 'rgba(35,70,145,0.82)';
  ctx.font = '10px "Courier New", monospace';
  ctx.fillText('280.0 mm', ox+100, oy+84);
  ctx.fillText('∅76.0', ox-78, oy+4);

  // Annotations
  ctx.font = '9px "Courier New", monospace';
  ctx.fillText('VISION_MODULE · REV_3', ox-30, oy-115);
  ctx.fillText('DOF: 6   PAYLOAD: 0.8kg', ox-30, oy-103);

  // ── Title block ──
  ctx.strokeStyle = 'rgba(40,80,150,0.7)';
  ctx.lineWidth = 1;
  ctx.strokeRect(640,608,360,96);
  line(640,630,1000,630); line(640,652,1000,652); line(640,672,1000,672);
  ctx.font = 'bold 10px "Courier New", monospace';
  ctx.fillText('ROBOTIC ARM ASSEMBLY — TOP VIEW', 650, 623);
  ctx.font = '8.5px "Courier New", monospace';
  ctx.fillText('DWG NO:  RA-2024-07-B', 650, 645);
  ctx.fillText('SCALE:   1:5   UNIT: mm', 650, 663);
  ctx.fillText('ORBITAL ROBOTICS DIVISION', 650, 681);
  ctx.fillText('PROTOTYPE_B · unit_07', 650, 697);

  // ── Corner registration marks ──
  [[22,22],[W-22,22],[22,H-22],[W-22,H-22]].forEach(([x,y]) => {
    ctx.strokeStyle = 'rgba(40,80,150,0.65)';
    ctx.lineWidth = 0.8;
    line(x-10,y,x+10,y); line(x,y-10,x,y+10);
    ctx.beginPath(); ctx.arc(x,y,4,0,Math.PI*2); ctx.stroke();
  });

  // Small serial text
  ctx.fillStyle = 'rgba(40,80,150,0.5)';
  ctx.font = '8px "Courier New", monospace';
  ctx.fillText('unit_07', 36, 40);
  ctx.fillText('orbital robotics division', 36, 54);
  ctx.fillText('prototype_b', W-130, H-30);

  return new THREE.CanvasTexture(cv);
}

/* ── PCB texture ── */
export function createPCBTexture() {
  const cv = document.createElement('canvas');
  cv.width = 256; cv.height = 180;
  const ctx = cv.getContext('2d');
  ctx.fillStyle = '#2b3c44'; ctx.fillRect(0,0,256,180);

  // Traces
  ctx.strokeStyle = 'rgba(110,160,180,0.65)'; ctx.lineWidth = 1.5;
  const trace = (pts) => {
    ctx.beginPath(); ctx.moveTo(...pts[0]);
    pts.slice(1).forEach(p => ctx.lineTo(...p)); ctx.stroke();
  };
  trace([[20,40],[80,40],[80,80],[140,80]]);
  trace([[20,100],[60,100],[60,140],[130,140]]);
  trace([[180,30],[220,30],[220,70]]);
  trace([[180,140],[220,140],[220,110],[200,110]]);

  // Vias
  ctx.fillStyle = 'rgba(140,185,200,0.85)';
  [[80,80],[140,80],[60,140],[220,70],[200,110]].forEach(([x,y]) => {
    ctx.beginPath(); ctx.arc(x,y,3.5,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#1c2a32'; ctx.beginPath(); ctx.arc(x,y,1.6,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = 'rgba(140,185,200,0.85)';
  });

  // ICs
  ctx.strokeStyle = 'rgba(150,195,210,0.7)'; ctx.lineWidth = 1;
  [[95,50,50,35],[170,95,45,30],[22,118,32,22]].forEach(([x,y,w,h]) => ctx.strokeRect(x,y,w,h));

  // Silkscreen label
  ctx.fillStyle = 'rgba(180,210,220,0.4)';
  ctx.font = '7px "Courier New", monospace';
  ctx.fillText('PCB-A · rev_2', 8, 170);

  return new THREE.CanvasTexture(cv);
}

/* ── Etched label texture ── */
export function createLabelTexture(text, w=256, h=48) {
  const cv = document.createElement('canvas');
  cv.width = w; cv.height = h;
  const ctx = cv.getContext('2d');
  ctx.fillStyle = 'rgba(0,0,0,0)'; ctx.fillRect(0,0,w,h);
  ctx.fillStyle = 'rgba(140,165,195,0.72)';
  ctx.font = '11px "Courier New", monospace';
  ctx.letterSpacing = '0.12em';
  ctx.fillText(text.toUpperCase(), 8, h/2+4);
  return new THREE.CanvasTexture(cv);
}

/* ── Monitor screen texture — portfolio layout ── */
export function createScreenTexture() {
  const W = 1920, H = 1080;
  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d');

  // Blueprint paper bg
  ctx.fillStyle = '#f4f6f8';
  ctx.fillRect(0, 0, W, H);

  // Fine grid
  ctx.strokeStyle = 'rgba(100,130,180,0.13)'; ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 28) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
  for (let y = 0; y < H; y += 28) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
  ctx.strokeStyle = 'rgba(90,120,170,0.2)'; ctx.lineWidth = 1.2;
  for (let x = 0; x < W; x += 140) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
  for (let y = 0; y < H; y += 140) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

  const ln = (x1,y1,x2,y2) => { ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke(); };

  // ── Nav bar ──
  ctx.fillStyle = '#edf0f4'; ctx.fillRect(0,0,W,54);
  ctx.strokeStyle = '#c8d0da'; ctx.lineWidth = 1; ln(0,54,W,54);
  ctx.fillStyle = '#1a2030';
  ctx.font = '500 13px "Courier New",monospace';
  ctx.fillText('EZRA  AKRESH', 68, 35);
  ctx.fillStyle = '#6b7a92'; ctx.font = '10px "Courier New",monospace';
  ['PROJECTS','EXPERIENCE','SKILLS','CONTACT'].forEach((t,i) => ctx.fillText(t, W-500+i*116, 35));

  // ── Hero corner brackets ──
  ctx.strokeStyle = 'rgba(59,107,204,0.6)'; ctx.lineWidth = 2.5;
  const b = 28;
  [[[68,72],[68,72+b]],[[W-68-b,72],[W-68,72]],[[68,540-b],[68,540]],[[W-68-b,540],[W-68,540]]].forEach(([[ax,ay],[bx,by]]) => {
    ctx.beginPath(); ctx.moveTo(ax,ay); ctx.lineTo(bx,by); ctx.stroke();
  });
  // TL vertical / TR vertical / BL horiz / BR horiz
  ln(68,72,68+b,72); ln(W-68,72,W-68,72+b); ln(68,540,68+b,540); ln(W-68,540,W-68,540-b);

  // unit_07 label
  ctx.fillStyle = '#3b6bcc'; ctx.font = '11px "Courier New",monospace';
  ctx.fillText('UNIT_07  ·  ONLINE', 120, 130);

  // Name
  ctx.fillStyle = '#1a2030'; ctx.font = '300 82px "Inter",Arial,sans-serif';
  ctx.fillText('Ezra Akresh', 118, 252);

  // Tagline
  ctx.fillStyle = '#3b6bcc'; ctx.font = '15px "Courier New",monospace';
  ctx.fillText('//', 118, 302);
  ctx.fillStyle = '#6b7a92';
  ctx.fillText('  software engineering · machine learning · robotics · mobile dev', 148, 302);

  // Bio
  ctx.font = '15px "Inter",Arial,sans-serif'; ctx.fillStyle = '#6b7a92';
  ctx.fillText('CS student at Georgia Tech building systems at the intersection of applied ML, full-stack', 118, 358);
  ctx.fillText('engineering, and computer vision. Researching robotic manipulation at the PAIR Lab.', 118, 384);

  // CTA buttons
  ctx.strokeStyle = '#c8d0da'; ctx.lineWidth = 1.5;
  ctx.strokeRect(118,428,192,40); ctx.strokeRect(326,428,162,40);
  ctx.fillStyle = '#6b7a92'; ctx.font = '11px "Courier New",monospace';
  ctx.fillText('DOWNLOAD RÉSUMÉ', 134,453); ctx.fillText('GET IN TOUCH', 346,453);

  // Bottom-right dim label
  ctx.fillStyle = 'rgba(59,107,204,0.28)'; ctx.font = '9px "Courier New",monospace';
  ctx.fillText('georgia institute of technology · cs · 2028', W-490, H-26);

  // ── Separator ──
  ctx.strokeStyle = '#c8d0da'; ctx.lineWidth = 1; ln(0,560,W,560);

  // Section label
  ctx.fillStyle = '#9aa3b0'; ctx.font = '9px "Courier New",monospace';
  ctx.fillText('FEATURED PROJECTS', 118, 598);
  ctx.strokeStyle = '#dde2e8'; ln(296,595,W-118,595);

  // ── Project cards ──
  const cardW = 418, cardH = 290, cardY = 618;
  const cards = [
    { tag:'FULL-STACK', title:'YouTube Creator Asst.', lines:['AI-powered platform — analytics,','Shorts generation, thumbnails.'], techs:['React.js','MongoDB','GCP'] },
    { tag:'MOBILE',     title:'Localite',             lines:['Location-aware event discovery','smart filtering, real-time ranks.'], techs:['React Native','Expo','Supabase'] },
    { tag:'ML / DATA',  title:'John Deere RUL Model', lines:['XGBoost regression, R² 0.93,','predicting tractor remaining life.'], techs:['Python','XGBoost','Scikit-learn'] },
  ];
  cards.forEach(({ tag, title, lines, techs }, i) => {
    const cx = 118 + i * (cardW + 42);
    ctx.fillStyle = '#edf0f4'; ctx.fillRect(cx,cardY,cardW,cardH);
    ctx.strokeStyle = '#c8d0da'; ctx.lineWidth = 1; ctx.strokeRect(cx,cardY,cardW,cardH);
    // Tag pill
    ctx.fillStyle = '#dde6f7'; ctx.fillRect(cx+14,cardY+14,78,20);
    ctx.fillStyle = '#2d5ab5'; ctx.font = '9px "Courier New",monospace';
    ctx.fillText(tag, cx+20, cardY+28);
    // Title
    ctx.fillStyle = '#1a2030'; ctx.font = '500 17px "Inter",Arial,sans-serif';
    ctx.fillText(title, cx+14, cardY+68);
    // Desc
    ctx.fillStyle = '#6b7a92'; ctx.font = '13px "Inter",Arial,sans-serif';
    lines.forEach((l,li) => ctx.fillText(l, cx+14, cardY+100+li*22));
    // Techs
    techs.forEach((t,ti) => {
      const tx = cx+14+ti*100;
      ctx.fillStyle = '#e4e8ee'; ctx.fillRect(tx,cardY+200,90,22);
      ctx.strokeStyle = '#c8d0da'; ctx.strokeRect(tx,cardY+200,90,22);
      ctx.fillStyle = '#2d5ab5'; ctx.font = '9px "Courier New",monospace';
      ctx.fillText(t, tx+6, cardY+215);
    });
    // Hover-style bottom accent line
    ctx.fillStyle = 'rgba(59,107,204,0.25)'; ctx.fillRect(cx, cardY+cardH-2, cardW, 2);
  });

  return new THREE.CanvasTexture(cv);
}

/* ── Monitor blueprint screen (scroll transition) ── */
export function createBlueprintScreenTexture(progress = 0) {
  const W = 512, H = 288;
  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d');

  const p2 = Math.max(0, Math.min((progress - 0.55) / 0.45, 1));
  const gridPx = 4 + p2 * 18;

  ctx.fillStyle = '#f4f6f8';
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = 'rgba(100,130,180,0.18)';
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += gridPx) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y < H; y += gridPx) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  const ln = (x1, y1, x2, y2) => {
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  };

  ctx.strokeStyle = 'rgba(59,107,204,0.65)';
  ctx.lineWidth = 2;
  const b = 18;
  ln(b, 10, 10, 10); ln(10, 10, 10, b);
  ln(W - b, 10, W - 10, 10); ln(W - 10, 10, W - 10, b);
  ln(b, H - 10, 10, H - 10); ln(10, H - 10, 10, H - b);
  ln(W - b, H - 10, W - 10, H - 10); ln(W - 10, H - 10, W - 10, H - b);

  ctx.strokeStyle = 'rgba(59,107,204,0.22)';
  ctx.lineWidth = 1;
  const trace = W * Math.min(p2 * 2, 1);
  ln(0, H / 2, trace, H / 2);
  ln(W, H / 2, W - trace, H / 2);
  ln(W / 2, 0, W / 2, H * Math.min(p2 * 2, 1));

  if (p2 > 0.3) {
    ctx.strokeStyle = 'rgba(59,107,204,0.45)';
    ctx.beginPath();
    ctx.arc(W / 2, H / 2, 5, 0, Math.PI * 2);
    ctx.stroke();
  }

  if (p2 > 0.5) {
    ctx.fillStyle = 'rgba(59,107,204,0.5)';
    ctx.font = '10px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('calibrating viewport · unit_07', W / 2, H - 22);
  }

  const tex = new THREE.CanvasTexture(cv);
  tex.needsUpdate = true;
  return tex;
}
