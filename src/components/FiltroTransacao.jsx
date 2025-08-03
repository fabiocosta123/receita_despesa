export default function FiltroTransacao({ filtro, setFiltro }) {
  return (
    <div className="flex gap-2">
      <button className={`px-2 ${filtro==='todos' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`} onClick={() => setFiltro('todos')}>Todas</button>
      <button className={`px-2 ${filtro==='receita' ? 'bg-green-600 text-white' : 'bg-gray-200'}`} onClick={() => setFiltro('receita')}>Receitas</button>
      <button className={`px-2 ${filtro==='despesa' ? 'bg-red-600 text-white' : 'bg-gray-200'}`} onClick={() => setFiltro('despesa')}>Despesas</button>
    </div>
  );
}
