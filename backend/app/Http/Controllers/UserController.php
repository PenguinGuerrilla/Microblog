<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\User;
use App\Services\ApiResponse;
use App\Services\UserService;
use Exception;

class UserController extends Controller
{


    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ApiResponse::success($this->userService->getAllUsers());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserStoreRequest $request)
    {
        $data = $request->validated();
        try {
            $user = $this->userService->storeUser($data);
            return ApiResponse::success($user);
        } catch (Exception $e) {
            return ApiResponse::error('Erro ao cadastrar usuário');
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $user = $this->userService->getUser($id);
            return ApiResponse::success($user);
        } catch (Exception $e) {
            return ApiResponse::error('Usuário não encontrado');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserUpdateRequest $request, string $id)
    {
        $data = $request->validated();
        try {
            $user = $this->userService->updateUser($data, $id);
            return ApiResponse::success([
                'message' => 'Usuário atualizado com sucesso',
                'data' => $user
            ]);
        } catch (Exception $e) {
            return ApiResponse::error('Erro ao atualizar usuário');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $this->userService->deleteUser($id);
            return ApiResponse::success('Usuário excluído com sucesso');
        } catch (Exception $e) {
            return ApiResponse::error('Erro ao excluir o usuário');

        }
    }
}
