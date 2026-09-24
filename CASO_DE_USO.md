# Caso de Uso Detalhado

## Caso de Uso: Buscar perguntas por palavra-chave

**Atores:** Usuário do fórum

### Pré-condições

- O sistema está disponível para uso.
- O usuário está na página de listagem de perguntas.

### Fluxo Principal

1. O sistema exibe a lista de perguntas e um campo de busca.
2. O usuário informa uma palavra ou expressão no campo de busca.
3. O usuário solicita a realização da busca.
4. O sistema recebe o termo informado.
5. O sistema procura perguntas cujo texto contenha o termo de busca, sem diferenciar letras maiúsculas de minúsculas.
6. O sistema retorna as perguntas correspondentes.
7. A interface exibe somente as perguntas encontradas.
8. O usuário pode selecionar uma das perguntas exibidas para visualizar suas respostas.

### Fluxo Alternativo 1: Nenhuma pergunta encontrada

5a. O sistema não encontra perguntas cujo texto corresponda ao termo informado.  
6a. O sistema retorna uma lista vazia.  
7a. A interface informa ao usuário que nenhuma pergunta foi encontrada.

### Fluxo Alternativo 2: Termo de busca vazio

3a. O usuário solicita a busca sem informar uma palavra ou expressão.  
4a. O sistema considera que não há filtro de busca.  
5a. O sistema apresenta novamente a lista completa de perguntas.

### Pós-condições

- Quando existirem correspondências, a interface apresenta apenas as perguntas relacionadas ao termo pesquisado.
- Quando não existirem correspondências, o usuário é informado de que nenhum resultado foi encontrado.
- Nenhuma pergunta ou resposta é alterada pela realização da busca.
