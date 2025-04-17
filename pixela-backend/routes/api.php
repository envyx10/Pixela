<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MovieController;
use App\Http\Controllers\Api\SeriesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Rutas de autenticación
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Rutas de películas
Route::group([
    'controller' => MovieController::class, 
    'prefix' => 'movies'], function () {

    Route::get('/{movieId}', 'getMovieDetails'); #http GET http://localhost/api/movies/550
    Route::get('/popular', 'getAllPopularMovies'); #http GET http://localhost/api/movies/popular
    Route::get('/genre/{genreId}', 'getMovieByGenre'); #http GET http://localhost/api/movies/genre/28
    Route::get('/now-playing', 'getMovieNowPlaying'); #http GET http://localhost/api/movies/now-playing
    Route::get('/top-rated', 'getTopRatedMovies'); #http GET http://localhost/api/movies/top-rated

});

// Rutas de series
Route::group([
    'controller' => SeriesController::class,
    'prefix' => 'series'], function () {

    Route::get('/{seriesId}', 'getSeriesDetails')->where('seriesId', '[0-9]+'); #http GET http://localhost/api/series/108978
    Route::get('/trending', 'getTrendingSeries'); #http GET http://localhost/api/series/trending
    Route::get('/genre/{genreId}', 'getSeriesByGenre'); #http GET http://localhost/api/series/genre/10759
    Route::get('/on-the-air', 'getSeriesOnTheAir'); #http GET http://localhost/api/series/on-the-air
    Route::get('/top-rated', 'getTopRatedSeries'); #http GET http://localhost/api/series/top-rated
    
});
