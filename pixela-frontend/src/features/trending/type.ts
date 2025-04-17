export interface SeriesResponse {
    success: boolean;
    data: TrendingSerie[];
}

export interface TrendingSerie {
    id: number;
    title: string;
    poster_path: string;
    first_air_date: string;
    vote_average: number;
}   