import Link from "next/link";
import Image from "next/image";

const ACCENT = "#FF2E9A";

// Video más ancho que el de Express (42% vs 38%) -- pedido explícito del
// usuario ("más grande de lo que se ven los de Gemes Express"). Autoplay
// simple sin scroll pineado (a diferencia de ExpressSection) -- no hace
// falta "use client" acá, es HTML nativo.
export function HubSection() {
  return (
    <section className="flex flex-col items-center gap-10 lg:flex-row lg:items-center">
      <div className="flex w-full justify-center lg:w-[42%] lg:shrink-0">
        <div
          className="relative aspect-video w-full overflow-hidden rounded-3xl border"
          style={{ borderColor: `${ACCENT}33`, boxShadow: `0 0 60px -12px ${ACCENT}55` }}
        >
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/hub/hub-restaurant.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      </div>

      <div className="w-full lg:flex-1">
        <span className="font-mono text-xs font-semibold tracking-widest uppercase" style={{ color: ACCENT }}>
          Restaurante
        </span>
        <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
          GEMES Hub <span className="font-normal text-white/35">— El restaurante, ordenado por dentro</span>
        </h2>
        <p className="mt-3 max-w-lg text-white/50">
          Mesas, cocina y caja conectadas en un solo sistema: cada pedido nace en una mesa y termina facturado, sin
          planillas de papel ni gritos entre salón y cocina.
        </p>

        <ul className="mt-5 flex flex-col gap-2">
          {["KDS (pantalla de cocina) en tiempo real", "Gestión de mesas y comandas", "Caja e inventario integrados"].map(
            (feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm text-white/70">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: ACCENT }} />
                {feature}
              </li>
            ),
          )}
        </ul>

        <Link
          href="/hub"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
          style={{ color: ACCENT }}
        >
          Entrar a Hub
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="w-full max-w-[220px] lg:w-[220px] lg:shrink-0">
        <div
          className="overflow-hidden rounded-3xl border"
          style={{ borderColor: `${ACCENT}33`, boxShadow: `0 0 60px -12px ${ACCENT}55` }}
        >
          <Image
            src="/hub/hub-pizzeria.jpg"
            alt="Riders de GEMES Express retirando pedidos en una pizzería"
            width={800}
            height={1101}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
