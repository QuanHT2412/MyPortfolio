"use client";

import { useEffect, useState } from "react";
import { nav, profile } from "@/data/site";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-b border-line bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-[#0a0a0b]"
      >
        Skip to content
      </a>
      <div className="wrap flex h-16 items-center justify-between">
        <a
          href="#top"
          className="flex min-h-11 items-center font-mono text-lg font-bold tracking-tight text-accent"
          onClick={() => setOpen(false)}
        >
          Quân<span className="text-glow">.</span>dev
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="link-draw flex min-h-11 items-center font-mono text-sm text-muted transition-colors hover:text-text"
            >
              {item.label}
            </a>
          ))}
          <a href={profile.cv} download className="btn btn-ghost !min-h-11 !py-2 text-sm">
            Download CV
          </a>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-accent md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
            {open ? (
              <path d="M4 4l12 12M16 4L4 16" />
            ) : (
              <path d="M3 6h14M3 10h14M3 14h14" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="wrap flex h-[calc(100dvh-4rem)] flex-col gap-2 bg-bg pb-10 pt-6 md:hidden"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-4 font-mono text-3xl font-bold text-text"
            >
              {item.label}
            </a>
          ))}
          <a href={profile.cv} download className="btn btn-primary mt-auto w-full">
            Download CV
          </a>
        </nav>
      )}
    </header>
  );
}
