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
        Schema::create('academy_documents', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid');
            $table->string('academy_module_id');
            $table->string('name')->nullable();
            $table->longText('description')->nullable();
            $table->string('file_url');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('academy_documents');
    }
};
