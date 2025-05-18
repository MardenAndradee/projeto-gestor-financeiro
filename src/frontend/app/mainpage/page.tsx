"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { Banknote, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import Navbar from "../components/Navbar";
import { useLancamentos } from "../hooks/useLancamentos";

const cores = ["#1E40AF", "#10B981", "#F59E0B", "#EF4444", "#6366F1", "#14B8A6"];
const MESES = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

export default function DashboardPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [mesSelecionado, setMesSelecionado] = useState(new Date().getMonth());
  const [ano, setAno] = useState(new Date().getFullYear());
  const [openMesPicker, setOpenMesPicker] = useState(false);
  const [gastosPorCategoria, setGastosPorCategoria] = useState([]);
  const [gastosPorMes, setGastosPorMes] = useState([]);
  const {lancamentos, total, setTotal, handleGetValorTotal} = useLancamentos();

  useEffect(() => {
    const dadosMock = {
      porCategoria: [
        { categoria: "Alimentação", valor: 1200 },
        { categoria: "Transporte", valor: 800 },
        { categoria: "Lazer", valor: 500 },
      ],
      porMes: [],
    };

    setGastosPorCategoria(dadosMock.porCategoria);
    setGastosPorMes(dadosMock.porMes);
  }, [mesSelecionado]);



// Primeiro dia do mês
const primeiroDia = new Date(ano, mesSelecionado, 1);

// Último dia do mês (zero no dia 0 do próximo mês dá o último dia do mês atual)
const ultimoDia = new Date(ano, mesSelecionado + 1, 0);

// Função para formatar a data no formato yyyy-mm-dd
function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, "0"); // +1 porque getMonth é 0-11
  const d = date.getDate().toString().padStart(2, "0");
  return `${y}-${m}-${d}`;
}



const dataInicial = formatDate(primeiroDia);
const dataFinal = formatDate(ultimoDia);



  useEffect(() => {
  const primeiroDia = new Date(ano, mesSelecionado, 1);
  const ultimoDia = new Date(ano, mesSelecionado + 1, 0);

  const dataInicial = formatDate(primeiroDia);
  const dataFinal = formatDate(ultimoDia);

  console.log(dataFinal, dataInicial)

  handleGetValorTotal(dataInicial, dataFinal );
}, [ano, mesSelecionado]);

  const handleSelecionarMes = (index: number) => {
    setMesSelecionado(index);
    setOpenMesPicker(false);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e0f2fe]">
      <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />

      <main
        className={`relative z-10 transition-all duration-300 ease-in-out flex-1 p-4 md:p-6 lg:p-8 mt-14 md:ml-16 ${
          !collapsed && "md:ml-64"
        }`}
      >
        <div className="max-w-7xl mx-auto space-y-6">

          {/* seletor de mês */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setOpenMesPicker(!openMesPicker)}
                className="px-4 py-2 pl-5 pr-4 flex items-center justify-between gap-2 rounded-full border border-gray-300 bg-white text-gray-800 capitalize text-sm hover:shadow active:scale-95 transition-all"
              >
                {MESES[mesSelecionado].toLowerCase()}
                <ChevronDown className="w-4 h-4 text-gray-700" />
              </button>

              {openMesPicker && (
                <div className="absolute z-50 top-14 left-1/2 -translate-x-1/2 bg-white shadow-xl rounded-2xl w-72 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <button
                      onClick={() => setAno((prev) => prev - 1)}
                      className="p-1 rounded-full hover:bg-green-100 active:scale-95 transition-all"
                    >
                      <ChevronLeft className="w-5 h-5 text-green-600" />
                    </button>
                    <span className="text-lg font-bold text-green-700">{ano}</span>
                    <button
                      onClick={() => setAno((prev) => prev + 1)}
                      className="p-1 rounded-full hover:bg-green-100 active:scale-95 transition-all"
                    >
                      <ChevronRight className="w-5 h-5 text-green-600" />
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-center text-sm font-medium text-gray-700">
                    {MESES.map((mes, idx) => (
                      <button
                        key={mes}
                        onClick={() => handleSelecionarMes(idx)}
                        className={`py-2 rounded-lg transition-all active:scale-95 ${
                          idx === mesSelecionado
                            ? "bg-green-600 text-white shadow"
                            : "hover:bg-purple-100 bg-white"
                        }`}
                      >
                        {mes}
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between mt-4 text-sm text-green-700 font-medium">
                    <button
                      onClick={() => setOpenMesPicker(false)}
                      className="px-3 py-2 rounded-lg bg-white hover:bg-green-100 active:scale-95 transition-all"
                    >
                      CANCELAR
                    </button>
                    <button
                      onClick={() => {
                        setMesSelecionado(new Date().getMonth());
                        setAno(new Date().getFullYear());
                        setOpenMesPicker(false);
                      }}
                      className="px-3 py-2 rounded-lg bg-white hover:bg-green-100 active:scale-95 transition-all"
                    >
                      MÊS ATUAL
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Card de total de despesas e título */}
          <h1 className="text-3xl font-bold font-mono text-gray-800">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-md flex items-center justify-between border border-red-100 hover:shadow-lg transition">
              <div>
                <h3 className="text-gray-600 text-sm font-semibold mb-1">Total de Despesas</h3>
                <p className="text-2xl font-bold text-red-600">R$ {total.toFixed(2)}</p>
              </div>
              <div className="bg-red-100 text-red-700 border border-red-300 rounded-full p-3">
                <Banknote className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Gráfico */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  dataKey="valor"
                  data={gastosPorCategoria}
                  nameKey="categoria"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {Array.isArray(gastosPorCategoria) &&
                    gastosPorCategoria.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
                    ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}
