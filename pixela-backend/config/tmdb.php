<?php

return [
    'api_key' => env('TMDB_API_KEY'),
    'base_url' => rtrim(env('TMDB_BASE_URL', 'https://api.themoviedb.org/3'), '/'),
    'language' => 'es-ES',
    'timeout' => 10,
];
