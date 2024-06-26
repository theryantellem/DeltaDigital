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
        Schema::create('academy_ratings', function (Blueprint $table) {
            $table->id();
            $table->string('uuid');
            $table->string('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');;
            $table->foreignId('academy_id')->references('id')->on('academies')->onDelete('cascade');
            $table->integer('stars');
            $table->string('comment');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('academy_ratings');
    }
};
