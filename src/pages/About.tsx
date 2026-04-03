import { useState } from 'react'
import { motion } from 'framer-motion'
import { EyebrowTag } from '../components/EyebrowTag'
import { CTAButton } from '../components/CTAButton'

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
}

const CERTS = [
  { name: 'ISO 27001 Certified', sub: 'Information Security Management System' },
  { name: 'FedRAMP High Authorized', sub: 'Federal Risk and Authorization Management Program' },
  { name: 'DoD Impact Level 4', sub: 'Controlled Unclassified Information' },
  { name: 'SOC 2 Type II', sub: 'Security, Availability, Confidentiality' },
  { name: 'CMMC Level 3', sub: 'Cybersecurity Maturity Model Certification' },
]

const VALUES = [
  {
    title: 'Precision',
    body: 'Every operation, assessment, and deliverable is executed with exacting standards. There is no acceptable margin for error in the environments we operate in.',
  },
  {
    title: 'Discretion',
    body: 'Client relationships are never disclosed. Engagements are conducted under strict NDA. Our operational security posture reflects the environments we serve.',
  },
  {
    title: 'Lethality',
    body: 'We build capabilities that work. Not proof-of-concepts or theoretical frameworks. Deployable, tested, operational solutions.',
  },
  {
    title: 'Integrity',
    body: 'We operate within the law and within our clients\' mandates. Our cleared personnel are held to the standards of the intelligence community.',
  },
]

const CLEARANCE_OPTIONS = ['Uncleared', 'Secret', 'Top Secret', 'TS/SCI']

interface FormState {
  name: string
  organization: string
  email: string
  clearance: string
  message: string
}

