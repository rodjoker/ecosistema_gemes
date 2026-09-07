import styles from "@/app/hub/hub.module.css";

export function HubFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} ${styles.footerContent}`}>
        <div>GEMES-HUB © 2026 · El sistema de alto rendimiento para gastronomía.</div>
        <div>Quito, Ecuador · Integrado con GEMES Express</div>
      </div>
    </footer>
  );
}
