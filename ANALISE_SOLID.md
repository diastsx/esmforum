# Análise dos princípios SOLID

## Contexto

O backend do ESM Forum concentra suas principais responsabilidades em `server.js`, `modelo.js` e `bd/bd_utils.js`.

A partir dessa estrutura, são identificados pontos de aderência e oportunidades de melhoria em relação aos princípios SOLID.

## Pontos positivos

### 1. Separação entre HTTP e persistência

**Princípio relacionado:** Single Responsibility Principle (SRP)

As rotas de `server.js` recebem as requisições e delegam as operações ao `modelo.js`, sem executar SQL diretamente.

```javascript
app.post('/perguntas', (req, res) => {
  try {
    const id_pergunta = modelo.cadastrar_pergunta(req.body.pergunta);
    res.json({id_pergunta: id_pergunta});
  }
  catch(erro) {
    res.status(500).json(erro.message);
  }
});
```

A persistência é realizada pelo modelo:

```javascript
function cadastrar_pergunta(texto) {
  const params = [texto, 1];
  const result = bd.exec(
    'INSERT INTO perguntas (texto, id_usuario) VALUES(?, ?) RETURNING id_pergunta',
    params
  );
  return result.lastInsertRowid;
}
```

Assim, a rota não precisa conhecer os comandos utilizados para acessar o banco.

### 2. Operações específicas no modelo

**Princípio relacionado:** Single Responsibility Principle (SRP)

As funções de `modelo.js` possuem objetivos definidos:

```javascript
function get_pergunta(id_pergunta) {
  return bd.query(
    'select * from perguntas where id_pergunta = ?',
    [id_pergunta]
  );
}

function get_respostas(id_pergunta) {
  return bd.queryAll(
    'select * from respostas where id_pergunta = ?',
    [id_pergunta]
  );
}
```

Cada função representa uma operação específica sobre perguntas ou respostas, em vez de concentrar diferentes comportamentos em uma única função.

### 3. Acesso ao SQLite encapsulado

**Princípio relacionado:** Single Responsibility Principle (SRP)

`bd/bd_utils.js` concentra o uso direto da biblioteca `better-sqlite3`:

```javascript
function query(query, params) {
  return bd.prepare(query).get(params);
}

function queryAll(query, params) {
  return bd.prepare(query).all(params);
}

function exec(statement, params) {
  return bd.prepare(statement).run(params);
}
```

Os demais módulos utilizam essas operações sem manipular diretamente a API do `better-sqlite3`.

## Oportunidades de melhoria

### 1. `server.js` acumula responsabilidades

**Princípio violado:** Single Responsibility Principle (SRP)

Além de definir as rotas, `server.js` configura o Express e o CORS, trata requisições e respostas e inicia o servidor HTTP.

```javascript
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
```

Com o crescimento da aplicação, as rotas poderiam ser separadas em módulos próprios, reduzindo a quantidade de responsabilidades desse arquivo.

### 2. `modelo.js` depende diretamente de `bd_utils.js`

**Princípio violado:** Dependency Inversion Principle (DIP)

O modelo importa diretamente a implementação utilizada para acesso aos dados:

```javascript
var bd = require('./bd/bd_utils.js');
```

A função `reconfig_bd()` permite substituir essa dependência nos testes:

```javascript
function reconfig_bd(mock_bd) {
  bd = mock_bd;
}
```

Apesar disso, a dependência concreta ainda é definida pelo próprio módulo. Uma alternativa seria recebê-la externamente:

```javascript
function criarModelo(repositorio) {
  return {
    listarPerguntas() {
      return repositorio.listarPerguntas();
    }
  };
}
```

Dessa forma, o modelo dependeria apenas das operações esperadas do repositório, facilitando a substituição da implementação de persistência.
