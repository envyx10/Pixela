/**
 * Interfaz que representa una categoría
 * @interface Category
 * @property {number} id - ID de la categoría
 * @property {string} name - Nombre de la categoría
 */
export interface Category {
    id: number;
    name: string;
}

/**
 * Interfaz que representa una respuesta de la API de categorías
 * @interface CategoriesApiResponse
 * @property {boolean} success - Si la respuesta fue exitosa
 * @property {Category[]} data - Datos de la respuesta
 */
export interface CategoriesApiResponse {
    success: boolean;
    data: Category[];
}