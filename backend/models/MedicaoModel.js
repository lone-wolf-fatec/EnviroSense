// MedicaoModel.js — queries SQL da tabela medicoes

const { sql } = require('../conexao')

// busca última leitura de cada estacao+parametro — aba Medições
function buscarRecentes() {
  return sql(`
    SELECT DISTINCT ON (medicoes.id_estacao, medicoes.id_parametro)
      medicoes.id,
      medicoes.valor,
      medicoes.registrado_em,
      medicoes.id_estacao,
      medicoes.id_parametro,
      estacoes.nome            AS nome_estacao,
      tipos_parametro.nome     AS nome_parametro,
      tipos_parametro.unidade  AS unidade
    FROM medicoes
    JOIN estacoes             ON estacoes.id        = medicoes.id_estacao
    LEFT JOIN parametros      ON parametros.id      = medicoes.id_parametro
    LEFT JOIN tipos_parametro ON tipos_parametro.id = parametros.id_tipo_parametro
    WHERE medicoes.id_estacao IS NOT NULL
    ORDER BY medicoes.id_estacao, medicoes.id_parametro, medicoes.registrado_em DESC
  `)
}

// busca as últimas 20 leituras por estacao+parametro — Dashboard
// ROW_NUMBER garante que todas as estações aparecem independente do volume de dados
function buscarHistorico() {
  return sql(`
    SELECT
      m.id,
      m.valor,
      m.registrado_em,
      m.id_estacao,
      m.id_parametro,
      e.nome  AS nome_estacao,
      t.nome  AS nome_parametro,
      t.unidade
    FROM medicoes m
    JOIN estacoes             e ON e.id = m.id_estacao
    LEFT JOIN parametros      p ON p.id = m.id_parametro
    LEFT JOIN tipos_parametro t ON t.id = p.id_tipo_parametro
    WHERE m.id_estacao IS NOT NULL
      AND m.id IN (
        SELECT id FROM (
          SELECT id,
            ROW_NUMBER() OVER (
              PARTITION BY id_estacao, id_parametro
              ORDER BY registrado_em DESC
            ) AS rn
          FROM medicoes
          WHERE id_estacao IS NOT NULL
        ) sub
        WHERE rn <= 20
      )
    ORDER BY m.registrado_em DESC
  `)
}

// busca medicoes de uma estação específica
function buscarPorEstacao(id_estacao) {
  return sql(`
    SELECT
      medicoes.id,
      medicoes.valor,
      medicoes.registrado_em,
      medicoes.id_parametro,
      tipos_parametro.nome     AS nome_parametro,
      tipos_parametro.unidade  AS unidade
    FROM medicoes
    LEFT JOIN parametros      ON parametros.id      = medicoes.id_parametro
    LEFT JOIN tipos_parametro ON tipos_parametro.id = parametros.id_tipo_parametro
    WHERE medicoes.id_estacao = $1
    ORDER BY medicoes.registrado_em DESC
    LIMIT 100
  `, [id_estacao])
}

function salvar(id_estacao, id_parametro, valor) {
  return sql(
    'INSERT INTO medicoes (id_estacao, id_parametro, valor) VALUES ($1, $2, $3) RETURNING *',
    [id_estacao, id_parametro || null, valor]
  )
}

module.exports = { buscarRecentes, buscarHistorico, buscarPorEstacao, salvar }