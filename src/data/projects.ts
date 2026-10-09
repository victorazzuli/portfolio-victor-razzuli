/** Projetos no ar (Vercel, equipe rz-tech). Fatos tirados do código e dos READMEs de cada projeto. */
export type Project = {
  id: string;
  name: string;
  /** rótulo curto (nó da rede 3D) */
  short: string;
  segment: string;
  city: string;
  year: string;
  url: string;
  repo: string;
  color: string; // cor da marca do cliente (nó da rede e destaques)
  summary: string;
  highlights: string[];
  stack: string[];
};

export const PROJECTS: Project[] = [
  {
    id: "art-engenharia",
    short: "Art Engenharia",
    name: "Art Engenharia Elétrica",
    segment: "Energia solar",
    city: "Santo André, SP",
    year: "2026",
    url: "https://art-engenharia.vercel.app",
    repo: "https://github.com/victorazzuli/art-engenharia",
    color: "#FD680B",
    summary: "Site de alta conversão para uma empresa de energia solar: o visitante simula a economia e já cai no WhatsApp com os dados prontos.",
    highlights: [
      "Hero animado em código contando projeto, instalação, homologação na Enel e a conta caindo",
      "Simulador de economia com parâmetros editáveis e mensagem automática para o WhatsApp",
      "Logo oficial reconstruído em vetor e fotos reais das obras",
      "Revisão de acessibilidade e de segurança, com cabeçalhos HTTP configurados",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "Motion", "SVG animado"],
  },
  {
    id: "the-bridge-burger",
    short: "The Bridge",
    name: "The Bridge Burger",
    segment: "Hamburgueria",
    city: "Guarulhos, SP",
    year: "2026",
    url: "https://the-bridge-burger.vercel.app",
    repo: "https://github.com/victorazzuli/the-bridge-burger",
    color: "#F3A53A",
    summary: "Cardápio interativo com carrinho e pedido finalizado no WhatsApp, com a cara da casa.",
    highlights: [
      "Cardápio com adicionais e regras do sistema da casa (mínimo, máximo, obrigatório)",
      "Carrinho, taxa por distância e mensagem de pedido formatada para o WhatsApp",
      "Brasas em WebGL no hero e logo reconstruído em vetor",
      "Status aberto/fechado calculado pelo horário de São Paulo",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "Motion", "WebGL"],
  },
  {
    id: "portinha",
    short: "poRtinha",
    name: "poRtinha A Hamburgueria",
    segment: "Hamburgueria",
    city: "Guarulhos, SP",
    year: "2026",
    url: "https://portinha-hamburgueria.vercel.app",
    repo: "https://github.com/victorazzuli/portinha-hamburgueria",
    color: "#D7362B",
    summary: "Hambúrguer na brasa em tela cheia: o site usa os vídeos da própria casa e leva o pedido pronto ao WhatsApp.",
    highlights: [
      "Hero e seções com vídeos reprocessados dos reels oficiais",
      "Sacola com combos e adicionais, pedido completo no WhatsApp",
      "Aviso automático quando a casa está fechada",
      "Animações próprias, sem biblioteca, respeitando reduzir movimento",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "CSS", "Vídeo"],
  },
  {
    id: "odonto-partners",
    short: "Odonto Partners",
    name: "Odonto Partners",
    segment: "Clínica-escola de odontologia",
    city: "São Paulo, SP",
    year: "2026",
    url: "https://odonto-partners.vercel.app",
    repo: "https://github.com/victorazzuli/odonto-partners",
    color: "#C9C6BF",
    summary: "Redesign do site institucional em WordPress para uma clínica-escola de harmonização orofacial e odontologia.",
    highlights: [
      "Cursos com status calculado automaticamente pela data da turma",
      "Professores, depoimentos, galeria e blog em arquivos de dados tipados",
      "Redirecionamentos 308 do site antigo para não perder o Google",
      "Direção de arte editorial com tipografia serifada",
    ],
    stack: ["Next.js", "React 19", "TypeScript", "Tailwind", "Motion"],
  },
  {
    id: "vm-imoveis",
    short: "VM Imóveis",
    name: "VM Imóveis",
    segment: "Imobiliária",
    city: "Guarulhos, SP",
    year: "2026",
    url: "https://vm-imoveis.vercel.app",
    repo: "https://github.com/victorazzuli/vm-imoveis",
    color: "#B8935A",
    summary: "Catálogo de imóveis com busca, filtros e mapa, gerado a partir dos anúncios oficiais da imobiliária.",
    highlights: [
      "Catálogo com busca, filtros e mapa por bairro",
      "253 páginas estáticas geradas a partir dos anúncios",
      "Formulários com envio para webhook ou finalização pelo WhatsApp",
      "SEO e acessibilidade WCAG AA",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "SEO"],
  },
];
