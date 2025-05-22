/**
 * Exercício 4:
 * Divida esta função de processamento de pagamento em múltiplas funções,
 * cada uma com responsabilidade única.
 */

  // Validação
  // function validarValor(dadosPagamento) {
  // if (!dadosPagamento.valor || dadosPagamento.valor <= 0) {
  //     return { sucesso: false, mensagem: "Valor inválido" };
  //   } 
  //   return { sucesso: true, mensagem: ""};
  // }

  // function validarCartao(dadosPagamento){
  //   if (
  //     !dadosPagamento.cartao ||
  //     !dadosPagamento.cartao.numero ||
  //     !dadosPagamento.cartao.cvv
  //   ) {
  //     return { sucesso: false, mensagem: "Dados do cartão inválidos" };
  //   }
  //   return { sucesso: true, mensagem: ""};
  // }

  //  FORMATAÇÃO DO CARTÃO
  // const numeroCartaoFormatado = dadosPagamento.cartao.numero.replace(
  //   /\s+/g,
  //   ""
  // );

  // TESTANDO SE O CARTÃO POSSUI 16 DIGITOS 
  // if (!/^\d{16}$/.test(numeroCartaoFormatado)) { 
  //   return { sucesso: false, mensagem: "Número de cartão inválido" };
  // }

function validarValor(dadosPagamento) {
  if(!dadosPagamento.valor || dadosPagamento.valor <= 0) {
    return { sucesso: false, mensagem: "Valor inválido" };
  }
  return { sucesso: true, mensagem: ""};
}

function validarDadosCartao(dadosPagamento) {
  if (
    !dadosPagamento.cartao ||
    !dadosPagamento.cartao.numero ||
    !dadosPagamento.cartao.cvv
  ) {
    return { sucesso: false, mensagem: "Dados do cartão inválidos" };
  }
  return { sucesso: true, mensagem: ""};
}

function formatarCartao(numeroCartao) {
  return numeroCartao.replace(/\s+/g, "");//retira todos os espaços em branco do cartão
}

function testarCartaoCom16Digitos(numeroCartaoFormatado) {
  if (!/^\d{16}$/.test(numeroCartaoFormatado)) {//REGEX : Se o cartão não possuir 16 dígitos
    return { sucesso: false, mensagem: "Número de cartão inválido"};
  }
  return { sucesso: true, mensagem: ""};
}

function listarTaxas() {
  return {
    TAXA_PADRAO: 0,
    TAXA_1_POR_CENTO: 0.01,
    TAXA_3_POR_CENTO: 0.03
  }
}

async function processarPagamento(dadosPagamento) {
  // Validação
  const valorPagamento = validarValor(dadosPagamento);

  validarDadosCartao(valorPagamento);

  // Formatação do cartão
  const numeroCartaoFormatado = formatarCartao(dadosPagamento.cartao.numero)
  
  testarCartaoCom16Digitos(numeroCartaoFormatado);

  // Cálculo de taxa
  const { TAXA_PADRAO, TAXA_1_POR_CENTO, TAXA_3_POR_CENTO } = listarTaxas();

  let taxa = TAXA_PADRAO;
  if (dadosPagamento.metodoPagamento === "credito") {
    taxa = dadosPagamento.valor * TAXA_3_POR_CENTO;
  } else if (dadosPagamento.metodoPagamento === "debito") {
    taxa = dadosPagamento.valor * TAXA_1_POR_CENTO;
  }

  const valorTotal = dadosPagamento.valor + taxa;

  // Processamento na gateway
  try {
    const resposta = await fetch("https://api.pagamento.com/processar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        valor: valorTotal,
        cartao: {
          numero: numeroCartaoFormatado,
          cvv: dadosPagamento.cartao.cvv,
          validade: dadosPagamento.cartao.validade,
        },
      }),
    });

    const resultado = await resposta.json();

    // Registro do pagamento
    console.log(
      `Pagamento ${
        resultado.aprovado ? "aprovado" : "negado"
      }: R$ ${valorTotal.toFixed(2)}`
    );

    if (resultado.aprovado) {
      return {
        sucesso: true,
        mensagem: "Pagamento aprovado",
        transacao: resultado.idTransacao,
        valorTotal,
      };
    } else {
      return {
        sucesso: false,
        mensagem: `Pagamento negado: ${resultado.motivoRecusa}`,
      };
    }
  } catch (erro) {
    console.error("Erro no processamento:", erro);
    return { sucesso: false, mensagem: "Erro ao processar pagamento" };
  }
}
