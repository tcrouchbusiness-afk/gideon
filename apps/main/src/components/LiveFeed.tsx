import { useState, useEffect } from 'react'
import { FEED_SAMPLES, FeedItem } from '../data/feed'

const fmtTs = (d: Date): string =>
  `${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}:${String(d.getUTCSeconds()).padStart(2, '0')}Z`

const seedFeed = (count = 12): (FeedItem & { ts: string })[] => {
  const now = Date.now()
  const out: (FeedItem & { ts: string })[] = []
  for (let i = 0; i < count; i++) {
    const sample = FEED_SAMPLES[(i * 3 + 1) % FEED_SAMPLES.length]
    // back-date each entry ~1.8s apart so the feed looks like it's been running
    out.push({ ...sample, ts: fmtTs(new Date(now - i * 1800)) })
  }
  return out
}

export function Ticker() {
  const items = [...FEED_SAMPLES, ...FEED_SAMPLES]
  return (
    <div className="ticker">
      <div className="ticker-track">
        {items.map((it, i) => (
          <div key={i} className="ticker-item">
            <span className={`dot ${it.sev}`}></span>
            <span className="dimmer">{it.code}</span>
            <span className="dim">{it.region}</span>
            <span>{it.msg}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function LiveFeed() {
  const [lines, setLines] = useState<(FeedItem & { ts: string })[]>(() => seedFeed(12))

  useEffect(() => {
    const id = setInterval(() => {
      setLines(prev => {
        const next = FEED_SAMPLES[Math.floor(Math.random() * FEED_SAMPLES.length)]
        return [{ ...next, ts: fmtTs(new Date()) }, ...prev].slice(0, 12)
      })
    }, 1800)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="feed-tile">
      <div className="head">
        <span className="live"><span className="dot"></span>LIVE · GLOBAL THREAT FEED</span>
        <span className="dimmer">REDOUBT://feed/global</span>
      </div>
      <div className="feed-lines">
        {lines.map((l, i) => (
          <div key={`${l.ts}-${i}`} className="feed-line" style={{ opacity: Math.max(0.25, 1 - i * 0.06) }}>
            <span className="dimmer">{l.ts}</span>
            <span className={l.sev}>{l.code}</span>
            <span>{l.msg}</span>
            <span className="dimmer" style={{ textAlign: 'right' }}>{l.region}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
