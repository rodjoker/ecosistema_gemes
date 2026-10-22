import { MapPin, Tag, Zap } from "lucide-react";
import styles from "@/app/eat/eat.module.css";

const PERKS = [
  {
    Icon: Zap,
    title: "Entrega rápida",
    before: "Tu pedido sale del restaurante y llega ",
    mark: "en minutos",
    after: " con la flota propia de GEMES Express.",
  },
  {
    Icon: Tag,
    title: "Combos y ofertas",
    before: "Varios productos del mismo restaurante ",
    mark: "a un precio especial",
    after: ", con el ahorro a la vista.",
  },
  {
    Icon: MapPin,
    title: "Seguimiento en vivo",
    before: "Mira ",
    mark: "dónde va tu pedido",
    after: " en el mapa, desde que sale hasta tu puerta.",
  },
];

export function EatPerks() {
  return (
    <section className={`${styles.sectionSpacing} ${styles.perksSection}`}>
      <div className={styles.container}>
        <div className={styles.perksGrid}>
          {PERKS.map(({ Icon, title, before, mark, after }) => (
            <div key={title} className={styles.perk}>
              <span className={styles.perkIcon}>
                <Icon size={34} aria-hidden />
              </span>
              <h3>{title}</h3>
              <p>
                {before}
                <mark className={styles.marker}>{mark}</mark>
                {after}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
