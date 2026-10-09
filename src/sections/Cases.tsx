"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { PROJECTS, type Project } from "@/data/projects";
import { cx } from "@/utils/cx";

export function Cases() {
  return (
    <section aria-label="Cases" className="pb-10">
      {PROJECTS.map((p, i) => (
        <Case key={p.id} p={p} flip={i % 2 === 1} n={i + 1} />
      ))}
    </section>
  );
}

function Case({ p, flip, n }: { p: Project; flip: boolean; n: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const phoneY = useTransform(scrollYProgress, [0, 1], ["18%", "-18%"]);

  return (
    <article ref={ref} id={`case-${p.id}`} aria-labelledby={`t-${p.id}`} className="border-t border-text/10 py-16 sm:py-24">
      <div className="wrap grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Mockups: navegador + celular */}
        <div className={cx("relative", flip && "lg:order-2")}>
          <motion.div
            className="overflow-hidden rounded-[18px] border border-text/10 bg-surface shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-1.5 border-b border-text/10 px-4 py-3" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-text/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-text/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-text/20" />
              <span className="ml-3 truncate rounded-full bg-text/[0.06] px-3 py-1 font-mono text-[11px] text-muted">{p.url.replace("https://", "")}</span>
            </div>
            <div className="relative aspect-[16/10]">
              <Image src={`/shots/${p.id}-desk.webp`} alt={`Página inicial do site ${p.name} no computador`} fill sizes="(max-width: 1024px) 92vw, 620px" className="object-cover object-top" />
            </div>
          </motion.div>
          <motion.div style={{ y: phoneY }} className={cx("absolute -bottom-8 w-[30%] max-w-[170px] overflow-hidden rounded-[22px] border-[5px] border-surface-2 bg-surface shadow-2xl", flip ? "-left-3 sm:-left-6" : "-right-3 sm:-right-6")}>
            <div className="relative aspect-[390/844]">
              <Image src={`/shots/${p.id}-mob.webp`} alt={`Site ${p.name} no celular`} fill sizes="170px" className="object-cover object-top" />
            </div>
          </motion.div>
        </div>

        {/* Texto */}
        <div className={cx(flip && "lg:order-1")}>
          <p className="label flex items-center gap-2">
            <span className="font-mono" style={{ color: p.color }}>{String(n).padStart(2, "0")}</span>
            <span aria-hidden>·</span> {p.segment} · {p.city} · {p.year}
          </p>
          <h3 id={`t-${p.id}`} className="display mt-3 text-[clamp(2rem,4.2vw,3.4rem)]">
            {p.name}
          </h3>
          <p className="mt-4 max-w-[52ch] text-[17px] leading-relaxed text-text/80">{p.summary}</p>
          <ul className="mt-6 space-y-3">
            {p.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-text/85">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: p.color }} aria-hidden />
                {h}
              </li>
            ))}
          </ul>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tecnologias">
            {p.stack.map((s) => (
              <li key={s} className="chip">{s}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Ver site no ar
            </a>
            <a href={p.repo} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              Código no GitHub
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
