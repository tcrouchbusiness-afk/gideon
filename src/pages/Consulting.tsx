// Standalone "Gideon Dynamics" placeholder served at /consulting.
// Renders a full-viewport overlay (position:fixed; inset:0; z-index:9999) so the
// global site Nav/header/footer is fully covered — the route shows the bare
// placeholder only. All CSS is scoped under `.gd-consulting` so it cannot leak
// into the rest of the SPA while this component is mounted.

const css = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500&family=Inter:wght@400;500&display=swap');

.gd-consulting{
  position:fixed;
  inset:0;
  z-index:9999;
  overflow:auto;
  min-height:100vh;
  background:#0b1220;
  color:#eef1f6;
  font-family:"Inter",system-ui,sans-serif;
  display:flex;align-items:center;justify-content:center;
  text-align:center;padding:28px;
  -webkit-font-smoothing:antialiased;
}
.gd-consulting *{box-sizing:border-box;margin:0;padding:0}
.gd-consulting .field{position:fixed;inset:0;pointer-events:none;
  background:
    radial-gradient(820px 480px at 50% -12%, rgba(120,150,190,.14), transparent 64%),
    linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px) 0 0/100% 64px,
    linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px) 0 0/64px 100%;
  mask:radial-gradient(closest-side at 50% 42%, #000, transparent);
  -webkit-mask:radial-gradient(closest-side at 50% 42%, #000, transparent);
  opacity:.65;
}
.gd-consulting .content{position:relative;z-index:1;max-width:560px}
.gd-consulting .mark{width:40px;height:40px;border:1px solid rgba(199,162,75,.45);border-radius:9px;display:grid;place-items:center;margin:0 auto 28px;background:linear-gradient(180deg,#152034,#0c1322)}
.gd-consulting .mark:before{content:"";width:15px;height:15px;border:1.5px solid #c7a24b;transform:rotate(45deg);border-radius:2px}
.gd-consulting .brand{font-size:13px;letter-spacing:.36em;text-transform:uppercase;color:#9fb0c9}
.gd-consulting .rule{width:46px;height:1px;background:rgba(199,162,75,.5);margin:22px auto 0}
.gd-consulting h1{font-family:"Fraunces",Georgia,serif;font-weight:400;font-size:clamp(32px,5.6vw,50px);line-height:1.12;letter-spacing:-.015em;margin:24px 0 0}
.gd-consulting h1 em{font-style:italic;color:#9fb6d4}
.gd-consulting p{color:#9fb0c9;font-size:17px;line-height:1.65;margin:24px auto 0;max-width:46ch}
.gd-consulting .tag{display:inline-flex;align-items:center;gap:9px;margin-top:36px;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#c7a24b;border:1px solid rgba(199,162,75,.28);padding:8px 16px;border-radius:100px}
.gd-consulting .dot{width:6px;height:6px;border-radius:50%;background:#c7a24b}
.gd-consulting footer{position:fixed;bottom:24px;left:0;right:0;text-align:center;font-size:11.5px;letter-spacing:.04em;color:#5d6a82}
`

export default function Consulting() {
  return (
    <div className="gd-consulting">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="field"></div>
      <div className="content">
        <div className="mark"></div>
        <div className="brand">Gideon Dynamics</div>
        <div className="rule"></div>
        <h1>Defense‑grade intelligence,<br /><em>institutional discipline.</em></h1>
        <p>Sovereign data and infrastructure for the defense industrial base — owned, controlled, and built to endure.</p>
        <span className="tag"><span className="dot"></span> Coming soon</span>
      </div>
      <footer>© 2026 Gideon Dynamics &nbsp;·&nbsp; Defense &amp; industrial intelligence</footer>
    </div>
  )
}
