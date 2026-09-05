import styles from "@/app/hub/hub.module.css";
import { HubWizard } from "./HubWizard";

export function HubWizardSection() {
  return (
    <section>
      <div className={styles.wrap}>
        <div className={styles.sectionHead}>
          <span className={styles.eyebrow}>¿Te conviene?</span>
          <h2>Contestá 3 preguntas sobre tu local.</h2>
          <p>Sin registrarte — al final armamos el mensaje de WhatsApp con tu situación real, listo para mandar.</p>
        </div>
        <HubWizard />
      </div>
    </section>
  );
}
