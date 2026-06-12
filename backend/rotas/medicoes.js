// rotas/medicoes.js
const express          = require('express')
const router           = express.Router()
const MedicaoController = require('../controllers/MedicaoController')
const { verificarLogin } = require('../autenticacao')

// última medição de cada estacao+parametro — usado na aba Medições
router.get('/',          verificarLogin, MedicaoController.listar)

// histórico completo — usado no Dashboard para montar os gráficos
router.get('/historico', verificarLogin, MedicaoController.listarHistorico)

module.exports = router