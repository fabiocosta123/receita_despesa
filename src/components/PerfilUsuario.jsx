import { useState, useEffect } from 'react';
import TelaGenero from './TelaGenero';
import TelaPostura from './TelaPostura';
import TelaTipoTrabalho from './TelaTipoTrabalho';
import TelaDadosUsuario from './TelaDadosUsuario';
import TelaResultadoFinal from './TelaResultadoFinal';
import FormularioTransacao from './FormularioTransacao';

export default function PerfilUsuario() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [transacoes, setTransacoes] = useState([]);
  const [etapa, setEtapa] = useState(1);
  const [energiaConsumida, setEnergiaConsumida] = useState(0);

    const [perfil, setPerfil] = useState({
    genero: '',
    postura: '',
    tipoTrabalho: '',
    idade: '',
    horas: '',
    salario: '',
    peso: ''
  });

  useEffect(() => {
    const valorSalvo = parseFloat(localStorage.getItem('energiaConsumida'));
    const perfilSalvo = localStorage.getItem('perfilUsuario');

    if (perfilSalvo) setPerfil(JSON.parse(perfilSalvo));
    if (!isNaN(valorSalvo) && valorSalvo > 0) setEnergiaConsumida(valorSalvo);
  }, []);

    useEffect(() => {
    localStorage.setItem('perfilUsuario', JSON.stringify(perfil));

    if (transacoes.length > 0) {
      localStorage.setItem('energiaConsumida', energiaConsumida.toString());
    }
  }, [energiaConsumida, perfil, transacoes]);

  


  const receitas = transacoes.filter(t => t.tipo === 'receita').reduce((acc, t) => acc + t.valor, 0);
  const despesas = transacoes.filter(t => t.tipo === 'despesa').reduce((acc, t) => acc + t.valor, 0);

  const calcularEnergia = () => {
    const expectativaDias = (90 - perfil.idade) * 365;
    const base = expectativaDias * 2800;
    const fatorTrabalho = perfil.tipoTrabalho === 'fisico' ? 1.1 : 1;
    const fatorPostura = perfil.postura === 'em pé' ? 1.05 : 1;
    return Math.round(base * fatorTrabalho * fatorPostura);
  };


  
  const energiaTotalCalculada = calcularEnergia();
  const energiaRestante = energiaTotalCalculada - energiaConsumida;
    
  const adicionarTransacao = (nova) => {
  const valorNumerico = parseFloat(nova.valor);
  const energiaGasta = isNaN(valorNumerico)
    ? 0
    : nova.tipo === 'despesa'
      ? valorNumerico * 2
      : valorNumerico * 0.5;

  setTransacoes(prev => [...prev, { ...nova, energiaGasta }]);
  setEnergiaConsumida(prev => prev + energiaGasta);
};




  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-300 to-purple-500 px-4 py-6">
      {mostrarFormulario ? (
        <FormularioTransacao
          perfil={perfil}
          energiaTotal={energiaTotalCalculada}
          transacoes={transacoes}
          setTransacoes={setTransacoes}
          energiaConsumida={energiaConsumida}
          setEnergiaConsumida={setEnergiaConsumida}
          onAdicionarTransacao={adicionarTransacao}
          receitas={receitas}
          despesas={despesas}
        />
      ) : (
        <div className="max-w-md mx-auto mt-6 space-y-6">
          {etapa === 1 && (
            <TelaGenero onNext={val => { setPerfil(p => ({ ...p, genero: val })); setEtapa(2); }} />
          )}
          {etapa === 2 && (
            <TelaPostura onNext={val => { setPerfil(p => ({ ...p, postura: val })); setEtapa(3); }} />
          )}
          {etapa === 3 && (
            <TelaTipoTrabalho onNext={val => { setPerfil(p => ({ ...p, tipoTrabalho: val })); setEtapa(4); }} />
          )}
          {etapa === 4 && (
            <TelaDadosUsuario onNext={val => { setPerfil(p => ({ ...p, ...val })); setEtapa(5); }} />
          )}
          {etapa === 5 && (
            <TelaResultadoFinal perfil={perfil} setMostrarFormulario={() => setMostrarFormulario(true)} />
          )}
        </div>
      )}
    </div>
  );
}
