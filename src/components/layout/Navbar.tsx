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
// Rediseño 06-sep: header oscuro "enterprise tech" (antes era claro). El
// logo (logo.jpg) tiene fondo blanco sólido horneado en el archivo -- por
// eso va en un chip blanco, no directo sobre el header oscuro (si no, se ve
// como un recorte roto).
export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="w-full sticky top-0 z-50 border-b border-white/[0.06] bg-[#05070c]/90 backdrop-blur-md">
      {/* Desktop / tablet */}
      <div className="hidden items-center justify-between px-6 py-3 md:flex lg:px-10 xl:px-16">
        <Link href="/" className="flex shrink-0 items-center rounded-xl bg-white p-1.5">
          <Image src="/logo.jpg" alt="Ecosistema GEMES" width={140} height={80} className="h-9 w-auto object-contain" priority />
        </Link>

        <nav className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2 py-2">
          {NAV_ITEMS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`rounded-full px-5 py-2 text-[13px] font-medium whitespace-nowrap transition-all duration-200 ${
                isActive(href) ? "bg-[#E53535] text-white shadow-[0_0_16px_rgba(229,53,53,0.4)]" : "text-white/50 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="w-[140px] shrink-0" aria-hidden="true" />
      </div>

      {/* Mobile */}
      <div className="flex items-center justify-between px-4 py-3 md:hidden">
        <Link href="/" className="flex items-center rounded-lg bg-white p-1">
          <Image src="/logo.jpg" alt="Ecosistema GEMES" width={110} height={63} className="h-6 w-auto object-contain" priority />
        </Link>
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="rounded-xl p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {mobileOpen && (
        <div className="mx-4 mb-3 overflow-hidden rounded-2xl border border-white/10 bg-[#0d1017] shadow-lg md:hidden">
          {NAV_ITEMS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`block w-full border-l-2 px-5 py-3.5 text-[14px] font-medium transition-colors ${
                isActive(href)
                  ? "border-[#E53535] bg-[#E53535]/10 text-[#E53535]"
                  : "border-transparent text-white/60 hover:bg-white/5"
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
