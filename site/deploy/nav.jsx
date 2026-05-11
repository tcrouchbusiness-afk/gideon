// Glyph used in nav + footer
const Glyph = ({ size = 22 }) => (
  <img
    src="logo.svg"
    alt="Gideon Dynamics"
    height={size}
    style={{ display: 'block', height: size, width: 'auto', objectFit: 'contain' }}
  />
);

const NowUTC = () => {
  const [t, setT] = React.useState('');
  React.useEffect(() => {
    const tick = () => {
      const d = new Date();
      const pad = n => String(n).padStart(2, '0');
      setT(`${d.getUTCFullYear()}-${pad(d.getUTCMonth()+1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}Z`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span>{t}</span>;
};

const Nav = ({ route, setRoute }) => {
  const [open, setOpen] = React.useState(false);
  const links = [
    { id: 'home', label: 'Index' },
    { id: 'platform', label: 'Programs' },
    { id: 'capabilities', label: 'Capabilities' },
    { id: 'mission', label: 'Mission' },
    { id: 'contact', label: 'Contact' },
  ];
  const go = (id) => { setRoute(id); setOpen(false); window.scrollTo(0, 0); };

  // lock scroll when drawer open
  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <React.Fragment>
      <nav className="nav">
        <div className="nav-logo" onClick={() => go('home')}>
          <Glyph size={22} />
          <span className="lockup">GIDEON DYNAMICS</span>
        </div>
        <div className="nav-links">
          {links.map(l => (
            <button key={l.id} className={route === l.id ? 'active' : ''} onClick={() => go(l.id)}>
              {l.label}
            </button>
          ))}
        </div>
        <button className="nav-cta nav-cta-desktop" onClick={() => go('contact')}>
          Request Briefing →
        </button>
        <button
          className={`nav-burger ${open ? 'open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>
      <div className={`nav-drawer-backdrop ${open ? 'open' : ''}`} onClick={() => setOpen(false)}></div>
      <aside className={`nav-drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="nav-drawer-head">
          <div className="nav-logo">
            <Glyph size={22} />
            <span className="lockup">GIDEON DYNAMICS</span>
          </div>
          <button
            className="nav-drawer-close"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >×</button>
        </div>
        <div className="nav-drawer-links">
          {links.map(l => (
            <button
              key={l.id}
              className={`nav-drawer-link ${route === l.id ? 'active' : ''}`}
              onClick={() => go(l.id)}
            >
              <span className="nav-drawer-link-num">/ {String(links.indexOf(l) + 1).padStart(2, '0')}</span>
              <span className="nav-drawer-link-label">{l.label}</span>
              <span className="nav-drawer-link-arrow">→</span>
            </button>
          ))}
        </div>
        <button className="nav-drawer-cta" onClick={() => go('contact')}>
          Request Briefing →
        </button>
        <div className="nav-drawer-foot">
          <span>UNCLASSIFIED // FOR PUBLIC RELEASE</span>
          <span>GIDEON DYNAMICS, INC.</span>
        </div>
      </aside>
    </React.Fragment>
  );
};

const Classification = () => (
  <div className="classification">UNCLASSIFIED // FOR PUBLIC RELEASE — GIDEON DYNAMICS, INC.</div>
);

window.Glyph = Glyph;
window.NowUTC = NowUTC;
window.Nav = Nav;
window.Classification = Classification;
