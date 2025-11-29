// Genre Mapping - migrated from Laravel GenreMappingTrait.php

import { ContentType, GenreMapping } from './tmdb.types';

/**
 * Mapping of genre names to their corresponding IDs for movies and TV shows
 */
const GENRE_MAPPING: Record<string, GenreMapping> = {
  action: { movie: 28, tv: 10759 },
  adventure: { movie: 12, tv: 10759 },
  animation: { movie: 16, tv: 16 },
  comedy: { movie: 35, tv: 35 },
  crime: { movie: 80, tv: 80 },
  documentary: { movie: 99, tv: 99 },
  drama: { movie: 18, tv: 18 },
  family: { movie: 10751, tv: 10751 },
  fantasy: { movie: 14, tv: 10765 },
  history: { movie: 36, tv: 36 },
  horror: { movie: 27, tv: 27 },
  music: { movie: 10402, tv: 10402 },
  mystery: { movie: 9648, tv: 9648 },
  romance: { movie: 10749, tv: 10749 },
  science_fiction: { movie: 878, tv: 10765 },
  tv_movie: { movie: 10770, tv: 10770 },
  thriller: { movie: 53, tv: 53 },
  war: { movie: 10752, tv: 10752 },
  western: { movie: 37, tv: 37 },
};

const CONTENT_TYPES: ContentType[] = ['movie', 'tv'];

/**
 * Get the genre ID for the specified content type
 * @param genreName - Name of the genre (e.g: 'action', 'drama')
 * @param type - Content type ('movie' or 'tv')
 * @returns Genre ID or null if not found
 */
export function getGenreId(genreName: string, type: ContentType): number | null {
  if (!CONTENT_TYPES.includes(type)) {
    throw new Error("Invalid content type. Must be 'movie' or 'tv'");
  }

  const normalizedName = genreName.toLowerCase();
  const mapping = GENRE_MAPPING[normalizedName];
  return mapping?.[type] ?? null;
}

/**
 * Convert a genre ID from one type to another
 * @param genreId - Genre ID to convert
 * @param fromType - Source type ('movie' or 'tv')
 * @param toType - Destination type ('movie' or 'tv')
 * @returns Converted genre ID or null if not found
 */
export function convertGenreId(
  genreId: number,
  fromType: ContentType,
  toType: ContentType
): number | null {
  if (!CONTENT_TYPES.includes(fromType) || !CONTENT_TYPES.includes(toType)) {
    throw new Error("Invalid content types. Must be 'movie' or 'tv'");
  }

  for (const mapping of Object.values(GENRE_MAPPING)) {
    if (mapping[fromType] === genreId) {
      return mapping[toType];
    }
  }

  return null;
}
