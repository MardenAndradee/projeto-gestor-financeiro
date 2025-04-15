"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, HelpCircle, Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center px-6 rounded-lg relative">
        <Link href="/mainpage">
          <Image 
            src="/logo.png" 
            alt="Gerenciador" 
            width={120}
            height={40}
            className="object-contain"
          />
        </Link>

        <div className="hidden md:flex space-x-6">
          <NavItem href="/mainpage" label="Visão Geral" active={pathname === "/mainpage"} />
          <NavItem href="/lancamentos" label="Lançamentos" active={pathname === "/lancamentos"} />
        </div>

        <div className="hidden md:flex items-center space-x-4 relative">
          <IconButton icon={<Bell size={22} />} />
          <IconButton icon={<HelpCircle size={22} />} />

          {/* Foto de perfil e dropdown */}
          <div className="relative">
            <button onClick={() => setProfileOpen(!profileOpen)} className="focus:outline-none">
              <Image 
                src="/perfil.jpg" // Certifique-se de que esta imagem está na pasta public/
                alt="Perfil"
                width={36}
                height={36}
                className="rounded-full border hover:scale-105 transition-all"
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-md z-50">
                <Link href="/perfil" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Meu Perfil</Link>
              </div>
            )}
          </div>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-gray-600">
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Menu Lateral */}
      <div className={`fixed top-0 left-0 h-full w-60 bg-white shadow-lg transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} transition-all duration-300 z-50`}>
        <div className="p-4 flex justify-between items-center border-b">
          <span className="text-lg font-semibold text-gray-800">Menu</span>
          <button onClick={() => setMenuOpen(false)} className="p-2 text-gray-600">
            <X size={26} />
          </button>
        </div>
        <div className="flex flex-col p-4 space-y-4">
          <NavItem href="/mainpage" label="Visão Geral" active={pathname === "/mainpage"} />
          <NavItem href="/lancamentos" label="Lançamentos" active={pathname === "/lancamentos"} />
        </div>
      </div>
    </>
  );
}

function NavItem({ href, label, active }) {
  return (
    <Link href={href} className={`block text-base font-medium px-4 py-2 rounded-lg transition-all duration-300 ${active ? "text-white bg-green-600" : "text-gray-700 hover:text-green-600 hover:bg-gray-100"}`}>
      {label}
    </Link>
  );
}

function IconButton({ icon }) {
  return (
    <button className="p-2 text-gray-600 hover:text-green-600">
      {icon}
    </button>
  );
}
