import styles from "@/app/hub/hub.module.css";

const CARDS = [
  {
    n: "01",
    title: "Nivel de cadena grande, sin equipo técnico",
    body: "Mesas, cocina en tiempo real, inventario y caja integrados — la misma base con la que opera un local grande, lista para un equipo chico.",
  },
  {
    n: "02",
    title: "El aviso que hoy da un mesero a los gritos",
    body: "La cocina avisa sola cuando una mesa está lista. Nadie tiene que estar pendiente ni ir a preguntar.",
  },
  {
    n: "03",
    title: "El motorizado que hoy no tenés cómo pagar",
    body: "Vendés a domicilio con la flota de GEMES Express ya integrada — sin el costo fijo de armar tu propia flota.",
  },
];

export function HubWhy() {
  return (
    <section>
      <div className={styles.wrap}>
        <div className={styles.sectionHead}>
          <span className={styles.eyebrow}>Por qué GEMES-HUB</span>
          <h2>No es una app más — es el personal que hoy no tenés.</h2>
          <p>Cada punto de acá reemplaza una tarea que hoy hace una persona a mano, con errores y tiempo perdido.</p>
        </div>
        <div className={styles.whyGrid}>
          {CARDS.map((c) => (
            <div className={styles.whyCard} key={c.n}>
              <div className={styles.n}>{c.n}</div>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
