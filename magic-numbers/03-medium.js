/**
 * Exercício 3: 
 * Refatore o algoritmo de cálculo de preço, 
 * substituindo todos os números mágicos por constantes significativas.
 */

function listaDeDescontos() {
  return {
    PADRAO: 0,
    CINCO_POR_CENTO: 0.05,
    DEZ_POR_CENTO: 0.1,
    QUINZE_POR_CENTO: 0.15
  }
}

function listaDeQuantidades() {
  return {
    QTD_ATE_3: 3,
    QTD_ATE_5: 5,
    QTD_ATE_10: 10
  }
}

function listaDeValoresAleatorios(){
  return {
    MAIOR_QUE_MIL: 1000,
    NOVENTA_E_TRES_POR_CENTO: 0.93
  }
}

function calcularPrecoComDesconto(preco, desconto) {
  return preco * (1 - desconto);
}

function retornarPrecoFinal(preco) {
  const {MAIOR_QUE_MIL, NOVENTA_E_TRES_POR_CENTO} = listaDeValoresAleatorios();
  if (preco > MAIOR_QUE_MIL) {
    return preco * NOVENTA_E_TRES_POR_CENTO;
  }
  return preco
}

function calcularPrecoFinal(preco, quantidade) {
  const {QTD_ATE_3, QTD_ATE_5, QTD_ATE_10} = listaDeQuantidades();
  const {PADRAO, CINCO_POR_CENTO, DEZ_POR_CENTO, QUINZE_POR_CENTO} = listaDeDescontos();
  
  let desconto = PADRAO;
  if (quantidade >= QTD_ATE_10) {
    desconto = QUINZE_POR_CENTO;
  } else if (quantidade >= QTD_ATE_5) {
    desconto = DEZ_POR_CENTO;
  } else if (quantidade >= QTD_ATE_3) {
    desconto = CINCO_POR_CENTO;
  }

  const precoComDesconto = calcularPrecoComDesconto(preco, desconto)

  const precoFinal = retornarPrecoFinal(precoComDesconto)

  return precoFinal
}
console.log(calcularPrecoFinal(2300, 5))
