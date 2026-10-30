import { DogPhoto } from './dog-photo';
import { useEffect, useRef, useState } from 'react';
import { useSurfaceFocus } from './hooks/use-surface-focus';
import { ImageViewer, Modal, ScreenshotImage } from './image-viewer';
import { MotionToggle } from './motion-settings';
import type {
  Dispatch,
  MutableRefObject,
  PointerEventHandler,
  RefObject,
  SetStateAction,
} from 'react';
import {
  contactDetails,
  projects,
  type OpenFile,
  type Project,
  type ViewportMode,
  type WorkspaceMode,
} from './data';
import { AnimatedHeadline } from './widgets';
import { ResumeContent } from '../resume-content';

type MobilePortfolioProps = {
  openFile: 'cv' | 'contact' | 'hobbies' | null;
  setOpenFile: Dispatch<SetStateAction<OpenFile>>;
  time: string;
  selected: Project | null;
  setSelected: Dispatch<SetStateAction<Project | null>>;
  setSheetOpen: Dispatch<SetStateAction<boolean>>;
  sheetOpen: boolean;
  swipeStart: MutableRefObject<number | null>;
  mobileScreen: number;
  showMobileScreen: (screen: number) => void;
  screenDirection: 1 | -1;
  startUnlockSwipe: PointerEventHandler<HTMLDivElement>;
  trackUnlockSwipe: PointerEventHandler<HTMLDivElement>;
  finishUnlockSwipe: PointerEventHandler<HTMLDivElement>;
  mobileLock: RefObject<HTMLDivElement | null>;
  mobileUnlocked: boolean;
  setMobileUnlocked: Dispatch<SetStateAction<boolean>>;
  workspaceMode: WorkspaceMode;
  setWorkspaceMode: Dispatch<SetStateAction<WorkspaceMode>>;
  benchProject: Project;
  selectBenchProject: (project: Project) => void;
  viewportMode: ViewportMode;
  setViewportMode: Dispatch<SetStateAction<ViewportMode>>;
  reachOverlay: boolean;
  setReachOverlay: Dispatch<SetStateAction<boolean>>;
  mobilePet: RefObject<HTMLButtonElement | null>;
  dogOpen: boolean;
  setDogOpen: Dispatch<SetStateAction<boolean>>;
  dogPhotoAvailable: boolean;
  setDogPhotoAvailable: Dispatch<SetStateAction<boolean>>;
  switcherOpen: boolean;
  setSwitcherOpen: Dispatch<SetStateAction<boolean>>;
  openProject: (project: Project) => void;
  setMobileScreen: Dispatch<SetStateAction<number>>;
};

