// Animated SVG globe — represents 9 theaters under continuous live attestation.
// Uses a 3D-projected wireframe sphere with rotating longitude lines, an orbiting
// satellite ring, and 9 theater pings that pulse in sequence.

const THEATERS = [
  { name: 'CONUS-E',  lat:  38, lon:  -78 },
  { name: 'CONUS-W',  lat:  37, lon: -122 },
  { name: 'EUCOM-N',  lat:  60, lon:   18 },
  { name: 'EUCOM-E',  lat:  50, lon:   30 },
  { name: 'AFRICOM',  lat:  10, lon:   20 },
  { name: 'CENTCOM',  lat:  30, lon:   50 },
  { name: 'INDOPACOM',lat:  35, lon:  138 },
  { name: 'INDOPAC-N',lat:   5, lon:  150 },
  { name: 'SOUTHCOM', lat: -15, lon:  -60 },
];

const GlobePosture = () => {
  const [t, setT] = React.useState(0);
  React.useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = () => {
      setT((performance.now() - start) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const cx = 200, cy = 200, R = 130;
  const rotY = t * 0.35;            // globe spin
  const tilt = 0;                    // axis vertical — no tilt
  const cosT = Math.cos(tilt), sinT = Math.sin(tilt);

  // Project lat/lon → screen with rotation + tilt; returns {x, y, front}
  const project = (latDeg, lonDeg, lonOffset = 0) => {
    const lat = (latDeg * Math.PI) / 180;
    const lon = ((lonDeg + lonOffset) * Math.PI) / 180 + rotY;
    let x = Math.cos(lat) * Math.sin(lon);
    let y = -Math.sin(lat); // SVG y-axis points down; negate so +lat = up
    let z = Math.cos(lat) * Math.cos(lon);
    // tilt around X axis
    const y2 = y * cosT - z * sinT;
    const z2 = y * sinT + z * cosT;
    return { x: cx + x * R, y: cy + y2 * R, front: z2 > 0 };
  };

  // Country/continent outlines (great-circle interpolated for clean curves on sphere)
  const countries = [];
  for (const poly of (window.WORLD_OUTLINES || [])) {
    const segs = []; // array of arrays of "x,y" — split when crossing to back hemisphere
    let cur = [];
    const flush = () => { if (cur.length > 1) segs.push(cur.join(' ')); cur = []; };
    for (let i = 0; i < poly.length - 1; i++) {
      const [la1, lo1] = poly[i];
      const [la2, lo2] = poly[i + 1];
      // interpolate along the segment for smoothness across the curved sphere
      const steps = 6;
      for (let s = 0; s <= steps; s++) {
        const f = s / steps;
        const la = la1 + (la2 - la1) * f;
        let dlo = lo2 - lo1;
        if (dlo > 180) dlo -= 360;
        if (dlo < -180) dlo += 360;
        const lo = lo1 + dlo * f;
        const p = project(la, lo);
        if (p.front) cur.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`);
        else flush();
      }
    }
    flush();
    countries.push(...segs);
  }

  // Longitude meridians
  const meridians = [];
  for (let lon = 0; lon < 180; lon += 30) {
    const pts = [];
    for (let lat = -90; lat <= 90; lat += 6) {
      const p = project(lat, lon);
      if (p.front) pts.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`);
    }
    if (pts.length) meridians.push(pts.join(' '));
  }
  // Latitude parallels
  const parallels = [];
  for (let lat = -60; lat <= 60; lat += 30) {
    const pts = [];
    for (let lon = -180; lon <= 180; lon += 6) {
      const p = project(lat, lon);
      if (p.front) pts.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`);
    }
    if (pts.length) parallels.push(pts.join(' '));
  }

  // Theater pings — pulse cycles through them
  const activeIdx = Math.floor(t * 1.2) % THEATERS.length;

  // Orbiting satellite (in front of globe in projection)
  const satA = t * 0.9;
  const satR = R + 28;
  const satX = cx + Math.cos(satA) * satR;
  const satY = cy + Math.sin(satA) * satR * 0.42 - 14;

  return (
    <div className="globe-tile" style={{ minHeight: 360 }}>
      <div className="globe-head">
        <span className="live"><span className="dot" />REDOUBT · GLOBAL POSTURE</span>
        <span className="dimmer">{THEATERS.length} THEATERS · LIVE</span>
      </div>
      <svg viewBox="0 0 400 400" className="globe-svg">
        <defs>
          <radialGradient id="globeFill" cx="40%" cy="40%" r="65%">
            <stop offset="0%"   stopColor="#1a221c" />
            <stop offset="70%"  stopColor="#131b16" />
            <stop offset="100%" stopColor="#0d1410" />
          </radialGradient>
          <radialGradient id="globeRim" cx="50%" cy="50%" r="50%">
            <stop offset="92%" stopColor="rgba(154,168,132,0)" />
            <stop offset="100%" stopColor="rgba(154,168,132,0.35)" />
          </radialGradient>
          <filter id="ping" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        {/* outer rings (orbital reference) */}
        <ellipse cx={cx} cy={cy} rx={R + 28} ry={(R + 28) * 0.42}
                 fill="none" stroke="rgba(154,168,132,0.25)" strokeWidth="0.6"
                 transform={`rotate(${(t * 12) % 360} ${cx} ${cy})`} />
        <ellipse cx={cx} cy={cy} rx={R + 50} ry={(R + 50) * 0.30}
                 fill="none" stroke="rgba(154,168,132,0.12)" strokeWidth="0.5"
                 strokeDasharray="2 6"
                 transform={`rotate(${(-t * 8) % 360} ${cx} ${cy})`} />

        {/* globe body */}
        <circle cx={cx} cy={cy} r={R} fill="url(#globeFill)" stroke="rgba(154,168,132,0.45)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={R} fill="url(#globeRim)" />

        {/* graticule */}
        <g fill="none" stroke="rgba(154,168,132,0.22)" strokeWidth="0.5">
          {meridians.map((d, i) => <polyline key={`m${i}`} points={d} />)}
          {parallels.map((d, i) => <polyline key={`p${i}`} points={d} opacity="0.7" />)}
        </g>

        {/* country / continent outlines */}
        <g fill="none" stroke="rgba(196,207,168,0.75)" strokeWidth="0.9"
           strokeLinejoin="round" strokeLinecap="round">
          {countries.map((d, i) => <polyline key={`c${i}`} points={d} />)}
        </g>

        {/* theater pings */}
        {THEATERS.map((th, i) => {
          const p = project(th.lat, th.lon);
          if (!p.front) return null;
          const isActive = i === activeIdx;
          const pulse = isActive ? (Math.sin(t * 6) * 0.5 + 0.5) : 0.25;
          return (
            <g key={th.name} opacity={isActive ? 1 : 0.55}>
              {isActive && (
                <circle cx={p.x} cy={p.y} r={4 + pulse * 14}
                        fill="none" stroke="#c4cfa8"
                        strokeWidth="1" opacity={1 - pulse} />
              )}
              <circle cx={p.x} cy={p.y} r={isActive ? 3.2 : 2}
                      fill={isActive ? '#c4cfa8' : '#9aa884'} filter="url(#ping)" />
              <circle cx={p.x} cy={p.y} r={isActive ? 1.6 : 1}
                      fill="#e0e0d8" />
            </g>
          );
        })}

        {/* active theater label */}
        {(() => {
          const a = THEATERS[activeIdx];
          const p = project(a.lat, a.lon);
          if (!p.front) return null;
          const labelX = p.x + 10, labelY = p.y - 10;
          return (
            <g>
              <line x1={p.x} y1={p.y} x2={labelX} y2={labelY}
                    stroke="rgba(196,207,168,0.6)" strokeWidth="0.6" />
              <text x={labelX + 2} y={labelY - 2}
                    fill="#c4cfa8" fontSize="9"
                    fontFamily="JetBrains Mono, monospace"
                    letterSpacing="1.2">{a.name}</text>
            </g>
          );
        })()}

        {/* orbiting satellite */}
        <g transform={`translate(${satX} ${satY})`}>
          <line x1="-6" y1="0" x2="6" y2="0" stroke="#c4cfa8" strokeWidth="0.8" />
          <rect x="-2" y="-2" width="4" height="4" fill="#e0e0d8" />
          <circle cx="0" cy="0" r="8" fill="none" stroke="rgba(196,207,168,0.4)" strokeWidth="0.4" />
        </g>

        {/* corner reticles */}
        <g stroke="rgba(154,168,132,0.5)" strokeWidth="0.8" fill="none">
          <path d="M16 16 L16 28 M16 16 L28 16" />
          <path d="M384 16 L384 28 M384 16 L372 16" />
          <path d="M16 384 L16 372 M16 384 L28 384" />
          <path d="M384 384 L384 372 M384 384 L372 384" />
        </g>
        <text x="20" y="392" fontSize="8" fontFamily="JetBrains Mono, monospace"
              fill="rgba(107,117,99,0.9)" letterSpacing="1.5">FIG · 09 / GLOBAL POSTURE</text>
        <text x="380" y="392" fontSize="8" fontFamily="JetBrains Mono, monospace"
              fill="rgba(107,117,99,0.9)" letterSpacing="1.5"
              textAnchor="end">SYNC {(t % 10).toFixed(2)}s</text>
      </svg>
    </div>
  );
};

window.GlobePosture = GlobePosture;
