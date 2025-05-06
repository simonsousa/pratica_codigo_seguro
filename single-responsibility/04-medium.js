/**
 * Exercício 4:
 * Divida esta função de processamento de pagamento em múltiplas funções,
 * cada uma com responsabilidade única.
 */

  // Validação
  function validarValor(dadosPagamento) {
  if (!dadosPagamento.valor || dadosPagamento.valor <= 0) {
      return { sucesso: false, mensagem: "Valor inválido" };
    } 
    return { sucesso: true, mensagem: ""};
  }

  function validarCartao(dadosPagamento){
    if (
      !dadosPagamento.cartao ||
      !dadosPagamento.cartao.numero ||
      !dadosPagamento.cartao.cvv
    ) {
      return { sucesso: false, mensagem: "Dados do cartão inválidos" };
    }
    return { sucesso: true, mensagem: ""};
  }

async function processarNoGateway(dadosPagamento, numeroCartao) {
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

      const resultado = await resposta.json()
      return resultado;
    } catch (error) {
      return undefined;
    }
}

async function processarPagamento(dadosPagamento) {
  const validacaoValor = validarValor(dadosPagamento);
  if(!validacaoValor.sucesso){
    return validacaoValor;
  }

  const validacaoCartao = validarCartao(dadosPagamento)
  if(!validacaoCartao.sucesso) {
    return validacaoCartao;
  }

  return { sucesso: true, mensagem: ""} 

  // Formatação do cartão
  const numeroCartaoFormatado = dadosPagamento.cartao.numero.replace(
    /\s+/g,
    ""
  );
  
  if (!/^\d{16}$/.test(numeroCartaoFormatado)) {
    return { sucesso: false, mensagem: "Número de cartão inválido" };
  }

  // Cálculo de taxa
  let taxa = 0;
  if (dadosPagamento.metodoPagamento === "credito") {
    taxa = dadosPagamento.valor * 0.03;
  } else if (dadosPagamento.metodoPagamento === "debito") {
    taxa = dadosPagamento.valor * 0.01;
  }

  const valorTotal = dadosPagamento.valor + taxa;



    const resultado = await processarNoGateway(dadosPagamento, numeroCartaoFormatado);
    if(!resultado){
      return { sucesso: false, mensagem: "Erro ao processar a compra"}
    }

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
