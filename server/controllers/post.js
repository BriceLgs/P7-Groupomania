import mongoose from "mongoose";
import PostModel from "../models/post.js";

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostModel({
        ...post,
        creator: req.userId,
        createdAt: new Date().toISOString(),
    });

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch(error) {
        res.status(404).json({message: "Quelques chose d'inconvéniant s'est produit"});
    }
};

export const getPosts = async (req, res) => {
    try {
        const posts = await PostModel.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({message: "Quelques chose d'inconvéniant s'est produit"});
    }
};

export const getPost = async (req, res) => {
    const {id} = req.params;
    try {
        const post = await PostModel.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({message: "Quelques chose d'inconvéniant s'est produit"});
    }
};

export const getPostsByUser = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: "Utilisateur non existant"})
    }
    const userPosts = await PostModel.find({creator: id })
    res.status(200).json(userPosts);
};

export const deletePost = async (req, res) => {
    const {id} = req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({message: `Aucun poste existant avec cette id: ${id}`});
        }
        await PostModel.findByIdAndRemove(id);
        res.json({message: "Poste supprimé avec succès !"})
    } catch(error) {
        res.status(404).json({message: "Quelques chose d'inconvéniant s'est produit"});
    }
    
};

export const updatePost = async (req, res) => {
    const {id} = req.params;
    const {title, description, creator, imageFile} = req.body;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({message: `Aucun poste existant avec cette id: ${id}`});
        }

        const updatedPost = {
            creator,
            title,
            description,
            imageFile,
            _id: id
        };
        await PostModel.findByIdAndUpdate(id, updatedPost, {new: true});
        res.json(updatedPost);
    } catch(error) {
        res.status(404).json({message: "Quelques chose d'inconvéniant s'est produit"});
    }
    
};



export const likePost = async (req, res) => {
    const {id} = req.params;

    try {
        if(!req.userId) {
            return res.json({message: "Utilisateur non identifié"})
        }
    
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({message: `Aucun poste existant avec cette id: ${id}`});
        }
    
        const post = await PostModel.findById(id);
    
        const index = post.likes.findIndex((id) => id === String(req.userId));
    
        if(index === -1) {
            post.likes.push(req.userId)
        } else {
            post.likes = post.likes.filter((id) => id !== String(req.userId));
        }
    
        const updatedPost = await PostModel.findByIdAndUpdate(id, post, {new: true});
    
        res.status(200).json(updatedPost);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
    
}
