import { useState } from 'react'

const FORM_VAZIO = {
  id_estacao: '', id_parametro: '', severidade: 'info', mensagem: '',
  ativo: true, valor_min: '', valor_max: ''
}

export default function Alertas({ alertas, estacoes, parametros, ehAdmin, crud }) {

  const [mostrarModal,     setMostrarModal]     = useState(false)
  const [idAlertaEditando, setIdAlertaEditando] = useState(null)
  const [formulario,       setFormulario]       = useState(FORM_VAZIO)

  const parametrosDaEstacao = parametros.filter(function(p) {
    return String(p.id_estacao) === String(formulario.id_estacao)
  })

  const corDoBadge = {
    critico: 'bg-danger',
    aviso:   'bg-warning text-dark',
    info:    'bg-info text-dark'
  }

  function abrirNovo() {
    setIdAlertaEditando(null)
    setFormulario(FORM_VAZIO)
    setMostrarModal(true)
  }

  function abrirEditar(alerta) {
    setIdAlertaEditando(alerta.id)
    setFormulario({
      id_estacao:   alerta.id_estacao   || '',
      id_parametro: alerta.id_parametro || '',
      severidade:   alerta.severidade   || 'info',
      mensagem:     alerta.mensagem     || '',
      ativo:        alerta.ativo !== false,
      valor_min:    alerta.valor_min    ?? '',
      valor_max:    alerta.valor_max    ?? ''
    })
    setMostrarModal(true)
  }

  async function salvar(e) {
    e.preventDefault()
    await crud.salvarAlerta(idAlertaEditando, formulario)
    setMostrarModal(false)
  }

  function campo(key, val) {
    setFormulario(function(prev) { return { ...prev, [key]: val } })
  }

  return (
    <div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0"><i className="bi bi-bell me-2"></i>Alertas</h4>
        {ehAdmin && (
          <button className="btn btn-success btn-sm" onClick={abrirNovo}>
            + Novo Alerta
          </button>
        )}
      </div>

      <div className="card mb-4">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>Estação</th>
                <th>Parâmetro</th>
                <th>Severidade</th>
                <th>Mensagem</th>
                <th>Mín</th>
                <th>Máx</th>
                <th>Status</th>
                {ehAdmin && <th>Ações</th>}
              </tr>
            </thead>
            <tbody>
              {alertas.map(function(alerta) {
                return (
                  <tr key={alerta.id}>
                    <td>{alerta.nome_estacao}</td>
                    <td>{alerta.nome_parametro || '—'}</td>
                    <td>
                      <span className={'badge ' + (corDoBadge[alerta.severidade] || 'bg-secondary')}>
                        {alerta.severidade}
                      </span>
                    </td>
                    <td>{alerta.mensagem}</td>
<td>{alerta.valor_min != null ? Number(alerta.valor_min).toFixed(2) : '—'}</td>
<td>{alerta.valor_max != null ? Number(alerta.valor_max).toFixed(2) : '—'}</td>
<td>
                      <span className={'badge ' + (alerta.ativo ? 'bg-success' : 'bg-secondary')}>
                        {alerta.ativo ? 'Ativo' : 'Resolvido'}
                      </span>
                    </td>
                    {ehAdmin && (
                      <td>
                        <button className="btn btn-sm btn-outline-secondary me-1"
                          onClick={function() { abrirEditar(alerta) }}>
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-danger"
                          onClick={function() { crud.deletarAlerta(alerta.id) }}>
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    )}
                  </tr>
                )
              })}
              {alertas.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center text-muted py-3">
                    Nenhum alerta cadastrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {mostrarModal && (
        <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog"><div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">
                {idAlertaEditando ? 'Editar Alerta' : 'Novo Alerta'}
              </h5>
              <button className="btn-close" onClick={function() { setMostrarModal(false) }} />
            </div>

            <form onSubmit={salvar}>
              <div className="modal-body">

                {/* campo estação */}
                <div className="mb-3">
                  <label className="form-label">Estação *</label>
                  <select className="form-select" required value={formulario.id_estacao}
                    onChange={function(e) {
                      setFormulario(function(prev) {
                        return { ...prev, id_estacao: e.target.value, id_parametro: '' }
                      })
                    }}>
                    <option value="">Selecione a estação...</option>
                    {estacoes.map(function(e) {
                      return <option key={e.id} value={e.id}>{e.nome}</option>
                    })}
                  </select>
                </div>

                {/* campo parâmetro */}
                <div className="mb-3">
                  <label className="form-label">
                    Parâmetro
                    <span className="text-muted small ms-2">(vincula ao monitoramento de Medições)</span>
                  </label>
                  <select className="form-select" value={formulario.id_parametro}
                    onChange={function(e) { campo('id_parametro', e.target.value) }}>
                    <option value="">Nenhum — alerta manual</option>
                    {parametrosDaEstacao.map(function(p) {
                      return (
                        <option key={p.id} value={p.id}>
                          {p.nome_tipo} ({p.unidade})
                        </option>
                      )
                    })}
                  </select>
                </div>

                {/* campo severidade */}
                <div className="mb-3">
                  <label className="form-label">Severidade inicial *</label>
                  <select className="form-select" value={formulario.severidade}
                    onChange={function(e) { campo('severidade', e.target.value) }}>
                    <option value="info">Info</option>
                    <option value="aviso">Aviso</option>
                    <option value="critico">Crítico</option>
                  </select>
                </div>

                {/* campos valor_min e valor_max lado a lado */}
                <div className="row g-2 mb-3">
                  <div className="col">
                    <label className="form-label">Valor mínimo</label>
                    <input type="number" step="0.01" className="form-control"
                      placeholder="Ex: 5"
                      value={formulario.valor_min}
                      onChange={function(e) { campo('valor_min', e.target.value) }} />
                  </div>
                  <div className="col">
                    <label className="form-label">Valor máximo</label>
                    <input type="number" step="0.01" className="form-control"
                      placeholder="Ex: 38"
                      value={formulario.valor_max}
                      onChange={function(e) { campo('valor_max', e.target.value) }} />
                  </div>
                </div>

                {/* campo mensagem */}
                <div className="mb-3">
                  <label className="form-label">Mensagem *</label>
                  <div className="form-text mb-2">
                    Use palavras como <strong>quente, calor, frio, gelado, ventania, chuvoso, seco</strong> para que o receptor escale automaticamente para crítico quando o valor for extremo.
                  </div>
                  <textarea className="form-control" required rows={3}
                    value={formulario.mensagem}
                    onChange={function(e) { campo('mensagem', e.target.value) }} />
                </div>

                {/* checkbox ativo: só ao editar */}
                {idAlertaEditando && (
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox"
                      checked={formulario.ativo === true}
                      onChange={function(e) { campo('ativo', e.target.checked) }} />
                    <label className="form-check-label">Alerta ativo</label>
                  </div>
                )}

              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary"
                  onClick={function() { setMostrarModal(false) }}>Cancelar</button>
                <button type="submit" className="btn btn-success">
                  {idAlertaEditando ? 'Salvar' : 'Criar'}
                </button>
              </div>
            </form>

          </div></div>
        </div>
      )}

    </div>
  )
}