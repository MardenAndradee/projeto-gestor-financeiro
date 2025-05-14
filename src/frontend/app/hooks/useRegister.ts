"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";

export function useRegister() {
  const [nome, setNome] = useState("");
  const [celular, setNumero] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    if (senha !== confirmarSenha) {
      setError("As senhas não coincidem");
      setSenha("");
      setConfirmarSenha("");
      toast.error("Senhas não coincidem")
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          celular,
          email,
          login,
          senha,
        }),
      });

      let data;
    try {
      data = await response.json(); 
    } catch {
      data = null; 
    }

    if (!response.ok) {
      const errorMessage = data?.message || "Erro no cadastro";
      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }

      
      setSuccess("Cadastro realizado com sucesso!");
      toast.success("Usuário cadastrado com sucesso!");

      setNome("");
      setNumero("");
      setEmail("");
      setLogin("");
      setSenha("");
      setConfirmarSenha("");

      router.push("/login");

    } catch (err) {
      setError( error || "Erro ao realizar o cadastro");
      toast.error(error || "Erro ao realizar cadastro");
    }
  };

  return {
    nome, setNome,
    celular, setNumero,
    email, setEmail,
    login, setLogin,
    senha, setSenha,
    confirmarSenha, setConfirmarSenha,
    error,
    success,
    handleRegister,
  };
}
