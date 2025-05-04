<?php


namespace App\Http\Controllers\Api;


use App\Models\User;
use App\Http\Controllers\Controller;


use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rules;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;


class UserController extends Controller
{
    /**
     * List all users
     * @return JsonResponse
     */
    public function list(Request $request): JsonResponse
    {
        if (!$request->user()->is_admin) {
            return response()->json(['message' => 'You are not authorized to list users'], 403);
        }

        $users = User::all();
        return response()->json([
            'message' => 'Users listed successfully',
            'users' => $users
        ], 200);
    }


    /**
     * Create a user
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request): JsonResponse
    {
        if (!$request->user()->is_admin) {
            return response()->json(['message' => 'You are not authorized to create users'], 403);
        }

        $request->validate([
            'name'     => ['required', 'string', 'max:100'],
            'email'    => ['required', 'string', 'email', 'max:100', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'is_admin' => ['required', 'boolean'],
        ]);


        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'is_admin' => $request->is_admin,
        ]);


        return response()->json([
            'message' => 'User created successfully',
            'user' => $user
        ], 201);
    }


    /**
     * Update a user
     * @param Request $request
     * @param User $user
     * @return JsonResponse
     */
    public function update(Request $request, User $user): JsonResponse
    {
        if (!$request->user()->is_admin && $request->user()->id !== $user->id) {
            return response()->json(['message' => 'You are not authorized to update this user'], 403);
        }
        
        $request->validate([
            'name'     => ['required', 'string', 'max:100'],
            'email'    => ['required', 'string', 'email', 'max:100', 'unique:users,email,' . $user->id],
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
            'is_admin' => ['nullable', 'boolean'],
        ]);


        $user->update([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => $request->password ? Hash::make($request->password) : $user->password,
            'is_admin' => $request->is_admin ?? $user->is_admin,
        ]);


        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user
        ], 200);
    }


    /**
     * Delete a user
     * @param User $user
     * @return JsonResponse
     */
    public function delete(Request $request, User $user): JsonResponse
    {
        if (!$request->user()->is_admin && $request->user()->id !== $user->id) {
            return response()->json(['message' => 'You are not authorized to delete this user'], 403);
        }

        $user->delete();
        return response()->json([
            'message' => 'User deleted successfully',
            'user' => $user
        ], 200);
    }


    /**
     * Send a password reset link
     */
    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
        ]);


        // Enviaremos el enlace de restablecimiento de contraseña a este usuario
        $status = Password::sendResetLink(
            $request->only('email')
        );


        return $status == Password::RESET_LINK_SENT
            ? back()->with('status', __($status))
            : back()->withInput($request->only('email'))
                    ->withErrors(['email' => __($status)]);
    }


    /**
     * Reset the password
     */
    public function resetPassword(Request $request)
    {
        $request->validate([
            'token'    => 'required',
            'email'    => 'required|email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);


        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user) use ($request) {
                $user->forceFill([
                    'password'       => Hash::make($request->password),
                    'remember_token' => Str::random(60),
                ])->save();


                event(new PasswordReset($user));
            }
        );


        return $status == Password::PASSWORD_RESET
            ? redirect()->route('login')->with('status', __($status))
            : back()->withInput($request->only('email'))
                    ->withErrors(['email' => __($status)]);
    }
}
