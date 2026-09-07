type IconProps = { className?: string };

function ScooterIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="6" cy="18" r="2.3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17" cy="18" r="2.3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M6 18h3l2-5h4.5M12 13l2 2.5h3.3c1.1 0 1.9.9 1.9 1.9v.6M9 8h3l1.2 2.3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const STOPS = [
  { label: "Location", value: "Tu Restaurante" },
  { label: "Destino", value: "Cliente Feliz" },
] as const;

/**
 * Tarjeta de "seguimiento en vivo" del hero de Express -- vitrina de la
 * funcionalidad real de tracking del producto (no es el widget funcional en
 * sí, es la pieza de marketing que la representa). El punto de origen
 * pulsa (`animate-ping`) para sugerir actividad en vivo sin necesitar JS ni
 * animaciones custom -- mismo criterio que el punto verde "Sistema en
 * producción" del hero de Inicio.
 */
export function TrackingWidget() {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#0c1220]/95 p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-md">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold tracking-widest text-white/50 uppercase">Seguimiento</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/15 text-orange-400">
          <ScooterIcon className="h-4 w-4" />
        </span>
      </div>

      <div className="relative mt-5 flex flex-col gap-4">
        <span className="absolute top-3 left-[7px] h-[calc(100%-24px)] w-px bg-white/15" aria-hidden="true" />

        <div className="flex items-center gap-3">
          <span className="relative z-10 h-3.5 w-3.5 shrink-0 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.7)]">
            <span className="absolute inset-0 animate-ping rounded-full bg-orange-500/60" />
          </span>
          <div className="flex-1 rounded-lg bg-white/5 px-3 py-2">
            <div className="text-[10px] font-semibold tracking-wide text-white/40 uppercase">{STOPS[0].label}</div>
            <div className="text-sm font-semibold text-white">{STOPS[0].value}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="relative z-10 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-blue-400 bg-[#0c1220]" />
          <div className="flex-1 rounded-lg bg-white/5 px-3 py-2">
            <div className="text-[10px] font-semibold tracking-wide text-white/40 uppercase">{STOPS[1].label}</div>
            <div className="text-sm font-semibold text-white">{STOPS[1].value}</div>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl bg-orange-500 py-2.5 text-center text-sm font-bold text-white shadow-[0_0_20px_rgba(249,115,22,0.35)]">
        Envío en Curso
      </div>
    </div>
  );
}
