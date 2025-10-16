import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export const login = (email, password, device_name = "react-app") => {
  return api.post("/login", { email, password, device_name });
};

export const logout = () => {
  return api.post("/logout");
};

export const getAuthenticatedUser = () => {
  return api.get("/user");
};

export const fetchPosts = () => {
  return api.get("/posts");
};

export const fetchPostById = (postId) => {
  return api.get(`/posts/${postId}`);
};

export const createPost = (postData) => {
  return api.post("/posts", postData);
};

export const updatePost = (postId, postData) => {
  return api.put(`/posts/${postId}`, postData);
};

export const deletePost = (postId) => {
  return api.delete(`/posts/${postId}`);
};

export const createComment = (commentData) => {
  return api.post("/comments", commentData);
};

export default api;
