// Arquivo: TelaDadosUsuario.jsx
import { useState } from 'react';

export default function TelaDadosUsuario({ onNext }) {
  const [idade, setIdade] = useState('');
  const [horas, setHoras] = useState('');
  const [salario, setSalario] = useState('');

  const handleSubmit = () => {
    if (idade && horas && salario) {
      onNext({ idade, horas, salario });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-white bg-gradient-to-b from-purple-300 to-purple-500">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Complete seus dados</h1>

      <div className="space-y-6 w-full max-w-md">
        {/* Idade */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Idade</label>
          <input
            type="number"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: 28"
          />
        </div>

        {/* Jornada de trabalho */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Horas de trabalho por dia</label>
          <input
            type="number"
            value={horas}
            onChange={(e) => setHoras(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: 8"
          />
        </div>

        {/* Salário mensal */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Salário mensal (R$)</label>
          <input
            type="number"
            value={salario}
            onChange={(e) => setSalario(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: 2500"
          />
        </div>

        {/* Botão para avançar */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition cursor-pointer"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
