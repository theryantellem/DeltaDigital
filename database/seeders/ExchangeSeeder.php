<?php

namespace Database\Seeders;

use App\Models\Exchange;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExchangeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $exchangeList = Exchange::EXCHANGE_LIST;

        foreach ($exchangeList as $item) {
            Exchange::create([
                'name' => $item['name'],
                'tag' => $item['tag'],
                'status' => $item['status']
            ]);
        }
    }
}
