/**
 * Opciones para las peticiones a la API de tendencias
 * @property {number} [limit] - Número máximo de resultados a obtener
 * @property {number} [offset] - Punto de inicio para la paginación
 */
export interface FetchOptions {
  limit?: number;
  offset?: number;
} 