"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "@/app/hub/hub.module.css";

// Escena 3D: el restaurante queda quieto en el centro, el motorizado da
// vueltas alrededor -- literalmente "tu flota, a tu disposición". Todo con
// geometría primitiva (cajas/toros), sin cargar ningún modelo externo.
// Se pausa en un solo frame estático si el visitante prefiere menos
// movimiento (prefers-reduced-motion).
export function HubThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(4.4, 3.6, 5.4);
    camera.lookAt(0, 0.4, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Piso: grilla tenue color cian, como un plano de mapa nocturno.
    const grid = new THREE.GridHelper(9, 18, 0x17e5ff, 0x22203a);
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.35;
    scene.add(grid);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x0e0d16, roughness: 1 });
    const floor = new THREE.Mesh(new THREE.CircleGeometry(4.4, 40), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.01;
    scene.add(floor);

    // Restaurante: bloque + techo + letrero de neón.
    const restaurant = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(1.7, 1.1, 1.4),
      new THREE.MeshStandardMaterial({ color: 0x1c1a29, roughness: 0.7, metalness: 0.1 })
    );
    body.position.y = 0.55;
    restaurant.add(body);

    const sign = new THREE.Mesh(
      new THREE.BoxGeometry(1.1, 0.22, 0.08),
      new THREE.MeshStandardMaterial({ color: 0xff2e9a, emissive: 0xff2e9a, emissiveIntensity: 1.4 })
    );
    sign.position.set(0, 1.28, 0.72);
    restaurant.add(sign);

    const door = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.7, 0.06),
      new THREE.MeshStandardMaterial({ color: 0x090812 })
    );
    door.position.set(0, 0.35, 0.71);
    restaurant.add(door);
    scene.add(restaurant);

    // Motorizado: cuerpo + 2 ruedas + manubrio, en cian.
    const scooter = new THREE.Group();
    const sBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.46, 0.16, 0.2),
      new THREE.MeshStandardMaterial({ color: 0x17e5ff, emissive: 0x17e5ff, emissiveIntensity: 0.5 })
    );
    sBody.position.y = 0.22;
    scooter.add(sBody);
    const wheelGeo = new THREE.TorusGeometry(0.11, 0.045, 8, 16);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x0c0b14 });
    const wheelFront = new THREE.Mesh(wheelGeo, wheelMat);
    wheelFront.position.set(0.2, 0.11, 0);
    scooter.add(wheelFront);
    const wheelBack = wheelFront.clone();
    wheelBack.position.x = -0.2;
    scooter.add(wheelBack);
    const handlebar = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 0.22, 0.05),
      new THREE.MeshStandardMaterial({ color: 0x17e5ff, emissive: 0x17e5ff, emissiveIntensity: 0.5 })
    );
    handlebar.position.set(0.22, 0.36, 0);
    scooter.add(handlebar);
    scene.add(scooter);

    // Luces: ambiente baja + punto magenta fijo en el letrero + punto cian
    // que viaja con el motorizado, simulando su propio brillo nocturno.
    scene.add(new THREE.AmbientLight(0x554466, 0.55));
    const signLight = new THREE.PointLight(0xff2e9a, 6, 6);
    signLight.position.set(0, 1.4, 1.1);
    scene.add(signLight);
    const scooterLight = new THREE.PointLight(0x17e5ff, 4, 4);
    scene.add(scooterLight);
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.35);
    keyLight.position.set(3, 5, 2);
    scene.add(keyLight);

    const radius = 2.7;
    let t = 0;
    let frameId = 0;

    function placeScooter(angle: number) {
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      scooter.position.set(x, 0, z);
      scooter.rotation.y = -angle + Math.PI / 2;
      scooterLight.position.set(x, 0.4, z);
    }

    placeScooter(0);
    renderer.render(scene, camera);

    if (!prefersReduced) {
      const animate = () => {
        frameId = requestAnimationFrame(animate);
        t += 0.006;
        placeScooter(t);
        restaurant.rotation.y = Math.sin(t * 0.3) * 0.04;
        signLight.intensity = 5.4 + Math.sin(t * 4) * 0.8;
        renderer.render(scene, camera);
      };
      animate();
    }

    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      if (prefersReduced) renderer.render(scene, camera);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (frameId) cancelAnimationFrame(frameId);
      renderer.dispose();
      grid.geometry.dispose();
      (grid.material as THREE.Material).dispose();
      floor.geometry.dispose();
      floorMat.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={styles.threeHero} ref={containerRef}>
      <span className={styles.caption}>tu restaurante · tu flota, orbitando</span>
    </div>
  );
}
