<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    use HasFactory;

    protected $table = 'favorites';
    protected $primaryKey = 'favorite_id';

    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'item_type',
        'tmdb_id'
    ];

    // Relación con usuario
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}