/** Esqueleto cinza mostrado enquanto o catálogo carrega. */
export function ProductGridSkeleton({ n = 6 }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
      {Array.from({ length: n }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-black/5 bg-cream"
        >
          <div className="aspect-[4/5] animate-pulse bg-black/5" />
          <div className="space-y-2 p-4">
            <div className="h-4 w-4/5 animate-pulse rounded bg-black/10" />
            <div className="h-4 w-2/5 animate-pulse rounded bg-black/10" />
            <div className="h-9 w-full animate-pulse rounded-full bg-black/10" />
          </div>
        </div>
      ))}
    </div>
  );
}
