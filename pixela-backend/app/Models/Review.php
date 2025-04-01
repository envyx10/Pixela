<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $primaryKey = 'review_id';
    protected $table = 'reviews';

    protected $fillable = [
        'review',
        'user_rating',
        'review_date',
        'user_id',
        'series_id'
    ];

    protected $casts = [
        'review_date' => 'datetime',
        'user_rating' => 'decimal:1'
    ];

    /**
     * Relación con usuario
     *
     * @return void
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Relación con serie
     *
     * @return void
     */
    public function series()
    {
        return $this->belongsTo(Series::class, 'series_id');
    }
} 