import { PROFILE, waLink } from "@/data/profile";

export function Contact() {
  const wa = waLink("Olá, Victor! Vi seu portfólio e quero conversar sobre um site.");
  return (
    <section id="contato" aria-labelledby="contato-title" className="relative isolate overflow-hidden py-24 sm:py-36">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(50%_70%_at_50%_100%,rgb(var(--accent)/0.22),transparent_70%)]" />
      <div className="wrap text-center">
        <p className="label">Contato</p>
        <h2 id="contato-title" className="display mx-auto mt-4 max-w-[14ch] text-[clamp(2.6rem,7vw,6rem)]">
          Vamos colocar o seu negócio no ar?
        </h2>
        <p className="mx-auto mt-6 max-w-[44ch] text-lg text-text/75">Conte o que você precisa. Respondo com uma proposta clara e prazos reais.</p>
        <a href={`mailto:${PROFILE.email}?subject=${encodeURIComponent("Quero um site")}`} className="mt-10 inline-block break-all font-display text-[clamp(1.4rem,4vw,2.8rem)] font-bold underline decoration-accent decoration-2 underline-offset-[10px] transition-colors hover:text-accent">
          {PROFILE.email}
        </a>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn bg-[#25D366] text-[#0B0C10] hover:brightness-105">
              WhatsApp
            </a>
          )}
          <a href={PROFILE.github.url} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            GitHub · {PROFILE.github.handle}
          </a>
        </div>
      </div>
    </section>
  );
}
