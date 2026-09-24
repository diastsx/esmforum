# Análise dos princípios SOLID

## Contexto

O backend do ESM Forum é pequeno e concentra suas principais responsabilidades em três arquivos: `server.js`, com as rotas e a configuração do Express; `modelo.js`, com as operações de perguntas e respostas; e `bd/bd_utils.js`, com o acesso ao SQLite.

A análise a seguir considera essa estrutura para identificar pontos de aderência e de melhoria em relação aos princípios SOLID.

## Pontos positivos

### 1. Separação entre transporte HTTP e operações do domínio

**Princípio relacionado:** Single Responsibility Principle (SRP)

O `server.js` não executa diretamente consultas SQL. As rotas recebem os dados da requisição e delegam as operações ao módulo `modelo.js`.

Exemplo:

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

A persistência da pergunta é realizada pelo modelo:

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

Essa separação evita que a rota acumule também a responsabilidade de conhecer SQL e a estrutura do banco.

### 2. Funções do modelo possuem objetivos específicos

**Princípio relacionado:** Single Responsibility Principle (SRP)

As funções de `modelo.js` executam operações pequenas e claramente delimitadas.

Exemplos:

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

Cada função representa uma operação específica, em vez de existir uma única função genérica responsável por diversos comportamentos do fórum. Isso torna as operações mais fáceis de compreender, testar e modificar isoladamente.

### 3. Acesso ao banco é encapsulado em um módulo próprio

**Princípio relacionado:** Single Responsibility Principle (SRP)

O arquivo `bd/bd_utils.js` concentra a interação direta com `better-sqlite3`:

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

Com isso, os demais módulos não precisam manipular diretamente a API da biblioteca `better-sqlite3`. O módulo possui uma responsabilidade clara: fornecer as operações básicas de acesso ao banco utilizadas pelo restante da aplicação.

A função `reconfig()` também permite substituir o banco utilizado, característica aproveitada pelos testes de integração.

## Oportunidades de melhoria

### 1. `server.js` concentra responsabilidades diferentes

**Princípio violado:** Single Responsibility Principle (SRP)

O arquivo `server.js` atualmente é responsável por:

* criar e configurar a aplicação Express;
* configurar CORS;
* definir todas as rotas;
* tratar requisições e respostas;
* iniciar o servidor HTTP.

Trecho:

```javascript
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// definição das rotas...

const port = 5000;
app.listen(port, 'localhost', () => {
  console.log(`ESM Forum rodando em ${port}`);
});
```

À medida que novas funcionalidades forem adicionadas, esse arquivo tenderá a crescer e acumular motivos diferentes para mudança.

Uma melhoria seria separar a configuração da aplicação, as rotas e a inicialização do servidor em módulos distintos. Por exemplo:

```text
server.js
routes/
    perguntas.js
    respostas.js
```

Essa separação deve ser feita quando a complexidade justificar a estrutura adicional, evitando também abstrações desnecessárias.

### 2. `modelo.js` depende diretamente da implementação de acesso a dados

**Princípio violado:** Dependency Inversion Principle (DIP)

O módulo começa importando diretamente uma implementação concreta:

```javascript
var bd = require('./bd/bd_utils.js');
```

Isso faz com que a lógica de `modelo.js` dependa diretamente do mecanismo de persistência utilizado pelo projeto.

Existe a função:

```javascript
function reconfig_bd(mock_bd) {
  bd = mock_bd;
}
```

que facilita a substituição da dependência durante testes. Essa solução melhora a testabilidade, mas a dependência concreta continua sendo criada pelo próprio módulo em sua inicialização.

Uma aplicação mais completa do DIP faria com que o componente responsável pelas operações do domínio recebesse sua dependência de acesso aos dados externamente.

Por exemplo:

```javascript
function criarModelo(repositorio) {
  return {
    listarPerguntas() {
      return repositorio.listarPerguntas();
    }
  };
}
```

Nesse desenho, a lógica dependeria do contrato esperado do repositório e não precisaria conhecer diretamente `better-sqlite3` ou `bd_utils.js`.

Isso também permitiria trocar a implementação de persistência ou utilizar uma implementação em memória nos testes sem modificar internamente o módulo.
