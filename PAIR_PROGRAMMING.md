# Planejamento de Pair Programming

## Contexto

Este projeto está sendo desenvolvido individualmente. Por esse motivo, o pair programming não será aplicado diretamente durante a implementação.

Em uma situação de desenvolvimento em dupla, a prática seria utilizada principalmente durante a implementação das novas funcionalidades e em refatorações que alterassem partes importantes do backend ou do frontend.

## Estratégia

O trabalho seria realizado em sessões síncronas, com os dois desenvolvedores acompanhando o mesmo código.

Durante cada sessão seriam utilizados os papéis tradicionais de pair programming:

- **Driver:** responsável por escrever o código e executar comandos e testes;
- **Navigator:** responsável por acompanhar a implementação, revisar o raciocínio, identificar possíveis problemas e pensar nos próximos passos.

O objetivo não seria dividir a funcionalidade em duas partes independentes, mas manter os dois participantes envolvidos na mesma tarefa e nas decisões tomadas durante sua implementação.

Antes de iniciar uma alteração, a dupla definiria brevemente o comportamento esperado. Durante a implementação, o navigator acompanharia a aderência aos requisitos e sugeriria melhorias quando necessário. Ao final, ambos participariam da execução dos testes e da revisão do código produzido.

## Ferramentas

As principais ferramentas seriam:

- **Visual Studio Code**, como ambiente de desenvolvimento;
- **VS Code Live Share**, para permitir edição e acompanhamento do código em tempo real;
- **Discord ou Google Meet**, para comunicação por voz e eventual compartilhamento de tela;
- **Git e GitHub**, para versionamento, revisão das alterações e acompanhamento das funcionalidades pelo GitHub Projects.

O Live Share permitiria que ambos trabalhassem sobre a mesma sessão de desenvolvimento sem a necessidade de transmitir arquivos entre os participantes.

## Rotação de papéis

Os papéis de driver e navigator seriam alternados durante as sessões.

A troca poderia ocorrer aproximadamente a cada 30 minutos ou ao término de uma etapa pequena da implementação, como:

1. criação ou alteração de uma função;
2. implementação de uma rota;
3. conclusão de um teste;
4. correção de um problema identificado durante a sessão.

A rotação evita que apenas um participante permaneça responsável pela escrita do código e permite que ambos tenham contato direto com a implementação e com a revisão.

Em uma funcionalidade maior, a dupla poderia iniciar com um participante como driver e trocar os papéis diversas vezes até sua conclusão.

## Aplicação no ESM Forum

No ESM Forum, a prática seria especialmente útil em atividades como:

- implementação da busca de perguntas;
- alterações no modelo de dados para inclusão de novas funcionalidades;
- criação de novas rotas no backend;
- integração das funcionalidades com o frontend;
- escrita e revisão dos testes;
- refatorações relacionadas aos princípios SOLID e aos padrões de projeto.

Nessas situações, o navigator poderia observar não apenas erros de implementação, mas também se a solução está introduzindo complexidade desnecessária ou se está coerente com a arquitetura existente.

## Conclusão

O pair programming seria utilizado como uma prática colaborativa de implementação e revisão contínua. A alternância entre driver e navigator permitiria compartilhar o entendimento do código e discutir as decisões técnicas no momento em que são tomadas, em vez de realizar a revisão somente após a implementação estar concluída.
