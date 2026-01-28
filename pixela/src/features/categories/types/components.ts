import { Category } from '@/api/categories/categories';
import { MediaType } from './media';

/**
 * Props del componente MediaTypeSelector
 * @interface
 * @param {MediaType | 'random'} selectedType - Tipo de media seleccionado
 * @param {function} onTypeChange - Función para cambiar el tipo de media
 */
export interface MediaTypeSelectorProps {
    selectedType: MediaType | 'random';
    onTypeChange: (type: MediaType | 'random') => void;
}

/**
 * Props del componente CategoriesModal
 * @interface
 * @param {boolean} isOpen - Indica si el modal está abierto
 * @param {function} onClose - Función para cerrar el modal
 * @param {Category[]} categories - Lista de categorías
 * @param {Category | null} selectedCategory - Categoría seleccionada
 * @param {function} onCategorySelect - Función para seleccionar una categoría
 */
export interface CategoriesModalProps {
    isOpen: boolean;
    onClose: () => void;
    categories: Category[];
    selectedCategory: Category | null;
    onCategorySelect: (category: Category) => void;
}

/**
 * Props del componente CategoriesHeader
 * @interface
 * @param {MediaType | 'random'} selectedMediaType - Tipo de medio seleccionado
 * @param {function} onMediaTypeChange - Función para cambiar el tipo de medio
 */
export interface CategoriesHeaderProps {
    selectedMediaType: MediaType | 'random';
    onMediaTypeChange: (type: MediaType | 'random') => void;
}

/**
 * Props del componente ItemCounter
 * @interface
 * @param {number} moviesCount - Número de películas en la página actual
 * @param {number} seriesCount - Número de series en la página actual
 * @param {number} currentPage - Página actual
 * @param {number} totalPages - Total de páginas disponibles
 * @param {boolean} isSearching - Indica si hay una búsqueda activa
 * @param {string} [searchQuery] - Término de búsqueda
 * @param {MediaType | 'random'} mediaType - Tipo de media actual
 */
export interface ItemCounterProps {
    moviesCount: number;
    seriesCount: number;
    currentPage: number;
    totalPages: number;
    isSearching: boolean;
    searchQuery?: string;
    mediaType: MediaType | 'random';
} 