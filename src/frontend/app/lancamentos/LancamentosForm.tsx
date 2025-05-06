"use client";
import { useState } from "react";
import { useLancamentos } from "../hooks/useLancamentos";

export default function LancamentosForm({ onAdd, onClose }) {
  const {
    descricao, setdescricao,
    valor, setValor,
    categoria, setCategoria,
    data, setData,
    formaPagamento, setFormaPagamento,
    qtdParcelas, setQtdParcelas,
    usuario, setUsuario,
    handleLancamento,
  } = useLancamentos();

  const [showCategoriaModal, setShowCategoriaModal] = useState(false);
  const [novaCategoria, setNovaCategoria] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const novoLancamento = await handleLancamento();
    if (novoLancamento) {
      onAdd(novoLancamento); // ✅ adiciona na listagem
      onClose();             // fecha o modal
    }
  };

  const handleAddCategoria = () => {
    if (novaCategoria.trim() !== "") {
      alert(`Categoria "${novaCategoria}" cadastrada!`);
      setNovaCategoria("");
      setShowCategoriaModal(false);
    }
  };

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
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-xl shadow-lg w-11/12 max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Adicionar Lançamento</h3>

            <input type="text" name="descricao" placeholder="Descrição" value={descricao}
              onChange={handleChange}
              className="w-full mb-3 px-4 py-2 border rounded-lg bg-white text-gray-900 placeholder-gray-400"
            />
            <input type="number" name="valor" placeholder="Valor" value={valor}
              onChange={handleChange}
              className="w-full mb-3 px-4 py-2 border rounded-lg bg-white text-gray-900 placeholder-gray-400"
            />

            <div className="flex items-center gap-2 mb-3">
              <select name="categoria" value={categoria}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg bg-white text-gray-400">
                <option value={1}>Contas fixas</option>
                <option value={2}>Alimentação</option>
                <option value={3}>Saúde</option>
              </select>
              <button type="button" onClick={() => setShowCategoriaModal(true)}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded-full">+</button>
            </div>

            <input type="date" name="data" value={data}
              onChange={handleChange}
              className="w-full mb-3 px-4 py-2 border rounded-lg bg-white text-gray-400"
            />
            <select name="formaPagamento" value={formaPagamento}
              onChange={handleChange}
              className="w-full mb-3 px-4 py-2 border rounded-lg bg-white text-gray-400">
              <option>Crédito</option>
              <option>Débito</option>
              <option>Dinheiro</option>
              <option>Pix</option>
            </select>

            {formaPagamento === "Crédito" && (
              <input type="number" name="qtdParcelas" min="1" value={qtdParcelas}
                onChange={handleChange}
                className="w-full mb-3 px-4 py-2 border rounded-lg bg-white text-gray-900 placeholder-gray-400"
                placeholder="Quantidade de Parcelas" />
            )}

            <div className="flex justify-end space-x-2">
              <button onClick={onClose} type="button"
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">Cancelar</button>
              <button type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Adicionar</button>
            </div>
          </div>
        </div>
      </form>

      {showCategoriaModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Nova Categoria</h3>
            <input type="text" value={novaCategoria}
              onChange={(e) => setNovaCategoria(e.target.value)}
              placeholder="Nome da categoria"
              className="w-full mb-4 px-4 py-2 border rounded-lg" />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowCategoriaModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">Cancelar</button>
              <button onClick={handleAddCategoria}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Salvar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
