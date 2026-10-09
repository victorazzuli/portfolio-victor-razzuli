"use client";
import { motion } from "motion/react";
import { PROCESS, STACK } from "@/data/profile";

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="border-t border-text/10 bg-surface py-20 sm:py-28">
      <div className="wrap grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <p className="label">Sobre</p>
          <h2 id="sobre-title" className="display mt-3 text-[clamp(2.2rem,5vw,4rem)]">
            Código para a web. Modelos para os dados.
          </h2>
          <p className="mt-6 max-w-[50ch] text-[17px] leading-relaxed text-text/80">
            Trabalho nos dois lados: interfaces que o cliente final usa no celular e sistemas de machine learning que aprendem com dados. Nos sites, isso vira cuidado com o que importa: performance, dados reais e caminho curto até a venda.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {[
              ["Web", STACK.web],
              ["Machine learning e dados", STACK.ml],
            ].map(([t, items]) => (
              <div key={t as string}>
                <h3 className="label text-text">{t as string}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {(items as string[]).map((s) => (
                    <li key={s} className="chip">{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="label">Como eu trabalho</h3>
          <ol className="mt-4 border-t border-text/15">
            {PROCESS.map((s, i) => (
              <motion.li
                key={s.t}
                className="grid gap-2 border-b border-text/10 py-6 sm:grid-cols-[64px_160px_1fr] sm:gap-6"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-xl font-bold">{s.t}</span>
                <p className="text-[15px] leading-relaxed text-muted">{s.d}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
