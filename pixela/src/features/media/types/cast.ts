/**
 * Tipo que representa un actor en el sistema
 * @property {string} nombre - Nombre del actor
 * @property {string} personaje - Personaje que interpreta
 * @property {string} [foto] - URL opcional de la foto del actor
 */
export type Actor = {
  nombre: string;
  personaje?: string;
  foto?: string;
};

/**
 * Props para el componente ActorCard
 * @property {Actor} actor - Datos del actor a mostrar
 * @property {string} [className] - Clases CSS opcionales para personalizar el estilo
 */
export interface ActorCardProps {
  actor: Actor;
  className?: string;
}

/**
 * Props para el componente ActorSliderControls
 * @property {() => void} onPrevClick - Función que se ejecuta al hacer clic en el botón anterior
 * @property {() => void} onNextClick - Función que se ejecuta al hacer clic en el botón siguiente
 */
export interface ActorSliderControlsProps {
  onPrevClick: () => void;
  onNextClick: () => void;
}

/**
 * Props para el componente CastSection
 * @property {Actor[]} actors - Array de actores a mostrar en la sección
 */
export interface CastSectionProps {
  actors: Actor[];
} 