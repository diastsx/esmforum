# Instalação e execução do ESM Forum

O ESM Forum é composto por um backend em Node.js com Express e SQLite e um frontend em React.

## Pré-requisitos

- Node.js 24.x;
- npm;
- Git.

A versão de Node.js utilizada durante o desenvolvimento foi a 24.21.0.

## Repositórios

O sistema está dividido em:

- `esmforum`: backend;
- `esmforum-react`: frontend.

Uma organização possível é:

```text
Projeto-Final-ES1/
├── esmforum/
└── esmforum-react/
```

## Backend

Acesse o diretório:

```bash
cd esmforum
```

Instale as dependências:

```bash
npm ci
```

Execute os testes:

```bash
npm test
```

Na configuração atual, são executadas três suítes com sete testes.

Inicie o servidor:

```bash
node server.js
```

O backend ficará disponível em:

```text
http://localhost:5000
```

O banco utilizado pela aplicação está em:

```text
bd/esmforum.db
```

## Frontend

Em outro terminal:

```bash
cd esmforum-react
```

Instale as dependências:

```bash
npm ci
```

Inicie o frontend:

```bash
npm start
```

Por padrão, a aplicação ficará disponível em:

```text
http://localhost:3000
```

O frontend realiza requisições ao backend em `http://localhost:5000`.

## Verificação

Com os dois projetos em execução, foram verificados:

1. carregamento da página inicial;
2. listagem de perguntas;
3. busca de perguntas por palavra-chave;
4. cadastro de nova pergunta;
5. acesso à página de uma pergunta;
6. cadastro de nova resposta;
7. atualização da quantidade de respostas.

## Observações

O backend utiliza Node.js 24.x e `better-sqlite3` 12.11.1.

A dependência npm `sqlite3`, que não era utilizada pelo código da aplicação, foi removida. O comando `sqlite3` utilizado por `bd/criar_bd.sh` é independente desse pacote npm e só é necessário para recriar manualmente o banco.
