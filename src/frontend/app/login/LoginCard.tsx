import LoginForm from "./LoginForm";

export default function LoginCard() {
  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Faça seu Login
      </h2>
      <LoginForm />
    </div>
  );
}