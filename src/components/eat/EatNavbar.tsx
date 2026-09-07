"use client";

import styles from "@/app/eat/eat.module.css";
import { useEatCart } from "./EatCartContext";

export function EatNavbar() {
  const { items } = useEatCart();

  return (
    <header className={styles.header}>
      <div className={`${styles.container} ${styles.navWrap}`}>
        <a href="#" className={styles.brand}>
          GEMES <span className={styles.badgeEat}>EAT</span>
        </a>
        <div>
          <a href="#checkout-section" className={styles.btnCartNav}>
            <span>🛒 Mi Carrito</span>
            <span className={styles.cartCount}>{items.length}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
