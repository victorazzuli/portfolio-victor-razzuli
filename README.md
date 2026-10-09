# Portfólio — Victor Razzuli

Next.js 15 · React 19 · TypeScript · Tailwind · Motion · React Three Fiber (three.js).

```bash
npm install
npm run dev
```

## Editar
| O quê | Arquivo |
|---|---|
| Nome, cargo, e-mail, GitHub, WhatsApp, stack, processo | `src/data/profile.ts` |
| Projetos (texto, destaques, stack, links, cor) | `src/data/projects.ts` |
| Prints dos sites | `public/shots/<id>-desk.webp`, `<id>-mob.webp`, `<id>-tex.jpg` (textura do carrossel 3D) |

Para adicionar um projeto: inclua no `PROJECTS` e gere os 3 prints. Ele aparece sozinho na rede neural, no carrossel e nos cases.

## WhatsApp
Defina `NEXT_PUBLIC_WHATSAPP` (só números com DDI) na Vercel. Sem ele, o botão fica oculto.

## 3D
- `src/components/three/NeuralNet.tsx`: rede neural do hero; os nós de saída são os projetos.
- `src/components/three/Carousel3D.tsx`: carrossel das telas reais.
Os dois carregam sob demanda, param fora da tela, respeitam "reduzir movimento" e têm versão sem WebGL.
