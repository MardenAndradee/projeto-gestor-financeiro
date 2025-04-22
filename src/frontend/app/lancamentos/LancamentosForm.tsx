"use client";
import { useState } from "react";
import { useLancamentos } from "../hooks/useLancamentos";

export default function LancamentosForm({onAdd,onClose}){
  const{
      descricao, setdescricao,
      valor, setValor,
      categoria, setCategoria,
      data, setData,
      formaPagamento, setFormaPagamento,
      qtdParcelas, setQtdParcelas,
      usuario, setUsuario,
      error,
      success,
      handleLancamento,
      lancamentos,
    } = useLancamentos();


  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault(); 
    await handleLancamento(); 
    onClose();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    switch (name) {
      case "descricao":
        setdescricao(value);
        break;
      case "valor":
        setValor(value);
        break;
      case "categoria":
        setCategoria(value);
        break;
      case "data":
        setData(value);
        break;
      case "formaPagamento":
        setFormaPagamento(value);
        break;
      case "qtdParcelas":
        setQtdParcelas(value);
        break;
      case "usuario":
        setUsuario(value);
        break;
      default:
        break;
    }
  };



  return (
    <form onSubmit={handleSubmit}>
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h3 className="text-xl font-semibold  mb-2 text-gray-900">Adicionar Lançamento</h3>
        
        <input
          type="text"
          name="descricao"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setdescricao(e.target.value)}
          className="w-full mb-2 px-4 py-2 border rounded-lg bg-white text-gray-900 placeholder-gray-400"
        />
        
        <input
          type="number"
          name="valor"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          className="w-full mb-2 px-4 py-2 border rounded-lg bg-white text-gray-900 placeholder-gray-400"
        />
        
        <select
          name="categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full mb-2 px-4 py-2 border rounded-lg bg-white text-gray-400"
        >
          <option value={1}>Contas fixas</option>
          <option value={2}>Alimentação</option>
          <option value={3}>Saúde</option>
        </select>
        
        <input
          type="date"
          name="data"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="w-full mb-2 px-4 py-2 border rounded-lg bg-white text-gray-400"
        />
        
        <select
          name="formaPagamento"
          value={formaPagamento}
          onChange={(e) => setFormaPagamento(e.target.value)}
          className="w-full mb-2 px-4 py-2 border rounded-lg bg-white text-gray-400"
        >
          <option>Crédito</option>
          <option>Débito</option>
          <option>Dinheiro</option>
          <option>Pix</option>
        </select>
        
        {formaPagamento === "Crédito" && (
          <input
            type="number"
            name="qtdParcelas"
            min="1"
            value={qtdParcelas}
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
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
    </form>
  );
}

