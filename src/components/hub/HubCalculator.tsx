"use client";

import { useState } from "react";
import styles from "@/app/hub/hub.module.css";
import { waLink } from "./whatsapp";

// Comisión estimada que cobran las apps tradicionales (promedio 25%) -- misma
// estimación que traía la calculadora original en JS vanilla.
const COMMISSION_RATE = 0.25;

/** id=calculadora -- simulador de ahorro, reemplaza el `calculateSavings()` en JS vanilla del HTML original por estado de React. */
export function HubCalculator() {
  const [orders, setOrders] = useState(300);
  const [ticket, setTicket] = useState(16);

  const monthlySales = orders * ticket;
  const estimatedLost = Math.round(monthlySales * COMMISSION_RATE);

  return (
    <section className={styles.calculatorSection} id="calculadora">
      <div className={styles.container}>
        <div className={styles.calcContainer}>
          <div className={styles.calcInputs}>
            <div className={`${styles.badge} ${styles.badgePrimary}`} style={{ marginBottom: "12px" }}>
              Simulador de Ahorro
            </div>
            <h3>Descubre cuánto dinero estás regalando en comisiones</h3>
            <p>Ajusta tus números actuales para estimar el margen que recuperarías con el modelo integrado de GEMES-HUB:</p>

            <div className={styles.inputGroup}>
              <label>Pedidos a domicilio al mes:</label>
              <div className={styles.inputRangeWrap}>
                <input
                  type="range"
                  min={50}
                  max={1500}
                  step={25}
                  value={orders}
                  onChange={(e) => setOrders(Number(e.target.value))}
                  className={styles.rangeSlider}
                />
                <div className={styles.rangeValue}>{orders}</div>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Ticket promedio por pedido ($ USD):</label>
              <div className={styles.inputRangeWrap}>
                <input
                  type="range"
                  min={8}
                  max={40}
                  step={1}
                  value={ticket}
                  onChange={(e) => setTicket(Number(e.target.value))}
                  className={styles.rangeSlider}
                />
                <div className={styles.rangeValue}>${ticket}</div>
              </div>
            </div>
          </div>

          <div className={styles.calcResults}>
            <div className={styles.savingsLabel}>Dinero que recuperas para tu restaurante:</div>
            <div className={styles.savingsAmount}>${estimatedLost.toLocaleString("en-US")}</div>
            <div className={styles.subNote}>USD estimados al mes que hoy se quedan en comisiones de terceros.</div>
            <a
              href={waLink("Hola, hice el calculo y quiero recuperar mi margen con GEMES-HUB")}
              className={styles.btnCalcAction}
              target="_blank"
              rel="noopener noreferrer"
            >
              Recuperar este margen ahora ➜
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
