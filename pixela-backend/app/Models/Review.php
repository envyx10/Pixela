<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Review extends Model
{
    use HasFactory;

    protected $primaryKey = 'review_id';
    protected $table = 'reviews';
    public $timestamps = false;

    protected $fillable = [
        'review',
        'user_rating',
        'review_date',
        'user_id',
        'series_id',
        'movie_id'
    ];

    protected $casts = [
        'review_date' => 'datetime',
        'user_rating' => 'decimal:1'
    ];

    /**
     * Relación con usuario
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Relación con serie
     */
    public function series(): BelongsTo
    {
        return $this->belongsTo(Series::class, 'series_id');
    }

    /**
     * Relación con película
     */
    public function movie(): BelongsTo
    {
        return $this->belongsTo(Movie::class, 'movie_id');
    }
} 