<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Cookie;

class AuthController extends Controller
{
    /**
     * Devuelve el usuario autenticado
     */
    public function user(Request $request): JsonResponse
    {
        return response()->json($request->user());
    }

    /**
     * Logout: borra token y cookie.
     */
    public function logout(Request $request): JsonResponse
    {
        // Revoca todos los tokens de API
        if ($user = $request->user()) {
            $user->tokens()->delete();
        }

        // Invalida la sesión actual
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Limpia la cookie de sesión
        Cookie::queue(Cookie::forget('pixela_session'));

        return response()
            ->json([
                'data' => ['message' => 'Sesión cerrada.'],
                'meta' => ['timestamp' => now()],
            ], 200);
    }
}
