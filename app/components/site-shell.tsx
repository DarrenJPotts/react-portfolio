'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon, List, X, GithubLogo, ArrowUpRight } from '@phosphor-icons/react';
import { profile } from '../../data/portfolio';

const ThemeContext = createContext({ dark: false, toggle: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    function sync() {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem('portfolio-theme');
      } catch {}
      const value = saved === 'dark' || (saved !== 'light' && media.matches);
      setDark(value);
      document.documentElement.dataset.theme = value ? 'dark' : 'light';
    }
    sync();
    media.addEventListener('change', sync);
    window.addEventListener('storage', sync);
    return () => {
      media.removeEventListener('change', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);
  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    try {
      localStorage.setItem('portfolio-theme', next ? 'dark' : 'light');
    } catch {}
  }
  return (
    <ThemeContext.Provider value={{ dark, toggle }}>{children}</ThemeContext.Provider>
  );
}

export function SiteHeader() {
  const { dark, toggle } = useContext(ThemeContext);
  const [menu, setMenu] = useState(false);
  const pathname = usePathname();
  const [hash, setHash] = useState('');
  useEffect(() => {
    const update = () => setHash(window.location.hash);
    update();
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, [pathname]);
  const links = [
    { label: 'The work', href: '/#work' },
    { label: 'The human', href: '/#about' },
    { label: 'Experience', href: '/#experience' },
    { label: 'CV', href: '/cv' },
    { label: 'Say hello', href: '/#contact' },
  ];
  return (
    <header className="header wrap shared-header no-print">
      <Link
        className="wordmark"
        href="/"
        aria-label="Darren Potts home"
        onClick={() => setMenu(false)}
      >
        dp<span className="logo-dot">.</span>
        <span className="wordmark-label">
          MOBILE DEVELOPER
          <br />& CREATIVE THINKER
        </span>
      </Link>
      <nav
        id="site-navigation"
        className={menu ? 'nav open' : 'nav'}
        aria-label="Main navigation"
      >
        {links.map((link) => {
          const active =
            link.href === '/cv'
              ? pathname === '/cv'
              : (link.href === '/#work' && pathname.startsWith('/projects/')) ||
                (pathname === '/' && link.href === `/${hash}`);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={active ? 'nav-active' : undefined}
              aria-current={active ? (pathname === '/' ? 'location' : 'page') : undefined}
              onClick={() => {
                setMenu(false);
                setHash(link.href.includes('#') ? `#${link.href.split('#')[1]}` : '');
              }}
            >
              {link.label}
              {link.label === 'The work' || link.label === 'Say hello' ? (
                <ArrowUpRight />
              ) : null}
            </Link>
          );
        })}
      </nav>
      <div className="header-tools">
        <button
          className="icon-button"
          aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
          onClick={toggle}
        >
          {dark ? <Sun size={21} /> : <Moon size={21} />}
        </button>
        <button
          className="icon-button menu-button"
          aria-label="Toggle navigation"
          aria-controls="site-navigation"
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setMenu(false);
          }}
        >
          {menu ? <X size={24} /> : <List size={24} />}
        </button>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer wrap no-print">
      <Link className="footer-logo" href="/">
        dp.
      </Link>
      <span>
        © {new Date().getFullYear()} {profile.name}. Made with a playful mind.
      </span>
      {profile.email && <a href={`mailto:${profile.email}`}>Email ↗</a>}
      {profile.github && (
        <a href={`https://github.com/${profile.github}`} target="_blank" rel="noreferrer">
          <GithubLogo size={20} /> GitHub <ArrowUpRight size={17} />
        </a>
      )}
      <a href="#top">Back to top ↑</a>
    </footer>
  );
}
