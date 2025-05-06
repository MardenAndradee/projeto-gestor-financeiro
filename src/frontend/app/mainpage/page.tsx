"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import OverviewCard from "../components/OverviewCard";
import ExpenseChart from "../components/ExpenseChart";
import { useRouter } from "next/navigation";

export default function MainPage() {
  const [saldo, setSaldo] = useState(5000);
  const [receitas, setReceitas] = useState(12000);
  const [despesas, setDespesas] = useState(7000);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
      if (!token) {
        router.push("/login");
      }
  }, []);

  return (
    <div className="flex min-h-screen bg-[#EDF3FB]">
      {/* Navbar lateral */}
      <Navbar />

      {/* Conteúdo principal */}
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <OverviewCard title="Saldo Atual" value={`R$ ${saldo}`} color="green" />
            <OverviewCard title="Receitas" value={`R$ ${receitas}`} color="blue" />
            <OverviewCard title="Despesas" value={`R$ ${despesas}`} color="red" />
          </div>

          {/* Gráfico de Gastos */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Gastos Mensais</h2>
            <ExpenseChart />
          </div>
        </div>
      </main>
    </div>
  );
}
