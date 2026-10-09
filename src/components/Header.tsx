"use client";
import { useEffect, useState } from "react";
import { PROFILE } from "@/data/profile";
import { cx } from "@/utils/cx";

const NAV = [
  { href: "#projetos", label: "Projetos" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={cx("fixed inset-x-0 top-0 z-50 h-[var(--header-h)] transition-colors duration-300", scrolled ? "border-b border-text/10 bg-bg/80 backdrop-blur-xl" : "border-b border-transparent")}>
      <div className="wrap flex h-full items-center justify-between gap-4">
        <a href="#topo" className="flex items-center gap-3" aria-label={`${PROFILE.name}, voltar ao início`}>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-text font-display text-sm font-extrabold text-bg" aria-hidden>VR</span>
          <span className="hidden font-display text-[17px] font-bold sm:inline">{PROFILE.name}</span>
        </a>
        <nav aria-label="Principal">
          <ul className="flex items-center gap-1">
            {NAV.map((n) => (
              <li key={n.href} className={n.href === "#contato" ? "" : "hidden sm:block"}>
                <a href={n.href} className={cx("rounded-full px-4 py-2 text-[15px] transition-colors", n.href === "#contato" ? "bg-text font-semibold text-bg hover:bg-accent" : "text-text/75 hover:text-text")}>
                  {n.href === "#contato" ? "Vamos conversar" : n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
