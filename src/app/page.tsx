import { EatHubShowcase } from "@/components/home/EatHubShowcase";
import { EcosystemMap3D } from "@/components/home/EcosystemMap3D";
import { ExpressSection } from "@/components/home/ExpressSection";

const EXPRESS = {
  slug: "express",
  name: "Express",
  eyebrow: "Logística",
  tagline: "La flota que nunca pierde un pedido",
  description:
    "Auto-asignación de motorizados, seguimiento en vivo de principio a fin y una operación que se sostiene sola incluso cuando un rider lleva dos entregas a la vez.",
  features: [
    "Asignación automática según ubicación y capacidad del rider",
    "Seguimiento en tiempo real por WebSocket, sin recargar pantalla",
    "Hasta 2 pedidos simultáneos por motorizado",
  ],
  accent: "#E53535",
  videoA: "/videos/express-drone.mp4",
  videoB: "/videos/express-maleta.mp4",
};

const TECH_STRIP = [
  "Tiempo real vía WebSocket",
  "GPS en vivo",
  "Arquitectura propia",
  "Multi-producto, un solo ecosistema",
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden">
        {/* Capas decorativas -- separadas del contenido a propósito: el
            mask-image de .tech-grid aplica a TODO lo que esté dentro del
            elemento que lo lleva (no solo al fondo), así que si el título
            quedara adentro de ese div, el fade del mask se le pegaba
            encima y lo dejaba viéndose apagado. */}
        <div className="tech-grid pointer-events-none absolute inset-0" />
        <div
          className="pointer-events-none absolute top-[-10%] left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full opacity-20 blur-[100px]"
          style={{ background: "#E53535" }}
        />
        <div className="relative mx-auto max-w-4xl px-6 pt-24 pb-16 text-center sm:pt-32">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] tracking-widest text-white/60 uppercase">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#22c55e]" />
            Sistema en producción
          </span>
          <h1
            className="mt-6 text-4xl leading-[1.08] font-bold text-balance text-white sm:text-6xl"
            style={{ textShadow: "0 0 40px rgba(255,255,255,0.25)" }}
          >
            La tecnología pone a{" "}
            <span className="text-[#E53535]" style={{ textShadow: "0 0 30px rgba(229,53,53,0.6)" }}>
              GEMES
            </span>{" "}
            en el primer lugar.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/50">
            Tres productos construidos sobre la misma base: seguimiento en tiempo real, arquitectura propia y una
            operación que escala sin depender de planillas ni llamadas.
          </p>
        </div>

        {/* Franja técnica */}
        <div className="relative border-y border-white/[0.06] bg-white/[0.02]">
          <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-10 gap-y-3 px-6 py-5">
            {TECH_STRIP.map((item) => (
              <span key={item} className="flex items-center gap-2 font-mono text-[12px] text-white/40">
                <span className="h-1 w-1 rounded-full bg-white/25" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Ciudad 3D del ecosistema -- cómo circula un pedido entre hogares, Eats, Hub y Express.
          Más ancha que el resto de las secciones (max-w-5xl) a propósito: con ese ancho la
          escena se veía apiñada. */}
      <div className="mx-auto max-w-5xl px-6 pb-24 lg:max-w-6xl xl:max-w-7xl">
        <EcosystemMap3D />
      </div>

      {/* Express -- sección con scroll pineado: la página se detiene mientras
          el segundo video sube y tapa al primero, y recién libera el scroll
          cuando queda completo. */}
      <div className="mx-auto max-w-5xl px-6">
        <ExpressSection data={EXPRESS} />
      </div>

      {/* Eat + Hub -- vitrina 3D compartida (bolsa <-> local) que transiciona con el scroll */}
      <div className="mx-auto max-w-5xl px-6 py-24">
        <EatHubShowcase />
      </div>

      {/* Cierre */}
      <div className="border-t border-white/[0.06] px-6 py-20 text-center">
        <p className="mx-auto max-w-2xl text-2xl font-semibold text-balance text-white sm:text-3xl">
          Construyendo la infraestructura logística del futuro,
          <span className="text-white/35"> un producto a la vez.</span>
        </p>
      </div>
    </div>
  );
}
