import type { Localized } from "@/lib/i18n";

export type DivisionSlug =
  | "exhibition"
  | "creative"
  | "ai"
  | "audio"
  | "local-services";

export interface CapabilityGroup {
  title: string;
  items: string[];
}

export interface EngagementLine {
  label: string;
  value: string;
}

export interface Division {
  slug: DivisionSlug;
  /** Sheet number shown as an annotation, like a drawing reference. */
  number: string;
  /** Key into the [data-accent] palette in globals.css. */
  accent: "exhibition" | "creative" | "ai" | "audio" | "local";
  /**
   * Hidden divisions are excluded from the hub, the nav and the sitemap, and
   * are served with noindex. Reachable only by direct link.
   */
  hidden: boolean;
  name: Localized<string>;
  /** One line naming who the page is for. */
  audience: Localized<string>;
  headline: Localized<string>;
  intro: Localized<string>;
  deliverables: Localized<string[]>;
  capabilities: Localized<CapabilityGroup[]>;
  /** Proper nouns — deliberately not translated. */
  tools: string[];
  process: Localized<{ step: string; body: string }[]>;
  engagement: Localized<{ note: string; lines: EngagementLine[] }>;
  seo: Localized<{ title: string; description: string }>;
}

export const divisions: Division[] = [
  /* ── 01 ─────────────────────────────────────────────────────────────── */
  {
    slug: "exhibition",
    number: "01",
    accent: "exhibition",
    hidden: false,
    name: {
      en: "Exhibition & 3D",
      pt: "Exhibition & 3D",
    },
    audience: {
      en: "For stand builders, event agencies and brands exhibiting across Europe and the Gulf.",
      pt: "Para stand builders, agências de eventos e marcas que expõem na Europa e no Golfo.",
    },
    headline: {
      en: "Stand concepts that survive contact with the workshop.",
      pt: "Projetos de stand que sobrevivem ao contato com a marcenaria.",
    },
    intro: {
      en: "Most exhibition drawings look good and build badly. Mine build, because I spent years on the floor installing what other people drew — and then what I drew. Concept through production drawings, delivered remotely on the builder's timeline.",
      pt: "A maioria dos desenhos de stand fica bonita e monta mal. Os meus montam, porque passei anos no piso da feira instalando o que os outros desenhavam — e depois o que eu desenhava. Do conceito ao desenho de produção, entregue remotamente no prazo do montador.",
    },
    deliverables: {
      en: [
        "Concept & layout",
        "3D renders",
        "Floor plans",
        "Production drawings",
        "beMatrix specification",
        "Print-ready artwork",
      ],
      pt: [
        "Conceito e layout",
        "Renders 3D",
        "Plantas",
        "Desenhos de produção",
        "Especificação beMatrix",
        "Arte pronta para impressão",
      ],
    },
    capabilities: {
      en: [
        {
          title: "Concept & spatial design",
          items: [
            "Stand layout, zoning and visitor flow",
            "Space planning against hall regulations",
            "Concept options for client approval",
          ],
        },
        {
          title: "3D visualisation",
          items: [
            "Client-ready renders in SketchUp and Twinmotion",
            "Material, lighting and finish studies",
            "Walkthrough views for sales presentations",
          ],
        },
        {
          title: "Technical documentation",
          items: [
            "Production drawings in AutoCAD and Autodesk Inventor",
            "Assembly detail, cut lists and panel schedules",
            "Revisions issued against build feedback",
          ],
        },
        {
          title: "Modular systems & LED",
          items: [
            "beMatrix frame specification and infill schedules",
            "LEDskin integration, pitch and panel layout",
            "Diagnostics and repair guidance for LED walls",
          ],
        },
      ],
      pt: [
        {
          title: "Conceito e projeto espacial",
          items: [
            "Layout do stand, zoneamento e fluxo de visitantes",
            "Planejamento do espaço conforme o regulamento do pavilhão",
            "Opções de conceito para aprovação do cliente",
          ],
        },
        {
          title: "Visualização 3D",
          items: [
            "Renders prontos para cliente em SketchUp e Twinmotion",
            "Estudos de material, iluminação e acabamento",
            "Vistas de percurso para apresentação comercial",
          ],
        },
        {
          title: "Documentação técnica",
          items: [
            "Desenhos de produção em AutoCAD e Autodesk Inventor",
            "Detalhe de montagem, lista de corte e mapa de painéis",
            "Revisões emitidas conforme retorno da produção",
          ],
        },
        {
          title: "Sistemas modulares e LED",
          items: [
            "Especificação de perfil beMatrix e mapa de preenchimento",
            "Integração LEDskin, pitch e disposição de painéis",
            "Diagnóstico e orientação de reparo de painel de LED",
          ],
        },
      ],
    },
    tools: ["SketchUp", "Twinmotion", "AutoCAD", "Autodesk Inventor", "beMatrix", "Illustrator", "Photoshop"],
    process: {
      en: [
        { step: "Brief", body: "Show date, space dimensions, hall regulations, budget band and brand assets. That is enough to start." },
        { step: "Concept", body: "Two layout directions with indicative 3D, inside three working days." },
        { step: "Development", body: "Chosen direction taken to client-ready renders, with material and lighting resolved." },
        { step: "Production", body: "Technical drawings, panel schedules and print-ready artwork issued to the builder." },
        { step: "Support", body: "Revisions during build, and I stay reachable through install week." },
      ],
      pt: [
        { step: "Briefing", body: "Data da feira, dimensões do espaço, regulamento do pavilhão, faixa de orçamento e marca. Isso já basta." },
        { step: "Conceito", body: "Duas direções de layout com 3D indicativo, em até três dias úteis." },
        { step: "Desenvolvimento", body: "A direção escolhida vira render pronto para cliente, com material e luz resolvidos." },
        { step: "Produção", body: "Desenhos técnicos, mapa de painéis e arte pronta para impressão entregues ao montador." },
        { step: "Suporte", body: "Revisões durante a produção, e fico acessível durante a semana de montagem." },
      ],
    },
    engagement: {
      en: {
        note: "Priced per deliverable with a fixed scope, not per day — so you know the number before it starts.",
        lines: [
          { label: "Concept package", value: "from £450" },
          { label: "Concept + 3D + production drawings", value: "from £1,400" },
          { label: "Full show package with digital layer", value: "from £2,400" },
          { label: "Overflow support for agencies", value: "by arrangement" },
        ],
      },
      pt: {
        note: "Preço por entregável com escopo fechado, não por dia — você sabe o número antes de começar.",
        lines: [
          { label: "Pacote de conceito", value: "a partir de £450" },
          { label: "Conceito + 3D + desenhos de produção", value: "a partir de £1.400" },
          { label: "Pacote completo de feira com camada digital", value: "a partir de £2.400" },
          { label: "Apoio de overflow para agências", value: "sob combinação" },
        ],
      },
    },
    seo: {
      en: {
        title: "Exhibition & 3D Designer — beMatrix, SketchUp, Production Drawings",
        description:
          "Freelance exhibition stand designer based in London. Concept, 3D visualisation, technical and production drawings, beMatrix specification and LEDskin integration. Remote, worldwide.",
      },
      pt: {
        title: "Exhibition & 3D Designer — beMatrix, SketchUp, Desenhos de Produção",
        description:
          "Designer de stands freelance baseado em Londres. Conceito, visualização 3D, desenhos técnicos e de produção, especificação beMatrix e integração LEDskin. Remoto, mundo todo.",
      },
    },
  },

  /* ── 02 ─────────────────────────────────────────────────────────────── */
  {
    slug: "creative",
    number: "02",
    accent: "creative",
    hidden: false,
    name: {
      en: "Creative & Digital",
      pt: "Creative & Digital",
    },
    audience: {
      en: "For agencies, printers and brands who need artwork a production house accepts first time.",
      pt: "Para agências, gráficas e marcas que precisam de arte que a produção aceita de primeira.",
    },
    headline: {
      en: "Artwork that is already ready for print.",
      pt: "Arte que já sai pronta para impressão.",
    },
    intro: {
      en: "A designer who has never stood next to a large-format printer will send files that come back. I have specified, prepped and installed the graphics I designed — bleed, colour, substrate, panel splits and all. That saves a round trip on every job.",
      pt: "Designer que nunca esteve ao lado de uma impressora de grande formato manda arquivo que volta. Eu especifiquei, preparei e instalei as artes que desenhei — sangria, cor, substrato, divisão de painel, tudo. Isso economiza uma ida e volta em cada job.",
    },
    deliverables: {
      en: [
        "Brand identity",
        "Large-format graphics",
        "Exhibition artwork",
        "Brochures & print",
        "Social assets",
        "Video & motion",
      ],
      pt: [
        "Identidade de marca",
        "Gráfica de grande formato",
        "Arte para exposição",
        "Brochuras e impressos",
        "Peças para redes",
        "Vídeo e motion",
      ],
    },
    capabilities: {
      en: [
        {
          title: "Brand & identity",
          items: ["Logo and identity systems", "Brand guidelines for applied use", "Sales and presentation material"],
        },
        {
          title: "Print & large format",
          items: [
            "Print-ready artwork with correct bleed and colour",
            "Substrate and finish specification",
            "Panel schedules and split artwork for oversized graphics",
          ],
        },
        {
          title: "Exhibition graphics",
          items: ["Stand graphics mapped to the build drawing", "Signage and wayfinding", "Backwall, fascia and totem artwork"],
        },
        {
          title: "Video & motion",
          items: ["Editing in Premiere Pro", "Motion graphics in After Effects", "Screen content and loops for stands"],
        },
      ],
      pt: [
        {
          title: "Marca e identidade",
          items: ["Logo e sistema de identidade", "Manual de marca para uso aplicado", "Material comercial e de apresentação"],
        },
        {
          title: "Impressão e grande formato",
          items: [
            "Arte pronta com sangria e cor corretas",
            "Especificação de substrato e acabamento",
            "Mapa de painéis e arte dividida para gráficas grandes",
          ],
        },
        {
          title: "Gráfica para exposição",
          items: ["Arte do stand amarrada ao desenho de produção", "Sinalização e orientação", "Arte de backwall, testeira e totem"],
        },
        {
          title: "Vídeo e motion",
          items: ["Edição em Premiere Pro", "Motion graphics em After Effects", "Conteúdo de tela e loops para stand"],
        },
      ],
    },
    tools: ["Photoshop", "Illustrator", "InDesign", "After Effects", "Premiere Pro"],
    process: {
      en: [
        { step: "Brief", body: "Format, substrate, print method and deadline. Supplied brand assets if they exist." },
        { step: "Draft", body: "First round for review, at working resolution." },
        { step: "Artwork", body: "Production files with bleed, marks, correct colour space and a spec sheet." },
        { step: "Handover", body: "Packaged files plus a note to the printer on anything unusual." },
      ],
      pt: [
        { step: "Briefing", body: "Formato, substrato, método de impressão e prazo. Marca existente, se houver." },
        { step: "Rascunho", body: "Primeira rodada para revisão, em resolução de trabalho." },
        { step: "Arte final", body: "Arquivos de produção com sangria, marcas, espaço de cor correto e ficha técnica." },
        { step: "Entrega", body: "Arquivos empacotados e um bilhete para a gráfica sobre qualquer detalhe fora do padrão." },
      ],
    },
    engagement: {
      en: {
        note: "Per piece for defined work, day rate for a run of artwork or agency overflow.",
        lines: [
          { label: "Identity package", value: "from £600" },
          { label: "Exhibition graphics set", value: "from £350" },
          { label: "Artwork day rate", value: "£280 / day" },
          { label: "Video edit", value: "from £180" },
        ],
      },
      pt: {
        note: "Por peça para trabalho definido, day rate para lote de arte ou overflow de agência.",
        lines: [
          { label: "Pacote de identidade", value: "a partir de £600" },
          { label: "Conjunto de gráfica de stand", value: "a partir de £350" },
          { label: "Day rate de arte final", value: "£280 / dia" },
          { label: "Edição de vídeo", value: "a partir de £180" },
        ],
      },
    },
    seo: {
      en: {
        title: "Graphic Designer & Artworker — Large Format, Exhibition, Print-Ready",
        description:
          "Freelance graphic designer and artworker in London. Brand identity, large-format and exhibition graphics, print-ready artwork, video and motion. Production experience, not just design.",
      },
      pt: {
        title: "Designer Gráfico e Arte-Finalista — Grande Formato e Exposições",
        description:
          "Designer gráfico e arte-finalista freelance em Londres. Identidade, gráfica de grande formato e de exposição, arte pronta para impressão, vídeo e motion.",
      },
    },
  },

  /* ── 03 ─────────────────────────────────────────────────────────────── */
  {
    slug: "ai",
    number: "03",
    accent: "ai",
    hidden: false,
    name: {
      en: "AI & Technology",
      pt: "AI & Technology",
    },
    audience: {
      en: "For small companies and agencies whose operations still run on spreadsheets, inboxes and WhatsApp.",
      pt: "Para pequenas empresas e agências cuja operação ainda roda em planilha, e-mail e WhatsApp.",
    },
    headline: {
      en: "Internal systems that remove the repetitive work.",
      pt: "Sistemas internos que tiram o trabalho repetitivo.",
    },
    intro: {
      en: "I started building this because I needed it myself: a way to track leads from a show, chase them automatically, and see the pipeline in one place. What came out was a full operations panel — CRM, shared inbox, WhatsApp flows, orders, roles. I build the same thing for other people now.",
      pt: "Comecei a construir isso porque eu mesmo precisava: um jeito de acompanhar lead de feira, fazer o follow-up sozinho e ver o pipeline num lugar só. O que saiu foi um painel de operação completo — CRM, inbox compartilhada, fluxos de WhatsApp, pedidos, permissões. Hoje construo o mesmo para outras pessoas.",
    },
    deliverables: {
      en: [
        "Internal dashboards",
        "CRM & pipeline",
        "WhatsApp automation",
        "Workflow automation",
        "Websites & landing pages",
        "Tracking & reporting",
      ],
      pt: [
        "Painéis internos",
        "CRM e pipeline",
        "Automação de WhatsApp",
        "Automação de processo",
        "Sites e landing pages",
        "Rastreamento e relatórios",
      ],
    },
    capabilities: {
      en: [
        {
          title: "Business systems",
          items: [
            "CRM, contacts and pipeline tracking",
            "Shared inbox, orders and role-based access",
            "Operational dashboards built on real data",
          ],
        },
        {
          title: "Workflow automation",
          items: [
            "n8n workflows and AI agent pipelines",
            "API integrations between the tools you already pay for",
            "Automated follow-up sequences and lead routing",
          ],
        },
        {
          title: "Web",
          items: [
            "Next.js, TypeScript, Tailwind and Supabase",
            "WordPress and Elementor where that fits better",
            "Multi-language sites with real indexable URLs",
          ],
        },
        {
          title: "Marketing systems",
          items: [
            "Meta and Google Ads set-up and tracking",
            "Conversion tracking, pixels and analytics",
            "Local SEO and lead capture",
          ],
        },
      ],
      pt: [
        {
          title: "Sistemas de negócio",
          items: [
            "CRM, contatos e acompanhamento de pipeline",
            "Inbox compartilhada, pedidos e permissões por papel",
            "Painéis de operação construídos sobre dado real",
          ],
        },
        {
          title: "Automação de processo",
          items: [
            "Workflows em n8n e pipelines de agentes de IA",
            "Integração via API entre as ferramentas que você já paga",
            "Sequências de follow-up automático e roteamento de lead",
          ],
        },
        {
          title: "Web",
          items: [
            "Next.js, TypeScript, Tailwind e Supabase",
            "WordPress e Elementor quando faz mais sentido",
            "Site multilíngue com URL real e indexável",
          ],
        },
        {
          title: "Sistemas de marketing",
          items: [
            "Configuração e rastreamento de Meta e Google Ads",
            "Conversão, pixels e analytics",
            "SEO local e captura de lead",
          ],
        },
      ],
    },
    tools: ["Next.js", "TypeScript", "Supabase", "Tailwind", "n8n", "Claude Code", "WordPress", "Vercel"],
    process: {
      en: [
        { step: "Map", body: "One call to trace the process that is costing you hours, end to end." },
        { step: "Scope", body: "A written scope with a fixed price and a delivery date. No hourly meter." },
        { step: "Build", body: "Delivered in working increments you can see, not a black box." },
        { step: "Handover", body: "You own the code and the accounts. Documentation included." },
        { step: "Maintain", body: "Optional monthly support for changes, monitoring and fixes." },
      ],
      pt: [
        { step: "Mapear", body: "Uma call para desenhar de ponta a ponta o processo que está custando horas." },
        { step: "Escopo", body: "Escopo escrito com preço fechado e data de entrega. Sem relógio por hora." },
        { step: "Construir", body: "Entregue em incrementos que você consegue ver, não numa caixa-preta." },
        { step: "Entrega", body: "O código e as contas são seus. Documentação incluída." },
        { step: "Manutenção", body: "Suporte mensal opcional para mudanças, monitoramento e correções." },
      ],
    },
    engagement: {
      en: {
        note: "Fixed scope, fixed price. Monthly support is optional and separate.",
        lines: [
          { label: "Single automation", value: "from £250" },
          { label: "Website with lead capture", value: "from £900" },
          { label: "Internal system", value: "from £1,600" },
          { label: "Monthly support", value: "from £80 / month" },
        ],
      },
      pt: {
        note: "Escopo fechado, preço fechado. Suporte mensal é opcional e separado.",
        lines: [
          { label: "Automação avulsa", value: "a partir de £250" },
          { label: "Site com captura de lead", value: "a partir de £900" },
          { label: "Sistema interno", value: "a partir de £1.600" },
          { label: "Suporte mensal", value: "a partir de £80 / mês" },
        ],
      },
    },
    seo: {
      en: {
        title: "AI Automation & Business Systems — n8n, Next.js, Internal Tools",
        description:
          "Freelance AI automation and business systems developer in London. Internal dashboards, CRM, WhatsApp flows, n8n workflows, Next.js and Supabase applications. Fixed-scope projects.",
      },
      pt: {
        title: "Automação com IA e Sistemas de Negócio — n8n, Next.js",
        description:
          "Desenvolvedor freelance de automação com IA e sistemas internos em Londres. Painéis, CRM, fluxos de WhatsApp, workflows n8n, aplicações Next.js e Supabase. Projetos com escopo fechado.",
      },
    },
  },

  /* ── 04 ─────────────────────────────────────────────────────────────── */
  {
    slug: "audio",
    number: "04",
    accent: "audio",
    hidden: false,
    name: {
      en: "Audio Technology",
      pt: "Audio Technology",
    },
    audience: {
      en: "For podcasts, studios, venues and churches — remote worldwide, on-site in the UK.",
      pt: "Para podcasts, estúdios, casas de show e igrejas — remoto no mundo todo, presencial no UK.",
    },
    headline: {
      en: "Years behind the console, on both sides of it.",
      pt: "Anos atrás da mesa, dos dois lados dela.",
    },
    intro: {
      en: "I came up as a touring drummer, then went to the other side of the console — front of house, system alignment, studio recording. Trained on DiGiCo, Soundcraft and Yamaha in London. Knowing what a room does to a mix is the part you cannot learn from a plugin.",
      pt: "Comecei como baterista de estrada, depois passei para o outro lado da mesa — PA, alinhamento de sistema, gravação em estúdio. Formação DiGiCo, Soundcraft e Yamaha em Londres. Saber o que a sala faz com a mix é a parte que plugin nenhum ensina.",
    },
    deliverables: {
      en: [
        "Editing & cleanup",
        "Mixing",
        "Mastering",
        "Podcast production",
        "Playback preparation",
        "System alignment",
      ],
      pt: [
        "Edição e limpeza",
        "Mixagem",
        "Masterização",
        "Produção de podcast",
        "Preparação de playback",
        "Alinhamento de sistema",
      ],
    },
    capabilities: {
      en: [
        {
          title: "Remote",
          items: [
            "Editing, mixing and mastering",
            "Noise reduction and audio restoration",
            "Podcast production, levelling and delivery",
            "Playback and backing-track preparation",
          ],
        },
        {
          title: "On-site, UK",
          items: [
            "Front of house on any desk",
            "System alignment and PA tuning",
            "Venue and church audio installation",
            "Technical production for live events",
          ],
        },
        {
          title: "Production",
          items: ["Studio recording", "Music production and arrangement", "Sound design"],
        },
      ],
      pt: [
        {
          title: "Remoto",
          items: [
            "Edição, mixagem e masterização",
            "Redução de ruído e restauração de áudio",
            "Produção de podcast, nivelamento e entrega",
            "Preparação de playback e base",
          ],
        },
        {
          title: "Presencial, UK",
          items: [
            "PA em qualquer mesa",
            "Alinhamento de sistema e ajuste de PA",
            "Instalação de áudio em casa de show e igreja",
            "Produção técnica para evento ao vivo",
          ],
        },
        {
          title: "Produção",
          items: ["Gravação em estúdio", "Produção e arranjo musical", "Sound design"],
        },
      ],
    },
    tools: ["DiGiCo", "Soundcraft", "Yamaha", "Pro Tools", "Ableton Live"],
    process: {
      en: [
        { step: "Send", body: "Raw files with a note on what you want it to sound like. Reference tracks help." },
        { step: "First pass", body: "A mix for review, delivered as a streamable link." },
        { step: "Revisions", body: "Two rounds included on every job." },
        { step: "Delivery", body: "Masters in the formats you need, with metadata done properly." },
      ],
      pt: [
        { step: "Enviar", body: "Arquivos brutos com um recado do som que você quer. Referência ajuda." },
        { step: "Primeira versão", body: "Uma mix para revisão, entregue em link para ouvir." },
        { step: "Revisões", body: "Duas rodadas incluídas em todo trabalho." },
        { step: "Entrega", body: "Masters nos formatos que você precisa, com metadados feitos direito." },
      ],
    },
    engagement: {
      en: {
        note: "Per track or per episode. On-site work is quoted by the day.",
        lines: [
          { label: "Podcast episode", value: "from £45" },
          { label: "Mix per track", value: "from £60" },
          { label: "Master per track", value: "from £30" },
          { label: "On-site, UK", value: "from £200 / day" },
        ],
      },
      pt: {
        note: "Por faixa ou por episódio. Trabalho presencial é orçado por dia.",
        lines: [
          { label: "Episódio de podcast", value: "a partir de £45" },
          { label: "Mixagem por faixa", value: "a partir de £60" },
          { label: "Masterização por faixa", value: "a partir de £30" },
          { label: "Presencial, UK", value: "a partir de £200 / dia" },
        ],
      },
    },
    seo: {
      en: {
        title: "Audio Engineer — Mixing, Mastering, Podcast Editing, Live Sound",
        description:
          "Freelance audio engineer in London. Remote editing, mixing, mastering and podcast production; on-site front of house, system alignment and venue installation across the UK.",
      },
      pt: {
        title: "Engenheiro de Áudio — Mixagem, Masterização, Podcast, Som ao Vivo",
        description:
          "Engenheiro de áudio freelance em Londres. Edição, mixagem, masterização e produção de podcast remotas; PA, alinhamento de sistema e instalação presencial no Reino Unido.",
      },
    },
  },

  /* ── 05 — hidden ────────────────────────────────────────────────────── */
  {
    slug: "local-services",
    number: "05",
    accent: "local",
    hidden: true,
    name: {
      en: "Trade Services",
      pt: "Serviços Locais",
    },
    audience: {
      en: "London and the South East. Direct, no agency in the middle.",
      pt: "Londres e Sudeste da Inglaterra. Direto, sem agência no meio.",
    },
    headline: {
      en: "Trade services, London and the South East.",
      pt: "Serviços de obra, Londres e Sudeste da Inglaterra.",
    },
    intro: {
      en: "Hands-on work, quoted directly. Same standard of finish as everything else here — the difference is I have to be in the room for it.",
      pt: "Trabalho de mão na massa, orçado direto. O mesmo padrão de acabamento do resto — a diferença é que preciso estar no local.",
    },
    deliverables: {
      en: [
        "Painting & decorating",
        "Soundproofing installation",
        "Exhibition install",
        "LED panel install & repair",
        "Signage install",
        "AV technician",
      ],
      pt: [
        "Pintura e decoração",
        "Instalação de isolamento acústico",
        "Montagem de stand",
        "Instalação e reparo de painel LED",
        "Instalação de sinalização",
        "Técnico de AV",
      ],
    },
    capabilities: {
      en: [
        {
          title: "Interiors",
          items: ["Painting and decorating, residential and commercial", "Soundproofing installation for rooms and studios", "Making good and finishing"],
        },
        {
          title: "Exhibition & events",
          items: ["Stand build and install", "LED panel install, diagnostics and repair", "Signage and graphics install", "AV technician on site"],
        },
      ],
      pt: [
        {
          title: "Interiores",
          items: ["Pintura e decoração, residencial e comercial", "Instalação de isolamento acústico para salas e estúdios", "Reparos e acabamento"],
        },
        {
          title: "Exposições e eventos",
          items: ["Montagem e instalação de stand", "Instalação, diagnóstico e reparo de painel LED", "Instalação de sinalização e gráfica", "Técnico de AV no local"],
        },
      ],
    },
    tools: [],
    process: {
      en: [
        { step: "Site", body: "Send photos and measurements, or I visit if it is close." },
        { step: "Quote", body: "Written quote with a fixed price and a start date." },
        { step: "Work", body: "Clean site, agreed hours, no surprises on the invoice." },
      ],
      pt: [
        { step: "Local", body: "Mande fotos e medidas, ou eu visito se for perto." },
        { step: "Orçamento", body: "Orçamento escrito com preço fechado e data de início." },
        { step: "Execução", body: "Obra limpa, horário combinado, sem surpresa na fatura." },
      ],
    },
    engagement: {
      en: {
        note: "Quoted per job. Day rate available for install crews and event work.",
        lines: [
          { label: "Painting & decorating", value: "from £160 / day" },
          { label: "Soundproofing install", value: "quoted per room" },
          { label: "Exhibition & LED install", value: "from £220 / day" },
        ],
      },
      pt: {
        note: "Orçado por serviço. Day rate disponível para equipe de montagem e evento.",
        lines: [
          { label: "Pintura e decoração", value: "a partir de £160 / dia" },
          { label: "Isolamento acústico", value: "orçado por sala" },
          { label: "Montagem de stand e LED", value: "a partir de £220 / dia" },
        ],
      },
    },
    seo: {
      en: {
        title: "Trade Services — London",
        description: "Painting, soundproofing, exhibition and LED installation in London and the South East.",
      },
      pt: {
        title: "Serviços Locais — Londres",
        description: "Pintura, isolamento acústico, montagem de stand e instalação de LED em Londres e região.",
      },
    },
  },
];

export const publicDivisions = divisions.filter((d) => !d.hidden);

export function getDivision(slug: string): Division | undefined {
  return divisions.find((d) => d.slug === slug);
}
