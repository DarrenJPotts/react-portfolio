'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

const MotionSettings = createContext({ paused: false, toggle: () => {} });
export const useMotionSettings = () => useContext(MotionSettings);

export function MotionSettingsProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  return (
    <MotionSettings.Provider
      value={{ paused, toggle: () => setPaused((value) => !value) }}
    >
      <div className="portfolio-surfaces" data-motion-paused={paused || undefined}>
        {children}
      </div>
    </MotionSettings.Provider>
  );
}

export function MotionToggle() {
  const { paused, toggle } = useMotionSettings();
  return (
    <button
      className="motion-toggle"
      type="button"
      onClick={toggle}
      aria-pressed={paused}
    >
      {paused ? 'Resume motion' : 'Pause motion'}
    </button>
  );
}
