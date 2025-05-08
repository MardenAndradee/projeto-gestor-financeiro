"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LogOut,
  Menu,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import logoVerde from "../public/logo_verde.png";

export default function Navbar({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  const navItems = [
    { href: "/mainpage", label: "Dashboard", icon: "📊" },
    { href: "/lancamentos", label: "Lançamentos", icon: "💰" },
    { href: "/ajuda", label: "Ajuda", icon: "❓" },
  ];

  const SidebarContent = () => (
    <>
      <nav className="flex-1 px-2 py-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => isMobile && setMobileOpen(false)}
            className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${
              pathname === item.href
                ? "bg-green-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="text-lg mr-2">{item.icon}</span>
            {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="border-t px-3 py-3">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 text-red-600 hover:text-red-800 text-sm font-medium"
        >
          <LogOut size={18} />
          {!collapsed && <span>Sair</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* ✅ Topbar com borda */}
      <header className="w-full fixed top-0 left-0 z-30 h-14 flex items-center justify-between px-4 bg-[#EDF3FB] border-b border-gray-300">
        {/* Botão de controle sidebar */}
        <button
          onClick={() => {
          if (isMobile) {
          setMobileOpen(true);
          } else {
          setCollapsed(!collapsed);
          }
        }}
  className="text-gray-700 hover:text-green-600"
>
  <Menu size={26} />
</button>


        {/* Logo central */}
        <div className="flex-grow text-center">
          <Image
            src={logoVerde}
            alt="Logo"
            width={100}
            height={40}
            className="mx-auto"
          />
        </div>

        {/* Ícone de perfil */}
        <button
          onClick={() => router.push("/perfil")}
          className="text-gray-700 hover:text-green-600"
        >
          <User size={24} />
        </button>
      </header>

      {/* ✅ Sidebar - Desktop com fundo igual à página */}
      <aside
        className={`hidden md:flex flex-col bg-[#ffffff] border-r transition-all duration-300 ease-in-out 
        ${collapsed ? "w-16" : "w-64"} h-screen fixed top-0 left-0 z-20 pt-14`}
      >
        
        <SidebarContent />
      </aside>

      {/* ✅ Sidebar - Mobile com mesmo fundo */}
      {isMobile && (
        <aside
          className={`fixed top-14 left-0 h-screen z-50 bg-[#EDF3FB] border-r transition-transform duration-300 ease-in-out 
            ${mobileOpen ? "translate-x-0" : "-translate-x-full"} w-64`}
        >
          <SidebarContent />
        </aside>
      )}
    </>
  );
}
