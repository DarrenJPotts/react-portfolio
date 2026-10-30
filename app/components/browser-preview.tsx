import Image from 'next/image';

export default function BrowserPreview({
  label = 'Website preview',
  src = '',
}: {
  label?: string;
  src?: string;
}) {
  return (
    <div className="browser-preview">
      <div className="browser-toolbar" aria-hidden="true">
        <span>↔</span>
        <span className="browser-address">website preview</span>
        <span>↗</span>
      </div>
      <div className="browser-screen">
        {src ? (
          <Image
            src={src}
            alt={label}
            fill
            sizes="(max-width: 900px) 300px, 450px"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className="browser-placeholder">
            <span>SCREENSHOT PLACEHOLDER</span>
            <strong>
              Canvas
              <span>
                Creative work.
                <br />
                Room to breathe.
              </span>
            </strong>
            <span>{label}</span>
          </div>
        )}
      </div>
    </div>
  );
}
