"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type ExpressData = {
  slug: string;
  name: string;
  eyebrow: string;
  tagline: string;
  description: string;
  features: string[];
  accent: string;
  videoA: string;
  videoB: string;
};

// Sección de Express con scroll "pineado": al llegar acá, la página deja de
// avanzar y el scroll pasa a controlar la transición de video (el segundo
// sube tapando al primero). Recién cuando el segundo video queda completo
// se libera el scroll y la página sigue bajando normal -- por eso se fija
// TODA la sección (video + texto) y no solo el panel de video: si solo se
// fijara el video, el texto de al lado seguiría desplazándose solo y
// quedarían desalineados.
//
// El video B no tiene autoplay: si arrancan los 2 a la vez, algunos
// navegadores/GPUs limitan cuántos videos decodifican en simultáneo y el
// segundo puede quedar trabado en silencio. Se arranca con .play() recién
// cuando el pin empieza a avanzar.
export function ExpressSection({ data }: { data: ExpressData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const vB = videoBRef.current;
    if (!section || !vB) return;

    function ensureStarted() {
      if (startedRef.current || !vB) return;
      startedRef.current = true;
      vB.play().catch(() => {});
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isNarrow = window.matchMedia("(max-width: 46rem)").matches;
    if (prefersReduced || isNarrow) {
      // En mobile no hay pin (el scroll físico de una pantalla chica no se
      // presta) -- el segundo video directamente reemplaza al primero.
      vB.style.transform = "translateY(0%)";
      ensureStarted();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=900",
      pin: true,
      anticipatePin: 1,
      scrub: 0.4,
      onUpdate: (self) => {
        if (self.progress > 0) ensureStarted();
        const pct = (1 - self.progress) * 100;
        vB.style.transform = `translateY(${pct}%)`;
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section ref={sectionRef} className="flex flex-col items-center justify-center gap-10 md:min-h-screen md:flex-row">
      <div className="flex w-full justify-center md:w-[38%]">
        <div
          className="relative aspect-video w-full overflow-hidden rounded-3xl border"
          style={{ borderColor: `${data.accent}33`, boxShadow: `0 0 60px -12px ${data.accent}55` }}
        >
          <video className="absolute inset-0 h-full w-full object-cover" src={data.videoA} autoPlay muted loop playsInline />
          <video
            ref={videoBRef}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ transform: "translateY(100%)" }}
            src={data.videoB}
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>
      </div>

      <div className="w-full md:w-[62%]">
        <span className="font-mono text-xs font-semibold tracking-widest uppercase" style={{ color: data.accent }}>
          {data.eyebrow}
        </span>
        <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
          GEMES {data.name} <span className="font-normal text-white/35">— {data.tagline}</span>
        </h2>
        <p className="mt-3 max-w-lg text-white/50">{data.description}</p>

        <ul className="mt-5 flex flex-col gap-2">
          {data.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm text-white/70">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: data.accent }} />
              {feature}
            </li>
          ))}
        </ul>

        <Link
          href={`/${data.slug}`}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
          style={{ color: data.accent }}
        >
          Entrar a {data.name}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
