"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import LancamentosList from "./LancamentosList";
import LancamentosForm from "./LancamentosForm";
import { useCategorias } from "../hooks/useCategorias";
import { useRouter } from "next/navigation";

export default function LancamentosPage() {
  const [showForm, setShowForm] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
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
    return new Date(hoje.getFullYear(), hoje.getMonth(), 1)
      .toISOString()
      .split("T")[0];
  }

  function obterUltimoDia() {
    const hoje = new Date();
    return new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0)
      .toISOString()
      .split("T")[0];
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
      {/* Navbar com sidebar e topbar integradas */}
      <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Conteúdo principal */}
      <main
        className={`transition-all duration-300 ease-in-out flex-1 p-4 md:p-6 lg:p-8 overflow-auto
        mt-14 md:ml-16 ${!collapsed && "md:ml-64"}`}
      >
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Filtros */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h2 className="text-xl font-bold font-mono text-gray-800 mb-4">Filtros</h2>
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
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n, i) => (
                  <option key={n} value={n}>
                    {
                      [
                        "Contas fixas",
                        "Alimentação",
                        "Aluguel",
                        "Conta Telefone",
                        "Saúde",
                        "Vestuário",
                        "Lazer",
                        "Transporte",
                        "Mercado",
                        "Eletrônicos",
                        "Salão",
                      ][i]
                    }
                  </option>
                ))}
                {categorias.map((cat) => (
                  <option key={cat.idCategoria} value={cat.idCategoria}>
                    {cat.categoria}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap justify-center md:justify-end gap-2">
              <button
                onClick={handleRemoverFiltros}
                className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition text-sm"
              >
                Remover Filtro
              </button>
              <button
                onClick={handleAdicionarFiltro}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm"
              >
                Adicionar Filtro
              </button>
            </div>
          </div>

          {/* Lista de lançamentos */}
          <div className="bg-white p-4 rounded-lg shadow">
            <LancamentosList filtros={filtros} />
          </div>
        </div>

        {/* Modal do formulário */}
        {showForm && <LancamentosForm onClose={() => setShowForm(false)} />}
      </main>
    </div>
  );
}
