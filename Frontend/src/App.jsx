import React, { useState, useEffect } from "react";
import axios from "axios";
import LoginForm from "./components/LoginForm";
import "./App.css";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    Accept: "application/json",
  },
});

function App() {
  // state variables
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [editingPost, setEditingPost] = useState(null);

  const [authUser, setAuthUser] = useState(null);

  const [selectedPost, setSelectedPost] = useState(null);

  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    //Criamos um AbortController para este "efeito"
    const controller = new AbortController();

    const fetchData = async (authToken) => {
      api.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
      try {
        //Passamos o "sinal" do controller para cada pedido axios
        const userResponse = await api.get("/user", {
          signal: controller.signal,
        });
        const postsResponse = await api.get("/posts", {
          signal: controller.signal,
        });

        setAuthUser(userResponse.data);
        setPosts(postsResponse.data);
      } catch (err) {
        // Quando o pedido é cancelado, o axios lança um erro.
        // Verificamos se o erro foi de cancelamento e, se for, ignora.
        if (err.name === "CanceledError") {
          console.log("Pedido cancelado com sucesso.");
        } else {
          // Se for outro tipo de erro, trata.
          console.error("Falha ao buscar dados:", err);
          setToken(null);
        }
      }
    };

    if (token) {
      localStorage.setItem("token", token);
      fetchData(token);
    } else {
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
      setAuthUser(null);
      setPosts([]);
    }

    // 3. A função de limpeza agora chama o método abort()
    return () => {
      console.log("Limpeza: abortando pedidos pendentes.");
      controller.abort();
    };
  }, [token]);

  const handleLoginSucess = (token, userData) => {
    localStorage.setItem("token", token);
    setToken(token);
    setAuthUser(userData);
  };

  const fetchPosts = async () => {
    setError("");
    try {
      const response = await api.get("/posts");
      setPosts(response.data);
    } catch (err) {
      setError("Failed to fetch posts. Maybe your token has expired.");
      console.error("Fetch posts error:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setToken(null);
      setPosts([]);
    }
  };

  const handleSelectPost = async (postId) => {
    setError("");
    try {
      const response = await api.get(`/posts/${postId}`);
      setSelectedPost(response.data);
    } catch (err) {
      setError("Failed to fetch post details.");
      console.error("Fetch post details error:", err);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setError("");
    if (!authUser) {
      setError("You must be logged in to create a post.");
      return;
    }
    try {
      const response = await api.post("/posts", {
        title: newPostTitle,
        content: newPostContent,
        user_id: authUser.id,
      });
      setPosts([...posts, response.data]);
      setNewPostTitle("");
      setNewPostContent("");
    } catch (err) {
      setError("Failed to create post.");
      console.error("Create post error:", err);
    }
  };

  const handleCreateComment = async (e) => {
    e.preventDefault();
    setError("");
    if (!authUser || !selectedPost) {
      setError("You must be logged in to comment.");
      return;
    }
    try {
      const response = await api.post(`/comments`, {
        comment: newComment,
        user_id: authUser.id,
        post_id: selectedPost.id,
      });

      const newCommentWithUser = {
        ...response.data,
        user: {
          firstName: authUser.firstName,
          lastName: authUser.lastName,
        },
      };
      setSelectedPost({
        ...selectedPost,
        comments: [...(selectedPost.comments || []), newCommentWithUser],
      });
      setNewComment("");
    } catch (err) {
      setError("Failed to create comment.");
      console.error("Create comment error:", err);
    }
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setSelectedPost(null);
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    setError("");
    if (!editingPost) return;
    try {
      const response = await api.put(`/posts/${editingPost.id}`, {
        title: editingPost.title,
        content: editingPost.content,
      });
      setPosts(
        posts.map((post) => (post.id === editingPost.id ? response.data : post))
      );
      setEditingPost(null);
    } catch (err) {
      setError("Failed to update post.");
      console.error("Update post error:", err);
    }
  };

  const handleDeletePost = async (postId) => {
    setError("");
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }
    try {
      await api.delete(`/posts/${postId}`);
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (err) {
      setError("Failed to delete post.");
      console.error("Delete post error:", err);
    }
  };

  return (
    <div className="app-container">
      <h1>Blog com React e Laravel</h1>
      <hr />

      {selectedPost ? (
        // SE um post estiver selecionado, MOSTRA SÓ ISTO
        <div className="post-detail-view">
          <div className="card">
            <div className="post-detail-header">
              <button
                onClick={() => setSelectedPost(null)}
                className="button-secondary"
              >
                &larr; Voltar para todos os posts
              </button>

              {token && authUser && selectedPost.user_id === authUser.id && (
                <button onClick={() => handleEditPost(selectedPost)}>
                  Editar
                </button>
              )}
            </div>

            <div className="post-item post-detail-content">
              <h2>{selectedPost.title}</h2>
              <p>
                <strong>Autor:</strong> {selectedPost.user.firstName}{" "}
                {selectedPost.user.lastName}
              </p>
              <hr />
              <p>{selectedPost.content}</p>
            </div>

            <div className="comments-section">
              <h3>Comentários</h3>
              {selectedPost.comments && selectedPost.comments.length > 0 ? (
                <ul className="comments-list">
                  {selectedPost.comments.map((comment) => (
                    <li key={comment.id} className="comment-item">
                      <p>
                        <strong>{comment.user.firstName}:</strong>{" "}
                        {comment.comment}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Ainda não há comentários para este post.</p>
              )}

              {/* Formulário para adicionar novo comentário */}
              {token && (
                <form
                  onSubmit={handleCreateComment}
                  style={{ marginTop: "20px" }}
                >
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
          </div>
        </div>
      ) : (
        // SENÃO (se nenhum post estiver selecionado), MOSTRA O RESTO DA PÁGINA
        <>
          {!token ? (
            <LoginForm onLoginSuccess={handleLoginSucess} />
          ) : (
            <div className="card">
              <p>
                <strong>Login efetuado com sucesso!</strong>
              </p>
              <button type="button" onClick={fetchPosts}>
                Buscar Posts
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="button-danger"
              >
                Sair (Logout)
              </button>
            </div>
          )}

          {error && <p className="error-message">{error}</p>}

          {token && (
            <>
              <hr />
              {editingPost ? (
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
              ) : (
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
              )}
            </>
          )}

          <div className="posts-container">
            <>
              <h2>Posts</h2>
              {posts.length > 0 ? (
                <ul className="posts-list">
                  {posts.map((post) => (
                    <li key={post.id} className="post-item">
                      <h3>{post.title}</h3>
                      <p>{post.content}</p>
                      <button onClick={() => handleSelectPost(post.id)}>
                        Ver detalhes
                      </button>
                      {token && authUser && post.user_id === authUser.id && (
                        <div style={{ marginTop: "10px" }}>
                          <button
                            className="button-danger"
                            onClick={() => handleDeletePost(post.id)}
                          >
                            Apagar
                          </button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>
                  Nenhum post disponível. Faça o login e clique em "Buscar
                  Posts".
                </p>
              )}
            </>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
