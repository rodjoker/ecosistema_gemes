import styles from "@/app/eat/eat.module.css";

const STEPS = [
  {
    number: "01 · GEMES EAT",
    title: "Tú eliges y compras",
    description: "Pides lo que más te guste desde tu teléfono móvil. Menús interactivos y actualizados con disponibilidad real.",
    accent: false,
  },
  {
    number: "02 · GEMES HUB",
    title: "El local cocina sin demoras",
    description:
      "El restaurante recibe tu comanda directamente en su cocina y avisa al sistema exactamente cuando tu plato está recién empacado.",
    accent: false,
  },
  {
    number: "03 · GEMES EXPRESS",
    title: "Hasta la puerta de tu casa",
    description: "Un motorizado de GEMES Express retira el pedido caliente y te lo entrega en mano con rastreo en vivo de ruta.",
    accent: true,
  },
];

export function EatEcosystem() {
  return (
    <section className={styles.sectionSpacing}>
      <div className={styles.container}>
        <div className={styles.ecosystemBanner}>
          <span className={styles.secSub} style={{ color: "#34d399" }}>
            EL PODER DEL ECOSISTEMA GEMES
          </span>
          <h2 className={styles.secTitle} style={{ marginTop: "8px" }}>
            De la cocina del restaurante a la puerta de tu hogar.
          </h2>
          <p style={{ color: "var(--text-dim)", maxWidth: "700px", marginTop: "14px", fontSize: "16px" }}>
            GEMES Eat no es solo una aplicación de comida: forma parte de un ecosistema interconectado. Los
            restaurantes gestionan tu orden desde <strong>GEMES-HUB</strong> y nuestra flota oficial de{" "}
            <strong>GEMES Express</strong> se encarga del traslado directo.
          </p>

          <div className={styles.ecosystemGrid}>
            {STEPS.map((step) => (
              <div
                key={step.number}
                className={styles.ecoStepCard}
                style={step.accent ? { borderColor: "rgba(16, 185, 129, 0.4)" } : undefined}
              >
                <span className={styles.ecoStepNumber} style={step.accent ? { color: "#34d399" } : undefined}>
                  {step.number}
                </span>
                <h3 className={styles.ecoStepTitle}>{step.title}</h3>
                <p className={styles.ecoStepDesc}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
