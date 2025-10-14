import React from "react";

function CreatePostForm({
  handleCreatePost,
  newPostTitle,
  setNewPostTitle,
  newPostContent,
  setNewPostContent,
}) {
  return (
    <form onSubmit={handleCreatePost} className="card">
      <h2>Criar Novo Post</h2>
      <div className="form-group">
        <label>Título:</label>
        <input
          type="text"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Conteúdo:</label>
        <textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        />
      </div>
      <button type="submit">Criar Post</button>
    </form>
  );
}

export default CreatePostForm;
