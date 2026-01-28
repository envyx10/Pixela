/**
 * Tipos compartidos para media (películas y series)
 */

export interface BaseMedia {
  id: number;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  original_language: string;
}

export interface Movie extends BaseMedia {
  title: string;
  original_title: string;
  release_date: string;
}

export interface Series extends BaseMedia {
  name: string;
  original_name: string;
  first_air_date: string;
}

export type Media = Movie | Series;

export const isMovie = (media: Media): media is Movie => {
  return 'title' in media;
};

export const isSeries = (media: Media): media is Series => {
  return 'name' in media;
};

export const getMediaTitle = (media: Media): string => {
  if (isMovie(media)) {
    return media.title;
  }
  return media.name;
};

export const getMediaReleaseDate = (media: Media): string => {
  if (isMovie(media)) {
    return media.release_date;
  }
  return media.first_air_date;
};
