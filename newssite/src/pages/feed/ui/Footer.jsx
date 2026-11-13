import { useRef } from "react";
import { SITE } from "../../../config/site";
import { useReveal } from "../hooks/useReveal";

const QUICK = [
  ["Home", "#home"],
  ["Feed", "#feed"],
  ["Contact", "#contact"],
];

export default function Footer() {
  const root = useRef(null);
  useReveal(root);
  return (
    <footer ref={root} className="bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-3">
        {/* Brand */}
        <div data-reveal>
          <div className="mb-4 flex items-center gap-3">
            <img
              src="/logo.png"
              alt={SITE.name}
              className="h-12 w-12 rounded-xl object-cover ring-1 ring-white/10"
            />
            <span className="text-lg font-extrabold text-white">
              Tounch<span className="text-amber-500"> Software Solutions</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            Tounch Software Solutions — sharing the latest photos, videos and
            stories with our community.
          </p>
        </div>

        {/* Quick links */}
        <div data-reveal>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            {QUICK.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-slate-400 transition hover:text-amber-400"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div data-reveal>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
            Get in touch
          </h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li>
              <a href={SITE.phoneHref} className="transition hover:text-amber-400">
                📞 {SITE.phone}
              </a>
            </li>
            <li>
              <a href={SITE.emailHref} className="transition hover:text-amber-400">
                ✉️ {SITE.email}
              </a>
            </li>
            <li className="leading-relaxed">📍 {SITE.address.join(", ")}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Tounch Software Solutions. All rights reserved.
      </div>
    </footer>
  );
}
