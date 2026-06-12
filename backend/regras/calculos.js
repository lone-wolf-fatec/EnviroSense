// calculos.js — regras de negócio do cálculo de medição

function calcularValor(valorBruto, fator, offset) {
  if (valorBruto === null || valorBruto === undefined) {
    throw new Error('valorBruto não pode ser nulo')
  }

  // fator zero lança erro — teste 2 espera exatamente esta mensagem
  if (fator === null || fator === undefined || fator === 0) {
    throw new Error('fator não pode ser zero')
  }

  const vb = parseFloat(valorBruto)
  const f  = parseFloat(fator)
  const o  = parseFloat(offset || 0)

  if (isNaN(vb) || isNaN(f) || isNaN(o)) {
    throw new Error(`Valores inválidos: valorBruto=${vb}, fator=${f}, offset=${o}`)
  }

  const resultado = vb * f + o

  // resultado inválido — teste 3 espera letra minúscula
  if (isNaN(resultado) || !isFinite(resultado)) {
    throw new Error(`resultado inválido: ${vb} * ${f} + ${o} = ${resultado}`)
  }

  return resultado
}

module.exports = { calcularValor }