"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import {
  Wallet,
  GraduationCap,
  Code,
  BarChart3,
  MessagesSquare,
  Users,
} from "lucide-react";
import dashboard from "../public/dashboard.jpeg";
import lancamentos from "../public/lancamentos.jpeg";
import cadastroDespesas from "../public/cadastroDespesas.jpeg";

export default function HelpPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState("");
  const [lightboxVisible, setLightboxVisible] = useState(false);

  const openLightbox = (src: string) => {
    setLightboxSrc(src);
    setLightboxVisible(true);
  };

  const closeLightbox = () => setLightboxVisible(false);

  useEffect(() => {
    document.querySelectorAll(".reveal").forEach((el, i) => {
      setTimeout(() => {
        el.classList.remove("opacity-0", "translate-y-4");
        el.classList.add("opacity-100", "translate-y-0");
      }, 200 * i);
    });
  }, []);

  return (
    <div className="min-h-screen bg-blue-50">
      <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main
        className={`p-4 sm:p-6 pt-24 transition-all duration-300 ${
          !collapsed ? "md:ml-64" : "md:ml-16"
        }`}
      >
        <div className="max-w-7xl mx-auto space-y-24">
          <section className="hero text-center text-white font-mono py-16 px-4 sm:px-6 bg-green-600 rounded-3xl shadow-lg reveal opacity-0 translate-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Controle suas finanças com facilidade
            </h1>
            <p className="text-base sm:text-lg max-w-xl mx-auto">
              Registre seus gastos, categorize suas despesas e mantenha o
              controle total do seu dinheiro com o FinUp!
            </p>
          </section>

          <section className="bg-white px-4 sm:px-8 py-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold font-mono text-center text-gray-800 mb-10">
              Sobre o FinUp
            </h2>
            <div className="font-mono grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: (
                    <Wallet
                      size={44}
                      className="text-green-600 flex-shrink-0"
                    />
                  ),
                  text: (
                    <>
                      O <strong>FinUp</strong> é uma solução desenvolvida para
                      facilitar o controle financeiro de forma prática,
                      intuitiva e acessível.
                    </>
                  ),
                },
                {
                  icon: (
                    <GraduationCap
                      size={44}
                      className="text-green-600 flex-shrink-0"
                    />
                  ),
                  text: (
                    <>
                      Projeto criado por estudantes do 5º período do curso de
                      Ciência da Computação, aplicando conhecimentos práticos.
                    </>
                  ),
                },
                {
                  icon: (
                    <Code size={44} className="text-green-600 flex-shrink-0" />
                  ),
                  text: (
                    <>
                      Utilizamos Java com Spring Boot, TypeScript, React e
                      TailwindCss, garantindo uma aplicação robusta e segura.
                    </>
                  ),
                },
                {
                  icon: (
                    <BarChart3
                      size={44}
                      className="text-green-600 flex-shrink-0"
                    />
                  ),
                  text: (
                    <>
                      Proporcionar mais clareza e autonomia na organização das
                      finanças pessoais.
                    </>
                  ),
                },
                {
                  icon: (
                    <MessagesSquare
                      size={44}
                      className="text-green-600 flex-shrink-0"
                    />
                  ),
                  text: (
                    <>
                      Estamos em constante evolução com base em feedbacks e
                      inovações tecnológicas.
                    </>
                  ),
                },
                {
                  icon: (
                    <Users size={44} className="text-green-600 flex-shrink-0" />
                  ),
                  text: (
                    <>
                      Nosso grupo é formado por Marden, Otávio, Felipe e Carlos.
                    </>
                  ),
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition text-justify flex gap-4"
                >
                  {item.icon}
                  <p className="text-gray-700">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center gap-10 mt-10 items-center">
            {[
              { src: dashboard, title: "Dashboard" },
              { src: lancamentos, title: "Tela de Lançamentos" },
              { src: cadastroDespesas, title: "Cadastro de Despesas" },
            ].map(({ src, title }, i) => (
              <div key={i} className="w-full max-w-xs text-center">
                <Image
                  src={src}
                  alt={title}
                  onClick={() => openLightbox(src.src)}
                  className="rounded-lg shadow-md cursor-pointer hover:scale-105 transition w-full"
                />
                <h3 className="mt-2 text-gray-800 font-semibold">{title}</h3>
              </div>
            ))}
          </div>
        </div>

        {lightboxVisible && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={closeLightbox}
          >
            <div
              className="bg-white p-4 rounded-xl max-w-4xl max-h-[80vh] shadow-lg relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeLightbox}
                className="absolute top-2 right-2 text-black text-2xl font-bold"
              >
                ×
              </button>
              <img
                src={lightboxSrc}
                alt="Zoom"
                className="max-w-full max-h-[70vh] rounded-lg"
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
