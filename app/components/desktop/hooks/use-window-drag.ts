'use client';

import { useEffect, useRef, type RefObject } from 'react';

function offset(element: HTMLElement, axis: 'x' | 'y', icon = false) {
  return (
    parseFloat(element.style.getPropertyValue(`--${icon ? 'icon' : 'window'}-${axis}`)) ||
    0
  );
}

export function moveSurface(element: HTMLElement, dx: number, dy: number, icon = false) {
  const rect = element.getBoundingClientRect();
  const left = 8;
  const top = 42;
  const right = window.innerWidth - 8;
  const bottom = window.innerHeight - 58;
  // Keep the full surface inside the workspace when it fits; otherwise retain its title bar.
  const maxLeft = Math.max(left, right - rect.width);
  const maxTop = Math.max(top, bottom - rect.height);
  const x = Math.max(left, Math.min(maxLeft, rect.left + dx)) - rect.left;
  const y = Math.max(top, Math.min(maxTop, rect.top + dy)) - rect.top;
  element.style.setProperty(
    `--${icon ? 'icon' : 'window'}-x`,
    `${offset(element, 'x', icon) + x}px`,
  );
  element.style.setProperty(
    `--${icon ? 'icon' : 'window'}-y`,
    `${offset(element, 'y', icon) + y}px`,
  );
}

export function arrangeDesktop() {
  document
    .querySelectorAll<HTMLElement>(
      '.desktop .window, .dog-photo-window, .desktop-icon, .file-icon',
    )
    .forEach((element) => {
      for (const name of ['--window-x', '--window-y', '--icon-x', '--icon-y'])
        element.style.removeProperty(name);
      if (element.getClientRects().length)
        moveSurface(element, 0, 0, element.matches('.desktop-icon, .file-icon'));
    });
}

export function moveWindowByKey(event: React.KeyboardEvent<HTMLElement>) {
  if (event.target !== event.currentTarget) return;
  const directions: Record<string, [number, number]> = {
    ArrowLeft: [-20, 0],
    ArrowRight: [20, 0],
    ArrowUp: [0, -20],
    ArrowDown: [0, 20],
  };
  const delta = directions[event.key];
  if (!delta) return;
  event.preventDefault();
  const surface = event.currentTarget.closest<HTMLElement>('.window, .dog-photo-window');
  if (surface) moveSurface(surface, ...delta);
}

export function useWindowDrag() {
  const active = useRef({ key: '', x: 0, y: 0 });
  useEffect(() => {
    const reconcile = () => {
      if (matchMedia('(max-width: 760px)').matches) return;
      document
        .querySelectorAll<HTMLElement>(
          '.desktop .window, .dog-photo-window, .desktop-icon, .file-icon',
        )
        .forEach((element) => {
          if (element.getClientRects().length)
            moveSurface(element, 0, 0, element.matches('.desktop-icon, .file-icon'));
        });
    };
    window.addEventListener('resize', reconcile);
    return () => window.removeEventListener('resize', reconcile);
  }, []);
  function beginWindowDrag(event: React.PointerEvent<HTMLElement>, key: string) {
    if (
      event.button !== 0 ||
      matchMedia('(max-width: 760px)').matches ||
      (event.target as HTMLElement).closest('button')
    )
      return;
    active.current = { key, x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function moveWindow(
    event: React.PointerEvent<HTMLElement>,
    key: string,
    ref: RefObject<HTMLElement | null>,
  ) {
    if (
      active.current.key !== key ||
      !event.currentTarget.hasPointerCapture(event.pointerId) ||
      !ref.current
    )
      return;
    moveSurface(
      ref.current,
      event.clientX - active.current.x,
      event.clientY - active.current.y,
    );
    active.current.x = event.clientX;
    active.current.y = event.clientY;
  }
  function endWindowDrag(event: React.PointerEvent<HTMLElement>, key: string) {
    if (active.current.key !== key) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
    active.current.key = '';
  }
  return { beginWindowDrag, moveWindow, endWindowDrag };
}

/** A single drag implementation for folders and files; native click also handles keyboard activation. */
export function useIconDrag(onOpen: () => void) {
  const ref = useRef<HTMLButtonElement>(null);
  const drag = useRef({ x: 0, y: 0, moved: false });
  return {
    ref,
    onPointerDown(event: React.PointerEvent<HTMLButtonElement>) {
      if (event.button !== 0 || matchMedia('(max-width: 760px)').matches) return;
      drag.current = { x: event.clientX, y: event.clientY, moved: false };
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    onPointerMove(event: React.PointerEvent<HTMLButtonElement>) {
      if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
      const dx = event.clientX - drag.current.x;
      const dy = event.clientY - drag.current.y;
      if (!drag.current.moved && Math.hypot(dx, dy) < 4) return;
      drag.current.moved = true;
      moveSurface(event.currentTarget, dx, dy, true);
      drag.current.x = event.clientX;
      drag.current.y = event.clientY;
    },
    onPointerUp(event: React.PointerEvent<HTMLButtonElement>) {
      if (event.currentTarget.hasPointerCapture(event.pointerId))
        event.currentTarget.releasePointerCapture(event.pointerId);
    },
    onPointerCancel() {
      drag.current.moved = true;
    },
    onClick(event: React.MouseEvent<HTMLButtonElement>) {
      if (event.detail === 0 || !drag.current.moved) onOpen();
      drag.current.moved = false;
    },
    onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
      if (!event.altKey) return;
      const delta: Record<string, [number, number]> = {
        ArrowLeft: [-20, 0],
        ArrowRight: [20, 0],
        ArrowUp: [0, -20],
        ArrowDown: [0, 20],
      };
      if (delta[event.key]) {
        event.preventDefault();
        moveSurface(event.currentTarget, ...delta[event.key], true);
      }
    },
  };
}
