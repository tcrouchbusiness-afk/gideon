interface DiamondMarkProps {
  size: number
  filled?: boolean
}

export function DiamondMark({ size, filled = true }: DiamondMarkProps) {
  const innerSize = Math.max(Math.round(size * 0.4), 3)
  return (
    <div
      style={{
        width: size,
        height: size,
        transform: 'rotate(45deg)',
        border: '1.5px solid #2E6AB5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        borderRadius: 2,
      }}
    >
      {filled && (
        <div
          style={{
            width: innerSize,
            height: innerSize,
            background: '#2E6AB5',
          }}
        />
      )}
    </div>
  )
}
