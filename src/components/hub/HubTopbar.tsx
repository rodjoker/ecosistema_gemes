import styles from "@/app/hub/hub.module.css";
import { WHATSAPP_URL } from "./whatsapp";

export function HubTopbar() {
  return (
    <div className={styles.topbar}>
      <div className={styles.logo}>
        GEMES<span>-HUB</span>
      </div>
      <a className={styles.ctaSmall} href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
        Hablar por WhatsApp
      </a>
    </div>
  );
}
