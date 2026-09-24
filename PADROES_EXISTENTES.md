# Padrões de projeto existentes

## Strategy

O padrão Strategy está presente na funcionalidade de busca de perguntas.

A estratégia de busca por texto está isolada em `estrategias/buscar_por_texto.js`:

```javascript
function buscar_por_texto(perguntas, termo) {
  const texto_busca = termo.toLowerCase();

  return perguntas.filter(pergunta =>
    pergunta.texto.toLowerCase().includes(texto_busca)
  );
}

module.exports = buscar_por_texto;
```

O serviço recebe a estratégia como dependência:

```javascript
function criar_servico_perguntas(modelo, buscar_por_texto) {
  return {
    listar_perguntas(busca) {
      const perguntas = modelo.listar_perguntas();
      const termo = typeof busca === 'string' ? busca.trim() : '';

      return termo ? buscar_por_texto(perguntas, termo) : perguntas;
    }
  };
}
```

Assim, o algoritmo de busca pode ser substituído sem alterar a lógica do serviço.

A implementação é suficiente para a funcionalidade atual. Caso outras formas de busca sejam adicionadas, as estratégias poderiam seguir um contrato comum mais explícito.

## Facade

O arquivo `bd/bd_utils.js` funciona parcialmente como uma Facade para o acesso ao SQLite.

Ele concentra as operações feitas diretamente com `better-sqlite3` e oferece uma interface menor para o restante do sistema:

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

Dessa forma, `modelo.js` não precisa utilizar diretamente a API da biblioteca `better-sqlite3`.

A aplicação do padrão é parcial, pois `modelo.js` ainda conhece e envia comandos SQL diretamente para essa camada. Uma separação maior poderia encapsular também as consultas específicas do domínio, deixando os demais módulos menos dependentes dos detalhes da persistência.
