<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Series extends Model
{
    use HasFactory;

    protected $primaryKey = 'series_id';
    protected $table = 'series';

    protected $fillable = [
        'series_name',
        'synopsis',
        'release_year',
        'rating',
        'image_url',
        'trailer'
    ];

    /**
     * Relación con reviews
     *
     * @return void
     */
    public function reviews()
    {
        return $this->hasMany(Review::class, 'series_id');
    }

    /**
     * Relación con usuarios a través de favoritos
     *
     * @return void
     */
    public function favoriteByUsers()
    {
        return $this->belongsToMany(User::class, 'favorites', 'series_id', 'user_id')
                    ->withTimestamps();
    }
} 