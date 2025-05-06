/**
 * Exercício 4:
 * Divida esta função de processamento de pagamento em múltiplas funções,
 * cada uma com responsabilidade única.
 */

async function processarPagamento(dadosPagamento) {
  // Validação
  if (!dadosPagamento.valor || dadosPagamento.valor <= 0) {
    return { sucesso: false, mensagem: "Valor inválido" };
  }

  if (
    !dadosPagamento.cartao ||
    !dadosPagamento.cartao.numero ||
    !dadosPagamento.cartao.cvv
  ) {
    return { sucesso: false, mensagem: "Dados do cartão inválidos" };
  }

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
