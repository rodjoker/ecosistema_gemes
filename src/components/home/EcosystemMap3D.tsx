"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

type CycleFilter = "all" | "cycle1" | "cycle2" | "cycle3";
type NodeType = "express" | "eats" | "hub" | "home";

type NodeDef = {
  key: string;
  pos: [number, number, number];
  title: string;
  type: NodeType;
};

const NODE_LIST: NodeDef[] = [
  { key: "gemesExpress", pos: [0, 0, 0], title: "Gemes Express", type: "express" },
  { key: "gemesEats", pos: [26, 0, -24], title: "Gemes Eats", type: "eats" },
  { key: "gemesHub", pos: [-26, 0, -24], title: "Gemes Hub", type: "hub" },
  { key: "hogar1", pos: [25, 0, 25], title: "Hogar 1", type: "home" },
  { key: "hogar2", pos: [0, 0, 28], title: "Hogar 2", type: "home" },
  { key: "hogar3", pos: [-25, 0, 25], title: "Hogar 3", type: "home" },
];

type FlowDef = {
  cycle: Exclude<CycleFilter, "all">;
  from: string;
  to: string;
  height: number;
  curveOffset: number;
};

// Ciclo 1: Hogar 1 compra en Eats -> Eats despacha por Express -> Express entrega.
// Ciclo 2: Hogar 2 <-> Express, envío directo de paquetería (ida y vuelta).
// Ciclo 3: Hogar 3 pide a Hub -> Hub despacha por Express -> Express entrega;
//          además Hub vende también a través de Eats (marketplace).
const FLOW_PATHS: FlowDef[] = [
  { cycle: "cycle1", from: "hogar1", to: "gemesEats", height: 7, curveOffset: 6 },
  { cycle: "cycle1", from: "gemesEats", to: "gemesExpress", height: 5, curveOffset: -2 },
  { cycle: "cycle1", from: "gemesExpress", to: "hogar1", height: 4.5, curveOffset: 2 },
  { cycle: "cycle2", from: "hogar2", to: "gemesExpress", height: 4, curveOffset: -3 },
  { cycle: "cycle2", from: "gemesExpress", to: "hogar2", height: 5.5, curveOffset: 3 },
  { cycle: "cycle3", from: "hogar3", to: "gemesHub", height: 7, curveOffset: -6 },
  { cycle: "cycle3", from: "gemesHub", to: "gemesExpress", height: 5, curveOffset: 2 },
  { cycle: "cycle3", from: "gemesExpress", to: "hogar3", height: 4.5, curveOffset: -2 },
  { cycle: "cycle3", from: "gemesHub", to: "gemesEats", height: 8, curveOffset: -6 },
];

const TYPE_STYLE: Record<NodeType, { bg: string; border: string; text: string; dot: string }> = {
  express: { bg: "rgba(245,158,11,0.2)", border: "#f59e0b", text: "#fef3c7", dot: "#f59e0b" },
  eats: { bg: "rgba(16,185,129,0.2)", border: "#10b981", text: "#d1fae5", dot: "#10b981" },
  hub: { bg: "rgba(59,130,246,0.2)", border: "#3b82f6", text: "#dbeafe", dot: "#3b82f6" },
  home: { bg: "rgba(236,72,153,0.2)", border: "#ec4899", text: "#fce7f3", dot: "#ec4899" },
};

const FLOW_COLOR = 0xff6600;

const CYCLE_BUTTONS: { id: CycleFilter; label: string }[] = [
  { id: "all", label: "Todos los flujos" },
  { id: "cycle1", label: "Ciclo 1: Eats" },
  { id: "cycle2", label: "Ciclo 2: Express" },
  { id: "cycle3", label: "Ciclo 3: Hub" },
];

const CYCLE_DESCRIPTIONS: Record<CycleFilter, string> = {
  all: "Ecosistema completo: compra en el marketplace (Eats), logística bajo demanda (Express) y pedidos a restaurantes conectados (Hub).",
  cycle1: "El cliente (Hogar 1) compra comida en Gemes Eats. La plataforma despacha la orden a través de Gemes Express, que la entrega en el Hogar 1.",
  cycle2: "Conexión directa y bidireccional entre el Hogar 2 y Gemes Express para envíos de paquetería (recogida y entrega).",
  cycle3: "El cliente pide al restaurante (Gemes Hub). Hub coordina con Express la entrega al Hogar 3, y además vende sus productos a través de Gemes Eats.",
};

