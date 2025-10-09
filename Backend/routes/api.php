<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\Auth\LoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Rotas Públicas (qualquer um pode ver)
Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{id}', [PostController::class, 'show']);
Route::get('/comments', [CommentController::class, 'index']);
Route::get('/comments/{id}', [CommentController::class, 'show']);
Route::post('/login', [LoginController::class, 'login']);
Route::get('/posts', [PostController::class, 'index']);


// Rotas Protegidas (precisa de token para acessar)
Route::middleware('auth:sanctum')->group(function () {

    //Logout
    Route::post('/logout', [LoginController::class, 'logout']);
    // Posts
    Route::post('/posts', [PostController::class, 'store']);
    Route::put('/posts/{id}', [PostController::class, 'update']);
    Route::delete('/posts/{id}', [PostController::class, 'destroy']);

    // Comments
    Route::post('/comments', [CommentController::class, 'store']);
    Route::put('/comments/{id}', [CommentController::class, 'update']);
    Route::delete('/comments/{id}', [CommentController::class, 'destroy']);

    // Rota para obter dados do utilizador autenticado
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
