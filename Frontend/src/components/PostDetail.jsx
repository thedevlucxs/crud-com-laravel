import React from "react";
import CommentSection from "./CommentSection";

function PostDetail({
  post,
  authUser,
  token,
  handleEditPost,
  handleCreateComment,
  handleBackToList,
  newComment,
  setNewComment,
}) {
  return (
    <div className="post-detail-view">
      <div className="card">
        <div className="post-detail-header">
          <button onClick={handleBackToList} className="button-secondary">
            &larr; Voltar para todos os posts
          </button>

          {token && authUser && post.user_id === authUser.id && (
            <button onClick={() => handleEditPost(post)}>Editar</button>
          )}
        </div>

        <div className="post-item post-detail-content">
          <h2>{post.title}</h2>
          <p>
            <strong>Autor:</strong> {post.user.firstName} {post.user.lastName}
          </p>
          <hr />
          <p>{post.content}</p>
        </div>

        <CommentSection
          comments={post.comments}
          token={token}
          handleCreateComment={handleCreateComment}
          newComment={newComment}
          setNewComment={setNewComment}
        />
      </div>
    </div>
  );
}
export default PostDetail;
