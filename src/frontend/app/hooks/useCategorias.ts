"use client";
import { useState } from "react";
import { toast } from "react-toastify";



export function useCategorias() {
  const [idCategoria, setIdCategoria] = useState('');
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

  // função pra pegar uma categoria
   const handleGetCategoriaById = async (idCategoria: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Usuário não autenticado");

      const idUsuario = await buscarUsuario();


      const response = await fetch(`http://localhost:8080/categoria/${idCategoria}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setCategorias(data); // Atualiza o estado com os categorias obtidos
      return data[0];

    } catch (err) {
      console.error("Erro ao buscar Categorias:", err);
      setError("Erro ao buscar Categorias.");
    }
  };

  // FUNÇÃO PARA CADASTRAR categorias
  const handleCategorias = async () => {

    try {

        const token = localStorage.getItem("token");

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
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao cadastrar")
      }

      const dataResponse = await response.json();
      setSuccess("Categoria cadastrada com sucesso!");
      toast.success("Categoria cadastrada com sucesso!");
      return true;
      
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao cadastrar categoria")
      return false;
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
    idCategoria, setIdCategoria,
    categoria, setCategoria,
    usuario, setUsuario,
    error,
    success,
    handleCategorias,
    handleGetCategorias,
    handleDeleteCategorias,
    handleGetCategoriaById,
    categorias,
  };
}
