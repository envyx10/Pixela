/**
 * TMDB Image Configuration Constants
 * Centraliza todas las URLs y configuraciones relacionadas con imágenes de TMDB
 *
 * @see https://developers.themoviedb.org/3/getting-started/images
 */

export const TMDB_IMAGE_CONFIG = {
  BASE_URL: "https://image.tmdb.org/t/p",
  SIZES: {
    POSTER: {
      W92: "w92",
      W154: "w154",
      W185: "w185",
      W342: "w342",
      W500: "w500",
      W780: "w780",
      ORIGINAL: "original",
    },
    BACKDROP: {
      W300: "w300",
      W780: "w780",
      W1280: "w1280",
      ORIGINAL: "original",
    },
    PROFILE: {
      W45: "w45",
      W185: "w185",
      H632: "h632",
      ORIGINAL: "original",
    },
  },
} as const;

/**
 * Tamaños por defecto para diferentes tipos de imágenes
 */
export const DEFAULT_IMAGE_SIZES = {
  POSTER: TMDB_IMAGE_CONFIG.SIZES.POSTER.W500,
  BACKDROP: TMDB_IMAGE_CONFIG.SIZES.BACKDROP.W1280,
  PROFILE: TMDB_IMAGE_CONFIG.SIZES.PROFILE.W185,
} as const;

/**
 * Construye URL completa para imagen de TMDB
 *
 * @param path - Ruta de la imagen (e.g., "/abc123.jpg")
 * @param size - Tamaño de imagen (default: w500)
 * @returns URL completa o string vacío si path es inválido
 *
 * @example
 * buildTmdbImageUrl('/abc.jpg', 'w500')
 * // => 'https://image.tmdb.org/t/p/w500/abc.jpg'
 */
export function buildTmdbImageUrl(
  path: string | null | undefined,
  size: string = DEFAULT_IMAGE_SIZES.POSTER,
): string {
  if (!path) return "";

  // Si la ruta ya es una URL completa, retornarla tal cual
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // Asegurar que la ruta comience con "/"
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${TMDB_IMAGE_CONFIG.BASE_URL}/${size}${normalizedPath}`;
}

/**
 * Helpers específicos para cada tipo de imagen
 */
export const tmdbImageHelpers = {
  /**
   * Construye URL para poster de película/serie
   */
  poster: (
    path: string | null | undefined,
    size: string = DEFAULT_IMAGE_SIZES.POSTER,
  ) => buildTmdbImageUrl(path, size),

  /**
   * Construye URL para backdrop (fondo)
   */
  backdrop: (
    path: string | null | undefined,
    size: string = DEFAULT_IMAGE_SIZES.BACKDROP,
  ) => buildTmdbImageUrl(path, size),

  /**
   * Construye URL para perfil de persona
   */
  profile: (
    path: string | null | undefined,
    size: string = DEFAULT_IMAGE_SIZES.PROFILE,
  ) => buildTmdbImageUrl(path, size),
} as const;

/**
 * Placeholder image cuando no hay imagen disponible
 */
export const TMDB_PLACEHOLDER = {
  POSTER: "https://via.placeholder.com/500x750/1a1a1a/666666?text=Sin+Imagen",
  BACKDROP:
    "https://via.placeholder.com/1280x720/1a1a1a/666666?text=Sin+Imagen",
  PROFILE: "https://via.placeholder.com/185x278/1a1a1a/666666?text=Sin+Foto",
} as const;
