# Instalação e execução do ESM Forum

Este documento descreve a configuração do ambiente de desenvolvimento do ESM Forum, composto por um backend em Node.js com Express e SQLite e um frontend em React.

## Pré-requisitos

Para executar o projeto, é necessário ter instalado:

* Node.js 24.x;
* npm;
* Git.

O backend está configurado para utilizar Node.js 24. A versão utilizada durante a configuração e os testes do projeto foi a 24.21.0.

## Repositórios

O sistema é dividido em dois repositórios:

* `esmforum`: backend da aplicação;
* `esmforum-react`: frontend da aplicação.

Após realizar o fork dos repositórios originais, ambos devem ser clonados para o ambiente local.

Uma organização possível é:

```text
Projeto-Final-ES1/
├── esmforum/
└── esmforum-react/
```

## Backend

Acesse a pasta do backend:

```bash
cd esmforum
```

Instale as dependências utilizando o lockfile do projeto:

```bash
npm ci
```

Para verificar o backend por meio dos testes automatizados:

```bash
npm test
```

Na configuração validada durante o desenvolvimento, são executadas duas suítes com três testes.

Para iniciar o servidor:

```bash
node server.js
```

O backend ficará disponível em:

```text
http://localhost:5000
```

O banco utilizado pela aplicação encontra-se em:

```text
bd/esmforum.db
```

## Frontend

Em outro terminal, acesse a pasta do frontend:

```bash
cd esmforum-react
```

Instale as dependências:

```bash
npm ci
```

Inicie o servidor de desenvolvimento:

```bash
npm start
```

O frontend ficará disponível, por padrão, em:

```text
http://localhost:3000
```

O frontend realiza requisições HTTP ao backend executado em `http://localhost:5000`.

## Verificação da instalação

Com backend e frontend em execução simultaneamente, foram verificados os seguintes fluxos:

1. carregamento da página inicial;
2. listagem das perguntas existentes;
3. cadastro de uma nova pergunta;
4. acesso à página de uma pergunta;
5. cadastro de uma nova resposta;
6. atualização da quantidade de respostas exibida na listagem.

Os fluxos foram executados corretamente no ambiente utilizado para o desenvolvimento.

## Observações

O backend foi atualizado para utilizar Node.js 24.x e `better-sqlite3` 12.11.1, mantendo a compatibilidade com o ambiente atual de desenvolvimento.

A dependência npm `sqlite3`, que não era utilizada pelo código da aplicação, foi removida. O comando de linha de comando `sqlite3` mencionado pelo script `bd/criar_bd.sh` é independente desse pacote npm e somente é necessário caso seja desejado recriar manualmente o banco de dados.
