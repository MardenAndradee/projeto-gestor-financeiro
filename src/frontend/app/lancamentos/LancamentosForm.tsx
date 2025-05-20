"use client";
import { useState, useEffect } from "react";
import { useLancamentos } from "../hooks/useLancamentos";
import { useCategorias } from "../hooks/useCategorias";

type LancamentosFormProps = {
  onClose: () => void;
  atualizarLancamentos: () => void;
  idParcela: number | null;
};

export default function LancamentosForm({ onClose, idParcela, atualizarLancamentos }: LancamentosFormProps) {
  const {
    descricao, setdescricao,
    valor, setValor,
    idCategoria, setIdCategoria,
    data, setData,
    formaPagamento, setFormaPagamento,
    qtdParcelas, setQtdParcelas,
    usuario, setUsuario,
    error,
    success,
    handleLancamento,
    handleGetOneLancamento,
    handleEditLancamento,
    lancamentos,
  } = useLancamentos();

  const{
    categorias,
    categoria, setCategoria,
    handleGetCategorias,
    handleCategorias,
    handleGetCategoriaById
  } = useCategorias();
  const [oneCategoria, setOneCategoria] = useState<string>('');

  useEffect(() => {
    handleGetCategorias();
  }, []);

  useEffect(() => {
    if (formaPagamento !== "Crédito") {
      setQtdParcelas(1);
    }
  }, [formaPagamento]);

  useEffect(() => {
  if (idParcela !== null) {
    handleGetOneLancamento(idParcela)
      .then((lancamentos) => {
        setdescricao(lancamentos.descricao);
        setValor(lancamentos.valor);
        setIdCategoria(lancamentos.idCategoria);
        setData(lancamentos.dataParcela);
        setFormaPagamento(lancamentos.formaPagamento);
        setQtdParcelas(lancamentos.qtdParcelas || 1);

    })

  } else {
    setdescricao('');
    setValor('');
    setCategoria('Contas Fixas');
    setData(obterDataHoje());
    setFormaPagamento('Débito');
    setQtdParcelas(1);
    setUsuario('');
  }
}, [idParcela]);

useEffect(() => {
  if (idCategoria) {
    handleGetCategoriaById(idCategoria).then((categoriaData) => {
      if (categoriaData && categoriaData.categoria) {
        setCategoria(categoriaData.categoria); // Preenche o nome da categoria
      }
    });
  }
}, []);

  function obterDataHoje() {
    const hoje = new Date();
    const dataHoje = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    return dataHoje.toISOString().split("T")[0];
  }



  const [showCategoriaModal, setShowCategoriaModal] = useState(false);
  const [novaCategoria, setNovaCategoria] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     if (idParcela !== null) {
      await handleEditLancamento(idParcela);
      atualizarLancamentos();
      onClose();
    }else{
      const sucesso = await handleLancamento();

    if(sucesso){
        atualizarLancamentos();
      onClose();
    }
    }
  };

  const handleAddCategoria = async () => {
      const sucesso = await handleCategorias();
      setNovaCategoria("");
      setShowCategoriaModal(false);
      handleGetCategorias();
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
        setQtdParcelas(Number(value));
        break;
      case "usuario":
        setUsuario(value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-xl shadow-lg w-11/12 max-w-md">
            <h3 className="text-xl font-bold font-mono mb-4 text-gray-900">Adicionar Lançamento</h3>

            <input
              type="text"
              name="descricao"
              placeholder="Descrição"
              value={descricao}
              onChange={(e) => setdescricao(e.target.value)}
              className="w-full mb-3 px-4 py-2 border rounded-lg bg-white text-gray-900 placeholder-gray-400"
            />

            <input
              type="number"
              name="valor"
              placeholder="Valor"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="w-full mb-3 px-4 py-2 border rounded-lg bg-white text-gray-900 placeholder-gray-400"
            />

            <div className="flex items-center gap-2 mb-3">
            <select
          name="idCategoria"
          value={idCategoria}
          onChange={(e) => setIdCategoria(Number(e.target.value))}
          className="w-full mb-2 px-4 py-2 border rounded-lg bg-white text-gray-400"
        >
          <option value={1}>Contas fixas</option>
          <option value={2}>Alimentação</option>
          <option value={3}>Aluguel</option>
          <option value={4}>Conta Telefone</option>
          <option value={5}>Saúde</option>
          <option value={6}>Vestuário</option>
          <option value={7}>Lazer</option>
          <option value={8}>Transporte</option>
          <option value={9}>Mercado</option>
          <option value={10}>Eletrônicos</option>
          <option value={11}>Salão</option>
          {(categorias || []).map((cat) => (
    <option key={cat.idCategoria} value={cat.idCategoria}>
      {cat.categoria}
    </option>
  ))}
        </select>
              <button
                type="button"
                onClick={() => setShowCategoriaModal(true)}
                className="bg-green-500 hover:bg-green-600 text-white t font-bold py-1 px-3 rounded-full"
              >
                +
              </button>
            </div>

            <input
              type="date"
              name="data"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="w-full mb-3 px-4 py-2 border rounded-lg bg-white text-gray-400"
            />

            <select
              name="formaPagamento"
              value={formaPagamento}
              onChange={(e) => setFormaPagamento(e.target.value)}
              disabled={idParcela !== null}
              className="w-full mb-3 px-4 py-2 border rounded-lg bg-white text-gray-400"
            >
              <option value={"Débito"}>Débito</option>
              <option value={"Crédito"}>Crédito</option>
              <option value={"Dinheiro"}>Dinheiro</option>
              <option value={"Pix"}>Pix</option>
            </select>

            {formaPagamento === "Crédito" && (
              <input
                type="number"
                name="qtdParcelas"
                min="1"
                value={qtdParcelas}
                onChange={handleChange}
                disabled={idParcela !== null}
                className="w-full mb-3 px-4 py-2 border rounded-lg bg-white text-gray-900 placeholder-gray-400"
                placeholder="Quantidade de Parcelas"
              />
            )}

            <div className="flex justify-end space-x-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                type="button"
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

      {/* Cadastro de categoria */}
    
      {showCategoriaModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Nova Categoria</h3>

            <input
              type="text"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              placeholder="Nome da categoria"
              className="w-full mb-4 px-4 py-2 border rounded-lg"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowCategoriaModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddCategoria}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
