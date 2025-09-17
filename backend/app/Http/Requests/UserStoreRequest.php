<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UserStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)
                    ->mixedCase()
                    ->letters()
                    ->numbers()
                    ->symbols()
                    // ->uncompromised(), //Ativar para verificação de comprometimento de senha, torna o cadastro mais demorado
            ]
        ];
    }

    public function messages(): array
    {
        return [
            'password.required' => 'A senha é obrigatória.',
            'password.confirmed' => 'A confirmação da senha não corresponde.',
            'password.min' => 'A senha deve ter no mínimo 8 caracteres.',
            'password.mixedCase' => 'A senha deve conter letras maiúsculas e minúsculas.',
            'password.letters' => 'A senha deve conter letras.',
            'password.numbers' => 'A senha deve conter números.',
            'password.symbols' => 'A senha deve conter pelo menos um caractere especial.',
            // 'password.uncompromised' => 'Esta senha foi comprometida em um vazamento de dados. Por favor, escolha outra senha.',
        ];
    }
}
