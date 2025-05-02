<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

use App\Models\User;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        # Poblamos la tabla users con los usuarios que son admin
        $admins = [
            [
                'name' => 'Pablo',
                'email' => 'pablo@pixela.com',
                'email_verified_at' => now(),
                'password' => Hash::make('admin123'),
                'is_admin' => true,
            ],
            [
                'name' => 'Ruyi',
                'email' => 'ruyi@pixela.com',
                'photo_url' => 'https://i.pravatar.cc/150?img=24',
                'email_verified_at' => now(),
                'password' => Hash::make('admin123'),
                'is_admin' => true,
            ]
        ];

        foreach ($admins as $admin) {
            User::create($admin);
        }
    }
}