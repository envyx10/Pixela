export interface SeriesResponse {
    success: boolean;
    data: TrendingSerie[];
}

export interface MoviesResponse {
    success: boolean;
    data: TrendingMovie[];
}

export interface TrendingSerie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    created_at: string;
    updated_at: string;
}

export interface TrendingMovie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    created_at: string;
    updated_at: string;
}   