function buscar_por_texto(perguntas, termo) {
  const texto_busca = termo.toLowerCase();
  return perguntas.filter(pergunta => pergunta.texto.toLowerCase().includes(texto_busca));
}

module.exports = buscar_por_texto;
