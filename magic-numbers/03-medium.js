/**
 * Exercício 3: 
 * Refatore o algoritmo de cálculo de preço, 
 * substituindo todos os números mágicos por constantes significativas.
 */

function calcularPrecoFinal(preco, quantidade) {
  let desconto = 0;

  if (quantidade >= 10) {
    desconto = 0.15;
  } else if (quantidade >= 5) {
    desconto = 0.1;
  } else if (quantidade >= 3) {
    desconto = 0.05;
  }

  const precoComDesconto = preco * (1 - desconto);

  if (precoComDesconto > 1000) {
    return precoComDesconto * 0.93;
  }

  return precoComDesconto;
}
