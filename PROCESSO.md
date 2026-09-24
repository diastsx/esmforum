# Processo de desenvolvimento

## Processo escolhido

Para o desenvolvimento das novas funcionalidades do ESM Forum foi adotado o **Kanban**.

O Kanban organiza o trabalho por meio de um fluxo visual, no qual os itens passam por diferentes estados conforme avançam no processo de desenvolvimento. Diferentemente de um processo baseado em iterações fixas, como Scrum, o trabalho pode avançar continuamente de acordo com a capacidade disponível.

Essa característica é adequada ao ESM Forum porque o projeto possui um conjunto pequeno e já conhecido de funcionalidades e está sendo desenvolvido individualmente. Nesse contexto, a adoção de sprints e cerimônias periódicas acrescentaria uma estrutura que não é necessária para acompanhar a evolução do trabalho.

Além da visualização do fluxo, foi adotada a limitação do trabalho em andamento. Isso ajuda a evitar que várias funcionalidades sejam iniciadas ao mesmo tempo sem que as anteriores sejam concluídas.

## Estrutura do board

O GitHub Project foi organizado com as seguintes colunas:

- **Backlog:** funcionalidades identificadas, mas que ainda não estão preparadas para início imediato;
- **Pronto para desenvolvimento:** itens priorizados e disponíveis para serem iniciados;
- **Em andamento:** funcionalidade que está sendo desenvolvida;
- **Em revisão:** item cuja implementação ou documentação está sendo conferida antes da conclusão;
- **Concluído:** trabalho finalizado e validado.

Foi definido um limite de **um item** simultâneo nas colunas `Em andamento` e `Em revisão`.

Como o desenvolvimento é individual, esse limite permite concentrar o trabalho em uma funcionalidade por vez e reduz a quantidade de tarefas parcialmente concluídas.

## Fluxo de trabalho

O fluxo adotado é:

`Backlog → Pronto para desenvolvimento → Em andamento → Em revisão → Concluído`

Uma funcionalidade somente deve sair do Backlog quando houver intenção de desenvolvê-la em seguida. Ao iniciar efetivamente o trabalho, ela passa para `Em andamento`.

Depois da implementação ou elaboração dos artefatos correspondentes, o item passa por `Em revisão`, etapa utilizada para verificar funcionamento, requisitos e documentação. Somente após essa verificação o item é considerado `Concluído`.

Caso sejam identificados problemas durante a revisão, o item pode retornar para `Em andamento`.

## Priorização inicial

As cinco funcionalidades solicitadas foram cadastradas como issues e adicionadas ao GitHub Project. A priorização inicial adotada foi:

| Prioridade | Funcionalidade |
| --- | --- |
| P1 - Muito alta | Busca de perguntas por palavra-chave |
| P2 - Alta | Categorização de perguntas por tags |
| P3 - Média | Notificação de novas respostas |
| P4 - Baixa | Sistema de votação em perguntas |
| P5 - Muito baixa | Perfil de usuário |

A **busca por palavra-chave** recebeu a maior prioridade porque acrescenta uma forma direta de localizar conteúdo utilizando a estrutura já existente do fórum, sem depender previamente de novos mecanismos de identificação de usuários.

A **categorização por tags** vem em seguida por complementar a organização e a descoberta das perguntas.

As **notificações de novas respostas** foram posicionadas em terceiro lugar por oferecerem valor ao acompanhamento das discussões, embora uma implementação mais completa dependa da identificação dos usuários.

O **sistema de votação** apresenta dependência semelhante, principalmente para controlar votos repetidos ou alterações de voto.

Por fim, o **perfil de usuário** recebeu a menor prioridade inicial porque exige ampliar de forma mais significativa o modelo atual de usuários do sistema e serve de base para outras funcionalidades relacionadas à identidade.

Essa ordem representa o planejamento inicial e pode ser revista caso as necessidades do projeto mudem durante o desenvolvimento.
