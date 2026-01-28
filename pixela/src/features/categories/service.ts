import { Category } from '@/api/categories/categories';
import { getAllCategories } from '@/api/categories/categories';

/**
 * Servicio para manejar las categorías.
 * 
 * @class
 * @static
 * @method getCategories - Obtiene todas las categorías
 * @method filterCategories - Filtra las categorías por nombre
 * @returns {Promise<Category[]>} - Lista de categorías
 * @returns {Category[]} - Lista de categorías filtradas
 */
export class CategoriesService {
    static async getCategories(): Promise<Category[]> {
        try {
            return await getAllCategories();
        } catch (error) {
            console.error('[ERROR] CategoriesService.getCategories:', error);
            throw error;
        }
    }

    static filterCategories(categories: Category[], searchTerm: string): Category[] {
        if (!searchTerm) return categories;
        
        return categories.filter(category => 
            category.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
} 