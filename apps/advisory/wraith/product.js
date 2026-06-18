/* =============================================================================
   GD-1 "WRAITH" — product data (single source of truth for copy + counters)
   Fictional, clearly-marked demonstration product for a Gideon launch sample.
   Non-munitions: sensing, autonomy, and electronic-warfare *support* only.
   Airframe: fixed-wing pusher with X-tail (built from a real STL: "Aero-X25" by
   emeremnd, Thingiverse, CC-BY-SA — see _build/aero_geom.js attribution).
   All copy + counters below are data-driven so the page stays a thin renderer.
   ========================================================================== */
window.PRODUCT = {
  designator: 'GD-1',
  callsign: 'WRAITH',
  class: 'Group 1 · Man-Portable Fixed-Wing',
  role: 'Backpackable Autonomous ISR & EW-Support System',
  oneLine: 'Hand-launched autonomous ISR that sees, thinks, and survives where the network does not.',
  microTag: 'Sovereign operator at mission speed.',

  // Section 2 — turntable tagline that builds line-by-line on scroll
  revealLines: ['Hand-launched.', 'GPS-denied.', 'Eyes on in minutes.'],

  // Section 4 — animated headline counters (synthetic, plausible for a small UAS)
  specs: [
    { key: 'endurance', label: 'Endurance',        value: 90,    suffix: ' min',  decimals: 0, note: 'on-station, ISR loiter' },
    { key: 'ceiling',   label: 'Service ceiling',  value: 12000, suffix: ' ft',   decimals: 0, note: 'density-altitude limited', grouping: true },
    { key: 'cruise',    label: 'Cruise',           value: 38,    suffix: ' kt',   decimals: 0, note: 'best-endurance band' },
    { key: 'payload',   label: 'Sensor payload',   value: 0.6,   suffix: ' kg',   decimals: 1, note: 'tool-less nose swap' },
    { key: 'datalink',  label: 'Datalink range',   value: 20,    suffix: ' km',   decimals: 0, note: 'LOS mesh, frequency-agile' },
    { key: 'mtow',      label: 'MTOW',             value: 3.4,   suffix: ' kg',   decimals: 1, note: 'one-person, backpackable' },
    { key: 'setup',     label: 'Setup',            value: 5,     prefix: '< ',    suffix: ' min', decimals: 0, note: 'ruck to hand-launch' },
    { key: 'nav',       label: 'Navigation',       text: 'GPS-DENIED', note: 'vision + inertial fusion' },
  ],

  // Section 3 — exploded view. `key` matches the model group + parts/<key>.png.
  // `at` is the explode-progress (0..1) at which the callout pins into view.
  subsystems: [
    { key: 'camera',   no: '01', name: 'Modular sensor turret', sub: 'EO / IR / laser designator',
      claim: 'Gyro-stabilized EO/IR turret under the nose. Tool-less swap to the mission optic in under a minute.', at: 0.10 },
    { key: 'avionics', no: '02', name: 'Autonomy / compute board', sub: 'The mission brain',
      claim: 'A flight-controller and edge-compute board plans, navigates, and re-tasks with the datalink severed. The aircraft decides.', at: 0.24 },
    { key: 'battery',  no: '03', name: 'Swappable LiPo pack', sub: 'Field-swap powertrain',
      claim: 'Hot-swap LiPo in the forward bay. Spare packs turn the aircraft around between sorties in seconds.', at: 0.38 },
    { key: 'wing',     no: '04', name: 'High-aspect cruise wing', sub: 'Long, quiet loiter',
      claim: 'Efficient high-aspect wing carries a long, quiet loiter. Snap-off panels stow the whole aircraft in a pack.', at: 0.52 },
    { key: 'tail',     no: '05', name: 'X-tail control surfaces', sub: 'Redundant control authority',
      claim: 'Canted X-tail blends pitch and yaw across four surfaces — graceful control even with a surface degraded.', at: 0.66 },
    { key: 'motor',    no: '06', name: 'Pusher propulsion', sub: 'Quiet rear-mounted drive',
      claim: 'Rear pusher motor and folding prop keep the nose clear for sensors and cut the forward acoustic signature.', at: 0.80 },
    { key: 'fuselage', no: '07', name: 'Sealed composite airframe', sub: 'Composite, sealed',
      claim: 'Sealed composite shell rated for salt-fog and blowing grit. Built to live in a ruck, not a hangar.', at: 0.92 },
  ],

  // Section 5 — three capability pillars
  pillars: [
    { key: 'avionics', tag: 'Autonomy', headline: 'Thinks without the network.',
      body: 'GPS-denied navigation by visual-inertial fusion and an onboard edge-compute board. When the link drops, the mission continues — WRAITH completes its tasking and brings the data home.' },
    { key: 'camera', tag: 'Sensing', headline: 'Sees across the spectrum.',
      body: 'Stabilized EO/IR under the nose with on-board detection and tracking, plus a passive EW/SIGINT survey capability. Targets are recognized and geolocated at the edge, not waiting on a downlink.' },
    { key: 'fuselage', tag: 'Resilience', headline: 'Survives the contest.',
      body: 'A frequency-agile line-of-sight mesh that self-heals under jamming and relays through other WRAITHs, a redundant X-tail, snap-swap subsystems, and a sealed airframe built for the field. Degrade gracefully; never go dark.' },
  ],

  // Section 6 — mission context
  mission: {
    eyebrow: 'In the fight',
    headline: 'Organic overwatch for the small team.',
    body: 'When the runways are targeted, the spectrum is hunted, and the satellite link is a luxury you cannot assume, the team that sees first wins. WRAITH was built for that team: pulled from a ruck and hand-launched from cover, navigating without GPS, sensing across the spectrum, and routing its picture through a mesh that bends but does not break. A distributed sensor the adversary cannot turn off by taking out one node.',
    stat: { value: '0', label: 'runways required' },
  },

  // Section 7 — Gideon bridge
  bridge: {
    eyebrow: 'The build behind it',
    headline: 'This launch is the product.',
    body: 'The site, the story, the 3D reveal, the scroll-driven assembly, the data-driven spec system — this is what Gideon builds for defense-technology companies. Your hardware is real. Its launch should feel like it.',
    cta: 'Your product deserves this.',
  },

  // Section 8 — CTA / contact (mirrors the firm site)
  cta: {
    headline: 'Move at',
    headlineAccent: 'mission speed.',
    sub: 'A launch like this is roughly two months of design, 3D, and front-end engineering. We can build it for your platform — one reveal or the entire product narrative.',
    email: 'trenton@thegideoncorp.com',
    subject: 'GD-1 WRAITH launch — build a product reveal for our platform',
  },

  // ---- ASSET CONTRACT --------------------------------------------------------
  // The site consumes these paths/counts ONLY. Renders are produced by
  // _build/render_assets_aero.mjs from the real STL geometry:
  //   turntable = banked "in-flight" loop · assembly = level explode/implode.
  assets: {
    poster: '/wraith/assets/hero_poster.png',
    turntable: { dir: '/wraith/assets/turntable/', count: 90, pad: 4, ext: 'jpg', start: 1 },
    assembly:  { dir: '/wraith/assets/assembly/',  count: 84, pad: 4, ext: 'jpg', start: 1 },
    parts: '/wraith/assets/parts/', // parts/<subsystem.key>.png
    placeholder: false, // real-time PBR renders (Three.js/WebGL) — _build/render_assets_aero.mjs
  },
};
