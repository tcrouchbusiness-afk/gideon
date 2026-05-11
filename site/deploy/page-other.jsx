// page-other.jsx — Platform, Capabilities, Mission, Contact pages

const PlatformPage = () => {
  const [open, setOpen] = React.useState(null);
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
          <ProductRow key={p.num} p={p} expanded={open === p.num} onToggle={() => setOpen(open === p.num ? null : p.num)} />
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
            { tag: '03', label: 'On-Site Engagement', desc: 'On-site engagement at your accredited facility. Live console access. Operator Q&A. No recording, no take-home.', meta: 'Sponsor required · 4-hour block' }].
            map((c) =>
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
            <a href="#contact" className="btn primary brief-cta-btn">
              <span>Request Briefing</span><span className="btn-arrow">→</span>
            </a>
          </div>
          <div className="brief-foot">
            <span className="brief-foot-tag">/ CLEARED CHANNELS</span>
            <span>SIPR · JWICS · GFE only · OUT-OF-BAND <span className="mono dim">CHANNEL ON REQUEST</span></span>
          </div>
        </div>
      </section>
    </div>);

};

const CapabilitiesPage = () =>
<div data-screen-label="Capabilities" style={{ paddingTop: 100 }}>
    <section className="section">
      <div className="section-header">
        <div className="section-eyebrow">/ OPERATIONAL CAPABILITIES</div>
        <div>
          <h2 className="section-title">What our operators <em>actually do.</em></h2>
          <p className="section-lede">Six mission lines. Cleared cadres. Sovereign infrastructure. Accountable decisioning. Gideon Dynamics provides the people and the operational capability to execute the mission — not a license, not a SaaS subscription, not a partner-stack repackage.</p>
        </div>
      </div>
      <Capabilities />
    </section>
    <section className="section">
      <div className="section-header">
        <div className="section-eyebrow">/ DOCTRINE</div>
        <div>
          <h2 className="section-title">Operating <em>doctrine.</em></h2>
        </div>
      </div>
      <div className="stats">
        <div className="stat"><div className="stat-val">600<span className="unit">ms</span></div><div className="stat-label">Detection → counter-action</div></div>
        <div className="stat"><div className="stat-val">14.2<span className="unit">M</span></div><div className="stat-label">Endpoints under continuous attestation</div></div>
        <div className="stat"><div className="stat-val">41<span className="unit">×</span></div><div className="stat-label">Time-to-detect improvement</div></div>
        <div className="stat"><div className="stat-val">0</div><div className="stat-label">Bytes egressed from partner enclaves</div></div>
      </div>
    </section>
  </div>;


const MissionPage = () =>
<div data-screen-label="Mission" style={{ paddingTop: 100 }}>
    <section className="section">
      <div className="section-header">
        <div className="section-eyebrow">/ MISSION</div>
        <div>
          <h2 className="section-title">Sovereignty is a posture. <em>We make it operational.</em></h2>
          <p className="section-lede">For a generation, defenders have been forced to rent visibility, rent inference, and rent trust from vendors that can be reached, subpoenaed, or severed. Gideon Dynamics is not another vendor. We embed operators and sovereign systems inside your perimeter, run them alongside your team, and stand accountable to your authority — for as long as the mission requires.</p>
        </div>
      </div>
      <div className="mission-founders">
        <div className="mission-founders-photo">
          <img src="war-room.png" alt="Operations bay" className="mission-founders-img" />
          <div className="mission-founders-overlay" />
          <div className="mission-founders-scan" />
          <div className="mission-founders-corners">
            <span></span><span></span><span></span><span></span>
          </div>
          <span className="mission-founders-marker">OPERATIONS BAY · 2026</span>
        </div>
        <div>
          <p className="mission-founders-lede">
