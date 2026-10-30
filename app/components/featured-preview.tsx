'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from '@phosphor-icons/react';
import BrowserPreview from './browser-preview';
import Phone from './phone';

type ReaderProject = {
  id: string;
  title: string;
  kind: string;
  type: string;
  platforms: string[];
  visual: string;
  description: string;
  narrative: string;
  stack: string[];
  screens: { label: string; src: string }[];
};

export default function FeaturedPreview({ projects }: { projects: ReaderProject[] }) {
  const [projectIndex, setProjectIndex] = useState(0);
  const [screenIndex, setScreenIndex] = useState(0);
  const project = projects[projectIndex];

  if (!project) return null;

  const screen = project.screens[screenIndex] ?? project.screens[0];
  const projectNumber = String(projectIndex + 1).padStart(2, '0');
  const projectTotal = String(projects.length).padStart(2, '0');

  function moveProject(direction: number) {
    setProjectIndex(
      (current) => (current + direction + projects.length) % projects.length,
    );
    setScreenIndex(0);
  }

  return (
    <section className="project-reader section wrap" aria-labelledby="reader-title">
      <header className="reader-heading">
        <div>
          <p className="section-kicker">NOW SHOWING · SELECTED PROJECTS</p>
          <h2 id="reader-title">
            Stories from <span className="accent">inside the build.</span>
          </h2>
        </div>
        <p>One project at a time. Mobile, web, and the decisions behind them.</p>
      </header>

      <div className={`reader-panel reader-${project.visual}`}>
        <p className="reader-narrative">{project.narrative}</p>

        <div className="reader-layout">
          <div className="reader-visual" key={`${project.id}-${screenIndex}`}>
            <div className="reader-burst" aria-hidden="true" />
            {project.kind === 'web' ? (
              <BrowserPreview label={screen.label} src={screen.src} />
            ) : (
              <Phone
                visual={project.visual}
                label={screen.label}
                src={screen.src}
                number={String(screenIndex + 1).padStart(2, '0')}
              />
            )}
          </div>

          <div className="reader-copy" key={project.id}>
            <div className="reader-meta">
              <span>{project.type}</span>
              <span>{project.platforms.join(' / ')}</span>
            </div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tags">
              {project.stack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <Link className="button red-button" href={`/projects/${project.id}`}>
              Read the full story <ArrowUpRight size={20} />
            </Link>
          </div>
        </div>

        <div
          className="reader-screen-tabs"
          role="group"
          aria-label="Choose project screen"
        >
          {project.screens.map((item, index) => (
            <button
              key={item.label}
              className={index === screenIndex ? 'active' : undefined}
              aria-pressed={index === screenIndex}
              onClick={() => setScreenIndex(index)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item.label}
            </button>
          ))}
        </div>

        <footer className="reader-controls">
          <button onClick={() => moveProject(-1)} aria-label="Show previous project">
            <ArrowLeft size={20} /> Back
          </button>
          <span aria-live="polite">
            {projectNumber} <i>of</i> {projectTotal}
          </span>
          <button onClick={() => moveProject(1)} aria-label="Show next project">
            Next <ArrowRight size={20} />
          </button>
        </footer>
      </div>
    </section>
  );
}
