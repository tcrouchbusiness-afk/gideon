import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';


// Glyph used in nav + footer
export const Glyph = ({ size = 22 }: { size?: number }) => (
  <img
    src="/gideonlogo.svg"
    alt="Gideon Dynamics"
    height={size}
    style={{ display: 'block', height: size, width: 'auto', objectFit: 'contain' }}
  />
);

export const NowUTC = () => {
  const [t, setT] = useState('');
  useEffect(() => {
    const pad = (n: number) => String(n).padStart(2, '0');
    const tick = () => {
      const d = new Date();
      setT(
        `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ` +
        `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}Z`
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span>{t}</span>;
};

export const Classification = () => (
  <div className="classification">UNCLASSIFIED // FOR PUBLIC RELEASE — GIDEON DYNAMICS, INC.</div>
);

const links = [
  { to: '/',             label: 'Index' },
  { to: '/programs',    label: 'Programs' },
  { to: '/capabilities', label: 'Capabilities' },
  { to: '/mission',     label: 'Mission' },
  { to: '/contact',     label: 'Contact' },
];

export default function Nav() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const go = (to: string) => {
    navigate(to);
    setOpen(false);
    window.scrollTo(0, 0);
  };

  // lock scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <nav className="nav">
        <NavLink to="/" className="nav-logo" onClick={() => { setOpen(false); window.scrollTo(0, 0); }}>
          <Glyph size={22} />
          <span className="lockup">GIDEON DYNAMICS</span>
        </NavLink>
        <div className="nav-links">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              {l.label}
            </NavLink>
          ))}
        </div>
        <button className="nav-cta nav-cta-desktop" onClick={() => go('/contact')}>
          Request Briefing →
        </button>
        <button
          className={`nav-burger${open ? ' open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>
      <div
        className={`nav-drawer-backdrop${open ? ' open' : ''}`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`nav-drawer${open ? ' open' : ''}`}
        aria-hidden={!open}
        {...(!open ? { inert: true } : {})}
      >
        <div className="nav-drawer-head">
          <NavLink to="/" className="nav-logo" onClick={() => { setOpen(false); window.scrollTo(0, 0); }}>
            <Glyph size={22} />
            <span className="lockup">GIDEON DYNAMICS</span>
          </NavLink>
          <button
            className="nav-drawer-close"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >×</button>
        </div>
        <div className="nav-drawer-links">
          {links.map((l, i) => (
            <button
              key={l.to}
              className="nav-drawer-link"
              onClick={() => go(l.to)}
            >
              <span className="nav-drawer-link-num">/ {String(i + 1).padStart(2, '0')}</span>
              <span className="nav-drawer-link-label">{l.label}</span>
              <span className="nav-drawer-link-arrow">→</span>
            </button>
          ))}
        </div>
        <button className="nav-drawer-cta" onClick={() => go('/contact')}>
          Request Briefing →
        </button>
        <div className="nav-drawer-foot">
          <span>UNCLASSIFIED // FOR PUBLIC RELEASE</span>
          <span>GIDEON DYNAMICS, INC.</span>
        </div>
      </aside>
    </>
  );
}
