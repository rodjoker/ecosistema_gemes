import styles from "@/app/hub/hub.module.css";

const WITHOUT_HUB = [
  {
    title: "Comisiones del 25% al 35%:",
    description: "Las apps tradicionales se quedan con la ganancia neta de tus platos a domicilio.",
  },
  {
    title: "Mesas trabadas por demoras:",
    description: "Camareros gritando en cocina, cuentas mal divididas y 15 minutos perdidos por mesa.",
  },
  {
    title: "Falta de motorizados propios:",
    description: "Cancelas pedidos por WhatsApp cuando llueve o se enferma tu repartidor.",
  },
  {
    title: "Fugas de inventario:",
    description: "Platos que se agotan a mitad de servicio sin que nadie avise a tiempo.",
  },
];

const WITH_HUB = [
  {
    title: "Delivery con 100% de tu margen:",
    description: "Despacha con la flota de GEMES Express integrada sin pagar porcentajes abusivos.",
  },
  {
    title: "Rotación 30% más rápida:",
    description: "Pantallas de cocina KDS y división de cuentas por asiento al instante. Más clientes atendidos.",
  },
  {
    title: "Motorizados siempre disponibles:",
    description: "Flota activa en Quito lista para recibir pedidos en 1 clic desde tu pantalla.",
  },
  {
    title: "Control estricto de recetas:",
    description: "Descuento automático de stock con cada venta. Cero platos devueltos ni mermas ocultas.",
  },
];

/** Comparativa "sin/con Hub" -- id=ventas, destino del link de nav "¿Por qué usarlo?". */
export function HubComparison() {
  return (
    <section className={styles.comparisonSection} id="ventas">
      <div className={styles.container}>
        <div className={styles.sectionTitleCenter}>
          <div className={`${styles.badge} ${styles.badgeWarning}`} style={{ marginBottom: "12px" }}>
            El Negocio Real
          </div>
          <h2>¿Cuánto dinero pierde tu restaurante cada fin de semana?</h2>
          <p>
            Tener un restaurante lleno no garantiza ganancias si los tiempos de espera y las comisiones se comen tus
            márgenes.
          </p>
        </div>

        <div className={styles.contrastGrid}>
          <div className={`${styles.contrastCard} ${styles.cardProblem}`}>
            <h3>
              <span className={styles.iconFail}>✕</span> Sin GEMES-HUB
            </h3>
            <ul className={styles.contrastList}>
              {WITHOUT_HUB.map((item) => (
                <li key={item.title}>
                  <span className={styles.iconFail}>•</span>
                  <div>
                    <strong>{item.title}</strong> {item.description}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${styles.contrastCard} ${styles.cardSolution}`}>
            <h3>
              <span className={styles.iconWin}>✓</span> Con GEMES-HUB
            </h3>
            <ul className={styles.contrastList}>
              {WITH_HUB.map((item) => (
                <li key={item.title}>
                  <span className={styles.iconWin}>•</span>
                  <div>
                    <strong>{item.title}</strong> {item.description}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
