<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;
use Illuminate\Support\Facades\Cookie;

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
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        // Obtener el token del usuario
        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        // Redirigir al frontend con el token en una cookie segura
        $response = redirect()->away(env('FRONTEND_URL'));
        
        // Configurar la cookie con el token
        $response->withCookie(cookie(
            'auth_token',
            $token,
            config('sanctum.expiration', 60 * 24 * 7), // 7 días por defecto
            '/',
            null,
            false, // Solo HTTPS
            false, // HttpOnly
            false,
            'Strict'
        ));

        return $response;
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Eliminar el token del usuario
        if ($request->user()) {
            $request->user()->tokens()->delete();
        }

        // Redirigir al frontend y eliminar la cookie
        $response = redirect()->away(env('FRONTEND_URL'));
        $response->withCookie(Cookie::forget('auth_token'));

        return $response;
    }
}
