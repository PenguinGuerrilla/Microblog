<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\Models\User;
use App\Services\ApiResponse;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'password' => 'required'
        ]);

        $email = $request->email;
        $password = $request->password;

        $attempt = auth()->attempt(['email' => $email, 'password' => $password]);

        if (!$attempt) {
            return ApiResponse::unauthorized();
        }

        $user = auth()->user();
        $token = $user->createToken($user->name, ['*'], now()->addHour())->plainTextToken;

        return ApiResponse::success([
            'user' => $user->name,
            'email' => $user->email,
            'token' => $token
        ]);
    }

    public function register(UserStoreRequest $request){
        $data = $request->validated();
        DB::beginTransaction();
        try {
            $user = User::create($data);
            DB::commit();
            return ApiResponse::success($user);
        } catch (Exception $e) {
            DB::rollBack();
            return ApiResponse::error('Erro ao cadastrar usuário');
        }
    }

    public function logout(Request $request){
        $request->user()->tokens()->delete();
        return ApiResponse::success('Logout efetuado com sucesso.');
    }
}
