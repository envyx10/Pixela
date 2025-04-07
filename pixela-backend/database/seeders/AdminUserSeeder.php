<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Users;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $admins = [
            [
                'user_name' => 'Pablo',
                'email' => 'pablo@pixela.com',
                'password' => Hash::make('admin123'),
                'is_admin' => true,
            ],
            [
                'user_name' => 'Ruyi',
                'email' => 'ruyi@pixela.com',
                'password' => Hash::make('admin123'),
                'is_admin' => true,
            ]
        ];

        foreach ($admins as $admin) {
            Users::create($admin);
        }
    }
} 