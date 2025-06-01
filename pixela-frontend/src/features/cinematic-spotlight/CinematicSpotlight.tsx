'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { FaStar } from "react-icons/fa";
import ParticleField from './ParticleField';
import { Badge } from "@/shared/components/Badge";
import { ActionButtons } from "@/shared/components/ActionButtons";

// Registrar plugins de GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Movie {
  id: number;
  title: string;
  poster: string;
  backdrop: string;
  rating: number;
  year: string;
  genre: string;
  description: string;
}

const FEATURED_MOVIES: Movie[] = [
  {
    id: 1,
    title: "Dune: Part Two",
    poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    rating: 8.8,
    year: "2024",
    genre: "Sci-Fi Epic",
    description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family."
  },
  {
    id: 2,
    title: "Oppenheimer",
    poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
    rating: 8.6,
    year: "2023",
    genre: "Biography Drama",
    description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb."
  },
  {
    id: 3,
    title: "Spider-Man: Across the Spider-Verse",
    poster: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/nGxUxi3PfXDRm7Vg95VBNgNM8yc.jpg",
    rating: 9.0,
    year: "2023",
    genre: "Animation Adventure",
    description: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence."
  }
];

// Estilos profesionales con mejor jerarquía visual
const STYLES = {
  // Contenedor principal
  section: 'relative w-full bg-pixela-dark overflow-hidden',
  
  // Hero section con mejor espaciado
  hero: {
    container: 'relative z-20 min-h-[50vh] flex flex-col justify-center items-center px-6 py-16',
    content: 'max-w-5xl mx-auto text-center',
    titleContainer: 'relative mb-6',
    title: 'text-[80px] md:text-[120px] lg:text-[140px] font-[900] text-white font-outfit tracking-[-0.02em] uppercase leading-[0.85] mb-4',
    subtitle: 'text-pixela-light/90 font-sans text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8 font-light',
    cta: 'inline-flex items-center gap-3 bg-pixela-accent hover:bg-pixela-accent/90 text-white font-sans font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl text-sm'
  },
  
  // Cards section mejorada
  cards: {
    section: 'relative z-10 pb-24 px-6',
    content: 'max-w-7xl mx-auto',
    header: 'text-center mb-16',
    sectionTitle: 'text-3xl md:text-4xl font-[900] text-pixela-light font-outfit tracking-wider uppercase leading-none mb-4',
    sectionSubtitle: 'text-pixela-light/70 font-sans text-sm md:text-base max-w-2xl mx-auto',
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'
  },
  
  // Card styles exactos de trending
  card: {
    container: 'w-full max-w-[375px] mx-auto flex flex-col relative group cursor-pointer',
    posterContainer: 'relative w-full h-[528px] overflow-hidden rounded-lg',
    poster: 'object-cover transition-transform duration-500 group-hover:scale-110',
    noiseEffect: 'noise-effect opacity-5',
    overlay: 'absolute inset-0 bg-gradient-to-t from-pixela-dark via-pixela-dark/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300',
    overlayContent: 'absolute inset-0 flex flex-col justify-end p-5',
    
    // Info styles exactos
    info: {
      container: 'mb-4',
      title: 'text-pixela-light font-bold text-xl mb-2 font-outfit',
      meta: 'flex items-center gap-3 mb-3',
      rating: {
        container: 'flex items-center',
        icon: 'text-yellow-400 mr-1',
        value: 'text-pixela-light font-semibold'
      },
      year: 'text-pixela-light/80',
      badge: 'text-pixela-light/90 bg-pixela-dark/60 px-2 py-0.5 rounded-sm text-xs'
    }
  }
} as const;

// Componentes internos usando el patrón de trending
const MovieInfoDetails = ({ movie }: { movie: Movie }) => (
  <div className={STYLES.card.info.container}>
    <h3 className={STYLES.card.info.title}>
      {movie.title}
    </h3>
    
    <div className={STYLES.card.info.meta}>
      <div className={STYLES.card.info.rating.container}>
        <FaStar className={STYLES.card.info.rating.icon} />
        <span className={STYLES.card.info.rating.value}>
          {movie.rating.toFixed(1)}
        </span>
      </div>
      
      <span className={STYLES.card.info.year}>
        {movie.year}
      </span>
      
      <span className={STYLES.card.info.badge}>
        {movie.genre}
      </span>
    </div>
  </div>
);

