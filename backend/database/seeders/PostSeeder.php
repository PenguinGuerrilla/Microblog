<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $post3 = new Post();
        $post3->user_id = 1;
        $post3->conteudo = "Hmmm... Talvez eu deva postar uma imagem hoje!";
        $post3->publico = true;
        $post3->save();
        $post1 = new Post();
        $post1->user_id = 2;
        $post1->conteudo = "Estou fazendo um post privado pra dizer que ainda não criei um Gravatar.";
        $post1->publico = false;
        $post1->save();
        $post2 = new Post();
        $post2->user_id = 3;
        $post2->conteudo = "Estou fazendo um post público pra dizer que já possuo um Gravatar!";
        $post2->publico = true;
        $post2->save();
    }
}
