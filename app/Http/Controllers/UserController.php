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
        return view('users', ['users' => $users]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $userData = $request->only(['firstName', 'lastName', 'email', 'password']);
        $created = $this->userService->createUser($userData);
        if (!$created) {
            return redirect()->back()->with('message', 'Error created');
        }

        return redirect()->route('users.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->except(['_token', '_method']);
        $updated = $this->userService->updateUser($id, $data);
        if ($updated) {
            return redirect()->route('users.index');
        }

        return redirect()->back()->with('message', 'Error updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->userService ->deleteUser($id);
        return redirect()->route('users.index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('user_create');
    }


    /**
     * Display the specified resource.
     */
    public function show(user $user)
    {
        $user = $this->userService->findUserById($user->id);
        return view('user_show', ['user' => $user]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $user = $this->userService->findUserById($user->id);
        return view('user_edit', ['user' => $user]);

    }
}
