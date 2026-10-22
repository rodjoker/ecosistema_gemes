import Image from "next/image";
import { Bike } from "lucide-react";
import styles from "@/app/eat/eat.module.css";
import { StoreButtons } from "./StoreButtons";

export function EatHero() {
  return (
    <section id="inicio" className={styles.hero}>
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <div className={styles.pillLive}>
            <Bike size={16} aria-hidden /> Entregas con GEMES Express
          </div>
          <h1 className={styles.heroTitle}>Tu comida favorita, a un toque de distancia</h1>
          <p className={styles.heroDesc}>
            Descarga la app GEMES Eat, elige tu restaurante y sigue tu pedido en tiempo real hasta tu puerta.
          </p>
          <StoreButtons />
          <p className={styles.heroNote}>📍 Cobertura activa en Quito</p>
        </div>

        <div className={styles.heroVisual}>
          <Image
            src="/eat/hero-phone.jpg"
            alt="La app de GEMES Eat en un celular, con restaurantes cercanos y seguimiento del pedido"
            width={900}
            height={933}
            className={styles.heroPhoto}
            priority
          />
          {/* Comida flotante decorativa: solo transform, se apaga con reduced-motion */}
          <Image src="/eat/burger.png" alt="" width={170} height={124} className={`${styles.floatFood} ${styles.foodBurger}`} aria-hidden />
          <Image src="/eat/pizza-slice.png" alt="" width={130} height={130} className={`${styles.floatFood} ${styles.foodPizza}`} aria-hidden />
          <Image src="/eat/soda-can.png" alt="" width={90} height={150} className={`${styles.floatFood} ${styles.foodSoda}`} aria-hidden />
          <div className={styles.deliveryFloatTag}>
            <Bike size={22} aria-hidden />
            <div>
              <h4>Seguimiento en vivo</h4>
              <p>Tu motorizado en el mapa</p>
            </div>
          </div>
        </div>
      </div>

      <svg className={styles.wave} viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden>
        <path d="M0 40 C 240 100, 480 0, 760 40 S 1240 90, 1440 30 L1440 90 L0 90 Z" />
      </svg>
    </section>
  );
}
