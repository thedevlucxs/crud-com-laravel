<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    /**
     * Handle a login request to the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        Log::info('--- Nova Tentativa de Login ---');
        log::info('Email recebido: ' . $request->email);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            Log::error('RESULTADO: Utilizador não encontrado na base de dados.');
        } else {
            Log::info('RESULTADO: Utilizador encontrado. ID:' . $user->id);
            Log::info('Hash na BD: ' . $user->password);

        if (Hash::check($request->password, $user->password)) {
            Log::info('VERIFICAÇÃO DA SENHA: SUCESSO.');
        } else {
            Log::error('VERIFICAÇÃO DA SENHA: FALHA. A senha fornecida não corresponde ao hash.');
        }
    }

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['As credenciais fornecidas estão incorretas.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ]);
    }
    public function logout(Request $request)
    {
        // Revoga o token que foi usado para autenticar a requisição atual
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logout realizado com sucesso']);
    }
}
