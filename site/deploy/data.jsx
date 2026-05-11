// pages.jsx — Home, Platform, Capabilities, Mission, Contact

const CAPS = [
  { n: '01', t: 'Resilience & Defensive Validation', d: 'Engineering teams stress-test your defensive posture under controlled, sponsor-approved conditions. Gaps surfaced before adversaries find them — every action authorized, every result reversible.' },
  { n: '02', t: 'Autonomous Threat Detection & Tracking', d: 'Continuous, model-driven detection across endpoint, network, and cloud. Tracks anomalous behavior at machine speed, with human-accountable escalation.' },
  { n: '03', t: 'Network Defense & ICS/OT Resilience', d: 'Defenders embedded into industrial and operational networks, including disconnected enclaves and contested theaters. Built to hold the line when the link drops.' },
  { n: '04', t: 'Hardware Trust & Supply-Chain Integrity', d: 'Silicon-rooted attestation, supply-chain firmware integrity, and secure boot pipelines, fielded by hardware engineers — not consultants.' },
  { n: '05', t: 'Defensive Intelligence', d: 'Threat indicators correlated to your environment, not generic feeds. Sponsor-aligned analysis, produced by analysts cleared to the same level as the customer.' },
  { n: '06', t: 'Sovereign Inference & Data Control', d: 'Engineering teams stand up sovereign inference inside your enclave and remain on the wire. Weights you own. Data you control. No vendor egress.' },
];

const PRODUCTS = [
  { num: '01', name: 'AXEHEAD', code: 'RESILIENCE VALIDATION PROGRAM', desc: 'AXEHEAD continuously validates your defensive posture against modeled adversary behavior. Engineering teams stress-test your perimeter under controlled, sponsor-approved conditions and report the gaps before a real adversary finds them. Every action authorized; every result reversible.', specs: [['Domain','Resilience Engineering'],['Posture','Authorized validation'],['Modality','Engineering-led'],['Reporting','Sealed']], features: [['01','Cleared engineering cadre','Engineers carry active TS/SCI and deep operational experience in sovereign-defense programs. Vetted in-house, not contracted out.'],['02','Authorization-gated','Hard authorization gates. Cryptographic audit. No autonomous action — humans hold every step.'],['03','Gap reporting','Pre-engagement blast-radius modeling and post-engagement attestation, briefed to the partner sponsor with prioritized remediation paths.']], figEnc: 'axehead_console.enc.json', figW: 900, figH: 620, interactive: true },
  { num: '02', name: 'CARTOGRAPHER', code: 'GROUND-TRUTH MAPPING PROGRAM', desc: 'Cleared analyst teams build and maintain a living asset graph of your IT, OT, identity, and cloud — including the assets nobody documented. Continuous, on-mission, walked back to ground truth weekly.', specs: [['Scale','14M endpoints'],['Refresh','< 60s'],['Targets','IT · OT · Cloud'],['Mode','Passive + Active']], features: [['01','Passive-first discovery','Maps without disrupting fragile OT. No agent install required to begin coverage.'],['02','Identity graph','Joins humans, services, and devices into a single substrate. Insider risk surfaces here first.'],['03','Drift detection','Sub-minute identification of unauthorized topology change. Alerts routed to your watch officer.']], figEnc: 'cartographer.enc.json', figW: 680, figH: 680 },
  { num: '03', name: 'REDOUBT', code: 'SOVEREIGN AI DEFENSE PROGRAM', desc: 'REDOUBT is the defensive nervous system. A sovereign, air-gappable platform that fuses telemetry from every sensor on your network and responds inside the adversary\'s decision loop. Weights you own. Decisions you authorize. No vendor reachback.', specs: [['Model','Sovereign 9B/70B'],['Posture','Air-gap · Enclave'],['Latency','< 600ms'],['Egress','Zero']], features: [['01','Sovereign inference','Weights and KV cache never leave your enclave. The model belongs to the mission, not the vendor.'],['02','Counter-action runtime','Pre-authorized response with two-person rule on high-blast-radius actions. Your operators concur; the system executes.'],['03','Continuous validation','No defensive posture is fielded without surviving a paired AXEHEAD validation pass. Verified by stress test, not by slide.']], figEnc: 'redoubt_visual.enc.json', figW: 680, figH: 496 },
];

