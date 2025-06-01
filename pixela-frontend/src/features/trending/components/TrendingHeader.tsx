'use client';
import './trending.css';
import { useState, memo } from 'react';
import { useTrendingStore } from '@/features/trending/store';
import { TrendingMediaCarousel } from '@/features/trending/components/TrendingMediaCarousel';
import { TrendingButton } from './TrendingButton';
import { TrendingSerie, TrendingMovie } from '@/features/trending/type';
import clsx from 'clsx';

// Constantes
const STYLES = {
  title: 'font-black font-outfit tracking-wider uppercase leading-none w-full md:w-auto text-left break-words pl-4 sm:pl-0',
  titleMobile: 'block sm:hidden text-[64px] leading-[0.95] text-pixela-accent text-left pl-4 sm:pl-0',
  titleDesktop: 'hidden sm:block text-[64px] md:text-[96px] lg:text-[128px] text-pixela-accent text-left pl-4 sm:pl-0 [@media(min-width:820px)_and_(max-width:1180px)]:text-[110px]',
  container: 'relative w-full min-h-screen bg-pixela-dark flex flex-col pt-8 md:pt-20 [@media(min-width:820px)_and_(max-width:1180px)]:min-h-0 [@media(min-width:820px)_and_(max-width:1180px)]:h-auto [@media(min-width:820px)_and_(max-width:1180px)]:pt-20 [@media(min-width:820px)_and_(max-width:1180px)]:pb-8',
  content: 'flex-grow flex flex-col justify-center md:justify-start relative z-10 pb-16 md:pb-0 [@media(min-width:820px)_and_(max-width:1180px)]:justify-start [@media(min-width:820px)_and_(max-width:1180px)]:py-4 [@media(min-width:820px)_and_(max-width:1180px)]:flex-grow-0',
  contentWrapper: 'w-[90%] md:w-[85%] lg:w-[80%] mx-auto',
  contentWrapperWithToggle: 'w-full md:w-[85%] lg:w-[80%] mx-auto flex flex-col items-center gap-8 lg:gap-0 lg:flex-row lg:items-end lg:justify-between [@media(min-width:820px)_and_(max-width:1180px)]:gap-6 [@media(min-width:820px)_and_(max-width:1180px)]:mb-6',
  toggleContainer: 'mb-12 md:mb-10 w-[90%] md:w-auto [@media(min-width:820px)_and_(max-width:1180px)]:mb-0',
  toggleWrapper: 'flex bg-white/5 backdrop-blur-sm rounded-full p-1 border border-white/10 relative shadow-lg shadow-black/20 justify-center lg:justify-start w-full sm:w-auto [@media(min-width:820px)_and_(max-width:1180px)]:p-1',
  loadingContainer: 'relative w-full h-screen bg-pixela-dark flex flex-col justify-center',
  loadingCard: 'w-[280px] md:w-[375px] h-[395px] md:h-[528px] bg-gray-800 flex items-center justify-center',
  loadingText: 'text-pixela-light'
} as const;

const BUTTON_OPTIONS = [
  { id: 'series', label: 'Series' },
  { id: 'movies', label: 'Películas' }
] as const;

/**
 * Tipo que representa el tipo de medio (series o películas)
 */
type MediaType = 'series' | 'movies';

/**
 * Componente que renderiza el título principal de la sección de tendencias
 * @returns {JSX.Element} Título estilizado
 */
const TrendingTitle = memo(() => (
  <h2 className={STYLES.title}>
    <span className={STYLES.titleMobile}>TEN-<br/>DENCIAS</span>
    <span className={STYLES.titleDesktop}>TENDENCIAS</span>
  </h2>
));

TrendingTitle.displayName = 'TrendingTitle';

/**
 * Props para el componente TrendingToggle
 * @property {MediaType} activeButton - El tipo de medio actualmente seleccionado
 * @property {(type: MediaType) => void} onButtonChange - Función para cambiar el tipo de medio
 */
interface TrendingToggleProps {
  activeButton: MediaType;
  onButtonChange: (type: MediaType) => void;
}

/**
 * Componente que renderiza los botones de alternancia entre series y películas
 * @param {TrendingToggleProps} props - Props del componente
 * @returns {JSX.Element} Botones de alternancia
 */
const TrendingToggle = memo(({ activeButton, onButtonChange }: TrendingToggleProps) => (
  <div className={STYLES.toggleContainer}>
    <div className={STYLES.toggleWrapper}>
      {BUTTON_OPTIONS.map(({ id, label }) => (
        <TrendingButton 
          key={id}
          isActive={activeButton === id}
          onClick={() => onButtonChange(id)}
        >
          {label}
        </TrendingButton>
      ))}
    </div>
  </div>
));

TrendingToggle.displayName = 'TrendingToggle';

/**
 * Componente que muestra el estado de carga de la sección de tendencias
 * @returns {JSX.Element} Estado de carga
 */
const LoadingState = memo(() => (
  <div className={STYLES.loadingContainer}>
    <div className={clsx(STYLES.contentWrapper, 'mb-4')}>
      <TrendingTitle />
    </div>
    <div className="flex justify-center">
      <div className={STYLES.loadingCard}>
        <p className={STYLES.loadingText}>Cargando...</p>
      </div>
    </div>
  </div>
));

LoadingState.displayName = 'LoadingState';

/**
 * Props para el componente ContentState
 * @property {MediaType} activeButton - El tipo de medio actualmente seleccionado
 * @property {TrendingSerie[] | TrendingMovie[]} activeContent - Contenido actual a mostrar
 * @property {(type: MediaType) => void} onButtonChange - Función para cambiar el tipo de medio
 */
interface ContentStateProps {
  activeButton: MediaType;
  activeContent: TrendingSerie[] | TrendingMovie[];
  onButtonChange: (type: MediaType) => void;
}

/**
 * Componente que renderiza el contenido principal de la sección de tendencias
 * @param {ContentStateProps} props - Props del componente
 * @returns {JSX.Element} Contenido principal
 */
const ContentState = memo(({ activeButton, activeContent, onButtonChange }: ContentStateProps) => (
  <div id="tendencias" className={STYLES.container}>
    <div className={STYLES.content}>
      <div className={STYLES.contentWrapperWithToggle}>
        <TrendingTitle />
        <TrendingToggle 
          activeButton={activeButton}
          onButtonChange={onButtonChange}
        />
      </div>
      
      <TrendingMediaCarousel 
        content={activeContent} 
        type={activeButton}
      />
    </div>
  </div>
));

ContentState.displayName = 'ContentState';

/**
 * Componente principal que maneja la sección de tendencias
 * Gestiona el estado del tipo de medio seleccionado y renderiza el contenido correspondiente
 * @returns {JSX.Element} Sección de tendencias
 */
export const TrendingHeader = () => {
  const series = useTrendingStore(state => state.series);
  const movies = useTrendingStore(state => state.movies);
  const [activeButton, setActiveButton] = useState<MediaType>('series');
  
  const activeContent = activeButton === 'series' ? series : movies;
  
  if (!activeContent || activeContent.length === 0) {
    return <LoadingState />;
  }
  
  return (
    <ContentState 
      activeButton={activeButton}
      activeContent={activeContent}
      onButtonChange={setActiveButton}
    />
  );
}; 