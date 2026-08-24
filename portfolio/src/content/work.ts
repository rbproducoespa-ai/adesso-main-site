import type { Localized } from "@/lib/i18n";
import type { DivisionSlug } from "./divisions";

/**
 * Case studies.
 *
 * `status` is deliberate:
 *   "published"   — real project, real copy, safe to show a client.
 *   "placeholder" — the structure is right but the specifics are missing.
 *                   Renders with a visible PLACEHOLDER badge so nothing
 *                   unverified ever ships looking finished.
 *
 * TODO(bruno): work through the placeholders. For each one you need
 *   1. a hero image at 1600×1200 in /public/work/,
 *   2. the client name (or "confidential client" if under NDA),
 *   3. one measurable outcome — square metres, show name, lead count, hours saved.
 * Then flip `status` to "published".
 */

export interface WorkItem {
  id: string;
  divisions: DivisionSlug[];
  status: "published" | "placeholder";
  title: string;
  year: string;
  meta: Localized<string>;
  summary: Localized<string>;
  tags: string[];
  /** Path under /public. Null renders a labelled empty plate. */
  image: string | null;
  /** Shown inside the empty plate so you know what to drop in. */
  imageNote: Localized<string>;
}

export const work: WorkItem[] = [
  /* ── AI & Technology ───────────────────────────────────────────────── */
  {
    id: "adesso-platform",
    divisions: ["ai"],
    status: "published",
    title: "Adesso — exhibition industry platform",
    year: "2026",
    meta: {
      en: "Product design and build · Next.js, TypeScript, Supabase",
      pt: "Concepção e construção · Next.js, TypeScript, Supabase",
    },
    summary: {
      en: "A platform for the exhibition sector with a full operations panel behind it: CRM and contacts, shared inbox, WhatsApp conversation flows, orders and e-commerce, blog and media library, SEO controls and role-based access. Built as a multi-language site with server-rendered pages and an editable content layer.",
      pt: "Uma plataforma para o setor de exposições com um painel de operação completo atrás: CRM e contatos, inbox compartilhada, fluxos de conversa no WhatsApp, pedidos e e-commerce, blog e biblioteca de mídia, controles de SEO e permissões por papel. Site multilíngue, com páginas renderizadas no servidor e camada de conteúdo editável.",
    },
    tags: ["Next.js", "Supabase", "TypeScript", "Tailwind", "CRM", "WhatsApp"],
    image: null,
    imageNote: {
      en: "Screenshot of the admin dashboard — 1600×1200",
      pt: "Captura do painel administrativo — 1600×1200",
    },
  },
  {
    id: "rl-paint-os",
    divisions: ["ai", "creative"],
    status: "placeholder",
    title: "RL Paint — brand site and operations system",
    year: "2026",
    meta: {
      en: "Identity, website and internal system",
      pt: "Identidade, site e sistema interno",
    },
    summary: {
      en: "A brand site for a painting and decorating company, plus the internal system behind it for quotes, jobs and scheduling.",
      pt: "Site de marca para uma empresa de pintura e decoração, mais o sistema interno por trás para orçamentos, obras e agenda.",
    },
    tags: ["Next.js", "Branding", "Internal tools"],
    image: null,
    imageNote: {
      en: "Homepage and one system screen, side by side — 1600×1200",
      pt: "Home e uma tela do sistema, lado a lado — 1600×1200",
    },
  },
  {
    id: "fomenta",
    divisions: ["ai"],
    status: "placeholder",
    title: "FOMENTA — funding radar and matcher",
    year: "2026",
    meta: {
      en: "Data collection and matching engine",
      pt: "Coleta de dados e motor de correspondência",
    },
    summary: {
      en: "A system that collects public funding calls, structures them, and matches them against an organisation's profile so nothing relevant is missed.",
      pt: "Um sistema que coleta editais públicos, estrutura os dados e cruza com o perfil da organização para que nada relevante passe batido.",
    },
    tags: ["Automation", "Data", "AI matching"],
    image: null,
    imageNote: {
      en: "Matcher results screen — 1600×1200",
      pt: "Tela de resultados do matcher — 1600×1200",
    },
  },

  /* ── Exhibition & 3D ───────────────────────────────────────────────── */
  {
    id: "stand-project-01",
    divisions: ["exhibition"],
    status: "placeholder",
    title: "Exhibition stand — concept to production",
    year: "",
    meta: {
      en: "Concept, 3D and production drawings",
      pt: "Conceito, 3D e desenhos de produção",
    },
    summary: {
      en: "Pick your strongest stand. Say the show, the stand size in square metres, the build system, and one thing that was difficult and got solved.",
      pt: "Escolha o seu stand mais forte. Diga a feira, a metragem, o sistema construtivo e uma coisa que era difícil e foi resolvida.",
    },
    tags: ["SketchUp", "AutoCAD", "Production drawings"],
    image: null,
    imageNote: {
      en: "Render, and ideally the built stand beside it — 1600×1200",
      pt: "Render e, de preferência, o stand montado ao lado — 1600×1200",
    },
  },
  {
    id: "stand-project-02",
    divisions: ["exhibition"],
    status: "placeholder",
    title: "beMatrix stand — modular specification",
    year: "",
    meta: {
      en: "beMatrix frame specification and infill schedule",
      pt: "Especificação de perfil beMatrix e mapa de preenchimento",
    },
    summary: {
      en: "A beMatrix job shows a builder you speak their system. Give the frame count, the infill breakdown and the install time.",
      pt: "Um job em beMatrix mostra ao montador que você fala o sistema dele. Informe a contagem de perfis, o detalhamento do preenchimento e o tempo de montagem.",
    },
    tags: ["beMatrix", "Modular", "Technical drawing"],
    image: null,
    imageNote: {
      en: "Frame layout drawing plus the built result — 1600×1200",
      pt: "Desenho do frame e o resultado montado — 1600×1200",
    },
  },
  {
    id: "ledskin-repair",
    divisions: ["exhibition"],
    status: "placeholder",
    title: "LEDskin — diagnostics and repair",
    year: "",
    meta: {
      en: "Fault diagnosis, panel repair, on-site recovery",
      pt: "Diagnóstico de falha, reparo de painel, recuperação no local",
    },
    summary: {
      en: "This is the rarest thing you do and almost nobody can show it. Describe one failure you diagnosed and fixed, ideally under show pressure, and how long it took.",
      pt: "Essa é a coisa mais rara que você faz e quase ninguém consegue mostrar. Descreva uma falha que você diagnosticou e resolveu, de preferência sob pressão de feira, e em quanto tempo.",
    },
    tags: ["LEDskin", "beMatrix", "Diagnostics"],
    image: null,
    imageNote: {
      en: "Panel detail or the wall running after the fix — 1600×1200",
      pt: "Detalhe do painel ou a parede funcionando depois do reparo — 1600×1200",
    },
  },

  /* ── Creative & Digital ────────────────────────────────────────────── */
  {
    id: "exhibition-graphics",
    divisions: ["creative"],
    status: "placeholder",
    title: "Exhibition graphics — large format",
    year: "",
    meta: {
      en: "Print-ready artwork and panel schedule",
      pt: "Arte pronta para impressão e mapa de painéis",
    },
    summary: {
      en: "Show a graphics set that went to print without a single file coming back. Name the substrate and the print method.",
      pt: "Mostre um conjunto de gráfica que foi para impressão sem um arquivo voltar. Cite o substrato e o método de impressão.",
    },
    tags: ["Illustrator", "Large format", "Prepress"],
    image: null,
    imageNote: {
      en: "Installed graphics on the stand — 1600×1200",
      pt: "Gráfica instalada no stand — 1600×1200",
    },
  },
  {
    id: "social-growth",
    divisions: ["creative"],
    status: "placeholder",
    title: "Social content and growth",
    year: "2026",
    meta: {
      en: "Content system and paid distribution",
      pt: "Sistema de conteúdo e distribuição paga",
    },
    summary: {
      en: "Content strategy and creative for a business account, with paid distribution behind it. Add the before and after numbers you are comfortable publishing.",
      pt: "Estratégia e criação de conteúdo para uma conta comercial, com distribuição paga por trás. Acrescente os números de antes e depois que você se sentir à vontade para publicar.",
    },
    tags: ["Content", "Meta Ads", "Video"],
    image: null,
    imageNote: {
      en: "Grid of the best posts — 1600×1200",
      pt: "Grade com os melhores posts — 1600×1200",
    },
  },

  /* ── Audio ─────────────────────────────────────────────────────────── */
  {
    id: "live-production",
    divisions: ["audio"],
    status: "placeholder",
    title: "Live sound and technical production",
    year: "",
    meta: {
      en: "Front of house and system alignment",
      pt: "PA e alinhamento de sistema",
    },
    summary: {
      en: "Years of technical production for touring acts and regional festivals, on house and hired systems. Name the venue capacity and the desks you ran.",
      pt: "Anos de produção técnica para artistas em turnê e festivais regionais, em sistemas de casa e alugados. Cite a capacidade da casa e as mesas que você operou.",
    },
    tags: ["FOH", "DiGiCo", "System alignment"],
    image: null,
    imageNote: {
      en: "You at the desk, or the room from FOH — 1600×1200",
      pt: "Você na mesa, ou a sala vista do PA — 1600×1200",
    },
  },
  {
    id: "studio-work",
    divisions: ["audio"],
    status: "placeholder",
    title: "Studio recording and production",
    year: "",
    meta: {
      en: "Recording, mixing and mastering",
      pt: "Gravação, mixagem e masterização",
    },
    summary: {
      en: "Link two or three tracks people can actually listen to. A player beats a paragraph in this section.",
      pt: "Coloque duas ou três faixas que dá para ouvir de verdade. Um player vale mais que um parágrafo aqui.",
    },
    tags: ["Recording", "Mixing", "Mastering"],
    image: null,
    imageNote: {
      en: "Optional — an embedded player works better here",
      pt: "Opcional — um player embutido funciona melhor aqui",
    },
  },
];

export function workForDivision(slug: DivisionSlug): WorkItem[] {
  return work.filter((w) => w.divisions.includes(slug));
}
