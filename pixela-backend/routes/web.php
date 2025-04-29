<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

 Route::get('/', function () {
    return redirect()->route('login');
});

/*Route::get('/login', function () {
    return view('auth.login');
})->name('login'); */

/* Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');
 */
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/frontend-logout', [AuthController::class, 'webLogout']);

require __DIR__.'/auth.php';
