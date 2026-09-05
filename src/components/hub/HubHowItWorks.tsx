import styles from "@/app/hub/hub.module.css";

const STEPS = [
  { num: "01", title: "Se toma la comanda", body: "En salón, para llevar o delivery — el mismo sistema para los tres canales." },
  { num: "02", title: "Cocina prepara y avisa", body: "Ticket agrupado por categoría, y aviso automático apenas está todo listo." },
  { num: "03", title: "Se despacha con GEMES Express", body: "Si es delivery, el motorizado sale de la flota ya integrada — sin coordinación extra." },
  { num: "04", title: "Se cobra y se cierra solo", body: "La caja registra el pago y el inventario descuenta la receta automáticamente." },
];

export function HubHowItWorks() {
  return (
    <section>
      <div className={styles.wrap}>
        <div className={styles.sectionHead}>
          <span className={styles.eyebrow}>De la mesa a la puerta</span>
          <h2>Así se mueve un pedido, de punta a punta.</h2>
        </div>
        <div className={styles.steps}>
          {STEPS.map((s) => (
            <div className={styles.step} key={s.num}>
              <span className={styles.num}>{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
