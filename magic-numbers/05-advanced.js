/**
 * Exercício 5:
 * Refatore esta função de validação de cartão de crédito, eliminando todos os números mágicos.
 */

function validarCartaoCredito(numero) {
  if (numero.length !== 16 && numero.length !== 15 && numero.length !== 13) {
    return false;
  }

  if (
    numero.startsWith("4") &&
    (numero.length === 16 || numero.length === 13)
  ) {
    return "Visa";
  } else if (numero.startsWith("5") && numero.length === 16) {
    const segundoDigito = parseInt(numero.charAt(1));
    if (segundoDigito >= 1 && segundoDigito <= 5) {
      return "MasterCard";
    }
  } else if (
    (numero.startsWith("34") || numero.startsWith("37")) &&
    numero.length === 15
  ) {
    return "American Express";
  }

  return false;
}
