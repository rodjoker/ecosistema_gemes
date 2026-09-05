"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Inicio", href: "/" },
  { label: "Express", href: "/express" },
  { label: "Eat", href: "/eat" },
  { label: "Hub", href: "/hub" },
];

const MenuIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
);
const CloseIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

// Menú persistente del ecosistema -- vive en el layout raíz, así que nunca
// desaparece sin importar qué pestaña (Inicio/Express/Eat/Hub) esté activa.
// Mismo lenguaje visual que el navbar de GEMES backoffice: header claro
// sticky, logo flotante a la izquierda, pastilla blanca centrada con las
// pestañas, activa resaltada en rojo GEMES.
export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="w-full sticky top-0 z-50 bg-[#F0F2F5]">
      {/* Desktop / tablet */}
      <div className="hidden md:flex items-center justify-between px-6 lg:px-10 xl:px-16 py-3">
        <Link href="/" className="flex items-center shrink-0">
          <Image src="/logo.jpg" alt="Ecosistema GEMES" width={160} height={92} className="h-14 w-auto object-contain" priority />
        </Link>

        <nav className="bg-white rounded-full shadow-sm border border-gray-100 px-2 py-2 flex items-center gap-1">
          {NAV_ITEMS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`px-5 py-2 rounded-full text-[13px] font-medium transition-all duration-200 whitespace-nowrap ${
                isActive(href) ? "bg-[#E53535] text-white shadow-sm" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="shrink-0 w-[160px]" aria-hidden="true" />
      </div>

      {/* Mobile */}
      <div className="md:hidden flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center">
          <Image src="/logo.jpg" alt="Ecosistema GEMES" width={120} height={69} className="h-8 w-auto object-contain" priority />
        </Link>
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="p-2 rounded-xl text-gray-500 hover:bg-gray-200 transition-colors"
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden mx-4 mb-3 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          {NAV_ITEMS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`block w-full px-5 py-3.5 text-[14px] font-medium transition-colors border-l-4 ${
                isActive(href)
                  ? "bg-[#FFF1F1] text-[#E53535] border-[#E53535]"
                  : "text-gray-600 hover:bg-gray-50 border-transparent"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
