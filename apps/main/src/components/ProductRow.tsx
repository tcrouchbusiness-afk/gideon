import { useState, useRef, useLayoutEffect } from 'react'
import { Product } from '../data/products'
import { useFig } from '../hooks/useFig'

// --- FigLockGate ---

interface FigLockGateProps {
  num: string
  name: string
  onUnlock: (pw: string) => void
}

function FigLockGate({ num, name, onUnlock }: FigLockGateProps) {
  const [val, setVal] = useState('')
  const [err, setErr] = useState(false)
  const [busy, setBusy] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (busy || !val) return
    setBusy(true)
    setErr(false)
    try {
      await onUnlock(val)
    } catch {
      setErr(true)
      setVal('')
      setTimeout(() => setErr(false), 1400)
    } finally {
      setBusy(false)
    }
  }

  const hint = busy
    ? '⟳ DECRYPTING…'
    : err
    ? '✕ DECRYPTION FAILED · INVALID KEY'
    : 'AES-GCM · PBKDF2-SHA256 · CLEARED PERSONNEL ONLY'

  return (
    <div className="fig-lock" onClick={(e) => e.stopPropagation()}>
      <div className="fig-lock-redact" aria-hidden="true">
        <div className="fig-lock-bar" style={{ width: '72%' }}></div>
        <div className="fig-lock-bar" style={{ width: '54%' }}></div>
        <div className="fig-lock-bar" style={{ width: '88%' }}></div>
        <div className="fig-lock-bar" style={{ width: '40%' }}></div>
        <div className="fig-lock-bar" style={{ width: '66%' }}></div>
        <div className="fig-lock-bar" style={{ width: '78%' }}></div>
      </div>
      <div className="fig-lock-overlay">
        <div className="fig-lock-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="4" y="11" width="16" height="10" rx="1.5" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
        </div>
        <div className="fig-lock-title">FIG · {num} / {name}</div>
        <div className="fig-lock-copy">
          For authorized eyes only.<br />
          Enter access code to decrypt operator console.
        </div>
        <form className="fig-lock-form" onSubmit={submit}>
          <input
            type="password"
            placeholder="ACCESS CODE"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            disabled={busy}
            className={`fig-lock-input${err ? ' err' : ''}`}
            autoComplete="off"
            spellCheck={false}
            onClick={(e) => e.stopPropagation()}
          />
          <button type="submit" className="fig-lock-btn" disabled={busy}>
            {busy ? 'DECRYPTING…' : 'AUTHENTICATE →'}
          </button>
        </form>
        <div className="fig-lock-hint">{hint}</div>
      </div>
    </div>
  )
}

// --- FigFrame ---

interface FigFrameProps {
  encSrc: string
  w: number
  h: number
  num: string
  name: string
  interactive?: boolean
}

function FigFrame({ encSrc, w, h, num, name, interactive }: FigFrameProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const { html, locked, unlock } = useFig(encSrc)
  const unlocked = !locked && !!html

  useLayoutEffect(() => {
    if (!unlocked) return
    const el = wrapRef.current
    if (!el) return
    const update = () => {
      const cw = el.clientWidth
      if (cw > 0) setScale(cw / w)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [w, unlocked])

  return (
    <div
      ref={wrapRef}
      className={`pd-image pd-fig${interactive ? ' pd-fig-interactive' : ''}${unlocked ? '' : ' pd-fig-locked'}`}
      style={{ aspectRatio: `${w} / ${h}` }}
      onClick={interactive && unlocked ? (e) => e.stopPropagation() : undefined}
    >
      {unlocked && html ? (
        <>
          <iframe
            srcDoc={html}
            title={`FIG · ${num} — ${name}`}
            sandbox="allow-scripts allow-same-origin"
            scrolling={interactive ? 'auto' : 'no'}
            frameBorder="0"
            style={{
              width: w + 'px',
              height: h + 'px',
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          />
          <span className="pd-fig-label">FIG · {num} / {name}</span>
        </>
      ) : (
        <FigLockGate num={num} name={name} onUnlock={unlock} />
      )}
    </div>
  )
}

// --- ProductRow ---

interface ProductRowProps {
  p: Product
  expanded: boolean
  onToggle: () => void
}

export default function ProductRow({ p, expanded, onToggle }: ProductRowProps) {
  return (
    <>
      <div className={`product ${expanded ? 'expanded' : ''}`} onClick={onToggle}>
        <div className="product-num">[{p.n}]</div>
        <div>
          <div className="product-name">{p.name}</div>
          <div className="product-codename">{p.code}</div>
        </div>
        <div className="product-desc">{p.desc}</div>
        <div className="product-specs">
          {p.specs.map((s) => (
            <div key={s.k} className="spec-row">
              <span className="k">{s.k}</span>
              <span className="v">{s.v}</span>
            </div>
          ))}
        </div>
        <div className="product-expand-row">
          <button
            type="button"
            className={`product-expand-btn ${expanded ? 'is-open' : ''}`}
            aria-expanded={expanded}
            onClick={(e) => { e.stopPropagation(); onToggle() }}
          >
            <span className="product-expand-tag">/ {expanded ? 'COLLAPSE' : 'EXPAND'}</span>
            <span className="product-expand-label">
              {expanded ? `Hide ${p.name} console` : `View ${p.name} console & features`}
            </span>
            <span className="product-expand-chev" aria-hidden="true">{expanded ? '▲' : '▼'}</span>
          </button>
        </div>
      </div>
      {expanded && (
        <div className="product-detail" style={{ display: 'block' }}>
          <div className="pd-grid">
            {p.figEnc ? (
              <FigFrame
                encSrc={p.figEnc}
                w={p.figW ?? 680}
                h={p.figH ?? 496}
                num={p.n}
                name={p.name}
                interactive={p.interactive}
              />
            ) : (
              <div className="placeholder pd-image">
                <span className="marker">FIG · {p.n}</span>
                <span>{p.name} OPERATOR CONSOLE</span>
              </div>
            )}
            <div className="pd-features">
              {p.features.map((f) => (
                <div key={f.n} className="pd-feature">
                  <span className="n">{f.n}</span>
                  <div>
                    <h5>{f.h}</h5>
                    <p>{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
