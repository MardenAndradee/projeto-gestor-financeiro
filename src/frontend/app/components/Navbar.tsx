"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import logoVerde from "../public/logo_verde.png";

export default function Navbar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`min-h-screen bg-white shadow-md border-r transition-all duration-300 ease-in-out ${
        collapsed ? "w-16" : "w-64"
      } flex flex-col`}
    >
      {/* Topo: Logo e botão de toggle */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        {!collapsed && (
          <Link href="/mainpage">
          <Image src={logoVerde} alt="Logo" width={300} height={40  } className="object-contain" />
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 text-gray-600 hover:text-green-600"
        >
          {collapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
      </div>

      {/* Itens de navegação */}
      <nav className="flex-1 px-2 py-4 space-y-2">
        <NavItem
          href="/mainpage"
          label="Visão Geral"
          icon="📊"
          active={pathname === "/mainpage"}
          collapsed={collapsed}
        />
        <NavItem
          href="/lancamentos"
          label="Lançamentos"
          icon="💰"
          active={pathname === "/lancamentos"}
          collapsed={collapsed}
        />
        <NavItem
          href="/ajuda"
          label="❓ Ajuda"
          active={pathname === "/ajuda"}
          collapsed={collapsed}
        />
        <NavItem
          href="/perfil"
          label="👤 Perfil"
          active={pathname === "/perfil"}
          collapsed={collapsed}
        />
      </nav>
    </aside>
  );
}

function NavItem({ href, label, icon, active, collapsed }) {
  return (
    <Link
      href={href}
      className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${
        active ? "bg-green-600 text-white" : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <span className="text-lg mr-2">{typeof icon === "string" ? icon : icon}</span>
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
    </Link>
  );
}
