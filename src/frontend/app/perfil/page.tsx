"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Camera } from "lucide-react";
import {toast} from "react-toastify";

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

  // Buscar dados do perfil do usuário ao carregar a página
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
        }),
      });



      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao atualizar perfil");
      }
      const data = await response.json();
      toast.success(data.mensagem);

    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha ao atualizar dados")
    }
  };

  return (
    <div className="bg-green-100 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Foto de perfil */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0">
            <div className="rounded-full overflow-hidden border-4 border-green-100 shadow w-full h-full bg-gray-100">
              {formData.fotoPreview ? (
                <img
                  src={formData.fotoPreview.toString()}
                  alt="Foto de perfil"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-5xl font-light">
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

          {/* Formulário */}
          <div className="flex-1 w-full">
            <h2 className="text-xl font-semibold text-green-700 mb-4">Perfil</h2>
            {loading ? (
              <p className="text-gray-500">Carregando dados do perfil...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Nome"
                  className="px-4 py-2 border rounded-lg bg-white text-gray-900 placeholder-gray-400 w-full"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="E-mail"
                  className="px-4 py-2 border rounded-lg bg-white text-gray-900 placeholder-gray-400 w-full"
                />
                <input
                  type="tel"
                  name="celular"
                  value={formData.celular}
                  onChange={handleChange}
                  placeholder="Celular"
                  className="px-4 py-2 border rounded-lg bg-white text-gray-900 placeholder-gray-400 w-full"
                />
                <input
                  type="password"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  placeholder="Nova senha"
                  className="px-4 py-2 border rounded-lg bg-white text-gray-900 placeholder-gray-400 w-full"
                  disabled // desativado por enquanto
                />
              </div>
            )}

            <div className="flex justify-end mt-6">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

