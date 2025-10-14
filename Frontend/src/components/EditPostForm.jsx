import React from "react";

function EditPostForm({ editingPost, setEditingPost, handleUpdatePost }) {
  return (
    <form onSubmit={handleUpdatePost} className="card">
      <h2>Editar Post</h2>
      <div className="form-group">
        <label>Título:</label>
        <input
          type="text"
          value={editingPost.title}
          onChange={(e) =>
            setEditingPost({
              ...editingPost,
              title: e.target.value,
            })
          }
        />
      </div>
      <div className="form-group">
        <label>Conteúdo:</label>
        <textarea
          value={editingPost.content}
          onChange={(e) =>
            setEditingPost({
              ...editingPost,
              content: e.target.value,
            })
          }
        />
      </div>
      <button type="submit">Atualizar Post</button>
      <button
        type="button"
        className="button-secondary"
        onClick={() => setEditingPost(null)}
      >
        Cancelar
      </button>
    </form>
  );
}

export default EditPostForm;
