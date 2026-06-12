// servico_transferencia.js
// lê medicoes_temporarias do MongoDB (processado: false)
// resolve id_estacao e id_parametro via JOIN no PostgreSQL
// usa busca parcial por nome — "Temperatura do Capeta" bate com tipo "Temperatura"
// timestamp_mqtt = momento que o dado entrou no Mongo
// registrado_em  = NOW() — momento que o dado é confirmado no PostgreSQL

require('dotenv').config()
const { Pool } = require('pg')
const mongoose = require('mongoose')

const pool = new Pool({
  host:     process.env.PG_HOST,
  port:     process.env.PG_PORT,
  user:     process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  ssl:      false
})

async function transferir() {
  try {
    const db = mongoose.connection.db
    if (!db) return

    const col  = db.collection('medicoes_temporarias')
    const nao  = await col.countDocuments({ processado: false })
    if (nao === 0) return

    const meds = await col.find({ processado: false }).limit(1000).toArray()

    let ok = 0
    for (const m of meds) {
      try {
        // busca exata primeiro — se o nome bater perfeitamente usa ele
        // se não achar, tenta busca parcial — "Temperatura do Capeta" bate com "Temperatura"
        let res = await pool.query(`
          SELECT
            estacoes.id        AS id_estacao,
            parametros.id      AS id_parametro,
            tipos_parametro.nome AS nome_tipo,
            tipos_parametro.fator,
            tipos_parametro.valor_offset
          FROM estacoes
          LEFT JOIN parametros      ON parametros.id_estacao       = estacoes.id
          LEFT JOIN tipos_parametro ON tipos_parametro.id          = parametros.id_tipo_parametro
          WHERE estacoes.uid         = $1
            AND tipos_parametro.nome = $2
            AND estacoes.ativo       = true
          LIMIT 1
        `, [m.uid_estacao, m.nome_parametro])

        // se não achou pelo nome exato, tenta busca parcial
        // verifica se o nome do tipo está CONTIDO no nome que veio do simulador
        // ex: "Temperatura" está em "Temperatura do Capeta" → bate
        if (!res.rows[0]) {
          res = await pool.query(`
            SELECT
              estacoes.id        AS id_estacao,
              parametros.id      AS id_parametro,
              tipos_parametro.nome AS nome_tipo,
              tipos_parametro.fator,
              tipos_parametro.valor_offset
            FROM estacoes
            LEFT JOIN parametros      ON parametros.id_estacao       = estacoes.id
            LEFT JOIN tipos_parametro ON tipos_parametro.id          = parametros.id_tipo_parametro
            WHERE estacoes.uid         = $1
              AND $2 ILIKE '%' || tipos_parametro.nome || '%'
              AND estacoes.ativo       = true
            ORDER BY LENGTH(tipos_parametro.nome) DESC
            LIMIT 1
          `, [m.uid_estacao, m.nome_parametro])
        }

        const linha = res.rows[0]

        const fator  = linha ? parseFloat(linha.fator  ?? 1) : 1
        const offset = linha ? parseFloat(linha.valor_offset ?? 0) : 0
        const valor  = fator !== 0
          ? parseFloat((parseFloat(m.valor_bruto) * fator + offset).toFixed(4))
          : parseFloat(m.valor_bruto)

        await pool.query(`
          INSERT INTO medicoes
            (id_estacao, id_parametro, uid_estacao, nome_parametro, valor_bruto, valor, timestamp_mqtt, registrado_em)
          VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
        `, [
          linha?.id_estacao   || null,
          linha?.id_parametro || null,
          m.uid_estacao,
          m.nome_parametro,
          m.valor_bruto,
          valor,
          m.timestamp
        ])

        await col.updateOne({ _id: m._id }, { $set: { processado: true } })
        ok++

      } catch (e) {
        console.error(`[TRANSFERENCIA] Erro em ${m.uid_estacao}/${m.nome_parametro}: ${e.message}`)
      }
    }

    if (ok > 0) console.log(`[✓] ${ok} medições transferidas do MongoDB para o PostgreSQL`)

  } catch (e) {
    console.error('[TRANSFERENCIA ERRO]', e.message)
  }
}

setInterval(transferir, 10000)
transferir()
module.exports = {}