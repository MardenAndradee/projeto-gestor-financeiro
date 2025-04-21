"use client";
import { useState } from "react";
import LoginForm from "./LoginForm";
import CadastroForm from "./CadastroForm";

export default function AuthCard() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="w-full max-w-md flex flex-col items-center justify-center">

      {/* ENTRAR / CADASTRAR */}
      <div className="flex justify-center items-center mb-6">
        <div className="flex space-x-10 w-full justify-center border-b border-gray-200">
          <button
            onClick={() => setIsLogin(true)}
            className={`pb-2 text-lg font-semibold border-b-2 ${
              isLogin
                ? "text-green-600 border-green-600"
                : "text-gray-500 border-transparent hover:text-green-600"
            } w-32 text-center`}
          >
            ENTRAR
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`pb-2 text-lg font-semibold border-b-2 ${
              !isLogin
                ? "text-green-600 border-green-600"
                : "text-gray-500 border-transparent hover:text-green-600"
            } w-32 text-center`}
          >
            CADASTRAR
          </button>
        </div>
      </div>

      {/* Área com rolagem se necessário */}
      <div className="overflow-y-auto px-2 w-full">
        {isLogin ? <LoginForm /> : <CadastroForm />}
        
      </div>
    </div>
  );
}
