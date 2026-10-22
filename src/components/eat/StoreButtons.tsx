import { Smartphone } from "lucide-react";
import styles from "@/app/eat/eat.module.css";
import { STORE_LINKS } from "./storeLinks";
import { waLink } from "./whatsapp";

const STORES = [
  { label: "App Store", lead: "Descárgala en", href: STORE_LINKS.ios },
  { label: "Google Play", lead: "Disponible en", href: STORE_LINKS.android },
];

// Botones de descarga. Si todavía no hay URL de la tienda, el botón se ve
// apagado con "Próximamente" y aparece un enlace para avisar por WhatsApp.
export function StoreButtons() {
  const live = STORES.some((store) => store.href);
  return (
    <div className={styles.storeGroup}>
      <div className={styles.storeRow}>
        {STORES.map((store) =>
          store.href ? (
            <a key={store.label} href={store.href} target="_blank" rel="noopener noreferrer" className={styles.storeBtn}>
              <Smartphone size={22} aria-hidden />
              <span>
                <small>{store.lead}</small>
                {store.label}
              </span>
            </a>
          ) : (
            <span key={store.label} className={`${styles.storeBtn} ${styles.storeSoon}`} aria-disabled="true">
              <Smartphone size={22} aria-hidden />
              <span>
                <small>Próximamente en</small>
                {store.label}
              </span>
            </span>
          ),
        )}
      </div>
      {!live && (
        <a
          href={waLink("Hola, quiero que me avisen cuando la app GEMES Eat esté disponible.")}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.notifyLink}
        >
          Avísame cuando esté disponible →
        </a>
      )}
    </div>
  );
}
