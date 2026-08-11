# 06 — Unit Economics

> Leia este documento **antes** do plano de execução. Se a matemática não fechar aqui, nenhuma quantidade de conteúdo salva o negócio.

---

## As 6 métricas que governam tudo

| Sigla | Nome | O que é | Alvo saudável ⬜ |
|---|---|---|---|
| **CPL** | Custo por lead | R$ gastos ÷ leads capturados | R$ 2 – 8 |
| **CAC** | Custo de aquisição de cliente | R$ gastos ÷ clientes pagantes | < 30% do ticket |
| **LTV** | Valor no tempo de vida | Receita total média por cliente | > 3× CAC |
| **Conv. L→C** | Lead → comprador | % da lista que compra | 1 – 5% |
| **Conv. sala** | Conversão da oferta de palco | % da sala que compra o alto ticket | 3 – 10% |
| **ROAS** | Retorno sobre anúncio | Receita ÷ investimento em anúncio | > 3× |

**A relação que importa mais que todas:** `LTV > 3 × CAC`.

Se você ganha R$ 3 para cada R$ 1 de aquisição, você pode comprar crescimento indefinidamente. Se ganha R$ 1,20, você tem um emprego mal pago disfarçado de empresa.

---

## Por que o modelo dele funciona: o LTV empilhado

O erro do iniciante é medir o CAC contra o **primeiro** produto. Ele mede contra a **escada inteira**.

Jornada de um cliente que percorre a escada: ✅ (preços observados)

```
Produto de entrada ....................  R$      197
Ingresso Protagon (VIP) ...............  R$    4.497
Olimpo ................................  R$   45.000
Segunda edição / outro produto ........  R$    2.000
                                         ───────────
LTV do cliente que sobe a escada ......  R$   51.694
```

Agora a consequência estratégica:

> Se **1 em cada 100** compradores do produto de R$ 197 chega ao Olimpo, cada comprador de R$ 197 vale, na média, **R$ 647** (197 + 45.000/100).
>
> **Isso significa que ele pode pagar R$ 300 para adquirir um cliente de R$ 197 — e ainda assim lucrar.**

Um concorrente que só vende o produto de R$ 197 não pode pagar mais que ~R$ 60 por cliente. **Ele é superado no leilão de anúncios e nunca entende por quê.**

> **Esta é a vantagem competitiva central do modelo.** Não é o conteúdo, não é o carisma. É que a escada permite pagar mais caro pelo mesmo cliente. Quem tem o LTV mais alto vence o leilão de tráfego, e quem vence o leilão de tráfego fica com o mercado.

---

## Calculadora

Um script executável acompanha este projeto:

```bash
node docs/estrategia-wendell-carvalho/calculadora.mjs
```

Ele roda 3 cenários (pessimista / realista / otimista) e mostra ponto de equilíbrio. Edite as premissas no topo do arquivo com os seus números.

---

## Cenário A — Você começando do zero (sem audiência)

Premissas realistas para quem tem lista pequena e depende de tráfego pago:

| Premissa | Valor |
|---|---|
| Investimento em anúncio | R$ 10.000 |
| CPL | R$ 5,00 |
| Leads gerados | 2.000 |
| Conv. lead → workshop pago (R$ 297) | 2% → 40 vendas |
| Receita do front-end | R$ 11.880 |
| Conv. workshop → alto ticket (R$ 15.000) | 5% → 2 vendas |
| Receita do back-end | R$ 30.000 |

```
Receita total ....................  R$ 41.880
Investimento em anúncio ..........  R$ 10.000
Taxas (~8%) ......................  R$  3.350
Entrega/operação (42 × R$ 125) ...  R$  5.250
                                    ──────────
Lucro ............................  R$ 23.280
ROAS .............................       4,2×
CAC ..............................  R$    238
LTV ..............................  R$    997
LTV/CAC ..........................       4,2×
```

**Funciona.** E note: **72% da receita vem de 2 vendas** de alto ticket, contra 40 vendas do front-end.

> **Conclusão operacional: o alto ticket não é opcional, é o que torna o negócio viável.** Construa-o cedo, mesmo que rústico.

## Cenário B — O mesmo funil, sem alto ticket

```
Receita ..........................  R$ 11.880
Anúncio ..........................  R$ 10.000
Taxas (~8%) ......................  R$    950
Entrega/operação (40 × R$ 125) ...  R$  5.000
                                    ──────────
Lucro ............................  R$ -4.070
```

**Prejuízo — com exatamente o mesmo tráfego, o mesmo conteúdo e o mesmo esforço.** A única diferença é a ausência de um degrau. Exatamente o ponto onde 90% dos infoprodutores travam: eles vendem, o dinheiro entra, e no fim do mês não sobra nada. **O problema nunca foi o tráfego. Foi a ausência do degrau que carrega a margem.**

## Cenário C — Evento presencial que dá errado

O risco que ninguém mostra. Evento de 200 pessoas planejado, 90 vendidas:

```
Receita (90 × R$ 3.500) ..........  R$ 315.000
Espaço + produção (contratado) ...  R$ 180.000  ← já comprometido
Equipe e viagem ..................  R$  60.000
Tráfego (gasto) ..................  R$ 150.000
Taxas ............................  R$  25.200
                                    ───────────
Resultado ........................  R$-100.200
```

**O custo do evento é fixo e antecipado; a receita é variável e posterior.** É por isso que [`05`](./05-mecanica-do-evento.md) insiste: venda primeiro, contrate depois, e suba de tamanho só com dois lucros consecutivos.

---

## Ponto de equilíbrio — a conta de 1 minuto

```
Leads necessários = (Custo fixo + Meta de lucro)
                    ─────────────────────────────
                    Ticket × Conv. × Margem
```

Exemplo — meta de R$ 50.000/mês de lucro, ticket R$ 2.000, conversão 2%, margem 70%:

```
Leads = 50.000 / (2.000 × 0,02 × 0,7) = 1.786 leads/mês
A R$ 5 de CPL → R$ 8.930/mês de anúncio
```

**Faça esta conta antes de qualquer outra coisa.** Se o número de leads for impossível para o seu orçamento, o problema é o **preço** ou a **conversão** — não o esforço. Aumentar o ticket é quase sempre mais fácil que multiplicar o tráfego.

---

## As 4 alavancas, em ordem de facilidade

Quando o resultado não fecha, mexa nesta ordem:

| # | Alavanca | Esforço | Impacto |
|---|---|---|---|
| 1 | **Subir o preço** | Baixo | Altíssimo |
| 2 | **Adicionar um degrau acima** | Médio | Altíssimo |
| 3 | **Melhorar a conversão** (página, oferta, prova) | Médio | Alto |
| 4 | **Aumentar o tráfego** | Alto | Linear e caro |

Quase todo mundo começa pela 4 — a única que não muda a estrutura do negócio, custa mais dinheiro e tem retorno linear. As alavancas 1 e 2 mudam a economia do negócio inteiro e são de graça.

**Próximo:** [`07-plano-180-dias.md`](./07-plano-180-dias.md)
