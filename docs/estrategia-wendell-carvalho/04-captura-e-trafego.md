# 04 — Captura e Tráfego

## A evidência mais reveladora do projeto inteiro

As páginas de venda dele estão indexadas no Google. Os **caminhos das URLs** expõem a arquitetura operacional inteira — melhor do que qualquer entrevista, porque ninguém maquia uma URL.

### URLs reais observadas ✅

```
protagon.wendellcarvalho.com.br/pro-e026-sp/s-ved-fla-vagasabertas-div-aa-00/
protagon.wendellcarvalho.com.br/pro-e026-sp/s-ved-fla-vagasabertas-div-ab-00/
protagon.wendellcarvalho.com.br/pro-e026-sp/pro-e026-sp-vendas-mae-aa-novo-preco/
protagon.wendellcarvalho.com.br/pro-e026-sp/pro-e026-sp-bonus/
protagon.wendellcarvalho.com.br/pro-e029-poa/s-lev-fla-ofertaliberada-div-aa/
protagon.wendellcarvalho.com.br/pro-e033-sp/s-ved-fla-vagasabertas-div-aa-00/
protagon.wendellcarvalho.com.br/pro-e028-cpg/s-ved-fla-vagasabertas-div-af-00/
protagon.wendellcarvalho.com.br/pro-e006-sc/ingresso-v/
par.wendellcarvalho.com.br/par-e020-gsp/s-ved-fla-vagasabertas-div-aa-01/
proposito.wendellcarvalho.com.br/dt-e004-df/brasilia-a/
olimpo.wendellcarvalho.com.br/fwc02/cadastro-27/
ciclodamaestria.wendellcarvalho.com.br/fv_cdm_001/fid/fid_freeclass_delay/
```

Títulos de página indexados: `[PRO-E033-SP] – VENDAS MÃE AA – LONGA`, `[PRO-E029-POA] OFERTA LIBERADA – AA`, `[PRO-E026-SP] PROSPERIDADE AB`. ✅

### A decodificação

```
protagon . wendellcarvalho.com.br / pro-e026-sp / s-ved-fla-vagasabertas-div-aa-00
   │                                 │    │   │      │   │        │          │  │
   │                                 │    │   │      │   │        │          │  └─ versão (00, 01)
   │                                 │    │   │      │   │        │          └──── variante de teste (aa, ab, af)
   │                                 │    │   │      │   │        └─────────────── fase da campanha
   │                                 │    │   │      │   └──────────────────────── divulgação
   │                                 │    │   │      └──────────────────────────── tipo de público (ved=venda / lev=lead)
   │                                 │    │   └─────────────────────────────────── cidade (sp, poa, sc, cpg, df, cab, gsp)
   │                                 │    └─────────────────────────────────────── nº da edição (e002 … e036)
   │                                 └──────────────────────────────────────────── produto (pro, par, dt)
   └────────────────────────────────────────────────────────────────────────────── subdomínio por produto
```

### O que isso prova — 6 conclusões diretas

**1. São 36+ edições do mesmo evento.** Os códigos vão de `E002` a `E036`. ✅ Não é um lançamento anual. É uma **operação industrializada em turnê**, com numeração sequencial de edição.

**2. Cada cidade tem página própria.** `sp`, `poa`, `sc`, `cpg`, `df`, `cab`, `gsp`. ✅ Não é uma landing genérica com a cidade trocada por script — é infraestrutura dedicada por praça, o que permite orçamento, criativo e preço por praça.

**3. Existe uma "página mãe" e derivadas.** `VENDAS MÃE AA – LONGA` ✅ — um template canônico do qual saem versões (longa/curta, novo preço, bônus). Isso é **reuso de ativo**: a página que converte é escrita uma vez e clonada por edição, não reescrita 36 vezes.

**4. Teste A/B sistemático.** Sufixos `aa`, `ab`, `af` na mesma edição e mesma cidade. ✅ E `ingresso-a`, `ingresso-v`, `ingresso-c`. Testam versões de página de forma rotineira, não eventual.

**5. Público frio e público quente recebem páginas diferentes.** `s-ved` (venda) vs `s-lev` (lead). ✅ Quem já é lead não vê a mesma página de quem chegou do anúncio frio. Isso sozinho costuma valer 30–50% de conversão.

