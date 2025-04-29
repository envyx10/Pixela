'use client';

import { useState, useRef } from 'react';
import { FiMail, FiUser, FiCalendar, FiShield, FiEdit, FiCamera, FiLock, FiUsers } from 'react-icons/fi';
import { IoKeyOutline } from 'react-icons/io5';

interface User {
  id: number;
  name: string;
  email: string;
  created_at?: string;
  is_admin?: boolean;
  profile_image?: string;
}

interface UserProfileCardProps {
  user: User;
}

export const UserProfileCard = ({ user }: UserProfileCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });
  const [profileImage, setProfileImage] = useState<string | undefined>(user.profile_image);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Formatear la fecha de registro si está disponible
  const formatDate = (date?: string) => {
    if (!date) return 'No disponible';
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos actualizados:', { ...formData, profileImage });
    setIsEditing(false);
    // Aquí iría la lógica para actualizar el perfil en el backend
  };

  return (
    <>
      {!isEditing ? (
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Columna de avatar */}
            <div className="flex flex-col items-center text-center pt-4">
              <div className="w-[120px] h-[120px] rounded-full bg-[#830e3a] flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FiUser className="w-16 h-16 text-white" />
                )}
              </div>
              <h3 className="text-2xl font-bold text-white mt-4 font-outfit">{user.name}</h3>
              <p className="text-gray-400 mt-1 font-outfit">{user.is_admin ? 'Administrador' : 'Usuario'}</p>
            </div>

            {/* Columna de información */}
            <div className="lg:col-span-2">
              <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-white font-outfit">
                    Detalles de la cuenta
                  </h2>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 bg-[#ec1b69] text-white py-2 px-6 rounded-full hover:bg-[#ec1b69]/80 transition-colors duration-300"
                  >
                    <FiEdit className="w-5 h-5" />
                    <span className="font-outfit">Editar</span>
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="border-b border-gray-700 pb-5">
                    <p className="text-sm text-gray-400 mb-2 font-outfit">Nombre de usuario</p>
                    <div className="flex items-center gap-3">
                      <FiUser className="w-5 h-5 text-[#ec1b69]" />
                      <p className="text-white text-lg font-outfit">{user.name}</p>
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-700 pb-5">
                    <p className="text-sm text-gray-400 mb-2 font-outfit">Correo electrónico</p>
                    <div className="flex items-center gap-3">
                      <FiMail className="w-5 h-5 text-[#ec1b69]" />
                      <p className="text-white text-lg font-outfit">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-700 pb-5">
                    <p className="text-sm text-gray-400 mb-2 font-outfit">Fecha de registro</p>
                    <div className="flex items-center gap-3">
                      <FiCalendar className="w-5 h-5 text-[#ec1b69]" />
                      <p className="text-white text-lg font-outfit">{formatDate(user.created_at)}</p>
                    </div>
                  </div>
                  
                  {user.is_admin !== undefined && (
                    <div>
                      <p className="text-sm text-gray-400 mb-2 font-outfit">Tipo de cuenta</p>
                      <div className="flex items-center gap-3">
                        <FiShield className="w-5 h-5 text-[#ec1b69]" />
                        <p className="text-white text-lg font-outfit">{user.is_admin ? 'Administrador' : 'Usuario'}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Formulario de edición en estilo modal
        <div className="max-w-xl mx-auto bg-black/20 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pixela-dark/30">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white font-outfit">
              Editar Perfil
            </h2>
            <button
              onClick={() => setIsEditing(false)}
              className="text-gray-400 hover:text-[#ec1b69] transition-colors duration-300"
              aria-label="Cerrar"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sección de Avatar */}
            <div className="flex flex-col items-center mb-8">
              <p className="text-sm text-gray-400 mb-3 font-outfit">Foto de Perfil</p>
              <div className="relative group" onClick={handleAvatarClick}>
                <div className="w-24 h-24 rounded-full bg-[#830e3a] flex items-center justify-center overflow-hidden cursor-pointer ring-2 ring-[#ec1b69]/20">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Foto de perfil"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl text-white font-bold">
                      {formData.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full">
                  <button
                    type="button"
                    className="bg-[#ec1b69] text-white text-sm py-1 px-4 rounded-full hover:bg-[#ec1b69]/80 transition-colors duration-300"
                  >
                    Subir
                  </button>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {/* Campos del formulario */}
            <div className="space-y-4">
              <div className="relative group overflow-hidden">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
                  <FiUser className="w-5 h-5 text-[#ec1b69]" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nombre"
                  className="w-full border border-transparent bg-[#181818] hover:border-gray-500 focus:border-gray-500 hover:border-opacity-70 focus:border-opacity-90 rounded-[49px] transition-all duration-200 ease-out outline-none focus:outline-none focus:ring-0 px-6 pl-12 h-12 placeholder-gray-500/50 placeholder-shown:text-[16px] focus:placeholder-gray-500/30 text-white/90 font-outfit"
                  required
                />
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent translate-y-full opacity-0 group-hover:opacity-80 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-300 ease-out"></div>
              </div>

              <div className="relative group overflow-hidden">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
                  <FiUsers className="w-5 h-5 text-[#ec1b69]" />
                </div>
                <input
                  type="text"
                  name="lastname"
                  placeholder="Apellidos"
                  className="w-full border border-transparent bg-[#181818] hover:border-gray-500 focus:border-gray-500 hover:border-opacity-70 focus:border-opacity-90 rounded-[49px] transition-all duration-200 ease-out outline-none focus:outline-none focus:ring-0 px-6 pl-12 h-12 placeholder-gray-500/50 placeholder-shown:text-[16px] focus:placeholder-gray-500/30 text-white/90 font-outfit"
                />
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent translate-y-full opacity-0 group-hover:opacity-80 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-300 ease-out"></div>
              </div>

              <div className="relative group overflow-hidden">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
                  <FiMail className="w-5 h-5 text-[#ec1b69]" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full border border-transparent bg-[#181818] hover:border-gray-500 focus:border-gray-500 hover:border-opacity-70 focus:border-opacity-90 rounded-[49px] transition-all duration-200 ease-out outline-none focus:outline-none focus:ring-0 px-6 pl-12 h-12 placeholder-gray-500/50 placeholder-shown:text-[16px] focus:placeholder-gray-500/30 text-white/90 font-outfit"
                  required
                />
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent translate-y-full opacity-0 group-hover:opacity-80 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-300 ease-out"></div>
              </div>

              <div>
                <div className="relative group overflow-hidden">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
                    <IoKeyOutline className="w-5 h-5 text-[#ec1b69]" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="w-full border border-transparent bg-[#181818] hover:border-gray-500 focus:border-gray-500 hover:border-opacity-70 focus:border-opacity-90 rounded-[49px] transition-all duration-200 ease-out outline-none focus:outline-none focus:ring-0 px-6 pl-12 h-12 placeholder-gray-500/50 placeholder-shown:text-[16px] focus:placeholder-gray-500/30 text-white/90 font-outfit"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent translate-y-full opacity-0 group-hover:opacity-80 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-300 ease-out"></div>
                </div>
                <p className="mt-1 text-xs text-gray-500 font-outfit">Dejar en blanco para mantener la actual</p>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex justify-end gap-4 pt-6">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 rounded-full text-gray-400 hover:text-white transition-colors duration-300 font-outfit"
              >
                Descartar
              </button>
              <button
                type="submit"
                className="bg-[#ec1b69] text-white px-6 py-2 rounded-full hover:bg-[#ec1b69]/80 transition-all duration-300 font-outfit shadow-lg hover:shadow-[#ec1b69]/20"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}; 