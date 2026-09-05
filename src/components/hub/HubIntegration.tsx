import styles from "@/app/hub/hub.module.css";

export function HubIntegration() {
  return (
    <section>
      <div className={styles.wrap}>
        <div className={styles.spotlight}>
          <div className={styles.spotlightInner}>
            <div>
              <span className={styles.eyebrow}>La pieza que no tienen los demás</span>
              <h2>Una flota de motorizados real, ya rodando en tu ciudad.</h2>
              <p className={styles.copy}>
                GEMES Express ya tiene motorizados activos repartiendo todos los días en Quito. Con
                GEMES-HUB, tu restaurante se conecta directo a esa misma flota — el pedido pasa de la
                cocina al motorizado sin cambiar de pantalla, sin llamar a nadie, sin contratar un solo
                repartidor.
              </p>
              <span className={styles.badgeGemes}>
                <span className={styles.dotGemes} /> Integración nativa con GEMES Express
              </span>
            </div>
            <div className={styles.fleetCard}>
              <div className={styles.row}>
                <span className={styles.k}>Pedido</span>
                <span className={styles.v}>#4 · Mesa 4</span>
              </div>
              <div className={styles.row}>
                <span className={styles.k}>Cocina</span>
                <span className={`${styles.v} ${styles.pass}`}>Lista</span>
              </div>
              <div className={styles.row}>
                <span className={styles.k}>Flota</span>
                <span className={styles.v}>GEMES Express</span>
              </div>
              <div className={styles.row}>
                <span className={styles.k}>Estado</span>
                <span className={`${styles.v} ${styles.pass}`}>En camino</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
