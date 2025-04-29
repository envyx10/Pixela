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
                'surname' => 'Gil',
                'email' => 'pablo@pixela.com',
                'email_verified_at' => now(),
                'password' => Hash::make('admin123'),
                'is_admin' => true,
            ],
            [
                'name' => 'Ruyi',
                'surname' => 'Xia',
                'email' => 'ruyi@pixela.com',
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