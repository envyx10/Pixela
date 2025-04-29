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
     * Registers a new user and issues a token.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function register(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'     => ['required', 'string', 'max:255'],
            'surname'  => ['required', 'string', 'max:255'],
            'email'    => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user = User::create([
            'name'     => $data['name'],
            'surname'  => $data['surname'],
            'email'    => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        $user->generateEmailVerificationToken();
        $user->sendEmailVerificationNotification();

        $plainTextToken = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'data' => [
                'message' => 'User registered successfully. Please verify your email.',
                'token'   => $plainTextToken,
            ],
            'meta' => [
                'timestamp' => now(),
            ],
        ], 201);
    }

    /**
     * Login: authenticates the user and issues a token.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email'    => ['bail', 'required', 'email', 'exists:users,email'],
            'password' => ['required', 'string'],
        ], [
            'email.exists' => __('auth.failed'),
        ]);

        if (! Auth::attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => [__('auth.failed')],
            ]);
        }

        $user = Auth::user();
        $user->tokens()->delete();
        $plainTextToken = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'data' => [
                'message' => __('auth.login_success'),
                'token'   => $plainTextToken,
            ],
            'meta' => [
                'timestamp' => now(),
            ],
        ], 200);
    }

    /**
     * Get the authenticated user.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    /**
     * Logout: revokes the API token and invalidates the session.
     *
     * @param Request $request
     * @return JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'data' => ['message' => 'Sesión cerrada'],
            'meta' => ['timestamp' => now()],
        ]);

    }

}
