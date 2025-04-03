<?php

use App\Http\Controllers\Api\MovieController;
use App\Http\Controllers\Api\SeriesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// Rutas de películas
Route::get('/movie/{movieId}', [MovieController::class, 'getMovieDetails']); #http GET http://localhost/api/movie/550
Route::get('/movies', [MovieController::class, 'getAllPopularMovies']); #http GET http://localhost/api/movies

// Rutas de series
Route::get('/series/{seriesId}', [SeriesController::class, 'getSeriesDetails']); #http GET http://localhost/api/series/108978
Route::get('/series', [SeriesController::class, 'getAllPopularSeries']); #http GET http://localhost/api/series