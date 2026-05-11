// Capabilities, Platform, Mission, Contact pages
const CAPS = [
  { num: '01', title: 'Resilience & Defensive Validation', desc: 'Engineering teams stress-test your defensive posture under controlled, sponsor-approved conditions. Surfaces the paths real adversaries will take, before they take them.', foot: 'AXEHEAD · MISSION-SCOPED' },
  { num: '02', title: 'Autonomous Threat Detection & Tracking', desc: 'Continuous, AI-driven detection across telemetry. Tracks living-off-the-land tradecraft and supply-chain implants invisible to signature-based defenses.', foot: 'REDOUBT · ALWAYS-ON' },
  { num: '03', title: 'Network Defense & ICS/OT Resilience', desc: 'Hardened guardrails for industrial control and operational technology. Enforces deterministic policy across PLCs, RTUs, and field assets without disrupting plant uptime.', foot: 'CARTOGRAPHER · DETERMINISTIC' },
  { num: '04', title: 'Hardware Trust & Supply-Chain Integrity', desc: 'Cryptographic root-of-trust attestation, supply-chain integrity verification, and firmware-level countermeasures across the device lifecycle.', foot: 'ROT · SILICON-TO-EDGE' },
  { num: '05', title: 'Defensive Intelligence', desc: 'Sovereign collection, fusion, and dissemination. Threat indicators correlated to your environment and briefed to cleared partners on demand.', foot: 'TLP-RED CAPABLE' },
  { num: '06', title: 'Sovereign Inference & Data Control', desc: 'On-prem and air-gapped inference clusters with controlled provenance. Models trained on sanctioned corpora and deployable to sensitive enclaves without egress.', foot: 'SOVEREIGN · AIR-GAPPABLE' },
];

const PRODUCTS = [
  {
    num: '01',
    name: 'AXEHEAD',
    code: 'OFFENSIVE PENETRATION PLATFORM',
    desc: 'AXEHEAD conducts authorized adversarial campaigns at the speed and scale of nation-state actors. Composable agents chain reconnaissance, exploitation, and post-exploit tradecraft against client-defined target sets — surfacing every path to objective before a real adversary does.',
    specs: [
      { k: 'Modality', v: 'Authorized red-team' },
      { k: 'Throughput', v: '4.2K paths/hr' },
      { k: 'Footprint', v: 'Stealth · Ephemeral' },
      { k: 'Deployment', v: 'Accredited facility' },
    ],
    features: [
      { n: '01', h: 'Adversary Emulation Library', p: 'Curated tradecraft library spanning 240+ documented APT playbooks, continuously refreshed by GIDEON intelligence.' },
      { n: '02', h: 'Path-to-Impact Surfacing', p: 'Graph-native reasoning surfaces full kill-chains, not isolated findings — every issue is contextualized against mission objective.' },
      { n: '03', h: 'Operator-in-Loop', p: 'Human authorization gates on every consequential action. Full audit trail. Rollback by design.' },
    ],
  },
  {
    num: '02',
    name: 'CARTOGRAPHER',
    code: 'NETWORK MAPPING & ATTESTATION',
    desc: 'CARTOGRAPHER builds and maintains a continuously-attested graph of every asset, identity, and trust relationship across enterprise, ICS-OT, and cloud estates. The ground-truth substrate beneath every other GIDEON capability.',
    specs: [
      { k: 'Coverage', v: 'IT · OT · Cloud · Edge' },
      { k: 'Cadence', v: 'Continuous · Sub-minute' },
      { k: 'Scale', v: '10⁷ entities tested' },
      { k: 'Storage', v: 'Sovereign · On-prem' },
    ],
    features: [
      { n: '01', h: 'Passive-First Discovery', p: 'Maps without scanning. Inferential graph construction from existing telemetry — no operational disruption to brittle ICS environments.' },
      { n: '02', h: 'Identity Graph', p: 'Joins humans, services, devices, and credentials into a single queryable substrate. The blast radius of any compromise becomes computable.' },
      { n: '03', h: 'Drift & Anomaly Detection', p: 'Every graph delta is a hypothesis. Unsanctioned shadow IT, rogue trust paths, and dormant accounts surface automatically.' },
    ],
  },
  {
    num: '03',
    name: 'REDOUBT',
    code: 'SOVEREIGN AI NETWORK DEFENSE',
    desc: 'REDOUBT is a sovereign-AI defense layer that reasons, decides, and responds inside your perimeter — not in someone else\'s cloud. Pre-authorized playbooks execute countermeasures in sub-second windows; the operator stays in command.',
    specs: [
      { k: 'Inference', v: 'Air-gappable · sovereign 9B' },
      { k: 'Latency', v: '< 600ms decide-act' },
      { k: 'Sovereignty', v: 'Full data residency' },
      { k: 'Accreditation', v: 'IL-5 / IL-6 ready' },
    ],
    features: [
      { n: '01', h: 'Pre-Authorized Response', p: 'Operators define the policy envelope. Inside it, REDOUBT acts at machine speed — outside it, escalation is mandatory.' },
      { n: '02', h: 'Provenance-Verified Models', p: 'Every weight, every gradient, every training corpus is signed and attested. No black-box dependency on foreign inference.' },
      { n: '03', h: 'Adversarial Hardening', p: 'Models hardened against prompt injection, weight extraction, and model-confusion attacks before they ever leave the foundry.' },
    ],
  },
];

