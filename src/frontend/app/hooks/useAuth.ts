"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

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
      //alert("Login realizado com sucesso! Token: " + data.token);

      router.push("/lancamentos");

    } catch (err) {
      setError("Usuário ou senha inválidos");
    }
  };

  return { login, setLogin, senha, setSenha, error, handleLogin };
}