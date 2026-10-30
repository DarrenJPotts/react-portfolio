'use client';

import { useEffect, useRef, useState } from 'react';
import type { Project, ViewportMode, WorkspaceMode } from './data';
import { RetroFolder } from './retro-effects';
import { ScreenshotCarousel } from './screenshot-carousel';

export function CaseStudyPreview({ project }: { project: Project }) {
  const isWebsite = /website|web/i.test(project.kind);
  const firstScreen = project.screens[0];

  return (
    <div
      className={`case-study-preview ${isWebsite ? 'website-preview' : 'app-preview'}`}
    >
      {isWebsite ? (
        <>
          <div
            className="case-study-laptop"
            aria-label={`Website preview for ${project.title}`}
          >
            <div className="laptop-screen-frame">
              <span className="laptop-camera" aria-hidden="true" />
              <div className="laptop-screen-content">
                {project.previewImage ? (
                  <img
                    src={project.previewImage}
                    alt={`Screenshot of ${project.title}`}
                  />
                ) : project.demoUrl ? (
                  <iframe
                    src={project.demoUrl}
                    title={`${project.title} live website preview`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    sandbox="allow-scripts allow-forms allow-same-origin"
                  />
                ) : (
                  <div className="website-preview-placeholder">
                    <strong>{project.title}</strong>
                    <span>{firstScreen?.caption}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="laptop-base" aria-hidden="true">
              <i />
            </div>
          </div>
          {project.demoUrl && (
            <a
              className="case-study-preview-link"
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
            >
              OPEN LIVE WEBSITE <span>↗</span>
            </a>
          )}
        </>
      ) : (
        <>
          {project.screens.some((screen) => screen.image) ? (
            <ScreenshotCarousel key={project.id} project={project} />
          ) : (
            <div
              className="case-study-phone"
              aria-label={`Mobile app preview for ${project.title}`}
            >
              <div className="phone-screen-frame">
                <span className="phone-island" aria-hidden="true" />
                {project.previewImage ? (
                  <img
                    src={project.previewImage}
                    alt={`Screenshot of ${project.title}`}
                  />
                ) : (
                  <div className="phone-prototype-screen">
                    <div className="phone-prototype-status">
                      <span>9:41</span>
                      <span>● ● ●</span>
                    </div>
                    <div className="phone-prototype-content">
                      <small>
                        {firstScreen?.label ?? 'OVERVIEW'} / {project.year}
                      </small>
                      <h3>{project.title.replace(/\.(app|web)/, '')}</h3>
                      <p>{firstScreen?.caption ?? project.summary}</p>
                      <div className="phone-prototype-card">
                        <span>YOUR SPACE</span>
                        <i />
                        <i />
                        <i />
                      </div>
                      <div className="phone-prototype-action">
                        OPEN {firstScreen?.label ?? 'PROJECT'}
                      </div>
                    </div>
                    <div className="phone-prototype-tabbar">
                      <i />
                      <i />
                      <i />
                      <i />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {project.demoUrl && (
            <a
              className="case-study-preview-link"
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
            >
              OPEN LIVE PROJECT <span>↗</span>
            </a>
          )}
        </>
      )}
    </div>
  );
}

export function DraggableIcon({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const drag = useRef({ x: 0, y: 0, startX: 0, startY: 0, moved: false });

  function onPointerDown(event: React.PointerEvent<HTMLButtonElement>) {
    if (matchMedia('(max-width: 760px)').matches || event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current.startX = event.clientX - drag.current.x;
    drag.current.startY = event.clientY - drag.current.y;
    drag.current.moved = false;
  }

  function onPointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    const x = event.clientX - drag.current.startX;
    const y = event.clientY - drag.current.startY;
    if (Math.abs(x - drag.current.x) > 3 || Math.abs(y - drag.current.y) > 3)
      drag.current.moved = true;
    drag.current.x = x;
    drag.current.y = y;
    if (ref.current) ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  function onPointerUp(event: React.PointerEvent<HTMLButtonElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
    if (!drag.current.moved) onOpen();
  }

  return (
    <button
      ref={ref}
      className="desktop-icon"
      style={project.placement}
      type="button"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={(event) => {
        drag.current.moved = true;
        if (event.currentTarget.hasPointerCapture(event.pointerId))
          event.currentTarget.releasePointerCapture(event.pointerId);
      }}
      onClick={(event) => {
        if (event.detail === 0) onOpen();
      }}
      onDoubleClick={onOpen}
    >
      <RetroFolder project={project} />
      <strong>{project.title}</strong>
      <small>{project.kind}</small>
    </button>
  );
}

export function DraggableFileIcon({
  className,
  label,
  onOpen,
  type,
}: {
  className: string;
  label: string;
  onOpen: () => void;
  type: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const drag = useRef({ x: 0, y: 0, startX: 0, startY: 0, moved: false });

  function onPointerDown(event: React.PointerEvent<HTMLButtonElement>) {
    if (matchMedia('(max-width: 760px)').matches || event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current.startX = event.clientX - drag.current.x;
    drag.current.startY = event.clientY - drag.current.y;
    drag.current.moved = false;
  }

  function onPointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    const x = event.clientX - drag.current.startX;
    const y = event.clientY - drag.current.startY;
    if (Math.abs(x - drag.current.x) > 3 || Math.abs(y - drag.current.y) > 3)
      drag.current.moved = true;
    drag.current.x = x;
    drag.current.y = y;
    if (ref.current) ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  function onPointerUp(event: React.PointerEvent<HTMLButtonElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
    if (!drag.current.moved) onOpen();
  }

  return (
    <button
      ref={ref}
      className={`file-icon ${className}`}
      type="button"
      aria-label={`Open ${label}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <span>{type}</span>
      <strong>{label}</strong>
    </button>
  );
}

export function DeviceBench({
  project,
  viewportMode,
  onViewportChange,
  reachOverlay,
  onReachToggle,
}: {
  project: Project;
  viewportMode: ViewportMode;
  onViewportChange: (mode: ViewportMode) => void;
  reachOverlay: boolean;
  onReachToggle: () => void;
}) {
  return (
    <div className="device-bench">
      <div className="viewport-controls" aria-label="Preview device size">
        {(['phone', 'tablet', 'browser'] as const).map((mode) => (
          <button
            key={mode}
            type="button"
            className={viewportMode === mode ? 'active' : ''}
            aria-pressed={viewportMode === mode}
            onClick={() => onViewportChange(mode)}
          >
            {mode === 'browser' ? 'WEB' : mode.toUpperCase()}
          </button>
        ))}
      </div>
      {viewportMode === 'phone' && (
        <button
          className={`reach-toggle ${reachOverlay ? 'active' : ''}`}
          type="button"
          aria-pressed={reachOverlay}
          onClick={onReachToggle}
        >
          <i /> THUMB ZONES {reachOverlay ? 'ON' : 'OFF'}
        </button>
      )}
      <div className={`${viewportMode}-preview ${reachOverlay ? 'show-reach' : ''}`}>
        <span>{project.kind}</span>
        <strong>{project.title.replace(/\.(app|web)/, '')}</strong>
        <i />
        <span className="focus-reticle" aria-hidden="true">
          <i />
        </span>
        {reachOverlay && (
          <span className="reach-zone" aria-hidden="true">
            <i />
          </span>
        )}
      </div>
      <div className="bench-readout" aria-live="polite">
        <span>
          <i /> {project.title}
        </span>
        <strong>
          {project.stack[0]} · {project.year}
        </strong>
        <small>{project.kind}</small>
      </div>
    </div>
  );
}

export function AnimatedHeadline({ lines }: { lines: string[] }) {
  const fullText = lines.join(' ');
  const [visibleCharacters, setVisibleCharacters] = useState(fullText.length);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisibleCharacters(fullText.length);
      return;
    }

    setVisibleCharacters(0);
    let count = 0;
    const timer = window.setInterval(() => {
      count += 1;
      setVisibleCharacters(count);
      if (count >= fullText.length) window.clearInterval(timer);
    }, 32);

    return () => window.clearInterval(timer);
  }, [fullText]);

  let consumedCharacters = 0;

  return (
    <h1 aria-label={fullText}>
      {lines.map((line, index) => {
        const remaining = Math.max(0, visibleCharacters - consumedCharacters);
        const visibleLine = line.slice(0, remaining);
        consumedCharacters += line.length + 1;
        return (
          <span key={`${index}-${line}`} aria-hidden="true">
            {visibleLine}
            {index < lines.length - 1 && <br />}
          </span>
        );
      })}
    </h1>
  );
}