**6. A campanha tem fases nomeadas.** `vagasabertas` → `ofertaliberada`. ✅ A oferta **muda ao longo do tempo** dentro da mesma edição: abre vagas, depois libera oferta (preço/bônus). É lançamento clássico, rodado em loop perpétuo.

> **A lição operacional:** ele não trata cada evento como um projeto novo. Ele construiu um **sistema com taxonomia** — e um sistema com taxonomia pode ser delegado a uma equipe, medido por recorte e melhorado a cada ciclo. Um projeto artesanal não pode.

---

## O funil de captura

### Descoberta ✅: o alto ticket tem funil próprio de inscrição

`olimpo.wendellcarvalho.com.br/fwc02/cadastro-27/` — o Olimpo (~R$ 45.000) tem **páginas de cadastro numeradas**, ou seja, também é vendido por **funil de aplicação online**, não apenas no palco do evento. ✅

Isso significa **duas portas para o mesmo produto de alto ticket**:

```
PORTA A (palco)          Protagon dia 2/3 → oferta ao vivo → Olimpo
PORTA B (aplicação)      Anúncio/lista → cadastro → qualificação → call → Olimpo
```

A Porta B é a que você pode construir **hoje**, sem evento e sem capital. É a rota recomendada para quem está começando — ver [`07`](./07-plano-180-dias.md).

### O funil completo

```
   CONTEÚDO ORGÂNICO                    TRÁFEGO PAGO
   (reels, 30M/mês) ✅                  (Meta/Google) 🔶
           │                                  │
           └──────────────┬───────────────────┘
                          ▼
         ┌────────────────────────────────────┐
         │  ISCA: aula gratuita recorrente    │ ✅
         │  "Guardiões 20:20" — quarta 20:20  │
         │  + grupo de WhatsApp               │ ✅
         └────────────────┬───────────────────┘
                          ▼
              ┌───────────────────────┐
              │ LISTA PRÓPRIA         │ ← O ATIVO REAL
              │ WhatsApp + e-mail     │ ✅
              │ + Telegram            │ ✅
              └───────────┬───────────┘
                          ▼
        ┌─────────────────┴──────────────────┐
        ▼                                    ▼
┌───────────────┐                  ┌──────────────────┐
│ PRODUTO R$45+ │ ✅               │ INGRESSO EVENTO  │ ✅
│ (qualifica)   │─────────────────▶│ R$3k–16k, lotes  │
└───────────────┘                  └────────┬─────────┘
                                            ▼
                                   ┌──────────────────┐
                                   │ OLIMPO ~R$45.000 │ ✅
                                   └──────────────────┘
```

### Por que WhatsApp é o canal central 🔶

O curso grátis dele inclui explicitamente **grupo de WhatsApp**. ✅ Não é acaso:

| Canal | Taxa de abertura típica ⬜ |
|---|---|
| E-mail | 15–25% |
| Instagram (alcance orgânico do feed) | 5–15% |
| **WhatsApp** | **80–95%** |

No Brasil, WhatsApp é onde a atenção está. Um lançamento por lista de WhatsApp entrega 4–6x mais olhos que o mesmo lançamento por e-mail. **Mas** — ver [`08`](./08-riscos-e-conformidade.md) — é também onde estão as maiores armadilhas de LGPD e de banimento por spam. Use lista de transmissão com opt-in explícito e comunidade, nunca importação de contatos.

---

## O que você deve implementar

### 1. Uma taxonomia de URL desde o primeiro dia

Mesmo com um produto só. Copie o padrão:

```
/{produto}-e{edição}-{cidade|online}/{público}-{fase}-{variante}
Exemplo: /imersao-e001-online/lev-vagasabertas-aa
```

Quando você tiver 20 campanhas rodando, vai saber exatamente o que converteu. Quem não faz isso no início nunca faz.

### 2. Isca recorrente, não avulsa
Escolha um dia e um horário estranho e específico. Nunca mude. Dê um nome de tribo aos participantes. Ver [`03`](./03-maquina-de-conteudo.md).

### 3. Páginas separadas para frio e quente
Duas páginas desde o começo. Frio precisa de contexto e prova; quente precisa de oferta e prazo. A mesma página para os dois desperdiça os dois.

### 4. Fases nomeadas
`aviso` → `vagas abertas` → `oferta liberada` → `últimas vagas` → `encerramento`. Cada fase com sua própria página e sua própria mensagem.

**Próximo:** [`05-mecanica-do-evento.md`](./05-mecanica-do-evento.md)
