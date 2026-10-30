'use client';

import {
  ArrowDown,
  ArrowUpRight,
  Asterisk,
  EnvelopeSimple,
  GithubLogo,
  Lightning,
  X,
} from '@phosphor-icons/react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { capabilities } from '../data/portfolio';
import { getProfile, getProjects } from '../lib/content';
import BrowserPreview from './components/browser-preview';
import Experience from './components/experience';
import FeaturedPreview from './components/featured-preview';
import Phone from './components/phone';
const projects = getProjects();
const profile = getProfile();

const filters = ['All projects', 'Mobile', 'Web', 'Experiments'] as const;

export default function Portfolio() {
  const [filter, setFilter] = useState<string>('All projects');

  const [contactVisible, setContactVisible] = useState(false);
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const visible = projects.filter(
    (project) =>
      filter === 'All projects' ||
      project.category === filter ||
      project.kind.toLowerCase() === filter.toLowerCase(),
  );

  function openProject(project: (typeof projects)[number]) {
    setSelected(project);
    dialog.current?.showModal();
  }

  return (
    <>
      <main id="main">
        <section className="hero wrap" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">
              Hi, I'm Darren.
              <br />
              <span className="outlined">Mobile developer.</span>
            </h1>
            <p className="hero-description">
              Apps are my thing. From the first tap
              <br />
              to the little details that make you stay.
            </p>
            <a className="button red-button" href="#work">
              Explore my work <ArrowDown size={21} weight="bold" />
            </a>
          </div>
          <div
            className="hero-art mobile-hero-art"
            aria-label="Two phone mockups with placeholder app screens"
          >
            <div className="art-grid" />
            <div className="art-circle" />
            <div className="hero-phone back-phone">
              <Phone visual="frequency" label="Discover" />
            </div>
            <div className="hero-phone front-phone">
              <Phone label="Welcome" />
            </div>
            <div className="burst">
              <span>
                TAP.
                <br />
                SWIPE.
                <br />
                SMILE.
              </span>
            </div>
            <div className="art-caption">Mobile. BIG POSSIBILITIES.</div>
          </div>
        </section>

        <FeaturedPreview projects={projects} />

        <section className="work wrap section" id="work">
          <div className="section-heading">
            <div>
              <h2>
                Project <span>archive.</span>
              </h2>
              <p className="section-description">
                Mobile and web work, collected in one place.
              </p>
            </div>
          </div>
          <div className="filter-row">
            <div className="filters" aria-label="Filter projects">
              {filters.map((item) => (
                <button
                  key={item}
                  className={item === filter ? 'filter active' : 'filter'}
                  aria-pressed={item === filter}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="project-grid">
            {visible.map((project, index) => (
              <article className="project" key={project.id}>
                <button
                  className={`project-art ${project.visual}`}
                  onClick={() => openProject(project)}
                  aria-label={`Explore ${project.title}`}
                >
                  <span className="project-number">0{index + 1}</span>
                  {project.kind === 'web' ? (
                    <BrowserPreview
                      label={project.screens[0].label}
                      src={project.screens[0].src}
                    />
                  ) : (
                    <Phone
                      visual={project.visual}
                      label={project.screens[0].label}
                      src={project.screens[0].src}
                    />
                  )}
                  <span className="project-open">
                    <ArrowUpRight size={25} weight="bold" />
                  </span>
                </button>
                <div className="project-title">
                  <h3>
                    <button onClick={() => openProject(project)}>{project.title}</button>
                  </h3>
                  <span>{project.type}</span>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="tags">
                  {project.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <Link className="project-case-link" href={`/projects/${project.id}`}>
                  Read case study <ArrowUpRight size={18} />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section
          className="capabilities section wrap"
          aria-labelledby="capabilities-title"
        >
          <div className="capabilities-heading">
            <h2 id="capabilities-title">
              More than
              <br />
              <span className="outlined">a pretty screen.</span>
            </h2>
            <p className="section-description">
              The pieces that turn an interface into an app.
            </p>
            <Asterisk size={72} weight="bold" aria-hidden="true" />
          </div>
          <div className="capability-grid">
            {capabilities.map((item, index) => (
              <article key={item.title}>
                <span className="capability-index">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="tags">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about section wrap" id="about">
          <div className="about-art" aria-hidden="true">
            <Asterisk weight="bold" />
            <div className="about-note">
              BUILT WITH
              <br />
              <strong>CURIOSITY.</strong>
              <span>AND A HEALTHY AMOUNT OF COFFEE.</span>
            </div>
            <Lightning className="about-lightning" weight="fill" />
          </div>
          <div className="about-copy">
            <p className="section-kicker">THE HUMAN BEHIND THE CODE</p>
            <h2>
              Good things start
              <br />
              with <span>“what if?”</span>
            </h2>
            <p>
              I’m {profile.name}, a mobile developer at heart. I care about how an app
              feels in your hands, from the first interaction to the details you barely
              notice.
            </p>
            <p>
              This is my corner of the internet for projects, experiments, and whatever
              I’m curious about next.
            </p>
            <div className="toolkit">
              <span>WHAT I LOVE BUILDING</span>
              <div>
                {profile.skills.map((skill) => (
                  <strong key={skill}>{skill}</strong>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Experience />
        <section className="contact wrap" id="contact">
          <div className="contact-top">
            <span>GOT SOMETHING IN MIND?</span>
            <Asterisk size={48} weight="bold" />
          </div>
          <h2>
            Let’s make
            <br />
            <span>something click.</span>
          </h2>
          <div className="contact-bottom">
            <p>
              A project, an opportunity, or just a good conversation.
              <br />
              I’d love to hear about it.
            </p>
            {profile.email ? (
              <a className="button ink-button" href={`mailto:${profile.email}`}>
                Say hello <EnvelopeSimple size={21} />
              </a>
            ) : profile.github ? (
              <a
                className="button ink-button"
                href={`https://github.com/${profile.github}`}
                target="_blank"
                rel="noreferrer"
              >
                Find me on GitHub <ArrowUpRight size={21} />
              </a>
            ) : (
              <button
                className="button ink-button"
                onClick={() => setContactVisible(!contactVisible)}
                aria-expanded={contactVisible}
              >
                Say hello <EnvelopeSimple size={21} />
              </button>
            )}
          </div>
          {contactVisible && (
            <p className="contact-notice" role="status">
              Contact details coming soon. Add your email in data/portfolio.ts to connect
              this button.
            </p>
          )}
        </section>
      </main>
      <dialog
        ref={dialog}
        className="project-dialog"
        aria-labelledby="project-dialog-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        {selected && (
          <>
            <div className="dialog-header">
              <span>SAMPLE PROJECT</span>
              <button
                className="icon-button"
                aria-label="Close project"
                onClick={() => dialog.current?.close()}
              >
                <X size={25} />
              </button>
            </div>
            <h2 id="project-dialog-title">{selected.title}</h2>
            <p>{selected.description}</p>
            <h3>The idea</h3>
            <p>{selected.detail}</p>
            <div className="tags">
              {selected.stack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <p className="sample-notice">
              This is a sample showcase. Replace it with your project, screenshots, and
              links in data/portfolio.ts.
            </p>
            <div className="dialog-actions">
              <Link className="button red-button" href={`/projects/${selected.id}`}>
                Read case study ↗
              </Link>
              {selected.demo && (
                <a
                  className="button red-button"
                  href={selected.demo}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live demo <ArrowUpRight />
                </a>
              )}
              {selected.source && (
                <a
                  className="button"
                  href={selected.source}
                  target="_blank"
                  rel="noreferrer"
                >
                  Source code <GithubLogo />
                </a>
              )}
              <button
                className="button ink-button"
                onClick={() => dialog.current?.close()}
              >
                Back to projects
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
