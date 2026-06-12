// migration.js — rode UMA VEZ para corrigir o banco já existente
// adiciona colunas que faltam sem apagar nenhum dado
// node migration.js

require('dotenv').config()
const { Pool } = require('pg')

const db = new Pool({
  host:     process.env.PG_HOST,
  port:     process.env.PG_PORT,
  user:     process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  ssl:      false
})

async function migrar() {
  console.log('[Migration] Iniciando...')

  // 1. adiciona valor_min na tabela alertas se não existir
  await db.query(`
    ALTER TABLE alertas ADD COLUMN IF NOT EXISTS valor_min DECIMAL(10,4)
  `)
  console.log('[✓] alertas.valor_min')

  // 2. adiciona valor_max na tabela alertas se não existir
  await db.query(`
    ALTER TABLE alertas ADD COLUMN IF NOT EXISTS valor_max DECIMAL(10,4)
  `)
  console.log('[✓] alertas.valor_max')

  // 3. garante que estacoes tem coluna uid
  await db.query(`
    ALTER TABLE estacoes ADD COLUMN IF NOT EXISTS uid VARCHAR(50) UNIQUE
  `)
  console.log('[✓] estacoes.uid')

  // 4. garante que medicoes tem todas as colunas necessárias
  await db.query(`ALTER TABLE medicoes ADD COLUMN IF NOT EXISTS uid_estacao    VARCHAR(50)`)
  await db.query(`ALTER TABLE medicoes ADD COLUMN IF NOT EXISTS nome_parametro VARCHAR(100)`)
  await db.query(`ALTER TABLE medicoes ADD COLUMN IF NOT EXISTS valor_bruto    DECIMAL(10,4)`)
  await db.query(`ALTER TABLE medicoes ADD COLUMN IF NOT EXISTS timestamp_mqtt TIMESTAMP`)
  console.log('[✓] medicoes — colunas uid_estacao, nome_parametro, valor_bruto, timestamp_mqtt')

  // 5. popula uid das estações padrão se estiverem sem uid
  await db.query(`UPDATE estacoes SET uid = 'EST001' WHERE nome = 'Estação Centro' AND uid IS NULL`)
  await db.query(`UPDATE estacoes SET uid = 'EST002' WHERE nome = 'Estação Norte'  AND uid IS NULL`)
  await db.query(`UPDATE estacoes SET uid = 'EST003' WHERE nome = 'Estação Sul'    AND uid IS NULL`)
  console.log('[✓] uids das estações padrão atualizados')

  // 6. vincula parâmetros nas estações padrão se ainda não estiverem vinculados
  await db.query(`
    INSERT INTO parametros (id_estacao, id_tipo_parametro)
    SELECT e.id, t.id
    FROM estacoes e, tipos_parametro t
    WHERE e.uid  IN ('EST001','EST002','EST003')
      AND t.nome IN ('Temperatura','Umidade','Pressão Alta','Chuva','Vento')
    ON CONFLICT (id_estacao, id_tipo_parametro) DO NOTHING
  `)
  console.log('[✓] parâmetros vinculados às estações padrão')

  await db.end()
  console.log('\n[Migration] Concluída! O banco está pronto.')
  process.exit(0)
}

migrar().catch(function(e) {
  console.error('[Migration ERRO]', e.message)
  process.exit(1)
})