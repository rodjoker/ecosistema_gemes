import styles from "@/app/hub/hub.module.css";
import { waLink } from "./whatsapp";

const TRUST_ITEMS = ["✅ Sin compromiso", "✅ Respuesta inmediata", "✅ Configuración en 1 hora"];

const ORDER_STEPS: { label: string; tag: string; tagClass: keyof typeof TAG_CLASS }[] = [
  { label: "Mesa 4 · Hamburguesa Doble × 2", tag: "Cocina (4 min)", tagClass: "kitchen" },
  { label: "Mesa 7 · Cuenta por asiento", tag: "Listo para cobrar", tagClass: "ready" },
  { label: "Delivery #108 · Vía GEMES Express", tag: "🛵 Repartidor en local", tagClass: "dispatch" },
];

const TAG_CLASS = {
  kitchen: styles.tagKitchen,
  ready: styles.tagReady,
  dispatch: styles.tagDispatch,
} as const;

/** Hero de Hub: mensaje de venta a la izquierda + mockup de dashboard "en vivo" a la derecha (datos de ejemplo, no reales). */
export function HubHero() {
  return (
    <section className={styles.hero}>
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div className={styles.heroContent}>
          <div className={`${styles.badge} ${styles.badgePrimary}`}>🚀 Optimizado para Restaurantes en Quito</div>
          <h1>
            Más mesas por hora. Tu propio delivery{" "}
            <span className={styles.highlight}>sin pagar 30% de comisiones.</span>
          </h1>
          <p>
            GEMES-HUB sincroniza comandas y cocina para acelerar tus tiempos de servicio, conectándote en un clic a
            la flota de motorizados de GEMES Express. Factura más tanto en el salón como en la puerta.
          </p>
          <div className={styles.heroActions}>
            <a
              href={waLink("Hola, quiero coordinar una demo para mi restaurante")}
              className={styles.ctaMain}
              target="_blank"
              rel="noopener noreferrer"
            >
              Coordinar Demostración Gratuita ➜
            </a>
            <div className={styles.microTrust}>
              {TRUST_ITEMS.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.heroCard}>
          <div className={styles.statsHeader}>
            <div>
              <span className={styles.liveDot} />
              <strong style={{ fontSize: "0.9rem" }}>Turno Activo: Almuerzos</strong>
            </div>
            <span className={`${styles.badge} ${styles.badgePrimary}`}>En tiempo real</span>
          </div>
          <div className={styles.metricGrid}>
            <div className={styles.metricBox}>
              <div className={styles.label}>Rotación de Mesas</div>
              <div className={`${styles.val} ${styles.positive}`}>+32%</div>
            </div>
            <div className={styles.metricBox}>
              <div className={styles.label}>Comisiones Ahorradas</div>
              <div className={`${styles.val} ${styles.positive}`}>$480/mes</div>
            </div>
          </div>
          <div className={styles.orderPipeline}>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "8px" }}>
              PEDIDOS EN CURSO:
            </div>
            {ORDER_STEPS.map((step) => (
              <div key={step.label} className={styles.orderStep}>
                <span>{step.label}</span>
                <span className={`${styles.statusTag} ${TAG_CLASS[step.tagClass]}`}>{step.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
