/**
 * Exercício 2:
 * Divida a função abaixo em múltiplas funções para seguir o princípio de responsabilidade única.
 */

function gerarRelatorio(vendas) {
  let totalVendas = 0;
  let maiorVenda = 0;
  let menorVenda = Infinity;

  for (const venda of vendas) {
    totalVendas += venda;
    if (venda > maiorVenda) maiorVenda = venda;
    if (venda < menorVenda) menorVenda = venda;
  }

  const media = totalVendas / vendas.length;

  console.log("=== Relatório de Vendas ===");
  console.log(`Total: R$ ${totalVendas.toFixed(2)}`);
  console.log(`Média: R$ ${media.toFixed(2)}`);
  console.log(`Maior venda: R$ ${maiorVenda.toFixed(2)}`);
  console.log(`Menor venda: R$ ${menorVenda.toFixed(2)}`);
}
