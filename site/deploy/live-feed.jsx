// Simulated threat feed — for ticker + feed tile
const FEED_SAMPLES = [
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
];

const Ticker = () => {
  const items = [...FEED_SAMPLES, ...FEED_SAMPLES];
  return (
    <div className="ticker">
      <div className="ticker-track">
        {items.map((it, i) => (
          <div key={i} className="ticker-item">
            <span className={`dot ${it.sev}`}></span>
            <span className="dimmer">{it.code}</span>
            <span className="dim">{it.region}</span>
            <span>{it.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const fmtTs = (d) =>
  `${String(d.getUTCHours()).padStart(2,'0')}:${String(d.getUTCMinutes()).padStart(2,'0')}:${String(d.getUTCSeconds()).padStart(2,'0')}Z`;

const seedFeed = (count = 12) => {
  const now = Date.now();
  const out = [];
  for (let i = 0; i < count; i++) {
    const sample = FEED_SAMPLES[(i * 3 + 1) % FEED_SAMPLES.length];
    // back-date each entry ~1.8s apart so the feed looks like it's been running
    out.push({ ...sample, ts: fmtTs(new Date(now - i * 1800)) });
  }
  return out;
};

const LiveFeed = () => {
  const [lines, setLines] = React.useState(() => seedFeed(12));
  React.useEffect(() => {
    const id = setInterval(() => {
      setLines(prev => {
        const next = FEED_SAMPLES[Math.floor(Math.random() * FEED_SAMPLES.length)];
        return [{ ...next, ts: fmtTs(new Date()) }, ...prev].slice(0, 12);
      });
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="feed-tile">
      <div className="head">
        <span className="live"><span className="dot"></span>LIVE · GLOBAL THREAT FEED</span>
        <span className="dimmer">REDOUBT://feed/global</span>
      </div>
      <div className="feed-lines">
        {lines.map((l, i) => (
          <div key={`${l.ts}-${i}`} className="feed-line" style={{ opacity: Math.max(0.25, 1 - i * 0.06) }}>
            <span className="dimmer">{l.ts}</span>
            <span className={l.sev}>{l.code}</span>
            <span>{l.msg}</span>
            <span className="dimmer" style={{ textAlign: 'right' }}>{l.region}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

window.Ticker = Ticker;
window.LiveFeed = LiveFeed;
