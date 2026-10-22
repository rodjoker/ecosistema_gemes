import styles from "@/app/eat/eat.module.css";
import { PHONE_STEPS, PhoneFrame } from "./EatPhoneScreens";
import { StoreButtons } from "./StoreButtons";

// Abanico de 3 pantallas ilustrativas (restaurantes, pedido con combo, seguimiento).
const FAN = [PHONE_STEPS[1], PHONE_STEPS[2], PHONE_STEPS[3]];

export function EatDownload() {
  return (
    <section id="descargar" className={styles.downloadSection}>
      <div className={`${styles.container} ${styles.downloadGrid}`}>
        <div className={styles.downloadCopy}>
          <h2>Descárgate la app GEMES Eat</h2>
          <p>Pide lo que quieras y sigue tu pedido en tiempo real desde tu celular.</p>
          <StoreButtons />
        </div>
        <div className={styles.fan} aria-hidden>
          {FAN.map((step, index) => (
            <div key={step.id} className={`${styles.fanPhone} ${styles[`fan${index}` as "fan0" | "fan1" | "fan2"]}`}>
              <PhoneFrame label="">
                <step.Screen />
              </PhoneFrame>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
