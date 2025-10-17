<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Http\Requests\StorePostRequest;
use App\Services\PostService;
use App\Http\Resources\PostResource;

class PostController extends Controller
{
    protected readonly PostService $postService;

    public function __construct(PostService $postService){
        $this->postService = $postService;
    }

    public function index()
    {
        $posts = $this->postService->getAllPosts();
        return PostResource::collection($posts);
    }

    public function store(StorePostRequest $request)
    {
    $post = $this->postService->createPost($request->validated());
    return new PostResource($post);
    }

    public function show(string $id)
    {
        $post = $this->postService->findPostById($id);
        return response()->json($post);
    }

    public function update(Request $request, Post $post)
    {
        $this->authorize('update', $post);

        $validatedData = $request->validate([
            'title' => 'sometimes|string|max:255',
            'content' => 'sometimes|string',
        ]);

        if ($request->has('title')) {
            $validatedData['slug'] = Str::slug($validatedData['title']);
        }

        $post->update($validatedData);
        return response()->json($post);
    }

    /**
     * Remove the specified resource from storage.
     */

    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);

        $post->delete();
        return response()->json(null, 204);
    }
}
