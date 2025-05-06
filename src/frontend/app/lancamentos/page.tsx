"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import LancamentoList from "./LancamentosList";
import LancamentoForm from "./LancamentosForm";
import { useCategorias } from "../hooks/useCategorias";
import { useRouter } from "next/navigation";

export default function LancamentosPage() {
  const [showForm, setShowForm] = useState(false);
  const [lancamentos, setLancamentos] = useState([]);
  const { categorias, handleGetCategorias } = useCategorias();
  const router = useRouter();

  useEffect(() => {
    handleGetCategorias();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  function obterPrimeiroDia() {
    const hoje = new Date();
    const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    return primeiroDia.toISOString().split("T")[0];
  }

  function obterUltimoDia() {
    const hoje = new Date();
    const ultimoDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
    return ultimoDia.toISOString().split("T")[0];
  }

  const [filtros, setFiltros] = useState({
    dataInicio: obterPrimeiroDia(),
    dataFim: obterUltimoDia(),
    categoria: "",
  });

  const handleAdicionarFiltro = () => {
    console.log("Filtros aplicados:", filtros);
  };

  const handleRemoverFiltros = () => {
    setFiltros({
      dataInicio: obterPrimeiroDia(),
      dataFim: obterUltimoDia(),
      categoria: "",
    });
  };

  return (
    <div className="flex min-h-screen bg-[#EDF3FB]">
      <Navbar />
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Filtros */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Filtros</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
              <select
                name="idCategoria"
                value={filtros.categoria}
                onChange={(e) =>
                  setFiltros({ ...filtros, categoria: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg bg-white text-gray-700"
              >
                <option value="">Selecione uma categoria</option>
                <option value={1}>Contas fixas</option>
                <option value={2}>Alimentação</option>
                <option value={3}>Aluguel</option>
                <option value={4}>Conta Telefone</option>
                <option value={5}>Saúde</option>
                <option value={6}>Vestuário</option>
                <option value={7}>Lazer</option>
                <option value={8}>Transporte</option>
                <option value={9}>Mercado</option>
                <option value={10}>Eletrônicos</option>
                <option value={11}>Salão</option>
                {categorias.map((cat) => (
                  <option key={cat.idCategoria} value={cat.idCategoria}>
                    {cat.categoria}
                  </option>
                ))}
              </select>
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

          {/* Lista de lançamentos */}
          <div className="bg-white p-4 rounded-lg shadow">
            <LancamentoList filtros={filtros} />
          </div>
        </div>

        {/* Modal do formulário */}
        {showForm && (
          <LancamentoForm
            onClose={() => setShowForm(false)}
          />
        )}
      </main>
    </div>
  );
}
