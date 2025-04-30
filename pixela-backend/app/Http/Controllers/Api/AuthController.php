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
     * Register a new user, issue token and set cookie.
     */
    /* public function register(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'     => ['required','string','max:255'],
            'surname'  => ['required','string','max:255'],
            'email'    => ['required','email','max:255','unique:users,email'],
            'password' => ['required','string','min:8','confirmed'],
        ]);

        $user = User::create([
            'name'     => $data['name'],
            'surname'  => $data['surname'],
            'email'    => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        $cookie = session()->getCookie();

        return response()
            ->json([
                'data' => [
                    'message' => 'User registered successfully.',
                ],
                'meta' => ['timestamp' => now()],
            ], 201)
            ->withCookie($cookie);
    } */

    /**
     * Login: authenticate, issue token and set cookie.
     */
    /* public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email'    => ['bail','required','email','exists:users,email'],
            'password' => ['required','string'],
        ], ['email.exists' => __('auth.failed')]);

        if (! Auth::attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => [__('auth.failed')],
            ]);
        }

        $user = Auth::user();
        // Revoca tokens previos
        $user->tokens()->delete();

        $cookie = session()->getCookie();

        return response()
            ->json([
                'data' => [
                    'message' => __('auth.login_success'),
                ],
                'meta' => ['timestamp' => now()],
            ], 200)
            ->withCookie($cookie);
    } */

    /**
     * Devuelve el usuario autenticado
     */
    public function user(Request $request): JsonResponse
    {
        //$cookie = session()->getCookie();

        return response()->json($request->user());
        //->withCookie($cookie);
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

        return response()
            ->json([
                'data' => ['message' => 'Sesión cerrada.'],
                'meta' => ['timestamp' => now()],
            ], 200);
    }
}
