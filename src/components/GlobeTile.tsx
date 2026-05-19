// Globe tile — swappable rendering of the Global Posture visual.
//
// Change MODE to switch between strategies. No other edits needed.
//
//   'poster'        → static PNG. Instant load, zero cost. (DEFAULT)
//                     Click "ACTIVATE LIVE FEED" to swap in the live globe on demand.
//   'live'          → live animated SVG globe always mounted.
//
// To revert to the original live-globe behavior, set MODE = 'live'.

import { useState, useEffect, useRef } from 'react'
import GlobePosture from './Globe'

const MODE: string = 'poster'

const LiveGlobe = () => <GlobePosture />

// Lazy variant — only mounts the live globe when the wrapper is visible
const LazyGlobe = () => {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = wrapRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => setVisible(e.isIntersecting)),
      { rootMargin: '120px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrapRef} style={{ position: 'absolute', inset: 0 }}>
      {visible
        ? <LiveGlobe />
        : <div className="globe-poster-placeholder">[ STANDBY ]</div>
      }
    </div>
  )
}

// Poster variant — static image with an "Activate" button that swaps in the live globe
const PosterGlobe = () => {
  // States: 'idle' | 'booting' | 'live'
  const [state, setState] = useState<'idle' | 'booting' | 'live'>('idle')
  const [statusIdx, setStatusIdx] = useState(0)

  const STATUS_LINES = [
    'INITIATING HANDSHAKE',
    'ATTESTING THEATERS',
    'DECRYPTING TELEMETRY',
    'SYNCING ORBITAL',
    'STREAM LIVE',
  ]

  // Boot sequence: cycle status lines, then transition to 'live'
  useEffect(() => {
    if (state !== 'booting') return
    const lineInterval = setInterval(() => {
      setStatusIdx(i => Math.min(i + 1, STATUS_LINES.length - 1))
    }, 280)
    const finishTimer = setTimeout(() => {
      setState('live')
    }, 1700)
    return () => { clearInterval(lineInterval); clearTimeout(finishTimer) }
  }, [state])

  const handleActivate = () => {
    if (state === 'idle') {
      setStatusIdx(0)
      setState('booting')
    }
  }

  return (
    <div className={`globe-poster-stage state-${state}`}>
      {/* Live globe pre-mounts during booting so it's warm by the time poster fades */}
      {state !== 'idle' && (
        <div className="globe-poster-iframe-layer">
          <LiveGlobe />
        </div>
      )}

      {/* Poster layer (fades out during/after boot) */}
      {state !== 'live' && (
        <button
          className="globe-poster"
          type="button"
          onClick={handleActivate}
          disabled={state === 'booting'}
          aria-label="Activate live global posture feed"
        >
          <img
            src="globe-poster.png"
            alt="Global posture — 9 theaters under continuous attestation"
            className="globe-poster-img"
          />
          {/* Animated scanlines & boot effects */}
          <span className="globe-poster-scan"></span>
          <span className="globe-poster-grid"></span>
          {/* Corner brackets */}
          <span className="globe-poster-corner tl"></span>
          <span className="globe-poster-corner tr"></span>
          <span className="globe-poster-corner bl"></span>
          <span className="globe-poster-corner br"></span>
          {/* Boot ripple */}
          {state === 'booting' && (
            <>
              <span className="globe-poster-ripple r1"></span>
              <span className="globe-poster-ripple r2"></span>
              <span className="globe-poster-ripple r3"></span>
            </>
          )}
          <span className="globe-poster-overlay">
            <span className="globe-poster-cta">
              <span className="globe-poster-cta-icon">{state === 'booting' ? '◉' : '▶'}</span>
              <span className="globe-poster-cta-label">
                {state === 'booting' ? 'BOOTING' : 'ACTIVATE LIVE FEED'}
              </span>
            </span>
            <span className="globe-poster-status">
              {state === 'booting' ? (
                <>
                  <span className="globe-poster-status-cursor">›</span>
                  <span className="globe-poster-status-text">{STATUS_LINES[statusIdx]}</span>
                  <span className="globe-poster-status-dots"></span>
                </>
              ) : (
                <span className="globe-poster-hint">STATIC PREVIEW · CLICK TO STREAM LIVE WEBGL</span>
              )}
            </span>
          </span>
        </button>
      )}
    </div>
  )
}

export default function GlobeTile() {
  return (
    <div className="globe-tile globe-iframe-tile">
      <div className="globe-head">
        <span>GLOBAL POSTURE · 9 THEATERS</span>
        <span className="live"><span className="dot"></span>LIVE</span>
      </div>
      <div className="globe-iframe-wrap">
        {MODE === 'poster' && <PosterGlobe />}
        {MODE === 'live' && <LiveGlobe />}
        {MODE === 'lazy' && <LazyGlobe />}
      </div>
    </div>
  )
}
