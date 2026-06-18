import { useState } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)

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
          <form className="contact-form" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
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
    </div>
  )
}
