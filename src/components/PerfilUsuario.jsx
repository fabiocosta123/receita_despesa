import { useState, useEffect } from 'react';
import TelaGenero from './TelaGenero';
import TelaPostura from './TelaPostura';
import TelaTipoTrabalho from './TelaTipoTrabalho';
import TelaDadosUsuario from './TelaDadosUsuario';
import TelaResultadoFinal from './TelaResultadoFinal';
import FormularioTransacao from './FormularioTransacao';

export default function PerfilUsuario({
  transacoes,
  setTransacoes,
  energiaConsumida,
  setEnergiaConsumida
}) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [etapa, setEtapa] = useState(1);
  const [perfil, setPerfil] = useState({
    genero: '',
    postura: '',
    tipoTrabalho: '',
    idade: '',
    horas: '',
    salario: '',
    peso: ''
  });

  // ⏳ Carrega perfil salvo
  useEffect(() => {
    const salvo = localStorage.getItem('perfilUsuario');
    if (salvo) setPerfil(JSON.parse(salvo));
  }, []);

  // 💾 Salva tudo no localStorage ao atualizar
  useEffect(() => {
    localStorage.setItem('perfilUsuario', JSON.stringify(perfil));
    localStorage.setItem('transacoes', JSON.stringify(transacoes));
    localStorage.setItem('energiaConsumida', energiaConsumida.toString());
  }, [perfil, transacoes, energiaConsumida]);

  // 💰 Cálculos
  const receitas = transacoes
    .filter((t) => t.tipo === 'receita')
    .reduce((acc, t) => acc + t.valor, 0);

  const despesas = transacoes
    .filter((t) => t.tipo === 'despesa')
    .reduce((acc, t) => acc + t.valor, 0);

  const calcularEnergiaTotal = () => {
    const expectativaDias = (90 - parseFloat(perfil.idade || '0')) * 365;
    const base = expectativaDias * 2800;
    const fatorTrabalho = perfil.tipoTrabalho === 'fisico' ? 1.1 : 1;
    const fatorPostura = perfil.postura === 'em pé' ? 1.05 : 1;
    return Math.round(base * fatorTrabalho * fatorPostura);
  };

  const energiaTotal = calcularEnergiaTotal();
  const energiaRestante = Math.max(0, energiaTotal - energiaConsumida);

  const adicionarTransacao = (nova) => {
    const valorNumerico = parseFloat(nova.valor);
    const energiaGasta = isNaN(valorNumerico)
      ? 0
      : nova.tipo === 'despesa'
      ? valorNumerico * 2
      : valorNumerico * 0.5;

    const novaTransacao = {
      ...nova,
      id: Date.now(),
      energiaGasta
    };

    setTransacoes((prev) => [...prev, novaTransacao]);
    setEnergiaConsumida((prev) => prev + energiaGasta);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-300 to-purple-500 px-4 py-6">
      {mostrarFormulario ? (
        <FormularioTransacao
          perfil={perfil}
          energiaTotal={energiaTotal}
          energiaConsumida={energiaConsumida}
          setEnergiaConsumida={setEnergiaConsumida}
          transacoes={transacoes}
          setTransacoes={setTransacoes}
          receitas={receitas}
          despesas={despesas}
          onAdicionarTransacao={adicionarTransacao}
        />
      ) : (
        <div className="max-w-md mx-auto mt-6 space-y-6">
          {etapa === 1 && (
            <TelaGenero onNext={(val) => { setPerfil((p) => ({ ...p, genero: val })); setEtapa(2); }} />
          )}
          {etapa === 2 && (
            <TelaPostura onNext={(val) => { setPerfil((p) => ({ ...p, postura: val })); setEtapa(3); }} />
          )}
          {etapa === 3 && (
            <TelaTipoTrabalho onNext={(val) => { setPerfil((p) => ({ ...p, tipoTrabalho: val })); setEtapa(4); }} />
          )}
          {etapa === 4 && (
            <TelaDadosUsuario onNext={(val) => { setPerfil((p) => ({ ...p, ...val })); setEtapa(5); }} />
          )}
          {etapa === 5 && (
            <TelaResultadoFinal
              perfil={perfil}
              energiaTotal={energiaTotal}
              energiaRestante={energiaRestante}
              setMostrarFormulario={() => setMostrarFormulario(true)}
            />
          )}
        </div>
      )}
    </div>
  );
}
