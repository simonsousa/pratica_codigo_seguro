/**
 * Exercício 1: 
 * Refatore o código abaixo substituindo os números mágicos por constantes com nomes significativos.
 */

function calcularDesconto(valor) {
  const VALOR_BASE = 100;
  const DEZ_POR_CENTO = 0.1;
  const CINCO_POR_CENTO = 0.05;
  
  if (valor > VALOR_BASE) {
    return valor * DEZ_POR_CENTO;
  }
  return valor * CINCO_POR_CENTO;
}
