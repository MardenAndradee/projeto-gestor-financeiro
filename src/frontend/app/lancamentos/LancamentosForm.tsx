"use client";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

interface LancamentoFormProps {
  onAdd: (formData: LancamentoData) => void;
  onClose: () => void;
}

interface LancamentoData {
  descricao: string;
  valor: string;
  categoria: string;
  formaPagamento: string;
  data: string;
  qtdParcelas: number;
}

export default function LancamentoForm({ onAdd, onClose }: LancamentoFormProps) {
  const [formData, setFormData] = useState({
    descricao: "",
    valor: "",
    categoria: "Alimentação",
    formaPagamento: "Crédito",
    data: "",
    qtdParcelas: 1,
  });

  const handleChange =  (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)  => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h3 className="text-xl font-semibold  mb-2 text-gray-900">Adicionar Lançamento</h3>
        
        <input
          type="text"
          name="descricao"
          placeholder="Descrição"
          value={formData.descricao}
          onChange={handleChange}
          className="w-full mb-2 px-4 py-2 border rounded-lg bg-white text-gray-900 placeholder-gray-400"
        />
        
        <input
          type="number"
          name="valor"
          placeholder="Valor"
          value={formData.valor}
          onChange={handleChange}
          className="w-full mb-2 px-4 py-2 border rounded-lg bg-white text-gray-900 placeholder-gray-400"
        />
        
        <select
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          className="w-full mb-2 px-4 py-2 border rounded-lg bg-white text-gray-400"
        >
          <option>Contas fixas</option>
          <option>Alimentação</option>
          <option>Saúde</option>
        </select>
        
        <input
          type="date"
          name="data"
          value={formData.data}
          onChange={handleChange}
          className="w-full mb-2 px-4 py-2 border rounded-lg bg-white text-gray-400"
        />
        
        <select
          name="formaPagamento"
          value={formData.formaPagamento}
          onChange={handleChange}
          className="w-full mb-2 px-4 py-2 border rounded-lg bg-white text-gray-400"
        >
          <option>Crédito</option>
          <option>Débito</option>
          <option>Dinheiro</option>
          <option>Pix</option>
        </select>
        
        {formData.formaPagamento === "Crédito" && (
          <input
            type="number"
            name="qtdParcelas"
            min="1"
            value={formData.qtdParcelas}
            onChange={handleChange}
            className="w-full mb-2 px-4 py-2 border rounded-lg bg-white text-gray-900 placeholder-gray-400"
            placeholder="Quantidade de Parcelas"
          />
        )}
        
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
          >
            Cancelar
          </button>
          <button
            onClick={() => onAdd(formData)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}