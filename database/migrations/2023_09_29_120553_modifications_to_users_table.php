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
        Schema::table('users', function (Blueprint $table) {
            $table->string('ref')->nullable()->after('iseligible');
            $table->string('referallinks')->nullable()->after('ref');
            $table->string('referallinks2')->nullable()->after('referallinks');
            $table->string('level2')->nullable()->after('referallinks2');
            $table->string('level3')->nullable()->after('level2');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['ref', 'referallinks', 'referallinks2', 'level2', 'level3']);
        });
    }
};
