<?php

namespace App\Services;

use App\Models\Post;
use Illuminate\Support\Str;

class PostService {
    public function getAllPosts(){
        return Post::with('user')->get();
    }

    public function findPostById(string $id){
        return Post::with('user', 'comments.user')->findOrFail($id);
    }

    public function createPost(array $data): Post{
        $data['slug'] = Str::slug($data['title']);
        return Post::create($data);
    }

    public function updatePost(Post $post, array $data): Post{
        if (isset($data['title'])) {
            $data['slug'] = Str::slug($data['title']);
        }
        $post->update($data);
        return $post;
    }

    public function deletePost(Post $post) : void{
        $post->delete();
    }
}
