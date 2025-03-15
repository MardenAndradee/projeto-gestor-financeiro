"use client";
import { useState } from "react";

export function useAuth() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
        
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, senha }),
      });

      if (!response.ok) {
        throw new Error("Login falhou");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      alert("Login realizado com sucesso! Token: " + data.token);
    } catch (err) {
      setError("Usuário ou senha inválidos");
    }
  };

  return { login, setLogin, senha, setSenha, error, handleLogin };
}