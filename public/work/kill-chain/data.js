/* ==========================================================================
   05_killchain — Synthetic mission-thread data
   Gideon Corp. demonstration. UNCLASSIFIED // FOR DEMONSTRATION.
   ==========================================================================

   Each mission defines an ordered chain of nodes (typically 6) along a
   kill-chain or mission thread. Each node carries:

     id              : short stable identifier (used by selection/state)
     letter          : single glyph drawn inside the node circle
     phase           : phase label rendered above the node
     name            : short node name
     description     : one-sentence description shown in detail panel
     requiredCapability : what the mission needs at this node
     baseCoverage    : 0-100, nominal coverage with no degradation
     solutions       : 2-4 anonymized vendor/tech archetypes filling this node
     maturity        : TRL band 1-9 (system-level readiness)
     whiteSpace      : 0-100 startup-opportunity score
     degraded        : per-condition sensitivity (0-100 = % of baseCoverage lost)
                       conditions: gps, comms, ew, night
     cascade         : 0-1 — how strongly upstream weakness propagates here

   Design notes baked into the data:
     - Sensing nodes are night/weather-sensitive
     - Track/targeting nodes are GPS-sensitive
     - C2/decide/engage nodes are comms- and EW-sensitive
     - White-space concentrated in: low-cost track in GPS-denied,
       resilient mesh comms, autonomous BDA, AI-assisted COA generation
   ========================================================================== */

