"use client";
import { useState } from "react";



export function useCategorias() {
  const [categoria, setCategoria] = useState("");
  const [usuario, setUsuario] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [categorias, setCategorias] = useState<any[]>([]);

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


   // função pra lista as categorias
   const handleGetCategorias = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Usuário não autenticado");

      const idUsuario = await buscarUsuario();


      const response = await fetch(`http://localhost:8080/categoria?idUsuario=${idUsuario}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Erro ao buscar lançamentos");

      const data = await response.json();
      setCategorias(data); // Atualiza o estado com os categorias obtidos
    } catch (err) {
      console.error("Erro ao buscar Categorias:", err);
      setError("Erro ao buscar Categorias.");
    }
  };

  // FUNÇÃO PARA CADASTRAR categorias
  const handleCategorias = async () => {

    try {

        const token = localStorage.getItem("token");
        if (!token) throw new Error("Usuário não autenticado");

        const idUsuario = await buscarUsuario();


      const response = await fetch("http://localhost:8080/categoria", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          categoria,
          usuario: {idUsuario}
        }),
      });

      if (!response.ok) {
        throw new Error("Erro no cadastro");
      }

      const dataResponse = await response.json();
      setSuccess("Categoria cadastrada com sucesso!");
      alert("Categoria cadastrada com sucesso!");
    } catch (err) {
      setError("Erro ao realizar o cadastro");
      alert("ERRO ao realizar cadastro, useCategorias")
    }
  };

  // FUNÇÃO PARA deletar DESPESAS
  const handleDeleteCategorias = async (idCategoria: number) => {

    try {

        const token = localStorage.getItem("token");
        if (!token) throw new Error("Usuário não autenticado");


      const response = await fetch(`http://localhost:8080/categoria/${idCategoria}`, {
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



  return {
    categoria, setCategoria,
    usuario, setUsuario,
    error,
    success,
    handleCategorias,
    handleGetCategorias,
    handleDeleteCategorias,
    categorias,
  };
}
