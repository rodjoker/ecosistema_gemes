import styles from "@/app/hub/hub.module.css";
import { WHATSAPP_URL } from "./whatsapp";

export function HubFinalCta() {
  return (
    <section className={styles.final}>
      <div className={styles.wrap}>
        <h2>¿Hablamos de cómo se vería en tu local?</h2>
        <p>Sin registro automático ni letra chica — coordinamos una demo real, a tu ritmo.</p>
        <div className={styles.actions}>
          <a className={styles.ctaPrimary} href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            Escribir por WhatsApp →
          </a>
        </div>
        <div className={styles.number}>+593 98 859 4710</div>
      </div>
    </section>
  );
}
