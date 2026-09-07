import styles from "@/app/hub/hub.module.css";
import { waLink } from "./whatsapp";

export function HubFloatingWhatsApp() {
  return (
    <a
      href={waLink("Hola, quiero conocer cómo GEMES-HUB aumenta mis ventas")}
      className={styles.floatingWa}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>💬 WhatsApp Demo</span>
    </a>
  );
}
