import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    Accept: "application/json",
  },
});

function App() {
  // state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [editingPost, setEditingPost] = useState(null);

  const [authUser, setAuthUser] = useState(null);

  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    // Função para buscar dados protegidos
    const fetchData = async (authToken) => {
      api.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
      try {
        const userResponse = await api.get("/user");
        setAuthUser(userResponse.data); // <-- Busca o usuário
        fetchPosts(); // <-- Busca os posts
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setToken(null); // Limpa o token se for inválido
      }
    };

    if (token) {
      localStorage.setItem("token", token);
      fetchData(token); // <-- Chama a função para buscar os dados
    } else {
      // Limpa tudo se não houver token
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
      setAuthUser(null);
      setPosts([]);
    }
  }, [token]); // <-- Executa sempre que o token mudar

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await api.post("/login", {
        email: email,
        password: password,
        device_name: "react-app",
      });
      // Ela guarda o token no estado, o que faz a interface mudar para a área logada.
      setToken(response.data.access_token);
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error("Login error:", err);
    }
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
      <h1>Blog Frontend (React)</h1>
      <hr />
      <div className="post-detail-view">
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
            </div>
          </div>
        ) : (
          // SENÃO (se nenhum post estiver selecionado), MOSTRA O RESTO DA PÁGINA
          <>
            {!token ? (
              <form onSubmit={handleLogin} className="card">
                <h2>Login</h2>
                <div className="form-group">
                  <label>Email: </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="lucas@gmail.com"
                  />
                </div>
                <div className="form-group">
                  <label>Password: </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="123456"
                  />
                </div>
                <button type="submit">Entrar</button>
              </form>
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
                        {token && (
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
      {!token ? (
        <form onSubmit={handleLogin} className="card">
          <h2>Login</h2>
          <div className="form-group">
            <label>Email: </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="lucas@gmail.com"
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="123456"
            />
          </div>
          <button type="submit">Entrar</button>
        </form>
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
            // Este formulário usa a função 'handleUpdatePost'
            <form onSubmit={handleUpdatePost} className="card">
              <h2>Editar Post</h2>
              <div className="form-group">
                <label>Título:</label>
                <input
                  type="text"
                  value={editingPost.title}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, title: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Conteúdo:</label>
                <textarea
                  value={editingPost.content}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, content: e.target.value })
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
            // Este formulário usa a função 'handleCreatePost'
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
                  {/* Adicione este botão para chamar a função */}
                  <button onClick={() => handleSelectPost(post.id)}>
                    Ver detalhes
                  </button>
                  {token && (
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
              Nenhum post disponível. Faça o login e clique em "Buscar Posts".
            </p>
          )}
        </>
      </div>
    </div>
  );
}

export default App;
