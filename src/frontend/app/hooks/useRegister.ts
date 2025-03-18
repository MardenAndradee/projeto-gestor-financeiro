"use client";
import { useState } from "react";

export function useRegister() {
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    if (senha !== confirmarSenha) {
      setError("As senhas não coincidem");
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
          numero,
          email,
          login,
          senha,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro no cadastro");
      }

      const data = await response.json();
      setSuccess("Cadastro realizado com sucesso!");
      alert("Usuário cadastrado com sucesso!");
    } catch (err) {
      setError("Erro ao realizar o cadastro");
    }
  };

  return {
    nome, setNome,
    numero, setNumero,
    email, setEmail,
    login, setLogin,
    senha, setSenha,
    confirmarSenha, setConfirmarSenha,
    error,
    success,
    handleRegister,
  };
}
