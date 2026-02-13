import { BaseTrendingMedia } from "@/features/trending/types/base";

export interface WeekendMovie extends BaseTrendingMedia {
  release_date: string;
}

export interface WeekendSerie extends BaseTrendingMedia {
  first_air_date: string;
  name: string;
}
