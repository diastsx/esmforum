const criar_servico_perguntas = require('../servicos/perguntas.js');
const buscar_por_texto = require('../estrategias/buscar_por_texto.js');

const perguntas = [
  { id_pergunta: 1, texto: 'Como instalar o ESM Forum?', id_usuario: 1, num_respostas: 2 },
  { id_pergunta: 2, texto: 'Onde ficam as respostas?', id_usuario: 2, num_respostas: 0 }
];

const modelo = { listar_perguntas: jest.fn(() => perguntas) };
const servico = criar_servico_perguntas(modelo, buscar_por_texto);

test('retorna perguntas cujo texto contém o termo', () => {
  expect(servico.listar_perguntas('instalar')).toEqual([perguntas[0]]);
  expect(servico.listar_perguntas('instalar')[0]).toBe(perguntas[0]);
});

test('busca sem diferenciar maiúsculas e minúsculas', () => {
  expect(servico.listar_perguntas('eSm FoRuM')).toEqual([perguntas[0]]);
});

test('retorna lista vazia quando não há correspondência', () => {
  expect(servico.listar_perguntas('inexistente')).toEqual([]);
});

test('termo vazio ou ausente retorna todas as perguntas com seus campos', () => {
  expect(servico.listar_perguntas('')).toBe(perguntas);
  expect(servico.listar_perguntas('   ')).toBe(perguntas);
  expect(servico.listar_perguntas()).toBe(perguntas);
  expect(servico.listar_perguntas()[0].num_respostas).toBe(2);
});
