interface EyebrowTagProps {
  text: string
  blinkCursor?: boolean
}

export function EyebrowTag({ text, blinkCursor = false }: EyebrowTagProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div
        style={{
          width: 18,
          height: 1,
          background: '#5B9BD5',
          flexShrink: 0,
        }}
      />
      <span
        className={blinkCursor ? 'blink-cursor' : undefined}
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          color: '#5B9BD5',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
        }}
      >
        {text}
      </span>
    </div>
  )
}
