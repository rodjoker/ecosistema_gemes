import styles from "@/app/eat/eat.module.css";

export function EatFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p style={{ marginBottom: "8px" }}>
          <strong>GEMES EAT</strong> · Parte integral del Ecosistema GEMES
        </p>
        <p style={{ fontSize: "12px" }}>
          Marketplace de restaurantes conectado con la flota urbana de GEMES Express. Quito, Ecuador.
        </p>
      </div>
    </footer>
  );
}
