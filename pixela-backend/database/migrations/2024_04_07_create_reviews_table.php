<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id('review_id');
            $table->enum('item_type', ['movie', 'series']);
            $table->unsignedBigInteger('tmdb_id');
            $table->integer('rating')->unsigned();
            $table->text('review')->nullable();
            $table->timestamp('review_date')->useCurrent();
            $table->timestamps();

            $table->index('tmdb_id');
            $table->index('item_type');
            $table->index('rating');
            
            $table->foreignId('user_id')
                ->references('user_id')
                ->on('users')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->unique(['user_id', 'item_type', 'tmdb_id'], 'reviews_unique_item');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reviews');
    }
}; 