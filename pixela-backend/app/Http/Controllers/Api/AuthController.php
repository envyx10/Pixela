<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

/**
 * @OA\Tag(
 *     name="Auth",
 *     description="Authentication and session management endpoints"
 * )
 */
class AuthController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/user",
     *     summary="Get authenticated user",
     *     description="Returns information about the currently authenticated user",
     *     operationId="getAuthUser",
     *     tags={"Auth"},
     *     security={{ "sanctum": {} }},
     *     @OA\Response(
     *         response=200,
     *         description="User information retrieved successfully",
     *         @OA\JsonContent(ref="#/components/schemas/UserResponse")
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthenticated",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
     */
    public function user(Request $request): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => 'User information retrieved successfully',
            'user' => $request->user()
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/logout",
     *     summary="Logout",
     *     description="Logs out the current user, revokes all tokens and clears cookies",
     *     operationId="logout",
     *     tags={"Auth"},
     *     security={{ "sanctum": {} }},
     *     @OA\Response(
     *         response=200,
     *         description="Successfully logged out",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(
     *                 property="data",
     *                 type="object",
     *                 @OA\Property(property="message", type="string", example="Successfully logged out")
     *             ),
     *             @OA\Property(
     *                 property="meta",
     *                 type="object",
     *                 @OA\Property(property="timestamp", type="string", format="datetime")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthenticated",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
     *     )
     * )
     */
    public function logout(Request $request): JsonResponse
    {
        // Revoke all API tokens
        if ($user = $request->user()) {
            $user->tokens()->delete();
        }

        // Invalidate current session
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Clear session cookie
        Cookie::queue(Cookie::forget('pixela_session'));

        return response()
            ->json([
                'success' => true,
                'data' => ['message' => 'Successfully logged out'],
                'meta' => ['timestamp' => now()],
            ], 200);
    }
}
