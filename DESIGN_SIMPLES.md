# Design simples no ESM Forum

## Contexto da análise

O princípio YAGNI (*You Aren't Gonna Need It*) orienta a evitar funcionalidades, abstrações e estruturas que ainda não são necessárias. Em vez de tentar antecipar todas as possíveis evoluções do sistema, a implementação deve atender de forma simples aos requisitos que existem no momento.

O enunciado da atividade menciona os arquivos `routes/perguntas.js` e `routes/respostas.js`. Na versão analisada do ESM Forum, essas pastas e arquivos não existem. As rotas HTTP estão concentradas em `server.js`, enquanto `modelo.js` contém as operações relacionadas a perguntas e respostas e `bd/bd_utils.js` encapsula o acesso ao SQLite. Por isso, a análise considera esses arquivos equivalentes da estrutura atual do projeto.

## Aspectos que seguem o design simples

### 1. Rotas implementam apenas as operações existentes

O backend possui quatro operações HTTP principais:

```javascript
app.get('/', ...);
app.post('/perguntas', ...);
app.get('/respostas/:id_pergunta', ...);
app.post('/respostas', ...);
````

Não existem rotas genéricas para recursos que o sistema ainda não oferece, nem estruturas preparadas antecipadamente para votação, tags, perfis ou notificações.

Por exemplo, o cadastro de perguntas chama diretamente a operação necessária do modelo:

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

Para o tamanho atual da aplicação, não foi criada uma cadeia adicional de controllers, services ou handlers apenas para encaminhar essa operação. Essa escolha mantém o fluxo fácil de acompanhar e evita abstrações que ainda não possuem uma necessidade concreta.

Isso não significa que essas camadas nunca devam existir. Com o crescimento do sistema, algumas delas podem se tornar justificadas. No estado atual, porém, criá-las apenas para prever uma possível necessidade futura contrariaria a ideia de YAGNI.

### 2. O modelo utiliza operações específicas e pequenas

Em `modelo.js`, as operações correspondem diretamente às necessidades atuais do fórum:

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

Não foi criado um repositório genérico capaz de manipular qualquer entidade, um sistema próprio de consultas ou uma hierarquia de classes para representar operações simples sobre duas tabelas.

Nesse contexto, funções específicas tornam o comportamento explícito e suficiente para os requisitos existentes.

### 3. O acesso ao banco possui uma abstração pequena

O arquivo `bd/bd_utils.js` encapsula somente as operações de banco de que a aplicação efetivamente precisa:

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

A aplicação não introduz um ORM, uma camada de persistência complexa ou abstrações para múltiplos bancos de dados que não são utilizados. O sistema trabalha com SQLite e oferece apenas as operações necessárias para consultá-lo.

Essa é uma aplicação prática de design simples: existe uma separação mínima entre a lógica do modelo e a biblioteca de banco, sem tentar resolver antecipadamente cenários que o projeto não possui.

## Oportunidades de simplificação

### 1. Configuração CORS declara capacidades que a API não utiliza

O `server.js` atualmente configura:

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

Entretanto, a API atual possui apenas rotas `GET` e `POST` e não implementa autenticação por meio do cabeçalho `Authorization`.

Assim, a configuração anuncia métodos e um cabeçalho que não correspondem a funcionalidades existentes. Uma configuração alinhada apenas às necessidades atuais reduziria essa antecipação.

Caso operações de atualização, exclusão ou autenticação sejam implementadas futuramente, essas permissões poderão ser acrescentadas quando forem realmente necessárias.

### 2. Existe um arquivo HTML no backend que não é utilizado

O repositório contém `public/sobre.html`, mas o servidor não registra `express.static()` nem possui uma rota que entregue esse arquivo. A aplicação React já possui uma página `Sobre`.

Se for confirmado que esse arquivo não participa de nenhum fluxo externo ao código analisado, sua remoção deixaria o projeto mais simples ao eliminar um artefato sem uso.

## Simplificações que não seriam vantajosas

Design simples não significa necessariamente reduzir o número de arquivos ou eliminar toda repetição.

Por exemplo, os blocos `try/catch` das rotas possuem alguma repetição. Seria possível criar imediatamente um middleware ou uma função genérica para tratamento de erros. Porém, com apenas quatro rotas, essa abstração também adicionaria um novo mecanismo que o desenvolvedor precisaria compreender.

No estado atual, a repetição é pequena. Uma abstração para tratamento de erros passa a ser mais justificável se a quantidade de rotas crescer durante a evolução do sistema.

Da mesma forma, concentrar as rotas em `server.js` é compreensível no sistema minimalista atual. Com a inclusão das novas funcionalidades solicitadas, esse arquivo poderá crescer a ponto de a separação em módulos de rotas, controllers e serviços passar a resolver um problema concreto. Nesse momento, a refatoração deixará de ser uma antecipação e passará a responder a uma necessidade observável.

## Conclusão

O backend do ESM Forum apresenta um design deliberadamente pequeno: poucas rotas, funções específicas para as operações do domínio e uma abstração mínima para o banco SQLite.

A principal característica compatível com YAGNI não é simplesmente possuir pouco código, mas evitar mecanismos genéricos para problemas que o sistema ainda não enfrenta.

Ao mesmo tempo, design simples não deve impedir evolução. As novas funcionalidades propostas para o projeto podem justificar novas separações e abstrações conforme a complexidade realmente surgir. Assim, o objetivo é manter a solução tão simples quanto os requisitos permitem, sem tentar antecipar toda a arquitetura futura.
