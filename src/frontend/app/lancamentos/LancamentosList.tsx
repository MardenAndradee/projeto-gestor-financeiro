"use client";

import React, { useEffect, useState } from "react";
import { useLancamentos } from "../hooks/useLancamentos";
import LancamentoForm from "./LancamentosForm";

type Lancamento = {
  descricao: string;
  valor: number;
  categoria: {
    idCategoria: number;
  };
  data: string;
  formaPagamento: string;
  qtdParcelas: number;
  nParcela?: number;
  dataParcela?: string;
};

type Filtros = {
  dataInicio: string;
  dataFim: string;
  categoria: string;
};

export default function LancamentoList({ filtros }: { filtros: Filtros }) {
  const { lancamentos, handleGetLancamentos } = useLancamentos();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    handleGetLancamentos(filtros);
  }, [filtros]);

  const handleExportarExcel = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/despesa/export/excel", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Erro ao exportar planilha.");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const now = new Date();
      const timestamp = now.toISOString().replace(/[:.]/g, "-");
      a.download = `despesas_${timestamp}.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Erro ao exportar o Excel.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center flex-wrap gap-2 mb-4">
        <h2 className="text-xl font-bold text-gray-800">Meus Lançamentos</h2>
        <div className="flex flex-wrap gap-2 justify-end">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm"
          >
            Adicionar
          </button>
          <button
            onClick={handleExportarExcel}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
          >
            Exportar Excel
          </button>
        </div>
      </div>

      {Array.isArray(lancamentos) && lancamentos.length === 0 ? (
        <p className="text-gray-500">Nenhum lançamento adicionado.</p>
      ) : Array.isArray(lancamentos) ? (
        <ul className="space-y-3">
          {lancamentos.map((item, index) => (
            <li
              key={index}
              className="p-4 border-b border-gray-200 flex justify-between items-center"
            >
              <div>
                <p className="text-gray-800 font-medium">{item.descricao}</p>
                <span className="text-gray-500 text-sm">
                  {new Date(item.dataParcela || item.data).toLocaleDateString("pt-BR")} -{" "}
                  {typeof item.categoria === "object" ? item.categoria.idCategoria : item.categoria} | {item.formaPagamento}{" "}
                  {item.qtdParcelas > 1 ? ` | ${item.nParcela} / ${item.qtdParcelas}` : ""}
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-green-600 font-semibold">R$ {item.valor.toFixed(2)}</span>

                <button
                  title="Editar"
                  className="text-lg hover:text-blue-600 transition"
                >
                  ✏️
                </button>

                <button
                  title="Excluir"
                  className="text-lg hover:text-red-600 transition"
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-red-500">Erro ao carregar lançamentos.</p>
      )}

      {showForm && <LancamentoForm onClose={() => setShowForm(false)} />}
    </div>
  );
}
