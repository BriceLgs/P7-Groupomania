import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js"

import {createPost, getPosts, getPost, getPostsByUser, deletePost, updatePost, likePost} from "../controllers/post.js";

router.get("/", getPosts);
router.get("/:id", getPost);

router.post("/", auth, createPost);
router.delete("/:id", auth, deletePost);
router.patch("/:id", auth, updatePost);
router.get("/userPosts/:id", auth, getPostsByUser);
router.patch("/like/:id", auth, likePost);

export default router;
