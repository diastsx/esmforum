# Análise arquitetural

## Arquitetura atual

O ESM Forum utiliza uma arquitetura cliente-servidor. O frontend em React funciona como cliente e se comunica por HTTP com o backend em Express, que disponibiliza os dados em JSON.

No backend também existe uma separação em camadas, ainda que simples.

### Apresentação

O frontend React é responsável pela interface com o usuário.

No backend, `server.js` recebe as requisições HTTP, acessa os parâmetros enviados e devolve as respostas da API.

### Negócio

A busca possui uma separação específica de negócio: `servicos/perguntas.js` coordena a listagem e a aplicação do filtro, enquanto `estrategias/buscar_por_texto.js` contém a regra de busca por texto.

As demais operações ainda são chamadas diretamente de `server.js` para `modelo.js`.

### Dados

A persistência está distribuída entre `modelo.js`, que contém as consultas SQL de perguntas e respostas, e `bd/bd_utils.js`, que encapsula o uso da biblioteca `better-sqlite3`.

Por isso, a separação entre negócio e dados ainda não é completa na estrutura atual.

## Comunicação

O frontend utiliza `fetch` para realizar requisições ao backend em `http://localhost:5000`.

O fluxo principal é:

Frontend React → API Express → lógica da aplicação → acesso ao SQLite → resposta JSON → Frontend React.

## Diagrama arquitetural

![Diagrama arquitetural](arquitetura.png)
