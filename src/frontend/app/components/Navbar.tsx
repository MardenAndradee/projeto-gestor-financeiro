"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, HelpCircle, User } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center px-8">
      {/* Logo / Nome do Sistema */}
      <div className="text-2xl font-bold text-gray-800">
        <Link href="/mainpage" className="hover:text-green-600 transition">
          Gerenciador de Despesas
        </Link>
      </div>

      {/* Links de Navegação */}
      <div className="flex space-x-8">
        <NavItem href="/mainpage" label="Visão Geral" active={pathname === "/mainpage"} />
        <NavItem href="/lancamentos" label="Lançamentos" active={pathname === "/lancamentos"} />
      </div>

      {/* Ícones à Direita */}
      <div className="flex items-center space-x-6">
        <IconButton icon={<Bell size={22} />} />
        <IconButton icon={<HelpCircle size={22} />} />
        <IconButton icon={<User size={22} />} />
      </div>
    </nav>
  );
}

/* Componente de Link de Navegação */
function NavItem({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`relative text-lg font-medium transition ${
        active ? "text-green-600" : "text-gray-700 hover:text-green-600"
      }`}
    >
      {label}
      {active && <div className="absolute bottom-0 left-0 w-full h-1 bg-green-600 rounded-full"></div>}
    </Link>
  );
}

/* Componente de Botão de Ícone */
function IconButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="p-2 rounded-full text-gray-600 hover:text-green-600 hover:bg-gray-100 transition">
      {icon}
    </button>
  );
}
