<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\View\View;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): View
    {
        return view('auth.login');
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
    {
        $request->authenticate();
        $request->session()->regenerate();

        $user = Auth::user();
        
        // Recuperar la cookie de sesión
        $sessionCookie = session()->getCookie();

        // Crear un nuevo token de API
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()
            ->json([
                'user' => $user,
                'token' => $token,
                'redirect' => env('FRONTEND_URL'),
            ])
            ->withCookie($sessionCookie);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): JsonResponse
    {
        $user = $request->user();

        // Logout de la sesión web
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Eliminar la cookie de sesión
        $sessionCookie = session()->getCookie();

        // Eliminar el token de API
        if ($user) {
            $user->tokens()->delete();
        }

        return response()
            ->json([
                'message' => 'Logged out',
                'redirect' => env('FRONTEND_URL'),
            ])
            ->withoutCookie($sessionCookie)
            ->withoutCookie('XSRF-TOKEN');
    }
}
