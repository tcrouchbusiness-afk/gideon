// Globe tile — swappable rendering of the Global Posture visual.
//
// Change MODE to switch between strategies. No other edits needed.
//
//   'poster'        → static PNG. Instant load, zero cost. (DEFAULT)
//                     Click "ACTIVATE LIVE FEED" to swap in the live iframe on demand.
//   'iframe-eager'  → iframe always mounted, runs continuously. (Original behavior — laggy.)
//   'iframe-lazy'   → iframe mounts when the tile scrolls into view, unmounts when out.
//                     Cheaper than eager but still pays full cost while visible.
//
// To revert to the original live-globe behavior, set MODE = 'iframe-eager'.

const MODE = 'poster';

const GlobeIframe = () => (
  <iframe
    src="gideon_globe.html"
    title="Gideon Dynamics Global Posture"
    loading="lazy"
  ></iframe>
);

// Lazy variant — only mounts the iframe when the wrapper is visible
const LazyGlobeIframe = () => {
  const wrapRef = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => setVisible(e.isIntersecting)),
      { rootMargin: '120px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} style={{ position: 'absolute', inset: 0 }}>
      {visible
        ? <GlobeIframe />
        : <div className="globe-poster-placeholder">[ STANDBY ]</div>
      }
    </div>
  );
};

// Poster variant — static image with an "Activate" button that swaps in the live iframe
const PosterGlobe = () => {
  // States: 'idle' | 'booting' | 'live'
  const [state, setState] = React.useState('idle');
  const [statusIdx, setStatusIdx] = React.useState(0);

  const STATUS_LINES = [
    'INITIATING HANDSHAKE',
    'ATTESTING THEATERS',
    'DECRYPTING TELEMETRY',
    'SYNCING ORBITAL',
    'STREAM LIVE',
  ];

  // Boot sequence: cycle status lines, then transition to 'live'
  React.useEffect(() => {
    if (state !== 'booting') return;
    const lineInterval = setInterval(() => {
      setStatusIdx(i => Math.min(i + 1, STATUS_LINES.length - 1));
    }, 280);
    const finishTimer = setTimeout(() => {
      setState('live');
    }, 1700);
    return () => { clearInterval(lineInterval); clearTimeout(finishTimer); };
  }, [state]);

  const handleActivate = () => {
    if (state === 'idle') {
      setStatusIdx(0);
      setState('booting');
    }
  };

  return (
    <div className={`globe-poster-stage state-${state}`}>
      {/* Iframe pre-mounts during booting so it's warm by the time poster fades */}
      {state !== 'idle' && (
        <div className="globe-poster-iframe-layer">
          <GlobeIframe />
        </div>
      )}

      {/* Poster layer (fades out during/after boot) */}
      {state !== 'live' && (
        <button
          className="globe-poster"
          type="button"
          onClick={handleActivate}
          disabled={state === 'booting'}
          aria-label="Activate live global posture feed"
        >
          <img
            src="globe-poster.png"
            alt="Global posture — 9 theaters under continuous attestation"
            className="globe-poster-img"
          />
          {/* Animated scanlines & boot effects */}
          <span className="globe-poster-scan"></span>
          <span className="globe-poster-grid"></span>
          {/* Corner brackets */}
          <span className="globe-poster-corner tl"></span>
          <span className="globe-poster-corner tr"></span>
          <span className="globe-poster-corner bl"></span>
          <span className="globe-poster-corner br"></span>
          {/* Boot ripple */}
          {state === 'booting' && (
            <React.Fragment>
              <span className="globe-poster-ripple r1"></span>
              <span className="globe-poster-ripple r2"></span>
              <span className="globe-poster-ripple r3"></span>
            </React.Fragment>
          )}
          <span className="globe-poster-overlay">
            <span className="globe-poster-cta">
              <span className="globe-poster-cta-icon">{state === 'booting' ? '◉' : '▶'}</span>
              <span className="globe-poster-cta-label">
                {state === 'booting' ? 'BOOTING' : 'ACTIVATE LIVE FEED'}
              </span>
            </span>
            <span className="globe-poster-status">
              {state === 'booting' ? (
                <React.Fragment>
                  <span className="globe-poster-status-cursor">›</span>
                  <span className="globe-poster-status-text">{STATUS_LINES[statusIdx]}</span>
                  <span className="globe-poster-status-dots"></span>
                </React.Fragment>
              ) : (
                <span className="globe-poster-hint">STATIC PREVIEW · CLICK TO STREAM LIVE WEBGL</span>
              )}
            </span>
          </span>
        </button>
      )}
    </div>
  );
};

const GlobeTile = () => (
  <div className="globe-tile globe-iframe-tile">
    <div className="globe-head">
      <span>GLOBAL POSTURE · 9 THEATERS</span>
      <span className="live"><span className="dot"></span>LIVE</span>
    </div>
    <div className="globe-iframe-wrap">
      {MODE === 'poster' && <PosterGlobe />}
      {MODE === 'iframe-eager' && <GlobeIframe />}
      {MODE === 'iframe-lazy' && <LazyGlobeIframe />}
    </div>
  </div>
);

window.GlobeTile = GlobeTile;
