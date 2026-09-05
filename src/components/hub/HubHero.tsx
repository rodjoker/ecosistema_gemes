import styles from "@/app/hub/hub.module.css";
import { WHATSAPP_URL } from "./whatsapp";
import { HubThreeScene } from "./HubThreeScene";
import { HubTicketFlow } from "./HubTicketFlow";

export function HubHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.wrap}>
        <span className={styles.eyebrow}>Para restaurantes, dark kitchens y cafeterías</span>
        <h1>
          Expandí tu restaurante a domicilio, <span className={styles.gradText}>en una sola app.</span>
        </h1>
        <p className={styles.lede}>
          GEMES-HUB es el sistema completo para tu local — mesas, cocina, caja e inventario — con la
          flota de motorizados de GEMES Express integrada de fábrica. Vendé a domicilio sin armar tu
          propia flota.
        </p>
        <div className={styles.actions}>
          <a className={styles.ctaPrimary} href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            Coordinar una demo por WhatsApp →
          </a>
          <span className={styles.ctaNote}>+593 98 859 4710 · te contestamos nosotros, no un bot</span>
        </div>

        <HubThreeScene />
        <HubTicketFlow />
      </div>
    </section>
  );
}
