"use client";

import Image from 'next/image';
import { FaLinkedin } from 'react-icons/fa';
import { TEAM_MEMBERS, FEATURE_CARDS } from '../data/aboutData';
import type { TeamMember, FeatureCard } from '../data/aboutData';

/**
 * Estilos constantes para el componente AboutSection
 * @constant
 */
const STYLES = {
  section: "py-16 px-4 bg-pixela-dark",
  container: "max-w-7xl mx-auto",
  title: "text-6xl font-black mb-8 text-pixela-accent font-outfit relative inline-block",
  titleUnderline: "absolute -bottom-2 left-0 w-0 h-1 bg-pixela-accent group-hover:w-full transition-all duration-500",
  subtitle: "text-xl text-white/80",
  card: "group relative bg-[#181818] backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-[#1a1a1a] hover:shadow-2xl hover:shadow-pixela-accent/5 hover:ring-1 hover:ring-pixela-accent/10 cursor-pointer flex flex-col h-full transition-all duration-700 animate-float-smooth hover:-translate-y-2",
  cardIcon: "text-4xl text-pixela-accent",
  cardTitle: "text-2xl font-semibold text-white mb-4 group-hover:text-pixela-accent transition-colors duration-300",
  cardDescription: "text-white/70 leading-relaxed flex-grow",
  comingSoon: "px-2 py-1 text-xs font-bold uppercase tracking-wider bg-pixela-accent/20 text-pixela-accent rounded-full border border-pixela-accent/30",
  teamCard: "w-1/2 group relative bg-[#181818] backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-[#1a1a1a] hover:shadow-2xl hover:shadow-pixela-accent/5 hover:ring-1 hover:ring-pixela-accent/10 transition-all duration-700 animate-float-smooth hover:-translate-y-2 cursor-pointer",
  teamImage: "relative w-32 h-32 rounded-full overflow-hidden border-2 border-pixela-accent/30 group-hover:border-pixela-accent/50 transition-colors duration-300",
  linkedinButton: "group/linkedin p-2 rounded-full bg-pixela-accent/10 hover:bg-pixela-accent/20 transition-all duration-300",
  linkedinIcon: "text-lg text-pixela-accent group-hover/linkedin:scale-110 transition-transform duration-300"
} as const;

/**
 * Componente que renderiza una tarjeta de característica
 * @component
 * @param {FeatureCard} props - Propiedades de la tarjeta
 * @returns {JSX.Element} Tarjeta de característica
 */
const FeatureCard = ({ icon, title, description, isComingSoon }: FeatureCard) => (
  <div 
    className={STYLES.card}
    style={{ 
      animationDelay: isComingSoon ? '0.3s' : '0s',
      animationDuration: '8s'
    }}
  >
    <div className="mb-6">
      <div className={STYLES.cardIcon}>{icon}</div>
    </div>
    <div className="flex items-center gap-3 mb-4">
      <h3 className={STYLES.cardTitle}>{title}</h3>
      {isComingSoon && (
        <span className={STYLES.comingSoon}>Próximamente</span>
      )}
    </div>
    <p className={STYLES.cardDescription}>{description}</p>
  </div>
);

/**
 * Componente que renderiza una tarjeta de miembro del equipo
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {TeamMember} props.member - Datos del miembro del equipo
 * @returns {JSX.Element} Tarjeta de miembro del equipo
 */
const TeamMemberCard = ({ member }: { member: TeamMember }) => (
  <div className={STYLES.teamCard}>
    <div className="flex items-start gap-6">
      <div className="flex-shrink-0">
        <div className={STYLES.teamImage}>
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex-grow text-left">
        <div className="flex items-center gap-3 mb-2">
          <h3 className={STYLES.cardTitle}>{member.name}</h3>
          <a 
            href={member.linkedin}
            target="_blank" 
            rel="noopener noreferrer"
            className={STYLES.linkedinButton}
          >
            <FaLinkedin className={STYLES.linkedinIcon} />
          </a>
        </div>
        <p className="text-pixela-accent/80 text-sm mb-3">{member.role}</p>
        <div className="space-y-1.5 mb-3">
          <div className="flex items-start gap-2">
            <span className="text-white/70 text-sm">Serie favorita:</span>
            <span className="text-pixela-accent font-medium text-sm">{member.favoriteSeries}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-white/70 text-sm">Película favorita:</span>
            <span className="text-pixela-accent font-medium text-sm">{member.favoriteMovie}</span>
          </div>
        </div>
        <p className="text-white/80 italic text-sm leading-relaxed">
          &ldquo;{member.quote}&rdquo;
        </p>
      </div>
    </div>
  </div>
);

/**
 * Componente principal que renderiza la sección "Acerca de"
 * @component
 * @returns {JSX.Element} Sección "Acerca de"
 */
const AboutSection = () => {
  return (
    <section className={STYLES.section}>
      <div className={STYLES.container}>
        {/* Título y Subtítulo */}
        <div className="text-center mb-16">
          <h1 className={STYLES.title}>
            Quiénes Somos
            <span className={STYLES.titleUnderline}></span>
          </h1>
          <div className="space-y-4 max-w-3xl mx-auto">
            <p className={STYLES.subtitle}>
              Somos apasionados del cine y la televisión. Por eso creamos una plataforma única, donde quienes aman las historias pueden descubrir, compartir y celebrar lo que los hace soñar.
            </p>
          </div>
        </div>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {FEATURE_CARDS.map((card, index) => (
            <FeatureCard key={index} {...card} />
          ))}
        </div>

        {/* Sección del Equipo */}
        <div className="text-center py-20">
          <h2 className={STYLES.title}>
            Nuestro Equipo
            <span className={STYLES.titleUnderline}></span>
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
            {TEAM_MEMBERS.map((member, index) => (
              <TeamMemberCard key={index} member={member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 