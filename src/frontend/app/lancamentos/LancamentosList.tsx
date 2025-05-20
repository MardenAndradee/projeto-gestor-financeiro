"use client";

import React, { useEffect, useState } from "react";
import { useLancamentos } from "../hooks/useLancamentos";
import LancamentoForm from "./LancamentosForm";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

type Lancamento = {
  idParcela: number;
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
  const {lancamentos, handleGetLancamentos, handleDeleteLancamento, handleGetOneLancamento} = useLancamentos();
  const [showForm, setShowForm] = useState(false);
  const [idEditando, setIdEditando] = useState<number | null>(null);

  const handleAdicionar = () => {
    setIdEditando(null); // Modo adicionar
    setShowForm(true);
  };

  const handleEditar = (idParcela: number) => {
    setIdEditando(idParcela); // Modo edição
    setShowForm(true);
  };

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
        <h2 className="text-xl font-bold font-mono text-gray-800">Meus Lançamentos</h2>
        <div className="flex flex-wrap justify-center md:justify-end gap-2">
          <button
            onClick={handleExportarExcel}
            className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition text-sm"
          >
            Exportar
          </button>
          <button
            onClick={() => handleAdicionar()}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm"
          >
            Adicionar
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
              className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:justify-between md:items-center gap-2"
            >
              <div className="flex-1">
                <p className="text-gray-800 font-medium break-words">{item.descricao}</p>
                <span className="text-gray-500 text-sm block mt-1">
                  {new Date(item.dataParcela || item.data).toLocaleDateString("pt-BR")} -{" "}
                  {typeof item.categoria === "object" ? item.categoria.idCategoria : item.categoria} | {item.formaPagamento}{" "}
                  {item.qtdParcelas > 1 ? ` | ${item.nParcela} / ${item.qtdParcelas}` : ""}
                </span>
              </div>

              <div className="flex justify-between md:justify-end items-center gap-4 min-w-[120px]">
                <span className="text-green-600 font-semibold whitespace-nowrap">
                  R$ {item.valor.toFixed(2)}
                </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEditar(item.idParcela)}
            title="Editar"
            className="hover:text-blue-600 transition"
          >
            <PencilSquareIcon className="h-5 w-5 text-gray-600 hover:text-gray-700" />
          </button>

          <button
            onClick={() => handleDeleteLancamento(item.idParcela)}
            title="Excluir"
            className="hover:text-red-600 transition"
          >
            <TrashIcon className="h-5 w-5 text-gray-600 hover:text-gray-700" />
          </button>
        </div>
      </div>
    </li>
  ))}
</ul>
      ) : (
        <p className="text-red-500">Erro ao carregar lançamentos.</p>
      )}

      {showForm && <LancamentoForm onClose={() => setShowForm(false)}
      atualizarLancamentos={() => handleGetLancamentos(filtros)}
      idParcela ={idEditando} />}
    </div>
  );
}
