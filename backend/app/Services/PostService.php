<?php

namespace App\Services;

use App\Models\Post;
use Exception;
use Illuminate\Support\Facades\DB;

class PostService
{
    public function getPublicPosts()
    {
        $posts = Post::with('user', 'images')->where('publico', true)->orderByDesc('created_at')->get();
        $posts->each(function ($post) {
            if ($post->images->isNotEmpty()) {
                $post->image = $post->images->first();
            }
            unset($post->images);
        });
        return $posts;
    }

    public function getUserPosts()
    {
        $posts = Post::with('user', 'images')->orderByDesc('created_at')->get();
        $posts->each(function ($post) {
            if ($post->images->isNotEmpty()) {
                $post->image = $post->images->first();
            }
            unset($post->images);
        });
        return $posts;
    }

    public function storePost(array $data)
    {
        if ($data['user_id'] != auth()->user()->id) {
            throw new Exception("Não autorizado a cadastrar post para outro usuário");
        }

        DB::beginTransaction();
        try {
            $post = Post::create($data);
            if (isset($data['imagem'])) {
                $file = $data['imagem'];
                $path = $file->store('images', 'public');
                $post->images()->create(["path" => $path]);
            }
            DB::commit();
            return $post;
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception("Erro ao cadastrar post: " . $e->getMessage());
        }
    }

    public function getPostsByUser(string $userId)
    {
        $query = Post::with('user', 'images')->where('user_id', $userId);

        if (!auth()->user() || auth()->user()->id != $userId) {
            $query->where('publico', true);
        }

        $posts = $query->orderByDesc('created_at')->get();

        $posts->each(function ($post) {
            if ($post->images->isNotEmpty()) {
                $post->image = $post->images->first();
            }
            unset($post->images);
        });

        return $posts;
    }

    public function updatePost(array $data, string $id)
    {
        $post = Post::find($id);

        if (!$post) {
            throw new Exception("Post não encontrado");
        }

        if ($data['user_id'] != auth()->user()->id || $post->user_id != auth()->user()->id) {
            throw new Exception("Não autorizado a editar este post");
        }
        DB::beginTransaction();
        try {
            $post->update($data);
            DB::commit();
            return $post;
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception("Erro ao editar post: " . $e->getMessage());
        }
    }

    public function destroyPost(string $id)
    {
        $post = Post::find($id);
        if (!$post) {
            throw new Exception("Post não encontrado");
        }
        if ($post->user_id != auth()->user()->id) {
            throw new Exception("Não autorizado a excluir este post");
        }

        DB::beginTransaction();
        try {
            $post->delete();
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception("Erro ao excluir post: " . $e->getMessage());
        }
    }
}
