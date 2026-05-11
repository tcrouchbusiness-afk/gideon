// Capabilities, Platform/Products, Mission, Contact pages

const CAPABILITIES = [
  { n: '01', t: 'Resilience & Defensive Validation', d: 'Authorized stress-testing of your defensive posture. Gaps surfaced before adversaries find them — every action sponsor-approved, every result reversible.', f: 'AXEHEAD' },
  { n: '02', t: 'Autonomous Threat Detection & Tracking', d: 'Continuous, model-driven detection across endpoint, network, and cloud — at machine speed, with human-accountable escalation.', f: 'REDOUBT' },
  { n: '03', t: 'Hardware Trust & Supply-Chain Integrity', d: 'Root-of-trust attestation, supply-chain provenance, and firmware integrity for sovereign compute.', f: 'CARTOGRAPHER' },
  { n: '04', t: 'Defensive Intelligence', d: 'Threat indicators correlated to your environment, not generic feeds. Sponsor-aligned analysis briefed to cleared partners.', f: 'REDOUBT' },
  { n: '05', t: 'Network Defense & ICS/OT Resilience', d: 'Continuous telemetry across IT, OT, and cyber-physical assets. Built to hold the line on contested and degraded networks.', f: 'CARTOGRAPHER' },
  { n: '06', t: 'Sovereign Inference & Data Control', d: 'Air-gapped, accredited inference at the edge. Models you own, on hardware you trust, with data you control.', f: 'REDOUBT' },
];

const CapabilitiesGrid = () => (
  <div className="cap-grid">
    {CAPABILITIES.map((c) => (
      <div key={c.n} className="cap-cell">
        <div>
          <div className="cap-num mono">CAP / {c.n}</div>
          <div className="cap-title">{c.t}</div>
          <div className="cap-desc">{c.d}</div>
        </div>
        <div className="cap-foot">→ {c.f}</div>
      </div>
    ))}
  </div>
);

const PRODUCTS = [
  {
    n: '01', name: 'AXEHEAD', code: 'OFFENSIVE / AUTONOMOUS PENETRATION',
    desc: 'AXEHEAD is an authorized red-team agent that continuously probes your own networks. It chains exploits, evades detection, and writes the report you wish your last assessment had — without waiting six months for one.',
    specs: [
      { k: 'Domain', v: 'Offensive Cyber' },
      { k: 'Modality', v: 'Agentic' },
      { k: 'Posture', v: 'Authorized intrusion' },
      { k: 'Tempo', v: 'Continuous' },
    ],
    features: [
      { t: 'Chained exploit pathing', d: 'Reasons across CVE corpus, custom 0-days, and credential reuse to surface end-to-end paths, not single-issue findings.' },
      { t: 'Evasion telemetry', d: 'Reports the EDR/SIEM signals it could and could not avoid — so your blue team gets a closed feedback loop.' },
      { t: 'Operator-in-the-loop', d: 'Hard-coded rules of engagement. Every destructive action requires human authorization.' },
    ],
  },
  {
    n: '02', name: 'CARTOGRAPHER', code: 'NETWORK & ASSET MAPPING',
    desc: 'CARTOGRAPHER builds a living graph of every asset you own and every asset talking to one. IT, OT, ICS, cloud, contractor, dark — collapsed into one queryable substrate.',
    specs: [
      { k: 'Domain', v: 'Asset Discovery' },
      { k: 'Modality', v: 'Passive + Active' },
      { k: 'Coverage', v: 'IT / OT / ICS / Cloud' },
      { k: 'Update', v: 'Real-time' },
    ],
    features: [
      { t: 'Dual-spectrum discovery', d: 'Combines passive listening with low-impact probing. Maps brownfield ICS without breaking it.' },
      { t: 'Provenance graph', d: 'Every node carries firmware, supply-chain origin, and last-attestation timestamp. Cryptographically signed.' },
      { t: 'Drift alerts', d: 'New devices, new flows, new versions — surfaced the second they appear on the wire.' },
    ],
  },
  {
    n: '03', name: 'REDOUBT', code: 'SOVEREIGN AI NETWORK DEFENSE',
    desc: 'REDOUBT is the defensive nervous system. A sovereign, air-gappable inference platform that fuses telemetry from every sensor and acts inside the adversary\'s decision loop.',
    specs: [
      { k: 'Domain', v: 'Defense' },
      { k: 'Modality', v: 'On-prem / Edge' },
      { k: 'Model', v: 'Sovereign 9B' },
      { k: 'Latency', v: 'Sub-second' },
    ],
    features: [
      { t: 'Air-gapped inference', d: 'Runs entirely inside your enclave. Weights you own. No outbound calls. ATO-ready.' },
      { t: 'Decision-loop response', d: 'Auto-quarantines, auto-rotates credentials, auto-deploys countermeasures — all reviewable, all reversible.' },
      { t: 'Adversary cost amplifier', d: 'Designed to multiply attacker spend. Average measured uplift: 41×.' },
    ],
  },
];

