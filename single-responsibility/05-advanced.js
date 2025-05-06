/**
 * Exercício 5:
 * Refatore esta função de processamento de pedido,
 * dividindo-a em funções menores com responsabilidade única.
 */

async function processarPedido(pedido, cliente) {
  // Validar pedido
  if (!pedido.itens || pedido.itens.length === 0) {
    return { sucesso: false, mensagem: "Pedido vazio" };
  }

  if (!cliente.endereco || !cliente.endereco.cep) {
    return { sucesso: false, mensagem: "Endereço de entrega incompleto" };
  }

  // Calcular totais
  let subtotal = 0;
  let pesoTotal = 0;
  let produtosIndisponiveis = [];

  for (const item of pedido.itens) {
    // Verificar estoque
    const disponibilidade = await verificarEstoque(
      item.produtoId,
      item.quantidade
    );
    if (!disponibilidade.disponivel) {
      produtosIndisponiveis.push(item.produtoId);
      continue;
    }

    const produto = await buscarProduto(item.produtoId);
    if (!produto) continue;

    subtotal += produto.preco * item.quantidade;
    pesoTotal += produto.peso * item.quantidade;
  }

  if (produtosIndisponiveis.length > 0) {
    return {
      sucesso: false,
      mensagem: "Alguns produtos estão indisponíveis",
      produtosIndisponiveis,
    };
  }

  // Calcular frete
  let valorFrete = 0;

  try {
    const cepLimpo = cliente.endereco.cep.replace(/\D/g, "");
    const respostaFrete = await fetch(
      `https://api.frete.com/calcular?peso=${pesoTotal}&cep=${cepLimpo}`
    );
    const dadosFrete = await respostaFrete.json();
    valorFrete = dadosFrete.valor;
  } catch (erro) {
    console.error("Erro ao calcular frete:", erro);
    valorFrete = 15; // Valor padrão caso API falhe
  }

  // Aplicar promoções
  let desconto = 0;

  if (subtotal > 300) {
    desconto = subtotal * 0.1;
  } else if (subtotal > 200) {
    desconto = subtotal * 0.05;
  }

  if (cliente.cupom) {
    const cupomValido = await validarCupom(cliente.cupom, subtotal);
    if (cupomValido.valido) {
      desconto = Math.max(desconto, cupomValido.valorDesconto);
    }
  }

  // Calcular total final
  const total = subtotal + valorFrete - desconto;

  // Registrar pedido no banco de dados
  try {
    const idPedido = await salvarPedidoBD({
      cliente: cliente.id,
      itens: pedido.itens,
      subtotal,
      frete: valorFrete,
      desconto,
      total,
      status: "aguardando_pagamento",
      data: new Date(),
    });

    // Enviar e-mail de confirmação
    await enviarEmailConfirmacao(cliente.email, {
      idPedido,
      itens: pedido.itens,
      subtotal,
      frete: valorFrete,
      desconto,
      total,
    });

    return {
      sucesso: true,
      mensagem: "Pedido processado com sucesso",
      idPedido,
      resumo: {
        subtotal,
        frete: valorFrete,
        desconto,
        total,
      },
    };
  } catch (erro) {
    console.error("Erro ao finalizar pedido:", erro);
    return { sucesso: false, mensagem: "Erro ao finalizar pedido" };
  }
}

// Funções auxiliares para o exemplo
async function verificarEstoque(produtoId, quantidade) {
  return { disponivel: true };
}

async function buscarProduto(produtoId) {
  return { preco: 50, peso: 0.5 };
}

async function validarCupom(cupom, valorTotal) {
  return { valido: true, valorDesconto: 20 };
}

async function salvarPedidoBD(pedido) {
  return "ABC123";
}

async function enviarEmailConfirmacao(email, dadosPedido) {
  return true;
}
