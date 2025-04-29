<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    use HasFactory;

    protected $primaryKey = 'favorite_id';

    protected $fillable = [
        'user_id',
        'item_type',
        'tmdb_id',
    ];

    protected $casts = [
        'tmdb_id' => 'integer',
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
