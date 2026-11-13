import { useState } from "react";
import { SITE } from "../../../config/site";

const LINKS = [
  ["Home", "#home"],
  ["Feed", "#feed"],
  ["Contact", "#contact"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-30 border-b border-stone-200 bg-white/90 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1800px] items-center justify-between px-5 py-3">
        <a href="#home" onClick={() => setOpen(false)} className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt={SITE.name}
            className="h-11 w-11 rounded-xl object-cover shadow ring-1 ring-black/5"
          />
          <span className="text-sm font-extrabold tracking-tight text-stone-900 sm:text-base">
            Tounch<span className="text-amber-500"> Software Solutions</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 sm:flex">
          {LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="group relative rounded-lg px-4 py-2 text-sm font-medium text-stone-600 transition hover:text-stone-900"
            >
              {label}
              <span className="absolute inset-x-4 -bottom-0.5 h-0.5 scale-x-0 bg-amber-500 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
          <a
            href="#contact"
            className="ml-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-neutral-900 shadow transition hover:bg-amber-400 hover:shadow-lg"
          >
            Get in touch
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="text-stone-900 sm:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`overflow-hidden bg-white transition-all duration-300 sm:hidden ${
          open ? "max-h-72 border-t border-stone-200" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-5 py-2">
          {LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-3 text-sm font-medium text-stone-700 transition hover:bg-stone-50 hover:text-amber-600"
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="my-2 rounded-lg bg-amber-500 px-4 py-2.5 text-center text-sm font-semibold text-neutral-900"
          >
            Get in touch
          </a>
        </div>
      </div>
    </nav>
  );
}
