// Animated SVG globe — represents 9 theaters under continuous live attestation.
// Uses a 3D-projected wireframe sphere with rotating longitude lines, an orbiting
// satellite ring, and 9 theater pings that pulse in sequence.

import { useState, useEffect } from 'react'

// Simplified world coastlines — low-poly approximations of continents/countries.
// Each entry is an array of [lat, lon] points forming a closed-ish polygon (drawn open,
// just used for outline). Resolution kept low for clean rendering at small SVG sizes.
const WORLD_OUTLINES: number[][][] = [
  // North America (mainland)
  [[71,-156],[70,-141],[68,-133],[60,-141],[59,-152],[55,-160],[55,-131],[48,-125],[42,-124],[34,-120],[32,-117],[27,-114],[23,-110],[21,-105],[16,-95],[18,-88],[21,-86],[18,-94],[20,-97],[26,-97],[30,-94],[30,-89],[27,-82],[25,-80],[31,-81],[35,-76],[39,-75],[42,-71],[44,-67],[47,-60],[50,-58],[55,-60],[58,-63],[60,-65],[63,-78],[60,-95],[68,-95],[70,-128],[71,-156]],
  // Greenland
  [[83,-30],[80,-15],[75,-15],[70,-22],[65,-37],[60,-43],[65,-52],[72,-55],[78,-65],[82,-50],[83,-30]],
  // South America
  [[12,-72],[8,-77],[1,-79],[-4,-81],[-15,-76],[-18,-71],[-30,-71],[-40,-74],[-46,-75],[-52,-74],[-55,-68],[-50,-65],[-40,-62],[-38,-58],[-34,-58],[-23,-43],[-15,-39],[-8,-35],[-3,-44],[5,-52],[10,-60],[12,-72]],
  // Africa
  [[37,-9],[36,0],[35,11],[33,22],[31,32],[22,36],[15,40],[12,43],[10,51],[2,46],[-5,40],[-15,40],[-26,33],[-34,28],[-34,18],[-29,16],[-22,14],[-12,13],[-5,9],[2,9],[5,-3],[7,-13],[12,-17],[20,-17],[27,-13],[33,-7],[37,-9]],
  // Europe (mainland)
  [[71,28],[68,40],[60,30],[60,17],[58,12],[55,8],[52,5],[51,-3],[48,-5],[44,-2],[43,-9],[40,-9],[37,-9],[37,-2],[39,3],[43,5],[44,12],[40,18],[40,24],[42,28],[46,30],[50,38],[55,38],[60,38],[65,40],[71,28]],
  // Asia (mainland — approximate)
  [[71,28],[78,60],[78,100],[73,140],[66,170],[60,165],[55,160],[52,142],[45,140],[40,140],[35,130],[33,120],[22,110],[10,108],[8,100],[14,98],[20,93],[24,90],[22,72],[24,67],[27,57],[28,50],[30,48],[34,42],[37,40],[40,38],[44,38],[50,38],[55,38],[60,38],[65,40],[71,28]],
  // India
  [[34,76],[28,73],[22,68],[18,72],[10,76],[8,77],[12,80],[16,80],[20,86],[22,89],[27,89],[34,76]],
  // Indochina/Malay
  [[20,93],[18,98],[12,99],[8,100],[6,103],[2,103],[1,110],[-2,116],[-7,113],[-8,116],[-10,123],[-9,140],[-2,138],[1,131],[5,127],[7,125],[10,123],[14,121],[18,121],[20,108],[20,93]],
  // Australia
  [[-12,131],[-12,142],[-19,147],[-26,153],[-34,151],[-38,146],[-39,141],[-35,136],[-32,116],[-22,114],[-18,122],[-12,131]],
  // British Isles
  [[58,-5],[58,-2],[55,-1],[52,2],[51,1],[51,-4],[55,-6],[58,-5]],
  // Japan
  [[45,142],[42,140],[38,140],[34,135],[31,131],[33,130],[35,135],[37,138],[40,140],[45,142]],
  // Madagascar
  [[-12,49],[-15,50],[-22,48],[-25,46],[-23,43],[-18,44],[-12,49]],
  // New Zealand (north + south, drawn as one outline)
  [[-34,173],[-37,176],[-41,175],[-41,174],[-44,170],[-47,167],[-46,168],[-42,171],[-39,173],[-34,173]],
  // Iceland
  [[66,-23],[66,-14],[64,-14],[63,-18],[64,-23],[66,-23]],
  // Borneo
  [[7,117],[3,118],[-2,116],[-3,111],[1,109],[5,109],[7,117]],
  // Sumatra
  [[5,95],[3,99],[-3,102],[-6,105],[-3,100],[1,97],[5,95]],
  // Cuba / Caribbean (rough)
  [[23,-83],[20,-74],[19,-77],[22,-84],[23,-83]],
  // Korea
  [[39,127],[38,129],[35,129],[34,127],[36,126],[39,127]],
]

