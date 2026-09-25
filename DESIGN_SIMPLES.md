# Design simples no ESM Forum

## Contexto

O princípio YAGNI (*You Aren't Gonna Need It*) orienta a evitar funcionalidades e abstrações antes que exista uma necessidade concreta para elas.

Na estrutura atual do ESM Forum, as rotas HTTP estão concentradas em `server.js`, `modelo.js` contém as operações relacionadas a perguntas e respostas e `bd/bd_utils.js` encapsula o acesso ao SQLite.

## Aspectos que seguem o design simples

### Rotas limitadas às funcionalidades existentes

O backend possuía quatro operações HTTP principais:

```javascript
app.get('/', ...);
app.post('/perguntas', ...);
app.get('/respostas/:id_pergunta', ...);
app.post('/respostas', ...);
```

Não havia rotas ou estruturas antecipadas para votação, tags, perfis ou notificações.

Por exemplo, o cadastro de perguntas delegava diretamente ao modelo:

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

Para o tamanho do sistema naquele momento, não havia necessidade de acrescentar controllers ou services apenas para encaminhar essa operação.

### Operações específicas no modelo

As funções de `modelo.js` correspondem diretamente às operações necessárias:

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

Em vez de uma solução genérica para qualquer entidade, o projeto utiliza funções específicas para perguntas e respostas.

### Abstração simples para o banco

O arquivo `bd/bd_utils.js` oferece apenas as operações de banco utilizadas pela aplicação:

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

Não foi introduzido ORM ou suporte a diferentes bancos sem que houvesse essa necessidade.

## Oportunidades de simplificação

### Configuração CORS

O servidor permite:

```javascript
res.setHeader(
  'Access-Control-Allow-Methods',
  'GET, POST, PUT, DELETE'
);

res.setHeader(
  'Access-Control-Allow-Headers',
  'Content-Type, Authorization'
);
```

Porém, a API utiliza apenas `GET` e `POST` e não possui autenticação por `Authorization`.

A configuração poderia ser limitada ao que o sistema utiliza atualmente e ampliada quando novas operações fossem implementadas.

### Arquivo HTML sem uso

O backend contém `public/sobre.html`, mas `server.js` não disponibiliza esse arquivo. O frontend React também já possui uma página `Sobre`.

Caso o arquivo não seja utilizado por outro fluxo, ele pode ser removido.

## Considerações

Algumas repetições ainda são aceitáveis no tamanho atual do sistema. Os blocos `try/catch` das rotas, por exemplo, poderiam ser abstraídos, mas a criação imediata de um mecanismo genérico também acrescentaria complexidade.

Da mesma forma, a concentração inicial das rotas em `server.js` era suficiente para o projeto existente. Novas camadas passam a fazer sentido quando as funcionalidades adicionadas criam uma necessidade concreta de separação.

O projeto, portanto, apresenta vários exemplos de YAGNI ao resolver os requisitos existentes sem preparar antecipadamente estruturas para funcionalidades ainda não implementadas.
