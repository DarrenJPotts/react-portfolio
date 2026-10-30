'use client';

import type { CSSProperties } from 'react';
import type { Project } from './data';

// Lightweight CSS adaptations of React Bits Folder and Pixel Transition:
// https://reactbits.dev/components/folder
// https://reactbits.dev/animations/pixel-transition
// Decorative only: the parent button owns all keyboard and drag interactions.
export function RetroFolder({ project }: { project: Project }) {
  const screenshots = project.screens.filter((screen) => screen.image);
  const cards = screenshots.length
    ? screenshots.slice(0, 3)
    : project.screens.slice(0, 1);
  return (
    <span className="folder retro-folder" aria-hidden="true">
      <span className="retro-folder-pages">
        {cards.map((screen, index) => (
          <span
            className="retro-folder-page"
            key={screen.label}
            style={{ '--page-index': index + (3 - cards.length) / 2 } as CSSProperties}
          >
            {screen.image ? (
              <img src={screen.image} alt="" draggable={false} />
            ) : (
              <span>{screen.label}</span>
            )}
          </span>
        ))}
      </span>
      <span className="retro-folder-front">
        <i />
      </span>
    </span>
  );
}

export function PixelWindowReveal() {
  return (
    <span className="pixel-window-reveal" aria-hidden="true">
      {Array.from({ length: 48 }, (_, index) => (
        <i
          key={index}
          style={{ '--pixel-delay': `${((index * 17) % 23) * 8}ms` } as CSSProperties}
        />
      ))}
    </span>
  );
}
