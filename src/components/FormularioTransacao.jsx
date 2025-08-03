import React, { useState, useEffect } from 'react';
import FiltroTransacao from './FiltroTransacao';

const FormularioTransacao = ({
  perfil,
  energiaTotal,
  transacoes,
  setTransacoes,
  energiaConsumida,
  setEnergiaConsumida,
  onAdicionarTransacao,
  energiaRestante,
  receitas,
  despesas
}) => {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('');
  const [filtro, setFiltro] = useState('todos');

  useEffect(() => {
    localStorage.setItem('transacoes', JSON.stringify(transacoes));
  }, [transacoes]);

  const calcularEnergiaDespesa = (valor) => {
    const salarioHora = parseFloat(perfil.salario) / parseFloat(perfil.horas);
    const horasEsforco = parseFloat(valor) / salarioHora;

    const taxaPorNivel = {
      sedentario: 1.3,
      moderado: 2.5,
      intenso: 3.8
    };

    const nivelAtividade = 'moderado'; // futuramente pode vir do perfil
    const taxa = taxaPorNivel[nivelAtividade];
    const energiaPorHora = taxa * (parseFloat(perfil.peso ?? 70));
    return horasEsforco * energiaPorHora;
  };

  const handleAdicionar = (e) => {
    e.preventDefault();
    if (!nome || !valor || !tipo) return;

    const energiaGasta = tipo === 'despesa' ? calcularEnergiaDespesa(valor) : 0;

    const novaTransacao = {
      id: Date.now(),
      nome,
      valor: parseFloat(valor),
      tipo,
      energiaGasta
    };

    onAdicionarTransacao(novaTransacao);

    if (tipo === 'despesa') {
      setEnergiaConsumida(prev => prev + energiaGasta);

      // ⚠️ Meta semanal (2% da energia total)
      const metaSemanal = energiaTotal * 0.02;
      if (energiaConsumida + energiaGasta > metaSemanal) {
        alert("⚠️ Essa despesa ultrapassa sua meta de energia financeira semanal!");
      }
    }

      setNome('');
      setValor('');
      setTipo('');
    };

  const handleRemover = (id) => {
    const removida = transacoes.find(t => t.id === id);
    const novas = transacoes.filter(t => t.id !== id);
    setTransacoes(novas);
    if (removida?.tipo === 'despesa') {
      setEnergiaConsumida(prev => prev - removida.energiaGasta);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-purple-300 to-purple-500 px-4 py-6 text-black font-sans">
      <h2 className="text-3xl font-bold text-center mb-6">CONTROLE DE DESPESAS</h2>

      <div className="w-full max-w-xl mb-4 bg-white rounded-lg p-4 shadow-md">
        <div className="flex justify-between">
          <div>
            <h4 className="text-sm uppercase mb-1">Saldo Atual</h4>
            <p className="text-green-600 font-bold text-xl">R$ {(receitas - despesas).toFixed(2)}</p>
          </div>
          <div>
            <h4 className="text-sm uppercase mb-1">Energia Vital Total</h4>
            <p className="text-yellow-600 font-bold text-xl">⚡ {energiaRestante.toLocaleString()} kcal</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-xl mb-4 bg-white rounded-lg p-4 shadow-md flex justify-between">
        <div>
          <h4 className="text-sm uppercase mb-1">Receitas</h4>
          <p className="text-green-600 font-bold text-lg">R$ {receitas.toFixed(2)}</p>
        </div>
        <div>
          <h4 className="text-sm uppercase mb-1">Despesas</h4>
          <p className="text-red-600 font-bold text-lg">R$ {despesas.toFixed(2)}</p>
        </div>
        <div>
          <h4 className="text-sm uppercase mb-1">Energia Consumida</h4>
          <p className="text-yellow-600 font-bold text-lg">🔥 {energiaConsumida.toFixed(2)} kcal</p>
        </div>
      </div>

      <div className="w-full max-w-xl bg-white rounded-lg p-6 shadow-lg">
        <h3 className="text-lg font-bold mb-4">Adicionar transação</h3>
        <form className="space-y-4" onSubmit={handleAdicionar}>
                    <input
            type="text"
            value={nome}
            onChange={e => setNome(e.target.value)}
            placeholder="Nome da transação"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-400"
            autoFocus
          />

          <div>
            <label className="block text-sm font-medium mb-1">Valor</label>
            <input
              type="number"
              value={valor}
              onChange={e => setValor(e.target.value)}
              placeholder="Valor da transação"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tipo</label>
            <div className="flex gap-2">
              <button
                type="button"
                className={`px-3 py-1 text-white rounded ${
                  tipo === 'receita' ? 'bg-green-600' : 'bg-green-500 hover:bg-green-600'
                }`}
                onClick={() => setTipo('receita')}
              >
                Receita
              </button>
              <button
                type="button"
                className={`px-3 py-1 text-white rounded ${
                  tipo === 'despesa' ? 'bg-red-600' : 'bg-red-500 hover:bg-red-600'
                }`}
                onClick={() => setTipo('despesa')}
              >
                Despesa
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-bold py-2 rounded hover:bg-purple-700 transition"
          >
            Adicionar Transação
          </button>
        </form>

        {/* Filtro de tipo de transação */}
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-2">Transações recentes</h3>
          <FiltroTransacao filtro={filtro} setFiltro={setFiltro} />

          <ul className="mt-4 space-y-2">
            {transacoes
              .filter(t => filtro === 'todos' || t.tipo === filtro)
              .slice(-3)
              .map(t => (
                <li
                  key={t.id}
                  className="flex justify-between items-center border-b border-gray-200 py-2 px-3 bg-white rounded shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleRemover(t.id)}
                      className="text-red-500 hover:text-red-700 font-bold"
                    >
                      ❌
                    </button>
                    <div>
                      <p className="font-semibold text-sm">{t.nome}</p>
                      <small className="text-gray-500">
                        {t.tipo === 'receita' ? 'Receita' : 'Despesa'} • 🔥 {t.energiaGasta.toFixed(2)} kcal
                      </small>
                    </div>
                  </div>
                  <p
                    className={`font-bold ${
                      t.tipo === 'receita' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    R$ {t.valor.toFixed(2)}
                  </p>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FormularioTransacao;
