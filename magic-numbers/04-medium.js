/**
 * Exercício 4:
 * Melhore a função de formatação de tempo eliminando os números mágicos.
 */

function formatarTempo(segundos) {
  const horas = Math.floor(segundos / 3600);
  const minutos = Math.floor((segundos % 3600) / 60);
  const segundosRestantes = segundos % 60;

  return `${horas.toString().padStart(2, "0")}:${minutos
    .toString()
    .padStart(2, "0")}:${segundosRestantes.toString().padStart(2, "0")}`;
}
