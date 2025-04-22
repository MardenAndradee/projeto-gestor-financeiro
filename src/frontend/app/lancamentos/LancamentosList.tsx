"use client"

import React,{useEffect, useState} from "react";
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

export default function LancamentoList() {

  const { lancamentos, handleGetLancamentos } = useLancamentos();

  useEffect(() => {
    handleGetLancamentos();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      {lancamentos.length === 0 ? (
        <p className="text-gray-500">Nenhum lançamento adicionado.</p>
      ) : (
        <ul className="space-y-3">
          {lancamentos.map((item: any, index: number) => (
            <li key={index} className="p-4 border-b border-gray-200 flex justify-between">
              <div>
                <p className="text-gray-800 font-medium">{item.descricao}</p>
                <span className="text-gray-500 text-sm">
                  {new Date(item.dataParcela).toLocaleDateString("pt-BR")} - {item.categoria} | {item.formaPagamento}{" "} {item.qtdParcelas > 1 ? ` |  ${item.nParcela} / ${item.qtdParcelas}` : ""}
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
