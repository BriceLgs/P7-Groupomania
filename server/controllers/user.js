import bcrypt from 'bcryptjs';
import { response } from 'express';
import jwt from "jsonwebtoken";
import PostModel from '../models/post.js';

import UserModel from "../models/user.js";

const secret = "test";

// Login

export const signin = async (req, res) => {
    const {email, password} = req.body;

    try {
        // Cherche un utilisateur dans la base de données
        const oldUser = await UserModel.findOne({email});
        // Si aucun utilisateur trouver
        if(!oldUser) return res.status(404).json({message: "Utilisateur introuvable"});
        
        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
        
        if(!isPasswordCorrect) return res.status(400).json({message: "Identifiant ou mot de passe incorrect"});
        

        if(req.body.email === "admin@groupomania.com") {
            admin = true;
        }
        
        const token = jwt.sign({email: oldUser.email, id: oldUser._id}, secret, {expiresIn: "1h"});
        
        res.status(200).json({result: oldUser, token})
    } catch(error) {
        res.status(500).json({message: "Une erreur s'est produite"});
        console.log(error);
    }
}
    // Register

export const signup = async (req, res) => {
    const {email, password, firstName, lastName} = req.body;
    try {
        const oldUser = await UserModel.findOne({email});

        if(oldUser) {
            return res.status(400).json({message: "Utilisateur déjà existant"})
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await UserModel.create({
            email, 
            password: hashedPassword,
            name: `${firstName} ${lastName}`
        });

        const token = jwt.sign({email: result.email, id: result._id}, secret, {expiresIn: "1h"});
        res.status(201).json({result, token});
    } catch(error) {
        res.status(500).json({message: "Une erreur s'est produite"});
        console.log(error);
    }   
};