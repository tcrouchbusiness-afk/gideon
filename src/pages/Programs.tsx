import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductRow from '../components/ProductRow'
import { PRODUCTS } from '../data/products'

export default function Programs() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div data-screen-label="Platform" style={{ paddingTop: 100 }}>
      <section className="section">
        <div className="opsec-banner">
          <span className="opsec-tag">/ OPSEC NOTICE</span>
          <span className="opsec-text">Program codenames depicted on this page (<strong>AXEHEAD</strong>, <strong>CARTOGRAPHER</strong>, <strong>REDOUBT</strong>) are public-facing aliases for active defense programs. True designations are withheld to maintain operational security.</span>
        </div>
        <div className="section-header">
          <div className="section-eyebrow">/ MISSION PROGRAMS</div>
          <div>
            <h2 className="section-title">Three programs. <em>One operator cadre.</em></h2>
            <p className="section-lede">Gideon Dynamics does not sell software. We field operator teams against partner mission objectives. AXEHEAD pressures. CARTOGRAPHER sees. REDOUBT holds. Each is a tasking line, fielded by cleared cadres into contested, disconnected, and accredited environments.</p>
          </div>
        </div>
        <div className="products">
          {PRODUCTS.map((p) =>
            <ProductRow key={p.n} p={p} expanded={open === p.n} onToggle={() => setOpen(open === p.n ? null : p.n)} />
          )}
        </div>
      </section>
      <section className="section">
        <div className="section-header">
          <div className="section-eyebrow">/ REQUEST BRIEFING</div>
          <div>
            <h2 className="section-title"><em>One channel in.</em></h2>
            <p className="section-lede">Cleared partners only. Briefings are scheduled by tasking authority and delivered in-person at your accredited facility. No online demos. No partner-stack readouts.</p>
          </div>
        </div>
        <div className="brief-block">
          <div className="brief-grid">
            {[
              { tag: '01', label: 'Capability Briefing', desc: 'Program walk-through with operator leadership. AXEHEAD, CARTOGRAPHER, REDOUBT — fielded against your mission profile.', meta: 'TS/SCI · 90 min · St. Petersburg or forward' },
              { tag: '02', label: 'Procurement Pathway', desc: 'OTAs, sole-source justifications, and Title 10 partnership frameworks. We come prepared with the paperwork.', meta: 'GSA · SAM UEI on file · NAICS 541512' },
              { tag: '03', label: 'On-Site Engagement', desc: 'On-site engagement at your accredited facility. Live console access. Operator Q&A. No recording, no take-home.', meta: 'Sponsor required · 4-hour block' }
            ].map((c) =>
              <div key={c.tag} className="brief-card">
                <span className="brief-card-tag">{c.tag}</span>
                <h4 className="brief-card-label">{c.label}</h4>
                <p className="brief-card-desc">{c.desc}</p>
                <div className="brief-card-meta">{c.meta}</div>
              </div>
            )}
          </div>
          <div className="brief-cta-row">
            <div className="brief-cta-copy">
              <div className="brief-cta-eyebrow">/ INTAKE</div>
              <p className="brief-cta-line">Submit your tasking authority, sponsor, and topic. A program lead will respond within one business day over an out-of-band channel you specify.</p>
            </div>
            <Link to="/contact" className="btn primary brief-cta-btn">
              <span>Request Briefing</span><span className="btn-arrow">→</span>
            </Link>
          </div>
          <div className="brief-foot">
            <span className="brief-foot-tag">/ CLEARED CHANNELS</span>
            <span>SIPR · JWICS · GFE only · OUT-OF-BAND <span className="mono dim">CHANNEL ON REQUEST</span></span>
          </div>
        </div>
      </section>
    </div>
  )
}
