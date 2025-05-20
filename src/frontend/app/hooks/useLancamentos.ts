"use client";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function obterDataHoje() {
  const hoje = new Date();
  const dataHoje = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
  return dataHoje.toISOString().split("T")[0]; // retorna "YYYY-MM-DD"
}

export function useLancamentos() {
  const [idParcela, setIdParcela] = useState(Number);
  const [descricao, setdescricao] = useState("");
  const [valor, setValor] = useState("");
  const [total, setTotal] = useState(0);
  const [categoria, setCategoria] = useState("Contas Fixas");
  const [idCategoria, setIdCategoria] = useState(0);
  const [gastosPorCategoria, setGastosPorCategoria] = useState<any[]>([]);
  const [data, setData] = useState(obterDataHoje());
  const [formaPagamento, setFormaPagamento] = useState("Débito");
  const [qtdParcelas, setQtdParcelas] = useState(1);
  const [usuario, setUsuario] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [lancamentos, setLancamentos] = useState<any[]>([]);
  const router = useRouter();
  

  //função para pegar id do usuario
  async function buscarUsuario(){

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
    const getUsuario = await fetch(`http://localhost:8080/me`,{
    method: "GET",
    headers:{
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  if(!getUsuario.ok){9
    router.push("/login");
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

       const responseData = await response.json();

      if(!response.ok){
        throw new Error(responseData.message || "Erro ao filtrar")
      }
      
      setLancamentos(responseData); 
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao filtrar");
    }
  };

  // função pra listar uma despesa
   const handleGetOneLancamento = async (idParcela: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Usuário não autenticado");

      const idUsuario = await buscarUsuario();

      const response = await fetch(`http://localhost:8080/parcelas/${idParcela}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setLancamentos(data); 
      console.log("Resposta da API:", data);

      
      return data[0];

    }catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao filtrar");
    }
  };

  // FUNÇÃO PARA CADASTRAR DESPESAS
  const handleLancamento = async (): Promise<boolean> => {

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
        const errorData = await response.json();
        throw new Error(errorData.message || "Cadastro falhou");
      }

      const dataResponse = await response.json();
      setSuccess("Lançamento realizado com sucesso!");
      toast.success("Lançamento cadastrado com sucesso!");
      return true;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro inesperado")
      return false;
    }
  };

  // FUNÇÃO PARA deletar DESPESAS
  const handleDeleteLancamento = async (idParcela: number) => {

    try {

        const token = localStorage.getItem("token");
        if (!token) throw new Error("Usuário não autenticado");


      const response = await fetch(`http://localhost:8080/parcelas/${idParcela}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess("Lançamento excluído com sucesso!");
      alert("Lançamento excluído com sucesso!");
    } catch (err) {
      setError("Erro ao deletar");
      alert("ERRO ao deletar")
    }
  };

  // FUNÇÃO PARA EDITAR DESPESAS
  const handleEditLancamento = async (idParcela: number) => {

    try {


        const token = localStorage.getItem("token");
        if (!token) throw new Error("Usuário não autenticado");

        const idUsuario = await buscarUsuario();


      const response = await fetch(`http://localhost:8080/parcelas/${idParcela}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          idParcela,
          descricao,
          valor,
          categoria: idCategoria.toString(),
          dataParcela: data,
          formaPagamento
        }),
      });

      if (!response.ok) {
  const errorText = await response.text(); // captura o erro da API
  throw new Error(`Erro da API: ${response.status} - ${errorText}`);
}

      const dataResponse = await response.json();

      const parcela = Array.isArray(dataResponse) ? dataResponse[0] : dataResponse;

    // Atualizando os estados com os valores da parcela
    setIdParcela(parcela.idParcela);
    setdescricao(parcela.descricao || "");
    setValor(parcela.valor || "");
    setCategoria(parcela.categoria || "");
    setData(parcela.dataParcela || obterDataHoje());
    setFormaPagamento(parcela.formaPagamento || "Débito");

    setLancamentos([parcela]);

      setSuccess("Lançamento editado com sucesso!");
      alert("Lançamento editado com sucesso!");
    } catch (err) {
      setError("Erro ao realizar o cadastro");
    }
  };

  // função pra pegar valor total
   const handleGetValorTotal = async (dataInicio: string, dataFim: string ) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Usuário não autenticado");

      const idUsuario = await buscarUsuario();


      const dataInicial = dataInicio || "";
      const dataFinal = dataFim || "";


    const queryParams = new URLSearchParams({
      dataInicial,
      dataFinal,
      idUsuario,
    });

      const response = await fetch(`http://localhost:8080/parcelas/valortotal?${queryParams.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

       const valorTotal = await response.json();

    if (!response.ok) {
      throw new Error("Erro ao buscar valor total");
    }

    
      
      setTotal(valorTotal);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao filtrar");
    }
  };

  // função pra pegar valor total
   const handleGetValorTotalCategoria = async (dataInicio: string, dataFim: string ) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Usuário não autenticado");

      const idUsuario = await buscarUsuario();


      const dataInicial = dataInicio || "";
      const dataFinal = dataFim || "";


    const queryParams = new URLSearchParams({
      dataInicial,
      dataFinal,
      idUsuario,
    });

      const response = await fetch(`http://localhost:8080/parcelas/totalcategoria?${queryParams.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

       const responseData = await response.json();
       setGastosPorCategoria(responseData);

      if(!response.ok){
        throw new Error(responseData.message || "Erro ao filtrar")
      }
      
      setLancamentos(responseData); 
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao filtrar");
    }
  };


  return {
    idParcela, setIdParcela,
    descricao, setdescricao,
    valor, setValor,
    total, setTotal,
    categoria, setCategoria,
    idCategoria, setIdCategoria,
    gastosPorCategoria, setGastosPorCategoria,
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
    handleGetOneLancamento,
    handleGetValorTotal,
    handleGetValorTotalCategoria,
    lancamentos,
  };
}

