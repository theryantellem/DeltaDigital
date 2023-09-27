<?php

namespace Database\Factories;

use App\Models\Schedule;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class VideoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = $this->faker->randomElement(['favorite', 'recorded', null]);

        return [
            'uuid' => Str::orderedUuid(),
            'schedule_id' => Schedule::inRandomOrder()->first()->id,
            'title' => $this->faker->sentence(2),
            'type' => $type,
            'video_file' => 'some links to file',
        ];
    }
}
