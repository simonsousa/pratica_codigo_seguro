/**
 * Exercício 1:
 * Refatore a função abaixo em múltiplas funções, cada uma com responsabilidade única.
 */

function validarPresenca(usuario){
  // Validação
  if(!usuario.nome || !usuario.email) {
    return { sucesso: false, mensagem: "Nome e email são obrigatórios" }
  }
  return { sucesso: true, mensagem: "" }
}

function formatarNome(nome) {
 // Formatação
  return nome
    .trim()
    .toLowerCase()
    .split(" ")
    .map((parte) => parte.charAt(0).toUpperCase() + parte.slice(1))
    .join(" ");
}

function formatarEmail(email) {
  // Formatação
  return email.trim().toLowerCase();
}

function salvarDados(nome, email) {
  // Persistência
  console.log(`Salvando usuário: ${nome}, ${email}`)
}

function processarDadosUsuario(usuario) {
  
  const validacao = validarPresenca(usuario)
  if (!validacao.sucesso) {
    return validacao
  }

  const nomeFormatado = formatarNome(usuario.nome)
  const emailFormatado = formatarEmail(usuario.email)

  salvarDados(nomeFormatado, emailFormatado);

  return {
    sucesso: true,
    usuario: { nome: nomeFormatado, email: emailFormatado },
  };
}

const usuarioValido = { nome: "simon oliveira sousa" , email: "simonsousa335@gmail.com" }
const resultadoValido = processarDadosUsuario(usuarioValido)
console.log(resultadoValido)