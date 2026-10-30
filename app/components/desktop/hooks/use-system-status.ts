'use client';

import { useEffect, useState } from 'react';
import type { BootStage } from '../data';

export function useSystemStatus() {
  const [bootStage, setBootStage] = useState<BootStage>('booting');
  const [time, setTime] = useState('');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setBootStage('ready');
      return;
    }

    const leaveTimer = window.setTimeout(() => setBootStage('leaving'), 1450);
    const readyTimer = window.setTimeout(() => setBootStage('ready'), 1780);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(readyTimer);
    };
  }, []);

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Intl.DateTimeFormat('en-ZA', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date()),
      );
    };

    updateTime();
    const timer = window.setInterval(updateTime, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return { bootStage, time };
}
