// Arquivo: TelaPostura.jsx
import { useState } from 'react';

export default function TelaPostura({ onNext }) {
  const [postura, setPostura] = useState('');

  const handleSelecionar = (valor) => {
    setPostura(valor);
    setTimeout(() => {
      onNext(valor); // prossegue pra próxima tela
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-white bg-gradient-to-b from-purple-300 to-purple-500">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Como é sua postura durante o trabalho?</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md">
        {/* Sentado */}
        <div
          onClick={() => handleSelecionar('sentado')}
          className={`flex flex-col items-center justify-center p-6 rounded-xl shadow-lg cursor-pointer transition-colors 
            ${postura === 'sentado' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-gray-400`}
        >
          <span className="text-5xl mb-4">🪑</span>
          <span className="text-lg font-semibold">Mais tempo sentado</span>
        </div>

        {/* Em pé */}
        <div
          onClick={() => handleSelecionar('em pé')}
          className={`flex flex-col items-center justify-center p-6 rounded-xl shadow-lg cursor-pointer transition-colors 
            ${postura === 'em pé' ? 'bg-green-600 text-white' : 'bg-green-300 text-green-900'} hover:bg-green-500`}
        >
          <span className="text-5xl mb-4">🧍</span>
          <span className="text-lg font-semibold">Mais tempo em pé</span>
        </div>
      </div>
    </div>
  );
}
