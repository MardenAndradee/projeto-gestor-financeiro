"use client"

import React, { useEffect } from "react";
import { useLancamentos } from "../hooks/useLancamentos";

type Lancamento = {
  descricao: string;
  valor: number;
  categoria: {
    idCategoria: number;
  };
  data: string;
  formaPagamento: string;
  qtdParcelas: number;
};

export default function LancamentoList({ onAddLancamento }: { onAddLancamento: () => void }) {
  const { lancamentos, handleGetLancamentos } = useLancamentos();

  useEffect(() => {
    handleGetLancamentos();
  }, []);

  const handleExportarExcel = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8080/despesa/export/excel", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao exportar planilha.");
      }

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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Meus Lançamentos</h2>
        <div className="flex space-x-2">
          <button
            onClick={onAddLancamento}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Adicionar
          </button>
          <button
            onClick={handleExportarExcel}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Exportar Excel
          </button>
        </div>
      </div>

      {lancamentos.length === 0 ? (
        <p className="text-gray-500">Nenhum lançamento adicionado.</p>
      ) : (
        <ul className="space-y-3">
          {lancamentos.map((item: any, index: number) => (
            <li key={index} className="p-4 border-b border-gray-200 flex justify-between">
              <div>
                <p className="text-gray-800 font-medium">{item.descricao}</p>
                <span className="text-gray-500 text-sm">
                  {new Date(item.dataParcela).toLocaleDateString("pt-BR")} - {item.categoria} | {item.formaPagamento}{" "}
                  {item.qtdParcelas > 1 ? ` |  ${item.nParcela} / ${item.qtdParcelas}` : ""}
                </span>
              </div>
              <span className="text-green-600 font-semibold">R$ {item.valor.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
