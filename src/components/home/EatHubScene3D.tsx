"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const EAT_COLOR = 0x2196f3;
const HUB_COLOR = 0xff2e9a;

/**
 * Núcleo compartido de la vitrina Eat/Hub: dos objetos 3D (bolsa de pedido /
 * local comercial), geometría primitiva sin modelos externos -- mismo
 * criterio que HubThreeScene. Solo uno es visible a la vez; `activeIndexRef`
 * (0 = Eat, 1 = Hub) lo controla el scroll (ver EatHubShowcase.tsx vía
 * GSAP ScrollTrigger) y acá se lee cuadro a cuadro para animar la
 * transición (in/out con easing por damping, no un salto brusco).
 */
export function EatHubScene3D({ activeIndexRef }: { activeIndexRef: React.RefObject<number> }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(1.9, 1.15, 3.9);
    camera.lookAt(0, 0.55, 0.15);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const key = new THREE.DirectionalLight(0xffffff, 0.6);
    key.position.set(3, 4, 3);
    scene.add(key);

    // --- Bolsa de pedido (Eat) ---
    const bag = new THREE.Group();
    const bagBody = new THREE.Mesh(
      new THREE.BoxGeometry(1.1, 1.3, 0.6),
      new THREE.MeshStandardMaterial({ color: EAT_COLOR, emissive: EAT_COLOR, emissiveIntensity: 0.25, roughness: 0.5 })
    );
    bagBody.position.y = 0.65;
    bag.add(bagBody);
    const handleMat = new THREE.MeshStandardMaterial({ color: EAT_COLOR, emissive: EAT_COLOR, emissiveIntensity: 0.4 });
    const handleGeo = new THREE.TorusGeometry(0.32, 0.05, 8, 24, Math.PI);
    const handleL = new THREE.Mesh(handleGeo, handleMat);
    handleL.position.set(-0.25, 1.3, 0);
    handleL.rotation.z = Math.PI;
    bag.add(handleL);
    const handleR = handleL.clone();
    handleR.position.x = 0.25;
    bag.add(handleR);
    const check = new THREE.Mesh(
      new THREE.TorusGeometry(0.22, 0.045, 8, 3, Math.PI * 0.6),
      new THREE.MeshStandardMaterial({ color: 0xffffff })
    );
    check.position.set(0, 0.62, 0.31);
    check.rotation.set(0, 0, -0.6);
    bag.add(check);
    scene.add(bag);

    // --- Local comercial (Hub) ---
    const store = new THREE.Group();
    const storeBody = new THREE.Mesh(
      new THREE.BoxGeometry(1.7, 1.1, 1.1),
      new THREE.MeshStandardMaterial({ color: 0x4a4f5c, roughness: 0.6 })
    );
    storeBody.position.y = 0.55;
    store.add(storeBody);
    const awning = new THREE.Mesh(
      new THREE.BoxGeometry(1.9, 0.16, 0.4),
      new THREE.MeshStandardMaterial({ color: HUB_COLOR, emissive: HUB_COLOR, emissiveIntensity: 0.6 })
    );
    awning.position.set(0, 1.02, 0.55);
    store.add(awning);
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.7, 0.06), new THREE.MeshStandardMaterial({ color: 0x090812 }));
    door.position.set(0, 0.35, 0.56);
    store.add(door);
    const windowGeo = new THREE.BoxGeometry(0.3, 0.3, 0.06);
    const windowMat = new THREE.MeshStandardMaterial({ color: HUB_COLOR, emissive: HUB_COLOR, emissiveIntensity: 1 });
    const winL = new THREE.Mesh(windowGeo, windowMat);
    winL.position.set(-0.6, 0.55, 0.56);
    store.add(winL);
    const winR = winL.clone();
    winR.position.x = 0.6;
    store.add(winR);
    scene.add(store);

    const groups = [bag, store];
    groups.forEach((g) => {
      g.scale.setScalar(0.001);
      g.userData.rotY = 0;
    });

    let frameId = 0;
    let t = 0;

    function frame() {
      frameId = requestAnimationFrame(frame);
      t += 0.01;
      const active = activeIndexRef.current;
      groups.forEach((g, idx) => {
        const isActive = idx === active;
        const targetScale = isActive ? 1 : 0.001;
        const damp = prefersReduced ? 1 : 0.09;
        const nextScale = g.scale.x + (targetScale - g.scale.x) * damp;
        g.scale.setScalar(nextScale);
        if (isActive && !prefersReduced) g.rotation.y += 0.006;
      });
      renderer.render(scene, camera);
    }
    frame();

    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
    };
  }, [activeIndexRef]);

  return <div ref={containerRef} className="h-full w-full" />;
}
