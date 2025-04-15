import bcrypt from 'bcrypt'; // pour le hachage de mot de passe
import jwt from "jsonwebtoken";
import * as authRepo from '../repositories/auth.repository.js'
import  User from "../models/user.model.js"


// Fonction métier pour enregistrer un utilisateur
export const register = async (userData) => {
    // Vérifie si l'utilisateur existe déjà

    const email = userData.email;
    const existingUser = await User.findOne({email}); 
    if (existingUser) throw new Error('Email already registered');
  
    // Hashage sécurisé du mot de passe
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
  
    // Enregistre l'utilisateur avec le mot de passe haché
    return await authRepo.saveUser(userData);
  };
  

export const login = async (email, password) => {
    const existUser = await User.findOne({ email });

    if (!existUser) {
        throw new Error("Utilisateur introuvable");
    }

    const isPasswordCorrect = await bcrypt.compare(password, existUser.password);
    if (!isPasswordCorrect) {
        throw new Error("Mot de passe incorrect");
    }

    const accessToken = jwt.sign(
        {
            id: existUser._id,
            email: existUser.email,
            name: existUser.name
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
    );

    return { user: existUser, accessToken };
};

export const getMe = async (userId) => {
    const user = await User.findById(userId).select("-password"); // on exclut le mot de passe
    return user;
};