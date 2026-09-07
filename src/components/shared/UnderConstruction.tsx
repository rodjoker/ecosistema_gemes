export function UnderConstruction({ section }: { section: string }) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-xs font-semibold tracking-widest text-[#E53535] uppercase">
        {section}
      </span>
      <h1 className="text-3xl font-bold text-white sm:text-4xl">En construcción</h1>
      <p className="max-w-md text-white/50">
        Esta sección del ecosistema GEMES todavía se está armando. Volvé pronto.
      </p>
    </div>
  );
}
