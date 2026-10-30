'use client';

import { useEffect, type RefObject } from 'react';

/** Nonmodal windows get focus on arrival, and return it to their opener on close. */
export function useSurfaceFocus(
  ref: RefObject<HTMLElement | null>,
  identity: string | null,
  fallback?: string,
) {
  useEffect(() => {
    if (!identity || !ref.current || !ref.current.getClientRects().length) return;
    const opener =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const frame = requestAnimationFrame(() => {
      const surface = ref.current;
      if (!surface) return;
      const target =
        surface.querySelector<HTMLElement>('h1, h2') ??
        surface.querySelector<HTMLElement>('[data-initial-focus], button');
      if (target) {
        if (/^H[12]$/.test(target.tagName)) target.tabIndex = -1;
        target.focus({ preventScroll: true });
      }
    });
    return () => {
      cancelAnimationFrame(frame);
      const target =
        opener?.isConnected && opener.getClientRects().length
          ? opener
          : fallback
            ? document.querySelector<HTMLElement>(fallback)
            : null;
      target?.focus({ preventScroll: true });
    };
  }, [ref, identity, fallback]);
}
