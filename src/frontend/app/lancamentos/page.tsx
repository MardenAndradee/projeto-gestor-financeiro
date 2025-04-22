"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import LancamentoForm from "./LancamentosForm";
import LancamentoList from "./LancamentosList";
import { useLancamentos } from "../hooks/useLancamentos";

export default function LancamentosPage() {
  const [showForm, setShowForm] = useState(false);
  const [lancamentos, setLancamentos] = useState([]);

  const handleAddLancamento = (novoLancamento) => {
    setLancamentos([...lancamentos, { ...novoLancamento, valor: parseFloat(novoLancamento.valor) }]);
    setShowForm(false);
  };

  return (
    <div className="bg-green-100 min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-green-700">Lançamentos</h1>
          <button
            className="text-white bg-green-600 px-4 py-2 rounded-lg shadow hover:bg-green-700"
            onClick={() => setShowForm(true)}
          >
            +
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <LancamentoList lancamentos={lancamentos} />
        </div>
      </div>
      {showForm && <LancamentoForm onAdd={handleAddLancamento} onClose={() => setShowForm(false)} />}
    </div>
  );
}