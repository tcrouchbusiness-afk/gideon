export interface Cap {
  n: string
  t: string
  d: string
}

export const CAPS: Cap[] = [
  { n: '01', t: 'Resilience & Defensive Validation', d: 'Engineering teams stress-test your defensive posture under controlled, sponsor-approved conditions. Gaps surfaced before adversaries find them — every action authorized, every result reversible.' },
  { n: '02', t: 'Autonomous Threat Detection & Tracking', d: 'Continuous, model-driven detection across endpoint, network, and cloud. Tracks anomalous behavior at machine speed, with human-accountable escalation.' },
  { n: '03', t: 'Network Defense & ICS/OT Resilience', d: 'Defenders embedded into industrial and operational networks, including disconnected enclaves and contested theaters. Built to hold the line when the link drops.' },
  { n: '04', t: 'Hardware Trust & Supply-Chain Integrity', d: 'Silicon-rooted attestation, supply-chain firmware integrity, and secure boot pipelines, fielded by hardware engineers — not consultants.' },
  { n: '05', t: 'Defensive Intelligence', d: 'Threat indicators correlated to your environment, not generic feeds. Sponsor-aligned analysis, produced by analysts cleared to the same level as the customer.' },
  { n: '06', t: 'Sovereign Inference & Data Control', d: 'Engineering teams stand up sovereign inference inside your enclave and remain on the wire. Weights you own. Data you control. No vendor egress.' },
]
