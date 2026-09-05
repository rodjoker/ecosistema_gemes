import styles from "@/app/hub/hub.module.css";

export function HubProblem() {
  return (
    <section>
      <div className={styles.wrap}>
        <div className={styles.sectionHead}>
          <span className={styles.eyebrow}>El problema real</span>
          <h2>Vender en el salón y vender a domicilio nunca fueron el mismo sistema.</h2>
        </div>
        <div className={styles.problemGrid}>
          <div>
            <h3>Un POS no maneja motorizados</h3>
            <p>
              La mayoría de sistemas de punto de venta te ayudan a cobrar — pero cuando el pedido tiene
              que salir por la puerta, quedás llamando a alguien por tu cuenta.
            </p>
          </div>
          <div>
            <h3>Armar tu propia flota es caro</h3>
            <p>
              Contratar, equipar y coordinar motorizados propios tiene un costo fijo que muy pocos
              restaurantes pueden sostener solo para el delivery.
            </p>
          </div>
          <div>
            <h3>GEMES-HUB conecta las dos puntas</h3>
            <p>
              Tu operación completa de restaurante, y la flota de GEMES Express lista para despachar, en
              el mismo sistema — sin planillas ni WhatsApp cruzado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
