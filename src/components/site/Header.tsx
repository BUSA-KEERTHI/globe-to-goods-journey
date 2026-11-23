import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

const LINKS: Array<[string, string]> = [
  ["Services", "services"],
  ["How it works", "journey"],
  ["What we import", "products"],
  ["China trips", "trips"],
  ["Blog", ""],
  ["Contact", "contact"],
];

/** On the home page sections are in-page anchors; elsewhere they link back to home. */
export function HomeLink({
  home,
  hash,
  className,
  onClick,
  children,
}: {
  home: boolean;
  hash: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  if (home)
    return (
      <a className={className} href={`#${hash}`} onClick={onClick}>
        {children}
      </a>
    );
  return (
    <Link className={className} to="/" hash={hash} onClick={onClick}>
      {children}
    </Link>
  );
}

export function Logo({ home }: { home: boolean }) {
  const inner = (
    <>
      IMP
      <svg>
        <use href="#logo-o" />
      </svg>
      RTNOW
    </>
  );
  return home ? (
    <a href="#home" className="logo" aria-label="ImportNow home">
      {inner}
    </a>
  ) : (
    <Link to="/" className="logo" aria-label="ImportNow home">
      {inner}
    </Link>
  );
}

export function Header({ home }: { home: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 30);
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => removeEventListener("scroll", onScroll);
  }, []);

  const item = (t: string, h: string, mobile: boolean) =>
    t === "Blog" ? (
      <Link
        key={t}
        to="/blog"
        className={!mobile && !home ? "active" : undefined}
        onClick={() => setOpen(false)}
      >
        {t}
      </Link>
    ) : (
      <HomeLink key={t} home={home} hash={h} onClick={() => setOpen(false)}>
        {t}
      </HomeLink>
    );

  return (
    <>
      <header
        className={`nav${home ? "" : " solid"}${scrolled ? " scrolled" : ""}`}
        id="nav"
      >
        <div className="wrap">
          <Logo home={home} />
          <nav className="nav-links">{LINKS.map(([t, h]) => item(t, h, false))}</nav>
          <HomeLink home={home} hash="contact" className="btn btn-primary nav-cta">
            Get a free quote
          </HomeLink>
          <button
            className="burger"
            id="burger"
            aria-label="Open menu"
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </header>
      <div className={`mobile-menu${open ? " open" : ""}`} id="mmenu">
        {LINKS.map(([t, h]) => item(t, h, true))}
      </div>
    </>
  );
}
