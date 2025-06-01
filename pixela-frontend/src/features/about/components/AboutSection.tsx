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
  section: "py-36 px-4 max-sm:px-2 bg-pixela-dark [@media(min-width:820px)_and_(max-width:1180px)]:py-20",
  container: "max-w-7xl mx-auto max-sm:w-5/6 [@media(min-width:820px)_and_(max-width:1180px)]:w-[90%]",
  title: "text-6xl max-sm:text-4xl font-black mb-8 text-pixela-accent font-outfit relative inline-block max-sm:text-[64px] max-sm:leading-[0.95] max-sm:break-words [@media(min-width:820px)_and_(max-width:1180px)]:text-5xl [@media(min-width:820px)_and_(max-width:1180px)]:mb-6",
  titleUnderline: "absolute -bottom-2 left-0 w-0 h-1 bg-pixela-accent group-hover:w-full transition-all duration-500",
  subtitle: "text-xl max-sm:text-base text-white/80 [@media(min-width:820px)_and_(max-width:1180px)]:text-lg",
  card: "group relative bg-[#181818] backdrop-blur-sm rounded-2xl p-8 max-sm:p-4 border border-pixela-accent/20 bg-gradient-to-br from-[#181818] to-[#1a1a1a] shadow-2xl shadow-pixela-accent/5 ring-1 ring-pixela-accent/10 cursor-pointer flex flex-col h-full transition-all duration-700 animate-float-smooth hover:-translate-y-2 [@media(min-width:820px)_and_(max-width:1180px)]:p-6 [@media(min-width:820px)_and_(max-width:1180px)]:rounded-xl",
  cardIcon: "text-4xl text-pixela-accent [@media(min-width:820px)_and_(max-width:1180px)]:text-3xl",
  cardTitle: "text-2xl font-semibold text-white mb-4 group-hover:text-pixela-accent transition-colors duration-300 flex items-center [@media(min-width:820px)_and_(max-width:1180px)]:text-xl [@media(min-width:820px)_and_(max-width:1180px)]:mb-3",
  cardDescription: "text-white/70 leading-relaxed flex-grow [@media(min-width:820px)_and_(max-width:1180px)]:text-sm [@media(min-width:820px)_and_(max-width:1180px)]:leading-normal",
  comingSoon: "px-2 py-1 text-xs font-bold uppercase tracking-wider bg-pixela-accent/20 text-pixela-accent rounded-full border border-pixela-accent/30 [@media(min-width:820px)_and_(max-width:1180px)]:text-[10px] [@media(min-width:820px)_and_(max-width:1180px)]:px-1.5",
  teamCard: "w-full group relative bg-[#181818] backdrop-blur-sm rounded-2xl p-6 max-sm:p-4 border border-pixela-accent/20 bg-gradient-to-br from-[#181818] to-[#1a1a1a] shadow-2xl shadow-pixela-accent/5 ring-1 ring-pixela-accent/10 transition-all duration-700 animate-float-smooth hover:-translate-y-2 cursor-pointer [@media(min-width:820px)_and_(max-width:1180px)]:p-5 [@media(min-width:820px)_and_(max-width:1180px)]:rounded-xl",
  teamImage: "relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-pixela-accent/30 group-hover:border-pixela-accent/50 transition-colors duration-300 [@media(min-width:820px)_and_(max-width:1180px)]:w-28 [@media(min-width:820px)_and_(max-width:1180px)]:h-28",
  teamCardContent: "flex flex-col max-sm:items-start max-sm:gap-4 sm:flex-row sm:items-start sm:gap-6 [@media(min-width:820px)_and_(max-width:1180px)]:gap-4",
  teamCardImageContainer: "flex-shrink-0 max-sm:w-full max-sm:flex max-sm:justify-start sm:w-auto",
  teamCardInfo: "flex-grow max-sm:text-left max-sm:w-full sm:text-left sm:w-auto",
  teamCardHeader: "flex max-sm:flex-row max-sm:items-center max-sm:justify-between max-sm:gap-1 sm:flex-row sm:items-start sm:gap-3 mb-2 [@media(min-width:820px)_and_(max-width:1180px)]:mb-1.5",
  linkedinButton: "group/linkedin p-2 rounded-full bg-pixela-accent/10 hover:bg-pixela-accent/20 transition-all duration-300 flex items-center justify-center -mt-2 [@media(min-width:820px)_and_(max-width:1180px)]:p-1.5",
  linkedinButtonMobile: "max-sm:ml-auto",
  linkedinIcon: "text-lg text-pixela-accent group-hover/linkedin:scale-110 transition-transform duration-300 w-5 h-5 [@media(min-width:820px)_and_(max-width:1180px)]:w-4 [@media(min-width:820px)_and_(max-width:1180px)]:h-4",
  teamSection: "py-20 [@media(min-width:820px)_and_(max-width:1180px)]:py-16",
  teamGrid: "flex flex-col md:flex-row justify-between gap-8 md:gap-16 [@media(min-width:820px)_and_(max-width:1180px)]:gap-8 [@media(min-width:820px)_and_(max-width:1180px)]:flex-col",
  teamTextColumn: "w-full md:w-1/2 pt-8 md:pt-16 [@media(min-width:820px)_and_(max-width:1180px)]:w-full [@media(min-width:820px)_and_(max-width:1180px)]:pt-0",
  teamCardsColumn: "w-full md:w-1/2 flex flex-col gap-8 [@media(min-width:820px)_and_(max-width:1180px)]:w-full [@media(min-width:820px)_and_(max-width:1180px)]:gap-6 [@media(min-width:820px)_and_(max-width:1180px)]:grid [@media(min-width:820px)_and_(max-width:1180px)]:grid-cols-2",
  teamTextContainer: "mt-8 max-sm:mt-2 [@media(min-width:820px)_and_(max-width:1180px)]:mt-4",
  teamDescription: "text-xl max-sm:text-base text-white/90 leading-relaxed mb-4 [@media(min-width:820px)_and_(max-width:1180px)]:text-lg [@media(min-width:820px)_and_(max-width:1180px)]:mb-3",
  teamRole: "text-pixela-accent/80 text-sm mb-3 [@media(min-width:820px)_and_(max-width:1180px)]:text-xs [@media(min-width:820px)_and_(max-width:1180px)]:mb-2",
  teamInfoContainer: "space-y-1.5 mb-3 [@media(min-width:820px)_and_(max-width:1180px)]:space-y-1 [@media(min-width:820px)_and_(max-width:1180px)]:mb-2",
  teamInfoLabel: "text-white/70 text-sm [@media(min-width:820px)_and_(max-width:1180px)]:text-xs",
  teamInfoValue: "text-pixela-accent font-medium text-sm [@media(min-width:820px)_and_(max-width:1180px)]:text-xs",
  teamQuote: "text-white/80 italic text-sm leading-relaxed [@media(min-width:820px)_and_(max-width:1180px)]:text-xs [@media(min-width:820px)_and_(max-width:1180px)]:leading-normal",
  teamHeader: "text-center max-sm:text-left mb-16 [@media(min-width:820px)_and_(max-width:1180px)]:mb-12 [@media(min-width:820px)_and_(max-width:1180px)]:text-left",
  teamHeaderText: "space-y-4 max-w-3xl mx-auto max-sm:mx-0 [@media(min-width:820px)_and_(max-width:1180px)]:mx-0 [@media(min-width:820px)_and_(max-width:1180px)]:space-y-3",
  teamCardsGrid: "grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 [@media(min-width:820px)_and_(max-width:1180px)]:grid-cols-2 [@media(min-width:820px)_and_(max-width:1180px)]:gap-6 [@media(min-width:820px)_and_(max-width:1180px)]:mb-16 [@media(min-width:820px)_and_(max-width:1180px)]:[&>*:nth-child(3)]:col-span-2",
  teamInfoRow: "flex items-start gap-2",
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
    <div className={STYLES.teamCardContent}>
      <div className={STYLES.teamCardImageContainer}>
        <div className={STYLES.teamImage}>
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className={STYLES.teamCardInfo}>
        <div className={STYLES.teamCardHeader}>
          <h3 className={STYLES.cardTitle}>{member.name}</h3>
          <a 
            href={member.linkedin}
            target="_blank" 
            rel="noopener noreferrer"
            className={`${STYLES.linkedinButton} ${STYLES.linkedinButtonMobile}`}
          >
            <FaLinkedin className={STYLES.linkedinIcon} />
          </a>
        </div>
        <p className={STYLES.teamRole}>{member.role}</p>
        <div className={STYLES.teamInfoContainer}>
          <div className={STYLES.teamInfoRow}>
            <span className={STYLES.teamInfoLabel}>Serie favorita:</span>
            <span className={STYLES.teamInfoValue}>{member.favoriteSeries}</span>
          </div>
          <div className={STYLES.teamInfoRow}>
            <span className={STYLES.teamInfoLabel}>Película favorita:</span>
            <span className={STYLES.teamInfoValue}>{member.favoriteMovie}</span>
          </div>
        </div>
        <p className={STYLES.teamQuote}>
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
        <div className={STYLES.teamHeader}>
          <h1 className={STYLES.title}>
            <span className="block sm:hidden">QUIÉ-<br/>NES SOMOS</span>
            <span className="hidden sm:block">Quiénes Somos</span>
            <span className={STYLES.titleUnderline}></span>
          </h1>
          <div className={STYLES.teamHeaderText}>
            <p className={STYLES.subtitle}>
              Somos apasionados del cine y la televisión. Por eso creamos una plataforma única, donde quienes aman las historias pueden descubrir, compartir y celebrar lo que los hace soñar.
            </p>
          </div>
        </div>

        {/* Tarjetas */}
        <div className={STYLES.teamCardsGrid}>
          {FEATURE_CARDS.map((card, index) => (
            <FeatureCard key={index} {...card} />
          ))}
        </div>

        {/* Sección del Equipo */}
        <div className={STYLES.teamSection}>
          <div className={STYLES.teamGrid}>
            {/* Columna de texto */}
            <div className={STYLES.teamTextColumn}>
              <h2 className={STYLES.title}>
                <span className="block sm:hidden">NUES-<br/>TRO EQUIPO</span>
                <span className="hidden sm:block">Nuestro Equipo</span>
                <span className={STYLES.titleUnderline}></span>
              </h2>
              <div className={STYLES.teamTextContainer}>
                <p className={STYLES.teamDescription}>
                  En Pixela, unimos talento y pasión por el cine. Somos desarrolladores, diseñadores y cinéfilos comprometidos con una misión: crear una plataforma donde descubrir historias sea tan emocionante como vivirlas.
                  Cada día trabajamos para mejorar y ofrecer la mejor experiencia posible a nuestra comunidad.
                </p>
                <p className={STYLES.teamDescription}>
                  Nuestra dedicación y amor por el cine nos impulsa a mejorar constantemente y ofrecer lo mejor a nuestros usuarios.
                </p>
              </div>
            </div>

            {/* Columna de cards */}
            <div className={STYLES.teamCardsColumn}>
              {TEAM_MEMBERS.map((member, index) => (
                <TeamMemberCard key={index} member={member} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 