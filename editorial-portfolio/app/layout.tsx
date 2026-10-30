import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const sans = localFont({
  src: '../../node_modules/@fontsource/dm-sans/files/dm-sans-latin-400-normal.woff2',
  variable: '--font-sans',
  display: 'swap',
});

const display = localFont({
  src: '../../node_modules/@fontsource/archivo-black/files/archivo-black-latin-400-normal.woff2',
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Darren Potts | Mobile Developer',
  description: 'An editorial portfolio for mobile and web development work.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${display.variable}`}>{children}</body>
    </html>
  );
}
