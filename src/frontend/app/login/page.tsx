import AuthCard from "./AuthCard";
import Image from "next/image";
import loginImage from "../public/img_login.png";

export default function LoginPage() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen items-center justify-center px-4 lg:gap-x-20"style={{ backgroundColor: "#EDF3FB" }}>


      {/* Lado esquerdo - SOMENTE EM TELAS GRANDES */}
      <div className="hidden lg:flex flex-col items-center justify-center text-center px-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Organize suas finanças com<br></br> facilidade.
        </h2>
        <Image
          src={loginImage}
          alt="Login Illustration"
          width={300}
          height={300}
          className="mb-4"
        />
        <p className="text-gray-500 text-sm max-w-xs">
          Um sistema simples e completo para controlar seus gastos do dia a dia.
        </p>
      </div>

      {/* Lado direito - formulário */}
      <div className="w-full max-w-md flex justify-center">
        <AuthCard />
      </div>
    </div>
  );
}
