import React, { useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { nanoid } from 'nanoid'
import FiltroTransacao from './FiltroTransacao';


const FormularioTransacao = ({
  perfil,
  energiaTotal,
  transacoes,
  setTransacoes,
  energiaConsumida,
  setEnergiaConsumida,
  onAdicionarTransacao,
  receitas,
  despesas
}) => {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('');
  const [filtro, setFiltro] = useState('todos');
  const [erroCampos, setErroCampos] = useState(false);

  // 🔋 Energia restante sempre atualizada
  const energiaRestante = useMemo(() => {
    const total = parseFloat(energiaTotal ?? '0');
    const consumida = parseFloat(energiaConsumida ?? '0');
    return Math.max(0, total - consumida);
  }, [energiaTotal, energiaConsumida]);

  // 🧮 Cálculo de energia por despesa real
  const calcularEnergiaDespesa = (valorNumerico) => {
    const salario = parseFloat(perfil?.salario ?? '0');
    const horas = parseFloat(perfil?.horas ?? '1');
    const peso = parseFloat(perfil?.peso ?? '70');

    if ([salario, horas, peso, valorNumerico].some(v => isNaN(v) || v <= 0)) return 0;

    const salarioHora = salario / horas;
    const horasEsforco = valorNumerico / salarioHora;

    const taxaPorNivel = {
      sedentario: 1.3,
      moderado: 2.5,
      intenso: 3.8
    };

    const nivelAtividade = 'moderado'; // pode vir do perfil futuramente
    const taxa = taxaPorNivel[nivelAtividade];
    const energiaPorHora = taxa * peso;

    return horasEsforco * energiaPorHora;
  };

  // ➕ Adiciona nova transação
 

const handleAdicionar = (e) => {
  e.preventDefault();

  const valorNumerico = parseFloat(valor);
  const tipoFormatado = tipo?.toLowerCase().trim() || 'receita'; // valor padrão garantido

  // Validação de campos
  if (!nome || isNaN(valorNumerico) || !tipoFormatado) {
    setErroCampos(true);
    toast.error("Preencha todos os campos corretamente.");
    return;
  }
  setErroCampos(false);

  const energiaGasta =
    tipoFormatado === 'despesa'
      ? valorNumerico * 2
      : valorNumerico * 0.5;

  const novaTransacao = {
    id: nanoid(),
    nome,
    valor: valorNumerico,
    tipo: tipoFormatado,
    energiaGasta
  };

  onAdicionarTransacao(novaTransacao);

  // Atualiza energia se for despesa
  if (tipoFormatado === 'despesa') {
    const novaEnergia = energiaConsumida + energiaGasta;
    setEnergiaConsumida(novaEnergia);

    const metaSemanal = (energiaTotal ?? 0) * 0.02;
    if (novaEnergia > metaSemanal) {
      toast.warn("⚠️ Essa despesa ultrapassa sua meta de energia semanal!");
    }
  }

  // Limpa os campos
  setNome('');
  setValor('');
  setTipo('receita'); // valor inicial garantido
};

  // ❌ Remove transação e atualiza energia
  const handleRemover = (id) => {
    const removida = transacoes.find(t => t.id === id);
    const novas = transacoes.filter(t => t.id !== id);
    setTransacoes(novas);

    if (!isNaN(removida?.energiaGasta)) {
      setEnergiaConsumida(prev => Math.max(0, prev - removida.energiaGasta));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-purple-300 to-purple-500 px-4 py-6 text-black font-sans">
      <h2 className="text-3xl font-bold text-center mb-6">CONTROLE DE DESPESAS</h2>

      {/* ⚡ Painel de energia */}
      <div className="w-full max-w-xl mb-4 bg-white rounded-lg p-4 shadow-md">
        <div className="flex justify-between flex-wrap gap-4">
          <div>
            <h4 className="text-sm uppercase mb-1">Saldo Atual</h4>
            <p className="text-green-600 font-bold text-xl">R$ {(receitas - despesas).toFixed(2)}</p>
          </div>
          <div>
            <h4 className="text-sm uppercase mb-1">Energia Total</h4>
            <p className="text-yellow-600 font-bold text-xl">⚡ {(energiaTotal ?? 0).toLocaleString()} kcal</p>
          </div>
          <div>
            <h4 className="text-sm uppercase mb-1">Energia Restante</h4>
            <p className="text-blue-600 font-bold text-xl">🌟 {energiaRestante.toLocaleString()} kcal</p>
          </div>
        </div>
      </div>

      {/* 💰 Painel financeiro */}
      <div className="w-full max-w-xl mb-4 bg-white rounded-lg p-4 shadow-md flex justify-between flex-wrap gap-4">
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

      {/* 🧾 Formulário de transação */}
      <div className="w-full max-w-xl bg-white rounded-lg p-6 shadow-lg">
        <h3 className="text-lg font-bold mb-4">Adicionar transação</h3>
        <form className="space-y-4" onSubmit={handleAdicionar}>
          {erroCampos && (
            <div className="bg-red-100 text-red-700 border border-red-300 px-3 py-2 rounded">
              ⚠️ Preencha todos os campos corretamente.
            </div>
          )}

          <input
            type="text"
            value={nome}
            onChange={e => setNome(e.target.value)}
            placeholder="Nome da transação"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-400"
            autoFocus
          />

          <input
            type="number"
            value={valor}
            onChange={e => setValor(e.target.value)}
            placeholder="Valor da transação"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-400"
          />

          <div>
            <label className="block text-sm font-medium mb-1">Tipo</label>
            <div className="flex gap-2 mt-2">
              <button
                className={`px-5 py-2 rounded font-bold transition-colors duration-300 cursor-pointer ${
                  tipo === 'receita'
                    ? 'bg-blue-600 text-white'
                    : 'bg-green-400 text-gray-700 hover:bg-green-200 cursor-pointer'
                }`}
                onClick={() => setTipo('receita')}
              >
                Receita 💰
              </button>
              <button
                className={`px-5 py-2 rounded font-bold transition-colors duration-300 ${
                  tipo === 'despesa'
                    ? 'bg-blue-600 text-white'
                    : 'bg-red-400 text-gray-700 hover:bg-red-200 cursor-pointer'
                }`}
                onClick={() => setTipo('despesa')}
              >
                Despesa 🔥
              </button>
            </div>

          </div>
           

          {/* <button
            type="submit"
            className="w-full bg-purple-600 text-white font-bold py-2 rounded hover:bg-purple-700 transition cursor-pointer"
          >
            Adicionar Transação
          </button> */}
        </form>

                {/* 🧾 Lista de transações */}
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
                      className="text-red-500 hover:text-red-700 font-bold cursor-pointer"
                    >
                      ❌
                    </button>
                    <div>
                      <p className="font-semibold text-sm">{t.nome}</p>
                      <small className="text-gray-500">
                        {t.tipo === 'receita' ? 'Receita' : 'Despesa'} • 🔥 {t.energiaGasta?.toFixed(2) ?? '0.00'} kcal
                      </small>
                    </div>
                  </div>
                  <p
                    className={`font-bold ${
                      t.tipo === 'receita' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    R$ {t.valor?.toFixed(2) ?? '0.00'}
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
