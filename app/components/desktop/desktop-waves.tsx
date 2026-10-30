'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ShapeWaves = dynamic(() => import('../react-bits/ShapeWaves'), { ssr: false });

export function DesktopWaves() {
  const [enabled, setEnabled] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const query = matchMedia(
      '(min-width: 761px) and (prefers-reduced-motion: no-preference)',
    );
    const sync = () => setEnabled(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);
  return (
    <div className="desktop-waves" aria-hidden="true">
      {enabled && !failed && (
        <ShapeWaves
          shapes="squares"
          cellSize={22}
          dotSize={0.4}
          color="#939b87"
          backgroundColor="#171817"
          speed={0.12}
          contrast={0.7}
          brightness={0.25}
          flow={0}
          glow={0}
          intro={false}
          interactive
          hoverColor="#e7e8e3"
          splashRadius={90}
          splashStrength={0.65}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
