export function GridOverlay() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        backgroundImage: [
          'linear-gradient(rgba(0,82,204,0.03) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(0,82,204,0.03) 1px, transparent 1px)',
        ].join(', '),
        backgroundSize: '44px 44px',
      }}
    />
  )
}
