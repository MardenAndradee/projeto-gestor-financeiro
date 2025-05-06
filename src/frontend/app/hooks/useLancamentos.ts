"use client";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";

function obterDataHoje() {
  const hoje = new Date();
  const dataHoje = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
  return dataHoje.toISOString().split("T")[0]; // retorna "YYYY-MM-DD"
}

export function useLancamentos() {
  const [descricao, setdescricao] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("Contas Fixas");
  const [idCategoria, setIdCategoria] = useState("1");
  const [data, setData] = useState(obterDataHoje());
  const [formaPagamento, setFormaPagamento] = useState("Débito");
  const [qtdParcelas, setQtdParcelas] = useState(1);
  const [usuario, setUsuario] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [lancamentos, setLancamentos] = useState<any[]>([]);

  //função para pegar id do usuario
  async function buscarUsuario(){

    const token = localStorage.getItem("token");
      if (!token) throw new Error("Usuário não autenticado");

    const getUsuario = await fetch(`http://localhost:8080/me`,{
    method: "GET",
    headers:{
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  if(!getUsuario.ok){
    alert("ERRO BUSCAR USUARIO");
    throw new Error("ERRO AO BUSCAR USUÁRIO");
}
  const usuario = await getUsuario.json();
  const idUsuario = usuario.idUsuario
  return idUsuario;

}


   // função pra lista as despesa
   const handleGetLancamentos = async (filtros?: { dataInicio: string; dataFim: string; categoria: string }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Usuário não autenticado");

      const idUsuario = await buscarUsuario();

      const dataInicial = filtros?.dataInicio || "";
    const dataFinal = filtros?.dataFim || "";
    const categoriaId = filtros?.categoria || "";

    const queryParams = new URLSearchParams({
      dataInicial,
      dataFinal,
      idUsuario,
      categoriaId
    });


      const response = await fetch(`http://localhost:8080/parcelas/filtrar?${queryParams.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setLancamentos(data); // Atualiza o estado com os lançamentos obtidos
    } catch (err) {
      console.error("Erro ao buscar lançamentos:", err);
      setError("Erro ao buscar lançamentos.");
    }
  };

  // FUNÇÃO PARA CADASTRAR DESPESAS
  const handleLancamento = async () => {

    try {

        const token = localStorage.getItem("token");
        if (!token) throw new Error("Usuário não autenticado");

        const idUsuario = await buscarUsuario();


      const response = await fetch("http://localhost:8080/despesa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          descricao,
          valor,
          categoria: {idCategoria},
          data,
          formaPagamento,
          qtdParcelas,
          usuario: {idUsuario}
        }),
      });

      if (!response.ok) {
        throw new Error("Erro no cadastro");
      }

      const dataResponse = await response.json();
      setSuccess("Lançamento realizado com sucesso!");
      alert("Lançamento cadastrado com sucesso!");
    } catch (err) {
      setError("Erro ao realizar o cadastro");
      alert("ERRO")
    }
  };

  // FUNÇÃO PARA deletar DESPESAS
  const handleDeleteLancamento = async (idParcela: number) => {

    try {

        const token = localStorage.getItem("token");
        if (!token) throw new Error("Usuário não autenticado");


      const response = await fetch(`http://localhost:8080/despesa/${idParcela}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro no cadastro");
      }

      const dataResponse = await response.json();
      setSuccess("Lançamento excluído com sucesso!");
      alert("Lançamento excluído com sucesso!");
    } catch (err) {
      setError("Erro ao realizar o cadastro");
      alert("ERRO")
    }
  };

  // FUNÇÃO PARA EDITAR DESPESAS
  const handleEditLancamento = async (idParcela: number) => {

    try {

        const token = localStorage.getItem("token");
        if (!token) throw new Error("Usuário não autenticado");

        const idUsuario = await buscarUsuario();


      const response = await fetch(`http://localhost:8080/despesa/${idParcela}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          descricao,
          valor,
          categoria: {idCategoria},
          data,
          formaPagamento,
          qtdParcelas,
          usuario: {idUsuario}
        }),
      });

      if (!response.ok) {
        throw new Error("Erro no cadastro");
      }

      const dataResponse = await response.json();
      setSuccess("Lançamento realizado com sucesso!");
      alert("Lançamento cadastrado com sucesso!");
    } catch (err) {
      setError("Erro ao realizar o cadastro");
      alert("ERRO")
    }
  };


  return {
    descricao, setdescricao,
    valor, setValor,
    categoria, setCategoria,
    idCategoria, setIdCategoria,
    data, setData,
    formaPagamento, setFormaPagamento,
    qtdParcelas, setQtdParcelas,
    usuario, setUsuario,
    error,
    success,
    handleLancamento,
    handleGetLancamentos,
    handleDeleteLancamento,
    handleEditLancamento,
    lancamentos,
  };
}
