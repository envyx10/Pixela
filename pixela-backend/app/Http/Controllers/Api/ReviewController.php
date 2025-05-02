<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    /**
     * Add a review for a movie or series
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function addReview(Request $request)
    {
        $data = $request->validate([
            'item_type' => 'required|in:movie,series',
            'tmdb_id'   => 'required|integer',
            'rating'    => 'required|integer|min:1|max:10',
            'review'   => 'nullable|string'
        ]);

        try {
            $review = Review::create([
                'user_id'   => Auth::user()->id,
                'item_type' => $data['item_type'],
                'tmdb_id'   => $data['tmdb_id'],
                'rating'    => $data['rating'],
                'review'   => $data['review'] ?? null,
            ]);

            return response()->json([
                'success' => true,
                'review'  => $review
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error adding review: ',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Lists all reviews of the user
     * 
     * @return JsonResponse
     */
    public function getReviews()
    {
        try {
            $reviews = Auth::user()->reviews;

            return response()->json([
                'success' => true,
                'data' => $reviews
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching reviews: ',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtain reviews by type (movie or series)
     * 
     * @param string $itemType
     * @param int $tmdbId
     * @return JsonResponse
     */
    public function getReviewsByType($itemType, $tmdbId)
    {
        try {
            $reviews = Auth::user()->reviews->where('item_type', $itemType)
                ->where('tmdb_id', $tmdbId)
                ->get();

            return response()->json([
                'success' => true,
                'data' => $reviews
            ]); 

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching reviews: ',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove a review
     * 
     * @param int $id
     * @return JsonResponse
     */
    public function deleteReview($id)
    {
        $review = Review::find($id);

        if (!$review) {
            return response()->json([
                'success' => false,
                'message' => 'Review not found'
            ], 404);
        }

        $review->delete();

        return response()->json([
            'success' => true,
            'message' => 'Review deleted successfully'
        ]);
    }
    
}
