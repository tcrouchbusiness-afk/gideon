export interface ProductSpec {
  k: string
  v: string
}

export interface ProductFeature {
  n: string
  h: string
  d: string
}

export interface Product {
  n: string
  name: string
  code: string
  desc: string
  specs: ProductSpec[]
  features: ProductFeature[]
  figEnc?: string
  figW?: number
  figH?: number
  interactive?: boolean
}

export const PRODUCTS: Product[] = [
  { n: '01', name: 'AXEHEAD', code: 'RESILIENCE VALIDATION PROGRAM', desc: 'AXEHEAD continuously validates your defensive posture against modeled adversary behavior. Engineering teams stress-test your perimeter under controlled, sponsor-approved conditions and report the gaps before a real adversary finds them. Every action authorized; every result reversible.', specs: [{ k: 'Domain', v: 'Resilience Engineering' }, { k: 'Posture', v: 'Authorized validation' }, { k: 'Modality', v: 'Engineering-led' }, { k: 'Reporting', v: 'Sealed' }], features: [{ n: '01', h: 'Cleared engineering cadre', d: 'Engineers carry active TS/SCI and deep operational experience in sovereign-defense programs. Vetted in-house, not contracted out.' }, { n: '02', h: 'Authorization-gated', d: 'Hard authorization gates. Cryptographic audit. No autonomous action — humans hold every step.' }, { n: '03', h: 'Gap reporting', d: 'Pre-engagement blast-radius modeling and post-engagement attestation, briefed to the partner sponsor with prioritized remediation paths.' }], figEnc: 'axehead_console.enc.json', figW: 900, figH: 620, interactive: true },
  { n: '02', name: 'CARTOGRAPHER', code: 'GROUND-TRUTH MAPPING PROGRAM', desc: 'Cleared analyst teams build and maintain a living asset graph of your IT, OT, identity, and cloud — including the assets nobody documented. Continuous, on-mission, walked back to ground truth weekly.', specs: [{ k: 'Scale', v: '14M endpoints' }, { k: 'Refresh', v: '< 60s' }, { k: 'Targets', v: 'IT · OT · Cloud' }, { k: 'Mode', v: 'Passive + Active' }], features: [{ n: '01', h: 'Passive-first discovery', d: 'Maps without disrupting fragile OT. No agent install required to begin coverage.' }, { n: '02', h: 'Identity graph', d: 'Joins humans, services, and devices into a single substrate. Insider risk surfaces here first.' }, { n: '03', h: 'Drift detection', d: 'Sub-minute identification of unauthorized topology change. Alerts routed to your watch officer.' }], figEnc: 'cartographer.enc.json', figW: 680, figH: 680 },
  { n: '03', name: 'REDOUBT', code: 'SOVEREIGN AI DEFENSE PROGRAM', desc: 'REDOUBT is the defensive nervous system. A sovereign, air-gappable platform that fuses telemetry from every sensor on your network and responds inside the adversary\'s decision loop. Weights you own. Decisions you authorize. No vendor reachback.', specs: [{ k: 'Model', v: 'Sovereign 9B/70B' }, { k: 'Posture', v: 'Air-gap · Enclave' }, { k: 'Latency', v: '< 600ms' }, { k: 'Egress', v: 'Zero' }], features: [{ n: '01', h: 'Sovereign inference', d: 'Weights and KV cache never leave your enclave. The model belongs to the mission, not the vendor.' }, { n: '02', h: 'Counter-action runtime', d: 'Pre-authorized response with two-person rule on high-blast-radius actions. Your operators concur; the system executes.' }, { n: '03', h: 'Continuous validation', d: 'No defensive posture is fielded without surviving a paired AXEHEAD validation pass. Verified by stress test, not by slide.' }], figEnc: 'redoubt_visual.enc.json', figW: 680, figH: 496 },
]
