import Image from 'next/image';

export default function Phone({
  visual = 'orbit',
  label = 'App screen',
  src = '',
  number = '01',
}: {
  visual?: string;
  label?: string;
  src?: string;
  number?: string;
}) {
  return (
    <div className={`phone phone-${visual}`}>
      <div className="phone-screen">
        {src ? (
          <Image
            src={src}
            alt={label}
            fill
            sizes="(max-width: 767px) 180px, 240px"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className="phone-placeholder">
            <span className="phone-placeholder-label">SCREEN PLACEHOLDER</span>
            <div className="phone-art" aria-hidden="true">
              {visual === 'orbit' ? (
                <>
                  <div className="phone-orbit-ring" />
                  <span>o.</span>
                </>
              ) : visual === 'frequency' ? (
                <>
                  <div className="phone-wave">
                    {[30, 65, 100, 55, 130, 80, 40].map((height, i) => (
                      <span key={i} style={{ height }} />
                    ))}
                  </div>
                  <strong>f.</strong>
                </>
              ) : (
                <span className="phone-question">?</span>
              )}
            </div>
            <div className="phone-screen-label">
              <span>
                {number} / {label}
              </span>
              <strong>
                {visual === 'orbit'
                  ? 'Make space.'
                  : visual === 'frequency'
                    ? 'Find your frequency.'
                    : 'What if?'}
              </strong>
            </div>
          </div>
        )}
        <div className="phone-camera" aria-hidden="true" />
        <div className="phone-home" aria-hidden="true" />
      </div>
    </div>
  );
}
