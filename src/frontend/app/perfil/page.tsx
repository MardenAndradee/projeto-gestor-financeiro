"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Camera, Crown } from "lucide-react";
import { toast } from "react-toastify";
import perfilPlano from "../public/plano.jpg";
import Image from "next/image";

export default function PerfilPage() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    celular: "",
    senha: "",
    foto: null as File | null,
    fotoPreview: "" as string | ArrayBuffer | null,
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token JWT não encontrado");
      return;
    }

    fetch("http://localhost:8080/usuario/perfil", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Erro ao buscar perfil");
        const data = await res.json();

        setFormData((prev) => ({
          ...prev,
          nome: data.nome || "",
          email: data.email || "",
          celular: data.celular || "",
          senha: data.senha || "",
        }));
      })
      .catch((err) => {
        console.error("Erro ao carregar perfil:", err);
        alert("Erro ao carregar perfil");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          foto: file,
          fotoPreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token não encontrado. Faça login novamente.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/usuario/perfil", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          celular: formData.celular,
          senha: formData.senha,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao atualizar perfil");
      }
      const data = await response.json();
      toast.success(data.mensagem);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha ao atualizar dados");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#EDF3FB]">
      <Navbar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

      {/* Conteúdo principal */}
      <main className="flex-1 p-4 md:p-6 lg:p-8 w-full overflow-auto">

        <div className="max-w-4xl mx-auto p-4 space-y-6">
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Foto de perfil */}
            <div className="relative w-28 h-28 md:w-32 md:h-32 shrink-0">
              <div className="rounded-full overflow-hidden border-4 border-green-100 shadow w-full h-full bg-gray-100">
                {formData.fotoPreview ? (
                  <img
                    src={formData.fotoPreview.toString()}
                    alt="Foto de perfil"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-3xl font-light">
                    ?
                  </div>
                )}
              </div>
              <label className="absolute bottom-2 right-2 bg-green-600 p-2 rounded-full cursor-pointer hover:bg-green-700 shadow">
                <Camera className="text-white w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Dados da conta */}
            <div className="flex-1 w-full">
              <h2 className="text-2xl font-mono text-gray-900 mb-6">Dados da Conta</h2>
              {loading ? (
                <p className="text-gray-500">Carregando dados do perfil...</p>
              ) : (
                <div className="space-y-6">
                  {["nome", "email", "celular", "senha"].map((campo) => (
                    <div key={campo} className="relative">
                      <label className="text-sm font-medium text-gray-700 absolute -top-3 left-3 bg-white px-1 capitalize">
                        {campo === "senha" ? "Nova Senha" : campo}
                      </label>
                      <input
                        type={campo === "senha" ? "password" : "text"}
                        name={campo}
                        value={formData[campo]}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 pt-4 pb-2 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder={campo}
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-end mt-6">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-green-600 text-white text-sm font-medium px-6 py-2 rounded-full hover:bg-green-700 shadow"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>

          {/* Plano do usuário */}
          <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
            <h2 className="text-2xl font-mono text-gray-900 mb-6">Seu plano</h2>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <Crown className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">FinUp</p>
                  <p className="text-xl font-bold text-gray-700 mb-2">Free</p>
                  <p className="text-sm text-gray-500 mb-4">
                    Atinja suas <span className="font-semibold">metas financeiras</span> com o FinUp Premium!
                  </p>
                  <button className="bg-green-600 text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-green-700 shadow">
                    EM BREVE
                  </button>
                </div>
              </div>
              <div className="hidden md:block">
                <Image src={perfilPlano} alt="Plano Imagem" width={300} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
