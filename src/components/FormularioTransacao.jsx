const FormularioTransacao = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-300 to-purple-500 p-4 sm:p-6 text-black font-sans">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6">
        CONTROLE DE DESPESAS
      </h2>

      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 max-w-lg lg:max-w-2xl mx-auto">
        <h4 className="text-sm sm:text-md uppercase font-semibold">Saldo atual</h4>
        <h1 className="text-3xl sm:text-4xl text-blue-600 font-bold mb-4">R$ 0.00</h1>

        <div className="flex flex-col sm:flex-row justify-between gap-4 bg-gray-100 p-4 rounded mb-6">
          <div className="flex-1">
            <h4 className="text-sm font-semibold uppercase">Receitas</h4>
            <p className="text-green-600 font-bold text-base sm:text-lg">R$ 0.00</p>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold uppercase">Despesas</h4>
            <p className="text-red-600 font-bold text-base sm:text-lg">R$ 0.00</p>
          </div>
        </div>

        <h3 className="text-md sm:text-lg font-bold mb-2">Transações</h3>
        <ul id="transactions" className="space-y-2 mb-6"></ul>

        <h3 className="text-md sm:text-lg font-bold mb-2">Adicionar transação</h3>
        <form id="form" className="space-y-4">
          <div className="form-control">
            <label htmlFor="text" className="block text-sm font-medium">Nome</label>
            <input
              type="text"
              id="text"
              placeholder="Nome da transação"
              autoFocus
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="form-control">
            <label htmlFor="amount" className="block text-sm font-medium">
              Valor
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-2 text-sm">
              <small className="text-gray-600">Escolha o tipo:</small>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="px-2 py-1 text-white bg-green-500 rounded text-xs hover:bg-green-600"
                >
                  +
                </button>
                <button
                  type="button"
                  className="px-2 py-1 text-white bg-red-500 rounded text-xs hover:bg-red-600"
                >
                  –
                </button>
              </div>
            </div>
            <input
              type="number"
              id="amount"
              placeholder="Valor da transação"
              className="w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <button className="w-full bg-purple-600 text-white font-bold py-2 rounded hover:bg-purple-700 transition cursor-pointer">
            Adicionar
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormularioTransacao;
