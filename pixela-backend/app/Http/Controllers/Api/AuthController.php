<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Método para autenticar al usuario
     *
     * @param Request $request
     * @return void
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            if ($request->expectsJson()) {
                throw ValidationException::withMessages([
                    'email' => ['The provided credentials are incorrect.'],
                ]);
            }
            return back()->withErrors([
                'email' => 'Las credenciales proporcionadas son incorrectas.',
            ]);
        }

        // Autenticar al usuario usando el sistema de sesiones de Laravel
        Auth::login($user);

        if ($request->expectsJson()) {
            return response()->json([
                'user' => $user,
                'is_admin' => $user->is_admin,
            ]);
        }

        // Para solicitudes de formulario HTML, redireccionar al frontend
        return redirect()->away(env('FRONTEND_URL'));
    }

    /**
     * Método para cerrar la sesión del usuario
     *
     * @param Request $request
     * @return void
     */
    public function logout(Request $request)
    {
        // Cerrar la sesión
        Auth::logout();
        
        // Invalidar la sesión y regenerar el token CSRF
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        if ($request->expectsJson()) {
            return response()->json(['message' => 'Logged out successfully']);
        }

        // Para solicitudes de formulario HTML
        return redirect()->away(env('FRONTEND_URL'));
    }

    /**
     * Método para obtener el usuario autenticado
     *
     * @param Request $request
     * @return void
     */
    public function user(Request $request)
    {
        if (Auth::check()) {
            $user = Auth::user();
            return response()->json([
                'user' => $user,
                'is_admin' => $user->is_admin
            ]);
        }
        
        return response()->json(['message' => 'Unauthenticated'], 401);
    }

    /**
     * Método para verificar si el usuario es administrador
     *
     * @param Request $request
     * @return void
     */
    public function isAdmin(Request $request)
    {
        if (Auth::check()) {
            return response()->json(['is_admin' => Auth::user()->is_admin]);
        }
        
        return response()->json(['message' => 'Unauthenticated'], 401);
    }

    /**
     * Método específico para manejar logout desde el frontend con redirección web
     *
     * @param Request $request
     * @return void
     */
    public function webLogout(Request $request)
    {
        // Cerrar la sesión
        Auth::guard('web')->logout();
        
        // Invalidar la sesión y regenerar el token CSRF
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        
        // Redirigir al login de Laravel con cabeceras para evitar caché
        return redirect('/login')
            ->header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
            ->header('Pragma', 'no-cache')
            ->header('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT');
    }
} 