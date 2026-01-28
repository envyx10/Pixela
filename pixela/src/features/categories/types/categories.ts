import { Category } from '@/api/categories/categories';
import { MediaType } from './media';

/**
 * Interfaz para el estado de las categorías.
 * 
 * @interface
 * @property {Category[]} categories - Lista de categorías
 * @property {boolean} loading - Indica si se está cargando
 * @property {string | null} error - Indica si hay un error
 * @property {MediaType} selectedMediaType - Tipo de media seleccionado
 * @property {function} fetchCategories - Función para cargar las categorías
 * @property {function} setSelectedMediaType - Función para establecer el tipo de media seleccionado
 */
export interface CategoriesState {
    categories: Category[];
    loading: boolean;
    error: string | null;
    selectedMediaType: MediaType;
    fetchCategories: (mediaType?: MediaType) => Promise<void>;
    setSelectedMediaType: (type: MediaType) => void;
}

/**
 * Interfaz para las propiedades de las categorías.
 * 
 * @interface
 * @property {function} onCategorySelect - Función para seleccionar una categoría
 * @property {Category | null} selectedCategory - Categoría seleccionada
 * @property {string} mediaType - Tipo de media
 */
export interface CategoriesProps {
    onCategorySelect?: (category: Category) => void;
    selectedCategory?: Category | null;
    mediaType?: 'all' | 'movies' | 'series';
} 