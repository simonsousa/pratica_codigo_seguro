/**
 * Exercício 6:
 * Refatore este algoritmo de verificação de senha,
 * removendo todos os números mágicos e usando constantes significativas.
 */

function listaPontuacaoDaSenha(){
  return {
    pontuacaoPadrao: 0,
    minusculasOuMaiusculasA_Z : 2,
    digitosDe0_a_9: 2,
    caracteresEspeciais: 3
  }
}

function validarSenha(senha) {
  const COMPRIMENTO_MINIMO = 8;
  if (senha.length < COMPRIMENTO_MINIMO) {
    return {
      valida: false,
      mensagem: "Senha muito curta",
    };
  }

  const {
    pontuacaoPadrao, minusculasOuMaiusculasA_Z, digitosDe0_a_9, caracteresEspeciais
  } = listaPontuacaoDaSenha();
  
  let pontuacao = pontuacaoPadrao;

  const COMPRIMENTO_MAXIMO = 12;
  const COMPRIMENTO_MEDIO = 10; 
  
  const PONTOS_COMPR_MAXIMO = 2;
  const PONTOS_COMPR_MEDIO = 1;

  if (senha.length >= COMPRIMENTO_MAXIMO) {
    pontuacao += PONTOS_COMPR_MAXIMO;
  } else if (senha.length >= COMPRIMENTO_MEDIO) {
    pontuacao += PONTOS_COMPR_MEDIO;
  }

  const LETRAS_MAIUSC_A_Z = /[A-Z]/;
  if (LETRAS_MAIUSC_A_Z.test(senha)) {
    pontuacao += minusculasOuMaiusculasA_Z;
  }

  const LETRAS_MINUSC_A_Z = /[a-z]/;
  if (LETRAS_MINUSC_A_Z.test(senha)) {
    pontuacao += minusculasOuMaiusculasA_Z;
  }

  const DIGITOS_0_9 = /[0-9]/;
  if (DIGITOS_0_9.test(senha)) {
    pontuacao += digitosDe0_a_9;
  }

  const CARACTERES_ESPECIAIS = /[^A-Za-z0-9]/
  if (CARACTERES_ESPECIAIS.test(senha)) {
    pontuacao += caracteresEspeciais;
  }

  const PONTOS_SENHA_FRACA = 5;
  if (pontuacao < PONTOS_SENHA_FRACA) {
    return { valida: false, mensagem: "Senha fraca" };
  }

  const PONTOS_SENHA_MEDIA = 8;
  if (pontuacao < PONTOS_SENHA_MEDIA) {
    return { valida: true, mensagem: "Senha média" };
  }

  return { //Caso não caia nos dois primeiros ifs, a senha é forte
    valida: true,
    mensagem: "Senha forte",
  };
}
