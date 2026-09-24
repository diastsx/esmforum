# Histórias de Usuário

## História 1: Busca de perguntas por palavra-chave

**Como** usuário do fórum,  
**Eu quero** buscar perguntas por palavra-chave,  
**Para** localizar rapidamente discussões relacionadas ao assunto que procuro.

### Critérios de Aceitação

- [ ] O sistema deve disponibilizar um campo de busca na interface de perguntas.
- [ ] A busca deve considerar o texto das perguntas cadastradas.
- [ ] O sistema deve exibir apenas as perguntas que contenham o termo informado.
- [ ] A busca não deve diferenciar letras maiúsculas de minúsculas.
- [ ] Quando nenhuma pergunta corresponder ao termo, o sistema deve informar que não foram encontrados resultados.

---

## História 2: Categorização de perguntas por tags

**Como** usuário do fórum,  
**Eu quero** associar tags às perguntas,  
**Para** organizar o conteúdo por assunto e facilitar a identificação de temas relacionados.

### Critérios de Aceitação

- [ ] Cada pergunta deve permitir a associação de uma ou mais tags.
- [ ] As tags associadas devem ser exibidas junto à pergunta.
- [ ] O sistema deve permitir consultar perguntas associadas a uma tag.
- [ ] Uma mesma tag pode estar associada a várias perguntas.
- [ ] A relação entre pergunta e tag deve permanecer armazenada após o encerramento da aplicação.

---

## História 3: Notificação de novas respostas

**Como** autor de uma pergunta,  
**Eu quero** ser notificado quando minha pergunta receber uma nova resposta,  
**Para** acompanhar as interações sem precisar verificar manualmente cada pergunta.

### Critérios de Aceitação

- [ ] O sistema deve criar uma notificação quando uma pergunta receber uma nova resposta.
- [ ] A notificação deve estar associada ao autor da pergunta.
- [ ] O usuário deve conseguir visualizar suas notificações.
- [ ] O sistema deve distinguir notificações lidas e não lidas.
- [ ] O usuário deve poder marcar uma notificação como lida.

---

## Priorização

As histórias foram priorizadas na seguinte ordem:

1. **Busca de perguntas por palavra-chave**
2. **Categorização de perguntas por tags**
3. **Notificação de novas respostas**

A busca recebeu a maior prioridade porque pode ser adicionada utilizando diretamente o conteúdo já existente das perguntas e oferece valor imediato ao usuário, sem depender da criação de novas entidades de domínio ou de identificação completa de usuários.

A categorização por tags foi posicionada em segundo lugar porque complementa a busca e melhora a organização do conteúdo, mas exige a inclusão de novas estruturas para representar as tags e sua associação com as perguntas.

As notificações ficaram em terceiro lugar porque dependem de uma representação mais completa do usuário e da relação entre uma pergunta e seu autor. Apesar de oferecerem valor ao acompanhamento das discussões, sua implementação exige alterações mais amplas no modelo atual.
