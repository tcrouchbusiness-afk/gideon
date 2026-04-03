import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCountUp } from '../hooks/useCountUp'
import { EyebrowTag } from '../components/EyebrowTag'
import { SectionHeader } from '../components/SectionHeader'
import { CapabilityTag } from '../components/CapabilityTag'
import { CTAButton } from '../components/CTAButton'
import { StatPanel } from '../components/StatPanel'
import { CornerBrackets } from '../components/CornerBrackets'
import { DiamondMark } from '../components/DiamondMark'

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
}

const DOMAINS = [
  {
    id: 1,
    title: 'Signals Intelligence',
    rows: [
      { name: 'End-to-End SIGINT', tag: 'TIER 1', sub: 'Tactical collection and strategic analysis across all signal domains' },
      { name: 'Rapid OSINT Operations', tag: 'PERSISTENT', sub: 'Enhanced open-source intelligence at scale' },
      { name: 'Pattern-of-Life Analysis', tag: 'STRATEGIC', sub: 'Behavioral mapping and predictive threat modeling' },
    ],
  },
  {
    id: 2,
    title: 'Counterintelligence',
    rows: [
      { name: 'Full-Spectrum Assessment', tag: 'RED TEAM', sub: 'Cyber, physical, and protocol stress testing' },
      { name: 'Executive Protection', tag: 'ACTIVE', sub: 'Vulnerability assessment and defensive surveillance detection' },
      { name: 'Insider Threat Detection', tag: 'PERSISTENT', sub: 'Behavioral indicators fused with network anomaly analysis' },
    ],
  },
  {
    id: 3,
    title: 'Cyber Operations',
    rows: [
      { name: 'Autonomous Network Penetration', tag: 'OFFENSIVE', sub: 'Zero-day discovery and adaptive cyber effects' },
      { name: 'Critical Infrastructure Defense', tag: 'TIER 1', sub: 'ICS/SCADA hardening and grid resilience' },
      { name: 'Network Security & Encryption', tag: 'DEFENSIVE', sub: 'Zero trust architecture, segmentation, and E2E encryption' },
    ],
  },
]

const CYBER_CARDS = [
  {
    name: 'Network Security & Defense',
    description: 'Continuous monitoring, intrusion detection, firewall management, and real-time threat response across enterprise and classified networks.',
    tags: 'IDS/IPS · Firewall Management · Threat Monitoring · SOC Support',
  },
  {
    name: 'Encryption & Secure Communications',
    description: 'End-to-end encryption architecture, key management infrastructure, and secure communications protocols for sensitive environments.',
    tags: 'E2E Encryption · PKI · Key Management · Secure Comms',
  },
  {
    name: 'Vulnerability Assessment & Pen Testing',
    description: 'Comprehensive vulnerability scanning, manual penetration testing, and remediation roadmaps for networks, applications, and infrastructure.',
    tags: 'VAPT · Web App Security · Red Team · Remediation',
  },
  {
    name: 'Incident Response & Forensics',
    description: 'Rapid containment, forensic analysis, and recovery operations for active breaches and post-incident investigations.',
    tags: 'IR · Digital Forensics · Malware Analysis · Recovery',
  },
  {
    name: 'Cloud & Hybrid Security',
    description: 'Security architecture and continuous compliance for AWS, Azure, GCP, and hybrid cloud environments.',
    tags: 'Cloud Security · CSPM · Compliance · Architecture',
  },
  {
    name: 'Data Management & Analysis',
    description: 'Secure data pipelines, encrypted storage, and advanced analytical tooling for operational and intelligence environments.',
    tags: 'Data Fusion · Encrypted Storage · Analytics · Pipeline Security',
  },
]

interface DomainRowProps {
  name: string
  tag: string
  sub: string
  isLast: boolean
}

