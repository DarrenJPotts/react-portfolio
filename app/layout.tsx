import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const sans = localFont({
  src: '../node_modules/@fontsource/dm-sans/files/dm-sans-latin-400-normal.woff2',
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: 'Darren Potts | Software Engineer · Mobile & Full Stack',
  description:
    'Darren Potts is a software engineer specialising in mobile and full-stack development with Flutter, .NET MAUI, React Native, and .NET.',
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    siteName: 'Darren Potts',
    title: 'Darren Potts | Software Engineer · Mobile & Full Stack',
    description:
      'Mobile applications, responsive web experiences, and product engineering by Darren Potts.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Darren Potts | Software Engineer · Mobile & Full Stack',
    description:
      'Mobile applications, responsive web experiences, and product engineering by Darren Potts.',
  },
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
