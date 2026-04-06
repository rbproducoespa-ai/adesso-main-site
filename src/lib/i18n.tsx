"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Locale = "en" | "pt";

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
}

const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Nav
    "nav.platform":    "Platform",
    "nav.technology":  "Technology",
    "nav.roadmap":     "Roadmap",
    "nav.why_adesso":  "Why Adesso",
    "nav.about":       "About",
    "nav.cta":         "Request Access",

    // Hero
    "hero.badge":      "Now in Early Access — UK Innovator Founder Programme",
    "hero.h1_line1":   "AI Infrastructure",
    "hero.h1_line2":   "for the Exhibition Industry",
    "hero.subtitle":   "Adesso is building a data-driven platform that enables companies to discover exhibition opportunities, generate AI-powered stand concepts, and deliver projects through intelligent automation — at scale.",
    "hero.cta_primary":   "Request Early Access",
    "hero.cta_secondary": "See the Platform →",
    "hero.stat1_value":   "€48B",
    "hero.stat1_label":   "Global Market",
    "hero.stat2_value":   "Manual",
    "hero.stat2_label":   "Current State",
    "hero.stat3_value":   "2026",
    "hero.stat3_label":   "UK Launch",

    // Positioning strip
    "positioning.strikethrough": "Not an agency. Not a freelancer.",
    "positioning.statement":     "A scalable technology platform transforming how exhibitions are planned and delivered.",

    // Problem
    "problem.label": "The Problem",
    "problem.h2":    "A Multi-Billion Industry Running on Manual Processes",
    "problem.body1": "The global exhibition industry generates over €48 billion in annual revenue. Yet the workflows that drive it — lead sourcing, stand design, contractor coordination, follow-up — remain entirely manual, fragmented, and disconnected.",
    "problem.body2": "Companies spend £40,000–£80,000 on a single exhibition stand with no digital strategy, no automated follow-up, and no intelligence layer to measure ROI. The problem isn't budget. It's infrastructure.",
    "problem.card1_title": "Fragmented Discovery",
    "problem.card1_body":  "No centralised system to identify the right exhibitions or target the right exhibitors. Sales teams rely on trade publications and word of mouth.",
    "problem.card2_title": "Slow Concept Cycles",
    "problem.card2_body":  "Stand design approval takes weeks of manual iteration, delaying sales cycles. Every revision requires designer time, email chains, and physical reviews.",
    "problem.card3_title": "Zero Commercial Layer",
    "problem.card3_body":  "Post-exhibition, companies have no automation to convert contacts into pipeline. Thousands of leads collected on stands go unworked.",

    // Solution
    "solution.label":    "The Solution",
    "solution.h2":       "A Unified Digital Layer for Exhibitions",
    "solution.body":     "Adesso integrates data intelligence, artificial intelligence, and workflow automation into a single platform. From opportunity discovery through to stand delivery and post-show pipeline management — in one system.",

    // Modules
    "modules.label":  "The Platform",
    "modules.h2":     "Four Modules. One Integrated System.",
    "modules.link":   "Full Platform Overview →",
    "modules.m01_title": "Exhibition Lead Intelligence",
    "modules.m01_body":  "Structured data from European exhibitions — exhibitor profiles, event insights, decision-maker contacts, and targeted lead scoring. Updated continuously.",
    "modules.m01_tag":   "Live",
    "modules.m02_title": "AI Stand Concept Generator",
    "modules.m02_body":  "Generate exhibition stand concepts using AI in minutes. Trained on thousands of exhibition environments. Accelerates sales cycles and client approval rates.",
    "modules.m02_tag":   "Beta",
    "modules.m03_title": "Automation & Pipeline CRM",
    "modules.m03_body":  "Unified system for managing leads, automating outreach sequences, and tracking project pipelines from initial contact to post-show follow-up.",
    "modules.m03_tag":   "Live",
    "modules.m04_title": "Exhibition Marketplace",
    "modules.m04_body":  "A two-sided marketplace connecting brands, stand designers, and builders across Europe. Verified supplier network with integrated project management.",
    "modules.m04_tag":   "2027",

    // Business model
    "biz.label": "Business Model",
    "biz.h2":    "Built for Scale",
    "biz.body":  "Adesso operates on a subscription-based model, providing tiered access to data intelligence, AI tools, and automation systems. Revenue is diversified across SaaS subscriptions, premium data services, and marketplace transaction fees.",
    "biz.p1_title": "SaaS Subscriptions",
    "biz.p1_body":  "Monthly and annual platform access across Starter, Growth, and Enterprise tiers. Recurring, predictable revenue from day one.",
    "biz.p2_title": "Data Products",
    "biz.p2_body":  "Premium lead databases, sector intelligence reports, and exhibitor data packs. High-margin data products sold independently of platform access.",
    "biz.p3_title": "Marketplace Fees",
    "biz.p3_body":  "Transaction-based revenue from supplier connections and project placements on the Exhibition Marketplace. Scales with platform usage and network growth.",

    // Traction
    "traction.label":   "Traction",
    "traction.h2":      "Early Signals",
    "traction.m1_val":  "3,200+",
    "traction.m1_lbl":  "Exhibition data points indexed",
    "traction.m2_val":  "€48B",
    "traction.m2_lbl":  "Addressable market",
    "traction.m3_val":  "47",
    "traction.m3_lbl":  "Early access registrations",
    "traction.m4_val":  "12",
    "traction.m4_lbl":  "Countries covered",
    "traction.quote":   "The exhibition industry is ready for this. We've been waiting for someone to build the infrastructure layer.",
    "traction.author":  "Beta User, UK Event Marketing Director",

    // Vision
    "vision.label":     "Vision",
    "vision.h2":        "Our Vision",
    "vision.statement": "To become the leading digital infrastructure powering the global exhibition industry.",

    // Founder
    "founder.label":  "Founder",
    "founder.name":   "Bruno Castro",
    "founder.title":  "Founder & CEO, Adesso",
    "founder.bio1":   "Bruno Castro spent over a decade working on European exhibition floors — managing stand builds, coordinating logistics, and helping B2B brands present at trade shows from London to Frankfurt.",
    "founder.bio2":   "What he identified was consistent: an industry generating billions annually with no digital infrastructure. No intelligence layer. No automation. No scalable systems.",
    "founder.bio3":   "Adesso was founded to build that infrastructure — starting with the UK, scaling across Europe.",
    "founder.cred1":  "10+ years exhibition industry experience",
    "founder.cred2":  "Technical specialist: CAD, LED systems, event production",
    "founder.cred3":  "UK-based, EU market expertise",
    "founder.cred4":  "Registered company: England & Wales",

    // CTA
    "cta.label":    "Early Access",
    "cta.h2":       "Join the Early Access Programme",
    "cta.body":     "Be among the first companies to access Adesso's platform. Limited early access available for UK and European exhibition professionals.",
    "cta.button":   "Request Early Access →",
    "cta.footnote": "No commitment. We'll reach out within 24 hours.",

    // Footer
    "footer.tagline":     "AI infrastructure for the exhibition industry. Data intelligence, AI-powered stand generation, and workflow automation — at scale.",
    "footer.copyright":   "All rights reserved.",
    "footer.registered":  "Registered in England & Wales",
    "footer.platform":    "Platform",
    "footer.company":     "Company",
    "footer.connect":     "Connect",
    "footer.privacy":     "Privacy Policy",
    "footer.terms":       "Terms of Use",
    "footer.request":     "Request Access",
  },

  pt: {
    // Nav
    "nav.platform":   "Plataforma",
    "nav.technology": "Tecnologia",
    "nav.roadmap":    "Roteiro",
    "nav.why_adesso": "Porquê Adesso",
    "nav.about":      "Sobre",
    "nav.cta":        "Pedir Acesso",

    // Hero
    "hero.badge":         "Agora em Acesso Antecipado — UK Innovator Founder Programme",
    "hero.h1_line1":      "Infraestrutura de IA",
    "hero.h1_line2":      "para a Indústria de Exposições",
    "hero.subtitle":      "A Adesso está a construir uma plataforma orientada por dados que permite às empresas descobrir oportunidades de exposição, gerar conceitos de stand com IA e entregar projetos através de automação inteligente — em escala.",
    "hero.cta_primary":   "Pedir Acesso Antecipado",
    "hero.cta_secondary": "Ver a Plataforma →",
    "hero.stat1_value":   "€48B",
    "hero.stat1_label":   "Mercado Global",
    "hero.stat2_value":   "Manual",
    "hero.stat2_label":   "Estado Atual",
    "hero.stat3_value":   "2026",
    "hero.stat3_label":   "Lançamento UK",

    // Positioning strip
    "positioning.strikethrough": "Não somos uma agência. Nem um freelancer.",
    "positioning.statement":     "Uma plataforma tecnológica escalável que transforma a forma como as exposições são planeadas e entregues.",

    // Problem
    "problem.label": "O Problema",
    "problem.h2":    "Uma Indústria de Milhares de Milhões a Funcionar em Processos Manuais",
    "problem.body1": "A indústria global de exposições gera mais de €48 mil milhões em receita anual. No entanto, os fluxos de trabalho que a movem — captação de leads, design de stand, coordenação de fornecedores, acompanhamento — continuam completamente manuais, fragmentados e desconectados.",
    "problem.body2": "As empresas gastam entre £40.000–£80.000 num único stand sem estratégia digital, sem acompanhamento automatizado e sem uma camada de inteligência para medir o ROI. O problema não é o orçamento. É a infraestrutura.",
    "problem.card1_title": "Descoberta Fragmentada",
    "problem.card1_body":  "Sem sistema centralizado para identificar as exposições certas ou os expositores certos. As equipas de vendas dependem de publicações do setor e passa-palavra.",
    "problem.card2_title": "Ciclos de Conceito Lentos",
    "problem.card2_body":  "A aprovação do design do stand demora semanas de iteração manual, atrasando os ciclos de vendas. Cada revisão exige tempo de designer, cadeias de email e revisões físicas.",
    "problem.card3_title": "Camada Comercial Zero",
    "problem.card3_body":  "Após a exposição, as empresas não têm automação para converter contactos em pipeline. Milhares de leads recolhidas nos stands ficam por trabalhar.",

    // Solution
    "solution.label":    "A Solução",
    "solution.h2":       "Uma Camada Digital Unificada para Exposições",
    "solution.body":     "A Adesso integra inteligência de dados, inteligência artificial e automação de fluxo de trabalho numa única plataforma. Desde a descoberta de oportunidades até à entrega do stand e gestão de pipeline pós-evento — num só sistema.",

    // Modules
    "modules.label": "A Plataforma",
    "modules.h2":    "Quatro Módulos. Um Sistema Integrado.",
    "modules.link":  "Ver Plataforma Completa →",
    "modules.m01_title": "Inteligência de Leads para Exposições",
    "modules.m01_body":  "Dados estruturados de exposições europeias — perfis de expositores, insights de eventos, contactos de decisores e pontuação de leads direcionada. Atualizado continuamente.",
    "modules.m01_tag":   "Ativo",
    "modules.m02_title": "Gerador de Conceitos de Stand com IA",
    "modules.m02_body":  "Gere conceitos de stand para exposições com IA em minutos. Treinado em milhares de ambientes de exposição. Acelera os ciclos de vendas e as taxas de aprovação do cliente.",
    "modules.m02_tag":   "Beta",
    "modules.m03_title": "Automação e CRM de Pipeline",
    "modules.m03_body":  "Sistema unificado para gerir leads, automatizar sequências de contacto e acompanhar pipelines de projetos desde o contacto inicial até ao acompanhamento pós-evento.",
    "modules.m03_tag":   "Ativo",
    "modules.m04_title": "Marketplace de Exposições",
    "modules.m04_body":  "Um marketplace bilateral que liga marcas, designers de stand e construtores em toda a Europa. Rede de fornecedores verificados com gestão de projetos integrada.",
    "modules.m04_tag":   "2027",

    // Business model
    "biz.label": "Modelo de Negócio",
    "biz.h2":    "Construído para Escalar",
    "biz.body":  "A Adesso opera num modelo baseado em subscrição, fornecendo acesso por níveis a inteligência de dados, ferramentas de IA e sistemas de automação. A receita é diversificada entre subscrições SaaS, serviços de dados premium e comissões de marketplace.",
    "biz.p1_title": "Subscrições SaaS",
    "biz.p1_body":  "Acesso mensal e anual à plataforma nos níveis Starter, Growth e Enterprise. Receita recorrente e previsível desde o primeiro dia.",
    "biz.p2_title": "Produtos de Dados",
    "biz.p2_body":  "Bases de dados de leads premium, relatórios de inteligência setorial e pacotes de dados de expositores. Produtos de dados de alta margem vendidos independentemente do acesso à plataforma.",
    "biz.p3_title": "Comissões de Marketplace",
    "biz.p3_body":  "Receita baseada em transações a partir de ligações entre fornecedores e colocações de projetos no Marketplace de Exposições. Escala com o uso da plataforma e o crescimento da rede.",

    // Traction
    "traction.label":   "Tração",
    "traction.h2":      "Primeiros Sinais",
    "traction.m1_val":  "3.200+",
    "traction.m1_lbl":  "Pontos de dados indexados",
    "traction.m2_val":  "€48B",
    "traction.m2_lbl":  "Mercado endereçável",
    "traction.m3_val":  "47",
    "traction.m3_lbl":  "Registos de acesso antecipado",
    "traction.m4_val":  "12",
    "traction.m4_lbl":  "Países cobertos",
    "traction.quote":   "A indústria de exposições está pronta para isto. Estávamos à espera que alguém construísse a camada de infraestrutura.",
    "traction.author":  "Utilizador Beta, Diretor de Marketing de Eventos, UK",

    // Vision
    "vision.label":     "Visão",
    "vision.h2":        "A Nossa Visão",
    "vision.statement": "Tornarmo-nos a principal infraestrutura digital a alimentar a indústria global de exposições.",

    // Founder
    "founder.label":  "Fundador",
    "founder.name":   "Bruno Castro",
    "founder.title":  "Fundador e CEO, Adesso",
    "founder.bio1":   "Bruno Castro passou mais de uma década a trabalhar em feiras de exposição europeias — gerindo construções de stand, coordenando logística e ajudando marcas B2B a apresentar-se em feiras de Lisboa a Frankfurt.",
    "founder.bio2":   "O que identificou foi consistente: uma indústria a gerar milhares de milhões anualmente sem infraestrutura digital. Sem camada de inteligência. Sem automação. Sem sistemas escaláveis.",
    "founder.bio3":   "A Adesso foi fundada para construir essa infraestrutura — começando pelo Reino Unido, escalando para toda a Europa.",
    "founder.cred1":  "Mais de 10 anos de experiência na indústria de exposições",
    "founder.cred2":  "Especialista técnico: CAD, sistemas LED, produção de eventos",
    "founder.cred3":  "Baseado no Reino Unido, experiência no mercado europeu",
    "founder.cred4":  "Empresa registada em Inglaterra e País de Gales",

    // CTA
    "cta.label":    "Acesso Antecipado",
    "cta.h2":       "Junte-se ao Programa de Acesso Antecipado",
    "cta.body":     "Seja uma das primeiras empresas a aceder à plataforma da Adesso. Acesso antecipado limitado disponível para profissionais de exposições do Reino Unido e Europa.",
    "cta.button":   "Pedir Acesso Antecipado →",
    "cta.footnote": "Sem compromisso. Entraremos em contacto dentro de 24 horas.",

    // Footer
    "footer.tagline":    "Infraestrutura de IA para a indústria de exposições. Inteligência de dados, geração de stand com IA e automação de fluxo de trabalho — em escala.",
    "footer.copyright":  "Todos os direitos reservados.",
    "footer.registered": "Registada em Inglaterra e País de Gales",
    "footer.platform":   "Plataforma",
    "footer.company":    "Empresa",
    "footer.connect":    "Contacto",
    "footer.privacy":    "Política de Privacidade",
    "footer.terms":      "Termos de Uso",
    "footer.request":    "Pedir Acesso",
  },
};

const I18nContext = createContext<I18nContextValue>({
  locale: "en",
  setLocale: () => {},
  t: (key) => key,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("adesso_locale") as Locale | null;
    if (saved === "en" || saved === "pt") setLocaleState(saved);
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("adesso_locale", l);
  };

  const t = (key: string): string =>
    translations[locale][key] ?? translations["en"][key] ?? key;

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
