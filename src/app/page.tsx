"use client"
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import PerfilUsuario from '../components/PerfilUsuario';

import 'react-toastify/dist/ReactToastify.css';

type Transacao = {
  id: number;
  nome: string;
  valor: number;
  tipo: 'receita' | 'despesa';
  energiaGasta?: number;
};

export default function Home() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [energiaConsumida, setEnergiaConsumida] = useState<number>(0);

  useEffect(() => {
    const salvas: Transacao[] = JSON.parse(localStorage.getItem('transacoes') || '[]');
    setTransacoes(salvas);

    if (Array.isArray(salvas)) {
    setTransacoes(salvas);
    } else {
      console.warn("Transações não é um array!", salvas);
      setTransacoes([]); // fallback seguro
    }
    
    const energiaInicial = salvas
      .filter((t) => t.tipo === 'despesa')
      .reduce((acc: number, t: Transacao) => acc + (t.energiaGasta ?? 0), 0);

    setEnergiaConsumida(energiaInicial);
  }, []);

  return (
    <main>
      <PerfilUsuario
        transacoes={transacoes}
        setTransacoes={setTransacoes}
        energiaConsumida={energiaConsumida}
        setEnergiaConsumida={setEnergiaConsumida}
      />

      <ToastContainer />
    </main>
  );
}
