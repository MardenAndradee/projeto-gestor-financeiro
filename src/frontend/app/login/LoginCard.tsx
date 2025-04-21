import LoginForm from "./LoginForm";

export default function LoginCard() {
  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-md p-10">
      <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
        Sistema de Despesas
      </h1>
      <p className="text-center text-gray-500 mb-8">
        Faça login para acessar sua conta
      </p>
      <LoginForm />
    </div>
  );
}
