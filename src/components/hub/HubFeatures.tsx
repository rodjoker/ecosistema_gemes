import styles from "@/app/hub/hub.module.css";

const FEATURES = [
  {
    tag: "Palanca 01 · Salón",
    title: "Gira más mesas en horas punta",
    description:
      "El cliente pide, la comanda entra por estación a cocina y el mesero recibe un aviso al instante cuando el pedido está listo. Menos esperas = más clientes por turno.",
    impact: "📈 Impacto: Hasta 1 rotación adicional por mesa cada fin de semana.",
  },
  {
    tag: "Palanca 02 · Despacho",
    title: "Delivery rentable sin intermediarios",
    description:
      "Vende a domicilio por canales directos (WhatsApp o web) y envía al motorizado de GEMES Express con un solo toque, sin coordinar por llamadas ni pagar comisiones usureras.",
    impact: "💰 Impacto: Ahorras entre $300 y $900 al mes en comisiones.",
  },
  {
    tag: "Palanca 03 · Control",
    title: "Cero fugas y cobros por asiento",
    description:
      "Cuentas separadas en segundos para grupos grandes sin discusiones ni colas en caja. Control de stock por receta para saber exactamente cuánto rinde cada plato.",
    impact: "🔒 Impacto: Cuadres de caja al centavo y cero mermas sorpresa.",
  },
];

export function HubFeatures() {
  return (
    <section className={styles.featuresSection}>
      <div className={styles.container}>
        <div className={styles.sectionTitleCenter}>
          <h2>3 formas en las que GEMES-HUB aumenta tu caja diaria</h2>
          <p>No es solo ordenar tu local; es generar más ingresos con los mismos recursos.</p>
        </div>

        <div className={styles.featuresGrid}>
          {FEATURES.map((feature) => (
            <div key={feature.tag} className={styles.featureBox}>
              <div>
                <div className={styles.featureTagTop}>{feature.tag}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
              <div className={styles.impactPill}>{feature.impact}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
