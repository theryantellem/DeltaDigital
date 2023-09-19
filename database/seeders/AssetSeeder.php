<?php

namespace Database\Seeders;

use App\Models\Asset;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AssetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $file = public_path('/assets/cryptos.json');

        if (file_exists($file)) {

            // Read the contents of the file
            $data = file_get_contents($file);

            // Check if the file could be read
            if ($data !== false) {
                // Attempt to decode the JSON data
                $decodedData = json_decode($data);

                // Check if the JSON data could be decoded
                if ($decodedData !== null) {
                    foreach ($decodedData as $value) {
                        \App\Models\Asset::create([
                            'name' => $value->name,
                            'image' => $value->image,
                            'symbol' => $value->symbol,
                            'short_name' => $value->id
                        ]);
                    }
                }
            }
        }
    }
}
