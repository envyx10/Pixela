import { create } from 'zustand';
import { MediaType } from '../types/media';
import { getCategoriesForMediaType } from '@/api/categories/categories';
import { Category } from '@/api/categories/categories';

/**
 * Interfaz para el estado de las categorías
 * @interface CategoriesState
 * @property {Category[]} categories - Las categorías disponibles
 * @property {boolean} loading - Indica si se está cargando o no las categorías
 * @property {string | null} error - El mensaje de error si ocurre
 * @property {MediaType} selectedMediaType - El tipo de medio seleccionado
 * @property {string | null} selectedCategory - La categoría seleccionada
 * @property {function} fetchCategories - Función para cargar las categorías      
 * @property {function} setSelectedMediaType - Función para establecer el tipo de medio seleccionado
 * @property {function} setSelectedCategory - Función para establecer la categoría seleccionada
 */
export interface CategoriesState {
    categories: Category[];
    loading: boolean;
    error: string | null;
    selectedMediaType: MediaType;
    selectedCategory: string | null;
    fetchCategories: (mediaType?: MediaType) => Promise<void>;
    setSelectedMediaType: (type: MediaType) => void;
    setSelectedCategory: (category: string | null) => void;
}

/**
 * Hook para el estado de las categorías
 * @function useCategoriesStore - Hook para el estado de las categorías
 * @returns {CategoriesState} - El estado de las categorías
 * @returns {function} fetchCategories - Función para cargar las categorías
 * @returns {function} setSelectedMediaType - Función para establecer el tipo de medio seleccionado
 * @returns {function} setSelectedCategory - Función para establecer la categoría seleccionada
 */
export const useCategoriesStore = create<CategoriesState>((set, get) => ({
    categories: [],
    loading: false,
    error: null,
    selectedMediaType: 'movies' as MediaType,
    selectedCategory: null,

    fetchCategories: async (mediaType?: MediaType) => {
        set({ loading: true, error: null });
        try {
            const currentMediaType = mediaType || get().selectedMediaType;
            const categories = await getCategoriesForMediaType(currentMediaType);
            set({ categories, loading: false });
        } catch (error) {
            set({ 
                error: error instanceof Error ? error.message : 'Error al cargar las categorías',
                loading: false 
            });
        }
    },

    /**
     * Función para establecer el tipo de medio seleccionado
     * @param {MediaType} type - El tipo de medio seleccionado
     * @returns {void} - No devuelve nada
     */
    setSelectedMediaType: (type: MediaType) => {
        set({ selectedMediaType: type });
        get().fetchCategories(type);
    },

    /**
     * Función para establecer la categoría seleccionada
     * @param {string | null} category - La categoría seleccionada
     * @returns {void} - No devuelve nada
     */
    setSelectedCategory: (category: string | null) => set({ selectedCategory: category }),
})); 