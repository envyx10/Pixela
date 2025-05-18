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
use Illuminate\Validation\Rule;

/**
 * @OA\Tag(
 *     name="Users",
 *     description="User management and administration operations"
 * )
 */
class UserController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/users",
     *     summary="List users",
     *     description="Get the complete list of users (admin only)",
     *     operationId="listUsers",
     *     tags={"Users"},
     *     security={{ "sanctum": {} }},
     *     @OA\Response(
     *         response=200,
     *         description="Users list retrieved successfully",
     *         @OA\JsonContent(ref="#/components/schemas/UserListResponse")
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Not authorized to list users",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthenticated",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
     */
    public function list(Request $request): JsonResponse
    {
        if (!$request->user()->is_admin) {
            return response()->json(['message' => 'You are not authorized to list users'], 403);
        }

        $users = User::all()->map(function ($user) {
            return [
                'user_id'    => $user->user_id,
                'name'       => $user->name,
                'email'      => $user->email,
                'photo_url'  => $user->photo_url,
                'is_admin'   => $user->is_admin,
                'password'   => $user->password,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
            ];
        });

        return response()->json([
            'message' => 'Users listed successfully',
            'users' => $users
        ], 200);
    }

    /**
     * @OA\Post(
     *     path="/api/users",
     *     summary="Create user",
     *     description="Create a new user (admin only)",
     *     operationId="createUser",
     *     tags={"Users"},
     *     security={{ "sanctum": {} }},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/UserCreateRequest")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="User created successfully",
     *         @OA\JsonContent(ref="#/components/schemas/UserResponse")
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Not authorized to create users",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthenticated",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Invalid validation data",
     *         @OA\JsonContent(ref="#/components/schemas/ValidationErrorResponse")
     *     )
     * )
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
     * @OA\Put(
     *     path="/api/users/{user}",
     *     summary="Update user",
     *     description="Update an existing user (admin or account owner)",
     *     operationId="updateUser",
     *     tags={"Users"},
     *     security={{ "sanctum": {} }},
     *     @OA\Parameter(
     *         name="user",
     *         in="path",
     *         required=true,
     *         description="User ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/UserUpdateRequest")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User updated successfully",
     *         @OA\JsonContent(ref="#/components/schemas/UserResponse")
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Not authorized to update this user",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthenticated",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Invalid validation data",
     *         @OA\JsonContent(ref="#/components/schemas/ValidationErrorResponse")
     *     )
     * )
     */
    public function update(Request $request, User $user): JsonResponse
    {
        $authUser = $request->user();

        if (!$authUser->is_admin && $authUser->user_id !== $user->user_id) {
            return response()->json(['message' => 'You are not authorized to update this user'], 403);
        }

        $request->validate([
            'name'     => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', Rule::unique('users')->ignore($user->user_id, 'user_id')],
            'password' => ['nullable', Rules\Password::defaults()],
            'is_admin' => ['nullable', 'boolean'],
            'photo_url' => ['nullable', 'string'],
        ]);

        $user->update([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => $request->password ? Hash::make($request->password) : $user->password,
            'is_admin' => $request->is_admin ?? $user->is_admin,
            'photo_url' => $request->photo_url ?? $user->photo_url,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'User updated successfully',
            'user' => $user
        ], 200);
    }

    /**
     * @OA\Delete(
     *     path="/api/users/{user}",
     *     summary="Delete user",
     *     description="Delete a user (admin or account owner)",
     *     operationId="deleteUser",
     *     tags={"Users"},
     *     security={{ "sanctum": {} }},
     *     @OA\Parameter(
     *         name="user",
     *         in="path",
     *         required=true,
     *         description="User ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User deleted successfully",
     *         @OA\JsonContent(ref="#/components/schemas/UserResponse")
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Not authorized to delete this user",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthenticated",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
     */
    public function delete(Request $request, User $user): JsonResponse
    {
        if (!$request->user()->is_admin && $request->user()->user_id !== $user->user_id) {
            return response()->json(['message' => 'You are not authorized to delete this user'], 403);
        }

        $user->delete();
        return response()->json([
            'message' => 'User deleted successfully',
            'user' => $user
        ], 200);
    }
}
