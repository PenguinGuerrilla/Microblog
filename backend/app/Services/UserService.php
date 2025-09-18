<?php

namespace App\Services;

use App\Models\Post;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;

class UserService
{
    public function storeUser($data)
    {
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
    public function getUser($id)
    {
        $user = User::findOrFail($id);
        return $user;
    }

    public function getAllUsers(){
        return User::all();
    }
    public function updateUser($data, $id)
    {
        $user = User::findOrFail($id);
        if (auth()->user()->id != $user) {
            throw new Exception('Só é possível editar o seu usuário');
        }
        DB::beginTransaction();
        try {
            $user->update($data);
            DB::commit();
            return $user;
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception($e->getMessage());
        }
    }
    public function deleteUser($id)
    {
        $user = User::find($id);
        if (auth()->user()->id != $user) {
            throw new Exception('Só é possível excluír o seu usuário');
        }
        if ($user) {
            DB::beginTransaction();
            try {
                $user->delete();
                DB::commit();
                return true;
            } catch (Exception $e) {
                DB::rollBack();
                throw new Exception($e->getMessage());
            }
        } else {
            throw new Exception('Usuário não encontrado');
        }
    }
}
