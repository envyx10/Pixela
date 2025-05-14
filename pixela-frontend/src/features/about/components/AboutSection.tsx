"use client";

import Image from 'next/image';
import { FaFilm, FaUsers, FaHeart, FaLinkedin } from 'react-icons/fa';

const AboutSection = () => {
  return (
    <section className="py-16 px-4 bg-pixela-dark">
      <div className="max-w-7xl mx-auto">
        {/* Título y Subtítulo */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black mb-8 text-pixela-accent font-outfit relative inline-block">
            Quiénes Somos
            <span className="absolute -bottom-2 left-0 w-0 h-1 bg-pixela-accent group-hover:w-full transition-all duration-500"></span>
          </h1>
          <div className="space-y-4 max-w-3xl mx-auto">
            <p className="text-xl text-white/80">
              Somos apasionados del cine y la televisión. Por eso creamos una plataforma única, donde quienes aman las historias pueden descubrir, compartir y celebrar lo que los hace soñar.
            </p>
          </div>
        </div>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Tarjeta 1 */}
          <div 
            className="group relative bg-[#181818] backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-[#1a1a1a] hover:shadow-2xl hover:shadow-pixela-accent/5 hover:ring-1 hover:ring-pixela-accent/10 cursor-pointer flex flex-col h-full transition-all duration-700 animate-float-smooth hover:-translate-y-2"
            style={{ 
              animationDelay: '0s',
              animationDuration: '8s'
            }}
          >
            <div className="mb-6">
              <div className="text-4xl text-pixela-accent">
                <FaFilm />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-pixela-accent transition-colors duration-300">Nuestra Pasión</h3>
            <p className="text-white/70 leading-relaxed flex-grow">
              Nos dedicamos a crear una experiencia única para los amantes del cine y la televisión, ofreciendo una plataforma donde pueden descubrir y compartir sus historias favoritas.
            </p>
          </div>

          {/* Tarjeta 2 - Comunidad (Próximamente) */}
          <div 
            className="group relative bg-[#181818] backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-[#1a1a1a] hover:shadow-2xl hover:shadow-pixela-accent/5 hover:ring-1 hover:ring-pixela-accent/10 cursor-pointer flex flex-col h-full transition-all duration-700 animate-float-smooth hover:-translate-y-2"
            style={{ 
              animationDelay: '0.3s',
              animationDuration: '8s'
            }}
          >
            <div className="mb-6">
              <div className="text-4xl text-pixela-accent">
                <FaUsers />
              </div>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-2xl font-semibold text-white group-hover:text-pixela-accent transition-colors duration-300">Nuestra Comunidad</h3>
              <span className="px-2 py-1 text-xs font-bold uppercase tracking-wider bg-pixela-accent/20 text-pixela-accent rounded-full border border-pixela-accent/30">
                Próximamente
              </span>
            </div>
            <p className="text-white/70 leading-relaxed flex-grow">
              Estamos trabajando en crear un espacio donde los amantes del cine puedan conectarse, compartir sus opiniones y descubrir nuevas perspectivas. ¡Pronto podrás ser parte de nuestra comunidad!
            </p>
          </div>

          {/* Tarjeta 3 */}
          <div 
            className="group relative bg-[#181818] backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-[#1a1a1a] hover:shadow-2xl hover:shadow-pixela-accent/5 hover:ring-1 hover:ring-pixela-accent/10 cursor-pointer flex flex-col h-full transition-all duration-700 animate-float-smooth hover:-translate-y-2"
            style={{ 
              animationDelay: '0.6s',
              animationDuration: '8s'
            }}
          >
            <div className="mb-6">
              <div className="text-4xl text-pixela-accent">
                <FaHeart />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-pixela-accent transition-colors duration-300">Nuestra Misión</h3>
            <p className="text-white/70 leading-relaxed flex-grow">
              Buscamos inspirar y conectar a las personas a través del poder de las historias, creando un espacio donde la pasión por el cine y la televisión florece.
            </p>
          </div>
        </div>

        {/* Sección del Equipo */}
        <div className="text-center py-20">
          <h2 className="text-6xl font-black mb-8 text-pixela-accent font-outfit relative inline-block">
            Nuestro Equipo
            <span className="absolute -bottom-2 left-0 w-0 h-1 bg-pixela-accent group-hover:w-full transition-all duration-500"></span>
          </h2>
          <div className="max-w-3xl mx-auto mb-20">
            <p className="text-xl text-white/90 leading-relaxed mb-4">
            En Pixela, unimos talento y pasión por el cine. Somos desarrolladores, diseñadores y cinéfilos comprometidos con una misión: crear una plataforma donde descubrir historias sea tan emocionante como vivirlas.
            Cada día trabajamos para mejorar y ofrecer la mejor experiencia posible a nuestra comunidad.
            </p>
            <p className="text-xl text-white/90 leading-relaxed">
              Nuestra dedicación y amor por el cine nos impulsa a mejorar constantemente y ofrecer lo mejor a nuestros usuarios.
            </p>
          </div>

          {/* Tarjetas del Equipo */}
          <div className="flex justify-between gap-8 max-w-6xl mx-auto">
            {/* Tarjeta 1 */}
            <div className="w-1/2 group relative bg-[#181818] backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-[#1a1a1a] hover:shadow-2xl hover:shadow-pixela-accent/5 hover:ring-1 hover:ring-pixela-accent/10 transition-all duration-700 animate-float-smooth hover:-translate-y-2 cursor-pointer">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-pixela-accent/30 group-hover:border-pixela-accent/50 transition-colors duration-300">
                    <Image
                      src="/team/envyx10.jpg"
                      alt="Envyx10"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex-grow text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-semibold text-white group-hover:text-pixela-accent transition-colors duration-300">Envyx10</h3>
                    <a 
                      href="https://linkedin.com/in/tu-perfil" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group/linkedin p-2 rounded-full bg-pixela-accent/10 hover:bg-pixela-accent/20 transition-all duration-300"
                    >
                      <FaLinkedin className="text-lg text-pixela-accent group-hover/linkedin:scale-110 transition-transform duration-300" />
                    </a>
                  </div>
                  <p className="text-pixela-accent/80 text-sm mb-3">Desarrollador Full Stack</p>
                  <div className="space-y-1.5 mb-3">
                    <div className="flex items-start gap-2">
                      <span className="text-white/70 text-sm">Serie favorita:</span>
                      <span className="text-pixela-accent font-medium text-sm">Black Mirror</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-white/70 text-sm">Película favorita:</span>
                      <span className="text-pixela-accent font-medium text-sm">Interstellar</span>
                    </div>
                  </div>
                  <p className="text-white/80 italic text-sm leading-relaxed">
                    "Cada línea de código es una historia por contar, cada proyecto una nueva aventura cinematográfica."
                  </p>
                </div>
              </div>
            </div>

            {/* Tarjeta 2 */}
            <div className="w-1/2 group relative bg-[#181818] backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-[#1a1a1a] hover:shadow-2xl hover:shadow-pixela-accent/5 hover:ring-1 hover:ring-pixela-accent/10 transition-all duration-700 animate-float-smooth hover:-translate-y-2 cursor-pointer">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-pixela-accent/30 group-hover:border-pixela-accent/50 transition-colors duration-300">
                    <Image
                      src="/team/companero.jpg"
                      alt="rxy_94"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex-grow text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-semibold text-white group-hover:text-pixela-accent transition-colors duration-300">rxy_94</h3>
                    <a 
                      href="https://linkedin.com/in/tu-perfil" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group/linkedin p-2 rounded-full bg-pixela-accent/10 hover:bg-pixela-accent/20 transition-all duration-300"
                    >
                      <FaLinkedin className="text-lg text-pixela-accent group-hover/linkedin:scale-110 transition-transform duration-300" />
                    </a>
                  </div>
                  <p className="text-pixela-accent/80 text-sm mb-3">Desarrollador Full Stack</p>
                  <div className="space-y-1.5 mb-3">
                    <div className="flex items-start gap-2">
                      <span className="text-white/70 text-sm">Serie favorita:</span>
                      <span className="text-pixela-accent font-medium text-sm">The Office</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-white/70 text-sm">Película favorita:</span>
                      <span className="text-pixela-accent font-medium text-sm">Interstellar</span>
                    </div>
                  </div>
                  <p className="text-white/80 italic text-sm leading-relaxed">
                    "Transformando ideas en experiencias digitales que conectan a los amantes del cine."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 