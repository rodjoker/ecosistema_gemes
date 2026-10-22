import { Bike, Store } from "lucide-react";
import styles from "@/app/eat/eat.module.css";
import { waLink } from "./whatsapp";

const OPTIONS = [
  {
    Icon: Store,
    title: "Registra tu negocio",
    text: "Vende en GEMES Eat: tus productos y combos llegan a más clientes, con entregas de GEMES Express.",
    cta: "Quiero registrar mi negocio",
    message: "Hola, quiero registrar mi negocio en GEMES Eat.",
  },
  {
    Icon: Bike,
    title: "Hazte repartidor",
    text: "Realiza entregas con GEMES Express y genera ingresos con horarios flexibles.",
    cta: "Quiero ser repartidor",
    message: "Hola, quiero ser repartidor de GEMES Express.",
  },
];

export function EatJoin() {
  return (
    <section id="negocios" className={styles.sectionSpacing}>
      <div className={styles.container}>
        <span className={styles.eyebrow}>ÚNETE</span>
        <h2 className={styles.secTitle}>Colabora con GEMES</h2>
        <div className={styles.joinGrid}>
          {OPTIONS.map(({ Icon, title, text, cta, message }) => (
            <div key={title} className={styles.joinCard}>
              <span className={styles.perkIcon}>
                <Icon size={30} aria-hidden />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
              <a href={waLink(message)} target="_blank" rel="noopener noreferrer" className={styles.btnOutline}>
                {cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
