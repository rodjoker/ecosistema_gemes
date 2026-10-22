import styles from "@/app/eat/eat.module.css";

const LINKS = [
  { href: "#que-pedir", label: "Qué puedes pedir" },
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#negocios", label: "Únete" },
];

export function EatNavbar() {
  return (
    <header className={styles.header}>
      <div className={`${styles.container} ${styles.navWrap}`}>
        <a href="#inicio" className={styles.brand}>
          GEMES <span className={styles.badgeEat}>EAT</span>
        </a>
        <nav className={styles.navLinks} aria-label="Secciones de GEMES Eat">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <a href="#descargar" className={styles.btnNav}>
          Descargar app
        </a>
      </div>
    </header>
  );
}
