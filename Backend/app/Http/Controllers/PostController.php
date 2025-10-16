<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function index()
    {
        return response()->json(Post::with('user')->get());
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'user_id' => 'required|exists:users,id',
            'thumb' => 'nullable|string|max:255',
        ]);
        $validatedData['slug'] = Str::slug($validatedData['title']);
        $post = Post::create($validatedData);
        return response()->json($post, 201);
    }

    public function show(string $id)
    {
        $post = Post::with('user', 'comments.user')->findOrFail($id);
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
