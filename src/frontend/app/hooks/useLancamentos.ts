"use client";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";



export function useLancamentos() {
  const [descricao, setdescricao] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [data, setData] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");
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
   const handleGetLancamentos = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Usuário não autenticado");

      const idUsuario = await buscarUsuario();


      const response = await fetch(`http://localhost:8080/parcelas/filtrar?mes=4&idUsuario=${idUsuario}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Erro ao buscar lançamentos");

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
          categoria: {idCategoria: 1},
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
    data, setData,
    formaPagamento, setFormaPagamento,
    qtdParcelas, setQtdParcelas,
    usuario, setUsuario,
    error,
    success,
    handleLancamento,
    handleGetLancamentos,
    lancamentos,
  };
}
