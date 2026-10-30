import { ImageResponse } from 'next/og';

export const alt = 'Darren Potts — Software Engineer, Mobile & Full Stack';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '56px 68px',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#171817',
        backgroundImage:
          'linear-gradient(rgba(231,232,227,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(231,232,227,.045) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        color: '#e7e8e3',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(231,232,227,.35)',
          paddingBottom: 18,
          fontSize: 18,
          letterSpacing: '0.14em',
        }}
      >
        <span>DP_OS / PORTFOLIO</span>
        <span style={{ color: '#d9834d' }}>MOBILE · FULL STACK</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ color: '#d9834d', fontSize: 20, letterSpacing: '0.16em' }}>
          DARREN POTTS
        </span>
        <div
          style={{
            display: 'flex',
            fontSize: 98,
            fontWeight: 800,
            lineHeight: 0.92,
            letterSpacing: '-0.07em',
            textTransform: 'uppercase',
          }}
        >
          Small screens.
          <br />
          Big systems.
        </div>
        <span style={{ marginTop: 16, color: '#b7b9b3', fontSize: 24 }}>
          Flutter · .NET MAUI · React Native · .NET
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 17,
          letterSpacing: '0.12em',
        }}
      >
        <span>SOFTWARE ENGINEER / PRETORIA, SOUTH AFRICA</span>
        <span
          style={{
            width: 38,
            height: 38,
            border: '2px solid #d9834d',
            borderRadius: 99,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#d9834d',
            fontSize: 24,
          }}
        >
          +
        </span>
      </div>
    </div>,
    { ...size },
  );
}
