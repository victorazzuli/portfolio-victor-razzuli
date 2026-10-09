/** Dados do Victor. WhatsApp: preencher NEXT_PUBLIC_WHATSAPP (só dígitos com DDI) — sem ele o botão não aparece. */
const env = (v?: string) => (v && v.trim() ? v.trim() : null);

export const PROFILE = {
  name: "Victor Razzuli",
  fullName: "Victor Razzuli Arruda",
  role: "Desenvolvedor web & ML Engineer",
  email: "victorrazzuli@gmail.com",
  github: { handle: "victorazzuli", url: "https://github.com/victorazzuli" },
  whatsapp: env(process.env.NEXT_PUBLIC_WHATSAPP)?.replace(/\D/g, "") ?? null,
  url: (env(process.env.NEXT_PUBLIC_SITE_URL) || "https://portfolio-victor-razzuli.vercel.app").replace(/\/$/, ""),
};

export const waLink = (text: string) => (PROFILE.whatsapp ? `https://wa.me/${PROFILE.whatsapp}?text=${encodeURIComponent(text)}` : null);

/** Stack (perfil do GitHub + o que foi usado nos projetos). */
export const STACK = {
  web: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion", "Three.js / WebGL", "Node.js", "Vercel"],
  ml: ["Python", "TensorFlow", "PyTorch", "scikit-learn", "Pandas", "NumPy", "SQL", "Jupyter", "n8n"],
};

export const PROCESS = [
  { t: "Pesquisa", d: "Leio tudo o que o negócio já publicou: Google, Instagram, cardápio, avaliações. Nada de preço, telefone ou depoimento inventado." },
  { t: "Direção", d: "Identidade visual a partir da marca real, do logo às fotos do próprio cliente. Nada de template." },
  { t: "Código", d: "Next.js e TypeScript, dados separados do layout para o cliente atualizar sem quebrar nada." },
  { t: "Teste real", d: "Clico em tudo como um cliente faria, no celular e no computador: pedido, simulador, formulário, WhatsApp." },
  { t: "No ar", d: "Publicação na Vercel, SEO local, dados estruturados e uma lista clara do que falta confirmar." },
];
