import Link from "next/link";

const APPS = [
  {
    name: "Express",
    href: "/express",
    desc: "Flota de motorizados y logística de delivery en tiempo real.",
    accent: "#E53535",
  },
  {
    name: "Eat",
    href: "/eat",
    desc: "La cara al consumidor del ecosistema: pedidos y descubrimiento de restaurantes.",
    accent: "#2196f3",
  },
  {
    name: "Hub",
    href: "/hub",
    desc: "El sistema completo de restaurante -- mesas, cocina, caja e inventario.",
    accent: "#FF2E9A",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <span className="text-xs font-semibold uppercase tracking-widest text-[#E53535]">
        Ecosistema GEMES
      </span>
      <h1 className="mt-3 text-4xl font-bold text-gray-900 sm:text-5xl">
        Todo lo que mueve un pedido, en un solo lugar.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-gray-500">
        Tres productos, un mismo ecosistema: la flota que reparte, la app que pide, y el sistema que
        hace funcionar el restaurante por dentro.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {APPS.map((app) => (
          <Link
            key={app.href}
            href={app.href}
            className="group flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <span
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white"
              style={{ backgroundColor: app.accent }}
            >
              {app.name.charAt(0)}
            </span>
            <span className="text-lg font-semibold text-gray-900">GEMES {app.name}</span>
            <span className="text-sm text-gray-500">{app.desc}</span>
            <span className="mt-1 text-sm font-medium text-gray-400 group-hover:text-gray-700">
              Entrar →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
