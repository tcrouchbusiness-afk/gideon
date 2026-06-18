export type Severity = 'ok' | 'warn' | 'crit'

export interface FeedItem {
  sev: Severity
  code: string
  region: string
  msg: string
}

export const FEED_SAMPLES: FeedItem[] = [
  { sev: 'ok', code: 'TLP-WHITE', region: 'CONUS-E', msg: 'Perimeter sweep complete · 0 anomalies · 11.3M packets inspected' },
  { sev: 'warn', code: 'TLP-AMBER', region: 'EUCOM-N', msg: 'Lateral movement signature detected on segment B12 · auto-quarantined' },
  { sev: 'ok', code: 'TLP-GREEN', region: 'INDOPACOM', msg: 'CARTOGRAPHER mapped 4,221 new endpoints · graph delta committed' },
  { sev: 'crit', code: 'TLP-RED', region: 'CENTCOM-S', msg: 'Zero-day TTP correlated · REDOUBT countermeasure deployed in 0.6s' },
  { sev: 'ok', code: 'TLP-WHITE', region: 'AFRICOM', msg: 'Sovereign LLM inference cluster healthy · 99.997% uptime · 14d' },
  { sev: 'warn', code: 'TLP-AMBER', region: 'NORTHCOM', msg: 'Anomalous DNS tunneling from contractor VPN · session terminated' },
  { sev: 'ok', code: 'TLP-GREEN', region: 'CONUS-W', msg: 'AXEHEAD assessment complete · 47 paths surfaced · report sealed' },
  { sev: 'ok', code: 'TLP-WHITE', region: 'SOUTHCOM', msg: 'ICS-OT telemetry nominal · 832 PLCs under continuous attestation' },
  { sev: 'crit', code: 'TLP-RED', region: 'EUCOM-E', msg: 'Supply-chain firmware tampering blocked at hardware root of trust' },
  { sev: 'warn', code: 'TLP-AMBER', region: 'INDOPACOM-N', msg: 'Adversary infrastructure pivot observed · attribution confidence 0.91' },
]
