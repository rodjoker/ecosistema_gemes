export function UnderConstruction({ section }: { section: string }) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="text-xs font-semibold uppercase tracking-widest text-[#E53535]">{section}</span>
      <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">En construcción</h1>
      <p className="max-w-md text-gray-500">
        Esta sección del ecosistema GEMES todavía se está armando. Volvé pronto.
      </p>
    </div>
  );
}
