<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostStoreRequest;
use App\Http\Requests\PostUpdateRequest;
use App\Models\Post;
use App\Models\PostImage;
use App\Services\ApiResponse;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function publicPosts()
    {
        $posts = Post::with('user', 'images')->where('publico', true)->orderByDesc('created_at')->get();
        $posts->each(function($post){
            if($post->images->isNotEmpty()){
                $post->image = $post->images->first();
            }
            unset($post->images);
        });
        return ApiResponse::success($posts);
    }

    public function index()
    {
        try {
            if (auth()->user()){
                $posts = Post::with('user', 'images')->orderByDesc('created_at')->get();
                $posts->each(function($post){
                    if($post->images->isNotEmpty()){
                        $post->image = $post->images->first();
                    }
                    unset($post->images);
                });
                return ApiResponse::success($posts);
            }
        } catch (Exception $e) {
            return ApiResponse::error('Erro ao buscar os posts: ' . $e);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PostStoreRequest $request)
    {
        $data = $request->validated();
        if ($data['user_id'] != auth()->user()->id)
            return ApiResponse::error("Erro ao cadastrar post");

        DB::beginTransaction();
        try {
            $post = Post::create($data);
            if($data['imagem']){
                $file = $data['imagem'];
                if($data['publico']){
                    $path = $file->store('images', 'public');
                }else{
                    $path = $file->store('images');
                }
                $post->images()->create(["path" => $path]);
            }
            DB::commit();
            return ApiResponse::success($post);
        } catch (Exception $e) {
            DB::rollBack();
            return ApiResponse::error("Erro ao cadastrar post");
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            if (auth()->user())
                return ApiResponse::success(Post::where('user_id', $id));
            else
                return ApiResponse::success(Post::where('publico', true)->where('user_id', $id));
        } catch (Exception $e) {
            return ApiResponse::error('Erro ao buscar os posts: ' . $e);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PostUpdateRequest $request, string $id)
    {
        $data = $request->validated();
        $post = Post::find($id);
        if ($data['user_id'] != auth()->user()->id || $post->user_id != auth()->user()->id)
            return ApiResponse::error("Erro ao editar post");
        DB::beginTransaction();
        try {
            $post->update($data);
            DB::commit();
            return ApiResponse::success($post);
        } catch (Exception $e) {
            DB::rollBack();
            return ApiResponse::error("Erro ao editar post");
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // dd(auth()->user()->id,$id);
        $post = Post::find($id);
        if ($post->user_id != auth()->user()->id)
            return ApiResponse::error("Erro ao excluir post");
        else {
            DB::beginTransaction();
            try {
                Post::find($id)->delete();
                DB::commit();
                return ApiResponse::success("Post excluído com sucesso");
            } catch (Exception $e) {
                DB::rollBack();
                return ApiResponse::error("Erro ao excluir post");
            }
        }
    }
}
