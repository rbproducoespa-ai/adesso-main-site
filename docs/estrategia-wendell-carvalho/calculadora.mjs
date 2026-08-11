#!/usr/bin/env node
/**
 * Calculadora de unit economics para o modelo escada-de-valor.
 * Uso: node calculadora.mjs
 * Edite PREMISSAS com os seus números.
 */

const PREMISSAS = {
  investimentoAnuncio: 10_000,
  cpl: 5.0,

  frontEnd: { nome: 'Workshop pago', preco: 297, conversaoDeLead: 0.02 },
  backEnd: { nome: 'Alto ticket', preco: 15_000, conversaoDoFrontEnd: 0.05 },

  taxaPlataforma: 0.08, // gateway + adquirente
  custoEntregaPorCliente: 125, // suporte, plataforma, material
};

const CENARIOS = {
  pessimista: { cpl: 1.6, convLead: 0.5, convBack: 0.4 },
  realista: { cpl: 1.0, convLead: 1.0, convBack: 1.0 },
  otimista: { cpl: 0.7, convLead: 1.6, convBack: 1.8 },
};

const brl = (n) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

function calcular(p, mult) {
  const cpl = p.cpl * mult.cpl;
  const leads = Math.floor(p.investimentoAnuncio / cpl);

  const vendasFront = Math.floor(leads * p.frontEnd.conversaoDeLead * mult.convLead);
  const receitaFront = vendasFront * p.frontEnd.preco;

  const vendasBack = Math.floor(vendasFront * p.backEnd.conversaoDoFrontEnd * mult.convBack);
  const receitaBack = vendasBack * p.backEnd.preco;

  const receita = receitaFront + receitaBack;
  const taxas = receita * p.taxaPlataforma;
  const entrega = (vendasFront + vendasBack) * p.custoEntregaPorCliente;
  const custos = p.investimentoAnuncio + taxas + entrega;
  const lucro = receita - custos;

  const clientes = vendasFront + vendasBack;

  return {
    cpl, leads, vendasFront, receitaFront, vendasBack, receitaBack,
    receita, taxas, entrega, custos, lucro,
    roas: receita / p.investimentoAnuncio,
    cac: clientes ? p.investimentoAnuncio / clientes : 0,
    ltv: clientes ? receita / clientes : 0,
    margem: receita ? lucro / receita : 0,
  };
}

function linha(rotulo, valor) {
  console.log(`  ${rotulo.padEnd(34, '.')} ${valor.toString().padStart(14)}`);
}

console.log('\n═══ UNIT ECONOMICS — ESCADA DE VALOR ═══\n');

for (const [nome, mult] of Object.entries(CENARIOS)) {
  const r = calcular(PREMISSAS, mult);
  console.log(`▸ CENÁRIO ${nome.toUpperCase()}`);
  linha('CPL', brl(r.cpl));
  linha('Leads', r.leads);
  linha(`Vendas ${PREMISSAS.frontEnd.nome}`, `${r.vendasFront}  (${brl(r.receitaFront)})`);
  linha(`Vendas ${PREMISSAS.backEnd.nome}`, `${r.vendasBack}  (${brl(r.receitaBack)})`);
  linha('Receita total', brl(r.receita));
  linha('Custos totais', brl(r.custos));
  linha('LUCRO', brl(r.lucro));
  linha('ROAS', `${r.roas.toFixed(2)}x`);
  linha('CAC', brl(r.cac));
  linha('LTV', brl(r.ltv));
  linha('LTV/CAC', `${(r.ltv / (r.cac || 1)).toFixed(1)}x`);
  linha('Margem', `${(r.margem * 100).toFixed(0)}%`);

  const pctBack = r.receita ? (r.receitaBack / r.receita) * 100 : 0;
  console.log(`  → ${pctBack.toFixed(0)}% da receita vem do alto ticket\n`);
}

// Contrafactual: o mesmo funil sem o degrau de alto ticket
const semBack = calcular(
  { ...PREMISSAS, backEnd: { ...PREMISSAS.backEnd, conversaoDoFrontEnd: 0 } },
  CENARIOS.realista,
);
console.log('▸ CONTRAFACTUAL — o mesmo funil SEM alto ticket');
linha('Receita', brl(semBack.receita));
linha('Custos', brl(semBack.custos));
linha('LUCRO', brl(semBack.lucro));
console.log(
  semBack.lucro <= 0
    ? '  → Prejuízo. O alto ticket é o que torna o funil viável.\n'
    : '  → Lucro magro. O alto ticket é onde está a margem.\n',
);

// Ponto de equilíbrio
const META = 50_000;
const { preco, conversaoDeLead } = PREMISSAS.frontEnd;
const margemBruta = 0.7;
const leadsNecessarios = Math.ceil(META / (preco * conversaoDeLead * margemBruta));
console.log('▸ PONTO DE EQUILÍBRIO');
linha(`Meta de lucro/mês`, brl(META));
linha('Leads necessários/mês', leadsNecessarios.toLocaleString('pt-BR'));
linha('Investimento em anúncio/mês', brl(leadsNecessarios * PREMISSAS.cpl));
console.log('');
