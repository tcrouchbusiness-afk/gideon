import { EyebrowTag } from './EyebrowTag'

interface SectionHeaderProps {
  eyebrow: string
  title: string
  counter?: string
  centered?: boolean
}

export function SectionHeader({ eyebrow, title, counter, centered = false }: SectionHeaderProps) {
  return (
    <div
      style={{
        marginBottom: 48,
        textAlign: centered ? 'center' : 'left',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: centered ? 'center' : 'space-between',
          marginBottom: 16,
          gap: centered ? 0 : undefined,
        }}
      >
        <EyebrowTag text={eyebrow} />
        {counter && !centered && (
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              color: '#1E3D6A',
              letterSpacing: '0.22em',
            }}
          >
            {counter}
          </span>
        )}
      </div>
      <h2
        style={{
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 300,
          fontSize: 32,
          color: '#EBF2FF',
          letterSpacing: '-0.01em',
          lineHeight: 1.2,
        }}
      >
        {title}
      </h2>
    </div>
  )
}
