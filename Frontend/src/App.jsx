import React, { useState, useEffect } from "react";
import {
  logout as apiLogout,
  getAuthenticatedUser,
  fetchPosts as apiFetchPosts,
  fetchPostById,
  createPost as apiCreatePost,
  updatePost as apiUpdatePost,
  deletePost as apiDeletePost,
  createComment as apiCreateComment,
} from "./services/apiService";

import LoginForm from "./components/LoginForm";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import CreatePostForm from "./components/CreatePostForm";
import EditPostForm from "./components/EditPostForm";
import "./App.css";

import {Button} from "@/components/ui/button"

function App() {
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
    const fetchData = async () => {
      try {
        const userResponse = await getAuthenticatedUser();
        const postsResponse = await apiFetchPosts();
        setAuthUser(userResponse.data);
        setPosts(postsResponse.data);
      } catch (err) {
        console.error("Falha ao buscar dados:", err);
        setToken(null);
        localStorage.removeItem("token");
      }
    };

    if (token) {
      fetchData();
    } else {
      setAuthUser(null);
      setPosts([]);
    }
  }, [token]);

  const handleLoginSuccess = (token, userData) => {
    localStorage.setItem("token", token);
    setToken(token);
    setAuthUser(userData);
  };

  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setToken(null);
      localStorage.removeItem("token");
    }
  };

  const fetchPosts = async () => {
    setError("");
    try {
      const response = await apiFetchPosts(); console.log(response.data.data);
      setPosts(response.data.data);
      setSelectedPost(null);
    } catch (err) {
      setError("Failed to fetch posts. Maybe your token has expired.");
      console.error("Fetch posts error:", err);
    }
  };

  const handleSelectPost = async (postId) => {
    setError("");
    try {
      const response = await fetchPostById(postId);
      setSelectedPost(response.data);
    } catch (err) {
      setError("Failed to fetch post details.");
      console.error("Fetch post details error:", err);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setError("");
    if (!authUser) return;
    try {
      const response = await apiCreatePost({
        title: newPostTitle,
        content: newPostContent,
        user_id: authUser.id,
      });
      setPosts([...posts, response.data.data]);
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
    if (!authUser || !selectedPost) return;
    try {
      const response = await apiCreateComment({
        comment: newComment,
        user_id: authUser.id,
        post_id: selectedPost.id,
      });
      const newCommentWithUser = { ...response.data, user: authUser };
      setSelectedPost((prevPost) => ({
        ...prevPost,
        comments: [...(prevPost.comments || []), newCommentWithUser],
      }));
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
      const response = await apiUpdatePost(editingPost.id, {
        title: editingPost.title,
        content: editingPost.content,
      });
      setPosts(
        posts.map((post) => (post.id === editingPost.id ? response.data.data : post))
      );
      setEditingPost(null);
    } catch (err) {
      setError("Failed to update post.");
      console.error("Update post error:", err);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await apiDeletePost(postId);
      setPosts(posts.filter((post) => post.id !== postId));
      setSelectedPost(null);
    } catch (err) {
      setError("Failed to delete post.");
      console.error("Delete post error:", err);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-5x1">
      <h1 className="text-3x1 font-bold text-center mb-6">Blog com React e Laravel</h1>
      <hr className="mb-6" />
      {selectedPost ? (
        <PostDetail
          post={selectedPost}
          authUser={authUser}
          token={token}
          handleEditPost={handleEditPost}
          handleDeletePost={handleDeletePost}
          handleCreateComment={handleCreateComment}
          handleBackToList={() => setSelectedPost(null)}
          newComment={newComment}
          setNewComment={setNewComment}
        />
      ) : (
        <>
          {!token ? (
            <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
            <LoginForm onLoginSuccess={handleLoginSuccess} />
            </div>
          ) : (
            <div className="bg-card text-card-foreground p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
              <p>
                <strong>Login efetuado com sucesso!</strong>
              </p>
              <div className="flex gap-2">
              <Button aria-label="submit" onClick={fetchPosts} >
                Buscar Posts
              </Button>
              <Button
                type="button"
                onClick={handleLogout}
                variant="destructive"
              >
                Sair (Logout)
              </Button>
              </div>
            </div>
          )}
          {error && <p className="text-destructive bg-destructive/10 p-3 rounded-md mt-4 text-center">{error}</p>}
          {token && (
            <>
              <hr className="my-6" />
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
