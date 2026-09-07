import styles from "@/app/hub/hub.module.css";
import { waLink } from "./whatsapp";

const NAV_LINKS = [
  { href: "#ventas", label: "¿Por qué usarlo?" },
  { href: "#flota", label: "Flota Integrada" },
  { href: "#calculadora", label: "Calculadora de Ganancia" },
  { href: "#contacto", label: "Contacto" },
];

export function HubNavbar() {
  return (
    <header className={styles.header}>
      <div className={`${styles.container} ${styles.navWrapper}`}>
        <a href="#" className={styles.logoBox}>
          <div className={styles.logoBadge}>
            GEMES<span>-HUB</span>
          </div>
        </a>
        <nav className={styles.navLinks}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href={waLink("Hola, quiero aumentar las ventas de mi restaurante con GEMES-HUB")}
          className={styles.btnNav}
          target="_blank"
          rel="noopener noreferrer"
        >
          Contáctanos →
        </a>
      </div>
    </header>
  );
}
