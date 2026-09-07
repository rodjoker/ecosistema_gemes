import { WHATSAPP_URL } from "./whatsapp";

const SERVICES = [
  {
    title: "Repartidor Express",
    description:
      "Ideal para envíos bajo demanda. Solicitas un repartidor solo cuando lo necesitas, dependiendo de las solicitudes que recibe tu establecimiento.",
  },
  {
    title: "Repartidor Fijo",
    description:
      "Un repartidor de planta asignado a tu negocio, con monitoreo constante de transacciones para operaciones con alto volumen de pedidos diarios.",
  },
  {
    title: "Corporativos",
    description:
      "Solución logística para la transferencia de mercadería entre tus diferentes locales o bodegas de forma programada y segura.",
  },
  {
    title: "Consolidado",
    description:
      "Optimizamos tu operación retirando pedidos desde varios puntos de venta para consolidarlos en una sola ruta de entrega eficiente.",
  },
  {
    title: "Estrategia de Crecimiento",
    description:
      "Más que un proveedor, somos tu aliado. Te ayudamos a diseñar estrategias logísticas que impulsan directamente el crecimiento de tus ventas.",
  },
];

/**
 * Sección "Soluciones" debajo del hero de Express -- destino del ancla
 * #servicios del botón "Ver Servicios" del hero. Portada de una referencia
 * de diseño con fondo claro; recoloreada al tema oscuro del resto del
 * ecosistema (el mockup original no era representativo del sitio, era un
 * template genérico de otra herramienta).
 */
export function ExpressServices() {
  return (
    <section id="servicios" className="mx-auto max-w-6xl px-6 py-24 xl:px-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Soluciones de Entrega a tu Medida</h2>
        <p className="mt-4 text-white/50">
          Nos adaptamos a las necesidades de tu empresa o establecimiento con servicios flexibles y eficientes.
        </p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <div key={service.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-lg font-bold text-white">{service.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-white/55">{service.description}</p>
          </div>
        ))}

        <div className="rounded-2xl border border-orange-500/40 bg-gradient-to-br from-orange-500/15 to-orange-500/[0.03] p-6">
          <h3 className="text-lg font-bold text-white">¿No estás seguro?</h3>
          <p className="mt-2.5 text-sm leading-relaxed text-white/65">
            Agenda una demo gratuita y nuestro equipo de expertos diseñará un plan a la medida de tus necesidades.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(249,115,22,0.35)] transition-colors hover:bg-orange-400"
          >
            Hablar con un Asesor
          </a>
        </div>
      </div>
    </section>
  );
}
