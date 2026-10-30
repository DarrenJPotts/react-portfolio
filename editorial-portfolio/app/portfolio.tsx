'use client';

import { useEffect, useState } from 'react';

const projects = [
  {
    title: 'Orbit',
    type: 'Mobile application',
    platform: 'iOS + Android',
    statement: 'A quieter place for ideas that need room to become useful.',
    detail:
      'Product thinking, interaction design, local data, and a focused mobile interface.',
    accent: '#d75a36',
  },
  {
    title: 'Canvas',
    type: 'Web experience',
    platform: 'Responsive web',
    statement: 'Creative work presented with the confidence of a printed object.',
    detail:
      'A responsive portfolio system built around rhythm, hierarchy, and flexible content.',
    accent: '#d75a36',
  },
  {
    title: 'Frequency',
    type: 'Mobile application',
    platform: 'iOS',
    statement: 'Music discovery designed for one thumb and an open mind.',
    detail:
      'API integration, audio states, tactile gestures, and considered loading behaviour.',
    accent: '#d75a36',
  },
];

export default function Portfolio() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const project = projects[active];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') setActive((value) => (value + 1) % projects.length);
      if (event.key === 'ArrowLeft')
        setActive((value) => (value - 1 + projects.length) % projects.length);
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <main>
      <section
        className="stage"
        style={{ '--accent': project.accent } as React.CSSProperties}
      >
        <header className="masthead">
          <a className="wordmark" href="#intro" aria-label="Darren Potts, home">
            <span aria-hidden="true" />
            DARREN POTTS
          </a>
          <button
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span className="menu-mark" aria-hidden="true">
              <i />
            </span>
            Menu
          </button>
        </header>

        <nav
          id="site-menu"
          className={`menu-panel ${menuOpen ? 'is-open' : ''}`}
          aria-label="Primary"
        >
          <a href="#work" onClick={() => setMenuOpen(false)}>
            Selected work
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>
          <a href="mailto:hello@example.com">Contact</a>
        </nav>

        <div className="intro-panel" id="intro">
          <div className="atomic-mark" aria-hidden="true">
            <i />
            <i />
            <i />
            <span />
          </div>
          <div className="accent-disc" aria-hidden="true">
            DP
          </div>
          <p className="kicker">Mobile developer · web builder</p>
          <h1>
            Interfaces with
            <br />a point of view.
          </h1>
          <p className="intro-copy">
            I build thoughtful mobile products and responsive web experiences, with care
            for the details people feel.
          </p>
          <a className="text-link" href="#work">
            <span>↘</span> Enter selected work
          </a>
          <div className="edition-note" aria-hidden="true">
            PORTFOLIO EDITION · 2026
          </div>
        </div>

        <div className="perspective" id="work" aria-live="polite">
          <div className="wall wall-image">
            <div className="sun-shape" aria-hidden="true" />
            <div className="orbit-shape" aria-hidden="true" />
            <div
              className={`device ${project.type.startsWith('Mobile') ? 'phone' : 'browser'}`}
            >
              <div className="device-bar" />
              <div className="device-screen">
                <span>{project.platform}</span>
                <strong>{project.title}</strong>
                <i />
                <small>Project preview</small>
              </div>
            </div>
          </div>
          <div className="wall wall-story">
            <p>{project.type}</p>
            <h2>{project.statement}</h2>
            <span>{project.detail}</span>
          </div>
          <div className="floor">
            <p>Selected work</p>
            <strong>
              {String(active + 1).padStart(2, '0')} /{' '}
              {String(projects.length).padStart(2, '0')}
            </strong>
          </div>
        </div>

        <div className="project-controls">
          <p>Use the arrows or select a project</p>
          <div>
            {projects.map((item, index) => (
              <button
                key={item.title}
                className={index === active ? 'active' : ''}
                type="button"
                onClick={() => setActive(index)}
                aria-pressed={index === active}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <p className="section-label">Practice</p>
        <h2>
          Mostly mobile.
          <br />
          Always human.
        </h2>
        <div className="about-grid">
          <p>
            I work across mobile interfaces, product systems, APIs, offline states,
            animation, and the occasional website.
          </p>
          <ul>
            <li>
              <span>01</span> Mobile product development
            </li>
            <li>
              <span>02</span> Interface implementation
            </li>
            <li>
              <span>03</span> API and device integration
            </li>
            <li>
              <span>04</span> Prototyping and motion
            </li>
          </ul>
        </div>
        <a className="contact-link" href="mailto:hello@example.com">
          Start a conversation <span>↗</span>
        </a>
      </section>
    </main>
  );
}
