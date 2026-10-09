"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PROJECTS } from "@/data/projects";
import { useWebGL } from "@/hooks/useWebGL";

const Carousel3D = dynamic(() => import("@/components/three/Carousel3D"), { ssr: false });

export function Projects() {
  const [index, setIndex] = useState(0);
  const [near, setNear] = useState(false);
  const gl = useWebGL();
  const ref = useRef<HTMLElement>(null);
  const p = PROJECTS[index];

  // só carrega o 3D (e as texturas) quando a seção chega perto
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "400px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const go = useCallback((d: number) => setIndex((i) => (i + d + PROJECTS.length) % PROJECTS.length), []);
  const open = (i: number) => document.getElementById(`case-${PROJECTS[i].id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section ref={ref} id="projetos" aria-labelledby="proj-title" className="relative py-20 sm:py-28">
      <div className="wrap flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="label">Projetos</p>
          <h2 id="proj-title" className="display mt-3 text-[clamp(2.4rem,6vw,5rem)]">
            Sites no ar, <span className="text-muted">feitos para clientes reais.</span>
          </h2>
        </div>
        <p className="max-w-[34ch] pb-2 text-[15px] text-muted">Arraste as telas para os lados. Clique na da frente para ver o case completo.</p>
      </div>

      <div className="relative mt-6 h-[46svh] min-h-[300px] sm:h-[58vh]">
        {near && gl ? (
          <Carousel3D index={index} onIndex={setIndex} onOpen={open} />
        ) : gl === false ? (
          <div className="wrap flex h-full snap-x snap-mandatory gap-4 overflow-x-auto">
            {PROJECTS.map((x, i) => (
              <button key={x.id} type="button" onClick={() => open(i)} className="relative aspect-[16/10] h-full shrink-0 snap-center overflow-hidden rounded-2xl">
                <Image src={`/shots/${x.id}-desk.webp`} alt={`Tela inicial do site ${x.name}`} fill sizes="80vw" className="object-cover object-top" />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {/* Painel do projeto em foco + controles acessíveis */}
      <div className="wrap mt-6">
        <div className="flex flex-col gap-6 rounded-[28px] border border-text/10 bg-surface p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
          <AnimatePresence mode="wait">
            <motion.div key={p.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} aria-live="polite">
              <p className="label flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: p.color }} aria-hidden />
                {p.segment} · {p.city}
              </p>
              <h3 className="mt-2 font-display text-[clamp(1.6rem,3vw,2.3rem)] font-bold">{p.name}</h3>
              <p className="mt-2 max-w-[60ch] text-[15px] leading-relaxed text-muted">{p.summary}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <button type="button" onClick={() => go(-1)} aria-label="Projeto anterior" className="grid h-12 w-12 place-items-center rounded-full border border-text/20 hover:border-text/60">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><path d="M15 6l-6 6 6 6" /></svg>
            </button>
            <span className="font-mono text-sm tabular-nums text-muted" aria-hidden>
              {String(index + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
            </span>
            <button type="button" onClick={() => go(1)} aria-label="Próximo projeto" className="grid h-12 w-12 place-items-center rounded-full border border-text/20 hover:border-text/60">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><path d="M9 6l6 6-6 6" /></svg>
            </button>
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn-primary min-h-[48px]">
              Abrir site
            </a>
            <button type="button" onClick={() => open(index)} className="btn-ghost min-h-[48px]">
              Ver case
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
