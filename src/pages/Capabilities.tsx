import CapabilitiesGrid from '../components/Capabilities'

export default function CapabilitiesPage() {
  return (
    <div data-screen-label="Capabilities" style={{ paddingTop: 100 }}>
      <section className="section">
        <div className="section-header">
          <div className="section-eyebrow">/ OPERATIONAL CAPABILITIES</div>
          <div>
            <h2 className="section-title">What our operators <em>actually do.</em></h2>
            <p className="section-lede">Six mission lines. Cleared cadres. Sovereign infrastructure. Accountable decisioning. Gideon Dynamics provides the people and the operational capability to execute the mission — not a license, not a SaaS subscription, not a partner-stack repackage.</p>
          </div>
        </div>
        <CapabilitiesGrid />
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
    </div>
  )
}
