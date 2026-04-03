import { Link } from 'react-router-dom'
import { DiamondMark } from './DiamondMark'
import { CTAButton } from './CTAButton'

const CAPABILITIES = [
  'Signals Intelligence',
  'Counterintelligence',
  'Cyber Operations',
  'Network Security',
  'OSINT',
]

const SOLUTIONS = [
  'Government & Defense',
  'Critical Infrastructure',
  'Enterprise Security',
  'Executive Protection',
]

export function Footer() {
  return (
    <footer
      style={{
        background: '#02040A',
        borderTop: '1px solid rgba(0,55,130,0.25)',
        padding: '64px 80px 32px',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div
        className="footer-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
          gap: 48,
          marginBottom: 48,
        }}
      >
        {/* Col 1 — Brand */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 16,
            }}
          >
            <DiamondMark size={20} />
            <span
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 500,
                fontSize: 13,
                letterSpacing: '0.22em',
                color: '#EBF2FF',
              }}
            >
              GIDEON DYNAMICS
            </span>
          </div>
          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 300,
              fontSize: 13,
              color: '#7A96B4',
              marginBottom: 20,
              lineHeight: 1.7,
            }}
          >
            Persistent Adversary Dominance.
          </p>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 8,
              color: '#1E3D6A',
              letterSpacing: '0.16em',
              lineHeight: 2,
            }}
          >
            FedRAMP Authorized<br />
            DoD IL4 · CMMC Level 3<br />
            SOC 2 Type II
          </div>
        </div>

        {/* Col 2 — Capabilities */}
        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              color: '#1E3D6A',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: 20,
            }}
          >
            Capabilities
          </div>
          {CAPABILITIES.map((item) => (
            <div key={item} style={{ marginBottom: 10 }}>
              <Link
                to="/capabilities"
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 12,
                  color: '#7A96B4',
                  textDecoration: 'none',
                }}
              >
                {item}
              </Link>
            </div>
          ))}
        </div>

        {/* Col 3 — Solutions */}
        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              color: '#1E3D6A',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: 20,
            }}
          >
            Solutions
          </div>
          {SOLUTIONS.map((item) => (
            <div key={item} style={{ marginBottom: 10 }}>
              <Link
                to="/solutions"
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 12,
                  color: '#7A96B4',
                  textDecoration: 'none',
                }}
              >
                {item}
              </Link>
            </div>
          ))}
        </div>

        {/* Col 4 — Contact */}
        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              color: '#1E3D6A',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: 20,
            }}
          >
            Contact
          </div>
          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 12,
              color: '#7A96B4',
              marginBottom: 8,
            }}
          >
            Washington D.C. Metro Area
          </p>
          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 12,
              color: '#7A96B4',
              marginBottom: 20,
            }}
          >
            Engagements by referral only
          </p>
          <CTAButton
            variant="ghost"
            label="Request Briefing"
            to="/about#contact"
            small
          />
        </div>
      </div>

      {/* Bottom row */}
      <div
        style={{
          borderTop: '1px solid rgba(0,55,130,0.18)',
          paddingTop: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: 11,
            color: '#1E3D6A',
          }}
        >
          © {new Date().getFullYear()} Gideon Dynamics LLC. All rights reserved.
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 8,
            color: '#1E3D6A',
            letterSpacing: '0.16em',
          }}
        >
          All communications encrypted · Personnel clearances verified · ITAR compliant
        </span>
      </div>
    </footer>
  )
}
