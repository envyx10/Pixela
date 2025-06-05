/**
 * Imagen de fondo
 * @interface Wallpaper
 * @property {string} file_path - URL de la imagen
 * @property {number} width - Ancho de la imagen
 * @property {number} height - Alto de la imagen
 * @property {number} aspect_ratio - Relación de aspecto de la imagen
 * @property {number} vote_average - Puntuación promedio de la imagen
 * @property {number} vote_count - Cantidad de votos de la imagen
 */
export interface Wallpaper {
  file_path: string;
  width: number;
  height: number;
  aspect_ratio: number;
  vote_average: number;
  vote_count: number;
}

/**
 * Respuesta de las wallpapers
 * @interface WallpapersResponse
 * @property {Wallpaper[]} backdrops - Imágenes de fondo
 * @property {Wallpaper[]} posters - Imágenes de la película o serie
 * @property {Wallpaper[]} logos - Logos de la película o serie
 */
export interface WallpapersResponse {
  backdrops: Wallpaper[];
  posters: Wallpaper[];
  logos: Wallpaper[];
}

/**
 * Propiedades de las wallpapers
 * @interface WallpapersProps
 * @property {number} mediaId - ID de la película o serie
 * @property {string} mediaType - Tipo de película o serie
 */ 
export interface WallpapersProps {
  mediaId: number;
  mediaType: 'movie' | 'series';
} 