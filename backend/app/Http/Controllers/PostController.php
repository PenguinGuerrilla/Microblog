<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostStoreRequest;
use App\Http\Requests\PostUpdateRequest;
use App\Models\Post;
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
        return ApiResponse::success(Post::with('user')->where('publico', true)->orderByDesc('created_at')->get());
    }

    public function index()
    {
        try {
            if (auth()->user())
                return ApiResponse::success(Post::with('user')->orderByDesc('created_at')->get());
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
        // dd($data['user_id']);
        if ($data['user_id'] != auth()->user()->id)
            return ApiResponse::error("Erro ao cadastrar post");
        DB::beginTransaction();
        try {
            $post = Post::create($data);
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
