export function CornerBrackets() {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 16,
          height: 16,
          borderTop: '1px solid rgba(74,143,214,0.22)',
          borderLeft: '1px solid rgba(74,143,214,0.22)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 16,
          height: 16,
          borderBottom: '1px solid rgba(74,143,214,0.22)',
          borderRight: '1px solid rgba(74,143,214,0.22)',
          pointerEvents: 'none',
        }}
      />
    </>
  )
}
