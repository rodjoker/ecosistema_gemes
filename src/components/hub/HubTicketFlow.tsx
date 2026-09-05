"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "@/app/hub/hub.module.css";

// El pedido entra "apilado" (un solo bulto de tickets), el scroll lo abre en
// abanico mostrando Mesa -> Cocina -> Motorizado, y se vuelve a juntar al
// final -- la animación misma cuenta la promesa del producto (3 sistemas
// separados, unidos en uno). Se desactiva en mobile (el layout ahí ya es
// vertical) y respeta prefers-reduced-motion -- en ambos casos queda el
// layout estático de siempre, ya legible sin JS.
export function HubTicketFlow() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const scene = sceneRef.current;
    const flow = flowRef.current;
    const done = doneRef.current;
    if (!scene || !flow || !done) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isNarrow = window.matchMedia("(max-width: 46rem)").matches;
    if (prefersReduced || isNarrow) return;

    gsap.registerPlugin(ScrollTrigger);

    const chips = Array.from(flow.querySelectorAll<HTMLElement>(`.${styles.chip}`));
    const arrows = flow.querySelectorAll<HTMLElement>(`.${styles.flowArrow}`);
    if (chips.length < 3) return;

    let offsets: number[] = [];
    const rotations = [-6, 2, 6];

    function computeOffsets() {
      gsap.set(chips, { x: 0, rotation: 0 });
      const flowRect = flow!.getBoundingClientRect();
      const centerX = flowRect.left + flowRect.width / 2;
      return chips.map((chip) => {
        const r = chip.getBoundingClientRect();
        return centerX - (r.left + r.width / 2);
      });
    }

    offsets = computeOffsets();
    gsap.set(chips, { transformOrigin: "50% 50%" });
    chips.forEach((chip, i) => gsap.set(chip, { x: offsets[i], rotation: rotations[i] }));
    gsap.set(arrows, { opacity: 0 });
    gsap.set(done, { opacity: 0, scale: 0.92 });

    const trigger = ScrollTrigger.create({
      trigger: scene,
      start: "top 65%",
      end: "+=1500",
      pin: true,
      anticipatePin: 1,
      onToggle: (self) => setIsPinned(self.isActive),
      animation: gsap
        .timeline({ defaults: { duration: 1, ease: "power2.inOut" } })
        .to(chips, { x: 0, rotation: 0, stagger: 0.05 }, 0)
        .to(arrows, { opacity: 1, duration: 0.4 }, "-=0.5")
        .to({}, { duration: 0.7 })
        .to(arrows, { opacity: 0, duration: 0.3 })
        .to(
          chips,
          {
            x: (i: number) => offsets[i],
            rotation: (i: number) => rotations[i],
            stagger: 0.05,
          },
          "<"
        )
        .to(done, { opacity: 1, scale: 1, duration: 0.5 }, "-=0.3"),
      scrub: 0.6,
    });

    const handleResize = () => {
      if (window.matchMedia("(max-width: 46rem)").matches) return;
      offsets = computeOffsets();
      chips.forEach((chip, i) => gsap.set(chip, { x: offsets[i], rotation: rotations[i] }));
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      trigger.kill();
    };
  }, []);

  return (
    <div ref={sceneRef} className={`${styles.heroScene} ${isPinned ? styles.isPinned : ""}`}>
      <div ref={flowRef} className={styles.flow}>
        <div className={styles.chip}>
          <div className={styles.k}>Salón · Mesa 4</div>
          <div className={styles.v}>2× Perro Caliente, 1× Cocacola</div>
        </div>
        <div className={styles.flowArrow} />
        <div className={styles.chip}>
          <div className={styles.k}>Cocina</div>
          <div className={`${styles.v} ${styles.pass}`}>Listo — aviso automático</div>
        </div>
        <div className={styles.flowArrow} />
        <div className={styles.chip}>
          <div className={styles.k}>Despacho</div>
          <div className={`${styles.v} ${styles.gemes}`}>🛵 Motorizado de GEMES Express</div>
        </div>
        <div ref={doneRef} className={styles.flowDone}>
          Un pedido. Un sistema.
        </div>
      </div>
    </div>
  );
}
