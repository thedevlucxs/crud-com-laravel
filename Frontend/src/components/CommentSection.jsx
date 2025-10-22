import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

function CommentSection({
  comments,
  token,
  handleCreateComment,
  newComment,
  setNewComment,
}) {
  return (
    <div className="comments-section w-full px-4">
      <h3>Comentários</h3>
      {comments && comments.length > 0 ? (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment.id} className="comment-item border-b pb-4 overflow-hidden">
              <p className="text-sm break-words">
                <strong className="font-medium">{comment.user.firstName}:</strong> {comment.comment}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Ainda não há comentários para este post.</p>
      )}

      {/* Formulário para adicionar novo comentário */}
      {token && (
        <form onSubmit={handleCreateComment} className="mt-6 space-y-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="comment">Seu comentário</Label>
            <Textarea
              id="comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escreva seu comentário..."
              required
            />
          </div>
          <Button type="submit">Comentar</Button>
        </form>
      )}
    </div>
  );
}
export default CommentSection;
