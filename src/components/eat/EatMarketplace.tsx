"use client";

import { useState } from "react";
import styles from "@/app/eat/eat.module.css";
import { useEatCart } from "./EatCartContext";

type Dish = {
  id: string;
  name: string;
  restaurant: string;
  time: string;
  price: number;
  badge: string;
  image: string;
};

const DISHES: Dish[] = [
  {
    id: "burger",
    name: "Artisanal Monster Burger",
    restaurant: "Restaurante Traima",
    time: "20 min",
    price: 8.5,
    badge: "⭐ 4.9 · Más Vendido",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "pizza",
    name: "Pizza Margarita Rústica",
    restaurant: "Il Pomodoro",
    time: "25 min",
    price: 11.0,
    badge: "🍕 Tradicional",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "sushi",
    name: "Dragon Roll Especial (10 pcs)",
    restaurant: "Sakura Sushi Lab",
    time: "30 min",
    price: 9.75,
    badge: "🍣 Premium Roll",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "cheesecake",
    name: "Cheesecake de Frutos Rojos",
    restaurant: "Dulce Deleite",
    time: "15 min",
    price: 4.5,
    badge: "🍰 Postre del Día",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "tacos",
    name: "Tacos al Pastor x3 con Guacamole",
    restaurant: "La Taquería Central",
    time: "20 min",
    price: 6.9,
    badge: "🌮 Combo Al Pastor",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
  },
];

function DishCard({ dish }: { dish: Dish }) {
  const { addItem } = useEatCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    addItem({ name: dish.name, restaurant: dish.restaurant, price: dish.price });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1000);
  };

  return (
    <div className={styles.dishCard}>
      <div className={styles.dishImgWrap}>
        {/* eslint-disable-next-line @next/next/no-img-element -- fotos de stock externas (Unsplash), no vale la pena configurar remotePatterns por 5 imágenes decorativas */}
        <img src={dish.image} alt={dish.name} />
        <span className={styles.dishBadge}>{dish.badge}</span>
      </div>
      <div className={styles.dishBody}>
        <div>
          <h3 className={styles.dishName}>{dish.name}</h3>
          <p className={styles.dishRestaurant}>
            {dish.restaurant} · {dish.time}
          </p>
        </div>
        <div className={styles.dishFooter}>
          <div className={styles.dishPrice}>${dish.price.toFixed(2)}</div>
          <button type="button" className={styles.btnAddDish} onClick={handleAdd}>
            {justAdded ? "✓ Agregado" : "+ Agregar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function EatMarketplace() {
  return (
    <section className={styles.sectionSpacing} id="marketplace-carousel">
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <div>
            <span className={styles.secSub}>Marketplace Destacado</span>
            <h2 className={styles.secTitle}>Lo que más se te antoja hoy</h2>
          </div>
          <div style={{ fontSize: "13px", color: "var(--text-dim)" }}>← Desliza para explorar →</div>
        </div>

        <div className={styles.carouselContainer}>
          {DISHES.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      </div>
    </section>
  );
}
