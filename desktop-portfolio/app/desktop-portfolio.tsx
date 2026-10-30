'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

type Project = {
  id: string;
  title: string;
  kind: string;
  year: string;
  summary: string;
  role: string;
  outcome: string;
  demoUrl: string;
  sourceUrl: string;
  stack: string[];
  screens: { label: string; caption: string }[];
  placement: { left: string; top: string };
};
type ViewportMode = 'phone' | 'tablet' | 'browser';

const projects: Project[] = [
  {
    id: 'orbit',
    title: 'Orbit.app',
    kind: 'Mobile application',
    year: '2026',
    summary:
      'A calm workspace for capturing ideas and moving them toward useful outcomes.',
    role: 'Describe your contribution to the product and implementation.',
    outcome: 'Add a real outcome or the main lesson from this project.',
    demoUrl: '',
    sourceUrl: '',
    stack: ['Mobile UI', 'Offline data', 'Notifications'],
    screens: [
      { label: 'Overview', caption: 'Add the first app screen and its purpose.' },
      { label: 'Interface', caption: 'Show a key flow or interaction.' },
      { label: 'Outcome', caption: 'Describe what changed for the user.' },
    ],
    placement: { left: '64%', top: '21%' },
  },
  {
    id: 'canvas',
    title: 'Canvas.web',
    kind: 'Responsive website',
    year: '2026',
    summary:
      'An editorial portfolio system that adapts from large displays to pocket screens.',
    role: 'Describe your contribution to the product and implementation.',
    outcome: 'Add a real outcome or the main lesson from this project.',
    demoUrl: '',
    sourceUrl: '',
    stack: ['Next.js', 'TypeScript', 'CSS'],
    screens: [
      { label: 'Overview', caption: 'Add the first website screen and its purpose.' },
      { label: 'Interface', caption: 'Show a key page or responsive state.' },
      { label: 'Outcome', caption: 'Describe what changed for the user.' },
    ],
    placement: { left: '32%', top: '47%' },
  },
  {
    id: 'frequency',
    title: 'Frequency.app',
    kind: 'iOS application',
    year: '2026',
    summary:
      'A music discovery experience designed around one thumb and quick decisions.',
    role: 'Describe your contribution to the product and implementation.',
    outcome: 'Add a real outcome or the main lesson from this project.',
    demoUrl: '',
    sourceUrl: '',
    stack: ['Audio', 'API integration', 'Gestures'],
    screens: [
      { label: 'Overview', caption: 'Add the first app screen and its purpose.' },
      { label: 'Interface', caption: 'Show a key listening or discovery flow.' },
      { label: 'Outcome', caption: 'Describe what changed for the user.' },
    ],
    placement: { left: '72%', top: '60%' },
  },
  {
    id: 'lab',
    title: 'Interaction Lab',
    kind: 'Prototype archive',
    year: '2025–26',
    summary: 'Small studies in movement, navigation, gesture and interface feedback.',
    role: 'Describe the interactions and prototypes you explored.',
    outcome: 'Add the most useful thing you learned from the experiments.',
    demoUrl: '',
    sourceUrl: '',
    stack: ['Motion', 'Prototyping', 'Accessibility'],
    screens: [
      { label: 'Overview', caption: 'Introduce this interaction study.' },
      { label: 'Interface', caption: 'Show the gesture or motion in context.' },
      { label: 'Outcome', caption: 'Explain when this pattern is useful.' },
    ],
    placement: { left: '15%', top: '70%' },
  },
];

