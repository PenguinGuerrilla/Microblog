<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(User::all(), 200);
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
            return response()->json([
                'message' => 'Usuário cadastrado com sucesso',
                'data' => $user
            ], 200);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Erro ao cadastrar usuário',
                'error' => $e
            ], 200);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::find($id);
        if ($user) {
            return response()->json([
                $user
            ], 200);
        } else {
            return response()->json([
                'message' => 'Usuário não encontrado'
            ], 404);
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
            return response()->json([
                'message' => 'Usuário atualizado com sucesso',
                'data' => $user
            ], 200);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Erro ao atualizar usuário',
                'error' => $e
            ], 500);
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
                return response()->json([
                    'message' => 'Usuário excluído com sucesso'
                ], 200);
            } catch (Exception $e) {
                DB::rollBack();
                return response()->json([
                    'message' => 'Erro ao excluir o usuário',
                    'error' => $e
                ], 500);
            }
        } else {
            return response()->json([
                'message' => 'Usuário não encontrado'
            ], 404);
        }
    }
}
