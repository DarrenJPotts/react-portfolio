import { DogPhoto } from './dog-photo';
import { useSurfaceFocus } from './hooks/use-surface-focus';
import { moveWindowByKey, arrangeDesktop } from './hooks/use-window-drag';
import { MotionToggle } from './motion-settings';
import type { Dispatch, RefObject, SetStateAction } from 'react';
import {
  LinkedinLogoIcon,
  InstagramLogoIcon,
  GithubLogoIcon,
} from '@phosphor-icons/react';
import {
  contactDetails,
  projects,
  type BootStage,
  type FocusedWindow,
  type OpenFile,
  type Project,
  type ViewportMode,
  type WorkspaceMode,
} from './data';
import {
  AnimatedHeadline,
  CaseStudyPreview,
  DeviceBench,
  DraggableFileIcon,
  DraggableIcon,
} from './widgets';
import { ResumeContent } from '../resume-content';
import { PixelWindowReveal } from './retro-effects';
import { DesktopWaves } from './desktop-waves';

type DesktopWorkspaceProps = {
  bootStage: BootStage;
  selected: Project | null;
  setSelected: Dispatch<SetStateAction<Project | null>>;
  workspaceMode: WorkspaceMode;
  setWorkspaceMode: Dispatch<SetStateAction<WorkspaceMode>>;
  benchProject: Project;
  viewportMode: ViewportMode;
  setViewportMode: Dispatch<SetStateAction<ViewportMode>>;
  reachOverlay: boolean;
  setReachOverlay: Dispatch<SetStateAction<boolean>>;
  startOpen: boolean;
  setStartOpen: Dispatch<SetStateAction<boolean>>;
  startMenuOpen: boolean;
  setStartMenuOpen: Dispatch<SetStateAction<boolean>>;
  dogOpen: boolean;
  setDogOpen: Dispatch<SetStateAction<boolean>>;
  dogWindowAnchor: { x: number; y: number };
  dogPhotoAvailable: boolean;
  setDogPhotoAvailable: Dispatch<SetStateAction<boolean>>;
  time: string;
  focusedWindow: FocusedWindow;
  setFocusedWindow: Dispatch<SetStateAction<FocusedWindow>>;
  openFile: OpenFile;
  setOpenFile: Dispatch<SetStateAction<OpenFile>>;
  desktopPet: RefObject<HTMLButtonElement | null>;
  startWindow: RefObject<HTMLElement | null>;
  projectWindow: RefObject<HTMLElement | null>;
  fileWindow: RefObject<HTMLElement | null>;
  dogWindow: RefObject<HTMLElement | null>;
  openDogWindow: (event: React.MouseEvent<HTMLButtonElement>) => void;
  openProject: (project: Project) => void;
  selectBenchProject: (project: Project) => void;
  beginWindowDrag: (event: React.PointerEvent<HTMLElement>, key: string) => void;
  moveWindow: (
    event: React.PointerEvent<HTMLElement>,
    key: string,
    windowRef: RefObject<HTMLElement | null>,
  ) => void;
  endWindowDrag: (event: React.PointerEvent<HTMLElement>, key: string) => void;
};

