export default function Mission() {
  return (
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
              ['CTO', 'R&D', 'Strategic Technology Executive driving frontier AI programs and cutting-edge artificial intelligence innovation.']
            ].map(([n, r, p]) =>
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
    </div>
  )
}
