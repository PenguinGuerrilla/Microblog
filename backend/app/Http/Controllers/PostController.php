<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostStoreRequest;
use App\Http\Requests\PostUpdateRequest;
use App\Services\ApiResponse;
use App\Services\PostService;
use Exception;

class PostController extends Controller
{
    protected $postService;

    public function __construct(PostService $postService)
    {
        $this->postService = $postService;
    }

    public function publicPosts()
    {
        try {
            $posts = $this->postService->getPublicPosts();
            return ApiResponse::success($posts);
        } catch (Exception $e) {
            return ApiResponse::error('Erro ao buscar os posts');
        }
    }

    public function index()
    {
        try {
            if (auth()->user()) {
                $posts = $this->postService->getUserPosts();
                return ApiResponse::success($posts);
            }
            return ApiResponse::error('Não autorizado');
        } catch (Exception $e) {
            return ApiResponse::error('Erro ao buscar os posts');
        }
    }

    public function store(PostStoreRequest $request)
    {
        try {
            $post = $this->postService->storePost($request->validated());
            return ApiResponse::success($post);
        } catch (Exception $e) {
            return ApiResponse::error("Erro ao cadastrar post");
        }
    }

    public function show(string $id)
    {
        try {
            $posts = $this->postService->getPostsByUser($id);
            return ApiResponse::success($posts);
        } catch (Exception $e) {
            return ApiResponse::error('Erro ao buscar os posts');
        }
    }

    public function update(PostUpdateRequest $request, string $id)
    {
        try {
            $post = $this->postService->updatePost($request->validated(), $id);
            return ApiResponse::success($post);
        } catch (Exception $e) {
            return ApiResponse::error("Erro ao atualizar post");
        }
    }

    public function destroy(string $id)
    {
        try {
            $this->postService->destroyPost($id);
            return ApiResponse::success("Post excluído com sucesso");
        } catch (Exception $e) {
            return ApiResponse::error("Erro ao excluir post");
        }
    }
}