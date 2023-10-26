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
        Schema::create('signals', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid');
            $table->foreignId('admin_id')->index();
            $table->string('asset_type');
            $table->string('order_type')->default('buy');
            $table->float('entry_price')->default(0.00);
            $table->float('stop_loss')->default(0.00);
            $table->float('target_price')->default(0.00);
            $table->text('comment')->nullable();
            $table->string('photo')->nullable();
            $table->string('chart_photo')->nullable();
            $table->string('status')->default("active");
            $table->string('market_status')->default("pending");
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('signals');
    }
};
