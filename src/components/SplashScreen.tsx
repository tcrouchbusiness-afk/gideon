import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DiamondMark } from './DiamondMark'

const HEX_CHARS = '0123456789ABCDEF'
const TITLE = 'GIDEON DYNAMICS'
const CYCLES_PER_CHAR = 4
const CYCLE_MS = 35
const STAGGER_MS = 85

function randomHex() {
  return HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)]
}

interface SplashScreenProps {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [visible, setVisible] = useState(true)
  const [chars, setChars] = useState<string[]>(
    TITLE.split('').map(() => '\u00A0'),
  )
  const [sublineVisible, setSublineVisible] = useState(false)

  useEffect(() => {
    sessionStorage.setItem('gd-splash-shown', '1')

    const titleChars = TITLE.split('')

    titleChars.forEach((char, i) => {
      const startDelay = i * STAGGER_MS

      for (let cycle = 0; cycle < CYCLES_PER_CHAR; cycle++) {
        setTimeout(() => {
          setChars((prev) => {
            const next = [...prev]
            next[i] = char === ' ' ? ' ' : randomHex()
            return next
          })
        }, startDelay + cycle * CYCLE_MS)
      }

      setTimeout(() => {
        setChars((prev) => {
          const next = [...prev]
          next[i] = char
          return next
        })
      }, startDelay + CYCLES_PER_CHAR * CYCLE_MS)
    })

    const textResolveDuration =
      (titleChars.length - 1) * STAGGER_MS + CYCLES_PER_CHAR * CYCLE_MS

    setTimeout(() => setSublineVisible(true), textResolveDuration + 150)

    const holdEnd = textResolveDuration + 650
    setTimeout(() => setVisible(false), holdEnd)
    setTimeout(() => onComplete(), holdEnd + 450)
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#03060D',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            overflow: 'hidden',
          }}
        >
          {/* Scan line */}
          <motion.div
            initial={{ top: '-1px' }}
            animate={{ top: '100%' }}
            transition={{ duration: 1.5, ease: 'linear', delay: 0.2 }}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              height: 1,
              background: 'rgba(91,155,213,0.3)',
              pointerEvents: 'none',
            }}
          />

          {/* Diamond */}
          <motion.div
            initial={{ scale: 0.7 }}
            animate={{ scale: [0.7, 1.25, 1] }}
            transition={{ duration: 0.8, times: [0, 0.6, 1], ease: 'easeOut' }}
            style={{ marginBottom: 28 }}
          >
            <DiamondMark size={44} />
          </motion.div>

          {/* Title */}
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              letterSpacing: '0.32em',
              color: '#5B9BD5',
              textTransform: 'uppercase',
              minWidth: '220px',
              textAlign: 'center',
            }}
          >
            {chars.join('')}
          </div>

          {/* Subline */}
          <motion.div
            animate={{ opacity: sublineVisible ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 8,
              letterSpacing: '0.3em',
              color: '#1E3D6A',
              textTransform: 'uppercase',
              marginTop: 14,
            }}
          >
            INTELLIGENCE · DEFENSE · CYBER OPERATIONS
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
