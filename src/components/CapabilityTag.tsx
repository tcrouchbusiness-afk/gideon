interface CapabilityTagProps {
  label: string
}

export function CapabilityTag({ label }: CapabilityTagProps) {
  return (
    <span
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 8,
        letterSpacing: '0.18em',
        color: '#7AAED4',
        border: '1px solid rgba(74,143,214,0.22)',
        padding: '2px 8px',
        textTransform: 'uppercase',
        display: 'inline-block',
      }}
    >
      {label}
    </span>
  )
}
