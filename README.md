<p align="center">
  <img src="https://raw.githubusercontent.com/lone-wolf-fatec/envirosense/main/banner-envirosense.svg" alt="EnviroSense Banner" width="100%"/>
</p>

<h1 align="center">
  <br>
  🌦️ EnviroSense
  <br>
</h1>

<p align="center">
  <b>Sistema de Coleta e Monitoramento de Dados de Estações Meteorológicas</b><br/>
  <sub>API de Programação Integrada · 4º DSM · Fatec São José dos Campos · 2026-1</sub>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-em%20desenvolvimento-yellow?style=flat-square"/>
  <img src="https://img.shields.io/badge/semestre-4º%20DSM-blue?style=flat-square"/>
  <img src="https://img.shields.io/badge/parceiro-Tecsus-0a66c2?style=flat-square"/>
</p>

---

## 📌 Sobre o Projeto

A **Tecsus** é uma empresa especializada na coleta e processamento de dados por meio de redes de sensores sem fio (IoT), atuando principalmente no monitoramento de utilidades como água, energia e gás. Com o objetivo de expandir seu portfólio para o monitoramento ambiental, a empresa propôs o desenvolvimento de estações meteorológicas de baixo custo capazes de medir parâmetros como **direção e velocidade do vento, índice pluviométrico, umidade, temperatura e pressão atmosférica**.

Os dados coletados pelas estações são enviados periodicamente a um servidor central, onde são recepcionados, armazenados e disponibilizados em um **portal web** com dashboards interativos e relatórios para análise. O sistema deve ser pensado para o seguinte perfil de cliente:

| Perfil Escolhido | Descrição |
|--------|-----------|
| 🏛️ Órgão Público | Defesa Civil com demanda nacional, manutenção facilitada e padrões governamentais |

---

## 👥 Equipe

