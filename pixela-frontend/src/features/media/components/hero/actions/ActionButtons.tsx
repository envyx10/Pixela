"use client";

import { FaBookmark, FaPen } from 'react-icons/fa';

export const ActionButtons = () => (
  <div className="flex gap-4">
    <button className="bg-[#FF2D55] hover:bg-[#FF2D55]/90 text-white p-3 rounded-lg font-medium transition duration-300 flex items-center gap-2 shadow-lg shadow-[#FF2D55]/20">
      <FaBookmark className="w-5 h-5" />
    </button>
    <button className="bg-[#1A1A1A] hover:bg-[#252525] text-white px-8 py-3 rounded-lg font-medium transition duration-300 flex items-center gap-2 border border-white/10">
      <FaPen className="w-5 h-5" />
      Hacer Reseña
    </button>
  </div>
); 