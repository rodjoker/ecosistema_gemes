import type { ReactNode } from "react";
import { Bike, Check, Clock, MapPin, Search, ShoppingBag, Star, Tag } from "lucide-react";
import styles from "@/app/eat/eat.module.css";

// Pantallas ILUSTRATIVAS de la app (no son capturas reales: la app de consumidor
// aún no está publicada). Sirven para enseñar el recorrido de un pedido.

export function PhoneFrame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div className={styles.phone} role="img" aria-label={label}>
      <div className={styles.phoneNotch} />
      <div className={styles.phoneScreen}>{children}</div>
    </div>
  );
}

function LoginScreen() {
  return (
    <div className={styles.scr}>
      <div className={styles.scrLogo}>
        GEMES <span>EAT</span>
      </div>
      <p className={styles.scrTitle}>Crea tu cuenta</p>
      <div className={styles.scrField}>correo@ejemplo.com</div>
      <div className={styles.scrField}>••••••••</div>
      <div className={styles.scrBtn}>Continuar</div>
      <p className={styles.scrHint}>Es gratis y toma un minuto</p>
    </div>
  );
}

function RestaurantsScreen() {
  const places = [
    { name: "Burger House", meta: "Hamburguesas", time: "25 min" },
    { name: "Pizzería Napoli", meta: "Pizza", time: "30 min" },
    { name: "Sushi Go", meta: "Sushi", time: "35 min" },
  ];
  return (
    <div className={styles.scr}>
      <div className={styles.scrSearch}>
        <Search size={14} aria-hidden /> ¿Qué se te antoja?
      </div>
      <p className={styles.scrTitle}>Cerca de ti</p>
      {places.map((place) => (
        <div key={place.name} className={styles.scrPlace}>
          <div className={styles.scrThumb} />
          <div>
            <strong>{place.name}</strong>
            <span>
              {place.meta} · <Star size={11} aria-hidden /> 4.8 · <Clock size={11} aria-hidden /> {place.time}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function OrderScreen() {
  return (
    <div className={styles.scr}>
      <p className={styles.scrTitle}>Burger House</p>
      <div className={styles.scrCombo}>
        <span className={styles.scrBadge}>
          <Tag size={11} aria-hidden /> Combo
        </span>
        <strong>Hamburguesa + papas</strong>
        <div className={styles.scrPrice}>
          <b>$7.00</b>
          <s>$8.00</s>
          <em>-13%</em>
        </div>
      </div>
      <div className={styles.scrPlace}>
        <div className={styles.scrThumb} />
        <div>
          <strong>Pizza personal</strong>
          <span>$5.50</span>
        </div>
      </div>
      <div className={styles.scrBtn}>
        <ShoppingBag size={14} aria-hidden /> Ver pedido · $7.00
      </div>
    </div>
  );
}

function TrackingScreen() {
  return (
    <div className={styles.scr}>
      <p className={styles.scrTitle}>Tu pedido va en camino</p>
      <div className={styles.scrMap}>
        <svg viewBox="0 0 200 110" aria-hidden>
          <path d="M14 92 C 60 92, 70 40, 110 44 S 170 28, 186 22" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="5 5" />
          <circle cx="186" cy="22" r="7" fill="currentColor" />
        </svg>
        <span className={styles.scrRider}>
          <Bike size={16} aria-hidden />
        </span>
      </div>
      <div className={styles.scrEta}>
        <MapPin size={14} aria-hidden /> Llega en 12 min
      </div>
      <div className={styles.scrSteps}>
        <span><Check size={12} aria-hidden /> Confirmado</span>
        <span><Check size={12} aria-hidden /> Preparando</span>
        <span className={styles.scrNow}>En camino</span>
      </div>
    </div>
  );
}

export const PHONE_STEPS = [
  {
    id: "cuenta",
    title: "Descarga y crea tu cuenta",
    text: "Instala GEMES Eat, regístrate con tu correo y listo. Es gratis.",
    Screen: LoginScreen,
  },
  {
    id: "restaurante",
    title: "Elige tu restaurante",
    text: "Explora los negocios cerca de ti. Cada uno muestra sus productos con fotos y precios.",
    Screen: RestaurantsScreen,
  },
  {
    id: "pedido",
    title: "Arma tu pedido",
    text: "Agrega productos o aprovecha los combos: varios productos del mismo restaurante a un precio especial.",
    Screen: OrderScreen,
  },
  {
    id: "seguimiento",
    title: "Sigue tu pedido en vivo",
    text: "Mira en el mapa cómo tu motorizado de GEMES Express llega hasta tu puerta.",
    Screen: TrackingScreen,
  },
] as const;
