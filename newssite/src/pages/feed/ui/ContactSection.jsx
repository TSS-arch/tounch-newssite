import { useRef } from "react";
import { SITE } from "../../../config/site";
import { useReveal } from "../hooks/useReveal";

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-slate-900">
      <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.3 1l-2.1 2.2z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-slate-900">
      <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 4v10h16V8l-8 5-8-5zm0-2 8 5 8-5H4z" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-slate-900">
      <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}

const CARDS = [
  { icon: <PhoneIcon />, title: "Our Number", lines: [SITE.phone], href: SITE.phoneHref },
  { icon: <MailIcon />, title: "Our Email", lines: [SITE.email], href: SITE.emailHref },
  { icon: <PinIcon />, title: "Our Location", lines: SITE.address, href: SITE.mapLink },
];

export default function ContactSection() {
  const root = useRef(null);
  useReveal(root);

  return (
    <section
      id="contact"
      ref={root}
      className="relative overflow-hidden bg-gradient-to-br from-neutral-950 via-amber-950 to-neutral-950 py-20 text-white"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-amber-500/15 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-5">
        <h2 data-reveal className="mb-12 text-center text-4xl font-black">
          <span className="rounded-lg bg-gradient-to-r from-amber-300 to-amber-500 px-3 py-1 text-neutral-900">
            Contact
          </span>{" "}
          Us
        </h2>

        <div className="grid gap-6 sm:grid-cols-3">
          {CARDS.map((c) => (
            <a
              key={c.title}
              data-reveal
              href={c.href}
              target={c.title === "Our Location" ? "_blank" : undefined}
              rel="noreferrer"
              className="group rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:border-amber-400/40 hover:bg-white/10 hover:shadow-2xl hover:shadow-amber-500/10"
            >
              <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-amber-300 to-amber-500 shadow-lg transition group-hover:scale-110">
                {c.icon}
              </div>
              <h3 className="mb-2 text-xl font-bold">{c.title}</h3>
              {c.lines.map((line) => (
                <p key={line} className="text-sm text-stone-300">
                  {line}
                </p>
              ))}
            </a>
          ))}
        </div>

        <div
          data-reveal
          className="mt-12 overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
        >
          <iframe
            title="Tounch Software Solutions location"
            src={SITE.mapEmbed}
            className="h-80 w-full"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
