"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  key: string;
  name: string;
  restaurant: string;
  price: number;
};

const SHIPPING = 1.5;

const INITIAL_ITEMS: CartItem[] = [
  { key: "initial-burger", name: "Artisanal Monster Burger", restaurant: "Restaurante Traima", price: 8.5 },
  { key: "initial-roll", name: "Dragon Roll Especial (10 pcs)", restaurant: "Sakura Sushi Lab", price: 9.75 },
];

type EatCartValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "key">) => void;
  subtotal: number;
  shipping: number;
  total: number;
};

const EatCartContext = createContext<EatCartValue | null>(null);

/**
 * Carrito de GEMES Eat -- todo en memoria del navegador, sin backend ni
 * persistencia (es una vitrina del producto, no un checkout real; la compra
 * se cierra por WhatsApp, no por este carrito). Cada "+ Agregar" apila una
 * fila nueva, igual que el HTML original -- no fusiona cantidades del mismo
 * plato, a propósito, para no reinventar lógica que el mockup no pedía.
 */
export function EatCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(INITIAL_ITEMS);

  const addItem = (item: Omit<CartItem, "key">) => {
    setItems((prev) => [...prev, { ...item, key: `${item.name}-${prev.length}-${Date.now()}` }]);
  };

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price, 0), [items]);
  const total = subtotal + SHIPPING;

  return (
    <EatCartContext.Provider value={{ items, addItem, subtotal, shipping: SHIPPING, total }}>
      {children}
    </EatCartContext.Provider>
  );
}

export function useEatCart() {
  const ctx = useContext(EatCartContext);
  if (!ctx) throw new Error("useEatCart debe usarse dentro de EatCartProvider");
  return ctx;
}
