'use client';

import { useCallback, useEffect, useState, type SetStateAction } from 'react';
import { projects, type Project } from '../data';

/** Keep the desktop viewer shareable without replacing its window presentation. */
export function useProjectNavigation() {
  const [selected, select] = useState<Project | null>(null);
  useEffect(() => {
    const sync = () => {
      const id = new URL(window.location.href).searchParams.get('project');
      select(projects.find((project) => project.id === id) ?? null);
    };
    sync();
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);
  const setSelected = useCallback(
    (value: SetStateAction<Project | null>) => {
      const next = typeof value === 'function' ? value(selected) : value;
      const url = new URL(window.location.href);
      if (next) url.searchParams.set('project', next.id);
      else url.searchParams.delete('project');
      if (url.href !== window.location.href) {
        window.history.pushState(null, '', url);
      }
      select(next);
    },
    [selected],
  );
  return { selected, setSelected };
}
