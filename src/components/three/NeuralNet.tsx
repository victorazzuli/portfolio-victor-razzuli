"use client";
import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { PROJECTS } from "@/data/projects";

/**
 * Rede neural interativa: camadas de entrada → ocultas → saída. A camada de saída são os
 * projetos (cor da marca de cada cliente). Sinais percorrem a rede; quando chegam num nó
 * de saída, ele "acende". Arraste para girar (desktop); toque/clique num nó colorido para abrir o case.
 */
const LAYERS = [6, 9, 9, PROJECTS.length];
const GAP_X = 2.15;
const PULSES = 70;

type Node = { p: THREE.Vector3; layer: number; idx: number };

function useNetwork() {
  return useMemo(() => {
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const nodes: Node[][] = LAYERS.map((n, l) =>
      Array.from({ length: n }, (_, i) => {
        const spread = l === LAYERS.length - 1 ? 1.15 : 0.82;
        const y = (i - (n - 1) / 2) * spread;
        return { p: new THREE.Vector3((l - (LAYERS.length - 1) / 2) * GAP_X, y, (rnd() - 0.5) * 1.6), layer: l, idx: i };
      }),
    );
    // arestas entre camadas consecutivas
    const pos: number[] = [];
    for (let l = 0; l < nodes.length - 1; l++)
      for (const a of nodes[l]) for (const b of nodes[l + 1]) pos.push(a.p.x, a.p.y, a.p.z, b.p.x, b.p.y, b.p.z);
    const edges = new THREE.BufferGeometry();
    edges.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    return { nodes, edges, rnd };
  }, []);
}

