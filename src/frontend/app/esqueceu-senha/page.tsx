"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EsqueceuSenha() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // necessário para evitar recarregamento da página

    if (!email.includes("@")) {
      setError("Digite um e-mail válido.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/auth/redefinir-senha",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao enviar o e-mail.");
      }

      setError("");
      setSuccess(true);

      // Redireciona após um pequeno delay
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      setError("Erro ao processar solicitação. Verifique o servidor.");
    }
  };

  return (
    <form
      className="space-y-5 max-w-md mx-auto mt-24 px-4"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-bold text-center">Esqueceu sua senha?</h1>
      <p className="text-center text-sm text-gray-600">
        Informe seu e-mail e enviaremos instruções para redefinir sua senha.
      </p>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          E-mail
        </label>
        <input
          type="email"
          className="text-black mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-600 focus:border-green-600"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition duration-300"
      >
        Enviar link
      </button>

      {success && (
        <p className="text-green-600 text-center text-sm font-medium">
          Link de redefinição enviado com sucesso!
        </p>
      )}
    </form>
  );
}
