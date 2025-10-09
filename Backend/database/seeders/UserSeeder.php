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
        // Cria o seu utilizador de teste principal para o login
        User::factory()->create([
            'firstName' => 'Lucas',
            'lastName' => 'Developer',
            'email' => 'lucas@gmail.com',
            'password' => Hash::make('123456'), // A senha será '123456'
        ]);

        // Cria mais 10 utilizadores aleatórios
        User::factory(10)->create();
    }
}
