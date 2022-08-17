import axios from "axios";

const API = axios.create({baseURL: "http://localhost:5000"});

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.authorization = `Bearer ${
            JSON.parse(localStorage.getItem("profile")).token
        }`;
    }
    return req;
});

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);

export const createPost = (postData) => API.post("/post", postData);
export const getPosts = () => API.get("/post");
export const getPost = (id) => API.get(`/post/${id}`);
export const deletePost = (id) => API.delete(`/post/${id}`);
export const updatePost = (updatedPostData,  id) => API.patch(`/post/${id}`, updatedPostData);
export const getPostsByUser = (userId) => API.get(`/post/userPosts/${userId}`);

export const likePost = (id) => API.patch(`/post/like/${id}`)