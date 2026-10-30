'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

/** The browser's modal dialog owns focus containment, Escape and background inertness. */
export function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    const element = dialog.current;
    const opener = document.activeElement as HTMLElement | null;
    element?.showModal();
    const originalOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      element?.close();
      document.documentElement.style.overflow = originalOverflow;
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, []);
  return createPortal(
    <dialog
      ref={dialog}
      className="portfolio-dialog"
      aria-label={title}
      onKeyDown={(event) => event.stopPropagation()}
      onCancel={(event) => {
        event.preventDefault();
        close.current();
      }}
    >
      <header>
        <strong>{title}</strong>
        <button type="button" autoFocus onClick={onClose} aria-label={`Close ${title}`}>
          ×
        </button>
      </header>
      {children}
    </dialog>,
    document.body,
  );
}

export function ScreenshotImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <p className="image-error" role="status">
      This screenshot could not load. Please try reloading the page.
    </p>
  ) : (
    <img
      className={className}
      src={src}
      alt={alt}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

export function ImageViewer({
  src,
  title,
  caption,
  onClose,
}: {
  src: string;
  title: string;
  caption: string;
  onClose: () => void;
}) {
  return (
    <Modal title={title} onClose={onClose}>
      <div className="image-viewer-content">
        <p>{caption}</p>
        <a href={src} target="_blank" rel="noreferrer">
          Open original image in a new tab
        </a>
        <ScreenshotImage src={src} alt={caption} />
      </div>
    </Modal>
  );
}
