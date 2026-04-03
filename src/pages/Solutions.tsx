import { useState } from 'react'
import { motion } from 'framer-motion'
import { EyebrowTag } from '../components/EyebrowTag'
import { CTAButton } from '../components/CTAButton'
import { CornerBrackets } from '../components/CornerBrackets'
import { useCountUp } from '../hooks/useCountUp'

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
}

const SOLUTIONS = [
  {
    num: '01',
    title: 'Government & Defense',
    description:
      'Intelligence, counterintelligence, and cyber operations for federal agencies, defense contractors, and allied governments.',
    tags: 'SIGINT · CI · Cyber Effects · Cleared Personnel · FedRAMP',
  },
  {
    num: '02',
    title: 'Critical Infrastructure',
    description:
      'End-to-end protection for energy, utilities, water systems, transportation, and financial infrastructure.',
    tags: 'ICS/SCADA · Network Defense · Incident Response · OT Security',
  },
  {
    num: '03',
    title: 'Enterprise Cybersecurity',
    description:
      'Zero trust architecture, vulnerability assessment, network security, and threat intelligence programs for large organizations.',
    tags: 'Zero Trust · Pen Testing · Network Security · Threat Intel',
  },
  {
    num: '04',
    title: 'Executive & Personnel Security',
    description:
      'Protection programs for C-suite, board members, government officials, and high-value personnel.',
    tags: 'Executive Protection · Surveillance Detection · TSCM · Threat Assessment',
  },
]

const WHY = [
  {
    num: '01',
    title: 'Cleared Personnel Only',
    body: 'Every Gideon Dynamics operator holds active U.S. security clearances. Our engagements are handled by cleared professionals with operational backgrounds in government and defense.',
  },
  {
    num: '02',
    title: 'No Off-the-Shelf Solutions',
    body: 'Every engagement is purpose-built. We do not deploy templated frameworks. Each solution is scoped, developed, and executed to the precise requirements of the client environment.',
  },
  {
    num: '03',
    title: 'Operational Discretion',
    body: 'Gideon Dynamics does not publicize client relationships. We operate under strict NDAs and security protocols. Engagements are conducted with full operational discretion.',
  },
]

interface StatBarItemProps {
  label: string
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
  isLast: boolean
}

function StatBarItem({ label, value, suffix, prefix, decimals = 0, isLast }: StatBarItemProps) {
  const { ref, display } = useCountUp(value, decimals)
  return (
    <div
      ref={ref}
      style={{
        textAlign: 'center',
        padding: '0 32px',
        borderRight: isLast ? 'none' : '1px solid rgba(0,55,130,0.2)',
      }}
    >
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          color: '#1E3D6A',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: 10,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 300,
          fontSize: 42,
          color: '#D4E2F4',
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}
      >
        {prefix && <span style={{ color: '#5B9BD5' }}>{prefix}</span>}
        {display}
        {suffix && <span style={{ color: '#5B9BD5' }}>{suffix}</span>}
      </div>
    </div>
  )
}

function SolutionCard({ solution }: { solution: (typeof SOLUTIONS)[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#060A14',
        padding: 40,
        position: 'relative',
        cursor: 'default',
      }}
    >
      <CornerBrackets />
      <div style={{ width: 32, height: 2, background: '#2E6AB5', marginBottom: 16 }} />
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          color: '#1E3D6A',
          marginBottom: 12,
        }}
      >
        {solution.num}
      </div>
      <h3
        style={{
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 500,
          fontSize: 20,
          color: '#EBF2FF',
          marginBottom: 16,
        }}
      >
        {solution.title}
      </h3>
      <p
        style={{
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 400,
          fontSize: 14,
          lineHeight: 1.85,
          color: '#7A96B4',
          marginBottom: 20,
        }}
      >
        {solution.description}
      </p>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          color: '#4A6B8A',
          marginBottom: 20,
        }}
      >
        {solution.tags}
      </div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: '#5B9BD5',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
      >
        Explore →
      </div>
    </div>
  )
}

export default function Solutions() {
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* Hero */}
      <section
        style={{ padding: '160px 80px 80px', textAlign: 'center' }}
        className="section-pad"
      >
        <motion.div {...fadeUp} style={{ display: 'flex', justifyContent: 'center' }}>
          <EyebrowTag text="SOLUTIONS" />
        </motion.div>
        <motion.h1
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 300,
            fontSize: 48,
            color: '#EBF2FF',
            letterSpacing: '-0.01em',
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          Engineered for High-Stakes Environments.
        </motion.h1>
        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 400,
            fontSize: 14,
            color: '#7A96B4',
            maxWidth: 520,
            margin: '0 auto',
            lineHeight: 1.8,
          }}
        >
          Purpose-built solutions for the most demanding operational environments. Every engagement
          is scoped, developed, and executed to the precise requirements of the client.
        </motion.p>
      </section>

      {/* Solutions Grid */}
      <section
        style={{ padding: '0 80px 80px', position: 'relative', zIndex: 1 }}
        className="section-pad"
      >
        <div
          className="two-by-two"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 1,
            background: 'rgba(0,55,130,0.15)',
          }}
        >
          {SOLUTIONS.map((solution, i) => (
            <motion.div
              key={solution.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <SolutionCard solution={solution} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Gideon Dynamics */}
      <section
        style={{
          background: '#060A14',
          padding: '96px 80px',
          position: 'relative',
          zIndex: 1,
        }}
        className="section-pad"
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 0,
          }}
          className="three-col"
        >
          {WHY.map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                padding: '40px 36px',
                borderRight: i < 2 ? '1px solid rgba(0,55,130,0.2)' : 'none',
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9,
                  color: '#1E3D6A',
                  marginBottom: 16,
                }}
              >
                {item.num}
              </div>
              <h3
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 500,
                  fontSize: 16,
                  color: '#EBF2FF',
                  marginBottom: 14,
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 400,
                  fontSize: 13,
                  lineHeight: 1.85,
                  color: '#7A96B4',
                }}
              >
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Bar */}
      <section
        style={{
          background: '#03060D',
          borderTop: '1px solid rgba(0,55,130,0.2)',
          borderBottom: '1px solid rgba(0,55,130,0.2)',
          padding: '40px 80px',
          position: 'relative',
          zIndex: 1,
        }}
        className="section-pad"
      >
        <div
          className="stats-bar"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}
        >
          {[
            { label: 'Threats Neutralized', value: 48, suffix: 'K+' },
            { label: 'Nations Monitored', value: 140, suffix: '+' },
            { label: 'Detection Response', value: 4, prefix: '<', suffix: 'ms' },
            { label: 'Platform Uptime', value: 99.99, suffix: '%', decimals: 2 },
          ].map((stat, i) => (
            <StatBarItem key={stat.label} {...stat} isLast={i === 3} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: '#03060D',
          padding: '80px 80px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
        className="section-pad"
      >
        <motion.div {...fadeUp}>
          <h2
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 300,
              fontSize: 36,
              color: '#EBF2FF',
              letterSpacing: '-0.01em',
              marginBottom: 16,
            }}
          >
            Schedule Your Assessment
          </h2>
          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 400,
              fontSize: 14,
              color: '#7A96B4',
              marginBottom: 32,
            }}
          >
            All engagements begin with a confidential assessment. Cleared personnel only.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <CTAButton variant="primary" label="Request Briefing" to="/about#contact" />
            <CTAButton variant="ghost" label="Schedule Assessment" to="/about#contact" />
          </div>
        </motion.div>
      </section>
    </div>
  )
}
