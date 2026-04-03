import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { CornerBrackets } from './CornerBrackets'

interface StatPanelProps {
  label: string
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
}

export function StatPanel({ label, value, suffix, prefix, decimals = 0 }: StatPanelProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    const startTime = performance.now()
    const duration = 1200

    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 2)
      setCount(eased * value)
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [isInView, value])

  const displayValue =
    decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toString()

  return (
    <div
      ref={ref}
      style={{
        background: 'rgba(0,12,30,0.85)',
        border: '1px solid rgba(0,55,130,0.28)',
        padding: '24px',
        position: 'relative',
      }}
    >
      <CornerBrackets />
      <div style={{ width: 32, height: 2, background: '#2E6AB5', marginBottom: 14 }} />
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          letterSpacing: '0.22em',
          color: '#1E3D6A',
          marginBottom: 8,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 300,
          fontSize: 36,
          letterSpacing: '-0.02em',
          color: '#D4E2F4',
          lineHeight: 1,
        }}
      >
        {prefix && <span style={{ color: '#5B9BD5' }}>{prefix}</span>}
        {displayValue}
        {suffix && <span style={{ color: '#5B9BD5' }}>{suffix}</span>}
      </div>
    </div>
  )
}
