'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useMotionSettings } from './motion-settings';
import type { Project } from './data';
import Carousel from '../react-bits/Carousel';
import CircularCarousel from '../react-bits/CircularCarousel';

export function ScreenshotCarousel({ project }: { project: Project }) {
  const screens = useMemo(
    () => project.screens.filter((screen) => screen.image),
    [project],
  );
  const items = useMemo(
    () =>
      screens.map((screen) => ({
        src: screen.image!,
        alt: `${project.title}: ${screen.label}`,
        title: screen.label,
      })),
    [screens, project.title],
  );
  const { paused } = useMotionSettings();
  const [index, setIndex] = useState(0);
  const [reduce, setReduce] = useState(false);
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      setReduce(media.matches);
      setIndex(0);
    };
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);
  if (!screens.length) return null;
  function step(key: string) {
    root.current
      ?.querySelector('.circular-carousel')
      ?.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
  }
  return (
    <section
      ref={root}
      className="screenshot-carousel retro-circular"
      aria-label={`${project.title} screenshots`}
    >
      {reduce || paused ? (
        <Carousel
          items={items.map((item) => ({ image: item.src, alt: item.alt }))}
          baseWidth="100%"
          aspectRatio={0.48}
          effect="slide"
          indicator="dots"
          arrows
          autoplay={false}
          draggable={false}
          onChange={setIndex}
          className="app-react-bits-carousel"
        />
      ) : (
        <>
          <div className="retro-circular-stage">
            <CircularCarousel
              items={items}
              preset="orbit"
              intro="none"
              cardWidth={600}
              aspectRatio={746 / 1518}
              gap={96}
              curve={0}
              tilt={0}
              perspective={2700}
              autoplay="off"
              draggable
              momentum={0.35}
              snap
              focusOnClick
              parallax={0}
              stretch={0}
              depthFade={0.12}
              fadeColor="#292b27"
              innerShade={0}
              cornerRadius={22}
              onChange={setIndex}
            />
          </div>
          <div className="retro-carousel-controls">
            <button
              type="button"
              aria-label="Previous screenshot"
              onClick={() => step('ArrowLeft')}
            >
              ←
            </button>
            <span>
              {index + 1} / {screens.length}
            </span>
            <button
              type="button"
              aria-label="Next screenshot"
              onClick={() => step('ArrowRight')}
            >
              →
            </button>
          </div>
        </>
      )}
      <p className="screenshot-caption" aria-live="polite" aria-atomic="true">
        <strong>{screens[index]?.label}</strong>
      </p>
    </section>
  );
}
