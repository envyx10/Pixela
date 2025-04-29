'use client';

import Link from "next/link"
import { useRouter } from "next/navigation"
import { mainNavLinks } from "@/data/links/navigation"
import { MdLogout } from "react-icons/md"
import { FiUser } from "react-icons/fi"
import { useAuthStore } from "@/store/auth.store"

export const Navbar = () => {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 mt-5" role="navigation">
      <div className="max-w-[83.333%] mx-auto flex items-center p-4 bg-dark-opacity backdrop-blur-sm rounded-[36px]">
        <h1 className="text-3xl font-bold font-outfit text-pixela-accent mx-10">Pixela</h1>
        
        <div className="flex-1 flex justify-center">
          <div className="flex space-x-8">
            {mainNavLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="font-pixela-outfit-sm text-pixela-light relative group"
                aria-label={link.label}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pixela-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mx-10 flex items-center space-x-4">
          <Link
            href="/profile"
            className="text-pixela-light/80 hover:text-pixela-accent transition-colors duration-300 p-2 rounded-full hover:bg-pixela-dark/30"
            aria-label="Perfil"
          >
            <FiUser className="h-6 w-6" />
          </Link>
          
          <button 
            onClick={handleLogout}
            className="text-pixela-light/80 hover:text-pixela-accent transition-colors duration-300 p-2 rounded-full hover:bg-pixela-dark/30"
            aria-label="Cerrar sesión"
          >
            <MdLogout className="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>
  )
}


 