Founded by a U.S. military veteran alongside engineers from sovereign-defense programs, critical-infrastructure operators, and frontier-AI labs. We left to build the defensive capability the incumbent stack will not. Gideon Dynamics is not a software vendor. We field the engineers and the sovereign systems that hold the line — inside partner enclaves, accountable to partner authority.
          </p>
          <p className="mono small dim mission-founders-meta">
            Headquartered in St. Petersburg, FL.
          </p>
        </div>
      </div>
      <div>
        <div className="section-eyebrow" style={{ marginBottom: 24 }}>/ LEADERSHIP · REDACTED</div>
        <div className="team team-redacted">
          {[
        ['CEO', 'Founder', 'U.S.A Military Veteran with specialized expertise in offensive capabilities and operational strategy.'],
        ['COO', 'Engineering', 'Operations Executive leading sovereign cybersecurity programs, national cyber defense, and general cyber operations.'],
        ['CTO', 'R&D', 'Strategic Technology Executive driving frontier AI programs and cutting-edge artificial intelligence innovation.']].
        map(([n, r, p]) =>
        <div key={n} className="team-card">
              <div className="team-photo team-photo-redacted">
                <img src="silhouette.svg" alt="" className="team-silhouette" />
              </div>
              <div className="team-info">
                <div className="team-name">{n}</div>
                <div className="team-role">{r}</div>
                <div className="small dim" style={{ marginTop: 6 }}>{p}</div>
              </div>
            </div>
        )}
        </div>
        <p className="mono small dim team-redacted-note">
          Identities withheld for operational security. Leaders briefed in person at sponsor request.
        </p>
      </div>
    </section>
  </div>;


const ContactPage = () => {
  const [sent, setSent] = React.useState(false);
  return (
    <div data-screen-label="Contact" style={{ paddingTop: 100 }}>
      <section className="section">
        <div className="section-header">
          <div className="section-eyebrow">/ ENGAGE</div>
          <div>
            <h2 className="section-title">Request a <em>briefing.</em></h2>
            <p className="section-lede">Briefings are conducted in-person at your accredited facility. We engage with vetted government, prime, and infrastructure partners on operator-tasking arrangements — not procurement of software.</p>
          </div>
        </div>
        <div className="contact-grid">
          <form className="contact-form" onSubmit={(e) => {e.preventDefault();setSent(true);}}>
            <div className="field"><label>Name</label><input required placeholder="Full legal name" /></div>
            <div className="field"><label>Organization</label><input required placeholder="Agency · prime · fund" /></div>
            <div className="field"><label>Reference Name</label><input placeholder="Who referred you · cleared sponsor · prior contact" /></div>
            <div className="field"><label>Affiliation</label>
              <select>
                <option>U.S. Government / DoD</option>
                <option>Critical Infrastructure Operator</option>
                <option>Allied Government</option>
                <option>Defense Prime / Integrator</option>
                <option>Qualified Investor</option>
              </select>
            </div>
            <div className="field"><label>Clearance</label>
              <select><option>None / Public</option><option>Secret</option><option>TS</option><option>TS/SCI</option></select>
            </div>
            <div className="field"><label>Secure email</label><input type="email" required placeholder="name@.mil · .gov · partner domain" /></div>
            <div className="field"><label>Briefing topic</label><textarea placeholder="Mission scope, sponsor, timeline. Do not include classified information." /></div>
            <button type="submit" className="btn primary" style={{ alignSelf: 'flex-start' }}>{sent ? 'Transmission sealed ✓' : 'Submit Request →'}</button>
          </form>
          <aside className="contact-aside">
            <div className="contact-block"><h4>Headquarters</h4><p>7901 4th St N #33218<br />St. Petersburg, FL 33702</p></div>
            <div className="contact-block"><h4>Contact</h4><p>info@thegideoncorp.com<br />By appointment only</p></div>
            <div className="contact-block"><h4>Press</h4><p>info@thegideoncorp.com<br />Out-of-band channel on request</p></div>
            <div className="contact-block"><h4>Procurement</h4><p>SAM UEI: GDN94X2KQ7L8<br />NAICS: 541512 / 541519</p></div>
          </aside>
        </div>
      </section>
    </div>);

};

window.PlatformPage = PlatformPage;
window.CapabilitiesPage = CapabilitiesPage;
window.MissionPage = MissionPage;
window.ContactPage = ContactPage;