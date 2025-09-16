<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// AUTH ROUTES
Route::middleware('auth:sanctum')->group(function (){
    Route::apiResource('users', UserController::class);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('posts',PostController::class);
});

// GUEST ROUTES
Route::get('/public-posts',[PostController::class, 'publicPosts']);
Route::post('register',[AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
