
/**
 * Proveedor de streaming
 * @interface WatchProvider
 * @property {string} id - ID del proveedor
 * @property {string} nombre - Nombre del proveedor
 * @property {string} logo - URL de la imagen del proveedor   
 * @property {string} tipo - Tipo de proveedor
 * @property {string} url - URL del proveedor
 */
export interface WatchProvider {
  id: string;
  nombre: string;
  logo: string;
  tipo?: 'flatrate' | 'rent' | 'buy';
  url?: string;
}

/**
 * Imagen
 * @interface Image
 * @property {string} id - ID de la imagen
 * @property {string} url - URL de la imagen
 * @property {string} tipo - Tipo de imagen
 */
export interface Image {
  id: string;
  url: string;
  tipo: string;
} 