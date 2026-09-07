type IconProps = { className?: string };

function UserIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function BagIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="4.5" y="8.5" width="15" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4.5 11.5h15M12 8.5v11" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 8.5V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinTargetIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 21s7-6.4 7-11.5A7 7 0 0 0 5 9.5C5 14.6 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

const QUALITY_POINTS = [
  {
    Icon: UserIcon,
    title: "Riders Capacitados",
    description: "Contamos con prestadores de servicios capacitados y con los mecanismos adecuados para una entrega segura y profesional.",
  },
  {
    Icon: BagIcon,
    title: "Equipamiento Superior",
    description: "Cada rider cuenta con maletas 100% impermeables y con compartimientos adecuados para proteger tus productos.",
  },
  {
    Icon: ClockIcon,
    title: "Respuesta Inmediata",
    description: "Mantenemos una base de riders listos para atender tus solicitudes y realizar cada entrega a tiempo, sin demoras.",
  },
  {
    Icon: PinTargetIcon,
    title: "Monitoreo en Vivo",
    description: "Te ofrecemos seguimiento de cada rider en tiempo real para darte a ti y a tus clientes total visibilidad y tranquilidad.",
  },
];

/** Cuarta sección: calidad/confianza operativa, 4 pilares en columnas iguales. */
export function ExpressQuality() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 xl:px-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Calidad y Confianza en Cada Envío</h2>
        <p className="mt-4 text-white/50">
          Ofrecemos un servicio de calidad superior gracias a nuestro compromiso con la excelencia operativa y la
          seguridad.
        </p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {QUALITY_POINTS.map(({ Icon, title, description }) => (
          <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
            <Icon className="mx-auto h-9 w-9 text-orange-400" />
            <h3 className="mt-4 text-base font-bold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/50">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
