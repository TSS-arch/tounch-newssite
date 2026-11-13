export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Tounch Software Solutions"
            className="h-11 w-11 rounded-xl object-cover ring-1 ring-white/10"
          />
          <div className="leading-tight">
            <h1 className="text-lg font-bold">Tounch Software Solutions</h1>
            <p className="text-xs text-slate-400">Admin Console</p>
          </div>
        </div>
        <a
          href="http://localhost:5174"
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/5"
        >
          View Live Feed ↗
        </a>
      </div>
    </header>
  );
}
