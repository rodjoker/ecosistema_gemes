import Image from "next/image";
import styles from "@/app/eat/eat.module.css";

export function EatHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.heroGrid}>
          <div>
            <div className={styles.pillLive}>
              <span>🛵</span> Entregas directas a tu puerta en minutos
            </div>
            <h1 className={styles.heroTitle}>
              Compra lo que más te guste.
              <br />
              <span>GEMES Express</span> lo lleva hasta tu hogar.
            </h1>
            <p className={styles.heroDesc}>
              Explora las mejores hamburguesas, pizzas, sushi y postres en el marketplace de GEMES Eat. Eliges desde
              tu celular y nuestra flota propia de motorizados te lo entrega fresco y sin demoras.
            </p>

            <div className={styles.heroCtaGroup}>
              <a href="#marketplace-carousel" className={styles.btnMain}>
                Explorar Platos Disponibles ↓
              </a>
              <span style={{ fontSize: "14px", color: "var(--text-dim)" }}>📍 Cobertura activa en Quito</span>
            </div>
          </div>

          <div className={styles.heroImageWrapper}>
            <Image
              src="/eat/hero-phone.jpg"
              alt="Marketplace de GEMES Eat en un celular, con seguimiento de GEMES Express"
              width={900}
              height={933}
              className={styles.phoneShowcase}
              priority
            />
            <div className={styles.deliveryFloatTag}>
              <span>🛵</span>
              <div>
                <h4>Seguimiento en Vivo</h4>
                <p>GEMES Express en camino a tu puerta</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