export default function About() {
  const [form, setForm] = useState<FormState>({
    name: '',
    organization: '',
    email: '',
    clearance: 'Uncleared',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Briefing request submitted:', form)
    setSubmitted(true)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(0,12,30,0.7)',
    border: '1px solid rgba(0,55,130,0.32)',
    color: '#D4E2F4',
    fontFamily: "'Barlow', sans-serif",
    fontWeight: 400,
    fontSize: 13,
    padding: '12px 16px',
    outline: 'none',
    borderRadius: 0,
    display: 'block',
    boxSizing: 'border-box',
  }

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* Hero */}
      <section
        style={{ paddingTop: 160, padding: '160px 80px 80px' }}
        className="section-pad"
      >
        <motion.div {...fadeUp}>
          <EyebrowTag text="ABOUT GIDEON DYNAMICS" />
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
            maxWidth: 680,
          }}
        >
          Built for Environments Where Failure Is Not an Option.
        </motion.h1>
      </section>

      {/* Mission */}
      <section
        style={{
          padding: '96px 80px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'start',
          position: 'relative',
          zIndex: 1,
        }}
        className="two-col section-pad"
      >
        {/* Left */}
        <motion.div {...fadeUp} style={{ position: 'relative' }}>
          {/* Decorative background text */}
          <div
            style={{
              position: 'absolute',
              top: -20,
              left: -16,
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 300,
              fontSize: 110,
              color: 'rgba(0,52,130,0.06)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              pointerEvents: 'none',
              userSelect: 'none',
              zIndex: 0,
              whiteSpace: 'nowrap',
            }}
          >
            GIDEON
          </div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 300,
                fontSize: 32,
                color: '#EBF2FF',
                marginBottom: 24,
              }}
            >
              The Mission.
            </h2>
            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 400,
                fontSize: 14,
                lineHeight: 1.95,
                color: '#7A96B4',
                marginBottom: 20,
              }}
            >
              Gideon Dynamics was established to address the growing convergence of signals
              intelligence, counterintelligence, and offensive cyber operations in modern threat
              environments. We exist at the intersection of defense and technology — providing
              capabilities that were once available only to nation-state actors.
            </p>
            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 400,
                fontSize: 14,
                lineHeight: 1.95,
                color: '#7A96B4',
                marginBottom: 32,
              }}
            >
              Our operators bring direct experience from the intelligence community, special
              operations, and advanced cyber units. We do not theorize about threats — we have
              operated against them. That operational foundation is the basis of every solution we
              provide.
            </p>
            <div
              style={{
                borderTop: '1px solid rgba(0,55,130,0.28)',
                paddingTop: 20,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: '#1E3D6A',
                letterSpacing: '0.18em',
              }}
            >
              Founded 2019 · Private · U.S.-Based · Cleared Personnel Only
            </div>
          </div>
        </motion.div>

        {/* Right — Certifications */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          style={{
            background: 'rgba(0,12,30,0.8)',
            border: '1px solid rgba(0,55,130,0.28)',
            padding: 32,
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              color: '#1E3D6A',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: 20,
            }}
          >
            Certifications & Compliance
          </div>
          {CERTS.map((cert, i) => (
            <div
              key={cert.name}
              style={{
                borderBottom: i < CERTS.length - 1 ? '1px solid rgba(0,55,130,0.15)' : 'none',
                padding: '14px 0',
              }}
            >
              <div
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 500,
                  fontSize: 13,
                  color: '#D4E2F4',
                  marginBottom: 4,
                }}
              >
                {cert.name}
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9,
                  color: '#4A6B8A',
                }}
              >
                {cert.sub}
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Values */}
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
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 0,
          }}
          className="four-col"
        >
          {VALUES.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                borderTop: '2px solid #2E6AB5',
                borderRight: i < 3 ? '1px solid rgba(0,55,130,0.2)' : 'none',
                padding: '32px 28px',
              }}
            >
              <h3
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 500,
                  fontSize: 14,
                  color: '#EBF2FF',
                  marginBottom: 12,
                }}
              >
                {value.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 400,
                  fontSize: 13,
                  color: '#7A96B4',
                  lineHeight: 1.85,
                }}
              >
                {value.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        style={{
          background: '#03060D',
          padding: '96px 80px',
          position: 'relative',
          zIndex: 1,
        }}
        className="section-pad"
      >
        <motion.div {...fadeUp} style={{ textAlign: 'center', marginBottom: 48 }}>
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
            Request a Briefing.
          </h2>
          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 400,
              fontSize: 14,
              color: '#7A96B4',
              maxWidth: 540,
              margin: '0 auto',
              lineHeight: 1.8,
            }}
          >
            All engagements begin with a confidential briefing request. Communications are encrypted
            end-to-end. Gideon Dynamics does not respond to unsolicited vendor outreach.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              maxWidth: 520,
              margin: '0 auto',
              background: 'rgba(0,12,30,0.7)',
              border: '1px solid rgba(0,55,130,0.32)',
              padding: '40px 32px',
              textAlign: 'center',
            }}
          >
            <div style={{ width: 32, height: 2, background: '#00C47A', margin: '0 auto 20px' }} />
            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 400,
                fontSize: 14,
                color: '#D4E2F4',
                lineHeight: 1.8,
              }}
            >
              Your briefing request has been received. A member of our team will contact you within
              48 hours via encrypted channel.
            </p>
          </motion.div>
        ) : (
          <motion.form
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            onSubmit={handleSubmit}
            style={{
              maxWidth: 520,
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <input
              type="text"
              placeholder="Full Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = 'rgba(74,143,214,0.55)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(0,55,130,0.32)')}
            />
            <input
              type="text"
              placeholder="Organization"
              required
              value={form.organization}
              onChange={(e) => setForm({ ...form, organization: e.target.value })}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = 'rgba(74,143,214,0.55)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(0,55,130,0.32)')}
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = 'rgba(74,143,214,0.55)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(0,55,130,0.32)')}
            />
            <select
              value={form.clearance}
              onChange={(e) => setForm({ ...form, clearance: e.target.value })}
              style={{
                ...inputStyle,
                appearance: 'none',
                WebkitAppearance: 'none',
                cursor: 'pointer',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'rgba(74,143,214,0.55)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(0,55,130,0.32)')}
            >
              {CLEARANCE_OPTIONS.map((opt) => (
                <option key={opt} value={opt} style={{ background: '#060A14' }}>
                  {opt}
                </option>
              ))}
            </select>
            <textarea
              placeholder="Message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
              onFocus={(e) => (e.target.style.borderColor = 'rgba(74,143,214,0.55)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(0,55,130,0.32)')}
            />
            <CTAButton
              variant="primary"
              label="Submit Briefing Request"
              fullWidth
            />
          </motion.form>
        )}

        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: '#1E3D6A',
            letterSpacing: '0.18em',
            textAlign: 'center',
            marginTop: 24,
          }}
        >
          All communications encrypted via TLS 1.3 · Responses within 48 hours · Clearance verification required
        </div>
      </section>
    </div>
  )
}
