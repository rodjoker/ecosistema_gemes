"use client";

import { useState } from "react";
import styles from "@/app/eat/eat.module.css";
import { PHONE_STEPS, PhoneFrame } from "./EatPhoneScreens";

// "Aprende a usar la app": 4 pasos; elegir uno cambia la pantalla del celular.
// Solo clic/teclado (sin avance automático) para no mover contenido que el
// usuario está leyendo.
export function EatHowItWorks() {
  const [active, setActive] = useState(0);
  const current = PHONE_STEPS[active];

  return (
    <section id="como-funciona" className={styles.sectionSpacing}>
      <div className={styles.container}>
        <span className={styles.eyebrow}>CÓMO FUNCIONA</span>
        <h2 className={styles.secTitle}>Pedir con GEMES Eat es así de fácil</h2>
        <p className={styles.secLead}>Cuatro pasos desde que abres la app hasta que el pedido llega a tu puerta.</p>

        <div className={styles.howGrid}>
          <ol className={styles.stepList}>
            {PHONE_STEPS.map((step, index) => (
              <li key={step.id}>
                <button
                  type="button"
                  className={`${styles.stepBtn} ${index === active ? styles.stepActive : ""}`}
                  aria-pressed={index === active}
                  onClick={() => setActive(index)}
                >
                  <span className={styles.stepNum}>{index + 1}</span>
                  <span>
                    <strong>{step.title}</strong>
                    <span className={styles.stepText}>{step.text}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <div className={styles.howPhone} aria-live="polite">
            <PhoneFrame label={`Pantalla ilustrativa: ${current.title}`}>
              <div key={current.id} className={styles.screenSwap}>
                <current.Screen />
              </div>
            </PhoneFrame>
            <p className={styles.illustrative}>Pantallas ilustrativas</p>
          </div>
        </div>
      </div>
    </section>
  );
}
