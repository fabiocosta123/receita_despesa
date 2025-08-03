// Arquivo: TelaTipoTrabalho.jsx
import { useState } from 'react';

export default function TelaTipoTrabalho({ onNext }) {
  const [tipo, setTipo] = useState('');

  const handleSelecionar = (valor) => {
    setTipo(valor);
    setTimeout(() => {
      onNext(valor); // avança para próxima tela
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-gray-50 bg-gradient-to-b from-purple-300 to-purple-500">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Seu trabalho exige mais esforço mental ou físico?</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md">
        {/* Mental */}
        <div
          onClick={() => handleSelecionar('mental')}
          className={`flex flex-col items-center justify-center p-6 rounded-xl shadow-md cursor-pointer transition-colors 
            ${tipo === 'mental' ? 'bg-purple-600 text-white' : 'bg-purple-200 text-purple-900'} hover:bg-purple-400`}
        >
          <span className="text-5xl mb-4">💭</span>
          <span className="text-lg font-semibold">Esforço mental</span>
        </div>

        {/* Físico */}
        <div
          onClick={() => handleSelecionar('fisico')}
          className={`flex flex-col items-center justify-center p-6 rounded-xl shadow-md cursor-pointer transition-colors 
            ${tipo === 'fisico' ? 'bg-red-600 text-white' : 'bg-red-200 text-red-900'} hover:bg-red-400`}
        >
          <span className="text-5xl mb-4">💪</span>
          <span className="text-lg font-semibold">Esforço físico</span>
        </div>
      </div>
    </div>
  );
}
