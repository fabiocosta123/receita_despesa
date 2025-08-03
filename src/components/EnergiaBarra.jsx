import React from 'react';

export default function EnergiaBarra({ energiaAtual, energiaTotal }) {
  const percentualRaw = energiaTotal > 0 ? (energiaAtual / energiaTotal) * 100 : 0;
  const percentual = Math.max(0, Math.min(100, Math.round(percentualRaw)));

  const getCorBarra = () => {
    if (percentual >= 70) return 'bg-gradient-to-r from-green-400 to-green-600';
    if (percentual >= 30) return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
    return 'bg-gradient-to-r from-red-400 to-red-600';
  };

  return (
    <div className="w-full mt-4">
      <div className="mb-1 flex justify-between items-center text-sm text-gray-700">
        <span>⚡ Energia Vital</span>
        <span>{energiaAtual.toLocaleString()} kcal</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden shadow-inner">
        <div
          className={`h-5 ${getCorBarra()} transition-all duration-500`}
          style={{ width: `${percentual}%` }}
        />
      </div>

      <p className="text-xs text-gray-600 text-right mt-1">
        {percentual}% restante
      </p>
    </div>
  );
}