function DomainRow({ name, tag, sub, isLast }: DomainRowProps) {
  const [active, setActive] = useState(false)

  return (
    <div
      onClick={() => setActive(!active)}
      style={{
        padding: '13px 24px',
        borderBottom: isLast ? 'none' : '1px solid rgba(0,40,100,0.15)',
        borderLeft: active ? '2px solid #4D8FD6' : '2px solid transparent',
        background: active ? 'rgba(0,28,70,0.45)' : 'transparent',
        cursor: 'pointer',
        transition: 'background 0.2s ease',
      }}
      onMouseEnter={(e) => {
        if (!active) (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,40,100,0.18)'
      }}
      onMouseLeave={(e) => {
        if (!active) (e.currentTarget as HTMLDivElement).style.background = 'transparent'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <span style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 500, fontSize: 12, color: '#D4E2F4' }}>
          {name}
        </span>
        <CapabilityTag label={tag} />
      </div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#4A6B8A' }}>
        {sub}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* Section 1 — Hero */}
      <section
        style={{
          minHeight: '100vh',
          padding: '100px 80px 80px',
          display: 'grid',
          gridTemplateColumns: '60% 40%',
          gap: 64,
          alignItems: 'center',
        }}
        className="hero-grid hero-pad"
      >
        {/* Left */}
        <div>
          <motion.div {...fadeUp} style={{ marginBottom: 24 }}>
            <EyebrowTag text="[ TIER 1 THREAT RESPONSE ]" blinkCursor />
          </motion.div>

          <div style={{ marginBottom: 28 }}>
            {['Persistent', 'Adversary', 'Dominance.'].map((line, i) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 * i,
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <div
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontWeight: i === 2 ? 500 : 300,
                    fontSize: 52,
                    letterSpacing: '-0.02em',
                    color: '#EBF2FF',
                    lineHeight: 1.1,
                  }}
                >
                  {line}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.35 }}
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 400,
              fontSize: 14,
              lineHeight: 1.9,
              color: '#7A96B4',
              maxWidth: 460,
              marginBottom: 32,
            }}
          >
            Gideon Dynamics delivers nation-grade signals intelligence, full-spectrum counterintelligence,
            and autonomous cyber operations to governments, defense contractors, and critical infrastructure
            operators worldwide.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.45 }}
            style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}
          >
            <CTAButton variant="primary" label="Request Briefing" to="/about#contact" />
            <CTAButton variant="ghost" label="View Capabilities" to="/capabilities" />
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.55 }}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              color: '#1E3D6A',
              letterSpacing: '0.2em',
            }}
          >
            ◆ FedRAMP Authorized&nbsp;&nbsp;◆ DoD IL4&nbsp;&nbsp;◆ CMMC Level 3&nbsp;&nbsp;◆ SOC 2 Type II
          </motion.div>
        </div>

        {/* Right — Stats */}
        <div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 16,
              marginBottom: 20,
            }}
          >
            <StatPanel label="Threats Neutralized" value={48} suffix="K+" />
            <StatPanel label="Response Time" value={4} prefix="<" suffix="ms" />
            <StatPanel label="Uptime SLA" value={99.99} suffix="%" decimals={2} />
            <StatPanel label="Endpoints Protected" value={2.1} suffix="M" decimals={1} />
          </div>

          {/* Operational status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              className="pulse-dot"
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#00C47A',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: '#2A4E6E',
              }}
            >
              All systems operational — threat level nominal
            </span>
          </div>
        </div>
      </section>

      {/* Section 2 — Integrated Defense Systems */}
      <section
        style={{
          background: '#060A14',
          padding: '96px 80px',
          position: 'relative',
          zIndex: 1,
        }}
        className="section-pad"
      >
        <motion.div {...fadeUp}>
          <SectionHeader
            eyebrow="OPERATIONAL DOMAINS"
            title="Integrated Defense Systems"
            counter="03 DOMAINS"
          />
        </motion.div>

        <motion.div
          {...fadeUp}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            border: '1px solid rgba(0,55,130,0.26)',
          }}
          className="three-col"
        >
          {DOMAINS.map((domain, di) => (
            <div
              key={domain.id}
              style={{
                borderRight: di < 2 ? '1px solid rgba(0,55,130,0.26)' : 'none',
              }}
            >
              {/* Domain header */}
              <div
                style={{
                  background: 'rgba(0,18,45,0.55)',
                  borderBottom: '1px solid rgba(0,55,130,0.22)',
                  padding: '18px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <DiamondMark size={7} />
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    color: '#1E3D6A',
                    marginRight: 4,
                  }}
                >
                  0{domain.id}
                </span>
                <span
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontWeight: 500,
                    fontSize: 10,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: '#8AACCC',
                  }}
                >
                  {domain.title}
                </span>
              </div>

              {/* Rows */}
              {domain.rows.map((row, ri) => (
                <DomainRow
                  key={row.name}
                  name={row.name}
                  tag={row.tag}
                  sub={row.sub}
                  isLast={ri === domain.rows.length - 1}
                />
              ))}
            </div>
          ))}
        </motion.div>

        {/* Footer row */}
        <div
          style={{
            borderTop: '1px solid rgba(0,55,130,0.22)',
            padding: '14px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
            marginTop: 0,
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              color: '#1E3D6A',
            }}
          >
            All capabilities subject to client clearance verification
          </span>
          <CTAButton variant="ghost" label="Schedule Assessment" to="/about#contact" small />
        </div>
      </section>

      {/* Section 3 — Stats Bar */}
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
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
          }}
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

      {/* Section 4 — General Cybersecurity */}
      <section
        style={{
          background: '#060A14',
          padding: '96px 80px',
          position: 'relative',
          zIndex: 1,
        }}
        className="section-pad"
      >
        <motion.div {...fadeUp}>
          <SectionHeader eyebrow="CYBER DEFENSE" title="Comprehensive Network Security" />
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1,
            background: 'rgba(0,55,130,0.1)',
          }}
          className="three-col"
        >
          {CYBER_CARDS.map((card, i) => (
            <motion.div
              key={card.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                background: 'rgba(0,12,30,0.8)',
                border: '1px solid rgba(0,55,130,0.26)',
                padding: 28,
                position: 'relative',
              }}
            >
              <CornerBrackets />
              <div style={{ width: 32, height: 2, background: '#2E6AB5', marginBottom: 16 }} />
              <h3
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 500,
                  fontSize: 15,
                  color: '#EBF2FF',
                  marginBottom: 12,
                }}
              >
                {card.name}
              </h3>
              <p
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 400,
                  fontSize: 13,
                  lineHeight: 1.8,
                  color: '#7A96B4',
                  marginBottom: 16,
                }}
              >
                {card.description}
              </p>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9,
                  color: '#4A6B8A',
                }}
              >
                {card.tags}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 5 — CTA Banner */}
      <section
        style={{
          background: '#03060D',
          borderTop: '1px solid rgba(0,55,130,0.28)',
          padding: '96px 80px',
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
              fontSize: 40,
              color: '#EBF2FF',
              letterSpacing: '-0.01em',
              marginBottom: 20,
              maxWidth: 640,
              margin: '0 auto 20px',
            }}
          >
            Built for Environments Where Failure Is Not an Option.
          </h2>
          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 400,
              fontSize: 14,
              color: '#7A96B4',
              marginBottom: 36,
            }}
          >
            Nation-grade capabilities. Operational precision. Zero tolerance for compromise.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 16,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <CTAButton variant="primary" label="Request Briefing" to="/about#contact" />
            <CTAButton variant="ghost" label="View Capabilities" to="/capabilities" />
          </div>
        </motion.div>
      </section>
    </div>
  )
}

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
