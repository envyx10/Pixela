<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MovieController;
use App\Http\Controllers\Api\SeriesController;
use Illuminate\Support\Facades\Route;

// Public routes
/* Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']); */

// Private routes
Route::middleware('auth:sanctum')->group(function() {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

// Movie routes
Route::group([
    'controller' => MovieController::class, 
    'prefix' => 'movies'], function () {

    Route::get('/{movieId}', 'getMovieDetails')->where('movieId', '[0-9]+'); #http GET http://localhost/api/movies/550
    Route::get('/trending', 'getTrendingMovies'); #http GET http://localhost/api/movies/trending
    Route::get('/genre/{genreId}', 'getMovieByGenre'); #http GET http://localhost/api/movies/genre/28
    Route::get('/now-playing', 'getMovieNowPlaying'); #http GET http://localhost/api/movies/now-playing
    Route::get('/top-rated', 'getTopRatedMovies'); #http GET http://localhost/api/movies/top-rated
    Route::get('/{movieId}/cast', 'getMovieCast')->where('movieId', '[0-9]+'); #http GET http://localhost/api/movies/550/cast
    Route::get('/{movieId}/videos', 'getMovieVideos')->where('movieId', '[0-9]+'); #http GET http://localhost/api/movies/550/videos
    Route::get('/{movieId}/watch-providers', 'getMovieWatchProviders')->where('movieId', '[0-9]+'); #http GET http://localhost/api/movies/550/watch-providers
    Route::get('/{movieId}/creator', 'getMovieCreator')->where('movieId', '[0-9]+'); #http GET http://localhost/api/movies/550/creator
    Route::get('/{movieId}/images', 'getMovieImages')->where('movieId', '[0-9]+'); #http GET http://localhost/api/movies/550/images

});

// Series routes
Route::group([
    'controller' => SeriesController::class,
    'prefix' => 'series'], function () {

    Route::get('/{seriesId}', 'getSeriesDetails')->where('seriesId', '[0-9]+'); #http GET http://localhost/api/series/108978
    Route::get('/trending', 'getTrendingSeries'); #http GET http://localhost/api/series/trending
    Route::get('/genre/{genreId}', 'getSeriesByGenre'); #http GET http://localhost/api/series/genre/10759
    Route::get('/on-the-air', 'getSeriesOnTheAir'); #http GET http://localhost/api/series/on-the-air
    Route::get('/top-rated', 'getTopRatedSeries'); #http GET http://localhost/api/series/top-rated
    Route::get('/{seriesId}/cast', 'getSeriesCast')->where('seriesId', '[0-9]+'); #http GET http://localhost/api/series/108978/cast
    Route::get('/{seriesId}/videos', 'getSeriesVideos')->where('seriesId', '[0-9]+'); #http GET http://localhost/api/series/108978/videos
    Route::get('/{seriesId}/watch-providers', 'getSeriesWatchProviders')->where('seriesId', '[0-9]+'); #http GET http://localhost/api/series/108978/watch-providers
    
});
