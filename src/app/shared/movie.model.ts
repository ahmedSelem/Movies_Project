export interface Movie {

    title? : string;
    name? : string;
    overview? : string;
    id? : string;
    poster_path? : string;
    backdrop_path? : string;
    original_language? : string;
    release_date? : string;
    popularity? : string;
    vote_average? : string; 
    tagline? : string;
    
}

export interface MoviesResponse {
    results: Movie[]
}

