require('dotenv').config()
const { Pool } = require('pg')
const mongoose = require('mongoose')

const pool = new Pool({
  host:     process.env.PG_HOST,
  port:     process.env.PG_PORT,
  user:     process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  ssl: process.env.PG_SSL === 'true' ? { rejectUnauthorized: false } : false
})

const sql = async (texto, valores) => (await pool.query(texto, valores)).rows

const conectarMongo = async () => {
  try {
    const url = process.env.MONGO_URL.includes('envirosense')
      ? process.env.MONGO_URL
      : process.env.MONGO_URL + '/envirosense'
    await mongoose.connect(url)
    console.log(`[MongoDB] Conectado: ${url}`)
    return mongoose.connection
  } catch (erro) {
    console.error(`[ERRO Conexão] MongoDB: ${erro.message}`)
    throw erro
  }
}

module.exports = { sql, conectarMongo }