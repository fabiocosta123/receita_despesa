export function criarTransacaoValida(transacaoBruta) {
  const valorNumerico = parseFloat(transacaoBruta.valor);
  const tipo = transacaoBruta.tipo.toLowerCase().trim();

  const energiaGasta = isNaN(valorNumerico)
    ? 0
    : tipo === 'despesa'
    ? valorNumerico * 2
    : valorNumerico * 0.5;

  return {
    ...transacaoBruta,
    valor: isNaN(valorNumerico) ? '0' : transacaoBruta.valor,
    tipo,
    energiaGasta,
    id: Date.now(),
  };
}