function DraggableIcon({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const drag = useRef({ x: 0, y: 0, startX: 0, startY: 0, moved: false });

  function onPointerDown(event: React.PointerEvent<HTMLButtonElement>) {
    if (matchMedia('(max-width: 760px)').matches) return;
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
      onDoubleClick={onOpen}
    >
      <span className="folder" aria-hidden="true">
        <i />
      </span>
      <strong>{project.title}</strong>
      <small>{project.kind}</small>
    </button>
  );
}

function DraggableFileIcon({
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

function DeviceBench({
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
          <i /> TEST BUILD / {project.id.toUpperCase()}
        </span>
        <strong>
          {project.stack[0]} · {project.year}
        </strong>
        <small>{project.kind}</small>
      </div>
    </div>
  );
}

function MobileWorkspaceSwitch({
  mode,
  onChange,
}: {
  mode: 'desktop' | 'bench';
  onChange: (mode: 'desktop' | 'bench') => void;
}) {
  return (
    <nav className="mobile-view-switch" aria-label="Portfolio view">
      <button
        type="button"
        className={mode === 'desktop' ? 'active' : ''}
        aria-pressed={mode === 'desktop'}
        onClick={() => onChange('desktop')}
      >
        DESKTOP
      </button>
      <button
        type="button"
        className={mode === 'bench' ? 'active' : ''}
        aria-pressed={mode === 'bench'}
        onClick={() => onChange('bench')}
      >
        WORKBENCH
      </button>
    </nav>
  );
}

function animateDogPet(runner: HTMLButtonElement | null) {
  if (!runner || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const animations: gsap.core.Animation[] = [];
  const context = gsap.context(() => {
    const sprite = runner.querySelector<HTMLElement>('.pixel-dog');
    if (!sprite) return;

    // Frame coordinates are zero-based: running uses sheet rows 2–3,
    // sitting uses rows 4–5. Cells are 60×38 pixels.
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

export default function DesktopPortfolio() {
  const [bootStage, setBootStage] = useState<'booting' | 'leaving' | 'ready'>('booting');
  const [selected, setSelected] = useState<Project | null>(null);
  const [workspaceMode, setWorkspaceMode] = useState<'bench' | 'desktop'>('desktop');
  const [benchProject, setBenchProject] = useState(projects[0]);
  const [viewportMode, setViewportMode] = useState<ViewportMode>('phone');
  const [reachOverlay, setReachOverlay] = useState(false);
  const [startOpen, setStartOpen] = useState(true);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [dogOpen, setDogOpen] = useState(false);
  const [dogWindowAnchor, setDogWindowAnchor] = useState({ x: 234, y: 760 });
  const [dogPhotoAvailable, setDogPhotoAvailable] = useState(true);
  const [time, setTime] = useState('');
  const [focusedWindow, setFocusedWindow] = useState<
    'welcome' | 'project' | 'cv' | 'contact' | 'hobbies'
  >('welcome');
  const [openFile, setOpenFile] = useState<'cv' | 'contact' | 'hobbies' | null>(null);
  const startWindow = useRef<HTMLElement>(null);
  const projectWindow = useRef<HTMLElement>(null);
  const fileWindow = useRef<HTMLElement>(null);
  const dogWindow = useRef<HTMLElement>(null);
  const desktopPet = useRef<HTMLButtonElement>(null);
  const mobilePet = useRef<HTMLButtonElement>(null);
  const windowPositions = useRef(new Map<string, { x: number; y: number }>());
  const activeWindowDrag = useRef({
    key: '',
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  });
  const [mobileUnlocked, setMobileUnlocked] = useState(false);
  const [mobileScreen, setMobileScreen] = useState(0);
  const [screenDirection, setScreenDirection] = useState<1 | -1>(1);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const swipeStart = useRef<number | null>(null);
  const lockSwipeStart = useRef<number | null>(null);
  const mobileLock = useRef<HTMLDivElement>(null);

  function openDogWindow(event: React.MouseEvent<HTMLButtonElement>) {
    const windowWidth = Math.min(420, window.innerWidth - 32);
    const x = Math.max(
      windowWidth / 2 + 16,
      Math.min(event.clientX, window.innerWidth - windowWidth / 2 - 16),
    );
    const y = Math.min(window.innerHeight - 16, Math.max(280, event.clientY - 14));
    setDogWindowAnchor({ x, y });
    setDogOpen(true);
  }

  function showMobileScreen(next: number) {
    const bounded = Math.max(0, Math.min(2, next));
    if (bounded === mobileScreen) return;
    setScreenDirection(bounded > mobileScreen ? 1 : -1);
    setMobileScreen(bounded);
  }

  function openProject(project: Project) {
    setSelected(project);
    setBenchProject(project);
    setViewportMode(project.kind.toLowerCase().includes('website') ? 'browser' : 'phone');
    setReachOverlay(false);
    setMobileScreen(0);
    setScreenDirection(1);
    setFocusedWindow('project');
  }

  function selectBenchProject(project: Project) {
    setBenchProject(project);
    setViewportMode(project.kind.toLowerCase().includes('website') ? 'browser' : 'phone');
    setReachOverlay(false);
  }

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setBootStage('ready');
      return;
    }
    const leaveTimer = window.setTimeout(() => setBootStage('leaving'), 1450);
    const readyTimer = window.setTimeout(() => setBootStage('ready'), 1780);
    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(readyTimer);
    };
  }, []);

  useEffect(() => animateDogPet(desktopPet.current), []);

  useEffect(() => {
    if (!mobileUnlocked || selected || openFile || workspaceMode !== 'desktop') return;
    return animateDogPet(mobilePet.current);
  }, [mobileUnlocked, openFile, selected, workspaceMode]);

  function startUnlockSwipe(event: React.PointerEvent<HTMLDivElement>) {
    if (event.target instanceof HTMLElement && event.target.closest('button')) return;
    lockSwipeStart.current = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function trackUnlockSwipe(event: React.PointerEvent<HTMLDivElement>) {
    if (lockSwipeStart.current === null) return;
    const distance = Math.max(0, lockSwipeStart.current - event.clientY);
    const progress = Math.min(distance / 110, 1);
    mobileLock.current?.style.setProperty('--swipe-progress', String(progress));
  }

  function finishUnlockSwipe(event: React.PointerEvent<HTMLDivElement>) {
    if (lockSwipeStart.current === null) return;
    const distance = lockSwipeStart.current - event.clientY;
    lockSwipeStart.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    mobileLock.current?.style.setProperty('--swipe-progress', '0');
    if (distance > 70) setMobileUnlocked(true);
  }

  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat('en-ZA', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date()),
      );
    update();
    const timer = window.setInterval(update, 30000);
    return () => window.clearInterval(timer);
  }, []);

  function beginWindowDrag(event: React.PointerEvent<HTMLElement>, key: string) {
    if (
      matchMedia('(max-width: 760px)').matches ||
      (event.target as HTMLElement).closest('button')
    )
      return;
    const position = windowPositions.current.get(key) ?? { x: 0, y: 0 };
    activeWindowDrag.current = {
      key,
      startX: event.clientX,
      startY: event.clientY,
      originX: position.x,
      originY: position.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moveWindow(
    event: React.PointerEvent<HTMLElement>,
    key: string,
    windowRef: React.RefObject<HTMLElement | null>,
  ) {
    if (
      activeWindowDrag.current.key !== key ||
      !event.currentTarget.hasPointerCapture(event.pointerId)
    )
      return;
    const x =
      activeWindowDrag.current.originX + event.clientX - activeWindowDrag.current.startX;
    const y =
      activeWindowDrag.current.originY + event.clientY - activeWindowDrag.current.startY;
    windowPositions.current.set(key, { x, y });
    windowRef.current?.style.setProperty('--window-x', `${x}px`);
    windowRef.current?.style.setProperty('--window-y', `${y}px`);
  }

  function endWindowDrag(event: React.PointerEvent<HTMLElement>, key: string) {
    if (activeWindowDrag.current.key !== key) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
    activeWindowDrag.current.key = '';
  }

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
        if (event.key === 'Escape') setStartMenuOpen(false);
      }}
    >
      {bootStage !== 'ready' && (
        <div
          className={`boot-loader ${bootStage === 'leaving' ? 'is-leaving' : ''}`}
          role="status"
          aria-live="polite"
          aria-label="Loading Darren Potts portfolio"
        >
          <div className="boot-grain" aria-hidden="true" />
          <header className="boot-header">
            <span>DP_OS</span>
            <span>PORTFOLIO DESKTOP · SYSTEM STARTUP</span>
            <span>ZA / 01</span>
          </header>
          <div className="boot-content">
            <p>INITIALIZING PORTFOLIO ENVIRONMENT</p>
            <h1>
              Darren Potts.
              <br />
              Mobile Developer.
            </h1>
            <div className="boot-progress" aria-hidden="true">
              <i />
            </div>
            <div className="boot-readout">
              <span>LOADING PROJECT INDEX</span>
              <span>
                PLEASE WAIT <b>···</b>
              </span>
            </div>
          </div>
          <footer className="boot-footer">
            <span>DARREN POTTS / MOBILE DEVELOPER</span>
            <span>BUILD 2026.01</span>
          </footer>
        </div>
      )}
      <div className="custom-cursor" aria-hidden="true">
        <i />
      </div>
      <header className="status-bar">
        <span>DP_OS</span>
        <nav className="workspace-switch" aria-label="Desktop view">
          <button
            type="button"
            className={workspaceMode === 'desktop' ? 'active' : ''}
            aria-pressed={workspaceMode === 'desktop'}
            onClick={() => {
              setWorkspaceMode('desktop');
              setStartOpen(false);
            }}
          >
            DESKTOP
          </button>
          <button
            type="button"
            className={workspaceMode === 'bench' ? 'active' : ''}
            aria-pressed={workspaceMode === 'bench'}
            onClick={() => {
              setWorkspaceMode('bench');
              setStartOpen(false);
            }}
          >
            WORKBENCH
          </button>
        </nav>
        <span>ZA · {time}</span>
      </header>
      <div className="archive-ticker" aria-label="Portfolio notes">
        <div>
          <span>BUILDING FOR THE POCKET</span>
          <b>×</b>
          <span>SMALL SCREENS, CONSIDERED SYSTEMS</span>
          <b>×</b>
          <span>DRAG A PROJECT TO EXPLORE</span>
          <b>×</b>
          <span>BUILT IN SOUTH AFRICA</span>
          <b>×</b>
          <span aria-hidden="true">BUILDING FOR THE POCKET</span>
          <b aria-hidden="true">×</b>
          <span aria-hidden="true">SMALL SCREENS, CONSIDERED SYSTEMS</span>
          <b aria-hidden="true">×</b>
          <span aria-hidden="true">DRAG A PROJECT TO EXPLORE</span>
          <b aria-hidden="true">×</b>
          <span aria-hidden="true">BUILT IN SOUTH AFRICA</span>
          <b aria-hidden="true">×</b>
        </div>
      </div>

      <div className="grain" aria-hidden="true" />

      {workspaceMode === 'bench' ? (
        <section className="workspace-home" aria-label="Mobile development workbench">
          <header className="workspace-heading">
            <div>
              <p>FIELD STATION / 01 — MOBILE PRODUCT LAB</p>
              <h1>
                Builds in
                <br />
                the wild.
              </h1>
            </div>
            <span className="station-status">
              <i /> AVAILABLE FOR SELECT PROJECTS
            </span>
          </header>
          <div className="workspace-grid">
            <aside className="build-index" aria-label="Project build index">
              <div className="index-heading">
                <span>BUILD INDEX</span>
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
              <div className="index-note">
                <span>SELECT A BUILD TO LOAD IT INTO THE DEVICE BENCH</span>
                <i>↓</i>
              </div>
            </aside>
            <section
              className="workspace-inspector"
              aria-label={`Device preview for ${benchProject.title}`}
            >
              <header className="inspector-heading">
                <span>
                  <i /> PREVIEW / {benchProject.id.toUpperCase()}
                </span>
                <small>SIMULATED VIEWPORT</small>
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
                  OPEN BUILD DETAILS <span>↗</span>
                </button>
              </footer>
            </section>
          </div>
          <div className="workspace-utilities" aria-label="Portfolio files">
            <span className="utility-label">PERSONAL FILES</span>
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
            <span className="calibration-label">
              DP / SYSTEMS DESIGNED FOR SMALL SCREENS
            </span>
          </div>
        </section>
      ) : (
        <>
          <div className="wallpaper-copy" aria-hidden="true">
            MOBILE DEVELOPER
            <br />
            INTERFACE BUILDER
            <br />
            CURIOUS HUMAN
          </div>
          <section className="identity" aria-label="Introduction">
            <p>DARREN POTTS / PORTFOLIO DESKTOP</p>
            <h1>
              Small screens.
              <br />
              Big systems.
            </h1>
            <span>Mobile development · Web interfaces · Product craft</span>
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
          className={`window start-window ${focusedWindow === 'welcome' ? 'is-focused' : ''}`}
          aria-labelledby="start-title"
          onPointerDown={() => setFocusedWindow('welcome')}
        >
          <header
            className="window-drag-handle"
            onPointerDown={(event) => beginWindowDrag(event, 'start')}
            onPointerMove={(event) => moveWindow(event, 'start', startWindow)}
            onPointerUp={(event) => endWindowDrag(event, 'start')}
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
            <p className="path">DP_OS / USERS / DARREN / START</p>
            <h2 id="start-title">Hello. I build products people carry.</h2>
            <p>
              I am a mobile developer focused on useful systems, tactile interfaces, and
              the details that make software feel considered.
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
          className={`window project-window ${focusedWindow === 'project' ? 'is-focused' : ''}`}
          aria-labelledby="project-title"
          onPointerDown={() => setFocusedWindow('project')}
        >
          <header
            className="window-drag-handle"
            onPointerDown={(event) => beginWindowDrag(event, 'project')}
            onPointerMove={(event) => moveWindow(event, 'project', projectWindow)}
            onPointerUp={(event) => endWindowDrag(event, 'project')}
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
            <div className="case-study-cover">
              <span>CASE FILE / {selected.id.toUpperCase()}</span>
              <strong>{selected.title.replace(/\.(app|web)/, '')}</strong>
              <i className="focus-reticle" aria-hidden="true">
                <i />
              </i>
              <small>
                {selected.kind} · {selected.year}
              </small>
              <div className="cover-registration" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="project-copy">
              <p className="path">
                PROJECTS / {selected.id.toUpperCase()} / BUILD_
                {selected.year.replace(/\D/g, '')}
              </p>
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
                <strong>OUTCOME / LESSON</strong>
                {selected.outcome}
              </p>
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
                {!selected.demoUrl && !selected.sourceUrl && (
                  <span>Add demo and repository links here.</span>
                )}
              </div>
              <div className="case-study-screens">
                <strong>
                  SCREEN NOTES / {String(selected.screens.length).padStart(2, '0')}
                </strong>
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
        </section>
      )}

      {openFile && (
        <section
          ref={fileWindow}
          className={`window file-window ${focusedWindow === openFile ? 'is-focused' : ''}`}
          aria-labelledby="file-window-title"
          onPointerDown={() => setFocusedWindow(openFile)}
        >
          <header
            className="window-drag-handle"
            onPointerDown={(event) => beginWindowDrag(event, openFile)}
            onPointerMove={(event) => moveWindow(event, openFile, fileWindow)}
            onPointerUp={(event) => endWindowDrag(event, openFile)}
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
              <p className="path">DP_OS / USERS / DARREN / CV</p>
              <h2 id="file-window-title">Darren Potts</h2>
              <p className="file-window-kicker">Mobile developer · Product builder</p>
              <p>
                I build thoughtful mobile experiences and the systems around them. Add a
                concise profile here that reflects the roles you are looking for.
              </p>
              <h3>Experience</h3>
              <div className="cv-entry">
                <strong>Mobile Developer</strong>
                <span>Company name · 2023—Present</span>
                <p>Add a short description of your work, team, and impact.</p>
              </div>
              <h3>Selected skills</h3>
              <p>React Native · TypeScript · iOS · Android · Product engineering</p>
            </div>
          ) : openFile === 'contact' ? (
            <div className="window-body file-window-body">
              <p className="path">DP_OS / USERS / DARREN / INBOX</p>
              <h2 id="file-window-title">Let’s talk.</h2>
              <p>
                Have a mobile product, interesting problem, or collaboration in mind? Send
                a note and tell me what you are working on.
              </p>
              <a className="file-window-action" href="mailto:hello@example.com">
                hello@example.com ↗
              </a>
              <p className="file-window-kicker">
                Replace this address with your preferred contact.
              </p>
            </div>
          ) : (
            <div className="window-body file-window-body hobbies-document">
              <p className="path">DP_OS / USERS / DARREN / HOBBIES</p>
              <h2 id="file-window-title">Outside the build loop.</h2>
              <p>
                A few things I enjoy away from shipping software. Replace these prompts
                with the hobbies, places, and small rituals that feel like you.
              </p>
              <div className="hobby-note">
                <span>01 / ON REPEAT</span>
                <strong>Add a hobby or current interest</strong>
                <p>What keeps you coming back to it?</p>
              </div>
              <div className="hobby-note">
                <span>02 / OUTSIDE</span>
                <strong>Add a place or activity</strong>
                <p>A trail, a court, a camera, a new city—your call.</p>
              </div>
              <div className="hobby-note">
                <span>03 / CURRENTLY CURIOUS</span>
                <strong>Add something you are learning</strong>
                <p>Keep this personal and update it whenever inspiration strikes.</p>
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
              }}
            >
              WELCOME.txt
            </button>
          )}
          {selected && (
            <button
              className={focusedWindow === 'project' ? 'active' : ''}
              type="button"
              onClick={() => setFocusedWindow('project')}
            >
              {selected.title}
            </button>
          )}
          {openFile && (
            <button
              className={focusedWindow === openFile ? 'active' : ''}
              type="button"
              onClick={() => setFocusedWindow(openFile)}
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
          <span>4 ITEMS</span>
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
          className="dog-photo-window"
          style={
            {
              '--dog-anchor-x': `${dogWindowAnchor.x}px`,
              '--dog-anchor-y': `${dogWindowAnchor.y}px`,
            } as React.CSSProperties
          }
          role="dialog"
          aria-modal="true"
          aria-labelledby="dog-photo-title"
        >
          <header
            className="window-drag-handle"
            onPointerDown={(event) => beginWindowDrag(event, 'dog')}
            onPointerMove={(event) => moveWindow(event, 'dog', dogWindow)}
            onPointerUp={(event) => endWindowDrag(event, 'dog')}
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
          <div className="dog-photo-content">
            <p className="path">DP_OS / FRIENDS / VERY_GOOD_DOG</p>
            <h2 id="dog-photo-title">My favourite coworker.</h2>
            {dogPhotoAvailable ? (
              <img
                src="/dog.png"
                alt="Darren’s dog"
                onError={() => setDogPhotoAvailable(false)}
              />
            ) : (
              <div className="dog-photo-placeholder">
                <span aria-hidden="true">🐾</span>
                <strong>Your dog goes here</strong>
                <p>
                  Add a photo named <code>dog.png</code> to the project’s{' '}
                  <code>public</code> folder.
                </p>
              </div>
            )}
            <small>CHIEF NAP OFFICER · ALWAYS ON PAW-TROL</small>
          </div>
        </section>
      )}

      <section className="mobile-os" aria-label="Mobile portfolio">
        {openFile && mobileUnlocked ? (
          <div className="mobile-project-app mobile-document-app">
            <header className="mobile-status">
              <button type="button" onClick={() => setOpenFile(null)}>
                Home
              </button>
              <span>{time}</span>
            </header>
            <div className="mobile-project-title">
              <p>DOCUMENT / {openFile.toUpperCase()}</p>
              <h2>
                {openFile === 'cv'
                  ? 'Darren Potts'
                  : openFile === 'contact'
                    ? 'Let’s talk.'
                    : 'Outside the build loop.'}
              </h2>
            </div>
            <div className="mobile-document-body">
              {openFile === 'cv' ? (
                <>
                  <p>Mobile developer · Product builder</p>
                  <p>
                    I build thoughtful mobile experiences and the systems around them. Add
                    a concise profile here that reflects the roles you are looking for.
                  </p>
                  <h3>Experience</h3>
                  <strong>Mobile Developer</strong>
                  <p>Company name · 2023—Present</p>
                  <p>Add a short description of your work, team, and impact.</p>
                  <h3>Selected skills</h3>
                  <p>React Native · TypeScript · iOS · Android · Product engineering</p>
                </>
              ) : openFile === 'contact' ? (
                <>
                  <p>
                    Have a mobile product, interesting problem, or collaboration in mind?
                    Send a note and tell me what you are working on.
                  </p>
                  <a className="file-window-action" href="mailto:hello@example.com">
                    hello@example.com ↗
                  </a>
                  <p>Replace this address with your preferred contact.</p>
                </>
              ) : (
                <>
                  <p>
                    A few things I enjoy away from shipping software. Replace these
                    prompts with the hobbies, places, and small rituals that feel like
                    you.
                  </p>
                  <div className="hobby-note">
                    <span>01 / ON REPEAT</span>
                    <strong>Add a hobby or current interest</strong>
                    <p>What keeps you coming back to it?</p>
                  </div>
                  <div className="hobby-note">
                    <span>02 / OUTSIDE</span>
                    <strong>Add a place or activity</strong>
                    <p>A trail, a court, a camera, a new city—your call.</p>
                  </div>
                  <div className="hobby-note">
                    <span>03 / CURRENTLY CURIOUS</span>
                    <strong>Add something you are learning</strong>
                    <p>Keep this personal and update it whenever inspiration strikes.</p>
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
              <p>PROJECT / {selected.id.toUpperCase()}</p>
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
                className={`mobile-screen screen-${mobileScreen} ${screenDirection > 0 ? 'swipe-forward' : 'swipe-backward'}`}
              >
                <small>{selected.screens[mobileScreen].label}</small>
                <strong>{selected.title.replace(/\.(app|web)/, '')}</strong>
                <span>{selected.screens[mobileScreen].caption}</span>
                <i />
                <span className="focus-reticle" aria-hidden="true">
                  <i />
                </span>
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
                />
              ))}
            </div>
            <section className={`mobile-sheet ${sheetOpen ? 'open' : ''}`}>
              <button
                className="sheet-handle"
                type="button"
                onClick={() => setSheetOpen((open) => !open)}
                aria-expanded={sheetOpen}
              >
                <i />
                <span>{sheetOpen ? 'Hide project notes' : 'View project notes'}</span>
              </button>
              <div className="sheet-content">
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
                <strong>OUTCOME / LESSON</strong>
                <p>{selected.outcome}</p>
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
                  {!selected.demoUrl && !selected.sourceUrl && (
                    <span>Add demo and repository links here.</span>
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
              <p>PORTFOLIO DEVICE</p>
              <h1>
                Darren
                <br />
                Potts
              </h1>
              <span>Mobile developer</span>
            </div>
            <div className="lock-notice">
              <small>NOW AVAILABLE</small>
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
              <span>LAB / DEVICE BENCH</span>
            </header>
            <MobileWorkspaceSwitch mode={workspaceMode} onChange={setWorkspaceMode} />
            <div className="mobile-lab-heading">
              <p>FIELD STATION / MOBILE PRODUCT LAB</p>
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
              <span>TEST BUILD / {benchProject.id.toUpperCase()}</span>
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
              <span>DP_OS · ONLINE</span>
            </header>
            <MobileWorkspaceSwitch mode={workspaceMode} onChange={setWorkspaceMode} />
            <div className="mobile-banner">
              <small>AVAILABLE FOR SELECT PROJECTS</small>
              <strong>Building useful things for small screens.</strong>
            </div>
            <div className="mobile-identity">
              <p>DARREN POTTS</p>
              <h1>
                Project
                <br />
                device.
              </h1>
            </div>
            <div className="app-grid">
              {projects.map((project, index) => (
                <button
                  key={project.id}
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
              <span>CURRENT FOCUS</span>
              <strong>Mobile interfaces with character and clarity.</strong>
              <small>4 projects · 1 archive</small>
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
                      <span>PROJECT_VIEWER</span>
                      <strong>{project.title}</strong>
                      <small>{project.summary}</small>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {dogOpen && (
              <div
                className="mobile-dog-overlay"
                role="dialog"
                aria-modal="true"
                aria-labelledby="mobile-dog-title"
              >
                <section className="mobile-dog-window">
                  <header>
                    <span>GOOD_DOG.jpg</span>
                    <button
                      type="button"
                      onClick={() => setDogOpen(false)}
                      aria-label="Close dog photo"
                    >
                      ×
                    </button>
                  </header>
                  <div className="dog-photo-content">
                    <p className="path">DP_OS / FRIENDS / VERY_GOOD_DOG</p>
                    <h2 id="mobile-dog-title">My favourite coworker.</h2>
                    {dogPhotoAvailable ? (
                      <img
                        src="/dog.png"
                        alt="Darren’s dog"
                        onError={() => setDogPhotoAvailable(false)}
                      />
                    ) : (
                      <div className="dog-photo-placeholder">
                        <span aria-hidden="true">🐾</span>
                        <strong>Your dog goes here</strong>
                        <p>
                          Add a photo named <code>dog.png</code> to the project’s{' '}
                          <code>public</code> folder.
                        </p>
                      </div>
                    )}
                    <small>CHIEF NAP OFFICER · ALWAYS ON PAW-TROL</small>
                  </div>
                </section>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
