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
        Schema::create('academy_videos', function (Blueprint $table) {
            $table->id();
            $table->string('uuid');
            $table->foreignId('academy_module_id')->references('id')->on('academy_modules')->onDelete('cascade');
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('video_file');
            $table->string('length');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('academy_videos');
    }
};
