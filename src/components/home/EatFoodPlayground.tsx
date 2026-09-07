"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type FoodKey = "burger" | "pizza" | "can";

type FoodDef = {
  key: FoodKey;
  src: string;
  alt: string;
  width: number;
  height: number;
  initial: { x: number; y: number };
};

const FOODS: FoodDef[] = [
  { key: "burger", src: "/eat/burger.png", alt: "Hamburguesa doble carne", width: 128, height: 89, initial: { x: 10, y: 34 } },
  { key: "pizza", src: "/eat/pizza-slice.png", alt: "Porción de pizza", width: 118, height: 108, initial: { x: 148, y: 138 } },
  { key: "can", src: "/eat/soda-can.png", alt: "Lata Gemes Eat", width: 64, height: 88, initial: { x: 214, y: 8 } },
];

type Pos = Record<FoodKey, { x: number; y: number }>;

const INITIAL_POS = Object.fromEntries(FOODS.map((f) => [f.key, f.initial])) as Pos;

type DragState = { key: FoodKey; startX: number; startY: number; originX: number; originY: number };

/**
 * Reemplaza al campo 3D con formas primitivas (hamburguesa/pizza/vaso
 * genéricos) por las fotos reales sin fondo que pasó el usuario, arrastrables
 * con mouse o dedo dentro de la caja. Al pasar el mouse por encima aparece un
 * globito "¿Lo querés? Te lo llevamos" -- es hover puro (`onMouseEnter`), así
 * que en touch no se ve, pero el arrastre (que sí es táctil, vía Pointer
 * Events) sigue andando igual.
 */
export function EatFoodPlayground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<Pos>(INITIAL_POS);
  const [draggingKey, setDraggingKey] = useState<FoodKey | null>(null);
  const [hoveredKey, setHoveredKey] = useState<FoodKey | null>(null);
  const dragRef = useRef<DragState | null>(null);

  // Si la caja cambia de tamaño (responsive), reacomoda cualquier comida que
  // haya quedado fuera de los límites nuevos.
  useEffect(() => {
    function clampAll() {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setPositions((prev) => {
        const next = { ...prev };
        FOODS.forEach((food) => {
          const maxX = Math.max(0, rect.width - food.width);
          const maxY = Math.max(0, rect.height - food.height);
          next[food.key] = {
            x: Math.min(Math.max(next[food.key].x, 0), maxX),
            y: Math.min(Math.max(next[food.key].y, 0), maxY),
          };
        });
        return next;
      });
    }
    clampAll();
    const resizeObserver = new ResizeObserver(clampAll);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!draggingKey) return;

    function onMove(e: PointerEvent) {
      const drag = dragRef.current;
      const el = containerRef.current;
      if (!drag || !el) return;
      const rect = el.getBoundingClientRect();
      const food = FOODS.find((f) => f.key === drag.key);
      if (!food) return;
      const maxX = Math.max(0, rect.width - food.width);
      const maxY = Math.max(0, rect.height - food.height);
      const nextX = Math.min(Math.max(drag.originX + (e.clientX - drag.startX), 0), maxX);
      const nextY = Math.min(Math.max(drag.originY + (e.clientY - drag.startY), 0), maxY);
      setPositions((prev) => ({ ...prev, [drag.key]: { x: nextX, y: nextY } }));
    }
    function onUp() {
      setDraggingKey(null);
      dragRef.current = null;
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [draggingKey]);

  function handlePointerDown(key: FoodKey) {
    return (e: React.PointerEvent) => {
      e.preventDefault();
      dragRef.current = { key, startX: e.clientX, startY: e.clientY, originX: positions[key].x, originY: positions[key].y };
      setDraggingKey(key);
    };
  }

  return (
    <div className="flex flex-col gap-2">
      <div ref={containerRef} className="relative h-64 w-full touch-none sm:h-72">
        {FOODS.map((food) => {
          const pos = positions[food.key];
          return (
            <div
              key={food.key}
              className="absolute cursor-grab touch-none select-none active:cursor-grabbing"
              style={{ left: pos.x, top: pos.y, width: food.width, height: food.height }}
              onPointerDown={handlePointerDown(food.key)}
              onMouseEnter={() => setHoveredKey(food.key)}
              onMouseLeave={() => setHoveredKey(null)}
            >
              <Image
                src={food.src}
                alt={food.alt}
                width={food.width}
                height={food.height}
                className="h-full w-full object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.5)]"
                draggable={false}
              />
              {hoveredKey === food.key && draggingKey !== food.key && (
                <div className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-lg border border-orange-500/40 bg-[#151b2b] px-3 py-1.5 text-[11px] font-semibold whitespace-nowrap text-white shadow-xl">
                  ¿Lo querés? Te lo llevamos
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="text-center text-xs text-white/30">Arrastrá la comida 👆</p>
    </div>
  );
}
