<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $primaryKey = 'review_id';

    protected $fillable = [
        'user_id',
        'item_type',
        'tmdb_id',
        'rating',
        'review',
    ];

    protected $casts = [
        'tmdb_id' => 'integer',
        'rating' => 'integer',
    ];

    /**
     * Relation with the table users
     *
     * @return void
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

}
