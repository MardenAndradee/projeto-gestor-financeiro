"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function RedefinirSenha() {
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

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
          Authorization: `Bearer ${token}`,
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800">Redefinir Senha</h1>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nova senha</label>
          <input
            type="password"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            className={`text-sm text-black w-full px-4 py-2 border ${
              mensagem.includes("coincidem") || mensagem.includes("caracteres")
                ? "border-red-500"
                : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
            placeholder="Digite a nova senha"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar senha</label>
          <input
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            className={`text-sm text-black w-full px-4 py-2 border ${
              mensagem.includes("coincidem")
                ? "border-red-500"
                : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
            placeholder="Confirme a nova senha"
          />
        </div>

        {mensagem && (
          <p
            className={`text-center text-sm ${
              mensagem.includes("sucesso") ? "text-green-600" : "text-red-500"
            }`}
          >
            {mensagem}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 transition-colors duration-200 text-white font-semibold py-2.5 rounded-lg"
        >
          Redefinir Senha
        </button>
      </form>
    </div>
  );
}
