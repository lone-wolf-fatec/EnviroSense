# EnviroSense

Sistema de Coleta e Monitoramento de Dados de Estações Meteorológicas  
API de Programação Integrada · 4º DSM · Fatec São José dos Campos · 2026-1

---

## Sobre o Projeto

A Tecsus é uma empresa especializada na coleta e processamento de dados por meio de redes de sensores sem fio (IoT), atuando principalmente no monitoramento de utilidades como água, energia e gás. Com o objetivo de expandir seu portfólio para o monitoramento ambiental, a empresa propôs o desenvolvimento de estações meteorológicas de baixo custo capazes de medir parâmetros como direção e velocidade do vento, índice pluviométrico, umidade, temperatura e pressão atmosférica.

Os dados coletados pelas estações são enviados periodicamente a um servidor central, onde são recepcionados, armazenados e disponibilizados em um portal web com dashboards interativos e relatórios para análise.

Perfil de cliente escolhido: Órgão Público (Defesa Civil) — demanda nacional, manutenção facilitada e padrões governamentais.

---

## Equipe

| Integrante | Função | LinkedIn | GitHub |
|-----------|--------|----------|--------|
| Carlos Intrieri | Dev | [linkedin.com/in/carlosintrieri](https://www.linkedin.com/in/carlosintrieri/) | [github.com/carlosintrieri](https://github.com/carlosintrieri) |

---

## Backlog do Produto

### Legenda de Prioridade

| Nível | Significado |
|-------|-------------|
| 1 | Alta — essencial para o funcionamento do sistema |
| 2 | Média — importante, mas não bloqueia o core |
| 3 | Baixa — agrega valor, pode ser entregue depois |

### Legenda de Estimativa

| Faixa | Significado |
|-------|-------------|
| 1 a 3 | Simples — poucos dias |
| 4 a 6 | Médio — uma sprint |
| 7 a 9 | Complexo — mais de uma sprint |

---

### Controle de Acesso e Usuários

| # | Historia de Usuario | Criterios de Aceitacao | Prioridade | Estimativa |
|---|---------------------|------------------------|------------|------------|
| 01 | Como administrador, quero fazer login com e-mail e senha, para acessar as funcionalidades restritas do sistema. | Autenticacao com JWT; bloqueio apos tentativas invalidas; redirecionamento ao painel admin. | 1 | 4 |
| 02 | Como administrador, quero cadastrar, editar e remover usuarios, para controlar quem acessa o sistema. | CRUD completo de usuarios; definicao de nivel de acesso (admin ou publico); confirmacao antes de exclusao. | 1 | 5 |
| 03 | Como usuario publico, quero acessar o portal sem login, para visualizar dados meteorologicos sem necessidade de cadastro. | Acesso a pagina publica sem autenticacao; dados sensiveis e configuracoes nao visiveis. | 1 | 2 |

---

### Estacoes e Sensores

| # | Historia de Usuario | Criterios de Aceitacao | Prioridade | Estimativa |
|---|---------------------|------------------------|------------|------------|
| 04 | Como administrador, quero cadastrar estacoes meteorologicas com seus respectivos sensores e parametros, para que o sistema reconheca e processe os dados recebidos. | CRUD de estacoes; vinculacao de multiplos sensores por estacao; suporte a diferentes tipos de parametros (temperatura, umidade, vento, chuva, pressao). | 1 | 7 |
| 05 | Como administrador, quero editar e desativar estacoes, para gerenciar o ciclo de vida dos dispositivos. | Edicao de nome, localizacao e sensores; status ativo/inativo; historico de alteracoes. | 2 | 4 |
| 06 | Como administrador, quero visualizar no mapa a localizacao das estacoes cadastradas, para ter visao geografica da cobertura do sistema. | Mapa interativo com marcadores por estacao; clique no marcador exibe dados basicos da estacao. | 3 | 6 |

---

### Recepcao e Armazenamento de Dados

| # | Historia de Usuario | Criterios de Aceitacao | Prioridade | Estimativa |
|---|---------------------|------------------------|------------|------------|
| 07 | Como sistema, quero receber os dados enviados pelas estacoes via API, para armazena-los de forma estruturada no banco de dados. | Endpoint de recepcao de dados; validacao do payload; armazenamento com timestamp; suporte a falhas de envio sem perda de dados. | 1 | 8 |
| 08 | Como administrador, quero utilizar um simulador de datalogger, para testar a recepcao de dados sem precisar de hardware fisico. | Simulador envia dados em intervalos configuaveis; suporta multiplos parametros; log de envios visivel. | 1 | 7 |

---

### Dashboards

| # | Historia de Usuario | Criterios de Aceitacao | Prioridade | Estimativa |
|---|---------------------|------------------------|------------|------------|
| 09 | Como usuario publico, quero visualizar um dashboard com os dados meteorologicos em tempo real, para acompanhar as condicoes climaticas. | Graficos de temperatura, umidade, vento e chuva; atualizacao automatica; selecao de estacao e periodo. | 1 | 8 |
| 10 | Como usuario publico, quero ver indicadores estatisticos nos dashboards (media, maxima, minima), para entender melhor o comportamento dos dados. | Exibicao de media, maxima e minima por parametro; calculo por periodo selecionado. | 2 | 5 |
| 11 | Como administrador, quero comparar dados entre estacoes em um mesmo dashboard, para identificar variacoes regionais. | Selecao de multiplas estacoes; sobreposicao de graficos; legenda clara por estacao. | 3 | 7 |

---

### Alertas

| # | Historia de Usuario | Criterios de Aceitacao | Prioridade | Estimativa |
|---|---------------------|------------------------|------------|------------|
| 12 | Como administrador, quero configurar alertas baseados em thresholds de parametros meteorologicos, para ser notificado automaticamente em situacoes criticas. | CRUD de alertas; definicao de parametro, operador (>, <, =) e valor limite; associacao a estacao especifica ou todas. | 1 | 7 |
| 13 | Como usuario publico, quero receber notificacoes de alertas ativos no portal, para me manter informado sobre condicoes climaticas extremas. | Exibicao de alertas ativos na interface publica; indicacao do parametro e estacao afetada. | 2 | 4 |

---

### Relatorios

| # | Historia de Usuario | Criterios de Aceitacao | Prioridade | Estimativa |
|---|---------------------|------------------------|------------|------------|
| 14 | Como administrador, quero gerar um relatorio de historico de dados por estacao e periodo, para analise detalhada das coletas. | Filtros por estacao, parametro e intervalo de datas; exportacao em PDF ou CSV. | 2 | 6 |
| 15 | Como administrador, quero gerar um relatorio de alertas disparados, para auditar ocorrencias criticas. | Listagem de alertas com data, parametro, valor registrado e estacao; filtros por periodo. | 2 | 5 |
| 16 | Como administrador, quero gerar um relatorio comparativo entre estacoes, para identificar padroes e anomalias regionais. | Comparacao de parametros entre duas ou mais estacoes; graficos e tabela resumo. | 3 | 7 |

---

### Infraestrutura e Qualidade

| # | Historia de Usuario | Criterios de Aceitacao | Prioridade | Estimativa |
|---|---------------------|------------------------|------------|------------|
| 17 | Como time de desenvolvimento, quero um pipeline de integracao continua configurado, para automatizar testes e validacoes a cada push. | CI rodando em Pull Requests; testes automatizados obrigatorios para merge; relatorio de cobertura. | 1 | 5 |
| 18 | Como time de desenvolvimento, quero deploy automatizado configurado por ambiente, para garantir entregas consistentes e sem intervencao manual. | Deploy automatico em staging a cada merge na main; deploy em producao com aprovacao manual. | 2 | 6 |
| 19 | Como desenvolvedor externo, quero uma documentacao completa da API, para integrar outros sistemas ao EnviroSense. | Documentacao de todas as rotas com exemplos de request/response; disponivel via Swagger ou Postman. | 2 | 4 |

---

## Tecnologias

A definir pela equipe.

---

## Sprints

| Sprint | Periodo | Entrega |
|--------|---------|---------|
| Sprint 1 | — | — |
| Sprint 2 | — | — |
| Sprint 3 | — | — |
| Sprint 4 | — | — |

---

Desenvolvido por Equipe Lone Wolf · Fatec Sao Jose dos Campos · 2026
