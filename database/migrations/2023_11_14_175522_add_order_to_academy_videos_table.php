<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('academy_videos', function (Blueprint $table) {
            $table->unsignedInteger('order')->after('length')->nullable();
        });

        // Set initial order values for existing rows
        $modules = DB::table('academy_videos')->select('academy_module_id')->distinct()->get();

        foreach ($modules as $module) {
            $moduleVideos = DB::table('academy_videos')
                ->where('academy_module_id', $module->academy_module_id)
                ->orderBy('created_at') // Adjust the column to order by
                ->get();

            $order = 1;

            foreach ($moduleVideos as $video) {
                DB::table('academy_videos')
                    ->where('id', $video->id)
                    ->update(['order' => $order++]);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('academy_videos', function (Blueprint $table) {
            $table->dropColumn('order');
        });
    }
};
