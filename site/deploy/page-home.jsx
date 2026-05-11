// pages.jsx — Page assemblies

const HomePage = ({ heroVariant, sub, setRoute }) => {
  const go = (route) => { setRoute(route); window.scrollTo(0, 0); };
  return (
    <div data-screen-label="Home">
      <Hero variant={heroVariant} sub={sub} setRoute={setRoute} />
      <Ticker />
      <section className="section" data-screen-label="Home / Posture">
        <div className="section-header">
          <div className="section-eyebrow">01 / LIVE POSTURE</div>
          <div>
            <h2 className="section-title">Operators forward. <em>Always attested.</em></h2>
            <p className="section-lede">Sanitized telemetry from active engagements. Gideon Dynamics teams are deployed, on contract, executing missions — right now.</p>
          </div>
        </div>
        <div className="posture-grid">
          <LiveFeed />
          <GlobeTile />
        </div>
        <div className="posture-actions">
          <button className="btn primary" onClick={() => go('platform')}>
            <span>Mission Programs</span><span className="btn-arrow">→</span>
          </button>
          <button className="btn" onClick={() => go('capabilities')}>
            <span>Operational Capabilities</span><span className="btn-arrow">→</span>
          </button>
        </div>
      </section>
      <div className="cta-block">
        <div className="grid-bg"></div>
        <div className="cta-inner">
          <div className="row" style={{ marginBottom: 24 }}>
            <span className="tag">02 / ENGAGE</span>
            <span className="mono small dimmer">FY26 · LIMITED PARTNER COHORT</span>
          </div>
          <h2>Adversaries don't sleep. <em>Neither do we.</em></h2>
          <div className="hero-actions" style={{ marginTop: 36 }}>
            <button className="btn primary" onClick={() => go('contact')}>Request Briefing →</button>
            <button className="btn" onClick={() => go('mission')}>Read Mission →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

window.HomePage = HomePage;
