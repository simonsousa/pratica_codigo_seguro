/**
 * Exercício 1:
 * Refatore a função abaixo em múltiplas funções, cada uma com responsabilidade única.
 */

function processarDadosUsuario(usuario) {
  // Validação
  if (!usuario.nome || !usuario.email) {
    return { sucesso: false, mensagem: "Nome e email são obrigatórios" };
  }

  // Formatação
  const nomeFormatado = usuario.nome
    .trim()
    .toLowerCase()
    .split(" ")
    .map((parte) => parte.charAt(0).toUpperCase() + parte.slice(1))
    .join(" ");

  const emailFormatado = usuario.email.trim().toLowerCase();

  // Persistência
  console.log(`Salvando usuário: ${nomeFormatado}, ${emailFormatado}`);

  return {
    sucesso: true,
    usuario: { nome: nomeFormatado, email: emailFormatado },
  };
}
