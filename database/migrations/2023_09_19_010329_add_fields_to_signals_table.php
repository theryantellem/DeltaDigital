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
        Schema::table('signals', function (Blueprint $table) {
            $table->foreignId('category_id')->index()->after('admin_id');
            $table->boolean('is_updated')->default(false)->after('market_status');
            $table->bigInteger('percentage')->default(0)->after('target_price');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('signals', function (Blueprint $table) {
            $table->dropColumn(['category_id', 'is_updated', 'percentage']);
        });
    }
};
