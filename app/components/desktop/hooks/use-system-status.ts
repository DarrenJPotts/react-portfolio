'use client';

import { useEffect, useState } from 'react';
import type { BootStage } from '../data';

export function useSystemStatus() {
  const [bootStage, setBootStage] = useState<BootStage>('booting');
  const [time, setTime] = useState('');

  useEffect(() => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      matchMedia('(max-width: 760px)').matches
    ) {
      setBootStage('ready');
      return;
    }

    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const stopBoot = () => {
      if (preference.matches) {
        window.clearTimeout(leaveTimer);
        window.clearTimeout(readyTimer);
        setBootStage('ready');
      }
    };
    preference.addEventListener('change', stopBoot);
    const leaveTimer = window.setTimeout(() => setBootStage('leaving'), 650);
    const readyTimer = window.setTimeout(() => setBootStage('ready'), 980);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(readyTimer);
      preference.removeEventListener('change', stopBoot);
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
