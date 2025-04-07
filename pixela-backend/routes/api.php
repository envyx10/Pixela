<?php

use App\Http\Controllers\Api\MovieController;
use App\Http\Controllers\Api\SeriesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Rutas de películas
Route::group(['controller' => MovieController::class], function () {
    Route::get('/movie/{movieId}', 'getMovieDetails'); #http GET http://localhost/api/movie/550
    Route::get('/movies/popular', 'getAllPopularMovies'); #http GET http://localhost/api/movies/popular
    Route::get('/movies/genre/{genreId}', 'getMovieByGenre'); #http GET http://localhost/api/movies/genre/28
    Route::get('/movies/now-playing', 'getMovieNowPlaying'); #http GET http://localhost/api/movies/now-playing
    Route::get('/movies/top-rated', 'getTopRatedMovies'); #http GET http://localhost/api/movies/top-rated
});

// Rutas de series
Route::group(['controller' => SeriesController::class], function () {
    Route::get('/series/{seriesId}', 'getSeriesDetails')->where('seriesId', '[0-9]+'); #http GET http://localhost/api/series/108978
    Route::get('/series/popular', 'getAllPopularSeries'); #http GET http://localhost/api/series/popular
    Route::get('/series/genre/{genreId}', 'getSeriesByGenre'); #http GET http://localhost/api/series/genre/10759
    Route::get('/series/on-the-air', 'getSeriesOnTheAir'); #http GET http://localhost/api/series/on-the-air
    Route::get('/series/top-rated', 'getTopRatedSeries'); #http GET http://localhost/api/series/top-rated
});

// Rutas de usuarios