| Integrante | Função | LinkedIn | GitHub |
|-----------|--------|----------|--------|
| Carlos Intrieri | Dev | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/carlosintrieri/) | [![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/carlosintrieri) |

---

## 🗂️ Backlog do Produto

### Legenda

| Prioridade | Significado |
|------------|-------------|
| 🔴 Alta | Essencial para o funcionamento do sistema |
| 🟡 Média | Importante, mas não bloqueia o core |
| 🟢 Baixa | Agrega valor, pode ser entregue depois |

| Estimativa | Significado |
|------------|-------------|
| 1 – 3 | Simples — poucos dias |
| 4 – 6 | Médio — uma sprint |
| 7 – 9 | Complexo — mais de uma sprint |

---

### 🔐 Controle de Acesso e Usuários

| # | História de Usuário | Critérios de Aceitação | Prioridade | Estimativa |
|---|---------------------|------------------------|------------|------------|
| 01 | Como **administrador**, quero fazer login com e-mail e senha, para acessar as funcionalidades restritas do sistema. | Autenticação com JWT; bloqueio após tentativas inválidas; redirecionamento ao painel admin. | 🔴 Alta | 4 |
| 02 | Como **administrador**, quero cadastrar, editar e remover usuários, para controlar quem acessa o sistema. | CRUD completo de usuários; definição de nível de acesso (admin ou público); confirmação antes de exclusão. | 🔴 Alta | 5 |
| 03 | Como **usuário público**, quero acessar o portal sem login, para visualizar dados meteorológicos sem necessidade de cadastro. | Acesso à página pública sem autenticação; dados sensíveis e configurações não visíveis. | 🔴 Alta | 2 |

---

### 🌡️ Estações e Sensores

| # | História de Usuário | Critérios de Aceitação | Prioridade | Estimativa |
|---|---------------------|------------------------|------------|------------|
| 04 | Como **administrador**, quero cadastrar estações meteorológicas com seus respectivos sensores e parâmetros, para que o sistema reconheça e processe os dados recebidos. | CRUD de estações; vinculação de múltiplos sensores por estação; suporte a diferentes tipos de parâmetros (temperatura, umidade, vento, chuva, pressão). | 🔴 Alta | 7 |
| 05 | Como **administrador**, quero editar e desativar estações, para gerenciar o ciclo de vida dos dispositivos. | Edição de nome, localização e sensores; status ativo/inativo; histórico de alterações. | 🟡 Média | 4 |
| 06 | Como **administrador**, quero visualizar no mapa a localização das estações cadastradas, para ter visão geográfica da cobertura do sistema. | Mapa interativo com marcadores por estação; clique no marcador exibe dados básicos da estação. | 🟢 Baixa | 6 |

---

### 📡 Recepção e Armazenamento de Dados

| # | História de Usuário | Critérios de Aceitação | Prioridade | Estimativa |
|---|---------------------|------------------------|------------|------------|
| 07 | Como **sistema**, quero receber os dados enviados pelas estações via API, para armazená-los de forma estruturada no banco de dados. | Endpoint de recepção de dados; validação do payload; armazenamento com timestamp; suporte a falhas de envio sem perda de dados. | 🔴 Alta | 8 |
| 08 | Como **administrador**, quero utilizar um simulador de datalogger, para testar a recepção de dados sem precisar de hardware físico. | Simulador envia dados em intervalos configuráveis; suporta múltiplos parâmetros; log de envios visível. | 🔴 Alta | 7 |

---

### 📊 Dashboards

| # | História de Usuário | Critérios de Aceitação | Prioridade | Estimativa |
|---|---------------------|------------------------|------------|------------|
| 09 | Como **usuário público**, quero visualizar um dashboard com os dados meteorológicos em tempo real, para acompanhar as condições climáticas. | Gráficos de temperatura, umidade, vento e chuva; atualização automática; seleção de estação e período. | 🔴 Alta | 8 |
| 10 | Como **usuário público**, quero ver indicadores estatísticos nos dashboards (média, máxima, mínima), para entender melhor o comportamento dos dados. | Exibição de média, máxima e mínima por parâmetro; cálculo por período selecionado. | 🟡 Média | 5 |
| 11 | Como **administrador**, quero comparar dados entre estações em um mesmo dashboard, para identificar variações regionais. | Seleção de múltiplas estações; sobreposição de gráficos; legenda clara por estação. | 🟢 Baixa | 7 |

---

### 🔔 Alertas

| # | História de Usuário | Critérios de Aceitação | Prioridade | Estimativa |
|---|---------------------|------------------------|------------|------------|
| 12 | Como **administrador**, quero configurar alertas baseados em thresholds de parâmetros meteorológicos, para ser notificado automaticamente em situações críticas. | CRUD de alertas; definição de parâmetro, operador (>, <, =) e valor limite; associação a estação específica ou todas. | 🔴 Alta | 7 |
| 13 | Como **usuário público**, quero receber notificações de alertas ativos no portal, para me manter informado sobre condições climáticas extremas. | Exibição de alertas ativos na interface pública; indicação do parâmetro e estação afetada. | 🟡 Média | 4 |

---

### 📄 Relatórios

| # | História de Usuário | Critérios de Aceitação | Prioridade | Estimativa |
|---|---------------------|------------------------|------------|------------|
| 14 | Como **administrador**, quero gerar um relatório de histórico de dados por estação e período, para análise detalhada das coletas. | Filtros por estação, parâmetro e intervalo de datas; exportação em PDF ou CSV. | 🟡 Média | 6 |
| 15 | Como **administrador**, quero gerar um relatório de alertas disparados, para auditar ocorrências críticas. | Listagem de alertas com data, parâmetro, valor registrado e estação; filtros por período. | 🟡 Média | 5 |
| 16 | Como **administrador**, quero gerar um relatório comparativo entre estações, para identificar padrões e anomalias regionais. | Comparação de parâmetros entre duas ou mais estações; gráficos e tabela resumo. | 🟢 Baixa | 7 |

---

### ⚙️ Infraestrutura e Qualidade

| # | História de Usuário | Critérios de Aceitação | Prioridade | Estimativa |
|---|---------------------|------------------------|------------|------------|
| 17 | Como **time de desenvolvimento**, quero um pipeline de integração contínua configurado, para automatizar testes e validações a cada push. | CI rodando em Pull Requests; testes automatizados obrigatórios para merge; relatório de cobertura. | 🔴 Alta | 5 |
| 18 | Como **time de desenvolvimento**, quero deploy automatizado configurado por ambiente, para garantir entregas consistentes e sem intervenção manual. | Deploy automático em staging a cada merge na main; deploy em produção com aprovação manual. | 🟡 Média | 6 |
| 19 | Como **desenvolvedor externo**, quero uma documentação completa da API, para integrar outros sistemas ao EnviroSense. | Documentação de todas as rotas com exemplos de request/response; disponível via Swagger ou Postman. | 🟡 Média | 4 |

---

## 🛠️ Tecnologias

> _A definir pela equipe_

---

## 📅 Sprints

| Sprint | Período | Entrega |
|--------|---------|---------|
| Sprint 1 | — | — |
| Sprint 2 | — | — |
| Sprint 3 | — | — |
| Sprint 4 | — | — |

---

<p align="center">
  <sub>Desenvolvido por Equipe Lone Wolf · Fatec São José dos Campos · 2026</sub>
</p>
