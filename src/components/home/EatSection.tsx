"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Hamburger, Pizza, CupSoda } from "lucide-react";
import { EatFoodPlayground } from "./EatFoodPlayground";

const ACCENT = "#f97316";

const BURGER = {
  name: "Artisanal Monster Burger",
  restaurant: "Restaurante Traima · 20 min",
  price: "$8.50",
  badge: "⭐ 4.9 · Más Vendido",
  image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
};

// 6 íconos (2 de cada uno) dispersos de forma desprolija -- distinta
// rotación/tamaño/corrimiento cada uno, sin caja ni fondo, para que se vean
// como si estuvieran "tirados" al costado de la foto en vez de alineados en
// una lista prolija.
const SCATTERED_ICONS: { Icon: typeof Hamburger; top: string; x: number; rotate: number; size: string }[] = [
  { Icon: Hamburger, top: "2%", x: -6, rotate: -14, size: "h-6 w-6" },
  { Icon: Pizza, top: "16%", x: 14, rotate: 20, size: "h-7 w-7" },
  { Icon: CupSoda, top: "34%", x: -12, rotate: -8, size: "h-6 w-6" },
  { Icon: Hamburger, top: "52%", x: 10, rotate: 12, size: "h-7 w-7" },
  { Icon: Pizza, top: "70%", x: -8, rotate: -20, size: "h-6 w-6" },
  { Icon: CupSoda, top: "88%", x: 12, rotate: 10, size: "h-7 w-7" },
];

/**
 * Tarjeta del mismo plato destacado que usa el marketplace real de /eat --
 * clic simula agregar al carrito (sin backend, es una vitrina en Inicio, no
 * el carrito real de la app). El contador solo vive en este componente.
 */
function MiniDishCard() {
  const [count, setCount] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    setCount((c) => c + 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1000);
  };

  return (
    <div className="w-full max-w-[240px] overflow-hidden rounded-2xl border border-white/10 bg-[#151b2b] shadow-2xl">
      <div className="relative h-28 w-full">
        {/* eslint-disable-next-line @next/next/no-img-element -- misma foto de stock hotlinkeada que usa la tarjeta real en /eat */}
        <img src={BURGER.image} alt={BURGER.name} className="h-full w-full object-cover" />
        <span className="absolute top-2 left-2 rounded-full border border-orange-500/30 bg-[#0c101c]/85 px-2 py-0.5 text-[10px] font-bold text-orange-400 backdrop-blur-sm">
          {BURGER.badge}
        </span>
        {count > 0 && (
          <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-extrabold text-white">
            {count}
          </span>
        )}
      </div>
      <div className="p-3.5">
        <h4 className="text-sm font-bold text-white">{BURGER.name}</h4>
        <p className="mt-0.5 text-[11px] text-white/40">{BURGER.restaurant}</p>
        <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2.5">
          <span className="text-sm font-extrabold text-emerald-400">{BURGER.price}</span>
          <button
            type="button"
            onClick={handleAdd}
            className="rounded-lg border border-orange-500 bg-orange-500/15 px-2.5 py-1 text-[11px] font-bold text-orange-400 transition-colors hover:bg-orange-500 hover:text-white"
          >
            {justAdded ? "✓ Agregado" : "+ Agregar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function EatSection() {
  return (
    <section className="flex flex-col gap-10 lg:flex-row lg:items-center">
      {/* Íconos + foto -- en ese orden, de izquierda a derecha */}
      <div className="flex items-center justify-center gap-2 lg:shrink-0">
        <div className="relative hidden h-[360px] w-14 shrink-0 sm:block">
          {SCATTERED_ICONS.map(({ Icon, top, x, rotate, size }, i) => (
            <Icon
              key={i}
              className={`absolute text-orange-400/80 ${size}`}
              style={{ top, left: `calc(50% + ${x}px)`, transform: `translateX(-50%) rotate(${rotate}deg)` }}
            />
          ))}
        </div>

        <div className="w-full max-w-[300px]">
          <div
            className="overflow-hidden rounded-3xl border"
            style={{ borderColor: `${ACCENT}33`, boxShadow: `0 0 60px -12px ${ACCENT}55` }}
          >
            <Image
              src="/eat/hero-phone.jpg"
              alt="Marketplace de GEMES Eat en un celular"
              width={900}
              height={933}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Letras y título de la sección */}
      <div className="w-full lg:flex-1">
        <span className="font-mono text-xs font-semibold tracking-widest uppercase" style={{ color: ACCENT }}>
          Consumidor
        </span>
        <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
          GEMES Eat <span className="font-normal text-white/35">— Pedir bien, sin vueltas</span>
        </h2>
        <p className="mt-3 max-w-lg text-white/50">
          La puerta de entrada del cliente final: descubrir restaurantes cerca, armar el pedido y seguirlo hasta que
          llega -- conectado a la misma flota de Express por debajo.
        </p>

        {/* Lista + tarjeta de la hamburguesa lado a lado -- antes la tarjeta
            flotaba encima de la foto del celular y tapaba parte de la mano;
            ahora la foto queda limpia y la tarjeta se ve junto a las
            características. Se apilan hasta xl -- a partir de ahí el
            contenedor ya es lo bastante ancho (xl:max-w-7xl en page.tsx)
            para que entren lado a lado sin apretarse. */}
        <div className="mt-5 flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <ul className="flex flex-col gap-2">
            {["Catálogo de restaurantes cercanos", "Pedido y pago en un mismo flujo", "Seguimiento del pedido en tiempo real"].map(
              (feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-white/70">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: ACCENT }} />
                  {feature}
                </li>
              ),
            )}
          </ul>

          <MiniDishCard />
        </div>

        <Link
          href="/eat"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
          style={{ color: ACCENT }}
        >
          Entrar a Eat
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      {/* Comida arrastrable -- último, a la derecha de todo */}
      <div className="w-full lg:w-[300px] lg:shrink-0">
        <EatFoodPlayground />
      </div>
    </section>
  );
}
