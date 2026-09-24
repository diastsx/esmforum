function criar_servico_perguntas(modelo, buscar_por_texto) {
  return {
    listar_perguntas(busca) {
      const perguntas = modelo.listar_perguntas();
      const termo = typeof busca === 'string' ? busca.trim() : '';
      return termo ? buscar_por_texto(perguntas, termo) : perguntas;
    }
  };
}

module.exports = criar_servico_perguntas;
