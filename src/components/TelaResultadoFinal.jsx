// Arquivo: TelaResultadoFinal.jsx
import GraficoTempoVida from './GraficoTempoVida';

export default function TelaResultadoFinal({ perfil, setMostrarFormulario = () => {} }) {
  const calcularEnergia = () => {
    const expectativaDias = (90 - perfil.idade) * 365;
    let base = expectativaDias * 2800;

    const fatorTrabalho = perfil.tipoTrabalho === 'fisico' ? 1.1 : 1;
    const fatorPostura = perfil.postura === 'em pé' ? 1.05 : 1;

    return Math.round(base * fatorTrabalho * fatorPostura);
  };

  const energiaTotal = calcularEnergia();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-white bg-gradient-to-b from-purple-300 to-purple-500">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">Sua Energia Vital 💥</h1>

      {/* Card com resultado */}
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md text-center mb-8">
        <p className="text-lg text-gray-700">Energia estimada durante sua vida ativa:</p>
        <p className="text-5xl font-extrabold text-blue-600 my-4">{energiaTotal.toLocaleString()} kcal</p>
        <p className="text-sm text-gray-600">Baseada nas suas respostas e perfil de trabalho.</p>
      </div>
      

      <button  onClick={() => setMostrarFormulario(true)}
               className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition cursor-pointer">
        Iniciar sua jornada 🔮
      </button>
    </div>
  );
}
