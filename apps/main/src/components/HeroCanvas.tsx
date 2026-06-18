// Animated hero background — network mesh + radar sweep
import { useRef, useEffect } from 'react'

export default function HeroCanvas({ variant = 'mesh' }: { variant?: 'mesh' | 'radar' }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf: number;
    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const parent = canvas.parentElement;
      const rect = parent ? parent.getBoundingClientRect() : canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);
    const ro = (typeof ResizeObserver !== 'undefined') ? new ResizeObserver(resize) : null;
    if (ro && canvas.parentElement) ro.observe(canvas.parentElement);

    // Nodes — count + edge distance scale with viewport
    const isMobile = w < 700;
    const isTiny = w < 460;
    const N = isTiny
      ? (variant === 'mesh' ? 38 : 22)
      : isMobile
      ? (variant === 'mesh' ? 60 : 36)
      : (variant === 'mesh' ? 110 : 60);
    const EDGE_DIST = isTiny ? 100 : isMobile ? 130 : 200;
    const nodes = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 1.6 + 0.7,
      pulse: Math.random() * Math.PI * 2,
      hot: Math.random() < 0.12, // a few "hot" nodes that glow brighter
    }));

    // Packets — small bright dots traveling between nearby nodes
    const packets: { from: typeof nodes[0]; to: typeof nodes[0]; t: number; speed: number }[] = [];
    const spawnPacket = () => {
      const a = nodes[Math.floor(Math.random() * nodes.length)];
      // pick a nearby node as destination
      let candidates = nodes.filter(n => n !== a);
      candidates.sort((p, q) => {
        const dp = (p.x-a.x)**2 + (p.y-a.y)**2;
        const dq = (q.x-a.x)**2 + (q.y-a.y)**2;
        return dp - dq;
      });
      const b = candidates[1 + Math.floor(Math.random() * 4)] || candidates[0];
      if (!b) return;
      packets.push({ from: a, to: b, t: 0, speed: 0.012 + Math.random() * 0.018 });
    };

    // Pulse waves — rare ripples that radiate out from a node
    const pulses: { x: number; y: number; r: number; max: number }[] = [];
    const spawnPulse = () => {
      const n = nodes[Math.floor(Math.random() * nodes.length)];
      pulses.push({ x: n.x, y: n.y, r: 0, max: 180 + Math.random() * 140 });
    };

    let frame = 0;
    let t = 0;
    const draw = () => {
      t += 0.012;
      frame++;
      ctx.clearRect(0, 0, w, h);

      // Spawn packets ~ every 4 frames, cap total
      if (frame % 3 === 0 && packets.length < 28) spawnPacket();
      // Spawn pulse occasionally
      if (frame % 90 === 0 && pulses.length < 4) spawnPulse();

      if (variant === 'radar') {
        // Concentric rings
        const cx = w * 0.7, cy = h * 0.5;
        ctx.strokeStyle = 'rgba(154, 168, 132, 0.12)';
        ctx.lineWidth = 1;
        for (let i = 1; i <= 6; i++) {
          ctx.beginPath();
          ctx.arc(cx, cy, i * 80, 0, Math.PI * 2);
          ctx.stroke();
        }
        // Crosshair
        ctx.beginPath();
        ctx.moveTo(cx - 480, cy); ctx.lineTo(cx + 480, cy);
        ctx.moveTo(cx, cy - 480); ctx.lineTo(cx, cy + 480);
        ctx.stroke();
        // Sweep
        const sweepAngle = t * 0.9;
        const grad = (ctx as CanvasRenderingContext2D & { createConicGradient?: (startAngle: number, x: number, y: number) => CanvasGradient }).createConicGradient ? (ctx as CanvasRenderingContext2D & { createConicGradient: (startAngle: number, x: number, y: number) => CanvasGradient }).createConicGradient(sweepAngle, cx, cy) : null;
        if (grad) {
          grad.addColorStop(0, 'rgba(196, 207, 168, 0.7)');
          grad.addColorStop(0.05, 'rgba(154, 168, 132, 0.25)');
          grad.addColorStop(0.18, 'rgba(154, 168, 132, 0)');
          grad.addColorStop(1, 'rgba(154, 168, 132, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(cx, cy, 480, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Update nodes
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        n.pulse += 0.05;
      }

      // Edges
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx*dx + dy*dy);
          if (d < EDGE_DIST) {
            const alpha = (1 - d / EDGE_DIST) * 0.55;
            // hot-to-hot edges get warmer color, others stay olive
            const hot = a.hot && b.hot;
            ctx.strokeStyle = hot
              ? `rgba(212, 162, 58, ${alpha})`
              : `rgba(154, 168, 132, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Pulse rings (drawn under nodes)
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.r += 1.6;
        const a = (1 - p.r / p.max) * 0.55;
        if (a <= 0) { pulses.splice(i, 1); continue; }
        ctx.strokeStyle = `rgba(196, 207, 168, ${a})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.lineWidth = 1;

      // Nodes
      for (const n of nodes) {
        const pulse = (Math.sin(n.pulse) + 1) * 0.5;
        if (n.hot) {
          // Glow halo
          const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 14);
          glow.addColorStop(0, `rgba(212, 162, 58, ${0.5 + pulse * 0.3})`);
          glow.addColorStop(1, 'rgba(212, 162, 58, 0)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 14, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgba(232, 196, 128, ${0.7 + pulse * 0.3})`;
        } else {
          ctx.fillStyle = `rgba(196, 207, 168, ${0.5 + pulse * 0.5})`;
        }
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + pulse * 1.0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Packets — bright moving dots with trails
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.t += p.speed;
        if (p.t >= 1) { packets.splice(i, 1); continue; }
        const x = p.from.x + (p.to.x - p.from.x) * p.t;
        const y = p.from.y + (p.to.y - p.from.y) * p.t;
        // trail
        const trailX = p.from.x + (p.to.x - p.from.x) * Math.max(0, p.t - 0.18);
        const trailY = p.from.y + (p.to.y - p.from.y) * Math.max(0, p.t - 0.18);
        const tg = ctx.createLinearGradient(trailX, trailY, x, y);
        tg.addColorStop(0, 'rgba(232, 240, 200, 0)');
        tg.addColorStop(1, 'rgba(232, 240, 200, 0.85)');
        ctx.strokeStyle = tg;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(trailX, trailY); ctx.lineTo(x, y);
        ctx.stroke();
        // head dot + glow
        const hg = ctx.createRadialGradient(x, y, 0, x, y, 6);
        hg.addColorStop(0, 'rgba(240, 248, 220, 0.95)');
        hg.addColorStop(1, 'rgba(240, 248, 220, 0)');
        ctx.fillStyle = hg;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(255, 255, 240, 1)';
        ctx.beginPath();
        ctx.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.lineWidth = 1;

      // Scanline — brighter
      const scanY = (Math.sin(t * 0.7) * 0.5 + 0.5) * h;
      const sg = ctx.createLinearGradient(0, scanY - 90, 0, scanY + 90);
      sg.addColorStop(0, 'rgba(154, 168, 132, 0)');
      sg.addColorStop(0.5, 'rgba(196, 207, 168, 0.14)');
      sg.addColorStop(1, 'rgba(154, 168, 132, 0)');
      ctx.fillStyle = sg;
      ctx.fillRect(0, scanY - 90, w, 180);

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); if (ro) ro.disconnect(); };
  }, [variant]);

  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
}
