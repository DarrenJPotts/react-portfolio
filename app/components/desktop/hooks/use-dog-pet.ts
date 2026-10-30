'use client';

import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { useMotionSettings } from '../motion-settings';

function animateDogPet(runner: HTMLButtonElement) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let frameLoop: gsap.core.Timeline | undefined;
  let movement: gsap.core.Tween | undefined;
  let pause: gsap.core.Tween | undefined;
  const context = gsap.context(() => {
    const sprite = runner.querySelector<HTMLElement>('.pixel-dog');
    if (!sprite) return;

    const runFrames = [
      ...Array.from({ length: 6 }, (_, column) => [column, 1]),
      ...Array.from({ length: 5 }, (_, column) => [column, 2]),
    ];
    const sitFrames = [
      ...Array.from({ length: 4 }, (_, column) => [column, 3]),
      ...Array.from({ length: 4 }, (_, column) => [column, 4]),
    ];
    const frameDuration = 0.1;
    let direction: 1 | -1 = 1;
    gsap.set(runner, { x: 0 });
    gsap.set(sprite, { scaleX: -1 });

    const animateFrames = (frames: number[][]) => {
      const timeline = gsap.timeline({ repeat: -1 });
      frames.forEach(([column, row], index) => {
        timeline.set(
          sprite,
          { backgroundPosition: `${-column * 60}px ${-row * 38}px` },
          index * frameDuration,
        );
      });
      timeline.set(sprite, {}, frames.length * frameDuration);
      return timeline;
    };

    const runLeg = () => {
      frameLoop?.kill();
      gsap.set(sprite, { scaleX: direction === 1 ? -1 : 1 });
      frameLoop = animateFrames(runFrames);
      movement = gsap.to(runner, {
        x: () => (direction === 1 ? Math.max(0, window.innerWidth - 112) : 0),
        duration: 12,
        ease: 'none',
        onComplete: () => {
          frameLoop?.kill();
          frameLoop = animateFrames(sitFrames);
          pause = gsap.delayedCall(2.2, () => {
            direction = direction === 1 ? -1 : 1;
            runLeg();
          });
        },
      });
    };

    runLeg();
  });

  return () => {
    frameLoop?.kill();
    movement?.kill();
    pause?.kill();
    context.revert();
  };
}

export function useDogPet(runner: RefObject<HTMLButtonElement | null>, active = true) {
  const { paused } = useMotionSettings();
  useEffect(() => {
    if (!active || !runner.current) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let stop: (() => void) | undefined;
    const sync = () => {
      stop?.();
      stop =
        !paused && !preference.matches && runner.current
          ? animateDogPet(runner.current)
          : undefined;
    };
    sync();
    preference.addEventListener('change', sync);
    return () => {
      stop?.();
      preference.removeEventListener('change', sync);
    };
  }, [active, paused, runner]);
}
