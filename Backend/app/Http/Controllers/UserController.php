<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Services\UserService;

class UserController extends Controller
{
    protected readonly UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = $this->userService->getAllUsers();
        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $userData = $request->only(['firstName', 'lastName', 'email', 'password']);
        $user = $this->userService->createUser($userData);
        if (!$user) {
            return response()->json(['message' => 'Error created'], 500);
        }

        return response()->json($user, 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->all();
        $updated = $this->userService->updateUser($id, $data);
        if ($updated) {
            $user = $this->userService->findUserById($id);
            return response()->json($user);
        }

        return response()->json(['message' => 'Error while updating'], 500);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->userService ->deleteUser($id);
        return response()->json(null, 204);
    }



    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = $this->userService->findUserById($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        return response()->json($user);
    }

}
