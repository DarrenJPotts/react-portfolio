'use client';

import type { Project, ViewportMode, WorkspaceMode } from './data';
import { ScreenshotImage } from './image-viewer';
import { useIconDrag } from './hooks/use-window-drag';
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
                  <ScreenshotImage
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
                  <ScreenshotImage
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
  const drag = useIconDrag(onOpen);
  return (
    <button
      {...drag}
      className="desktop-icon"
      style={project.placement}
      type="button"
      title="Open project. Alt + arrow keys move this folder."
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
  const drag = useIconDrag(onOpen);
  return (
    <button
      {...drag}
      className={`file-icon ${className}`}
      type="button"
      aria-label={`Open ${label}`}
      title="Open file. Alt + arrow keys move this file."
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
  return (
    <h1 className="animated-headline" aria-label={lines.join(' ')}>
      {lines.map((line, index) => (
        <span key={`${index}-${line}`} aria-hidden="true">
          {line}
          {index < lines.length - 1 && <br />}
        </span>
      ))}
    </h1>
  );
}
