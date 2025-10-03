<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Http\Request;

class UserService
{
    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function getAllUsers()
    {
        return $this->user->all();
    }

    public function createUser(array $data)
    {
        return $this->user->create([
            'firstName' => $data['firstName'],
            'lastName' => $data['lastName'],
            'email' => $data['email'],
            'password' => password_hash($data['password'], \PASSWORD_DEFAULT),
        ]);
    }

    public function updateUser(string $id, array $data)
    {
        return $this->user->where('id', $id)->update($data);
    }

    public function deleteUser(string $id)
    {
        return $this->user->where('id', $id)->delete();
    }

    public function findUserById(string $id)
    {
        return $this->user->find($id);
    }
}
