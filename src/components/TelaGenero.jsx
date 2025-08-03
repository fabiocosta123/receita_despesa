// Arquivo: TelaGenero.jsx
import { useState } from 'react';

export default function TelaGenero({ onNext }) {
  const [genero, setGenero] = useState('');

  const handleSelecionar = (valor) => {
    setGenero(valor);
    setTimeout(() => {
      onNext(valor); // prossegue pra próxima tela
    }, 300); // pequena pausa pra feedback visual
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-gray-100 bg-gradient-to-b from-purple-300 to-purple-500">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Qual seu gênero?</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md">
        {/* Masculino */}
        <div
          onClick={() => handleSelecionar('masculino')}
          className={`flex flex-col items-center justify-center p-6 rounded-xl shadow-lg cursor-pointer transition-colors 
            ${genero === 'masculino' ? 'bg-blue-600 text-white' : 'bg-blue-300 text-blue-900'} hover:bg-blue-500`}
        >
          <span className="text-5xl mb-4">♂️</span>
          <span className="text-lg font-semibold">Masculino</span>
        </div>

        {/* Feminino */}
        <div
          onClick={() => handleSelecionar('feminino')}
          className={`flex flex-col items-center justify-center p-6 rounded-xl shadow-lg cursor-pointer transition-colors 
            ${genero === 'feminino' ? 'bg-pink-500 text-white' : 'bg-pink-300 text-pink-900'} hover:bg-pink-400`}
        >
          <span className="text-5xl mb-4">♀️</span>
          <span className="text-lg font-semibold">Feminino</span>
        </div>
      </div>
    </div>
  );
}
