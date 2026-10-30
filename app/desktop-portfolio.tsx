'use client';

import { useEffect, useRef, useState } from 'react';

import {
  projects,
  type FocusedWindow,
  type Project,
  type ViewportMode,
  type WorkspaceMode,
} from './components/desktop/data';
import { DesktopWorkspace } from './components/desktop/desktop-workspace';
import { MobilePortfolio } from './components/desktop/mobile-portfolio';
import { useDogPet } from './components/desktop/hooks/use-dog-pet';
import { useSystemStatus } from './components/desktop/hooks/use-system-status';
import { useWindowDrag } from './components/desktop/hooks/use-window-drag';

import { useProjectNavigation } from './components/desktop/hooks/use-project-navigation';
import { MotionSettingsProvider } from './components/desktop/motion-settings';

export default function DesktopPortfolio() {
  return (
    <MotionSettingsProvider>
      <Portfolio />
    </MotionSettingsProvider>
  );
}

function Portfolio() {
  const { selected, setSelected } = useProjectNavigation();
  const [workspaceMode, setWorkspaceMode] = useState<WorkspaceMode>('desktop');
  const [benchProject, setBenchProject] = useState(projects[0]);
  const [viewportMode, setViewportMode] = useState<ViewportMode>('phone');
  const [reachOverlay, setReachOverlay] = useState(false);
  const [startOpen, setStartOpen] = useState(true);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [dogOpen, setDogOpen] = useState(false);
  const [dogWindowAnchor, setDogWindowAnchor] = useState({ x: 234, y: 760 });
  const [dogPhotoAvailable, setDogPhotoAvailable] = useState(true);
  const [focusedWindow, setFocusedWindow] = useState<FocusedWindow>('welcome');
  const [openFile, setOpenFile] = useState<'cv' | 'contact' | 'hobbies' | null>(null);
  const startWindow = useRef<HTMLElement>(null);
  const projectWindow = useRef<HTMLElement>(null);
  const fileWindow = useRef<HTMLElement>(null);
  const dogWindow = useRef<HTMLElement>(null);
  const desktopPet = useRef<HTMLButtonElement>(null);
  const mobilePet = useRef<HTMLButtonElement>(null);
  const [mobileUnlocked, setMobileUnlocked] = useState(false);
  const [mobileScreen, setMobileScreen] = useState(0);
  const [screenDirection, setScreenDirection] = useState<1 | -1>(1);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const swipeStart = useRef<number | null>(null);
  const lockSwipeStart = useRef<number | null>(null);
  const mobileLock = useRef<HTMLDivElement>(null);

  const { bootStage, time } = useSystemStatus();
  const { beginWindowDrag, moveWindow, endWindowDrag } = useWindowDrag();
  useDogPet(desktopPet);
  useDogPet(
    mobilePet,
    mobileUnlocked && !selected && !openFile && workspaceMode === 'desktop',
  );

  useEffect(() => {
    if (selected) {
      setMobileUnlocked(true);
      setMobileScreen(0);
      setSheetOpen(false);
      setOpenFile(null);
      setFocusedWindow('project');
    }
  }, [selected?.id]);

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
    const bounded = Math.max(
      0,
      Math.min((selected ?? benchProject).screens.length - 1, next),
    );
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

  return (
    <>
      <DesktopWorkspace
        bootStage={bootStage}
        selected={selected}
        setSelected={setSelected}
        workspaceMode={workspaceMode}
        setWorkspaceMode={setWorkspaceMode}
        benchProject={benchProject}
        viewportMode={viewportMode}
        setViewportMode={setViewportMode}
        reachOverlay={reachOverlay}
        setReachOverlay={setReachOverlay}
        startOpen={startOpen}
        setStartOpen={setStartOpen}
        startMenuOpen={startMenuOpen}
        setStartMenuOpen={setStartMenuOpen}
        dogOpen={dogOpen}
        setDogOpen={setDogOpen}
        dogWindowAnchor={dogWindowAnchor}
        dogPhotoAvailable={dogPhotoAvailable}
        setDogPhotoAvailable={setDogPhotoAvailable}
        time={time}
        focusedWindow={focusedWindow}
        setFocusedWindow={setFocusedWindow}
        openFile={openFile}
        setOpenFile={setOpenFile}
        desktopPet={desktopPet}
        startWindow={startWindow}
        projectWindow={projectWindow}
        fileWindow={fileWindow}
        dogWindow={dogWindow}
        openDogWindow={openDogWindow}
        openProject={openProject}
        selectBenchProject={selectBenchProject}
        beginWindowDrag={beginWindowDrag}
        moveWindow={moveWindow}
        endWindowDrag={endWindowDrag}
      />
      <MobilePortfolio
        openFile={openFile}
        setOpenFile={setOpenFile}
        time={time}
        selected={selected}
        setSelected={setSelected}
        setSheetOpen={setSheetOpen}
        sheetOpen={sheetOpen}
        swipeStart={swipeStart}
        mobileScreen={mobileScreen}
        showMobileScreen={showMobileScreen}
        screenDirection={screenDirection}
        startUnlockSwipe={startUnlockSwipe}
        trackUnlockSwipe={trackUnlockSwipe}
        finishUnlockSwipe={finishUnlockSwipe}
        mobileLock={mobileLock}
        mobileUnlocked={mobileUnlocked}
        setMobileUnlocked={setMobileUnlocked}
        workspaceMode={workspaceMode}
        setWorkspaceMode={setWorkspaceMode}
        benchProject={benchProject}
        selectBenchProject={selectBenchProject}
        viewportMode={viewportMode}
        setViewportMode={setViewportMode}
        reachOverlay={reachOverlay}
        setReachOverlay={setReachOverlay}
        mobilePet={mobilePet}
        dogOpen={dogOpen}
        setDogOpen={setDogOpen}
        dogPhotoAvailable={dogPhotoAvailable}
        setDogPhotoAvailable={setDogPhotoAvailable}
        switcherOpen={switcherOpen}
        setSwitcherOpen={setSwitcherOpen}
        openProject={openProject}
        setMobileScreen={setMobileScreen}
      />
    </>
  );
}
