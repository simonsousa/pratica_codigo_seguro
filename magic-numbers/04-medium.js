/**
 * Exercício 4:
 * Melhore a função de formatação de tempo eliminando os números mágicos.
 */

function listaDeNumerosTemporais(){
  return{
    UMA_HORA_EM_SEGUNDOS: 3600,
    UM_MINUTO_EM_SEGUNDOS: 60
  }
}

function formatarTempo(segundos) {
  const {UMA_HORA_EM_SEGUNDOS, UM_MINUTO_EM_SEGUNDOS} = listaDeNumerosTemporais()
  
  const horas = Math.floor(segundos / UMA_HORA_EM_SEGUNDOS);
  const minutos = Math.floor((segundos % UMA_HORA_EM_SEGUNDOS) / UM_MINUTO_EM_SEGUNDOS);
  const segundosRestantes = segundos % UM_MINUTO_EM_SEGUNDOS;

  const MAX_DE_ALGARISMOS = 2
  const PREENCHIMENTO_NUMEROS_QUE_FALTAM = "0"

  return `${horas.toString().padStart(MAX_DE_ALGARISMOS, PREENCHIMENTO_NUMEROS_QUE_FALTAM)}:${minutos
    .toString().padStart(MAX_DE_ALGARISMOS, PREENCHIMENTO_NUMEROS_QUE_FALTAM)}:${segundosRestantes
    .toString().padStart(MAX_DE_ALGARISMOS, PREENCHIMENTO_NUMEROS_QUE_FALTAM)}`;
}

console.log(formatarTempo(3600))