const Capabilities = () => (
  <div className="cap-grid">
    {CAPS.map(c => (
      <a key={c.n} href="#contact" className="cap-cell">
        <div>
          <div className="cap-num">CAP / {c.n}</div>
          <h3 className="cap-title">{c.t}</h3>
          <p className="cap-desc">{c.d}</p>
        </div>
        <div className="cap-foot">→ ENGAGE</div>
      </a>
    ))}
  </div>
);

/* ============================================================
 * Encrypted figs — Web Crypto unlock
 *
 * Each fig is shipped as an AES-GCM ciphertext blob (.enc.json).
 * The password derives a key via PBKDF2-SHA256 (600k iters).
 * Successful decryption requires the correct password — wrong
 * passwords fail the AES-GCM auth tag and throw.
 *
 * Plaintext lives only in the in-memory `figPlaintext` cache
 * for the lifetime of the page. Refresh re-locks. The iframe
 * receives plaintext via srcdoc so it never has a network URL.
 * ============================================================ */

const FIG_UNLOCK_KEY = '__gideon_fig_unlocked';
const FIG_UNLOCK_EVENT = '__gideon_fig_unlocked';
const figPlaintext = {}; // path -> decrypted HTML string

const b64decode = (s) => {
  const bin = atob(s);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
};

const deriveFigKey = async (password, salt, iters) => {
  const passKey = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: iters, hash: 'SHA-256' },
    passKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );
};

const decryptFig = async (encPath, password) => {
  if (figPlaintext[encPath]) return figPlaintext[encPath];
  const res = await fetch(encPath, { cache: 'force-cache' });
  if (!res.ok) throw new Error(`Failed to fetch ${encPath}`);
  const blob = await res.json();
  const salt = b64decode(blob.salt);
  const iv = b64decode(blob.iv);
  const ct = b64decode(blob.ct);
  const key = await deriveFigKey(password, salt, blob.iters);
  // Throws on wrong password (AES-GCM auth tag mismatch).
  const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct);
  const html = new TextDecoder().decode(pt);
  figPlaintext[encPath] = html;
  return html;
};

const tryUnlockAllFigs = async (password) => {
  // Decrypt all three. If any fails, the password is wrong.
  const paths = PRODUCTS.map(p => p.figEnc).filter(Boolean);
  await Promise.all(paths.map(p => decryptFig(p, password)));
};

const useFigUnlock = () => {
  const [unlocked, setUnlocked] = React.useState(() => {
    try { return sessionStorage.getItem(FIG_UNLOCK_KEY) === '1' && Object.keys(figPlaintext).length > 0; } catch (e) { return false; }
  });
  React.useEffect(() => {
    const onEvt = () => setUnlocked(true);
    window.addEventListener(FIG_UNLOCK_EVENT, onEvt);
    return () => window.removeEventListener(FIG_UNLOCK_EVENT, onEvt);
  }, []);
  const unlock = React.useCallback(() => {
    try { sessionStorage.setItem(FIG_UNLOCK_KEY, '1'); } catch (e) {}
    window.dispatchEvent(new Event(FIG_UNLOCK_EVENT));
    setUnlocked(true);
  }, []);
  return [unlocked, unlock];
};

const FigLockGate = ({ num, name, onUnlock }) => {
  const [val, setVal] = React.useState('');
  const [err, setErr] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const submit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (busy || !val) return;
    setBusy(true);
    setErr(false);
    try {
      await tryUnlockAllFigs(val);
      onUnlock();
    } catch (decryptErr) {
      setErr(true);
      setVal('');
      setTimeout(() => setErr(false), 1400);
    } finally {
      setBusy(false);
    }
  };
  const hint = busy ? '⟳ DECRYPTING…' : err ? '✕ DECRYPTION FAILED · INVALID KEY' : 'AES-GCM · PBKDF2-SHA256 · CLEARED PERSONNEL ONLY';
  return (
    <div className="fig-lock" onClick={(e) => e.stopPropagation()}>
      <div className="fig-lock-redact" aria-hidden="true">
        <div className="fig-lock-bar" style={{ width: '72%' }}></div>
        <div className="fig-lock-bar" style={{ width: '54%' }}></div>
        <div className="fig-lock-bar" style={{ width: '88%' }}></div>
        <div className="fig-lock-bar" style={{ width: '40%' }}></div>
        <div className="fig-lock-bar" style={{ width: '66%' }}></div>
        <div className="fig-lock-bar" style={{ width: '78%' }}></div>
      </div>
      <div className="fig-lock-overlay">
        <div className="fig-lock-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="4" y="11" width="16" height="10" rx="1.5"/>
            <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
          </svg>
        </div>
        <div className="fig-lock-title">FIG · {num} / {name}</div>
        <div className="fig-lock-copy">For authorized eyes only.<br/>Enter access code to decrypt operator console.</div>
        <form className="fig-lock-form" onSubmit={submit}>
          <input
            type="password"
            placeholder="ACCESS CODE"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            disabled={busy}
            className={`fig-lock-input${err ? ' err' : ''}`}
            autoComplete="off"
            spellCheck={false}
            onClick={(e) => e.stopPropagation()}
          />
          <button type="submit" className="fig-lock-btn" disabled={busy}>{busy ? 'DECRYPTING…' : 'AUTHENTICATE →'}</button>
        </form>
        <div className="fig-lock-hint">{hint}</div>
      </div>
    </div>
  );
};

