export default function Loader() {
  return (
    <div className="space-y-8">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-2xl border border-stone-200 bg-white"
        >
          <div className="flex items-center gap-3 p-4">
            <div className="h-10 w-10 rounded-full bg-stone-200" />
            <div className="h-3 w-28 rounded bg-stone-200" />
          </div>
          <div className="aspect-video max-h-[560px] w-full bg-stone-200" />
          <div className="p-4">
            <div className="h-3 w-2/3 rounded bg-stone-200" />
          </div>
        </div>
      ))}
    </div>
  );
}