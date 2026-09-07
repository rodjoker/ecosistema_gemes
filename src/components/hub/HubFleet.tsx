import styles from "@/app/hub/hub.module.css";
import { waLink } from "./whatsapp";

const RIDERS = [
  { name: "Carlos M. (GEMES Express)", meta: "A 3 minutos de tu local · 98 entregas este mes" },
  { name: "David S. (GEMES Express)", meta: "En ruta norte · 4.9 ★ de satisfacción" },
];

/** id=flota -- destino del link de nav "Flota Integrada". */
export function HubFleet() {
  return (
    <section className={styles.fleetBanner} id="flota">
      <div className={`${styles.container} ${styles.fleetLayout}`}>
        <div className={styles.fleetText}>
          <div className={styles.fleetBadgeCity}>📍 Flota activa en Quito, Ecuador</div>
          <h2>El único sistema con motorizados reales listos para tu local</h2>
          <p>
            Los sistemas comunes te cobran por un software de pantalla y te dejan solo a la hora de enviar el
            pedido. Con GEMES-HUB, tu cocina se conecta de fábrica con <strong>GEMES Express</strong>: el pedido sale
            de cocina directo a la mochila del repartidor más cercano.
          </p>
          <a
            href={waLink("Hola, quiero activar la flota de GEMES Express en mi restaurante")}
            className={styles.ctaMain}
            style={{ padding: "14px 28px", fontSize: "1rem" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Probar con la Flota en Quito ➜
          </a>
        </div>

        <div className={styles.fleetCardPreview}>
          <div style={{ fontWeight: 700, marginBottom: "16px", fontSize: "0.95rem" }}>Repartidores en tu zona:</div>
          {RIDERS.map((rider) => (
            <div key={rider.name} className={styles.riderCard}>
              <div className={styles.riderIcon}>🛵</div>
              <div className={styles.riderInfo}>
                <div className={styles.riderName}>{rider.name}</div>
                <div className={styles.riderMeta}>{rider.meta}</div>
              </div>
              <span className={`${styles.statusTag} ${styles.tagReady}`}>Disponible</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
