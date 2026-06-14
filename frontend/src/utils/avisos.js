const LIMITES = {
  temperatura: { max: 38,   min: 5,    unidade: '°C',   msgMax: 'Temperatura MUITO ALTA! 🔥',         msgMin: 'Temperatura BAIXÍSSIMA! 🥶' },
  umidade:     { max: 90,   min: 20,   unidade: '%',    msgMax: 'Umidade ALTÍSSIMA! 💧',               msgMin: 'Umidade BAIXÍSSIMA! 🏜️' },
  pressao:     { max: 1030, min: 980,  unidade: 'hPa',  msgMax: 'Pressão MUITO ALTA! ⬆️',              msgMin: 'Pressão MUITO BAIXA! ⬇️' },
  chuva:       { max: 60,   min: null, unidade: 'mm',   msgMax: 'Chuva MUITO INTENSA! 🌧️',             msgMin: null },
  vento:       { max: 90,   min: null, unidade: 'km/h', msgMax: 'Velocidade do vento ALTA DEMAIS! 🌪️', msgMin: null },
}

function detectarChave(nome) {
  if (!nome) return null
  const n = nome.toLowerCase()
  if (n.includes('temperatura')) return 'temperatura'
  if (n.includes('umidade'))     return 'umidade'
  if (n.includes('pressao') || n.includes('pressão')) return 'pressao'
  if (n.includes('chuva'))       return 'chuva'
  if (n.includes('vento'))       return 'vento'
  return null
}

// gera avisos automáticos a partir das medições recentes com valores extremos
export function gerarAvisosAutomaticos(medicoes) {
  const avisos = []
  const vistos = new Set()

  for (const m of medicoes) {
    const chave = detectarChave(m.nome_parametro)
    if (!chave) continue
    const lim = LIMITES[chave]
    const v   = Number(m.valor)
    const key = `${m.id_estacao}-${m.nome_parametro}`
    if (vistos.has(key)) continue

    if (lim.max !== null && v > lim.max) {
      vistos.add(key)
      avisos.push({
        id:             `auto-${key}-max`,
        nome_estacao:   m.nome_estacao,
        nome_parametro: m.nome_parametro,
        severidade:     'critico',
        mensagem:       `${lim.msgMax} — ${v.toFixed(1)} ${lim.unidade} (máx: ${lim.max})`,
        ativo:          true,
        automatico:     true
      })
    } else if (lim.min !== null && v < lim.min) {
      vistos.add(key)
      avisos.push({
        id:             `auto-${key}-min`,
        nome_estacao:   m.nome_estacao,
        nome_parametro: m.nome_parametro,
        severidade:     'critico',
        mensagem:       `${lim.msgMin} — ${v.toFixed(1)} ${lim.unidade} (mín: ${lim.min})`,
        ativo:          true,
        automatico:     true
      })
    }
  }
  return avisos
}

// gera avisos a partir de alertas cadastrados que viraram crítico automaticamente
export function gerarAvisosDeAlertas(alertas) {
  return alertas
    .filter(function(a) { return a.severidade === 'critico' && a.ativo })
    .map(function(a) {
      return {
        id:             `alerta-critico-${a.id}`,
        nome_estacao:   a.nome_estacao,
        nome_parametro: a.nome_parametro || '—',
        severidade:     'critico',
        mensagem:       a.mensagem,
        ativo:          true,
        automatico:     true
      }
    })
}