const LEGEND_ITEMS: { label: string; sub: string; color: string }[] = [
  { label: "Gemes Express", sub: "Centro logístico", color: TYPE_STYLE.express.dot },
  { label: "Gemes Eats", sub: "Marketplace comida", color: TYPE_STYLE.eats.dot },
  { label: "Gemes Hub", sub: "Restaurante / gestión", color: TYPE_STYLE.hub.dot },
  { label: "Hogares", sub: "Clientes 1, 2 y 3", color: TYPE_STYLE.home.dot },
  { label: "Líneas naranjas", sub: "Flujo / envíos", color: "#ff6600" },
];

type FlowRuntime = {
  cycle: Exclude<CycleFilter, "all">;
  curve: THREE.QuadraticBezierCurve3;
  line: THREE.Line;
  arrow: THREE.ArrowHelper;
  particles: { mesh: THREE.Mesh; progress: number }[];
};

/**
 * Ciudad 3D del ecosistema GEMES: edificios de geometría primitiva (Express,
 * Eats, Hub, hogares) conectados por líneas de flujo animadas, con
 * OrbitControls para rotar/zoom y un filtro por ciclo de pedido. Portado del
 * HTML/three.js vanilla original (`ecosistema_gemes_3d.html`) a un componente
 * contenido dentro de la página (no full-viewport como el original).
 *
 * Mismo criterio que el resto de escenas 3D del proyecto: la escena vive en
 * un solo `useEffect` imperativo (crear, animar, limpiar), y las etiquetas
 * HTML se posicionan a mano cuadro a cuadro -- nunca de forma declarativa vía
 * estado de React (misma lección aprendida con los mapas de GEMES).
 */
