"use client";
import { useAuth } from "../hooks/useAuth";

export default function LoginForm() {
  const { login, setLogin, senha, setSenha, error, handleLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    await handleLogin(); 
  };

    return (
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Login</label>
          <input
            type="text"
            className="text-black mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
            placeholder="Digite seu login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700">Senha</label>
          <input
            type="password"
            className="text-black mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
  
        <div className="flex justify-between items-center text-sm">
          <a href="#" className="text-green-600 hover:underline">
            Esqueceu a senha?
          </a>
        </div>
  
        <button onClick={handleLogin}
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition"
        >
          Entrar
        </button>
      </form>
    );
  }
  