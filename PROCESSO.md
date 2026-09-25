# Processo de desenvolvimento

## Processo escolhido

Para o desenvolvimento das novas funcionalidades do ESM Forum foi adotado o **Kanban**.

A escolha se deve ao tamanho do projeto e ao desenvolvimento individual. Como as funcionalidades já estão definidas, um fluxo contínuo permite acompanhar o trabalho sem a necessidade de sprints ou cerimônias periódicas.

Também foi adotado limite de trabalho em andamento para evitar que várias funcionalidades sejam iniciadas ao mesmo tempo.

## Estrutura do board

O GitHub Project foi organizado nas seguintes colunas:

- **Backlog:** funcionalidades identificadas e ainda não preparadas para início;
- **Pronto para desenvolvimento:** itens priorizados e disponíveis para serem iniciados;
- **Em andamento:** funcionalidade atualmente em desenvolvimento;
- **Em revisão:** item sendo verificado antes da conclusão;
- **Concluído:** trabalho finalizado e validado.

Foi definido limite de **um item** nas colunas `Em andamento` e `Em revisão`.

## Fluxo de trabalho

O fluxo adotado é:

`Backlog → Pronto para desenvolvimento → Em andamento → Em revisão → Concluído`

Uma funcionalidade sai do Backlog quando estiver prevista para desenvolvimento. Ao iniciar o trabalho, passa para `Em andamento`.

Depois da implementação e dos testes, o item segue para `Em revisão`. Se forem encontrados problemas, retorna para `Em andamento`. Após a validação, passa para `Concluído`.

## Priorização inicial

As cinco funcionalidades foram cadastradas como issues e adicionadas ao GitHub Project.

| Prioridade | Funcionalidade |
| --- | --- |
| P1 - Muito alta | Busca de perguntas por palavra-chave |
| P2 - Alta | Categorização de perguntas por tags |
| P3 - Média | Notificação de novas respostas |
| P4 - Baixa | Sistema de votação em perguntas |
| P5 - Muito baixa | Perfil de usuário |

A **busca por palavra-chave** recebeu a maior prioridade porque utiliza diretamente o conteúdo já existente das perguntas e não depende de novas estruturas de usuário.

A **categorização por tags** ficou em segundo lugar por complementar a organização e a localização do conteúdo.

As **notificações** ficaram em terceiro porque dependem de uma representação mais completa dos usuários e da autoria das perguntas.

O **sistema de votação** também depende da identificação dos usuários para controlar votos repetidos ou alterações de voto.

O **perfil de usuário** recebeu a menor prioridade inicial por exigir uma ampliação maior do modelo atual de usuários.
