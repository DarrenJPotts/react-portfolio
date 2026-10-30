'use client';

import { useEffect, useRef } from 'react';

export default function PopCursor() {
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    const element = cursor.current;
    if (!element) return;
    function move(event: PointerEvent) {
      if (!media.matches || event.pointerType === 'touch') return;
      element!.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      element!.dataset.visible = 'true';
      const target = event.target as Element;
      element!.dataset.interactive = String(
        !!target.closest('a, button, summary, [role="button"]'),
      );
      const native = !!target.closest(
        'input, textarea, select, video, [contenteditable="true"]',
      );
      document.documentElement.classList.toggle('pop-cursor-active', !native);
      if (native) element!.dataset.visible = 'false';
    }
    function hide() {
      element!.dataset.visible = 'false';
      document.documentElement.classList.remove('pop-cursor-active');
    }
    function down() {
      element!.dataset.pressed = 'true';
    }
    function up() {
      element!.dataset.pressed = 'false';
    }
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerdown', down);
    document.addEventListener('pointerup', up);
    document.addEventListener('pointerleave', hide);
    window.addEventListener('blur', hide);
    media.addEventListener('change', hide);
    return () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerdown', down);
      document.removeEventListener('pointerup', up);
      document.removeEventListener('pointerleave', hide);
      window.removeEventListener('blur', hide);
      media.removeEventListener('change', hide);
      hide();
    };
  }, []);
  return (
    <div ref={cursor} className="pop-cursor" aria-hidden="true">
      <span className="pop-cursor-ring" />
      <span className="pop-cursor-center" />
    </div>
  );
}
