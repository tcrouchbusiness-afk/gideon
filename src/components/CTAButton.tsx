import { Link } from 'react-router-dom'
import { CSSProperties } from 'react'

interface CTAButtonProps {
  variant: 'primary' | 'ghost'
  label: string
  to?: string
  onClick?: () => void
  fullWidth?: boolean
  small?: boolean
}

export function CTAButton({ variant, label, to, onClick, fullWidth, small }: CTAButtonProps) {
  const base: CSSProperties = {
    display: 'inline-block',
    fontFamily: "'Barlow', sans-serif",
    fontWeight: 400,
    fontSize: small ? 9 : 10,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    padding: small ? '8px 18px' : '12px 26px',
    cursor: 'pointer',
    textDecoration: 'none',
    width: fullWidth ? '100%' : 'auto',
    textAlign: 'center',
    transition: 'opacity 0.2s ease',
    borderRadius: 0,
  }

  const style: CSSProperties =
    variant === 'primary'
      ? { ...base, background: '#2E6AB5', color: '#EBF2FF', border: 'none' }
      : {
          ...base,
          background: 'transparent',
          color: '#7A96B4',
          border: '1px solid rgba(74,143,214,0.35)',
        }

  if (to) {
    return (
      <Link to={to} style={style}>
        {label}
      </Link>
    )
  }
  return (
    <button style={style} onClick={onClick}>
      {label}
    </button>
  )
}