export function EcosystemMap3D() {
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const flowsRef = useRef<FlowRuntime[]>([]);
  const [cycle, setCycle] = useState<CycleFilter>("all");

  useEffect(() => {
    flowsRef.current.forEach((flow) => {
      const visible = cycle === "all" || flow.cycle === cycle;
      flow.line.visible = visible;
      flow.arrow.visible = visible;
      flow.particles.forEach((p) => (p.mesh.visible = visible));
    });
  }, [cycle]);

  useEffect(() => {
    const host = canvasHostRef.current;
    if (!host) return;

    // El encuadre (0, 55, 65) + densidad de niebla 0.015 está calibrado para
    // una caja ancha (aspect ~1.6). En mobile la caja es angosta y alta --
    // con esa misma distancia los nodos de los extremos (Hogar 3, Gemes
    // Eats) quedaban cortados por el borde. Alejamos la cámara en proporción
    // inversa al aspect cuando es angosto (sin tocar nada si ya es ancha), y
    // diluimos la niebla en la misma proporción -- si no, a esa distancia
    // FogExp2 satura y se ve todo negro.
    const aspect = host.clientWidth / host.clientHeight;
    const REFERENCE_ASPECT = 1.6;
    const framingScale = Math.max(1, REFERENCE_ASPECT / aspect);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0e17);
    scene.fog = new THREE.FogExp2(0x0a0e17, 0.015 / framingScale);

    const camera = new THREE.PerspectiveCamera(45, aspect, 0.5, 500);
    camera.position.set(0, 55, 65).multiplyScalar(framingScale);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    host.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.1;
    controls.minDistance = 15;
    // 130 alcanza para el encuadre de referencia (~85); en mobile el
    // framingScale aleja la cámara bastante más, así que el máximo tiene que
    // dar lugar a eso o OrbitControls la vuelve a acercar en el primer
    // controls.update() y se pierde el ajuste.
    controls.maxDistance = Math.max(130, 85.1 * framingScale + 20);
    controls.target.set(0, 0, 0);

    scene.add(new THREE.AmbientLight(0xdde5ed, 0.7));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(40, 60, 30);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.set(2048, 2048);
    dirLight.shadow.camera.near = 10;
    dirLight.shadow.camera.far = 160;
    dirLight.shadow.camera.left = -50;
    dirLight.shadow.camera.right = 50;
    dirLight.shadow.camera.top = 50;
    dirLight.shadow.camera.bottom = -50;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);

    const orangeLight = new THREE.PointLight(0xff7700, 2, 40);
    orangeLight.position.set(0, 8, 0);
    scene.add(orangeLight);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(160, 160),
      new THREE.MeshStandardMaterial({ color: 0x111625, roughness: 0.85, metalness: 0.1 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const gridHelper = new THREE.GridHelper(150, 50, 0x1f293d, 0x161d2d);
    gridHelper.position.y = 0.05;
    scene.add(gridHelper);

    function buildingMat(color: number) {
      return new THREE.MeshStandardMaterial({ color, roughness: 0.35, metalness: 0.25, flatShading: true });
    }
    const matWindow = new THREE.MeshStandardMaterial({
      color: 0x93c5fd,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.35,
      roughness: 0.1,
    });
    const matRoofAccent = new THREE.MeshStandardMaterial({ color: 0xff6600, emissive: 0xff6600, emissiveIntensity: 0.4 });

    function buildGemesExpress(group: THREE.Group) {
      const base = new THREE.Mesh(new THREE.BoxGeometry(10, 5, 8), buildingMat(0x2d3748));
      base.position.y = 2.5;
      base.castShadow = base.receiveShadow = true;
      group.add(base);

      const tower = new THREE.Mesh(new THREE.BoxGeometry(6, 9, 6), buildingMat(0x1e293b));
      tower.position.y = 7;
      tower.castShadow = tower.receiveShadow = true;
      group.add(tower);

      const stripe = new THREE.Mesh(new THREE.BoxGeometry(6.2, 0.6, 6.2), matRoofAccent);
      stripe.position.y = 11.2;
      group.add(stripe);

      const win = new THREE.Mesh(new THREE.BoxGeometry(6.1, 4, 4.5), matWindow);
      win.position.y = 7;
      group.add(win);

      const heli = new THREE.Mesh(
        new THREE.CylinderGeometry(2.2, 2.2, 0.4, 16),
        new THREE.MeshStandardMaterial({ color: 0x0f172a }),
      );
      heli.position.y = 11.7;
      group.add(heli);

      const hBarMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
      const hBar1 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.1, 2), hBarMat);
      hBar1.position.set(-0.8, 11.95, 0);
      group.add(hBar1);
      const hBar2 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.1, 2), hBarMat);
      hBar2.position.set(0.8, 11.95, 0);
      group.add(hBar2);
      const hBarMid = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.1, 0.5), hBarMat);
      hBarMid.position.y = 11.95;
      group.add(hBarMid);

      const antenna = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.15, 3.5, 8),
        new THREE.MeshStandardMaterial({ color: 0x94a3b8 }),
      );
      antenna.position.set(2, 13.2, 2);
      group.add(antenna);

      const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1, 1.4), new THREE.MeshStandardMaterial({ color: 0xf59e0b }));
      cabin.position.set(4, 0.6, 3);
      group.add(cabin);
      const cargo = new THREE.Mesh(new THREE.BoxGeometry(2, 1.4, 1.4), new THREE.MeshStandardMaterial({ color: 0xffffff }));
      cargo.position.set(2.4, 0.8, 3);
      group.add(cargo);
    }

    function buildGemesEats(group: THREE.Group) {
      const b1 = new THREE.Mesh(new THREE.BoxGeometry(7, 8, 6), buildingMat(0x10b981));
      b1.position.y = 4;
      b1.castShadow = true;
      group.add(b1);

      const b2 = new THREE.Mesh(new THREE.BoxGeometry(5, 4, 4.5), buildingMat(0x064e3b));
      b2.position.y = 10;
      b2.castShadow = true;
      group.add(b2);

      const winEats = new THREE.Mesh(
        new THREE.BoxGeometry(7.2, 2.5, 4.5),
        new THREE.MeshStandardMaterial({ color: 0x6ee7b7, emissive: 0x10b981, emissiveIntensity: 0.3 }),
      );
      winEats.position.y = 4.5;
      group.add(winEats);

      const topCube = new THREE.Mesh(
        new THREE.BoxGeometry(1.6, 1.6, 1.6),
        new THREE.MeshStandardMaterial({ color: 0xffaa00, emissive: 0xffaa00, emissiveIntensity: 0.6 }),
      );
      topCube.position.y = 13;
      topCube.rotation.y = Math.PI / 4;
      group.add(topCube);
    }

    function buildGemesHub(group: THREE.Group) {
      const base = new THREE.Mesh(new THREE.BoxGeometry(8, 5, 7), buildingMat(0x2563eb));
      base.position.y = 2.5;
      base.castShadow = true;
      group.add(base);

      const floor2 = new THREE.Mesh(new THREE.BoxGeometry(6.5, 3.5, 5.5), buildingMat(0x1e3a8a));
      floor2.position.y = 6.5;
      floor2.castShadow = true;
      group.add(floor2);

      const awning = new THREE.Mesh(
        new THREE.CylinderGeometry(4.2, 4.5, 0.5, 4, 1, false, 0, Math.PI),
        new THREE.MeshStandardMaterial({ color: 0x38bdf8 }),
      );
      awning.position.set(0, 3.2, 3.6);
      awning.rotation.x = Math.PI / 2;
      group.add(awning);

      const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 2, 8), new THREE.MeshStandardMaterial({ color: 0x94a3b8 }));
      pipe.position.set(2, 9, -1.5);
      group.add(pipe);
    }

    function buildHome(group: THREE.Group) {
      const walls = new THREE.Mesh(new THREE.BoxGeometry(4, 3, 4), buildingMat(0x334155));
      walls.position.y = 1.5;
      walls.castShadow = walls.receiveShadow = true;
      group.add(walls);

      const roof = new THREE.Mesh(
        new THREE.ConeGeometry(3.3, 2.2, 4),
        new THREE.MeshStandardMaterial({ color: 0xec4899, roughness: 0.4 }),
      );
      roof.position.y = 4.1;
      roof.rotation.y = Math.PI / 4;
      roof.castShadow = true;
      group.add(roof);

      const door = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 1.5), new THREE.MeshBasicMaterial({ color: 0xf1f5f9 }));
      door.position.set(0, 0.75, 2.02);
      group.add(door);

      const win = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.8), matWindow);
      win.position.set(1.1, 1.8, 2.02);
      group.add(win);

      const box = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.8, 0.6), new THREE.MeshStandardMaterial({ color: 0xff7700 }));
      box.position.set(-1.8, 0.4, 2.2);
      group.add(box);
    }

    function buildCityDecorations() {
      const cityGroup = new THREE.Group();
      const decColors = [0x172033, 0x1c2438, 0x141b2b];
      const positions: [number, number][] = [
        [-35, -5],
        [-38, 15],
        [35, -8],
        [38, 12],
        [-15, -35],
        [15, -35],
        [-35, -30],
        [35, -30],
        [-12, 35],
        [12, 35],
      ];
      positions.forEach(([x, z]) => {
        const height = 4 + Math.random() * 8;
        const width = 3 + Math.random() * 3;
        const depth = 3 + Math.random() * 3;
        const color = decColors[Math.floor(Math.random() * decColors.length)];
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), buildingMat(color));
        mesh.position.set(x, height / 2, z);
        mesh.castShadow = mesh.receiveShadow = true;
        cityGroup.add(mesh);
      });

      const treePositions: [number, number][] = [
        [-10, 10],
        [10, 10],
        [-8, -12],
        [8, -12],
        [-18, 15],
        [18, 15],
        [-5, 20],
        [5, 20],
      ];
      treePositions.forEach(([tx, tz]) => {
        const trunk = new THREE.Mesh(
          new THREE.CylinderGeometry(0.2, 0.25, 1, 6),
          new THREE.MeshStandardMaterial({ color: 0x475569 }),
        );
        trunk.position.set(tx, 0.5, tz);
        const leaves = new THREE.Mesh(
          new THREE.ConeGeometry(1, 2, 6),
          new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.6 }),
        );
        leaves.position.set(tx, 1.8, tz);
        cityGroup.add(trunk, leaves);
      });
      scene.add(cityGroup);
    }
    buildCityDecorations();

    const nodePositions = new Map<string, THREE.Vector3>();
    NODE_LIST.forEach((node) => {
      const group = new THREE.Group();
      const pos = new THREE.Vector3(...node.pos);
      group.position.copy(pos);
      nodePositions.set(node.key, pos);

      if (node.type === "express") buildGemesExpress(group);
      else if (node.type === "eats") buildGemesEats(group);
      else if (node.type === "hub") buildGemesHub(group);
      else buildHome(group);

      scene.add(group);
    });

    const FLOW_HEIGHT_OFFSET = new THREE.Vector3(0, 1.8, 0);
    const flows: FlowRuntime[] = FLOW_PATHS.map((def) => {
      const p1 = nodePositions.get(def.from)!.clone().add(FLOW_HEIGHT_OFFSET);
      const p2 = nodePositions.get(def.to)!.clone().add(FLOW_HEIGHT_OFFSET);
      const mid = p1.clone().add(p2).multiplyScalar(0.5);
      mid.y += def.height;

      const dir = p2.clone().sub(p1).normalize();
      const perp = new THREE.Vector3(-dir.z, 0, dir.x).normalize().multiplyScalar(def.curveOffset);
      mid.add(perp);

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(50));
      const line = new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({ color: FLOW_COLOR, transparent: true, opacity: 0.65 }),
      );
      scene.add(line);

      const tangent = curve.getTangent(0.6);
      const arrowPoint = curve.getPoint(0.6);
      const arrow = new THREE.ArrowHelper(tangent, arrowPoint, 1.6, FLOW_COLOR, 0.9, 0.5);
      scene.add(arrow);

      const particles = Array.from({ length: 2 }, (_, i) => {
        const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.35, 12, 12), new THREE.MeshBasicMaterial({ color: 0xffaa00 }));
        scene.add(mesh);
        return { mesh, progress: i / 2 };
      });

      return { cycle: def.cycle, curve, line, arrow, particles };
    });
    flowsRef.current = flows;
    // aplica el filtro ya elegido por el usuario (si volvió a esta sección
    // después de tocar un botón, `cycle` puede no ser "all")
    flows.forEach((flow) => {
      const visible = cycle === "all" || flow.cycle === cycle;
      flow.line.visible = visible;
      flow.arrow.visible = visible;
      flow.particles.forEach((p) => (p.mesh.visible = visible));
    });

    const tempV = new THREE.Vector3();
    function updateLabels() {
      NODE_LIST.forEach((node, idx) => {
        const label = labelRefs.current[idx];
        if (!label) return;
        const pos = nodePositions.get(node.key)!;
        tempV.copy(pos);
        tempV.y += node.type === "express" ? 14 : node.type === "home" ? 5.5 : 12;
        tempV.project(camera);

        if (tempV.z > 1) {
          label.style.opacity = "0";
          return;
        }
        const x = (tempV.x * 0.5 + 0.5) * host!.clientWidth;
        const y = (-tempV.y * 0.5 + 0.5) * host!.clientHeight;
        label.style.opacity = "1";
        label.style.left = `${x}px`;
        label.style.top = `${y}px`;
      });
    }

    const clock = new THREE.Clock();
    let frameId = 0;
    function animate() {
      frameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      flows.forEach((flow) => {
        if (!flow.line.visible) return;
        flow.particles.forEach((p) => {
          p.progress = (p.progress + delta * 0.35) % 1;
          flow.curve.getPoint(p.progress, p.mesh.position);
        });
      });

      orangeLight.intensity = 1.6 + Math.sin(time * 3) * 0.4;

      controls.update();
      updateLabels();
      renderer.render(scene, camera);
    }
    animate();

    const resizeObserver = new ResizeObserver(() => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(host);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(frameId);
      controls.dispose();
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Line) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `cycle` se lee una sola vez al montar, el filtro en vivo lo maneja el otro efecto
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {/* Encabezado -- en flujo normal, no flotando sobre la escena: como
          overlay se superponía con la etiqueta de "Gemes Hub" en mobile
          (la caja angosta acerca ese nodo a la esquina superior izquierda). */}
      <div>
        <span className="inline-block rounded-full border border-[#ff6b00]/40 bg-[#ff6b00]/15 px-3 py-1 font-mono text-[11px] font-bold tracking-widest text-[#ff8533] uppercase">
          Ecosistema Gemes
        </span>
        <h3 className="mt-2 text-lg font-extrabold text-white sm:text-xl">Red de entregas en 3D</h3>
        <p className="mt-1 max-w-md text-[13px] leading-snug text-white/60">
          Cómo circula un pedido entre hogares, Eats, Hub y Express.
        </p>
      </div>

      <div className="relative h-[480px] w-full overflow-hidden rounded-3xl border border-white/10 sm:h-[560px] lg:h-[680px]">
        <div ref={canvasHostRef} className="absolute inset-0 touch-none" />

        {/* Etiquetas HTML proyectadas sobre cada nodo 3D -- posición seteada a
            mano cuadro a cuadro en updateLabels(), no vía estado de React. */}
        <div className="pointer-events-none absolute inset-0 z-10">
          {NODE_LIST.map((node, idx) => {
            const style = TYPE_STYLE[node.type];
            return (
              <div
                key={node.key}
                ref={(el) => {
                  labelRefs.current[idx] = el;
                }}
                className="absolute -translate-x-1/2 -translate-y-full opacity-0 transition-opacity duration-300"
              >
                <div
                  className="flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-bold tracking-wide whitespace-nowrap backdrop-blur-sm"
                  style={{ background: style.bg, borderColor: style.border, color: style.text }}
                >
                  <span style={{ color: style.dot }}>●</span>
                  {node.title}
                </div>
              </div>
            );
          })}
        </div>

        {/* Leyenda */}
        <div className="pointer-events-auto absolute top-5 right-6 z-10 hidden rounded-2xl border border-white/10 bg-[#0f172a]/85 px-5 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.4)] backdrop-blur-md sm:block">
          <div className="mb-2.5 text-[11px] font-bold tracking-wide text-slate-500 uppercase">Componentes</div>
          {LEGEND_ITEMS.map((item) => (
            <div key={item.label} className="mb-2 flex items-center gap-2.5 text-xs text-slate-400 last:mb-0">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }}
              />
              <span>
                <strong className="font-semibold text-slate-200">{item.label}</strong> · {item.sub}
              </span>
            </div>
          ))}
        </div>

        {/* Ayuda de controles */}
        <div className="pointer-events-none absolute right-6 bottom-5 z-10 hidden rounded-full border border-white/5 bg-[#0f172a]/70 px-3.5 py-1.5 text-[11px] text-slate-500 sm:block">
          Clic y arrastrá para rotar · Rueda para zoom
        </div>
      </div>

      {/* Filtro de ciclos -- en flujo normal debajo de la escena (no flotante
          sobre el mapa): como overlay tapaba las casas en pantallas chicas y
          no había forma de garantizar que nunca se superpusiera con algún
          nodo según el ángulo de cámara. */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5">
        <div className="mb-2.5 text-[11px] font-bold tracking-wide text-slate-500 uppercase">Filtrar ciclo de flujo</div>
        <div className="mb-3.5 flex flex-wrap gap-2">
          {CYCLE_BUTTONS.map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => setCycle(btn.id)}
              className="rounded-[10px] border px-3.5 py-1.5 text-xs font-semibold transition-colors"
              style={
                cycle === btn.id
                  ? { background: "#ff6b00", borderColor: "#ff8533", color: "#fff", boxShadow: "0 0 16px rgba(255,107,0,0.45)" }
                  : { background: "#1e293b", borderColor: "rgba(255,255,255,0.1)", color: "#cbd5e1" }
              }
            >
              {btn.label}
            </button>
          ))}
        </div>
        <p className="border-t border-white/10 pt-2.5 text-xs leading-relaxed text-slate-300">{CYCLE_DESCRIPTIONS[cycle]}</p>
      </div>
    </div>
  );
}
