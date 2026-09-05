import styles from "@/app/hub/hub.module.css";

const STATIONS = [
  {
    tag: "01 · Salón",
    title: "Plano de mesas, tal como está tu local",
    body: "Arrastrá las mesas a su posición real, dividí por pisos o áreas, uní o separá mesas para grupos grandes.",
    detail: "Terraza · Salón principal · Barra",
  },
  {
    tag: "02 · POS",
    title: "Comanda por asiento, sin perder el hilo",
    body: "Cada persona en la mesa con su propio pedido y su propia cuenta. Se puede seguir agregando productos sin reabrir nada, y dividir el cobro por asiento o en partes iguales.",
    detail: "Mesa 4 · Asiento 2 · $8.50",
  },
  {
    tag: "03 · Cocina",
    title: "La pantalla avisa sola cuando la mesa está lista",
    body: "Tickets agrupados por categoría para que el chef lea de un vistazo, y un aviso automático al mesero apenas se termina de preparar todo lo que se pidió.",
    detail: "🔔 Mesa 4 lista para entregar",
  },
  {
    tag: "04 · Inventario",
    title: "Sabé qué te queda antes de que se acabe",
    body: "Cada plato con su receta real — el stock baja solo al vender, y te avisa cuando un insumo está por agotarse.",
    detail: "Pan de hamburguesa · stock bajo",
  },
  {
    tag: "05 · Caja",
    title: "Turnos, cierre y control, sin planillas sueltas",
    body: "Varias cajas abiertas a la vez si tenés más de un cajero, cierre ciego al final del turno, y PIN para anulaciones o descuentos.",
    detail: "Caja 1 · diferencia $0.00",
  },
  {
    tag: "06 · Personal",
    title: "Hasta el mesero nuevo puede explicar el menú",
    body: "Reloj de marcación con PIN, roles por estación de cocina, y una descripción de cada plato para que cualquiera pueda responder sin memorizarse el menú entero.",
    detail: '"¿Qué lleva? Pan, salchicha, mostaza, cebolla caramelizada."',
  },
];

export function HubStations() {
  return (
    <section className={styles.stations}>
      <div className={styles.wrap}>
        <div className={styles.sectionHead}>
          <span className={styles.eyebrow}>Tu operación, estación por estación</span>
          <h2>Todo lo que ya usás en el local, en un solo lugar.</h2>
          <p>
            Seis módulos reales, pensados en el orden en que se mueve un pedido — desde que se sienta el
            cliente hasta que se cierra la caja.
          </p>
        </div>

        <div className={styles.rail}>
          {STATIONS.map((s) => (
            <div className={styles.station} key={s.tag}>
              <span className={styles.tag}>{s.tag}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <span className={styles.detail}>{s.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
