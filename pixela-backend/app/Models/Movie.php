<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Movie extends Model
{
    public $timestamps = false;
    
    protected $primaryKey = 'movie_id';
    protected $table = 'movies';

    protected $fillable = [
        'movie_name',
        'synopsis',
        'trailer',
        'imagen_url',
        'rating',
        'release_year'
    ];

    /**
     * Get the users that have favorited this movie
     */
    public function favoritedBy(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'movie_favorites', 'movie_id', 'user_id');
    }

    /**
     * Get the reviews for this movie
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class, 'movie_id');
    }
} 