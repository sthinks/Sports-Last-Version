<?php

namespace Database\Seeders;

use App\Models\Club;
use App\Models\Event;
use Illuminate\Database\Seeder;

class ClubTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Club::factory()->count(50)->create();

        Club::factory()
            ->has(Event::factory()->count(3))
            ->create();
    }
}
