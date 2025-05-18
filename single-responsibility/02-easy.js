/**
 * Exercício 2:
 * Divida a função abaixo em múltiplas funções para seguir o princípio de responsabilidade única.
 */

function analisarVendas( arrayVendas, totalDeVendas, maiorVendaDoArray, menorVendaDoArray ) {
  for( const venda of arrayVendas ) {
    totalDeVendas += venda;
    if (venda > maiorVendaDoArray) maiorVendaDoArray = venda;
    if (venda < menorVendaDoArray) menorVendaDoArray = venda;
  }
  return {
    totalDeVendas,
    maiorVendaDoArray,
    menorVendaDoArray
  }
}

function calcularMedia(totalVendas, comprimentoVendas) {
  return totalVendas / comprimentoVendas.length 
}

function mostrarDados(total, media, maiorVenda, menorVenda) {
  console.log("=== Relatório de Vendas ===");
  console.log(`Total: R$ ${total.toFixed(2)}`);
  console.log(`Média: R$ ${media.toFixed(2)}`);
  console.log(`Maior venda: R$ ${maiorVenda.toFixed(2)}`);
  console.log(`Menor venda: R$ ${menorVenda.toFixed(2)}`);
}

function gerarRelatorio(vendas) {
  let totalVendas = 0;
  let maiorVenda = 0;
  let menorVenda = Infinity;

  const { totalDeVendas, maiorVendaDoArray, menorVendaDoArray } = analisarVendas( 
    vendas, totalVendas, maiorVenda, menorVenda );
  
  const media = calcularMedia(totalDeVendas, vendas);
  mostrarDados(totalDeVendas, media, maiorVendaDoArray, menorVendaDoArray);
  
}

const vendasDoDia = [150.50, 200.75, 80.00, 310.20, 125.90];
gerarRelatorio(vendasDoDia);