function Network({ onSelect, animate, interactive }: { onSelect: (id: string) => void; animate: boolean; interactive: boolean }) {
  const { nodes, edges } = useNetwork();
  const group = useRef<THREE.Group>(null);
  const hiddenMesh = useRef<THREE.InstancedMesh>(null);
  const outRefs = useRef<(THREE.Mesh | null)[]>([]);
  const haloRefs = useRef<(THREE.Mesh | null)[]>([]);
  const [hover, setHover] = useState<number | null>(null);
  const activation = useRef(new Float32Array(PROJECTS.length));
  // tela estreita (celular): desloca a rede para a esquerda para os rótulos caberem
  const aspect = useThree((st) => st.size.width / Math.max(1, st.size.height));
  const offsetX = aspect < 1.3 ? -2.1 : 0.4;

  const hidden = useMemo(() => nodes.slice(0, -1).flat(), [nodes]);
  const outputs = nodes[nodes.length - 1];

  // Sinais: cada um percorre um caminho entrada → oculta → oculta → saída
  const pulses = useMemo(() => {
    let s = 99;
    const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    const pick = () => nodes.map((layer) => layer[Math.floor(r() * layer.length)]);
    return Array.from({ length: PULSES }, () => ({ path: pick(), t: r() * (LAYERS.length - 1), speed: 0.55 + r() * 0.5, pick }));
  }, [nodes]);
  const pulseGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(PULSES * 3), 3));
    return g;
  }, []);

  // posiciona os nós ocultos (instanced)
  const dummy = useMemo(() => new THREE.Object3D(), []);
  useFrame((state, dt) => {
    const d = Math.min(dt, 0.05);
    if (hiddenMesh.current && !hiddenMesh.current.userData.set) {
      hidden.forEach((n, i) => {
        dummy.position.copy(n.p);
        dummy.scale.setScalar(n.layer === 0 ? 0.075 : 0.06);
        dummy.updateMatrix();
        hiddenMesh.current!.setMatrixAt(i, dummy.matrix);
      });
      hiddenMesh.current.instanceMatrix.needsUpdate = true;
      hiddenMesh.current.userData.set = true;
    }
    if (!animate) return;

    // leve parallax com o mouse + respiração
    if (group.current) {
      const t = state.clock.elapsedTime;
      group.current.rotation.y += ((state.pointer.x * 0.35 + Math.sin(t * 0.15) * 0.25) - group.current.rotation.y) * 0.03;
      group.current.rotation.x += ((-state.pointer.y * 0.18) - group.current.rotation.x) * 0.03;
    }

    // avança os sinais
    const arr = pulseGeo.attributes.position.array as Float32Array;
    pulses.forEach((pl, i) => {
      pl.t += d * pl.speed;
      if (pl.t >= LAYERS.length - 1) {
        const out = pl.path[pl.path.length - 1].idx;
        activation.current[out] = 1;
        pl.t = 0;
        pl.path = pl.pick();
      }
      const seg = Math.floor(pl.t);
      const f = pl.t - seg;
      const a = pl.path[seg].p, b = pl.path[seg + 1].p;
      arr[i * 3] = a.x + (b.x - a.x) * f;
      arr[i * 3 + 1] = a.y + (b.y - a.y) * f;
      arr[i * 3 + 2] = a.z + (b.z - a.z) * f;
    });
    pulseGeo.attributes.position.needsUpdate = true;

    // nós de saída acendem quando recebem sinal
    outRefs.current.forEach((m, i) => {
      activation.current[i] = Math.max(0, activation.current[i] - d * 1.6);
      const target = (hover === i ? 1.45 : 1) + activation.current[i] * 0.35;
      if (m) m.scale.setScalar(m.scale.x + (target - m.scale.x) * 0.2);
      const h = haloRefs.current[i];
      if (h) {
        (h.material as THREE.MeshBasicMaterial).opacity = 0.12 + activation.current[i] * 0.35 + (hover === i ? 0.25 : 0);
        h.scale.setScalar(1 + activation.current[i] * 0.3 + (hover === i ? 0.25 : 0));
      }
    });
  });

  const over = (i: number) => (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHover(i);
    document.body.style.cursor = "pointer";
  };
  const out = () => {
    setHover(null);
    document.body.style.cursor = "";
  };

  return (
    <group ref={group} position={[offsetX, 0, 0]}>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#8C93A8" transparent opacity={0.13} />
      </lineSegments>
      <instancedMesh ref={hiddenMesh} args={[undefined, undefined, hidden.length]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#DDE1EA" />
      </instancedMesh>
      <points geometry={pulseGeo}>
        <pointsMaterial color="#FFE2B8" size={0.075} sizeAttenuation transparent opacity={0.95} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
      {outputs.map((n, i) => {
        const p = PROJECTS[i];
        return (
          <group key={p.id} position={n.p}>
            <mesh ref={(m) => { haloRefs.current[i] = m; }}>
              <sphereGeometry args={[0.27, 24, 24]} />
              <meshBasicMaterial color={p.color} transparent opacity={0.12} depthWrite={false} />
            </mesh>
            <mesh
              ref={(m) => { outRefs.current[i] = m; }}
              onPointerOver={interactive ? over(i) : undefined}
              onPointerOut={interactive ? out : undefined}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(p.id);
              }}
            >
              <sphereGeometry args={[0.17, 32, 32]} />
              <meshBasicMaterial color={p.color} />
            </mesh>
            <Html position={[0.42, 0, 0]} center={false} style={{ pointerEvents: "none" }} zIndexRange={[10, 0]}>
              <div className={`nn-label ${hover === i ? "nn-label-on" : ""}`}>
                <span className="nn-dot" style={{ background: p.color }} />
                {p.short}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

export default function NeuralNet({ onSelect, animate = true, allowDrag = true }: { onSelect: (id: string) => void; animate?: boolean; allowDrag?: boolean }) {
  return (
    <Canvas
      className="!touch-pan-y"
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 11.5], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={animate ? "always" : "demand"}
      onPointerMissed={() => (document.body.style.cursor = "")}
    >
      <Network onSelect={onSelect} animate={animate} interactive />
      {allowDrag && <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.55} minPolarAngle={Math.PI * 0.32} maxPolarAngle={Math.PI * 0.68} minAzimuthAngle={-0.9} maxAzimuthAngle={0.9} />}
    </Canvas>
  );
}
