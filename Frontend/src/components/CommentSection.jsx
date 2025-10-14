import React from "react";

function CommentSection({
  comments,
  token,
  handleCreateComment,
  newComment,
  setNewComment,
}) {
  return (
    <div className="comments-section">
      <h3>Comentários</h3>
      {comments && comments.length > 0 ? (
        <ul className="comments-list">
          {comments.map((comment) => (
            <li key={comment.id} className="comment-item">
              <p>
                <strong>{comment.user.firstName}:</strong> {comment.comment}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Ainda não há comentários para este post.</p>
      )}

      {/* Formulário para adicionar novo comentário */}
      {token && (
        <form onSubmit={handleCreateComment} style={{ marginTop: "20px" }}>
          <div className="form-group">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escreva seu comentário..."
              required
              style={{ width: "100%", minHeight: "80px" }}
            />
          </div>
          <button type="submit">Comentar</button>
        </form>
      )}
    </div>
  );
}
export default CommentSection;
