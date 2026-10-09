"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { PROFILE } from "@/data/profile";
import { PROJECTS } from "@/data/projects";
import { useCapable } from "@/hooks/useCapable";
import { useWebGL } from "@/hooks/useWebGL";

const NeuralNet = dynamic(() => import("@/components/three/NeuralNet"), { ssr: false });
const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const cap = useCapable();
  const gl = useWebGL();
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const goTo = (id: string) => document.getElementById(`case-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const anim = cap.ready ? cap.motion : true;

  return (
    <section ref={ref} id="topo" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-[var(--header-h)] lg:justify-center">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_55%_at_72%_45%,rgb(var(--accent)/0.16),transparent_70%)]" />

      {/* Rede neural 3D: à direita no desktop, em cima no celular */}
      <div className="relative h-[46svh] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[58%]">
        {gl && cap.ready ? (
          <NeuralNet onSelect={goTo} animate={cap.motion && visible} allowDrag={cap.finePointer} />
        ) : (
          gl === false && <StaticNet />
        )}
        <p className="pointer-events-none absolute bottom-2 right-4 font-mono text-[11px] text-muted lg:bottom-10 lg:right-10">
          {cap.finePointer ? "arraste para girar · clique num nó colorido" : "toque num nó colorido"}
        </p>
      </div>

      {/* O bloco de texto fica por cima do canvas no desktop: só o conteúdo recebe o ponteiro, o resto passa para a rede 3D */}
      <div className="wrap pointer-events-none relative pb-14 lg:pb-0">
        <div className="pointer-events-auto max-w-[640px]">
          <motion.p className="label text-accent" initial={anim ? { opacity: 0, y: 8 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease }}>
            {PROFILE.role}
          </motion.p>
          <h1 id="hero-title" className="display mt-4 text-[clamp(2.6rem,6.2vw,5.6rem)]">
            {["Sites que", "trabalham pelo", "seu negócio."].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.06em]">
                <motion.span className={i === 2 ? "block text-accent" : "block"} initial={anim ? { y: "105%" } : false} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.2 + i * 0.1, ease }}>
                  {l}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.div initial={anim ? { opacity: 0, y: 14 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6, ease }}>
            <p className="mt-6 max-w-[48ch] text-[17px] leading-relaxed text-text/80 sm:text-lg">
              Sou {PROFILE.name}. Construo sites rápidos e com identidade para negócios reais, com cardápio, simulador e pedido direto no WhatsApp. E treino modelos de machine learning que aprendem com dados.
            </p>
            <div className="mt-8 flex flex-col gap-3 xs:flex-row">
              <a href="#projetos" className="btn-primary">Ver projetos</a>
              <a href="#contato" className="btn-ghost">Falar comigo</a>
            </div>
            <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              <div>
                <dt className="label">No ar</dt>
                <dd className="mt-1 font-display text-2xl font-bold">{PROJECTS.length} sites</dd>
              </div>
              <div>
                <dt className="label">Clientes em</dt>
                <dd className="mt-1 font-display text-2xl font-bold">Guarulhos, Santo André e SP</dd>
              </div>
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** Sem WebGL: rede desenhada em SVG (mesma ideia, estática). */
function StaticNet() {
  const layers = [6, 9, 9, PROJECTS.length];
  const pts = layers.map((n, l) => Array.from({ length: n }, (_, i) => [80 + l * 180, 240 + (i - (n - 1) / 2) * (l === 3 ? 70 : 46)]));
  return (
    <svg viewBox="0 0 700 480" className="h-full w-full" role="img" aria-label="Rede neural ilustrativa; os nós de saída são os projetos">
      {pts.slice(0, -1).map((layer, l) => layer.flatMap(([x1, y1], a) => pts[l + 1].map(([x2, y2], b) => <line key={`${l}-${a}-${b}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#8C93A8" strokeOpacity=".15" />)))}
      {pts.flat().map(([x, y], k) => <circle key={k} cx={x} cy={y} r="5" fill="#DDE1EA" />)}
      {pts[3].map(([x, y], i) => <circle key={`o${i}`} cx={x} cy={y} r="11" fill={PROJECTS[i].color} />)}
    </svg>
  );
}
