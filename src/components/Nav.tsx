import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { DiamondMark } from './DiamondMark'
import { CTAButton } from './CTAButton'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Capabilities', to: '/capabilities' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'About', to: '/about' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: 'rgba(3,6,13,0.9)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: scrolled
            ? '1px solid rgba(0,55,130,0.38)'
            : '1px solid transparent',
          transition: 'border-bottom-color 0.3s ease',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 80px',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            textDecoration: 'none',
          }}
        >
          <DiamondMark size={20} />
          <div>
            <div
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 500,
                fontSize: 13,
                letterSpacing: '0.22em',
                color: '#EBF2FF',
              }}
            >
              GIDEON DYNAMICS
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 8,
                letterSpacing: '0.22em',
                color: '#1E3D6A',
              }}
            >
              Intelligence · Defense · Cyber Operations
            </div>
          </div>
        </Link>

        {/* Center links */}
        <div
          className="nav-center-links"
          style={{ display: 'flex', gap: 32 }}
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className="nav-link"
              style={({ isActive }) => ({
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 400,
                fontSize: 10,
                letterSpacing: '0.18em',
                textTransform: 'uppercase' as const,
                color: isActive ? '#D4E2F4' : '#7A96B4',
                textDecoration: 'none',
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Right CTA */}
        <div className="nav-cta">
          <CTAButton variant="ghost" label="Request Briefing" to="/about#contact" small />
        </div>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: 5,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 22,
                height: 1,
                background: '#7A96B4',
                transition: 'opacity 0.2s',
                opacity: mobileOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: '#03060D',
              zIndex: 99,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 32,
            }}
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMobileOpen(false)}
                style={({ isActive }) => ({
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase' as const,
                  color: isActive ? '#D4E2F4' : '#7A96B4',
                  textDecoration: 'none',
                })}
              >
                {link.label}
              </NavLink>
            ))}
            <div style={{ marginTop: 16 }}>
              <CTAButton
                variant="primary"
                label="Request Briefing"
                to="/about#contact"
                onClick={() => setMobileOpen(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
