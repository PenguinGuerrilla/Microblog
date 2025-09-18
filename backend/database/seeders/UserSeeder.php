<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = new User();
        $user->name = 'Rachel da Silva';
        $user->email = "rachel@mail.com";
        $user->password = bcrypt('P4$$word');
        $user->save();
        $user1 = new User();
        $user1->name = 'João Ribeiro';
        $user1->email = "joao@ribeiro.com";
        $user1->password = bcrypt('P4$$word');
        $user1->save();
        $user2 = new User();
        $user2->name = 'Cristiano Ronaldo Santos Aveiro';
        $user2->email = "cabiwiy623@merumart.com";
        $user2->password = bcrypt('P4$$word');
        $user2->save();
        
    }
}
