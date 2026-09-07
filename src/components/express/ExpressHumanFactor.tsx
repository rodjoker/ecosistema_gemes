import Image from "next/image";

function AmbassadorIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.5 12.3l2.3 2.3 4.7-4.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Quinta sección: el "factor humano" del servicio -- texto + foto real de un rider entregando. */
export function ExpressHumanFactor() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 xl:px-16">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 font-mono text-[11px] font-semibold tracking-widest text-orange-400 uppercase">
            El Factor Humano
          </span>

          <h2 className="mt-5 text-3xl font-extrabold text-white sm:text-4xl">El Corazón de Gemes Express</h2>

          <p className="mt-5 leading-relaxed text-white/55">
            Somos una familia, donde cada envío representa una promesa de confianza y calidad, nos esforzamos por
            crear conexiones duraderas con nuestros clientes, entendiendo que su éxito y satisfacción son el reflejo
            de nuestro compromiso con un servicio excepcional. Con pasión, responsabilidad y un espíritu innovador,
            estamos convencidos de que juntos podemos transformar la logística en una experiencia positiva y
            confiable, porque para nosotros &ldquo;Más que envíos, creamos conexiones.&rdquo;
          </p>

          <div className="mt-8 flex gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-500/15 text-orange-400">
              <AmbassadorIcon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-bold text-white">Embajadores de tu Marca</h3>
              <p className="mt-1 text-sm text-white/50">
                Entendemos que el repartidor es el único punto de contacto físico con tu cliente. Actuamos como una
                extensión positiva de tu negocio.
              </p>
            </div>
          </div>

          <a
            href="https://gemesexpress.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.06] px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/[0.12]"
          >
            Más información, clic aquí <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10">
          <Image
            src="/express/rider-cliente.jpg"
            alt="Rider de GEMES Express entregando un pedido a un cliente"
            width={500}
            height={314}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
