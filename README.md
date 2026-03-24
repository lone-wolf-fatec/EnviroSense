# EnviroSense

Sistema de Coleta e Monitoramento de Dados de Estações Meteorológicas  
API de Programação Integrada · 4º DSM · Fatec São José dos Campos · 2026-1

---

## Sobre o Projeto

A Tecsus é uma empresa especializada na coleta e processamento de dados por meio de redes de sensores sem fio (IoT), atuando principalmente no monitoramento de utilidades como água, energia e gás.

Com o objetivo de expandir seu portfólio para o monitoramento ambiental, a empresa propôs o desenvolvimento de estações meteorológicas de baixo custo, capazes de medir parâmetros como direção e velocidade do vento, índice pluviométrico, umidade, temperatura e pressão atmosférica.

Os dados coletados pelas estações são enviados periodicamente a um servidor central, onde são recepcionados, armazenados e disponibilizados em um portal web com dashboards interativos e relatórios para análise.

**Perfil de cliente escolhido:** Órgão público (Defesa Civil) — demanda nacional, manutenção facilitada e conformidade com padrões governamentais.

---

## Equipe

| Integrante | Função | LinkedIn | GitHub |
|-----------|--------|----------|--------|
| Carlos Intrieri | Desenvolvedor | [linkedin.com/in/carlosintrieri](https://www.linkedin.com/in/carlosintrieri/) | [github.com/carlosintrieri](https://github.com/carlosintrieri) |

---

## Backlog do Produto

### Legenda de Prioridade

| Nível | Significado |
|-------|------------|
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

| # | História de Usuário | Critérios de Aceitação | Prioridade | Estimativa |
|---|---------------------|------------------------|------------|------------|
| 01 | Como administrador, quero fazer login com e-mail e senha, para acessar as funcionalidades restritas do sistema. | Autenticação com JWT; bloqueio após tentativas inválidas; redirecionamento ao painel admin. | 1 | 4 |
| 02 | Como administrador, quero cadastrar, editar e remover usuários, para controlar quem acessa o sistema. | CRUD completo de usuários; definição de nível de acesso (admin ou público); confirmação antes de exclusão. | 1 | 5 |
| 03 | Como usuário público, quero acessar o portal sem login, para visualizar dados meteorológicos sem necessidade de cadastro. | Acesso à página pública sem autenticação; dados sensíveis e configurações não visíveis. | 1 | 2 |

---

### Estações e Sensores

| # | História de Usuário | Critérios de Aceitação | Prioridade | Estimativa |
|---|---------------------|------------------------|------------|------------|
| 04 | Como administrador, quero cadastrar estações meteorológicas com seus respectivos sensores e parâmetros, para que o sistema reconheça e processe os dados recebidos. | CRUD de estações; vinculação de múltiplos sensores por estação; suporte a diferentes tipos de parâmetros (temperatura, umidade, vento, chuva, pressão). | 1 | 7 |
| 05 | Como administrador, quero editar e desativar estações, para gerenciar o ciclo de vida dos dispositivos. | Edição de nome, localização e sensores; status ativo/inativo; histórico de alterações. | 2 | 4 |
| 06 | Como administrador, quero visualizar no mapa a localização das estações cadastradas, para ter visão geográfica da cobertura do sistema. | Mapa interativo com marcadores por estação; clique no marcador exibe dados básicos da estação. | 3 | 6 |

---

### Recepção e Armazenamento de Dados

| # | História de Usuário | Critérios de Aceitação | Prioridade | Estimativa |
|---|---------------------|------------------------|------------|------------|
| 07 | Como sistema, quero receber os dados enviados pelas estações via API, para armazená-los de forma estruturada no banco de dados. | Endpoint de recepção de dados; validação do payload; armazenamento com timestamp; suporte a falhas de envio sem perda de dados. | 1 | 8 |
| 08 | Como administrador, quero utilizar um simulador de datalogger, para testar a recepção de dados sem precisar de hardware físico. | Simulador envia dados em intervalos configuráveis; suporta múltiplos parâmetros; log de envios visível. | 1 | 7 |

---

### Dashboards

| # | História de Usuário | Critérios de Aceitação | Prioridade | Estimativa |
|---|---------------------|------------------------|------------|------------|
| 09 | Como usuário público, quero visualizar um dashboard com os dados meteorológicos em tempo real, para acompanhar as condições climáticas. | Gráficos de temperatura, umidade, vento e chuva; atualização automática; seleção de estação e período. | 1 | 8 |
| 10 | Como usuário público, quero ver indicadores estatísticos nos dashboards (média, máxima, mínima), para entender melhor o comportamento dos dados. | Exibição de média, máxima e mínima por parâmetro; cálculo por período selecionado. | 2 | 5 |
| 11 | Como administrador, quero comparar dados entre estações em um mesmo dashboard, para identificar variações regionais. | Seleção de múltiplas estações; sobreposição de gráficos; legenda clara por estação. | 3 | 7 |

---

### Alertas

| # | História de Usuário | Critérios de Aceitação | Prioridade | Estimativa |
|---|---------------------|------------------------|------------|------------|
| 12 | Como administrador, quero configurar alertas baseados em limites de parâmetros meteorológicos, para ser notificado automaticamente em situações críticas. | CRUD de alertas; definição de parâmetro, operador (>, <, =) e valor limite; associação a uma estação específica ou a todas. | 1 | 7 |
| 13 | Como usuário público, quero receber notificações de alertas ativos no portal, para me manter informado sobre condições climáticas extremas. | Exibição de alertas ativos na interface pública; indicação do parâmetro e estação afetada. | 2 | 4 |

---

### Relatórios

| # | História de Usuário | Critérios de Aceitação | Prioridade | Estimativa |
|---|---------------------|------------------------|------------|------------|
| 14 | Como administrador, quero gerar um relatório de histórico de dados por estação e período, para análise detalhada das coletas. | Filtros por estação, parâmetro e intervalo de datas; exportação em PDF ou CSV. | 2 | 6 |
| 15 | Como administrador, quero gerar um relatório de alertas disparados, para auditar ocorrências críticas. | Listagem de alertas com data, parâmetro, valor registrado e estação; filtros por período. | 2 | 5 |
| 16 | Como administrador, quero gerar um relatório comparativo entre estações, para identificar padrões e anomalias regionais. | Comparação de parâmetros entre duas ou mais estações; gráficos e tabela resumo. | 3 | 7 |

---

### Infraestrutura e Qualidade

| # | História de Usuário | Critérios de Aceitação | Prioridade | Estimativa |
|---|---------------------|------------------------|------------|------------|
| 17 | Como time de desenvolvimento, quero um pipeline de integração contínua configurado, para automatizar testes e validações a cada push. | CI rodando em Pull Requests; testes automatizados obrigatórios para merge; relatório de cobertura. | 1 | 5 |
| 18 | Como time de desenvolvimento, quero deploy automatizado configurado por ambiente, para garantir entregas consistentes e sem intervenção manual. | Deploy automático em staging a cada merge na main; deploy em produção com aprovação manual. | 2 | 6 |
| 19 | Como desenvolvedor externo, quero uma documentação completa da API, para integrar outros sistemas ao EnviroSense. | Documentação de todas as rotas com exemplos de request/response; disponível via Swagger ou Postman. | 2 | 4 |

---

## Tecnologias

A definir pela equipe.

---

## Sprints

| Sprint | Período | Entrega |
|--------|---------|---------|
| Sprint 1 | — | — |
| Sprint 2 | — | — |
| Sprint 3 | — | — |
| Sprint 4 | — | — |

---

Desenvolvido por Equipe Lone Wolf · Fatec São José dos Campos · 2026
