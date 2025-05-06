/**
 * Exercício 6:
 * Refatore esta função para seguir o princípio de responsabilidade única, 
 * dividindo-a em várias funções menores.
 */

function analisarDadosVendas(dadosVendas) {
  // Validação de dados
  if (!Array.isArray(dadosVendas) || dadosVendas.length === 0) {
    console.error("Dados de vendas inválidos");
    return null;
  }

  // Processamento e cálculos
  const vendaPorRegiao = {};
  const vendaPorProduto = {};
  const vendaPorMes = {};
  let vendaTotal = 0;
  let maiorVenda = { valor: 0, data: null, produto: null, regiao: null };
  let clientesMaisFrequentes = {};

  for (const venda of dadosVendas) {
    if (
      !venda.valor ||
      !venda.produto ||
      !venda.regiao ||
      !venda.data ||
      !venda.cliente
    ) {
      console.warn("Venda com dados incompletos foi ignorada");
      continue;
    }

    // Calcular vendas por região
    vendaPorRegiao[venda.regiao] =
      (vendaPorRegiao[venda.regiao] || 0) + venda.valor;

    // Calcular vendas por produto
    vendaPorProduto[venda.produto] =
      (vendaPorProduto[venda.produto] || 0) + venda.valor;

    // Determinar mês da venda
    const data = new Date(venda.data);
    const mes = `${data.getFullYear()}-${(data.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
    vendaPorMes[mes] = (vendaPorMes[mes] || 0) + venda.valor;

    // Atualizar venda total
    vendaTotal += venda.valor;

    // Verificar se é a maior venda
    if (venda.valor > maiorVenda.valor) {
      maiorVenda = {
        valor: venda.valor,
        data: venda.data,
        produto: venda.produto,
        regiao: venda.regiao,
      };
    }

    // Contabilizar clientes frequentes
    clientesMaisFrequentes[venda.cliente] =
      (clientesMaisFrequentes[venda.cliente] || 0) + 1;
  }

  // Transformação para arrays ordenados
  const regioes = Object.entries(vendaPorRegiao)
    .map(([regiao, valor]) => ({ regiao, valor }))
    .sort((a, b) => b.valor - a.valor);

  const produtos = Object.entries(vendaPorProduto)
    .map(([produto, valor]) => ({ produto, valor }))
    .sort((a, b) => b.valor - a.valor);

  const meses = Object.entries(vendaPorMes)
    .map(([mes, valor]) => ({ mes, valor }))
    .sort((a, b) => a.mes.localeCompare(b.mes));

  const topClientes = Object.entries(clientesMaisFrequentes)
    .map(([cliente, frequencia]) => ({ cliente, frequencia }))
    .sort((a, b) => b.frequencia - a.frequencia)
    .slice(0, 5);

  // Cálculos de tendências
  const mediaMensal = vendaTotal / Object.keys(vendaPorMes).length;

  let tendencia = "estável";
  if (meses.length >= 3) {
    const ultimosMeses = meses.slice(-3);
    if (
      ultimosMeses[2].valor > ultimosMeses[1].valor &&
      ultimosMeses[1].valor > ultimosMeses[0].valor
    ) {
      tendencia = "crescimento";
    } else if (
      ultimosMeses[2].valor < ultimosMeses[1].valor &&
      ultimosMeses[1].valor < ultimosMeses[0].valor
    ) {
      tendencia = "queda";
    }
  }

  // Criação do relatório
  const relatorio = {
    vendaTotal,
    mediaMensal,
    tendencia,
    topRegioes: regioes.slice(0, 3),
    topProdutos: produtos.slice(0, 5),
    evolucaoMensal: meses,
    maiorVenda,
    clientesFrequentes: topClientes,
  };

  // Imprimir relatório
  console.log("=== RELATÓRIO DE VENDAS ===");
  console.log(`Venda Total: R$ ${vendaTotal.toFixed(2)}`);
  console.log(`Média Mensal: R$ ${mediaMensal.toFixed(2)}`);
  console.log(`Tendência: ${tendencia}`);
  console.log("\nTop 3 Regiões:");
  regioes
    .slice(0, 3)
    .forEach((r) => console.log(`- ${r.regiao}: R$ ${r.valor.toFixed(2)}`));
  console.log("\nTop 5 Produtos:");
  produtos
    .slice(0, 5)
    .forEach((p) => console.log(`- ${p.produto}: R$ ${p.valor.toFixed(2)}`));

  return relatorio;
}
