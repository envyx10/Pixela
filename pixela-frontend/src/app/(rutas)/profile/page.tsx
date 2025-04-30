'use client';

import { useState } from 'react';
import { UserProfileCard } from '@/features/profile/components/UserProfileCard';
import { FiSettings, FiClock, FiList, FiStar } from 'react-icons/fi';

// Datos de ejemplo para desarrollo
const mockUser = {
  id: 1,
  name: 'Usuario de Prueba',
  surname: 'Apellido de Prueba',
  email: 'usuario@ejemplo.com',
  created_at: '2023-01-01'
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  
  return (
    <main className="pt-28 px-6 min-h-screen bg-gradient-to-b from-pixela-dark to-black">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-pixela-light mb-8 font-outfit">Mi Cuenta</h1>
        
        {/* Tabs de navegación */}
        <div className="flex flex-wrap gap-2 mb-8 text-[15px] font-['Outfit']">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-full transition-colors duration-300 ${
              activeTab === 'profile' 
                ? 'bg-[#ec1b69] text-white'
                : 'bg-[#181818] text-gray-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <FiSettings className="w-4 h-4" />
              <span>Perfil</span>
            </div>
          </button>
          
          <button 
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-full transition-colors duration-300 ${
              activeTab === 'history' 
                ? 'bg-[#ec1b69] text-white'
                : 'bg-[#181818] text-gray-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <FiClock className="w-4 h-4" />
              <span>Historial</span>
            </div>
          </button>
          
          <button 
            onClick={() => setActiveTab('watchlist')}
            className={`px-4 py-2 rounded-full transition-colors duration-300 ${
              activeTab === 'watchlist' 
                ? 'bg-[#ec1b69] text-white'
                : 'bg-[#181818] text-gray-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <FiList className="w-4 h-4" />
              <span>Lista de seguimiento</span>
            </div>
          </button>
          
          <button 
            onClick={() => setActiveTab('favorites')}
            className={`px-4 py-2 rounded-full transition-colors duration-300 ${
              activeTab === 'favorites' 
                ? 'bg-[#ec1b69] text-white'
                : 'bg-[#181818] text-gray-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <FiStar className="w-4 h-4" />
              <span>Favoritos</span>
            </div>
          </button>
        </div>
        
        {/* Contenido de las pestañas */}
        <div className="mt-6">
          {activeTab === 'profile' && (
            <UserProfileCard user={mockUser} />
          )}
          
          {activeTab === 'history' && (
            <div className="bg-pixela-dark-opacity backdrop-blur-lg rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-pixela-light mb-6 font-outfit">
                Historial de Visualización
              </h2>
              <p className="text-gray-400 text-center py-8">
                No hay elementos en tu historial de visualización.
              </p>
            </div>
          )}
          
          {activeTab === 'watchlist' && (
            <div className="bg-pixela-dark-opacity backdrop-blur-lg rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-pixela-light mb-6 font-outfit">
                Lista de Seguimiento
              </h2>
              <p className="text-gray-400 text-center py-8">
                No hay elementos en tu lista de seguimiento.
              </p>
            </div>
          )}
          
          {activeTab === 'favorites' && (
            <div className="bg-pixela-dark-opacity backdrop-blur-lg rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-pixela-light mb-6 font-outfit">
                Favoritos
              </h2>
              <p className="text-gray-400 text-center py-8">
                No hay elementos en tus favoritos.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 