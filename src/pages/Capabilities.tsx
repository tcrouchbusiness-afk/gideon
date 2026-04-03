import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EyebrowTag } from '../components/EyebrowTag'
import { SectionHeader } from '../components/SectionHeader'
import { CapabilityTag } from '../components/CapabilityTag'
import { CTAButton } from '../components/CTAButton'
import { CornerBrackets } from '../components/CornerBrackets'
import { DiamondMark } from '../components/DiamondMark'
import { useCountUp } from '../hooks/useCountUp'

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
    count: '03 CAPABILITIES',
    capabilities: [
      {
        tag: 'TIER 1',
        name: 'End-to-End SIGINT',
        description:
          'Full tactical collection and strategic analysis across all signal domains.',
        sub: 'Tactical SIGINT, Strategic analysis, Theater-level collection, Multi-INT fusion',
      },
      {
        tag: 'PERSISTENT',
        name: 'Rapid OSINT Operations',
        description:
          'Enhanced open-source intelligence gathering at speed and scale.',
        sub: 'Social media exploitation, Dark web monitoring, Entity resolution, Source validation',
      },
      {
        tag: 'STRATEGIC',
        name: 'Pattern-of-Life Analysis',
        description:
          'Behavioral mapping and predictive threat modeling across target sets.',
        sub: 'Movement analysis, Routine profiling, Anomaly detection, Predictive modeling',
      },
    ],
  },
  {
    id: 2,
    title: 'Counterintelligence',
    count: '03 CAPABILITIES',
    capabilities: [
      {
        tag: 'RED TEAM',
        name: 'Full-Spectrum Security Assessment',
        description:
          'Combined cyber, physical, and security protocol stress testing.',
        sub: 'Cyber penetration, Physical intrusion, Protocol stress tests, Security posture review',
      },
      {
        tag: 'ACTIVE',
        name: 'Executive Protection Program',
        description:
          'Comprehensive vulnerability assessment and defensive surveillance for senior personnel and high-value assets.',
        sub: 'Threat assessment, Route analysis, Surveillance detection, Safe house coordination',
      },
      {
        tag: 'PERSISTENT',
        name: 'Insider Threat Detection',
        description:
          'Behavioral and technical indicator fusion for insider threat identification and mitigation.',
        sub: 'Behavioral profiling, Access anomaly detection, Exfiltration monitoring, HR coordination',
      },
    ],
  },
  {
    id: 3,
    title: 'Cyber Operations',
    count: '03 CAPABILITIES',
    capabilities: [
      {
        tag: 'OFFENSIVE',
        name: 'Autonomous Network Penetration',
        description:
          'Automated and manual zero-day discovery with adaptive cyber effects deployment.',
        sub: 'Zero-day research, Exploit development, Tailored payload delivery, Adversary AI spoofing',
      },
      {
        tag: 'TIER 1',
        name: 'Critical Infrastructure Defense',
        description:
          'Hardening for ICS/SCADA environments, power grids, water systems, and critical facilities.',
        sub: 'ICS/SCADA security, Grid resilience, Facility hardening, OT/IT convergence',
      },
      {
        tag: 'STRATEGIC',
        name: 'Offensive Information Operations',
        description:
          'Influence operation detection, counter-disinformation, and offensive narrative capabilities.',
        sub: 'Influence op mapping, Narrative disruption, Attribution analysis, Information effects',
      },
    ],
  },
]

const CYBER_CARDS = [
  {
    name: 'Network Security & Defense',
    description:
      'Continuous monitoring, intrusion detection, firewall management, and real-time threat response across enterprise and classified networks.',
    tags: 'IDS/IPS · Firewall Management · Threat Monitoring · SOC Support',
  },
  {
    name: 'Encryption & Secure Communications',
    description:
      'End-to-end encryption architecture, key management infrastructure, and secure communications protocols for sensitive environments.',
    tags: 'E2E Encryption · PKI · Key Management · Secure Comms',
  },
  {
    name: 'Vulnerability Assessment & Pen Testing',
    description:
      'Comprehensive vulnerability scanning, manual penetration testing, and remediation roadmaps for networks, applications, and infrastructure.',
    tags: 'VAPT · Web App Security · Red Team · Remediation',
  },
  {
    name: 'Incident Response & Forensics',
    description:
      'Rapid containment, forensic analysis, and recovery operations for active breaches and post-incident investigations.',
    tags: 'IR · Digital Forensics · Malware Analysis · Recovery',
  },
  {
    name: 'Cloud & Hybrid Security',
    description:
      'Security architecture and continuous compliance for AWS, Azure, GCP, and hybrid cloud environments.',
    tags: 'Cloud Security · CSPM · Compliance · Architecture',
  },
  {
    name: 'Data Management & Analysis',
    description:
      'Secure data pipelines, encrypted storage, and advanced analytical tooling for operational and intelligence environments.',
    tags: 'Data Fusion · Encrypted Storage · Analytics · Pipeline Security',
  },
]

