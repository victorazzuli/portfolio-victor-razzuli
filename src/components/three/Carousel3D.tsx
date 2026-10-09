"use client";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image } from "@react-three/drei";
import * as THREE from "three";
import { PROJECTS } from "@/data/projects";

/**
 * Carrossel 3D: telas reais dos projetos num cilindro. Arraste na horizontal para girar
 * (a rolagem vertical da página continua funcionando), solta e ele encaixa no mais próximo.
 * Clique num card lateral para trazê-lo à frente; no da frente, abre o case.
 */
const N = PROJECTS.length;
const STEP = (Math.PI * 2) / N;

function Ring({ index, onIndex, onOpen, drag }: { index: number; onIndex: (i: number) => void; onOpen: (i: number) => void; drag: React.MutableRefObject<{ dx: number; active: boolean; moved: boolean }> }) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  // card ocupa ~50% da largura no desktop e ~80% no celular; cilindro justo para os vizinhos aparecerem
  const W = Math.min(viewport.width * (viewport.width < 7 ? 0.8 : 0.5), 6.4);
  const H = W * 0.625;
  const radius = W * 1.08;
  const rot = useRef(-index * STEP);
  const imgs = useRef<(THREE.Mesh | null)[]>([]);
  const [hover, setHover] = useState<number | null>(null);

  useFrame((state, dt) => {
    const target = -index * STEP + drag.current.dx * 0.006;
    rot.current += (target - rot.current) * Math.min(1, dt * 7);
    if (group.current) {
      group.current.rotation.y = rot.current;
      group.current.position.set(0, Math.sin(state.clock.elapsedTime * 0.6) * 0.04, -radius);
    }
    imgs.current.forEach((m, i) => {
      if (!m) return;
      // quão "de frente" o card está (1 = frente)
      const a = i * STEP + rot.current;
      const front = (Math.cos(a) + 1) / 2;
      const mat = m.material as THREE.ShaderMaterial & { grayscale: number; zoom: number; opacity: number };
      mat.grayscale = THREE.MathUtils.lerp(mat.grayscale ?? 0, front > 0.92 ? 0 : 0.85, 0.12);
      mat.zoom = THREE.MathUtils.lerp(mat.zoom ?? 1, hover === i ? 1.06 : 1, 0.12);
      mat.opacity = 0.25 + front * 0.75;
      m.scale.x = THREE.MathUtils.lerp(m.scale.x, W * (hover === i ? 1.03 : 1), 0.15);
      m.scale.y = THREE.MathUtils.lerp(m.scale.y, H * (hover === i ? 1.03 : 1), 0.15);
    });
  });

  return (
    <group ref={group} position={[0, 0, -radius]}>
      {PROJECTS.map((p, i) => {
        // card i no ângulo i*STEP do cilindro (centro do grupo = centro do cilindro)
        const a = i * STEP;
        return (
          <group key={p.id} position={[Math.sin(a) * radius, 0, Math.cos(a) * radius]} rotation={[0, a, 0]}>
            <Image
              ref={(m: THREE.Mesh | null) => { imgs.current[i] = m; }}
              url={`/shots/${p.id}-tex.jpg`}
              scale={[W, H]}
              radius={0.12}
              transparent
              side={THREE.DoubleSide}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHover(i);
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={() => {
                setHover(null);
                document.body.style.cursor = "";
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (drag.current.moved) return;
                if (i === index) onOpen(i);
                else onIndex(i);
              }}
            />
          </group>
        );
      })}
    </group>
  );
}

export default function Carousel3D({ index, onIndex, onOpen }: { index: number; onIndex: (i: number) => void; onOpen: (i: number) => void }) {
  const drag = useRef({ x: 0, dx: 0, active: false, moved: false });
  const wrap = useRef<HTMLDivElement>(null);

  // arrastar com mouse/toque (horizontal); vertical segue rolando a página (touch-action: pan-y)
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const down = (e: PointerEvent) => {
      drag.current = { x: e.clientX, dx: 0, active: true, moved: false };
    };
    const move = (e: PointerEvent) => {
      if (!drag.current.active) return;
      drag.current.dx = e.clientX - drag.current.x;
      if (Math.abs(drag.current.dx) > 6) drag.current.moved = true;
    };
    const up = () => {
      if (!drag.current.active) return;
      const steps = Math.round(drag.current.dx * 0.006 / STEP);
      drag.current.active = false;
      if (steps) onIndex((((index - steps) % N) + N) % N);
      drag.current.dx = 0;
      setTimeout(() => (drag.current.moved = false), 0);
    };
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [index, onIndex]);

  return (
    <div ref={wrap} className="h-full w-full cursor-grab touch-pan-y select-none active:cursor-grabbing">
      <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0.2, 6.2], fov: 40 }} gl={{ antialias: true, alpha: true }}>
        <fog attach="fog" args={["#0B0C10", 6, 13]} />
        <Ring index={index} onIndex={onIndex} onOpen={onOpen} drag={drag as never} />
      </Canvas>
    </div>
  );
}
