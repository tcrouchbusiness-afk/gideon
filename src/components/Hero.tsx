// Hero variants — three layouts, switchable via variant prop
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { NowUTC } from './Nav'
import HeroCanvas from './HeroCanvas'
import { LiveFeed } from './LiveFeed'

function HeroDefault({ sub }: { sub: string }) {
  const navigate = useNavigate()
  return (
    <section className="hero">
      <div className="hero-grid"></div>
      <HeroCanvas variant="mesh" />
      <div className="hero-content">
        <div className="hero-meta">
          <div className="hero-meta-block">
            <span className="label">Designation</span>
            <span className="val">GIDEON DYNAMICS / 13.04.07</span>
          </div>
          <div className="hero-meta-block">
            <span className="label">Operations Time (UTC)</span>
            <span className="val mono"><NowUTC /></span>
          </div>
          <div className="hero-meta-block">
            <span className="label">Posture</span>
            <span className="val" style={{ color: '#9aa884' }}>● ACTIVE · DEFCON-IV</span>
          </div>
        </div>
        <h1 className="hero-headline">
          Persistence in an <em>unpersistant</em> world.
        </h1>
        <p className="hero-sub">{sub}</p>
        <div className="hero-actions">
          <button className="btn primary" onClick={() => navigate('/contact')}>Request Briefing <span className="btn-arrow">→</span></button>
          <button className="btn" onClick={() => navigate('/programs')}>Mission Programs <span className="btn-arrow">→</span></button>
        </div>
      </div>
    </section>
  )
}

function HeroSplit({ sub }: { sub: string }) {
  const navigate = useNavigate()
  return (
    <section className="hero v-split">
      <HeroCanvas variant="radar" />
      <div className="hero-content">
        <div>
          <div className="row" style={{ marginBottom: 24 }}>
            <span className="tag">SOV-AI/1</span>
            <span className="tag">FY26</span>
            <span className="mono small dimmer">— CLASSIFIED CAPABILITY UPLIFT</span>
          </div>
          <h1 className="hero-headline">
            Sovereign cyber for <em>contested</em> theaters.
          </h1>
          <p className="hero-sub">{sub}</p>
          <div className="hero-actions">
            <button className="btn primary" onClick={() => navigate('/contact')}>Request Briefing →</button>
            <button className="btn" onClick={() => navigate('/programs')}>Mission Programs →</button>
          </div>
        </div>
        <div className="hero-canvas-wrap">
          <LiveFeed />
        </div>
      </div>
    </section>
  )
}

function HeroTerminal({ sub }: { sub: string }) {
  const [step, setStep] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const id = setInterval(() => setStep(s => Math.min(s + 1, 6)), 700)
    return () => clearInterval(id)
  }, [])

  const lines = [
    { t: '$ gideon auth --identity defender.07 --token ******', c: '' },
    { t: '✓ identity verified · clearance: TS/SCI · enclave: REDOUBT-A', c: 'ok' },
    { t: '$ redoubt status --scope perimeter', c: '' },
    { t: '⟶ 14,221 assets attested across 9 networks', c: '' },
    { t: '⟶ 2.1M telemetry events correlated · sovereign 9B (in-enclave)', c: '' },
    { t: '! 3 anomalies isolated · 0 false positives · posture auto-staged', c: 'warn' },
    { t: '✓ perimeter holding · zero data egress', c: 'ok' },
  ]

  return (
    <section className="hero v-terminal">
      <div className="hero-grid"></div>
      <div className="hero-content">
        <div className="hero-meta">
          <div className="hero-meta-block">
            <span className="label">Session</span>
            <span className="val">redoubt-shell · operator.07</span>
          </div>
          <div className="hero-meta-block">
            <span className="label">UTC</span>
            <span className="val mono"><NowUTC /></span>
          </div>
        </div>
        <h1 className="hero-headline">
          {`> persistence_in_an_unpersistant_world`}<span className="cursor"></span>
        </h1>
        <div className="terminal">
          {lines.slice(0, step + 1).map((l, i) => (
            <span key={i} className={`l ${l.c}`}>{l.t}</span>
          ))}
          <span className="l">{step >= 6 ? '$ ' : ''}<span className="cursor"></span></span>
        </div>
        <div className="hero-actions">
          <button className="btn primary" onClick={() => navigate('/contact')}>Request Briefing →</button>
          <button className="btn" onClick={() => navigate('/mission')}>Read Mission →</button>
        </div>
      </div>
    </section>
  )
}

export default function Hero({ variant, sub }: { variant: string; sub: string }) {
  if (variant === 'split') return <HeroSplit sub={sub} />
  if (variant === 'terminal') return <HeroTerminal sub={sub} />
  return <HeroDefault sub={sub} />
}
