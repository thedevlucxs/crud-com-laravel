<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'content' => $this->content,
            'user' => [
                'firstName' => $this->user->firstName,
                'lastName' => $this->user->lastName,
            ],
            'comments' => $this->comments->map(function($comment) {
                return [
                    'id' => $comment->id,
                    'comment' => $comment->comment,
                    'user' => [
                        'firstName' => $comment->user->firstName,
                        'lastName' => $comment->user->lastName,
                    ],
                ];
            }),
        ];
    }
}