const OverlayContent = ({ movie }: { movie: Movie }) => (
  <div className={STYLES.card.overlayContent}>
    <MovieInfoDetails movie={movie} />
    <ActionButtons 
      tmdbId={movie.id}
      itemType="movie"
      detailsHref={`/movies/${movie.id}`}
    />
  </div>
);

const CinematicSpotlight: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const backdropRef = useRef<HTMLDivElement>(null);
  const [activeMovie, setActiveMovie] = useState(0);
  const [isHovered, setIsHovered] = useState<number | null>(null);

  // Add refs to array
  const addToRefs = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animación del título con efecto cinematográfico
      const titleTl = gsap.timeline();
      
      titleTl
        .from(titleRef.current, {
          opacity: 0,
          y: 100,
          duration: 1.2,
          ease: "power4.out"
        })
        .from(".hero-subtitle", {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.4")
        .from(".hero-cta", {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.3");

      // Animación de cards con stagger mejorado
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cards-container",
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Efecto parallax sutil en backdrop
      if (backdropRef.current) {
        gsap.to(backdropRef.current, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCardHover = (index: number) => {
    setActiveMovie(index);
    setIsHovered(index);
  };

  const handleCardLeave = () => {
    setIsHovered(null);
  };

  return (
    <section ref={containerRef} className={STYLES.section}>
      {/* Particle Field cinematográfico */}
      <ParticleField 
        particleCount={25}
        colors={['#EC1B69', '#FFFFFF', '#EC1B69']}
      />

      {/* Backdrop dinámico mejorado */}
      <div 
        ref={backdropRef}
        className="absolute inset-0 w-full h-[110%] transition-all duration-1000 ease-out"
        style={{
          backgroundImage: `url(${FEATURED_MOVIES[activeMovie].backdrop})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'grayscale(100%) contrast(1.1) brightness(0.35) saturate(0.8)'
        }}
      />
      
      {/* Overlay cinematográfico */}
      <div className="absolute inset-0 bg-gradient-to-b from-pixela-dark/40 via-pixela-dark/60 to-pixela-dark/90" />

      {/* Hero Section mejorado */}
      <div ref={heroRef} className={STYLES.hero.container}>
        <div className={STYLES.hero.content}>
          <div className={STYLES.hero.titleContainer}>
            {/* Título limpio sin efectos */}
            <h1 
              ref={titleRef}
              className={STYLES.hero.title}
              style={{
                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)'
              }}
            >
              En Foco
            </h1>
          </div>
          
          <p className={`hero-subtitle ${STYLES.hero.subtitle}`}>
            Descubre una selección curada de las películas más extraordinarias, 
            donde cada historia cobra vida con una experiencia cinematográfica única
          </p>
          
          <button className={`hero-cta ${STYLES.hero.cta}`}>
            <span>Explorar Catálogo</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Cards Section con diseño profesional */}
      <div className={STYLES.cards.section}>
        <div className={STYLES.cards.content}>
          <div className={STYLES.cards.header}>
            <h2 className={STYLES.cards.sectionTitle}>
              Destacadas
            </h2>
            <p className={STYLES.cards.sectionSubtitle}>
              Una selección de las películas más aclamadas y populares
            </p>
          </div>
          
          <div className={`cards-container ${STYLES.cards.grid}`}>
            {FEATURED_MOVIES.map((movie, index) => (
              <div
                key={movie.id}
                ref={addToRefs}
                className={STYLES.card.container}
                onMouseEnter={() => handleCardHover(index)}
                onMouseLeave={handleCardLeave}
              >
                <div className={STYLES.card.posterContainer}>
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    fill
                    className={STYLES.card.poster}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index < 3}
                  />
                  
                  {/* Efecto de ruido exacto de trending */}
                  <div className={STYLES.card.noiseEffect} />
                  
                  {/* Overlay con contenido exacto de trending */}
                  {isHovered === index && (
                    <div className={STYLES.card.overlay}>
                      <OverlayContent movie={movie} />
                    </div>
                  )}
                  
                  {/* Badge para alta calificación */}
                  {movie.rating >= 8.5 && (
                    <Badge 
                      label="TOP PIXELA"
                      position="top-left"
                      variant="primary"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CinematicSpotlight; 