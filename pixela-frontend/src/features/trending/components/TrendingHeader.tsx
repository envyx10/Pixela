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
  title: 'text-[128px] font-[900] text-pixela-accent font-outfit tracking-wider uppercase leading-none',
  container: 'relative w-full min-h-screen bg-pixela-dark flex flex-col',
  content: 'flex-grow flex flex-col justify-center relative z-10',
  contentWrapper: 'w-[80%] mx-auto mb-4',
  contentWrapperWithToggle: 'w-[80%] mx-auto mb-4 flex items-end justify-between',
  toggleContainer: 'mb-10',
  toggleWrapper: 'flex bg-white/5 backdrop-blur-sm rounded-full p-1 border border-white/10 relative',
  loadingContainer: 'relative w-full h-screen bg-pixela-dark flex flex-col justify-center',
  loadingCard: 'w-[375px] h-[528px] bg-gray-800 flex items-center justify-center',
  loadingText: 'text-pixela-light'
} as const;

const TITLE_TEXT = 'Tendencias';
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
    {TITLE_TEXT}
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