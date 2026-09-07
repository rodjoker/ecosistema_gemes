type IconProps = { className?: string };

function AlertCircleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.5v5.5M12 16.2v.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CheckCircleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 12.3l2.5 2.5L16 9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const WITHOUT_EXPRESS = [
  {
    title: "Ventas limitadas a tu alcance físico.",
    description: "Pierdes clientes que no pueden o no quieren desplazarse.",
  },
  {
    title: "Clientes insatisfechos por demoras.",
    description: "Una mala experiencia de entrega daña tu reputación y aleja a los clientes.",
  },
  {
    title: "Poca visibilidad de marca.",
    description: "Tu negocio no llega a nuevos públicos y se estanca en el mercado local.",
  },
];

const WITH_EXPRESS = [
  {
    title: "Crecimiento y Mayor Alcance.",
    description: "Llega a un mayor número de clientes y aumenta tus ventas considerablemente.",
  },
  {
    title: "Satisfacción y Fidelización.",
    description: "Un servicio de entrega responsable y a tiempo genera clientes fieles que te recomiendan.",
  },
  {
    title: "Visibilidad y Posicionamiento.",
    description: "Un buen servicio de delivery posiciona tu marca en la mente del consumidor.",
  },
];

/**
 * Comparativa "sin/con Express" -- tercera sección de la página. Portada de
 * una referencia de diseño con fondo claro y semántica de color naranja
 * (problema) / verde (solución); se mantuvo esa semántica de color al
 * pasarla al tema oscuro del sitio porque es significativa (no decorativa),
 * y el verde ya es el color de "estado positivo" usado en el hero de Inicio.
 */
export function ExpressBenefits() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 xl:px-16">
      <h2 className="text-center text-3xl font-extrabold text-white sm:text-4xl">Beneficios que Impulsan tu Negocio</h2>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-orange-500/25 bg-orange-500/[0.04] p-7">
          <div className="flex items-center gap-2.5 text-orange-400">
            <AlertCircleIcon className="h-5 w-5" />
            <h3 className="text-lg font-bold">Sin Gemes Express</h3>
          </div>
          <ul className="mt-6 flex flex-col gap-5">
            {WITHOUT_EXPRESS.map((item) => (
              <li key={item.title} className="flex gap-3">
                <span className="mt-0.5 shrink-0 text-lg leading-none font-bold text-orange-400">×</span>
                <div>
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-white/50">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-green-500/25 bg-green-500/[0.04] p-7">
          <div className="flex items-center gap-2.5 text-green-400">
            <CheckCircleIcon className="h-5 w-5" />
            <h3 className="text-lg font-bold">Con Gemes Express</h3>
          </div>
          <ul className="mt-6 flex flex-col gap-5">
            {WITH_EXPRESS.map((item) => (
              <li key={item.title} className="flex gap-3">
                <span className="mt-0.5 shrink-0 text-lg leading-none font-bold text-green-400">✓</span>
                <div>
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-white/50">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
