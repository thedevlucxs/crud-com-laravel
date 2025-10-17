<?php

namespace App\Services;

use App\Models\Comment;

class CommentService
{
    /**
     * Lógica para criar um novo comentário.
     * @param array $data Dados já validados.
     */
    public function createComment(array $data): Comment
    {
        return Comment::create($data);
    }

    /**
     * Lógica para atualizar um comentário.
     * @param Comment $comment A instância a ser atualizada.
     * @param array $data Dados já validados.
     */
    public function updateComment(Comment $comment, array $data): Comment
    {
        $comment->update($data);
        return $comment;
    }

    /**
     * Lógica para apagar um comentário.
     * @param Comment $comment A instância a ser apagada.
     */
    public function deleteComment(Comment $comment): void
    {
        $comment->delete();
    }
}
