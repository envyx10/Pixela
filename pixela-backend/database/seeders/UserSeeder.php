<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
    */
    public function run(): void
    {
        User::insert([
            [
                'user_name' => 'Pablo',
                'email' => 'pablo@pixela.com',
                'password' => Hash::make('pixela123'),
                'is_admin' => true,
                'registration_date' => now()
            ],
            [
                'user_name' => 'Ruyi',
                'email' => 'Ruyi@pixela.com',
                'password' => Hash::make('pixela123'),
                'is_admin' => true,
                'registration_date' => now()
            ]
        ]);
    }
} 