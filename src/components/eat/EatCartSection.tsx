"use client";

import styles from "@/app/eat/eat.module.css";
import { useEatCart } from "./EatCartContext";
import { waLink } from "./whatsapp";

export function EatCartSection() {
  const { items, subtotal, shipping, total } = useEatCart();

  return (
    <section className={`${styles.sectionSpacing} ${styles.cartSectionWrap}`} id="checkout-section">
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <div>
            <span className={styles.secSub}>Tu Orden en GEMES EAT</span>
            <h2 className={styles.secTitle}>Carrito de Compra</h2>
          </div>
        </div>

        <div className={styles.cartGrid}>
          <div className={styles.cartItemsBox}>
            {items.map((item) => (
              <div key={item.key} className={styles.cartItemRow}>
                <div className={styles.cartItemMeta}>
                  <h4>{item.name}</h4>
                  <p>{item.restaurant}</p>
                </div>
                <span style={{ fontWeight: 700, color: "#34d399" }}>${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className={styles.cartSummaryBox}>
            <h3 style={{ marginBottom: "20px", fontSize: "20px" }}>Resumen del Pedido</h3>
            <div className={styles.summaryLine}>
              <span>Subtotal platos:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.summaryLine}>
              <span>Envío con GEMES Express:</span>
              <span style={{ color: "#34d399", fontWeight: 600 }}>${shipping.toFixed(2)}</span>
            </div>
            <div className={`${styles.summaryLine} ${styles.total}`}>
              <span>Total a pagar:</span>
              <span style={{ color: "#34d399" }}>${total.toFixed(2)}</span>
            </div>

            <div style={{ marginTop: "24px" }}>
              <a
                href={waLink("Hola GEMES EAT! Quiero confirmar mi pedido de comida para entrega con GEMES Express.")}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnMain}
                style={{ width: "100%", justifyContent: "center" }}
              >
                Completar Pedido con GEMES Express ➜
              </a>
              <p style={{ textAlign: "center", fontSize: "12px", color: "var(--text-dim)", marginTop: "10px" }}>
                🛵 Asignación inmediata de motorizado al confirmar
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
