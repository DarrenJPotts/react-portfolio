'use client';

import { useRef, type RefObject } from 'react';

type DragPosition = { x: number; y: number };
type ActiveDrag = DragPosition & {
  key: string;
  startX: number;
  startY: number;
};

export function useWindowDrag() {
  const positions = useRef(new Map<string, DragPosition>());
  const active = useRef<ActiveDrag>({
    key: '',
    x: 0,
    y: 0,
    startX: 0,
    startY: 0,
  });

  function beginWindowDrag(event: React.PointerEvent<HTMLElement>, key: string) {
    if (
      matchMedia('(max-width: 760px)').matches ||
      (event.target as HTMLElement).closest('button')
    )
      return;

    const position = positions.current.get(key) ?? { x: 0, y: 0 };
    active.current = {
      key,
      startX: event.clientX,
      startY: event.clientY,
      x: position.x,
      y: position.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moveWindow(
    event: React.PointerEvent<HTMLElement>,
    key: string,
    windowRef: RefObject<HTMLElement | null>,
  ) {
    if (
      active.current.key !== key ||
      !event.currentTarget.hasPointerCapture(event.pointerId)
    )
      return;

    const x = active.current.x + event.clientX - active.current.startX;
    const y = active.current.y + event.clientY - active.current.startY;
    positions.current.set(key, { x, y });
    windowRef.current?.style.setProperty('--window-x', `${x}px`);
    windowRef.current?.style.setProperty('--window-y', `${y}px`);
  }

  function endWindowDrag(event: React.PointerEvent<HTMLElement>, key: string) {
    if (active.current.key !== key) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
    active.current.key = '';
  }

  return { beginWindowDrag, moveWindow, endWindowDrag };
}
