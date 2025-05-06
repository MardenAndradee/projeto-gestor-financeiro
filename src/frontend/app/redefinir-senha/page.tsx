"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function RedefinirSenha() {
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // token JWT vindo do link

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setMensagem("Token inválido ou ausente na URL.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setMensagem("As senhas não coincidem.");
      return;
    }

    if (novaSenha.length < 6) {
      setMensagem("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/redefinir-senha", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Envia o token no header
        },
        body: JSON.stringify({ novaSenha }),
      });

      if (response.ok) {
        setMensagem("Senha redefinida com sucesso!");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        const data = await response.text();
        setMensagem(`Erro: ${data}`);
      }
    } catch (error) {
      setMensagem("Erro de rede ao tentar redefinir a senha.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-md mx-auto mt-24 px-4">
      <h1 className="text-2xl font-bold text-center">Redefinir Senha</h1>

      <div>
        <label className="block text-sm font-medium text-gray-700">Nova senha</label>
        <input
          type="password"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          className="text-black mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
          placeholder="Digite a nova senha"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Confirmar senha</label>
        <input
          type="password"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          className="text-black mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
          placeholder="Confirme a nova senha"
        />
      </div>

      {mensagem && <p className="text-center text-sm text-red-500">{mensagem}</p>}

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg"
      >
        Redefinir Senha
      </button>
    </form>
  );
}

