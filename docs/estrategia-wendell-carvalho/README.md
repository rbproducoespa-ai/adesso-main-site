# Projeto: Engenharia Reversa do Modelo de Monetização de Wendell Carvalho

**Objetivo:** documentar exatamente o que ele vende, como o dinheiro entra, e entregar um plano executável para construir um negócio com a mesma arquitetura.

---

## ⚠️ Nota de método — leia antes de tudo

O Instagram e todos os domínios próprios dele (`*.wendellcarvalho.com.br`) estão **bloqueados pelo proxy de rede** deste ambiente. Nada aqui vem de leitura direta do perfil.

Este projeto foi reconstruído a partir de **fontes públicas indexadas**: Exame, Hotmart, Reclame Aqui, Econodata (CNPJ), páginas de venda indexadas em buscadores, agregadores de eventos e análises de terceiros. As fontes estão em [`fontes.md`](./fontes.md).

Por isso, cada afirmação neste projeto é marcada:

| Marca | Significado |
|---|---|
| ✅ **VERIFICADO** | Confirmado em fonte pública citável |
| 🔶 **INFERIDO** | Dedução forte a partir de evidência observável (ex.: estrutura de URL) |
| ⬜ **PADRÃO DE MERCADO** | Não observado nele; é a prática consolidada do setor, incluída para completar o playbook |

**Não trate 🔶 e ⬜ como fato sobre ele.** Trate como hipótese de trabalho para o *seu* negócio.

---

## Resumo executivo em 10 linhas

Wendell Carvalho **não ganha dinheiro vendendo curso no Instagram.** Ele ganha dinheiro assim:

1. Produz conteúdo de altíssimo volume e alcance (~30M de pessoas/mês) sobre mentalidade, dinheiro, família e carreira. ✅
2. Converte esse alcance em **lista própria** (WhatsApp/e-mail) através de aulas gratuitas recorrentes — o "Guardiões 20:20", toda quarta às 20:20. ✅
3. Vende produtos digitais baratos (R$ 45–197) que **não são o negócio** — são qualificação de comprador. ✅
4. O produto de front-end real é um **evento presencial de 3 dias, o Protagon**, com ingressos de ~R$ 4.497 a ~R$ 16.162 em lotes. ✅
5. Dentro do evento, no palco, vende o **back-end de alto ticket — a mentoria Olimpo, na casa dos R$ 45.000**. ✅
6. Em paralelo, opera **B2B** (Kairos Treinamentos, com Gerdau, BRF, Petrobras, Vivo, Sebrae) e palestras. ✅
7. E converte o caixa em **equity fora do infoproduto** (rede de barbearias Côrte). ✅

**A audiência é o ativo. O evento é a máquina de conversão. O alto ticket é o lucro. O B2B é o piso. O equity é a saída.**

Quem tenta copiar só a parte do Instagram copia o custo e não copia a receita.

---

## Estrutura do projeto

| # | Documento | O que responde |
|---|---|---|
| 00 | **README.md** (este) | Visão geral e como usar |
| 01 | [`01-raio-x-do-modelo.md`](./01-raio-x-do-modelo.md) | Quem é, números reais, quais empresas, de onde vem cada real |
| 02 | [`02-escada-de-valor.md`](./02-escada-de-valor.md) | Os 7 degraus da escada de ofertas, com preços |
| 03 | [`03-maquina-de-conteudo.md`](./03-maquina-de-conteudo.md) | O sistema de conteúdo do Instagram, formatos e ganchos |
| 04 | [`04-captura-e-trafego.md`](./04-captura-e-trafego.md) | Como o seguidor vira lead e o lead vira comprador |
| 05 | [`05-mecanica-do-evento.md`](./05-mecanica-do-evento.md) | Por que o evento presencial converte 10–20x mais que o online |
| 06 | [`06-unit-economics.md`](./06-unit-economics.md) | A matemática: CAC, ROAS, ponto de equilíbrio, projeção |
| 07 | [`07-plano-180-dias.md`](./07-plano-180-dias.md) | Como construir isso do zero, semana a semana |
| 08 | [`08-riscos-e-conformidade.md`](./08-riscos-e-conformidade.md) | O que **não** copiar: CDC, CONAR, o passivo do Reclame Aqui |
| 09 | [`09-templates/`](./09-templates/) | Ganchos, roteiros, scripts de venda, sequências de mensagem |
| 10 | [`10-metricas.md`](./10-metricas.md) | O painel de controle: o que medir e quais são os números-alvo |
| 11 | [`11-trajetoria-e-patrimonio.md`](./11-trajetoria-e-patrimonio.md) | A vida dele: origem, linha do tempo, o que ele tem hoje e os 8 mecanismos que explicam como chegou lá |
| — | [`calculadora.mjs`](./calculadora.mjs) | Calculadora executável de unit economics (`node calculadora.mjs`) |
| — | [`fontes.md`](./fontes.md) | Todas as fontes públicas usadas |

---

## Como usar este projeto

**Se você quer entender o modelo:** leia 01 → 02 → 05. Uma hora.

**Se você quer entender a pessoa e a trajetória:** leia 11. É o documento que explica por que a sequência do plano é o que é — e por que ela é mais lenta do que o marketing do nicho sugere.

**Se você quer executar:** leia 06 (a matemática precisa fechar antes de qualquer coisa) → 07 (o plano) → 09 (os templates). Depois volte no 08 antes de publicar qualquer promessa.

**Se você já tem audiência e quer monetizar:** vá direto para 04 e 05. Seu gargalo não é conteúdo, é captura e oferta.

---

## O aviso honesto

Este modelo é **legítimo e legal** — é o modelo de negócio de eventos e educação, o mesmo de Tony Robbins, e existe há 40 anos. Mas ele tem duas características que você precisa aceitar antes de começar:

1. **É intensivo em capital de risco.** Um evento presencial tem custo fixo alto (espaço, produção, equipe) comprometido *antes* de você saber se vendeu. Ver o cenário de perda em [`06`](./06-unit-economics.md).
2. **É intensivo em reputação.** O mesmo mecanismo que gera R$ 45.000 de ticket gera reclamação quando a entrega não acompanha. O Reclame Aqui dele tem 91 reclamações e nota 7,8 — inclusive sobre o Olimpo. ✅ Isso é parte do modelo, não um acidente. O documento [`08`](./08-riscos-e-conformidade.md) mostra onde a linha está.

Você pode construir a mesma máquina sem herdar o mesmo passivo. É uma escolha de execução, e ela é feita no degrau da entrega, não no do marketing.
