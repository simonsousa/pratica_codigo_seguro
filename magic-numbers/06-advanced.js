/**
 * Exercício 6:
 * Refatore este algoritmo de verificação de senha,
 * removendo todos os números mágicos e usando constantes significativas.
 */

function validarSenha(senha) {
  if (senha.length < 8) {
    return {
      valida: false,
      mensagem: "Senha muito curta",
    };
  }

  let pontuacao = 0;

  if (senha.length >= 12) {
    pontuacao += 2;
  } else if (senha.length >= 10) {
    pontuacao += 1;
  }

  if (/[A-Z]/.test(senha)) {
    pontuacao += 2;
  }
  if (/[a-z]/.test(senha)) {
    pontuacao += 2;
  }
  if (/[0-9]/.test(senha)) {
    pontuacao += 2;
  }
  if (/[^A-Za-z0-9]/.test(senha)) {
    pontuacao += 3;
  }

  if (pontuacao < 5) {
    return { valida: false, mensagem: "Senha fraca" };
  }
  if (pontuacao < 8) {
    return { valida: true, mensagem: "Senha média" };
  }

  return {
    valida: true,
    mensagem: "Senha forte",
  };
}
