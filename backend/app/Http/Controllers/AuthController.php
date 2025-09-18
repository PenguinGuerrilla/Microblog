<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\UserStoreRequest;
use App\Services\ApiResponse;
use App\Services\AuthService;
use Exception;
use Illuminate\Http\Request;

class AuthController extends Controller
{

    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function login(LoginRequest $request)
    {
        $data = $request->validated();
        try {
            $loggedUser = $this->authService->login($data);
            return ApiResponse::success($loggedUser);
        }catch(Exception $e){
            return ApiResponse::unauthorized();
        }
    }

    public function register(UserStoreRequest $request)
    {
        $data = $request->validated();
        try{
            $user = $this->authService->register($data);
            return ApiResponse::success($user);
        }catch(Exception $e){
            return ApiResponse::error("Erro ao cadastrar usuário.");
        }
    }

    public function logout(Request $request)
    {
        try {
            $this->authService->logout($request);
            return ApiResponse::success('Logout efetuado com sucesso.');
        } catch (Exception $e) {
            return ApiResponse::error('Erro ao efetuar o logout.');
        }
    }
}