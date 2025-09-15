<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\User;
use App\Services\ApiResponse;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use function PHPUnit\Framework\returnArgument;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ApiResponse::success(User::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserStoreRequest $request)
    {
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

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::find($id);
        if ($user) {
            return ApiResponse::success($user);
        } else {
            return ApiResponse::error('Usuário não encontrado');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $id,
            'password' => 'required|confirmed'
        ]);
        DB::beginTransaction();
        try {
            $user = User::find($id);
            $user->update($data);
            DB::commit();
            return ApiResponse::success([
                'message' => 'Usuário atualizado com sucesso',
                'data' => $user
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            return ApiResponse::error('Erro ao atualizar usuário');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);
        if ($user) {
            DB::beginTransaction();
            try {
                $user->delete();
                DB::commit();
                return ApiResponse::success('Usuário excluído com sucesso');
            } catch (Exception $e) {
                DB::rollBack();
                return ApiResponse::error('Erro ao excluir o usuário');
            }
        } else {
            return response()->json([
                'message' => 'Usuário não encontrado'
            ], 404);
        }
    }
}
