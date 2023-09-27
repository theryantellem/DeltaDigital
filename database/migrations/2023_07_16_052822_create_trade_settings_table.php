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
        Schema::create('trade_settings', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid');
            $table->foreignId('strategy_id')->index();
            $table->foreignId('market_id')->index();
            $table->unsignedBigInteger('first_buy_amount');
            $table->unsignedBigInteger('double_position');
            $table->unsignedBigInteger('margin_limit');
            $table->unsignedBigInteger('profit_ratio');
            $table->unsignedBigInteger('whole_ratio');
            $table->text('price_drop');
            $table->text('m_ratio');
            $table->unsignedBigInteger('profit_callback');
            $table->unsignedBigInteger('cycle')->nullable();
            $table->boolean('one_short')->default(true);
            $table->unsignedBigInteger('whole_stop');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trade_settings');
    }
};
