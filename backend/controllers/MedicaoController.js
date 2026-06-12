// MedicaoController.js — logica das medicoes

const MedicaoModel = require('../models/MedicaoModel')

// retorna última medição de cada estacao+parametro — usado na aba Medições
async function listar(req, res) {
  try {
    const medicoes = await MedicaoModel.buscarRecentes()
    res.json(medicoes)
  } catch (erro) {
    res.status(500).json({ erro: erro.message })
  }
}

// retorna histórico completo — usado no Dashboard para montar os gráficos
async function listarHistorico(req, res) {
  try {
    const medicoes = await MedicaoModel.buscarHistorico()
    res.json(medicoes)
  } catch (erro) {
    res.status(500).json({ erro: erro.message })
  }
}

async function listarPorEstacao(req, res) {
  try {
    const medicoes = await MedicaoModel.buscarPorEstacao(req.params.id)
    res.json(medicoes)
  } catch (erro) {
    res.status(500).json({ erro: erro.message })
  }
}

module.exports = { listar, listarHistorico, listarPorEstacao }
