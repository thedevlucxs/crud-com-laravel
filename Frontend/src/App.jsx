import React, { useState, useEffect } from "react";
import axios from "axios";
import LoginForm from "./components/LoginForm";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import CreatePostForm from "./components/CreatePostForm";
import EditPostForm from "./components/EditPostForm";
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
  const [selectedPost, setSelectedPost] = useState(null);

  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [editingPost, setEditingPost] = useState(null);

  const [authUser, setAuthUser] = useState(null);

  const [selectedPost, setSelectedPost] = useState(null);

  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (authToken) => {
      api.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
      try {
        const userResponse = await api.get("/user", {
          signal: controller.signal,
        });
        const postsResponse = await api.get("/posts", {
          signal: controller.signal,
        });

        setAuthUser(userResponse.data);
        setPosts(postsResponse.data);
      } catch (err) {
        if (err.name === "CanceledError") {
          console.log("Pedido cancelado com sucesso.");
        } else {
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
      setSelectedPost(null);
    } catch (err) {
      setError("Failed to fetch posts. Maybe your token has expired.");
      console.error("Fetch posts error:", err);
    }
  };

  const handleViewPost = async (postId) => {
    setError("");
    try {
      const response = await api.get(`/posts/${postId}`);
      setSelectedPost(response.data);
    } catch (err) {
      setError("Failed to fetch post details.");
      console.error("Fetch post details error:", err);
    }
  };

  const handleBackToList = () => {
    setSelectedPost(null);
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
        <PostDetail
          post={selectedPost}
          authUser={authUser}
          token={token}
          handleEditPost={handleEditPost}
          handleCreateComment={handleCreateComment}
          handleBackToList={() => setSelectedPost(null)}
          newComment={newComment}
          setNewComment={setNewComment}
        />
      ) : (
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
                <EditPostForm
                  editingPost={editingPost}
                  setEditingPost={setEditingPost}
                  handleUpdatePost={handleUpdatePost}
                />
              ) : (
                <CreatePostForm
                  handleCreatePost={handleCreatePost}
                  newPostTitle={newPostTitle}
                  setNewPostTitle={setNewPostTitle}
                  newPostContent={newPostContent}
                  setNewPostContent={setNewPostContent}
                />
              )}
            </>
          )}
          <PostList
            posts={posts}
            handleSelectPost={handleSelectPost}
            handleDeletePost={handleDeletePost}
            authUser={authUser}
            token={token}
          />
        </>
      )}
    </div>
  );
}

export default App;
