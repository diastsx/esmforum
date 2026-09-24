# Implementação com SOLID

## Funcionalidade implementada

Foi implementada a busca de perguntas por palavra-chave.

A listagem existente em `GET /` passou a aceitar opcionalmente o parâmetro `busca`:

```text
GET /?busca=termo
```

Sem o parâmetro, a rota mantém o comportamento anterior e retorna todas as perguntas. Quando há um termo, são retornadas apenas as perguntas cujo texto contém a palavra ou expressão informada, sem diferenciação entre letras maiúsculas e minúsculas.

No frontend foi incluído um campo de busca com ações para pesquisar e limpar o filtro.

## Single Responsibility Principle (SRP)

A lógica da busca foi separada em módulos com responsabilidades distintas.

A rota em `server.js` continua responsável pela comunicação HTTP:

```javascript
app.get('/', (req, res) => {
  try {
    const perguntas = servico_perguntas.listar_perguntas(req.query.busca);
    res.send(perguntas);
  }
  catch(erro) {
    res.status(500).json(erro.message);
  }
});
```

O serviço decide se deve retornar a listagem completa ou aplicar uma busca:

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

A estratégia contém somente a regra de comparação do texto:

```javascript
function buscar_por_texto(perguntas, termo) {
  const texto_busca = termo.toLowerCase();

  return perguntas.filter(pergunta =>
    pergunta.texto.toLowerCase().includes(texto_busca)
  );
}
```

Assim, tratamento HTTP, decisão do caso de uso e algoritmo de busca permanecem separados.

## Dependency Inversion Principle (DIP)

O serviço não importa diretamente o modelo nem a estratégia de busca. Essas dependências são recebidas na criação do serviço:

```javascript
function criar_servico_perguntas(modelo, buscar_por_texto) {
```

A composição ocorre em `server.js`:

```javascript
const criar_servico_perguntas = require('./servicos/perguntas.js');
const buscar_por_texto = require('./estrategias/buscar_por_texto.js');

const servico_perguntas =
  criar_servico_perguntas(modelo, buscar_por_texto);
```

Isso permite substituir as dependências sem alterar a implementação do serviço. O mesmo mecanismo facilita os testes, que podem fornecer um modelo controlado sem utilizar o banco de dados real.

## Open/Closed Principle (OCP)

O serviço recebe o algoritmo de busca externamente. Por isso, outra estratégia pode ser utilizada sem alterar sua lógica.

A estratégia atual pesquisa pelo texto:

```javascript
const buscar_por_texto = require('./estrategias/buscar_por_texto.js');
```

Uma estratégia diferente poderia seguir o mesmo contrato:

```javascript
function buscar_por_tag(perguntas, termo) {
  return perguntas.filter(pergunta =>
    pergunta.tags.includes(termo)
  );
}
```

Ela poderia ser fornecida ao serviço no lugar da estratégia atual, mantendo o módulo `servicos/perguntas.js` fechado para modificação e aberto à extensão por novas estratégias.

## Testes

Foram adicionados testes automatizados para verificar:

* busca com correspondência;
* comparação sem diferenciação entre maiúsculas e minúsculas;
* busca sem resultados;
* termo vazio ou ausente retornando todas as perguntas.

Após a implementação, o backend executou três suítes com sete testes aprovados. O frontend também foi validado por meio do build de produção.