const HomeBody = () => {
  const [open, setOpen] = React.useState(null);
  return (
    <>
      <Ticker />

      {/* Capabilities preview */}
      <div className="section">
        <div className="section-header">
          <span className="section-eyebrow">[ 01 / Capabilities ]</span>
          <div>
            <h2 className="section-title">Six capabilities. <em>One enclave.</em></h2>
            <p className="section-lede">GIDEON unifies offense, defense, and intelligence under a single sovereign substrate. No third-party telemetry. No foreign inference. No assumptions.</p>
          </div>
        </div>
        <div className="cap-grid">
          {CAPS.map(c => (
            <div key={c.num} className="cap-cell">
              <div>
                <div className="cap-num">[{c.num}]</div>
                <h3 className="cap-title">{c.title}</h3>
                <p className="cap-desc">{c.desc}</p>
              </div>
              <div className="cap-foot">— {c.foot}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform */}
      <div className="section">
        <div className="section-header">
          <span className="section-eyebrow">[ 02 / Platform ]</span>
          <div>
            <h2 className="section-title">Three products. <em>One operator.</em></h2>
            <p className="section-lede">Composable, sovereign, deployable. AXEHEAD reaches. CARTOGRAPHER sees. REDOUBT holds.</p>
          </div>
        </div>
        <div className="products">
          {PRODUCTS.map((p, i) => (
            <React.Fragment key={p.num}>
              <div className={`product ${open === i ? 'expanded' : ''}`} onClick={() => setOpen(open === i ? null : i)}>
                <div className="product-num">[{p.num}]</div>
                <div>
                  <div className="product-name">{p.name}</div>
                  <div className="product-codename">{p.code}</div>
                </div>
                <p className="product-desc">{p.desc}</p>
                <div className="product-specs">
                  {p.specs.map(s => (
                    <div key={s.k} className="spec-row">
                      <span className="k">{s.k}</span>
                      <span className="v">{s.v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="product-detail" style={{ display: open === i ? 'block' : 'none' }}>
                <div className="pd-grid">
                  <div className="placeholder pd-image">
                    <span className="marker">[ {p.name} · OPERATIONAL VIEW ]</span>
                    PRODUCT VISUALIZATION
                  </div>
                  <div className="pd-features">
                    {p.features.map(f => (
                      <div key={f.n} className="pd-feature">
                        <span className="n">{f.n}</span>
                        <div>
                          <h5>{f.h}</h5>
                          <p>{f.p}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Live ops */}
      <div className="section">
        <div className="section-header">
          <span className="section-eyebrow">[ 03 / Live Operations ]</span>
          <div>
            <h2 className="section-title">Always-on. <em>Always attested.</em></h2>
            <p className="section-lede">A representative slice of telemetry from sanctioned deployments. Sanitized for public release.</p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <LiveFeed />
          <div className="placeholder" style={{ minHeight: 360 }}>
            <span className="marker">[ REDOUBT · GLOBAL POSTURE MAP ]</span>
            DROP IMAGERY HERE
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-block">
        <div className="grid-bg"></div>
        <div className="cta-inner">
          <span className="section-eyebrow">[ Engage ]</span>
          <h2 style={{ marginTop: 24 }}>Adversaries don't sleep. <em>Neither do we.</em></h2>
          <div className="hero-actions" style={{ marginTop: 32 }}>
            <button className="btn primary">Request Briefing →</button>
            <button className="btn">Partner Program →</button>
          </div>
        </div>
      </div>
    </>
  );
};

window.HomeBody = HomeBody;
window.CAPS = CAPS;
window.PRODUCTS = PRODUCTS;
