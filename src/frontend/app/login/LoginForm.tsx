"use client";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const { login, setLogin, senha, setSenha, error, handleLogin } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleLogin();
  };

  const handleForgotPasswordClick = () => {
    router.push("/esqueceu-senha"); // redireciona para a página
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700">Login</label>
        <input
          type="text"
          className="text-black mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-600 focus:border-green-600"
          placeholder="Digite seu login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Senha</label>
        <input
          type="password"
          className="text-black mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-600 focus:border-green-600"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition duration-300"
      >
        Entrar
      </button>

      <div className="flex justify-center text-sm">
        <button
          type="button"
          onClick={handleForgotPasswordClick}
          className="text-green-600 hover:underline"
        >
          Esqueceu a senha?
        </button>
      </div>
    </form>
  );
}
