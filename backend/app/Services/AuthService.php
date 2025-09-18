<?php

namespace App\Services;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AuthService{
    public function login($data): array{
        $email = $data['email'];
        $password = $data['password'];

        $attempt = auth()->attempt(['email' => $email, 'password' => $password]);
        if (!$attempt) {
            throw new Exception("Usuário não autenticado");
        }
        $user = auth()->user();
        $token = $user->createToken($user->name, ['*'], now()->addHour())->plainTextToken;
        $loggedUser = [
            'user' => $user,
            'token' => $token
        ];
        return $loggedUser; 
    }

    public function register($data){
        DB::beginTransaction();
        try {
            $user = User::create($data);
            DB::commit();
            return $user;
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception($e->getMessage());
        }
    }

    public function logout(Request $request){
        $request->user()->tokens()->delete();
    }
}