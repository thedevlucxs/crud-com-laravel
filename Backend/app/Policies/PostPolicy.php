<?php

namespace App\Policies;

use App\Models\Post;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\Log;

class PostPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Post $post): bool
    {   
        Log::info("Authorizing update: User ID {$user->id}, Post User ID {$post->user_id}");
        return $user->id === $post->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Post $post): bool
    {
        Log::info("Authorizing delete: User ID {$user->id}, Post User ID {$post->user_id}");
        return $user->id === $post->user_id;
    }
}
