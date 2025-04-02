<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id('review_id');
            $table->text('review');
            $table->decimal('user_rating', 3, 1);
            $table->timestamp('review_date');

            $table->foreignId('user_id')->constrained('users', 'user_id')->onDelete('cascade');
            $table->foreignId('series_id')->nullable()->constrained('series', 'series_id')->onDelete('cascade');
            $table->foreignId('movie_id')->nullable()->constrained('movies', 'movie_id')->onDelete('cascade');
        });

        DB::statement(
        'ALTER TABLE reviews
        ADD CONSTRAINT check_review_type
        CHECK ((series_id IS NOT NULL AND movie_id IS NULL) 
        OR (series_id IS NULL AND movie_id IS NOT NULL))');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
}; 