interface AccordionDomainProps {
  domain: (typeof DOMAINS)[0]
  defaultOpen?: boolean
}

function AccordionDomain({ domain, defaultOpen = false }: AccordionDomainProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div style={{ marginBottom: 1 }}>
      {/* Header */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          background: open ? 'rgba(0,28,70,0.4)' : 'rgba(0,18,45,0.6)',
          border: '1px solid rgba(0,55,130,0.32)',
          padding: '22px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          transition: 'background 0.2s ease',
        }}
        onMouseEnter={(e) => {
          if (!open) (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,28,70,0.4)'
        }}
        onMouseLeave={(e) => {
          if (!open) (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,18,45,0.6)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <DiamondMark size={14} />
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
              fontSize: 18,
              color: '#EBF2FF',
            }}
          >
            {domain.title}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              color: '#1E3D6A',
            }}
          >
            {domain.count}
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
              color: '#2E6AB5',
            }}
          >
            <path
              d="M3 6l5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
          </svg>
        </div>
      </div>

      {/* Expanded panel */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 1,
                background: 'rgba(0,55,130,0.1)',
                padding: 1,
              }}
              className="two-col"
            >
              {domain.capabilities.map((cap) => (
                <div
                  key={cap.name}
                  style={{
                    background: '#060A14',
                    padding: '28px 32px',
                  }}
                >
                  <div style={{ marginBottom: 12 }}>
                    <CapabilityTag label={cap.tag} />
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Barlow', sans-serif",
                      fontWeight: 500,
                      fontSize: 15,
                      color: '#EBF2FF',
                      marginBottom: 10,
                    }}
                  >
                    {cap.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Barlow', sans-serif",
                      fontWeight: 400,
                      fontSize: 13,
                      lineHeight: 1.85,
                      color: '#7A96B4',
                      marginBottom: 14,
                    }}
                  >
                    {cap.description}
                  </p>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      color: '#4A6B8A',
                    }}
                  >
                    {cap.sub}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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

export default function Capabilities() {
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* Hero */}
      <section
        style={{
          paddingTop: 160,
          paddingBottom: 80,
          textAlign: 'center',
          padding: '160px 80px 80px',
        }}
        className="section-pad"
      >
        <motion.div {...fadeUp}>
          <EyebrowTag text="OPERATIONAL CAPABILITIES" />
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
          Full-Spectrum Defense Architecture
        </motion.h1>
        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 400,
            fontSize: 14,
            color: '#7A96B4',
            maxWidth: 560,
            margin: '0 auto',
            lineHeight: 1.8,
          }}
        >
          Every capability is purpose-built for high-stakes operational environments. From strategic
          intelligence collection to autonomous cyber effects, Gideon Dynamics operates at the
          frontier of what is technically possible.
        </motion.p>
      </section>

      {/* Accordion */}
      <section
        style={{ padding: '0 80px 80px', position: 'relative', zIndex: 1 }}
        className="section-pad"
      >
        {DOMAINS.map((domain, i) => (
          <AccordionDomain key={domain.id} domain={domain} defaultOpen={i === 0} />
        ))}
      </section>

      {/* General Cybersecurity */}
      <section
        style={{
          background: '#060A14',
          padding: '80px 80px',
          position: 'relative',
          zIndex: 1,
        }}
        className="section-pad"
      >
        <motion.div {...fadeUp}>
          <SectionHeader
            eyebrow="CYBER DEFENSE SERVICES"
            title="Network Security & General Cybersecurity"
          />
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
            Ready to Assess Your Exposure?
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
            Begin with a confidential briefing. Our team will assess your current posture and identify
            critical gaps.
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
