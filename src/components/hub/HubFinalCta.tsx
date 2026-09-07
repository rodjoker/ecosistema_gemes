import styles from "@/app/hub/hub.module.css";
import { waLink } from "./whatsapp";

/** id=contacto -- destino del link de nav "Contacto". */
export function HubFinalCta() {
  return (
    <section className={styles.ctaFinal} id="contacto">
      <div className={styles.container}>
        <div className={`${styles.badge} ${styles.badgePrimary}`} style={{ marginBottom: "14px" }}>
          Instalación Ágil
        </div>
        <h2>Empieza a vender más desde este fin de semana</h2>
        <p>
          Cargamos tu menú, configuramos tu salón y conectamos a tus repartidores en menos de 48 horas. Sin
          contratos forzosos ni complicaciones técnicas.
        </p>
        <a
          href={waLink("Hola, quiero coordinar una reunión para ver GEMES-HUB")}
          className={styles.ctaMain}
          target="_blank"
          rel="noopener noreferrer"
        >
          Hablar directamente con un asesor en Quito (+593 98 859 4710)
        </a>
      </div>
    </section>
  );
}
