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
        Schema::table('videos', function (Blueprint $table) {
            $table->unsignedInteger('order')->after('video_file')->nullable();
        });

        // Set initial order values for existing rows
        $schedules = DB::table('videos')->select('schedule_id')->distinct()->get();

        foreach ($schedules as $schedule) {
            $scheduleVideos = DB::table('videos')
                ->where('schedule_id', $schedule->schedule_id)
                ->orderBy('created_at') // Adjust the column to order by
                ->get();

            $order = 1;

            foreach ($scheduleVideos as $video) {
                DB::table('videos')
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
        Schema::table('videos', function (Blueprint $table) {
            $table->dropColumn('order');
        });
    }
};
