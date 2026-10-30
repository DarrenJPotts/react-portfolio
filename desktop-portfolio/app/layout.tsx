import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const sans = localFont({
  src: '../../node_modules/@fontsource/dm-sans/files/dm-sans-latin-400-normal.woff2',
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Darren Potts | Project Desktop',
  description: 'A desktop-style archive of mobile and web development projects.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={sans.variable}>{children}</body>
    </html>
  );
}
