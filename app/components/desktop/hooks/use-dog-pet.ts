'use client';

import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';

function animateDogPet(runner: HTMLButtonElement) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const animations: gsap.core.Animation[] = [];
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
    let frameLoop: gsap.core.Timeline | undefined;
    gsap.set(runner, { x: 0 });
    gsap.set(sprite, { scaleX: -1 });

    const animateFrames = (frames: number[][]) => {
      const timeline = gsap.timeline({ repeat: -1 });
      animations.push(timeline);
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
      animations.push(
        gsap.to(runner, {
          x: () => (direction === 1 ? Math.max(0, window.innerWidth - 112) : 0),
          duration: 12,
          ease: 'none',
          onComplete: () => {
            frameLoop?.kill();
            frameLoop = animateFrames(sitFrames);
            animations.push(
              gsap.delayedCall(2.2, () => {
                direction = direction === 1 ? -1 : 1;
                runLeg();
              }),
            );
          },
        }),
      );
    };

    runLeg();
  });

  return () => {
    animations.forEach((animation) => animation.kill());
    context.revert();
  };
}

export function useDogPet(runner: RefObject<HTMLButtonElement | null>, active = true) {
  useEffect(() => {
    if (!active || !runner.current) return;
    return animateDogPet(runner.current);
  }, [active, runner]);
}
