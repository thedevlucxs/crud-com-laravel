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

  // effects
  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
    } else {
      delete api.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

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
          {/* CORRIGIDO: Sintaxe do onClick e o texto do botão estavam misturados */}
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

      <div className="posts-container">
        <h2>Posts</h2>
        {posts.length > 0 ? (
          <ul className="posts-list">
            {posts.map((post) => (
              <li key={post.id} className="post-item">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                {token && (
                  <div>
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
      </div>
    </div>
  );
}

export default App;
