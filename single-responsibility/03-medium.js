/**
 * Exercício 3:
 * Refatore esta função para seguir o princípio de responsabilidade única,
 * separando as preocupações de obtenção de dados, validação, transformação e apresentação.
 */

async function exibirDadosUsuario(id) {
  try {
    const resposta = await fetch(`https://api.exemplo.com/usuarios/${id}`);
    if (!resposta.ok) {
      console.error("Erro ao buscar dados do usuário");
      return;
    }

    const usuario = await resposta.json();

    if (!usuario.nome || !usuario.email || !usuario.endereco) {
      console.error("Dados do usuário incompletos");
      return;
    }

    const enderecoFormatado = `${usuario.endereco.rua}, ${usuario.endereco.numero} - ${usuario.endereco.cidade}/${usuario.endereco.estado}`;

    const elementoNome = document.getElementById("nome-usuario");
    const elementoEmail = document.getElementById("email-usuario");
    const elementoEndereco = document.getElementById("endereco-usuario");

    elementoNome.textContent = usuario.nome;
    elementoEmail.textContent = usuario.email;
    elementoEndereco.textContent = enderecoFormatado;

    document.getElementById("carregando").style.display = "none";
    document.getElementById("dados-usuario").style.display = "block";
  } catch (erro) {
    console.error("Falha ao processar dados do usuário:", erro);
  }
}