const ProductsList = () => {
  const [open, setOpen] = React.useState(null);
  return (
    <div className="products">
      {PRODUCTS.map((p, i) => (
        <React.Fragment key={p.n}>
          <div className={`product ${open === i ? 'expanded' : ''}`} onClick={() => setOpen(open === i ? null : i)}>
            <div className="product-num">{p.n}</div>
            <div>
              <div className="product-name">{p.name}</div>
              <div className="product-codename">{p.code}</div>
            </div>
            <div className="product-desc">{p.desc}</div>
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
                <span className="marker mono">{p.name} · CAP-FRAME</span>
                <span>{p.name} CAPABILITY VISUAL</span>
              </div>
              <div className="pd-features">
                {p.features.map((f, j) => (
                  <div key={j} className="pd-feature">
                    <div className="n">0{j+1}</div>
                    <div>
                      <h5>{f.t}</h5>
                      <p>{f.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

const Stats = () => (
  <div className="stats">
    {[
      { v: '41', u: '×', l: 'Time-to-detect improvement' },
      { v: '0.6', u: 's', l: 'Median countermeasure latency' },
      { v: '99.997', u: '%', l: 'Sovereign inference uptime' },
      { v: '14.2', u: 'M', l: 'Endpoints under continuous attestation' },
    ].map((s, i) => (
      <div key={i} className="stat">
        <div className="stat-val">{s.v}<span className="unit">{s.u}</span></div>
        <div className="stat-label">{s.l}</div>
      </div>
    ))}
  </div>
);

const TIMELINE = [
  { y: '2023 / Q3', t: 'Founded', d: 'GIDEON Systems incorporated by veterans of NSA TAO, Unit 8200, and Five Eyes industrial programs.' },
  { y: '2024 / Q1', t: 'CARTOGRAPHER v1', d: 'First production deployment of the asset-graph substrate across a Tier-1 critical-infrastructure operator.' },
  { y: '2024 / Q4', t: 'Series A', d: 'Closed sovereign-aligned defense funding. Hardware program initiated.' },
  { y: '2025 / Q2', t: 'AXEHEAD GA', d: 'Authorized continuous adversary emulation released to federal program offices under restricted license.' },
  { y: '2025 / Q4', t: 'REDOUBT GA', d: 'Sovereign AI defense platform achieves IL-5 ATO. First contested-network deployment.' },
  { y: '2026 / Q1', t: 'Sovereign Inference GA', d: '9B-parameter sovereign foundation model fielded for accredited inference at the edge.' },
];

const Timeline = () => (
  <div className="timeline">
    {TIMELINE.map((t, i) => (
      <React.Fragment key={i}>
        <div className="timeline-year">{t.y}</div>
        <div className="timeline-event">
          <h4>{t.t}</h4>
          <p>{t.d}</p>
        </div>
      </React.Fragment>
    ))}
  </div>
);

const Team = () => {
  const ppl = [
    { n: 'Director / Operations', r: 'Ex-NSA TAO · 14y' },
    { n: 'Director / Engineering', r: 'Ex-Unit 8200 · ML lead' },
    { n: 'Director / Hardware', r: 'Ex-DARPA SHIELD' },
    { n: 'Director / Mission', r: 'Ex-USCYBERCOM J3' },
  ];
  return (
    <div className="team">
      {ppl.map((p, i) => (
        <div key={i} className="team-card">
          <div className="placeholder team-photo">
            <span className="marker mono">PORTRAIT · 4:5</span>
            <span>NAME WITHHELD</span>
          </div>
          <div className="team-info">
            <div className="team-name">{p.n}</div>
            <div className="team-role">{p.r}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ContactForm = () => {
  const [sent, setSent] = React.useState(false);
  return (
    <form className="contact-form" onSubmit={e => { e.preventDefault(); setSent(true); }}>
      <div className="field">
        <label>Name</label>
        <input type="text" required />
      </div>
      <div className="field">
        <label>Organization</label>
        <input type="text" required />
      </div>
      <div className="field">
        <label>Affiliation</label>
        <select>
          <option>Government / DoD</option>
          <option>Critical Infrastructure Operator</option>
          <option>Defense Prime</option>
          <option>Investor</option>
          <option>Allied Government</option>
        </select>
      </div>
      <div className="field">
        <label>Secure Email</label>
        <input type="email" required />
      </div>
      <div className="field">
        <label>Briefing Topic</label>
        <textarea placeholder="Capability area, deployment context, time horizon."></textarea>
      </div>
      <button type="submit" className="btn primary" style={{ alignSelf: 'flex-start' }}>
        {sent ? 'Request Received ✓' : 'Submit Request →'}
      </button>
    </form>
  );
};

window.CapabilitiesGrid = CapabilitiesGrid;
window.ProductsList = ProductsList;
window.Stats = Stats;
window.Timeline = Timeline;
window.Team = Team;
window.ContactForm = ContactForm;