export function DesktopWorkspace({
  bootStage,
  selected,
  setSelected,
  workspaceMode,
  setWorkspaceMode,
  benchProject,
  viewportMode,
  setViewportMode,
  reachOverlay,
  setReachOverlay,
  startOpen,
  setStartOpen,
  startMenuOpen,
  setStartMenuOpen,
  dogOpen,
  setDogOpen,
  dogWindowAnchor,
  dogPhotoAvailable,
  setDogPhotoAvailable,
  time,
  focusedWindow,
  setFocusedWindow,
  openFile,
  setOpenFile,
  desktopPet,
  startWindow,
  projectWindow,
  fileWindow,
  dogWindow,
  openDogWindow,
  openProject,
  selectBenchProject,
  beginWindowDrag,
  moveWindow,
  endWindowDrag,
}: DesktopWorkspaceProps) {
  function focusWindow(ref: RefObject<HTMLElement | null>) {
    const heading = ref.current?.querySelector<HTMLElement>('h1, h2');
    if (heading) {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }
  }
  useSurfaceFocus(projectWindow, selected?.id ?? null, '.desktop-icon');
  useSurfaceFocus(fileWindow, openFile, '.start-icon');
  useSurfaceFocus(dogWindow, dogOpen ? 'dog' : null, '.desktop-dock-pet');
  useSurfaceFocus(startWindow, startOpen ? 'welcome' : null, '.start-icon');
  return (
    <main
      className="desktop"
      onPointerMove={(event) => {
        if (event.pointerType !== 'mouse') return;
        const cursor = document.querySelector<HTMLElement>('.custom-cursor');
        cursor?.style.setProperty('--cursor-x', `${event.clientX}px`);
        cursor?.style.setProperty('--cursor-y', `${event.clientY}px`);
        const target = event.target as HTMLElement;
        cursor?.classList.toggle(
          'is-interactive',
          Boolean(target.closest('button, a, .window-drag-handle')),
        );
      }}
      onPointerDown={(event) => {
        if (event.pointerType === 'mouse')
          document.querySelector('.custom-cursor')?.classList.add('is-pressed');
      }}
      onPointerUp={() =>
        document.querySelector('.custom-cursor')?.classList.remove('is-pressed')
      }
      onKeyDown={(event) => {
        if (event.key !== 'Escape' || event.defaultPrevented) return;
        if (startMenuOpen) {
          setStartMenuOpen(false);
          return;
        }
        if (dogOpen) {
          setDogOpen(false);
          return;
        }
        if (focusedWindow === 'project' && selected) setSelected(null);
        else if (openFile && focusedWindow === openFile) setOpenFile(null);
        else if (startOpen) setStartOpen(false);
      }}
    >
      {bootStage !== 'ready' && (
        <div
          className={`boot-loader ${bootStage === 'leaving' ? 'is-leaving' : ''}`}
          role="status"
          aria-live="polite"
          aria-label="Loading Darren Potts portfolio"
        >
          <DesktopWaves />
          <div className="boot-grain" aria-hidden="true" />
          <div className="boot-content">
            <h1>
              Darren Potts.
              <br />
              Mobile Developer.
            </h1>
            <div className="boot-progress" aria-hidden="true">
              <i />
            </div>
            <div className="boot-readout">
              <span>Loading projects</span>
              <span>
                <b>···</b>
              </span>
            </div>
          </div>
        </div>
      )}
      <div className="custom-cursor" aria-hidden="true">
        <i />
      </div>
      <header className="status-bar">
        <span>DP_OS</span>
        <span className="status-message">Darren Potts</span>
        <span>ZA · {time}</span>
      </header>

      <DesktopWaves />
      <div className="grain" aria-hidden="true" />

      {workspaceMode === 'bench' ? (
        <section className="workspace-home" aria-label="Mobile development workbench">
          <header className="workspace-heading">
            <div>
              <h1>Projects</h1>
            </div>
          </header>
          <div className="workspace-grid">
            <aside className="build-index" aria-label="Project build index">
              <div className="index-heading">
                <span>Projects</span>
                <span>{String(projects.length).padStart(2, '0')} BUILDS</span>
              </div>
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  type="button"
                  className={benchProject.id === project.id ? 'active' : ''}
                  aria-pressed={benchProject.id === project.id}
                  onClick={() => selectBenchProject(project)}
                >
                  <span className="build-index-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="build-index-copy">
                    <strong>{project.title}</strong>
                    <small>{project.kind}</small>
                  </span>
                  <i aria-hidden="true">↗</i>
                </button>
              ))}
            </aside>
            <section
              className="workspace-inspector"
              aria-label={`Device preview for ${benchProject.title}`}
            >
              <header className="inspector-heading">
                <span>
                  <i /> {benchProject.title}
                </span>
              </header>
              <div className="workspace-stage">
                <DeviceBench
                  project={benchProject}
                  viewportMode={viewportMode}
                  onViewportChange={(mode) => {
                    setViewportMode(mode);
                    if (mode !== 'phone') setReachOverlay(false);
                  }}
                  reachOverlay={reachOverlay}
                  onReachToggle={() => setReachOverlay((active) => !active)}
                />
              </div>
              <footer className="inspector-footer">
                <p>{benchProject.summary}</p>
                <button type="button" onClick={() => openProject(benchProject)}>
                  View project <span>↗</span>
                </button>
              </footer>
            </section>
          </div>
          <div className="workspace-utilities" aria-label="Portfolio files">
            <span className="utility-label">Files</span>
            <DraggableFileIcon
              className="workspace-file"
              type="PDF"
              label="Darren_Potts_CV"
              onOpen={() => {
                setOpenFile('cv');
                setFocusedWindow('cv');
              }}
            />
            <DraggableFileIcon
              className="workspace-file"
              type="TXT"
              label="Contact.txt"
              onOpen={() => {
                setOpenFile('contact');
                setFocusedWindow('contact');
              }}
            />
            <DraggableFileIcon
              className="workspace-file"
              type="DOC"
              label="Hobbies.txt"
              onOpen={() => {
                setOpenFile('hobbies');
                setFocusedWindow('hobbies');
              }}
            />
            <span className="utility-spacer" />
          </div>
        </section>
      ) : (
        <>
          <div className="wallpaper-copy" aria-hidden="true">
            MOBILE DEVELOPER
          </div>
          <section className="identity" aria-label="Introduction">
            <AnimatedHeadline lines={['Darren Potts.', 'Developer.']} />
            <span>Flutter · React · Web development</span>
          </section>
          <button className="start-icon" type="button" onClick={() => setStartOpen(true)}>
            <span>DP</span>
            <strong>Start Here</strong>
          </button>
          {projects.map((project) => (
            <DraggableIcon
              key={project.id}
              project={project}
              onOpen={() => openProject(project)}
            />
          ))}
          <DraggableFileIcon
            className="cv-icon"
            type="PDF"
            label="Darren_Potts_CV"
            onOpen={() => {
              setOpenFile('cv');
              setFocusedWindow('cv');
            }}
          />
          <DraggableFileIcon
            className="contact-icon"
            type="TXT"
            label="Contact.txt"
            onOpen={() => {
              setOpenFile('contact');
              setFocusedWindow('contact');
            }}
          />
          <DraggableFileIcon
            className="hobbies-icon"
            type="DOC"
            label="Hobbies.txt"
            onOpen={() => {
              setOpenFile('hobbies');
              setFocusedWindow('hobbies');
            }}
          />
        </>
      )}

      {startOpen && (
        <section
          ref={startWindow}
          tabIndex={-1}
          className={`window start-window ${focusedWindow === 'welcome' ? 'is-focused' : ''}`}
          aria-labelledby="start-title"
          onFocus={() => setFocusedWindow('welcome')}
          onPointerDown={() => setFocusedWindow('welcome')}
        >
          <header
            className="window-drag-handle"
            tabIndex={0}
            aria-label="Window title bar. Use arrow keys to move this window."
            onKeyDown={moveWindowByKey}
            onPointerDown={(event) => beginWindowDrag(event, 'start')}
            onPointerMove={(event) => moveWindow(event, 'start', startWindow)}
            onPointerUp={(event) => endWindowDrag(event, 'start')}
            onPointerCancel={(event) => endWindowDrag(event, 'start')}
          >
            <span>WELCOME.txt</span>
            <button
              type="button"
              onClick={() => setStartOpen(false)}
              aria-label="Close welcome window"
            >
              ×
            </button>
          </header>
          <div className="window-body">
            <h2 id="start-title">Hi, I’m Darren.</h2>
            <p>
              I build mobile apps with Flutter and web applications with React. Here are
              some of my projects.
            </p>
            <button
              type="button"
              onClick={() => {
                setStartOpen(false);
                openProject(projects[0]);
              }}
            >
              Open featured project
            </button>
          </div>
        </section>
      )}

      {selected && (
        <section
          key={selected.id}
          ref={projectWindow}
          tabIndex={-1}
          className={`window project-window ${focusedWindow === 'project' ? 'is-focused' : ''}`}
          aria-labelledby="project-title"
          onFocus={() => setFocusedWindow('project')}
          onPointerDown={() => setFocusedWindow('project')}
        >
          <header
            className="window-drag-handle"
            tabIndex={0}
            aria-label="Window title bar. Use arrow keys to move this window."
            onKeyDown={moveWindowByKey}
            onPointerDown={(event) => beginWindowDrag(event, 'project')}
            onPointerMove={(event) => moveWindow(event, 'project', projectWindow)}
            onPointerUp={(event) => endWindowDrag(event, 'project')}
            onPointerCancel={(event) => endWindowDrag(event, 'project')}
          >
            <span>CASE_STUDY.exe</span>
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close project window"
            >
              ×
            </button>
          </header>
          <div className="project-window-grid">
            <PixelWindowReveal />
            <div className="case-study-cover">
              <CaseStudyPreview project={selected} />
              <div className="case-study-cover-meta">
                <strong>{selected.title.replace(/\.(app|web)/, '')}</strong>
                <small>
                  {selected.kind} · {selected.year}
                </small>
              </div>
              <div className="cover-registration" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="project-copy">
              <div
                className="project-copy-scroll"
                tabIndex={0}
                role="region"
                aria-label="Project details"
              >
                <h2 id="project-title">{selected.title}</h2>
                <p>{selected.summary}</p>
                <p className="project-role">{selected.role}</p>
                <dl>
                  <div>
                    <dt>TYPE</dt>
                    <dd>{selected.kind}</dd>
                  </div>
                  <div>
                    <dt>YEAR</dt>
                    <dd>{selected.year}</dd>
                  </div>
                  <div>
                    <dt>TOOLS</dt>
                    <dd>{selected.stack.join(' · ')}</dd>
                  </div>
                </dl>
                <p className="project-outcome">
                  <strong>Project notes</strong>
                  {selected.outcome}
                </p>
                {selected.dataNote && (
                  <p className="project-data-note">{selected.dataNote}</p>
                )}
                <div className="project-links">
                  {selected.demoUrl && (
                    <a href={selected.demoUrl} target="_blank" rel="noreferrer">
                      Open live project ↗
                    </a>
                  )}
                  {selected.sourceUrl && (
                    <a href={selected.sourceUrl} target="_blank" rel="noreferrer">
                      View source ↗
                    </a>
                  )}
                </div>
                <div className="case-study-screens">
                  <strong>Screenshots</strong>
                  {selected.screens.map((screen, index) => (
                    <div key={screen.label}>
                      <span>
                        {String(index + 1).padStart(2, '0')} / {screen.label}
                      </span>
                      <p>{screen.caption}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {openFile && (
        <section
          ref={fileWindow}
          tabIndex={-1}
          className={`window file-window ${openFile === 'contact' ? 'contact-window' : ''} ${focusedWindow === openFile ? 'is-focused' : ''}`}
          aria-labelledby="file-window-title"
          onFocus={() => setFocusedWindow(openFile)}
          onPointerDown={() => setFocusedWindow(openFile)}
        >
          <header
            className="window-drag-handle"
            tabIndex={0}
            aria-label="Window title bar. Use arrow keys to move this window."
            onKeyDown={moveWindowByKey}
            onPointerDown={(event) => beginWindowDrag(event, openFile)}
            onPointerMove={(event) => moveWindow(event, openFile, fileWindow)}
            onPointerUp={(event) => endWindowDrag(event, openFile)}
            onPointerCancel={(event) => endWindowDrag(event, openFile)}
          >
            <span>
              {openFile === 'cv'
                ? 'DARREN_POTTS_CV.pdf'
                : openFile === 'contact'
                  ? 'CONTACT.txt'
                  : 'HOBBIES.txt'}
            </span>
            <button
              type="button"
              aria-label="Close window"
              onClick={() => setOpenFile(null)}
            >
              ×
            </button>
          </header>
          {openFile === 'cv' ? (
            <div className="window-body file-window-body">
              <h2 id="file-window-title">Darren Potts</h2>
              <ResumeContent />
            </div>
          ) : openFile === 'contact' ? (
            <div className="window-body file-window-body contact-window-body">
              <h2 id="file-window-title">Contact</h2>
              <p>
                Have a mobile product, interesting problem, or collaboration in mind? Send
                a note and tell me what you are working on. You can also connect on
                LinkedIn or GitHub.
              </p>
              <div className="contact-detail-list">
                <a href={`tel:${contactDetails.phone.replaceAll(' ', '')}`}>
                  <span>PHONE</span>
                  <strong>{contactDetails.phone} ↗</strong>
                </a>
                <a href={`mailto:${contactDetails.email}`}>
                  <span>EMAIL</span>
                  <strong>{contactDetails.email} ↗</strong>
                </a>
                <a href={contactDetails.linkedin} target="_blank" rel="noreferrer">
                  <span>LINKEDIN</span>
                  <strong>DARREN POTTS ↗</strong>
                </a>
                <a href={contactDetails.github} target="_blank" rel="noreferrer">
                  <span>GITHUB</span>
                  <strong>DarrenJPotts ↗</strong>
                </a>
              </div>
              <form
                className="contact-message-form"
                action={`mailto:${contactDetails.email}?subject=Portfolio%20enquiry`}
                method="post"
                encType="text/plain"
              >
                <label>
                  YOUR NAME
                  <input name="name" autoComplete="name" placeholder="Name" required />
                </label>
                <label>
                  YOUR EMAIL
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                  />
                </label>
                <label>
                  YOUR MESSAGE
                  <textarea
                    name="message"
                    placeholder="What are you building?"
                    rows={3}
                    required
                  />
                </label>
                <button type="submit">COMPOSE EMAIL ↗</button>
              </form>
            </div>
          ) : (
            <div className="window-body file-window-body hobbies-document">
              <h2 id="file-window-title">Hobbies</h2>
              <p>Jiu-jitsu, Muay Thai, mountain biking, and game development.</p>
              <div className="hobby-note">
                <strong>Jiu-jitsu</strong>
                <p>Technique, patience, and steady progress on the mats.</p>
              </div>
              <div className="hobby-note">
                <strong>Muay Thai</strong>
                <p>Training sharpens focus and keeps me moving.</p>
              </div>
              <div className="hobby-note">
                <strong>Mountain biking</strong>
                <p>Long trails, technical sections, and time outdoors.</p>
              </div>
              <div className="hobby-note">
                <strong>Game development</strong>
                <p>Building small worlds, mechanics, and playful experiments.</p>
              </div>
            </div>
          )}
        </section>
      )}

      {startMenuOpen && (
        <section className="start-menu" aria-label="Start menu">
          <header>
            <span>DP_OS</span>
            <strong>Portfolio shortcuts</strong>
          </header>
          <button
            type="button"
            onClick={() => {
              setStartOpen(true);
              setFocusedWindow('welcome');
              setStartMenuOpen(false);
            }}
          >
            <i className="shortcut-mark">DP</i>
            <span>
              <strong>Welcome</strong>
              <small>Start here</small>
            </span>
          </button>
          {projects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => {
                openProject(project);
                setStartMenuOpen(false);
              }}
            >
              <i className="shortcut-mark">{project.id.slice(0, 2).toUpperCase()}</i>
              <span>
                <strong>{project.title}</strong>
                <small>{project.kind}</small>
              </span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              arrangeDesktop();
              setStartMenuOpen(false);
            }}
          >
            Arrange desktop
          </button>
          <MotionToggle />
          <div className="start-menu-footer">
            <button
              type="button"
              onClick={() => {
                setOpenFile('cv');
                setFocusedWindow('cv');
                setStartMenuOpen(false);
              }}
            >
              Open CV
            </button>
            <button
              type="button"
              onClick={() => {
                setOpenFile('contact');
                setFocusedWindow('contact');
                setStartMenuOpen(false);
              }}
            >
              Contact Darren
            </button>
            <button
              type="button"
              onClick={() => {
                setOpenFile('hobbies');
                setFocusedWindow('hobbies');
                setStartMenuOpen(false);
              }}
            >
              Hobbies
            </button>
          </div>
        </section>
      )}

      <footer className="dock taskbar">
        <button
          className={`taskbar-start ${startMenuOpen ? 'active' : ''}`}
          aria-label="Start"
          type="button"
          aria-expanded={startMenuOpen}
          onClick={() => setStartMenuOpen((open) => !open)}
        >
          <i>DP</i>
          <strong>Start</strong>
        </button>
        <div className="taskbar-windows" aria-label="Open windows">
          {startOpen && (
            <button
              className={focusedWindow === 'welcome' ? 'active' : ''}
              type="button"
              onClick={() => {
                setStartOpen(true);
                setFocusedWindow('welcome');
                focusWindow(startWindow);
              }}
            >
              WELCOME.txt
            </button>
          )}
          {selected && (
            <button
              className={focusedWindow === 'project' ? 'active' : ''}
              type="button"
              onClick={() => {
                setFocusedWindow('project');
                focusWindow(projectWindow);
              }}
            >
              {selected.title}
            </button>
          )}
          {openFile && (
            <button
              className={focusedWindow === openFile ? 'active' : ''}
              type="button"
              onClick={() => {
                setFocusedWindow(openFile);
                focusWindow(fileWindow);
              }}
            >
              {openFile === 'cv'
                ? 'DARREN_POTTS_CV.pdf'
                : openFile === 'contact'
                  ? 'CONTACT.txt'
                  : 'HOBBIES.txt'}
            </button>
          )}
        </div>
        <div className="taskbar-tray">
          <nav className="taskbar-socials" aria-label="Social profiles">
            <a
              href={contactDetails.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="Darren on LinkedIn (opens in a new tab)"
              title="LinkedIn"
            >
              <LinkedinLogoIcon size={20} weight="fill" aria-hidden="true" />
            </a>
            <a
              href={contactDetails.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Darren on Instagram (opens in a new tab)"
              title="Instagram"
            >
              <InstagramLogoIcon size={20} aria-hidden="true" />
            </a>
            <a
              href={contactDetails.github}
              target="_blank"
              rel="noreferrer"
              aria-label="Darren on GitHub (opens in a new tab)"
              title="GitHub"
            >
              <GithubLogoIcon size={20} weight="fill" aria-hidden="true" />
            </a>
          </nav>
          <span>{time || '––:––'}</span>
        </div>
      </footer>
      <button
        ref={desktopPet}
        className="desktop-dock-pet"
        type="button"
        aria-label="Open the dog photo"
        title="A tiny visitor — click to meet them"
        onClick={openDogWindow}
      >
        <span className="pixel-dog" aria-hidden="true">
          <i />
        </span>
      </button>
      {dogOpen && (
        <section
          ref={dogWindow}
          tabIndex={-1}
          className="dog-photo-window"
          style={
            {
              '--dog-anchor-x': `${dogWindowAnchor.x}px`,
              '--dog-anchor-y': `${dogWindowAnchor.y}px`,
            } as React.CSSProperties
          }
          role="dialog"
          aria-modal="false"
          aria-labelledby="dog-photo-title"
        >
          <header
            className="window-drag-handle"
            tabIndex={0}
            aria-label="Window title bar. Use arrow keys to move this window."
            onKeyDown={moveWindowByKey}
            onPointerDown={(event) => beginWindowDrag(event, 'dog')}
            onPointerMove={(event) => moveWindow(event, 'dog', dogWindow)}
            onPointerUp={(event) => endWindowDrag(event, 'dog')}
            onPointerCancel={(event) => endWindowDrag(event, 'dog')}
          >
            <span>GOOD_DOG.jpg</span>
            <button
              type="button"
              aria-label="Close dog photo"
              onClick={() => setDogOpen(false)}
            >
              ×
            </button>
          </header>
          <DogPhoto
            titleId="dog-photo-title"
            available={dogPhotoAvailable}
            onError={() => setDogPhotoAvailable(false)}
          />
        </section>
      )}
    </main>
  );
}
