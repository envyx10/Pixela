<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MovieController;
use App\Http\Controllers\Api\SeriesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Rutas de autenticación
Route::prefix('auth')->group(function(){
    Route::post('login',   [AuthController::class,'login']);
    Route::post('logout',  [AuthController::class,'logout'])->middleware('auth:sanctum');
    Route::get('user',     [AuthController::class,'user'])->middleware('auth:sanctum');
  });
  
// Rutas de películas
Route::group([
    'controller' => MovieController::class, 
    'prefix' => 'movies'], function () {

    Route::get('/{movieId}', 'getMovieDetails')->where('movieId', '[0-9]+'); #http GET http://localhost/api/movies/550
    Route::get('/trending', 'getTrendingMovies'); #http GET http://localhost/api/movies/trending
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
