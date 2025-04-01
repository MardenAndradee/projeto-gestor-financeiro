"use client";
import { useState } from "react";
import Navbar from "../components/Navbar"; // Importando a Navbar
import OverviewCard from "../components/OverviewCard";
import ExpenseChart from "../components/ExpenseChart";

export default function MainPage() {
  const [saldo, setSaldo] = useState(5000);
  const [receitas, setReceitas] = useState(12000);
  const [despesas, setDespesas] = useState(7000);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar no topo */}
      <Navbar />

      {/* Conteúdo principal */}
      <div className="p-6 space-y-6">
        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <OverviewCard title="Saldo Atual" value={`R$ ${saldo}`} color="green" />
          <OverviewCard title="Receitas" value={`R$ ${receitas}`} color="blue" />
          <OverviewCard title="Despesas" value={`R$ ${despesas}`} color="red" />
        </div>

        {/* Gráfico */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Gastos Mensais</h2>
          <ExpenseChart />
        </div>
      </div>
    </div>
  );
}
