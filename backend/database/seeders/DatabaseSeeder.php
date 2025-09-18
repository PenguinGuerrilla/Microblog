<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use DB;
use Exception;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::beginTransaction();
        try{
            $this->call( UserSeeder::class);
            $this->call( PostSeeder::class);
            DB::commit();
        }catch(Exception $e){
            DB::rollBack();
            throw new Exception("Erro ao popular base: ".$e);
        }
    }
}