const FigFrame = ({ encSrc, w, h, num, name, interactive }) => {
  const wrapRef = React.useRef(null);
  const [scale, setScale] = React.useState(1);
  const [unlocked, unlock] = useFigUnlock();
  const html = unlocked ? figPlaintext[encSrc] : null;
  React.useLayoutEffect(() => {
    if (!unlocked) return;
    const el = wrapRef.current;
    if (!el) return;
    const update = () => {
      const cw = el.clientWidth;
      if (cw > 0) setScale(cw / w);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [w, unlocked]);
  return (
    <div
      ref={wrapRef}
      className={`pd-image pd-fig${interactive ? ' pd-fig-interactive' : ''}${unlocked ? '' : ' pd-fig-locked'}`}
      style={{ aspectRatio: `${w} / ${h}` }}
      onClick={interactive && unlocked ? (e) => e.stopPropagation() : undefined}
    >
      {unlocked && html ? (
        <React.Fragment>
          <iframe
            srcDoc={html}
            title={`FIG · ${num} — ${name}`}
            sandbox="allow-scripts allow-same-origin"
            scrolling={interactive ? 'auto' : 'no'}
            frameBorder="0"
            style={{
              width: w + 'px',
              height: h + 'px',
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          />
          <span className="pd-fig-label">FIG · {num} / {name}</span>
        </React.Fragment>
      ) : (
        <FigLockGate num={num} name={name} onUnlock={unlock} />
      )}
    </div>
  );
};

const ProductRow = ({ p, expanded, onToggle }) => (
  <React.Fragment>
    <div className={`product ${expanded ? 'expanded' : ''}`} onClick={onToggle}>
      <div className="product-num">[{p.num}]</div>
      <div>
        <div className="product-name">{p.name}</div>
        <div className="product-codename">{p.code}</div>
      </div>
      <div className="product-desc">{p.desc}</div>
      <div className="product-specs">
        {p.specs.map(([k,v]) => (
          <div key={k} className="spec-row"><span className="k">{k}</span><span className="v">{v}</span></div>
        ))}
      </div>
      <div className="product-expand-row">
        <button
          type="button"
          className={`product-expand-btn ${expanded ? 'is-open' : ''}`}
          aria-expanded={expanded}
          onClick={(e) => { e.stopPropagation(); onToggle(); }}
        >
          <span className="product-expand-tag">/ {expanded ? 'COLLAPSE' : 'EXPAND'}</span>
          <span className="product-expand-label">
            {expanded ? `Hide ${p.name} console` : `View ${p.name} console & features`}
          </span>
          <span className="product-expand-chev" aria-hidden="true">{expanded ? '▲' : '▼'}</span>
        </button>
      </div>
    </div>
    {expanded && (
      <div className="product-detail" style={{ display: 'block' }}>
        <div className="pd-grid">
          {p.figEnc ? (
            <FigFrame
              encSrc={p.figEnc}
              w={p.figW}
              h={p.figH}
              num={p.num}
              name={p.name}
              interactive={p.interactive}
            />
          ) : (
            <div className="placeholder pd-image">
              <span className="marker">FIG · {p.num}</span>
              <span>{p.name} OPERATOR CONSOLE</span>
            </div>
          )}
          <div className="pd-features">
            {p.features.map(([n,h,d]) => (
              <div key={n} className="pd-feature">
                <span className="n">{n}</span>
                <div><h5>{h}</h5><p>{d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
  </React.Fragment>
);

window.CAPS = CAPS; window.PRODUCTS = PRODUCTS; window.Capabilities = Capabilities; window.ProductRow = ProductRow;
