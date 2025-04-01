<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('series', function (Blueprint $table) {
            $table->id('series_id');
            $table->string('series_name');
            $table->text('synopsis');
            $table->year('release_year');
            $table->decimal('rating', 3, 1)->nullable();
            $table->string('image_url')->nullable();
            $table->string('trailer')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('series');
    }
}; 