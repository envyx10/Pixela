import { TrendingSerie, TrendingMovie } from "@/features/trending/type";

export interface DiscoverResponse {
    success: boolean;
    data: (TrendingSerie | TrendingMovie)[];
}

export type { TrendingSerie, TrendingMovie }; 