export function MobilePortfolio({
  openFile,
  setOpenFile,
  time,
  selected,
  setSelected,
  setSheetOpen,
  sheetOpen,
  swipeStart,
  mobileScreen,
  showMobileScreen,
  screenDirection,
  startUnlockSwipe,
  trackUnlockSwipe,
  finishUnlockSwipe,
  mobileLock,
  mobileUnlocked,
  setMobileUnlocked,
  workspaceMode,
  setWorkspaceMode,
  benchProject,
  selectBenchProject,
  viewportMode,
  setViewportMode,
  reachOverlay,
  setReachOverlay,
  mobilePet,
  dogOpen,
  setDogOpen,
  dogPhotoAvailable,
  setDogPhotoAvailable,
  switcherOpen,
  setSwitcherOpen,
  openProject,
  setMobileScreen,
}: MobilePortfolioProps) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const media = matchMedia('(max-width: 760px)');
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);
  const activeScreen = selected?.screens[mobileScreen];
  const surface = useRef<HTMLElement>(null);
  const [imageOpen, setImageOpen] = useState(false);
  useEffect(() => setImageOpen(false), [selected?.id, mobileScreen]);
  useSurfaceFocus(
    surface,
    openFile ?? selected?.id ?? null,
    selected ? `[data-project-id="${selected.id}"]` : '.mobile-dock button',
  );

  return (
    <section
      ref={surface}
      className="mobile-os"
      aria-label="Mobile portfolio"
      onKeyDown={(event) => {
        if (event.key !== 'Escape' || event.defaultPrevented) return;
        if (dogOpen) setDogOpen(false);
        else if (switcherOpen) setSwitcherOpen(false);
        else if (sheetOpen) setSheetOpen(false);
        else if (openFile) setOpenFile(null);
        else if (selected) setSelected(null);
      }}
    >
      {openFile && mobileUnlocked ? (
        <div className="mobile-project-app mobile-document-app">
          <header className="mobile-status">
            <button type="button" onClick={() => setOpenFile(null)}>
              Home
            </button>
            <span>{time}</span>
          </header>
          <div className="mobile-project-title">
            <h2>
              {openFile === 'cv'
                ? 'Darren Potts'
                : openFile === 'contact'
                  ? 'Contact'
                  : 'Hobbies'}
            </h2>
          </div>
          <div className="mobile-document-body">
            {openFile === 'cv' ? (
              <ResumeContent />
            ) : openFile === 'contact' ? (
              <>
                <p>
                  Have a mobile product, interesting problem, or collaboration in mind?
                  Send a note and tell me what you are working on.
                </p>
                <a className="file-window-action" href={`mailto:${contactDetails.email}`}>
                  {contactDetails.email} ↗
                </a>
                <div className="mobile-contact-links">
                  <a href={`tel:${contactDetails.phone.replaceAll(' ', '')}`}>
                    CALL / {contactDetails.phone} ↗
                  </a>
                  <a href={contactDetails.linkedin} target="_blank" rel="noreferrer">
                    LINKEDIN / DARREN POTTS ↗
                  </a>
                  <a href={contactDetails.github} target="_blank" rel="noreferrer">
                    GITHUB / DarrenJPotts ↗
                  </a>
                </div>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
          <button
            className="home-indicator"
            type="button"
            onClick={() => setOpenFile(null)}
            aria-label="Return home"
          />
        </div>
      ) : selected ? (
        <div className="mobile-project-app">
          <header className="mobile-status">
            <button
              type="button"
              onClick={() => {
                setSelected(null);
                setSheetOpen(false);
              }}
            >
              Home
            </button>
            <span>{time}</span>
          </header>
          <div className="mobile-project-title">
            <h2>{selected.title.replace(/\.(app|web)/, '')}</h2>
          </div>
          <div
            className="mobile-screen-deck"
            onPointerDown={(event) => {
              swipeStart.current = event.clientX;
            }}
            onPointerUp={(event) => {
              if (swipeStart.current === null) return;
              const distance = event.clientX - swipeStart.current;
              swipeStart.current = null;
              if (distance < -45) showMobileScreen(mobileScreen + 1);
              if (distance > 45) showMobileScreen(mobileScreen - 1);
            }}
            onPointerCancel={() => {
              swipeStart.current = null;
            }}
          >
            <div
              key={`${selected.id}-${mobileScreen}`}
              className={`mobile-screen screen-${mobileScreen} ${activeScreen?.image ? 'has-preview-image' : ''} ${screenDirection > 0 ? 'swipe-forward' : 'swipe-backward'}`}
            >
              {activeScreen?.image ? (
                <figure className="mobile-screen-shot">
                  <button
                    className="screenshot-open"
                    type="button"
                    onClick={() => setImageOpen(true)}
                    aria-label={`Enlarge ${activeScreen.label} screenshot`}
                  >
                    <ScreenshotImage
                      src={activeScreen.image}
                      alt={`${selected.title} ${activeScreen.label} screen`}
                    />
                    <span>View full size</span>
                  </button>
                  <figcaption>
                    <small>{activeScreen.label}</small>
                    <span>{activeScreen.caption}</span>
                  </figcaption>
                </figure>
              ) : (
                <>
                  <small>{activeScreen?.label ?? 'Project screen'}</small>
                  <strong>{selected.title.replace(/\.(app|web)/, '')}</strong>
                  <span>{activeScreen?.caption ?? selected.summary}</span>
                  <i />
                  <span className="focus-reticle" aria-hidden="true">
                    <i />
                  </span>
                </>
              )}
            </div>
          </div>
          <div
            className="screen-dots"
            aria-label={`Screen ${mobileScreen + 1} of ${selected.screens.length}`}
          >
            {selected.screens.map((screen, index) => (
              <button
                key={screen.label}
                type="button"
                className={index === mobileScreen ? 'active' : ''}
                onClick={() => showMobileScreen(index)}
                aria-label={`Show ${screen.label} screen`}
                aria-current={index === mobileScreen ? 'true' : undefined}
              />
            ))}
          </div>
          <section className={`mobile-sheet ${sheetOpen ? 'open' : ''}`}>
            <button
              className="sheet-handle"
              aria-controls="mobile-project-notes"
              type="button"
              onClick={() => setSheetOpen((open) => !open)}
              aria-expanded={sheetOpen}
            >
              <i />
              <span>{sheetOpen ? 'Hide project notes' : 'View project notes'}</span>
            </button>
            <div
              className="sheet-content"
              id="mobile-project-notes"
              tabIndex={sheetOpen ? 0 : -1}
              inert={!sheetOpen}
            >
              <p>{selected.summary}</p>
              <p>{selected.role}</p>
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
                  <dt>STACK</dt>
                  <dd>{selected.stack.join(' · ')}</dd>
                </div>
              </dl>
              <strong>Project notes</strong>
              <p>{selected.outcome}</p>
              {selected.dataNote && (
                <>
                  <p>{selected.dataNote}</p>
                </>
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
            </div>
          </section>
          <button
            className="home-indicator"
            type="button"
            onClick={() => {
              setSelected(null);
              setSheetOpen(false);
            }}
            aria-label="Return home"
          />
        </div>
      ) : !mobileUnlocked ? (
        <div
          ref={mobileLock}
          className="mobile-lock"
          onPointerDown={startUnlockSwipe}
          onPointerMove={trackUnlockSwipe}
          onPointerUp={finishUnlockSwipe}
          onPointerCancel={finishUnlockSwipe}
        >
          <div className="mobile-status">
            <span>DP_OS</span>
            <span>{time}</span>
          </div>
          <div className="lock-copy">
            <h1>
              Darren
              <br />
              Potts
            </h1>
            <span>Mobile developer</span>
          </div>
          <div className="lock-notice">
            <strong>Selected mobile and web projects</strong>
          </div>
          <button
            type="button"
            aria-label="Swipe up or tap to explore the portfolio"
            onClick={() => setMobileUnlocked(true)}
          >
            <i /> Swipe to explore
          </button>
        </div>
      ) : workspaceMode === 'bench' ? (
        <div className="mobile-workbench">
          <header className="mobile-status">
            <span>{time}</span>
            <span>Projects</span>
          </header>
          <div className="mobile-lab-heading">
            <h1>
              Choose a<br />
              build.
            </h1>
          </div>
          <div className="mobile-build-list" aria-label="Project build index">
            {projects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                className={benchProject.id === project.id ? 'active' : ''}
                aria-pressed={benchProject.id === project.id}
                onClick={() => {
                  selectBenchProject(project);
                  setMobileScreen(0);
                }}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{project.title}</strong>
                <small>{project.kind}</small>
              </button>
            ))}
          </div>
          <div className="mobile-viewport-controls" aria-label="Simulated viewport">
            {(['phone', 'tablet', 'browser'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                className={viewportMode === mode ? 'active' : ''}
                aria-pressed={viewportMode === mode}
                onClick={() => {
                  setViewportMode(mode);
                  if (mode !== 'phone') setReachOverlay(false);
                }}
              >
                {mode === 'browser' ? 'WEB' : mode.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="mobile-bench-toolbar">
            <span>{benchProject.title}</span>
            {viewportMode === 'phone' && (
              <button
                type="button"
                className={reachOverlay ? 'active' : ''}
                aria-pressed={reachOverlay}
                onClick={() => setReachOverlay((active) => !active)}
              >
                THUMB ZONES {reachOverlay ? 'ON' : 'OFF'}
              </button>
            )}
          </div>
          <div
            className="mobile-lab-deck"
            onPointerDown={(event) => {
              swipeStart.current = event.clientX;
            }}
            onPointerUp={(event) => {
              if (swipeStart.current === null) return;
              const distance = event.clientX - swipeStart.current;
              swipeStart.current = null;
              if (distance < -45) showMobileScreen(mobileScreen + 1);
              if (distance > 45) showMobileScreen(mobileScreen - 1);
            }}
            onPointerCancel={() => {
              swipeStart.current = null;
            }}
          >
            <article
              key={`lab-${benchProject.id}-${mobileScreen}-${viewportMode}`}
              className={`mobile-lab-preview ${viewportMode} ${reachOverlay ? 'show-reach' : ''} ${screenDirection > 0 ? 'swipe-forward' : 'swipe-backward'}`}
            >
              <span>
                {benchProject.screens[mobileScreen].label} / {benchProject.kind}
              </span>
              <h2>{benchProject.title.replace(/\.(app|web)/, '')}</h2>
              <p>{benchProject.screens[mobileScreen].caption}</p>
              <i className="focus-reticle" aria-hidden="true">
                <i />
              </i>
              {reachOverlay && (
                <span className="reach-zone" aria-hidden="true">
                  <i />
                </span>
              )}
            </article>
          </div>
          <div className="mobile-lab-footer">
            <span>{benchProject.stack.join(' / ')}</span>
            <button type="button" onClick={() => openProject(benchProject)}>
              OPEN CASE STUDY ↗
            </button>
          </div>
          <div
            className="screen-dots"
            aria-label={`Screen ${mobileScreen + 1} of ${benchProject.screens.length}`}
          >
            {benchProject.screens.map((screen, index) => (
              <button
                key={screen.label}
                type="button"
                className={index === mobileScreen ? 'active' : ''}
                onClick={() => showMobileScreen(index)}
                aria-label={`Show ${screen.label} screen`}
                aria-current={index === mobileScreen ? 'true' : undefined}
              />
            ))}
          </div>
          <button
            className="home-indicator"
            type="button"
            onClick={() => setWorkspaceMode('desktop')}
            aria-label="Return to Desktop"
          />
        </div>
      ) : (
        <div className="mobile-home">
          <header className="mobile-status">
            <span>{time}</span>
            <MotionToggle />
          </header>
          <div className="mobile-identity">
            <p>DARREN POTTS</p>
            <AnimatedHeadline lines={['My projects.']} />
          </div>
          <div className="app-grid">
            {projects.map((project, index) => (
              <button
                key={project.id}
                data-project-id={project.id}
                type="button"
                onClick={() => {
                  openProject(project);
                  setMobileScreen(0);
                }}
              >
                <span className={`app-icon app-${index}`}>
                  <i>{String(index + 1).padStart(2, '0')}</i>
                </span>
                <strong>{project.title.replace(/\.(app|web)/, '')}</strong>
              </button>
            ))}
          </div>
          <div className="mobile-widget">
            <span>About me</span>
            <strong>Flutter apps and React websites.</strong>
            <small>{projects.length} projects</small>
          </div>
          <div className="mobile-dock">
            <button type="button" onClick={() => setOpenFile('cv')}>
              <span>CV</span>
              <small>Resume</small>
            </button>
            <button type="button" onClick={() => setOpenFile('hobbies')}>
              <span>HOB</span>
              <small>Hobbies</small>
            </button>
            <button type="button" onClick={() => setSwitcherOpen(true)}>
              <span>REC</span>
              <small>Recent</small>
            </button>
            <button type="button" onClick={() => setOpenFile('contact')}>
              <span>TXT</span>
              <small>Contact</small>
            </button>
          </div>
          <button
            ref={mobilePet}
            className="mobile-dock-pet"
            type="button"
            aria-label="Open the dog photo"
            onClick={() => setDogOpen(true)}
          >
            <span className="pixel-dog" aria-hidden="true">
              <i />
            </span>
          </button>
          <button
            className="home-indicator"
            type="button"
            onClick={() => setSwitcherOpen(true)}
            aria-label="Open recent projects"
          />
          {switcherOpen && (
            <div className="app-switcher">
              <header>
                <strong>Recent projects</strong>
                <button type="button" onClick={() => setSwitcherOpen(false)}>
                  Close
                </button>
              </header>
              <div>
                {projects.slice(0, 3).map((project) => (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => {
                      openProject(project);
                      setMobileScreen(0);
                      setSwitcherOpen(false);
                    }}
                  >
                    <strong>{project.title}</strong>
                    <small>{project.summary}</small>
                  </button>
                ))}
              </div>
            </div>
          )}
          {dogOpen && isMobile && (
            <Modal title="Dog photo" onClose={() => setDogOpen(false)}>
              <DogPhoto
                titleId="mobile-dog-title"
                available={dogPhotoAvailable}
                onError={() => setDogPhotoAvailable(false)}
              />
            </Modal>
          )}
        </div>
      )}
      {imageOpen && selected && activeScreen?.image && (
        <ImageViewer
          src={activeScreen.image}
          title={`${selected.title}: ${activeScreen.label}`}
          caption={activeScreen.caption}
          onClose={() => setImageOpen(false)}
        />
      )}
    </section>
  );
}
