import { useState, useEffect, useRef } from 'react';
import { Glyph } from './Nav';

const SPLASH_LINES = [
  { text: '$ gideon auth --identity defender.07 --token ••••••', ok: false },
  { text: '✓ identity verified · clearance: TS/SCI · enclave: REDOUBT-A', ok: true },
  { text: '$ redoubt status --scope perimeter', ok: false },
  { text: '→ 14,221 assets attested · posture auto-staged', ok: false },
  { text: '✓ perimeter holding · zero data egress', ok: true },
];

interface SplashScreenProps {
  onDone: () => void;
}

export default function SplashScreen({ onDone }: SplashScreenProps) {
  const [visLines, setVisLines] = useState(0);
  const [typed, setTyped] = useState('');
  const [showLogo, setShowLogo] = useState(false);
  const [out, setOut] = useState(false);

  const onDoneRef = useRef(onDone);
  useEffect(() => { onDoneRef.current = onDone; }, [onDone]);

  useEffect(() => {
    const T: ReturnType<typeof setTimeout>[] = [];
    let line = 0,
      char = 0;

    function step() {
      if (line >= SPLASH_LINES.length) {
        T.push(setTimeout(() => setShowLogo(true), 250));
        T.push(setTimeout(() => setOut(true), 1200));
        T.push(setTimeout(() => onDoneRef.current(), 1800));
        return;
      }
      const txt = SPLASH_LINES[line].text;
      if (char <= txt.length) {
        setTyped(txt.slice(0, char));
        char++;
        T.push(
          setTimeout(
            step,
            char <= txt.length ? Math.random() * 5 + 3 : 80
          )
        );
      } else {
        setVisLines((v) => v + 1);
        line++;
        char = 0;
        T.push(setTimeout(step, 35));
      }
    }

    T.push(setTimeout(step, 200));
    return () => T.forEach(clearTimeout);
  }, []);

  return (
    <div className={'splash' + (out ? ' splash--out' : '')}>
      <div className="splash-term">
        <div className="splash-term-hdr">GIDEON DYNAMICS / SECURE SHELL v13.04</div>

        {SPLASH_LINES.map((l, i) => {
          if (i < visLines)
            return (
              <div
                key={i}
                className={'splash-line' + (l.ok ? ' splash-line--ok' : '')}
              >
                {l.text}
              </div>
            );
          if (i === visLines)
            return (
              <div
                key={i}
                className={
                  'splash-line' +
                  (SPLASH_LINES[visLines]?.ok ? ' splash-line--ok' : '')
                }
              >
                {typed}
                <span className="splash-cursor" />
              </div>
            );
          return null;
        })}

        <div
          className={'splash-reveal' + (showLogo ? ' splash-reveal--vis' : '')}
        >
          <Glyph size={42} />
          <div className="splash-reveal-name">GIDEON DYNAMICS</div>
          <div className="splash-reveal-tag">
            PERSISTENCE IN AN UNPERSISTANT WORLD
          </div>
        </div>
      </div>
    </div>
  );
}
