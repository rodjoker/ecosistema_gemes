import Image from "next/image";
import { TrackingWidget } from "./TrackingWidget";
import { WHATSAPP_URL } from "./whatsapp";

type IconProps = { className?: string };

function CalendarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="4" y="5.5" width="16" height="14.5" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 10h16M8 3.5v3M16 3.5v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 14.5l1.8 1.8L15.5 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const TRUST_AVATARS = ["KF", "SC", "TC"];

/**
 * Hero de la página de producto GEMES Express. El fondo (`hero-express.jpg`)
 * es una foto real -- el título, los botones y la tarjeta de seguimiento son
 * componentes reales, no texto quemado en la imagen (a diferencia de la
 * referencia de diseño que el usuario pasó, que era un mockup plano).
 */
export function ExpressHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image src="/express/hero-express.jpg" alt="" fill priority className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05070c] via-[#05070c]/75 to-[#05070c]/35" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#05070c] to-transparent" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 py-24 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:py-36 xl:px-16">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 font-mono text-[11px] font-semibold tracking-widest text-orange-400 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
            La logística que tu negocio merece
          </span>

          <h1 className="mt-6 text-4xl leading-[1.1] font-extrabold text-balance text-white sm:text-5xl lg:text-6xl">
            Transforma tu Logística en una{" "}
            <span className="text-orange-400" style={{ textShadow: "0 0 30px rgba(249,115,22,0.5)" }}>
              Ventaja Competitiva
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg text-white/60">
            Entregas rápidas, tecnología de rastreo y una flota profesional que impulsa tus ventas y fideliza a tus
            clientes desde el primer envío.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#servicios"
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-colors hover:bg-orange-400"
            >
              Ver Servicios <span aria-hidden="true">→</span>
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.06] px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/[0.12]"
            >
              <CalendarIcon className="h-4 w-4" />
              Agendar Demo
            </a>
          </div>

          <div className="mt-10 flex items-center gap-3">
            <div className="flex -space-x-2.5">
              {TRUST_AVATARS.map((initials) => (
                <span
                  key={initials}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#05070c] bg-slate-700 text-[10px] font-bold text-white"
                >
                  {initials}
                </span>
              ))}
            </div>
            <p className="text-sm text-white/50">Confiado por +200 empresas en Ecuador</p>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <TrackingWidget />
        </div>
      </div>
    </section>
  );
}
