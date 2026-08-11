# Sequências de Mensagem

> ⚠️ **LGPD:** todas as sequências pressupõem **opt-in explícito registrado** (data, hora, origem) e opt-out funcional. WhatsApp só via API oficial ou lista de transmissão com consentimento. Ver [`../08-riscos-e-conformidade.md`](../08-riscos-e-conformidade.md).

Convenções: `{nome}`, `{tema}`, `{link}`, `{data}` = variáveis.

---

## Sequência A — Aula gratuita semanal (o motor de captura)

Modelo do "Guardiões 20:20" ✅. Roda toda semana, indefinidamente.

| Quando | Canal | Mensagem |
|---|---|---|
| Domingo 18h | WhatsApp | "{nome}, quarta 20:20 o tema é **{tema}**. Vou mostrar {benefício específico}. Confirma presença aqui: {link}" |
| Terça 12h | WhatsApp | "Prévia de amanhã: {insight curto que já entrega valor sozinho}. O resto eu abro quarta 20:20." |
| Quarta 9h | WhatsApp | "Hoje é dia. 20:20. Anota aí: {link}" |
| Quarta 20:00 | WhatsApp | "Começando em 20 min. Entra: {link}" |
| Quarta 20:25 | WhatsApp | "No ar agora. Já tem {N} pessoas. {link}" |
| Quinta 10h | WhatsApp | "Gravação disponível até domingo: {link}. Quem assistiu ao vivo já sabe o que vem." |

**Por que funciona:** ritual fixo + entrega antecipada de valor + urgência real (gravação expira).

---

## Sequência B — Lançamento do front-end (7 dias)

| Dia | Fase | Mensagem |
|---|---|---|
| **D-3** | Aviso | "Vou abrir {N} vagas para {produto} na {dia}. Quem quiser saber primeiro, responde **EU QUERO**." |
| **D-1** | Antecipação | "Amanhã 10h. {N} vagas. Quem respondeu vai receber o link antes." |
| **D0 manhã** | Abertura | "Está aberto: {link}. {N} vagas, {prazo}." |
| **D0 noite** | Prova | "{N} pessoas já entraram. Um recado da {nome do aluno}: {depoimento curto}." |
| **D+1** | Objeção 1 | "A pergunta que mais chegou: *'não tenho tempo'*. Resposta honesta: {resposta}. {link}" |
| **D+2** | Objeção 2 | "Segunda pergunta mais comum: *'e se não funcionar comigo?'*. {reversão de risco real}. {link}" |
| **D+3** | Escassez | "Restam {N} vagas reais. Fecha {data} às {hora}." |
| **D+3 -2h** | Fechamento | "2 horas. Depois disso eu tiro a página do ar e a próxima turma é só em {data}." |

**Regra:** cada mensagem entrega **uma** ideia. Mensagem com 3 argumentos não é lida.

---

## Sequência C — Carrinho abandonado (recupera 15–25%)

| Quando | Mensagem |
|---|---|
| +15 min | "{nome}, vi que você começou a inscrição e não terminou. Deu algum problema? Me responde aqui que eu resolvo." |
| +4h | "Se a dúvida for {objeção mais comum}, olha isso: {resposta em 2 linhas}. {link}" |
| +24h | "Última coisa e eu paro: {N} vagas restantes, fecha {data}. {link}" |

Depois de 3 mensagens, **pare**. Insistir além disso gera bloqueio e denúncia — e denúncia derruba o número.

---

## Sequência D — Qualificação para alto ticket (Porta B)

Modelo do funil de aplicação ✅ (`olimpo.../cadastro-27/`). É a rota de alto ticket que **não** exige evento — a mais viável para quem está começando ([`../07-plano-180-dias.md`](../07-plano-180-dias.md)).

```
1. ANÚNCIO/CONTEÚDO  →  "Se você já fatura {X} e quer {Y}, eu abri {N} vagas"
2. FORMULÁRIO           Qualificação: faturamento, tempo de mercado,
                        principal gargalo, capacidade de investimento
3. TRIAGEM              Você recusa quem não se encaixa. Isso aumenta a conversão
                        de quem passa — e evita o cliente que vira reclamação.
4. CALL DE DIAGNÓSTICO  45 min. 80% escuta, 20% fala.
5. OFERTA               Ao final da própria call, nunca "vou te mandar uma proposta".
6. FOLLOW-UP            D+1, D+3, D+7. Depois, encerra.
```

**Script de abertura da call:**
> "{nome}, obrigado pelo tempo. Vou fazer diferente do que você deve estar esperando: nos primeiros 30 minutos eu só vou perguntar. No fim, eu te digo com honestidade se eu consigo te ajudar ou não — e se eu não conseguir, eu falo, e a gente encerra sem constrangimento. Pode ser?"

Isso derruba a defesa da pessoa e **aumenta** a conversão, porque a possibilidade de recusa torna o "sim" credível.

---

## Sequência E — Pós-venda (a que quase ninguém faz)

É a sequência que protege sua reputação — e reputação é o ativo que [`../08`](../08-riscos-e-conformidade.md) mostra estar em jogo.

| Quando | Mensagem |
|---|---|
| Imediato | Confirmação + o que acontece agora + **quem** é o contato humano dele |
| +1 dia | "Primeiro passo: {ação de 10 minutos}. Faz hoje e me conta." |
| +7 dias | "Como foi a primeira semana? Responde 1, 2 ou 3." *(medição precoce de risco)* |
| +30 dias | Check-in individual, por áudio, nominal |
| +60 dias | Pedido de depoimento **com autorização escrita de uso de imagem** |
| +90 dias | Convite para o próximo degrau da escada |

> **A mensagem de +7 dias é a mais valiosa de todo o projeto.** É ela que detecta o cliente insatisfeito **antes** de ele virar reembolso ou reclamação pública. Um problema resolvido no dia 7 custa uma ligação. O mesmo problema no dia 60 custa R$ 45.000 e a nota do Reclame Aqui.