const THEATERS = [
  { name: 'CONUS-E',   lat:  38, lon:  -78 },
  { name: 'CONUS-W',   lat:  37, lon: -122 },
  { name: 'EUCOM-N',   lat:  60, lon:   18 },
  { name: 'EUCOM-E',   lat:  50, lon:   30 },
  { name: 'AFRICOM',   lat:  10, lon:   20 },
  { name: 'CENTCOM',   lat:  30, lon:   50 },
  { name: 'INDOPACOM', lat:  35, lon:  138 },
  { name: 'INDOPAC-N', lat:   5, lon:  150 },
  { name: 'SOUTHCOM',  lat: -15, lon:  -60 },
]

export default function GlobePosture() {
  const [t, setT] = useState(0)
  useEffect(() => {
    let raf: number
    const start = performance.now()
    const tick = () => {
      setT((performance.now() - start) / 1000)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const cx = 200, cy = 200, R = 130
  const rotY = t * 0.35            // globe spin
  const tilt = 0                   // axis vertical — no tilt
  const cosT = Math.cos(tilt), sinT = Math.sin(tilt)

  // Project lat/lon → screen with rotation + tilt; returns {x, y, front}
  const project = (latDeg: number, lonDeg: number) => {
    const lat = (latDeg * Math.PI) / 180
    const lon = (lonDeg * Math.PI) / 180 + rotY
    let x = Math.cos(lat) * Math.sin(lon)
    let y = -Math.sin(lat) // SVG y-axis points down; negate so +lat = up
    const z = Math.cos(lat) * Math.cos(lon)
    // tilt around X axis
    const y2 = y * cosT - z * sinT
    const z2 = y * sinT + z * cosT
    return { x: cx + x * R, y: cy + y2 * R, front: z2 > 0 }
  }

  // Country/continent outlines (great-circle interpolated for clean curves on sphere)
  const countries: string[] = []
  for (const poly of WORLD_OUTLINES) {
    const segs: string[] = [] // array of arrays of "x,y" — split when crossing to back hemisphere
    let cur: string[] = []
    const flush = () => { if (cur.length > 1) segs.push(cur.join(' ')); cur = [] }
    for (let i = 0; i < poly.length - 1; i++) {
      const [la1, lo1] = poly[i]
      const [la2, lo2] = poly[i + 1]
      // interpolate along the segment for smoothness across the curved sphere
      const steps = 6
      for (let s = 0; s <= steps; s++) {
        const f = s / steps
        const la = la1 + (la2 - la1) * f
        let dlo = lo2 - lo1
        if (dlo > 180) dlo -= 360
        if (dlo < -180) dlo += 360
        const lo = lo1 + dlo * f
        const p = project(la, lo)
        if (p.front) cur.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`)
        else flush()
      }
    }
    flush()
    countries.push(...segs)
  }

  // Longitude meridians
  const meridians: string[] = []
  for (let lon = 0; lon < 180; lon += 30) {
    const pts: string[] = []
    for (let lat = -90; lat <= 90; lat += 6) {
      const p = project(lat, lon)
      if (p.front) pts.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    }
    if (pts.length) meridians.push(pts.join(' '))
  }
  // Latitude parallels
  const parallels: string[] = []
  for (let lat = -60; lat <= 60; lat += 30) {
    const pts: string[] = []
    for (let lon = -180; lon <= 180; lon += 6) {
      const p = project(lat, lon)
      if (p.front) pts.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    }
    if (pts.length) parallels.push(pts.join(' '))
  }

  // Theater pings — pulse cycles through them
  const activeIdx = Math.floor(t * 1.2) % THEATERS.length

  // Orbiting satellite (in front of globe in projection)
  const satA = t * 0.9
  const satR = R + 28
  const satX = cx + Math.cos(satA) * satR
  const satY = cy + Math.sin(satA) * satR * 0.42 - 14

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
          const p = project(th.lat, th.lon)
          if (!p.front) return null
          const isActive = i === activeIdx
          const pulse = isActive ? (Math.sin(t * 6) * 0.5 + 0.5) : 0.25
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
          )
        })}

        {/* active theater label */}
        {(() => {
          const a = THEATERS[activeIdx]
          const p = project(a.lat, a.lon)
          if (!p.front) return null
          const labelX = p.x + 10, labelY = p.y - 10
          return (
            <g>
              <line x1={p.x} y1={p.y} x2={labelX} y2={labelY}
                    stroke="rgba(196,207,168,0.6)" strokeWidth="0.6" />
              <text x={labelX + 2} y={labelY - 2}
                    fill="#c4cfa8" fontSize="9"
                    fontFamily="JetBrains Mono, monospace"
                    letterSpacing="1.2">{a.name}</text>
            </g>
          )
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
  )
}
