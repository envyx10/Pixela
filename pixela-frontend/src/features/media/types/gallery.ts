export interface Wallpaper {
  file_path: string;
  width: number;
  height: number;
  aspect_ratio: number;
  vote_average: number;
  vote_count: number;
}

export interface WallpapersResponse {
  backdrops: Wallpaper[];
  posters: Wallpaper[];
  logos: Wallpaper[];
}

export interface WallpapersProps {
  mediaId: number;
  mediaType: 'movie' | 'series';
} 