window.MISSIONS = [
  {
    id: "cuas",
    name: "C-UAS — Defense of Forward Operating Base",
    threadModel: "Detect → Identify → Track → Decide → Defeat → Assess",
    summary:
      "Defend a forward operating base from a low-cost UAS swarm of 30–60 Group 1–3 systems. Multiple inbound axes, mixed RF and inertial guidance, partial EW environment.",
    nodes: [
      {
        id: "detect",
        letter: "D",
        phase: "Phase 01 · Detect",
        name: "Detect",
        description:
          "Long-dwell wide-area detection of inbound UAS swarms across RF, radar and acoustic domains.",
        requiredCapability:
          "Persistent 360° detection from 50 m AGL to 3 km AGL with low false-alarm rate against Group 1–3 UAS, including low-RCS fixed-wing and quad-copters.",
        baseCoverage: 78,
        solutions: [
          "Tier-1 prime Ku-band hemispheric radar",
          "Distributed passive RF sensing array",
          "Acoustic mesh nodes (commercial)"
        ],
        maturity: 8,
        whiteSpace: 22,
        degraded: { gps: 5, comms: 5, ew: 35, night: 15 },
        cascade: 0.25
      },
      {
        id: "identify",
        letter: "I",
        phase: "Phase 02 · Identify",
        name: "Identify",
        description:
          "Classify each track as hostile UAS vs. clutter (birds, weather, friendly air) and tag swarm cohorts.",
        requiredCapability:
          "Real-time multi-sensor fusion with on-edge ATR; < 3 s classification, > 95% precision on Group 1–2 fixed-wing.",
        baseCoverage: 62,
        solutions: [
          "GOTS classifier on legacy C2",
          "Commercial EO/IR with on-edge CV",
          "Operator-in-the-loop ID"
        ],
        maturity: 6,
        whiteSpace: 48,
        degraded: { gps: 10, comms: 20, ew: 20, night: 55 },
        cascade: 0.35
      },
      {
        id: "track",
        letter: "T",
        phase: "Phase 03 · Track",
        name: "Track",
        description:
          "Maintain continuous custody of 50+ simultaneous tracks in dense clutter and through brief sensor handoffs.",
        requiredCapability:
          "Sub-meter track quality through GPS denial and EW; cooperative multi-sensor handoff with <250 ms latency.",
        baseCoverage: 41,
        solutions: [
          "Legacy battle-management radar (GPS-aided)",
          "Visual-inertial track-keeping (commercial UAV stack)",
          "Distributed track-maintenance mesh (prototype)"
        ],
        maturity: 5,
        whiteSpace: 84,
        degraded: { gps: 55, comms: 25, ew: 45, night: 30 },
        cascade: 0.55
      },
      {
        id: "decide",
        letter: "X",
        phase: "Phase 04 · Decide",
        name: "Decide / Cue",
        description:
          "Pair each hostile track with the right effector under ROE, airspace deconfliction, and magazine constraints.",
        requiredCapability:
          "Sub-second effector assignment honoring ROE, civilian deconfliction, and limited interceptor magazine across heterogeneous defeat systems.",
        baseCoverage: 36,
        solutions: [
          "Operator on legacy C2",
          "Tier-1 prime BMS plug-in",
          "AI-assisted COA generator (early-stage startup)"
        ],
        maturity: 4,
        whiteSpace: 91,
        degraded: { gps: 5, comms: 50, ew: 35, night: 10 },
        cascade: 0.45
      },
      {
        id: "defeat",
        letter: "E",
        phase: "Phase 05 · Defeat",
        name: "Defeat",
        description:
          "Engage prioritized tracks with the assigned effector: HPM, directed energy, gun, or kinetic interceptor.",
        requiredCapability:
          "Layered defeat with cost-per-kill < $1k where possible; > 80% Pk per shot on Group 1–2 at engagement range.",
        baseCoverage: 67,
        solutions: [
          "30 mm proximity-fuze gun",
          "Vehicle-mounted HPM (prime)",
          "100 kW directed energy (FOC near-term)",
          "Low-cost kinetic interceptor (startup)"
        ],
        maturity: 7,
        whiteSpace: 38,
        degraded: { gps: 25, comms: 30, ew: 30, night: 15 },
        cascade: 0.30
      },
      {
        id: "assess",
        letter: "A",
        phase: "Phase 06 · Assess",
        name: "Assess",
        description:
          "Confirm kill/no-kill, re-engage leakers, track residual magazine and update operator picture.",
        requiredCapability:
          "Autonomous BDA on swarm engagements with <5 s loop closure and confidence-scored re-engage cueing.",
        baseCoverage: 29,
        solutions: [
          "Operator visual confirmation",
          "Radar Doppler signature inference (prototype)",
          "Autonomous BDA microservice (startup)"
        ],
        maturity: 4,
        whiteSpace: 88,
        degraded: { gps: 15, comms: 35, ew: 25, night: 60 },
        cascade: 0.50
      }
    ]
  },

  {
    id: "maritime",
    name: "Contested Maritime ISR & Interdiction",
    threadModel: "F2T2EA — Find · Fix · Track · Target · Engage · Assess",
    summary:
      "Find, fix and prosecute a small surface combatant operating in a contested A2/AD bubble, with intermittent SATCOM and adversary EW pressure throughout the chain.",
    nodes: [
      {
        id: "find",
        letter: "F",
        phase: "Phase 01 · Find",
        name: "Find",
        description:
          "Wide-area maritime domain awareness across SAR, RF, AIS-dark vessels and persistent overhead.",
        requiredCapability:
          "1,000,000 km² persistent watch with revisit < 30 min; ability to cue on dark-vessel and emitter patterns.",
        baseCoverage: 72,
        solutions: [
          "National technical means (cued)",
          "Commercial SAR constellation (startup)",
          "RF geolocation small-sat fleet"
        ],
        maturity: 8,
        whiteSpace: 35,
        degraded: { gps: 0, comms: 25, ew: 15, night: 10 },
        cascade: 0.20
      },
      {
        id: "fix",
        letter: "F",
        phase: "Phase 02 · Fix",
        name: "Fix",
        description:
          "Reduce target location uncertainty by cross-cueing SAR, EO/IR and SIGINT to within engagement-grade CEP.",
        requiredCapability:
          "TLE error < 200 m within 15 minutes of detection cue, sustained through partial SATCOM denial.",
        baseCoverage: 58,
        solutions: [
          "Manned MPA EO/IR cross-cue",
          "Unmanned MQ-class long-dwell ISR",
          "Commercial multi-source fusion service"
        ],
        maturity: 7,
        whiteSpace: 52,
        degraded: { gps: 20, comms: 45, ew: 25, night: 30 },
        cascade: 0.40
      },
      {
        id: "track",
        letter: "T",
        phase: "Phase 03 · Track",
        name: "Track",
        description:
          "Maintain custody of the target through evasive maneuver, weather and adversary EW pressure.",
        requiredCapability:
          "Continuous custody for > 2 hours through GPS denial and intermittent comms with handoff-grade track quality.",
        baseCoverage: 39,
        solutions: [
          "Carrier-borne MPA (limited persistence)",
          "Long-endurance UAS over hostile sea",
          "PNT-resilient track fusion (prototype)"
        ],
        maturity: 5,
        whiteSpace: 86,
        degraded: { gps: 60, comms: 35, ew: 50, night: 25 },
        cascade: 0.55
      },
      {
        id: "target",
        letter: "T",
        phase: "Phase 04 · Target",
        name: "Target",
        description:
          "Build firing solution: weaponeer, deconflict airspace, generate handoff to launch platform.",
        requiredCapability:
          "Multi-platform weaponeering with handoff latency < 60 s and PNT-degraded firing solution accuracy.",
        baseCoverage: 55,
        solutions: [
          "Legacy carrier strike planning cell",
          "Distributed maritime ops center",
          "Edge weaponeering microservice (startup)"
        ],
        maturity: 6,
        whiteSpace: 60,
        degraded: { gps: 35, comms: 40, ew: 25, night: 15 },
        cascade: 0.40
      },
      {
        id: "engage",
        letter: "E",
        phase: "Phase 05 · Engage",
        name: "Engage",
        description:
          "Deliver effects: ASCM volley, loitering munition swarm, or non-kinetic shaping.",
        requiredCapability:
          "> 80% Pk against frigate-class target with cost-per-shot < $1.5M; loitering effects available within 30 min.",
        baseCoverage: 71,
        solutions: [
          "Tier-1 ASCM (legacy programs)",
          "Long-range loitering munition (commercial)",
          "Sub-launched standoff weapon"
        ],
        maturity: 8,
        whiteSpace: 32,
        degraded: { gps: 30, comms: 20, ew: 30, night: 10 },
        cascade: 0.25
      },
      {
        id: "assess",
        letter: "A",
        phase: "Phase 06 · Assess",
        name: "Assess",
        description:
          "Confirm mission kill, characterize residual capability, decide on re-strike or break contact.",
        requiredCapability:
          "BDA loop closure < 10 min in PNT-degraded environment with confidence-scored re-strike cueing.",
        baseCoverage: 34,
        solutions: [
          "Post-strike national means tasking",
          "Commercial SAR re-tasking",
          "Autonomous BDA fusion microservice (startup)"
        ],
        maturity: 5,
        whiteSpace: 78,
        degraded: { gps: 25, comms: 40, ew: 25, night: 35 },
        cascade: 0.50
      }
    ]
  },

  {
    id: "a2ad",
    name: "Deny / Degrade Adversary C2 in A2/AD Bubble",
    threadModel: "Indicate → Locate → Characterize → Decide → Effects → Assess",
    summary:
      "Detect adversary mobile C2 nodes inside a contested air-defense bubble, characterize the network, deliver layered cyber + kinetic effects, and confirm sustained denial.",
    nodes: [
      {
        id: "indicate",
        letter: "I",
        phase: "Phase 01 · Indicate",
        name: "Indicate",
        description:
          "Detect SIGINT and cyber indicators of adversary mobile C2 activity within a denied area.",
        requiredCapability:
          "Persistent SIGINT and cyber indications across HF/VHF/UHF and adversary tactical data links inside a 600 km bubble.",
        baseCoverage: 64,
        solutions: [
          "Strategic SIGINT collection (NTM)",
          "Tactical RF SIGINT pod",
          "Cyber threat intel feed (commercial)"
        ],
        maturity: 7,
        whiteSpace: 41,
        degraded: { gps: 5, comms: 30, ew: 40, night: 10 },
        cascade: 0.25
      },
      {
        id: "locate",
        letter: "L",
        phase: "Phase 02 · Locate",
        name: "Locate",
        description:
          "Geolocate emitter nodes to engagement-grade CEP, including mobile relocatable C2.",
        requiredCapability:
          "TDOA/FDOA emitter location with < 50 m CEP in EW environment, fused across overhead and airborne SIGINT.",
        baseCoverage: 47,
        solutions: [
          "Strategic geolocation (NTM, time-late)",
          "Airborne tactical geolocation pod",
          "Small-sat RF geolocation constellation (commercial)"
        ],
        maturity: 6,
        whiteSpace: 62,
        degraded: { gps: 50, comms: 25, ew: 55, night: 10 },
        cascade: 0.50
      },
      {
        id: "characterize",
        letter: "C",
        phase: "Phase 03 · Characterize",
        name: "Characterize",
        description:
          "Map adversary C2 network: identify decisive nodes, redundancies, and intent-to-action timelines.",
        requiredCapability:
          "Graph-analytic network characterization with criticality scoring updated < 15 min after new indications.",
        baseCoverage: 31,
        solutions: [
          "Manual all-source analyst cell",
          "Graph analytics on classified network",
          "AI-assisted network characterization (startup)"
        ],
        maturity: 4,
        whiteSpace: 89,
        degraded: { gps: 5, comms: 20, ew: 15, night: 5 },
        cascade: 0.35
      },
      {
        id: "decide",
        letter: "X",
        phase: "Phase 04 · Decide",
        name: "Decide",
        description:
          "Generate and approve a course of action across cyber, EW and kinetic options under JADC2 routing.",
        requiredCapability:
          "Cross-domain COA generation with policy-aware automation; commander approval loop < 5 min for time-sensitive nodes.",
        baseCoverage: 33,
        solutions: [
          "JADC2 program-of-record (early increments)",
          "AI-assisted COA generator (startup)",
          "Federated planning cell (manual)"
        ],
        maturity: 4,
        whiteSpace: 87,
        degraded: { gps: 5, comms: 45, ew: 30, night: 5 },
        cascade: 0.45
      },
      {
        id: "effects",
        letter: "E",
        phase: "Phase 05 · Effects",
        name: "Effects",
        description:
          "Deliver cyber, EW and kinetic effects across the prioritized adversary C2 network.",
        requiredCapability:
          "Coordinated cross-domain effects within engagement window of < 30 min; redundant kinetic + non-kinetic options.",
        baseCoverage: 58,
        solutions: [
          "Standoff cruise missiles (legacy)",
          "Cyber offensive program (Title 10)",
          "Standoff jamming / EW pod",
          "Loitering munition (commercial)"
        ],
        maturity: 7,
        whiteSpace: 44,
        degraded: { gps: 30, comms: 25, ew: 35, night: 15 },
        cascade: 0.30
      },
      {
        id: "assess",
        letter: "A",
        phase: "Phase 06 · Assess",
        name: "Assess",
        description:
          "Confirm sustained denial of C2: not just node destroyed, but adversary command effect degraded.",
        requiredCapability:
          "Continuous effect-confirmation through SIGINT pattern-of-life analysis; sustained denial measurement over hours.",
        baseCoverage: 36,
        solutions: [
          "Post-strike SIGINT re-tasking",
          "Pattern-of-life analytics (startup)",
          "Commander's running estimate (manual)"
        ],
        maturity: 5,
        whiteSpace: 80,
        degraded: { gps: 10, comms: 35, ew: 30, night: 20 },
        cascade: 0.50
      }
    ]
  },

  {
    id: "logistics",
    name: "Contested Logistics — Island-Chain Resupply",
    threadModel: "Plan → Stage → Move → Sustain → Monitor → Recover",
    summary:
      "Sustain a distributed force across multiple islands under continuous adversary surveillance, intermittent comms, and persistent threat to surface and air lines of communication.",
    nodes: [
      {
        id: "plan",
        letter: "P",
        phase: "Phase 01 · Plan",
        name: "Plan",
        description:
          "Demand-sense across distributed units and generate route options against the threat picture.",
        requiredCapability:
          "Multi-modal route planning under threat with rolling demand sensing; < 2 hour replan when threat picture shifts.",
        baseCoverage: 56,
        solutions: [
          "Legacy logistics IT (GCSS family)",
          "Commercial route-optimization SaaS",
          "AI demand-sensing service (startup)"
        ],
        maturity: 6,
        whiteSpace: 55,
        degraded: { gps: 10, comms: 30, ew: 15, night: 5 },
        cascade: 0.25
      },
      {
        id: "stage",
        letter: "S",
        phase: "Phase 02 · Stage",
        name: "Stage",
        description:
          "Pre-position stocks and configure delivery kits across distributed nodes ahead of contested move.",
        requiredCapability:
          "Distributed pre-positioning with drone-deliverable kits; visibility of stock by mission-essential class.",
        baseCoverage: 60,
        solutions: [
          "Forward pre-positioning ships",
          "Distributed dispersed stocks (DoD)",
          "Aerial delivery kit (commercial)"
        ],
        maturity: 7,
        whiteSpace: 42,
        degraded: { gps: 5, comms: 15, ew: 10, night: 5 },
        cascade: 0.20
      },
      {
        id: "move",
        letter: "M",
        phase: "Phase 03 · Move",
        name: "Move",
        description:
          "Move stocks across contested water/air gaps, including via uncrewed surface and sub-surface assets.",
        requiredCapability:
          "Autonomous delivery options across contested water with > 90% mission success in EW/contested environment.",
        baseCoverage: 34,
        solutions: [
          "Manned surface connector (legacy)",
          "Uncrewed surface vessel (startup)",
          "Long-range cargo UAS (commercial)"
        ],
        maturity: 4,
        whiteSpace: 90,
        degraded: { gps: 45, comms: 35, ew: 50, night: 25 },
        cascade: 0.55
      },
      {
        id: "sustain",
        letter: "S",
        phase: "Phase 04 · Sustain",
        name: "Sustain",
        description:
          "In-transit replenishment and adaptive top-off as transit conditions and demand shift.",
        requiredCapability:
          "In-transit replenishment with degraded comms; ability to reroute single legs without central re-plan.",
        baseCoverage: 48,
        solutions: [
          "Underway replenishment (legacy)",
          "Edge replan node (prototype)",
          "Disconnected ops cache (commercial)"
        ],
        maturity: 5,
        whiteSpace: 67,
        degraded: { gps: 25, comms: 50, ew: 30, night: 15 },
        cascade: 0.40
      },
      {
        id: "monitor",
        letter: "O",
        phase: "Phase 05 · Monitor",
        name: "Monitor",
        description:
          "Track-and-trace of cargo and platforms under comms-denial; survivable status reporting.",
        requiredCapability:
          "Resilient mesh / low-probability-of-intercept track-and-trace with < 30 min latency in comms-denied environment.",
        baseCoverage: 30,
        solutions: [
          "RFID/IUID legacy",
          "LEO low-bandwidth track-and-trace (commercial)",
          "Resilient mesh comms (startup)"
        ],
        maturity: 4,
        whiteSpace: 92,
        degraded: { gps: 25, comms: 60, ew: 40, night: 10 },
        cascade: 0.50
      },
      {
        id: "recover",
        letter: "R",
        phase: "Phase 06 · Recover",
        name: "Recover",
        description:
          "Recover battle-damaged equipment, salvage and route to field-level repair.",
        requiredCapability:
          "Distributed expeditionary repair with additive manufacturing forward-deployed; mean-time-to-repair < 48 h.",
        baseCoverage: 52,
        solutions: [
          "Field maintenance team",
          "Forward additive-manufacturing kit (startup)",
          "Salvage / battle-damage assessment service"
        ],
        maturity: 6,
        whiteSpace: 58,
        degraded: { gps: 5, comms: 20, ew: 10, night: 15 },
        cascade: 0.30
      }
    ]
  }
];

/* Conditions metadata — single source of truth for the UI */
window.CONDITIONS = [
  { id: "gps",   name: "GPS-Denied",   short: "GPS",   desc: "PNT denial across the mission area." },
  { id: "comms", name: "Comms-Jammed", short: "COMMS", desc: "SATCOM and tactical data link degradation." },
  { id: "ew",    name: "EW Pressure",  short: "EW",    desc: "Hostile electromagnetic warfare environment." },
  { id: "night", name: "Night / Weather", short: "NIGHT", desc: "Low-light, weather and reduced sensor performance." }
];
