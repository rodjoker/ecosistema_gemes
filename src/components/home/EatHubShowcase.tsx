"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EatHubScene3D } from "./EatHubScene3D";

type IconProps = { className?: string };

function EatIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M18 24h28l-2 26a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4l-2-26Z" fill="currentColor" />
      <path d="M24 24v-3a8 8 0 0 1 16 0v3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M25 38l5 5 9-10" stroke="#05070c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M16 10h32a2 2 0 0 1 2 2v40l-5-4-5 4-5-4-5 4-5-4-5 4-5-4V12a2 2 0 0 1 2-2Z" fill="currentColor" />
      <path d="M22 22h20M22 29h20M22 36h13" stroke="#05070c" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

const ITEMS = [
  {
    slug: "eat",
    name: "Eat",
    eyebrow: "Consumidor",
    tagline: "Pedir bien, sin vueltas",
    description:
      "La puerta de entrada del cliente final: descubrir restaurantes cerca, armar el pedido y seguirlo hasta que llega -- conectado a la misma flota de Express por debajo.",
    features: ["Catálogo de restaurantes cercanos", "Pedido y pago en un mismo flujo", "Seguimiento del pedido en tiempo real"],
    accent: "#2196f3",
    Icon: EatIcon,
    status: "soon" as const,
  },
  {
    slug: "hub",
    name: "Hub",
    eyebrow: "Restaurante",
    tagline: "El restaurante, ordenado por dentro",
    description:
      "Mesas, cocina y caja conectadas en un solo sistema: cada pedido nace en una mesa y termina facturado, sin planillas de papel ni gritos entre salón y cocina.",
    features: ["KDS (pantalla de cocina) en tiempo real", "Gestión de mesas y comandas", "Caja e inventario integrados"],
    accent: "#FF2E9A",
    Icon: HubIcon,
    status: "live" as const,
  },
];

// Vitrina compartida Eat + Hub: un solo panel 3D sticky (bolsa <-> local
// comercial) que va transicionando a medida que el texto de cada uno pasa
// por el centro de la pantalla -- Express quedó aparte con el video real de
// dron, así que este componente cubre las 2 secciones restantes. En mobile
// no hay sticky (no tiene sentido con el scroll físico de una pantalla
// chica) -- cada sección muestra su propio ícono estático, como antes.
export function EatHubShowcase() {
  const activeIndexRef = useRef(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const isNarrow = window.matchMedia("(max-width: 46rem)").matches;
    if (isNarrow) return;

    gsap.registerPlugin(ScrollTrigger);
    const triggers = sectionRefs.current.map((el, idx) => {
      if (!el) return null;
      return ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 45%",
        onEnter: () => (activeIndexRef.current = idx),
        onEnterBack: () => (activeIndexRef.current = idx),
      });
    });

    return () => {
      triggers.forEach((t) => t?.kill());
    };
  }, []);

  return (
    <div className="grid gap-16 md:grid-cols-2 md:items-start md:gap-20">
      <div className="hidden md:sticky md:top-28 md:block md:h-[55vh]">
        <div className="h-full w-full rounded-3xl border border-white/10 bg-white/[0.02]">
          <EatHubScene3D activeIndexRef={activeIndexRef} />
        </div>
      </div>

      <div className="flex flex-col gap-24">
        {ITEMS.map((item, idx) => (
          <section
            key={item.slug}
            ref={(el) => {
              sectionRefs.current[idx] = el;
            }}
          >
            <div className="mb-6 flex justify-center md:hidden">
              <div
                className="flex h-40 w-40 items-center justify-center rounded-3xl border"
                style={{
                  borderColor: `${item.accent}33`,
                  background: `linear-gradient(160deg, ${item.accent}14, transparent)`,
                  boxShadow: `0 0 60px -12px ${item.accent}55`,
                  color: item.accent,
                }}
              >
                <item.Icon className="h-20 w-20" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold tracking-widest uppercase" style={{ color: item.accent }}>
                {item.eyebrow}
              </span>
              {item.status === "soon" && (
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-white/40">
                  Próximamente
                </span>
              )}
            </div>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              GEMES {item.name} <span className="font-normal text-white/35">— {item.tagline}</span>
            </h2>
            <p className="mt-3 max-w-lg text-white/50">{item.description}</p>

            <ul className="mt-5 flex flex-col gap-2">
              {item.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-white/70">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: item.accent }} />
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href={`/${item.slug}`}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
              style={{ color: item.accent }}
            >
              Entrar a {item.name}
              <span aria-hidden="true">→</span>
            </Link>
          </section>
        ))}
      </div>
    </div>
  );
}
