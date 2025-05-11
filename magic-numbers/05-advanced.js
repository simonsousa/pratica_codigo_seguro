/**
 * Exercício 5:
 * Refatore esta função de validação de cartão de crédito, eliminando todos os números mágicos.
 */

function listaDeComprimentos(){
  return {
    COMPRIMENTO_VISA_OU_MASTERCARD: 16,
    COMPRIMENTO_AMERICAN_EXPRESS: 15,
    COMPRIMENTO_VISA: 13
  }
}

function listaDeDigitos() {
  return {
    PRIMEIRO_DIGITO_VISA: "4",
    PRIMEIRO_DIGITO_MASTERCARD: "5",
    DIGITOS_AMERICAN_EXPRESS: ["34", "37"]
  }
}

function validarCartaoCredito(numero) {
  const {COMPRIMENTO_VISA_OU_MASTERCARD, COMPRIMENTO_AMERICAN_EXPRESS, COMPRIMENTO_VISA} = listaDeComprimentos();
  if (
    numero.length !== COMPRIMENTO_VISA_OU_MASTERCARD && 
    numero.length !== COMPRIMENTO_AMERICAN_EXPRESS && 
    numero.length !== COMPRIMENTO_VISA
  ) {
    return false;
  }
  const {PRIMEIRO_DIGITO_VISA, PRIMEIRO_DIGITO_MASTERCARD, DIGITOS_AMERICAN_EXPRESS} = listaDeDigitos();
  const PRIMEIRA_POSICAO_NO_VETOR_DIGITOS_AMERICAN_EXPRESS = 0;
  const SEGUNDA_POSICAO_NO_VETOR_DIGITOS_AMERICAN_EXPRESS = 1;
  if (
    numero.startsWith(PRIMEIRO_DIGITO_VISA) &&
    (numero.length === COMPRIMENTO_VISA_OU_MASTERCARD || numero.length === COMPRIMENTO_VISA)
  ) {
    return "Visa";
  } else if (
    numero.startsWith(PRIMEIRO_DIGITO_MASTERCARD) && numero.length === COMPRIMENTO_VISA_OU_MASTERCARD
    ) {
    const segundaPosicaoNoDigito = 1;
    const segundoDigito = parseInt(numero.charAt(segundaPosicaoNoDigito));
    if (segundoDigito >= 1 && segundoDigito <= 5) {
      return "MasterCard";
    }
  } else if (
    (
      numero.startsWith(DIGITOS_AMERICAN_EXPRESS[PRIMEIRA_POSICAO_NO_VETOR_DIGITOS_AMERICAN_EXPRESS]) || 
      numero.startsWith(DIGITOS_AMERICAN_EXPRESS[SEGUNDA_POSICAO_NO_VETOR_DIGITOS_AMERICAN_EXPRESS])
    ) &&
    numero.length === COMPRIMENTO_AMERICAN_EXPRESS
  ) {
    return "American Express";
  }

  return false;

}

const cartaoDeCredito = validarCartaoCredito("5434567890123223")

console.log(cartaoDeCredito)
