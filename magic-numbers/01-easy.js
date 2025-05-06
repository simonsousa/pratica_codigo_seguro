/**
 * Exercício 1: 
 * Refatore o código abaixo substituindo os números mágicos por constantes com nomes significativos.
 */

function calcularDesconto(valor) {
  if (valor > 100) {
    return valor * 0.1;
  }
  return valor * 0.05;
}
