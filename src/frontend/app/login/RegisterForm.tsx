"use client";
import { useState } from "react";

export default function RegisterForm() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Cadastrar:", login, senha, confirmar);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700">Login</label>
        <input
          type="text"
          className="mt-1 w-full px-4 py-2 border rounded-lg text-black"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Digite seu login"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Senha</label>
        <input
          type="password"
          className="mt-1 w-full px-4 py-2 border rounded-lg text-black"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Digite sua senha"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Confirmar senha
        </label>
        <input
          type="password"
          className="mt-1 w-full px-4 py-2 border rounded-lg text-black"
          value={confirmar}
          onChange={(e) => setConfirmar(e.target.value)}
          placeholder="Confirme sua senha"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition duration-300"
      >
        Cadastrar
      </button>
    </form>
  );
}
