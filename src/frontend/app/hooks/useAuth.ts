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
        // Se a resposta não for OK, tenta extrair a mensagem de erro do JSON
        const errorData = await response.json(); // Extrai o corpo da resposta
        throw new Error(errorData.message || "Login falhou");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      router.push("/lancamentos");

    } catch (err) {
      // Verifica se o erro tem uma mensagem e a define no estado
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    }
  };

  return { login, setLogin, senha, setSenha, error, handleLogin };
}