"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import LancamentoForm from "./LancamentosForm";
import LancamentoList from "./LancamentosList";

export default function LancamentosPage() {
  const [showForm, setShowForm] = useState(false);
  const [lancamentos, setLancamentos] = useState([]);
  const [filtros, setFiltros] = useState({
    dataInicio: "",
    dataFim: "",
    categoria: "",
  });

  const handleAddLancamento = (novoLancamento) => {
    setLancamentos([
      ...lancamentos,
      { ...novoLancamento, valor: parseFloat(novoLancamento.valor) },
    ]);
    setShowForm(false);
  };

  const handleAdicionarFiltro = () => {
    console.log("Filtros aplicados:", filtros);
  };

  const handleRemoverFiltros = () => {
    setFiltros({ dataInicio: "", dataFim: "", categoria: "" });
  };

  return (
    <div className="flex min-h-screen bg-[#EDF3FB]">
      {/* Navbar lateral */}
      <Navbar />

      {/* Conteúdo principal */}
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Filtros */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Filtros</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <input
                type="date"
                value={filtros.dataInicio}
                onChange={(e) =>
                  setFiltros({ ...filtros, dataInicio: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg text-gray-700"
              />
              <input
                type="date"
                value={filtros.dataFim}
                onChange={(e) =>
                  setFiltros({ ...filtros, dataFim: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg text-gray-700"
              />
              <input
                type="text"
                value={filtros.categoria}
                onChange={(e) =>
                  setFiltros({ ...filtros, categoria: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg text-gray-700"
                placeholder="Categoria"
              />
            </div>

            <div className="flex flex-wrap justify-end gap-2">
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
            <LancamentoList
              lancamentos={lancamentos}
              onAddLancamento={() => setShowForm(true)}
            />
          </div>
        </div>

        {/* Modal do Formulário */}
        {showForm && (
          <LancamentoForm
            onAdd={handleAddLancamento}
            onClose={() => setShowForm(false)}
          />
        )}
      </main>
    </div>
  );
}
