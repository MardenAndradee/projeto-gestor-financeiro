"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import LancamentoForm from "./LancamentosForm";
import LancamentoList from "./LancamentosList";
import { useLancamentos } from "../hooks/useLancamentos";

export default function LancamentosPage() {
  const [showForm, setShowForm] = useState(false);
  const [lancamentos, setLancamentos] = useState([]);

  const [filtros, setFiltros] = useState({
    dataInicio: "",
    dataFim: "",
    categoria: "",
  });

  const handleAddLancamento = (novoLancamento) => {
    setLancamentos([...lancamentos, { ...novoLancamento, valor: parseFloat(novoLancamento.valor) }]);
    setShowForm(false);
  };

  const handleAdicionarFiltro = () => {
    // aqui você aplicaria o filtro no futuro
    console.log("Filtros aplicados:", filtros);
  };

  const handleRemoverFiltros = () => {
    setFiltros({ dataInicio: "", dataFim: "", categoria: "" });
  };

  return (
    <div className="bg-green-100 min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">

        {/* Área de Filtros */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Filtros</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="date"
              value={filtros.dataInicio}
              onChange={(e) => setFiltros({ ...filtros, dataInicio: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg text-gray-700"
              placeholder="Data Início"
            />
            <input
              type="date"
              value={filtros.dataFim}
              onChange={(e) => setFiltros({ ...filtros, dataFim: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg text-gray-700"
              placeholder="Data Fim"
            />
            <input
              type="text"
              value={filtros.categoria}
              onChange={(e) => setFiltros({ ...filtros, categoria: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg text-gray-700"
              placeholder="Categoria"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleRemoverFiltros}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Remover Filtros
            </button>
            <button
              onClick={handleAdicionarFiltro}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Adicionar Filtro
            </button>
          </div>
        </div>

        {/* Lista de Lançamentos */}
        <div className="bg-white p-4 rounded-lg shadow">
        <LancamentoList lancamentos={lancamentos} onAddLancamento={() => setShowForm(true)} />
        </div>
      </div>

      {/* Modal do Formulário */}
      {showForm && <LancamentoForm onAdd={handleAddLancamento} onClose={() => setShowForm(false)} />}
    </div>
  );
}
